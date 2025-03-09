import { NextResponse } from "next/server";
import { CategoryType, Prisma, PrismaClient } from "@prisma/client";
import admin from "@/lib/firebaseAdmin";

const prisma = new PrismaClient();

export async function verifyToken(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return null;

  const token = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken.uid;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const userId = await verifyToken(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const { amount, category, date, type, recipientId } = await req.json();

    if (!amount || !category || !date || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let recipientUser = null;
    if (type === "EXPENSE" && recipientId) {
      recipientUser = await prisma.user.findUnique({
        where: { id: recipientId },
      });

      if (!recipientUser) {
        return NextResponse.json(
          { error: "Recipient not found" },
          { status: 404 }
        );
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

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = await verifyToken(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  let orderByClause: Prisma.TransactionOrderByWithRelationInput = {
    date: "desc",
  };

  switch (sortBy) {
    case "oldest":
      orderByClause = { date: "asc" };
      break;
    case "a_to_z":
      orderByClause = { name: "asc" };
      break;
    case "z_to_a":
      orderByClause = { name: "desc" };
      break;
    case "highest":
      orderByClause = { amount: "desc" };
      break;
    case "lowest":
      orderByClause = { amount: "asc" };
      break;
  }

  const transactions = await prisma.transaction.findMany({
    where: whereClause,
    include: {
      user: { select: { image: true, name: true } },
      recipient: { select: { name: true } },
    },
    orderBy: orderByClause,
  });

  const filteredTransactions = transactions.filter((tx) => {
    const displayName = tx.type === "EXPENSE" ? tx.recipient?.name : tx.name;
    return search
      ? displayName?.toLowerCase().includes(search.toLowerCase())
      : true;
  });

  const paginatedTransactions = filteredTransactions.slice(skip, skip + limit);

  return NextResponse.json({
    transactions: paginatedTransactions.map((tx) => ({
      ...tx,
      name: tx.type === "EXPENSE" ? tx.recipient?.name || tx.name : tx.name,
      image: tx.user?.image,
    })),
    totalCount: filteredTransactions.length,
    totalPages: Math.ceil(filteredTransactions.length / limit),
    currentPage: page,
  });
}
