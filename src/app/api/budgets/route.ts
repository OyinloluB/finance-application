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
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const budget = await prisma.budget.create({
      data: { category, maxLimit, theme, userId },
    });

    return NextResponse.json(budget, { status: 201 });
  } catch (error) {
    console.error("Error creating budget:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
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
      include: { transactions: true },
    });

    return NextResponse.json(budgets, { status: 200 });
  } catch (error) {
    console.error("Error fetching budgets", error);
    NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
