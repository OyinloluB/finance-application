import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../transactions/route";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const userId = await verifyToken(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { category, maxLimit, theme } = await req.json();

    if (!category || !maxLimit || !theme) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          details: { category, maxLimit, theme },
        },
        { status: 400 }
      );
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
        theme: theme.toUpperCase(),
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

    return NextResponse.json(budget, { status: 201 });
  } catch (error) {
    console.error("Error creating budget:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const userId = await verifyToken(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    return NextResponse.json(budgets, { status: 200 });
  } catch (error) {
    console.error("Error fetching budgets", error);
    NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
