import { CategoryType, Prisma, PrismaClient } from "@prisma/client";
import { verifyToken } from "@/utils/auth";
import { handleResponse } from "@/utils/responseHandler";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const userId = await verifyToken(req);
    if (!userId) {
      return handleResponse(401, { error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return handleResponse(404, { error: "User not found" });
    }

    const { amount, category, date, type, recipientId } = await req.json();

    if (!amount || !category || !date || !type) {
      return handleResponse(400, { error: "Missing required fields" });
    }

    let recipientUser = null;
    if (type === "EXPENSE" && recipientId) {
      recipientUser = await prisma.user.findUnique({
        where: { id: recipientId },
      });

      if (!recipientUser) {
        return handleResponse(404, { error: "Recipient not found" });
      }
    }

    const transaction = await prisma.transaction.create({
      data: {
        name: user.name || "Test User",
        amount,
        category: category.toUpperCase(),
        date: new Date(date),
        type,
        recipientId: recipientUser ? recipientUser.id : null,
        userId,
        image: user.image,
      },
    });

    // If it's an expense, update the associated budget
    const budget = await prisma.budget.findFirst({
      where: {
        userId,
        category: category.toUpperCase(),
      },
    });

    if (budget && type === "EXPENSE") {
      await prisma.budget.update({
        where: { id: budget.id },
        data: {
          currentSpend: budget.currentSpend + Math.abs(Number(amount)),
          remaining:
            budget.maxLimit - (budget.currentSpend + Math.abs(Number(amount))),
        },
      });
    }

    return handleResponse(201, transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    return handleResponse(500, { error: "Internal Server Error" });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = await verifyToken(req);

    if (!userId) {
      return handleResponse(401, { error: "Unauthorized" });
    }

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "5", 10);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "all_transactions";
    const sortBy = searchParams.get("sortBy") || "latest";

    const skip = (page - 1) * limit;

    const whereClause: Prisma.TransactionWhereInput = {
      userId,
    };

    if (category !== "all_transactions") {
      whereClause.category = category.toUpperCase() as CategoryType;
    }

    const orderByOptions: Record<
      string,
      Prisma.TransactionOrderByWithRelationInput
    > = {
      latest: { date: "desc" },
      oldest: { date: "asc" },
      highest: { amount: "desc" },
      lowest: { amount: "asc" },
    };

    const transactions = await prisma.transaction.findMany({
      where: whereClause,
      include: {
        user: { select: { image: true, name: true } },
        recipient: { select: { name: true, image: true } },
      },
      orderBy: orderByOptions[sortBy] || { date: "desc" },
    });

    const filteredTransactions = transactions.filter((tx) => {
      const displayName = tx.type === "EXPENSE" ? tx.recipient?.name : tx.name;
      return search
        ? displayName?.toLowerCase().includes(search.toLowerCase())
        : true;
    });

    const paginatedTransactions = filteredTransactions.slice(
      skip,
      skip + limit
    );

    return handleResponse(200, {
      transactions: paginatedTransactions.map((tx) => ({
        ...tx,
        name: tx.type === "EXPENSE" ? tx.recipient?.name || tx.name : tx.name,
        image:
          tx.type === "EXPENSE"
            ? tx.recipient?.image || tx.user?.image
            : tx.user?.image,
      })),
      totalCount: filteredTransactions.length,
      totalPages: Math.ceil(filteredTransactions.length / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return handleResponse(500, { error: "Internal Server Error" });
  }
}
