import { verifyToken } from "@/utils/auth";
import { handleResponse } from "@/utils/responseHandler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const userId = await verifyToken(req);

    if (!userId) {
      return handleResponse(401, { error: "Unauthorized" });
    }

    const { category, maxLimit, theme } = await req.json();

    if (!category || !maxLimit || !theme) {
      return handleResponse(400, { error: "Missing required fields" });
    }

    const parsedMaxLimit = Number(maxLimit);

    const pastTransactions = await prisma.transaction.findMany({
      where: {
        userId,
        category: category.toUpperCase(),
        type: "EXPENSE",
        budgetId: null,
      },
    });

    const totalSpent = pastTransactions.reduce(
      (sum, transaction) => sum + Math.abs(Number(transaction.amount)),
      0
    );

    const budget = await prisma.budget.create({
      data: {
        category: category.toUpperCase(),
        maxLimit: parsedMaxLimit,
        theme: theme,
        userId,
        currentSpend: totalSpent,
        remaining: parsedMaxLimit - totalSpent,
      },
    });

    if (pastTransactions.length > 0) {
      await prisma.transaction.updateMany({
        where: {
          id: { in: pastTransactions.map((tx) => tx.id) },
        },
        data: {
          budgetId: budget.id,
        },
      });
    }
    console.log({ budget });
    return handleResponse(201, budget);
  } catch (error) {
    console.error("Error creating budget:", error);
    return handleResponse(500, { error: "Internal Server Error" });
  }
}

export async function GET(req: Request) {
  try {
    const userId = await verifyToken(req);
    if (!userId) {
      return handleResponse(401, { error: "Unauthorized" });
    }

    const budgets = await prisma.budget.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
      include: {
        transactions: {
          where: {
            type: "EXPENSE",
          },
          select: {
            id: true,
            amount: true,
            date: true,
            type: true,
            recipientId: true,
            recipient: {
              select: {
                name: true,
              },
            },
            image: true,
          },
        },
      },
    });

    return handleResponse(200, budgets);
  } catch (error) {
    console.error("Error fetching budgets", error);
    return handleResponse(500, { error: "Internal Server Error" });
  }
}
