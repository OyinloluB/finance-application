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
    const budget = await prisma.budget.create({
      data: {
        category: category.toUpperCase(),
        maxLimit: parsedMaxLimit,
        theme: theme.toUpperCase(),
        userId,
      },
    });

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
      include: {
        transactions: {
          where: {
            amount: { lt: 0 },
          },
        },
      },
    });

    const budgetsWithCalculatedFields = budgets.map((budget) => {
      const totalSpent = budget.transactions.reduce(
        (sum, transaction) => sum + Math.abs(Number(transaction.amount)),
        0
      );

      return {
        ...budget,
        currentSpend: totalSpent,
        remaining: budget.maxLimit - totalSpent,
      };
    });

    return NextResponse.json(budgetsWithCalculatedFields, { status: 200 });
  } catch (error) {
    console.error("Error fetching budgets", error);
    NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
