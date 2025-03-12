import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { verifyToken } from "../../transactions/route";

const prisma = new PrismaClient();

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const userId = await verifyToken(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const budgetId = context.params.id;

    const budget = await prisma.budget.findUnique({
      where: { id: budgetId, userId },
      include: { transactions: true },
    });

    if (!budget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }

    return NextResponse.json(budget, { status: 200 });
  } catch (error) {
    console.error("Error fetching budget:", error);
    NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, context: { params: { id: string } }) {
  try {
    const userId = await verifyToken(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const budgetId = context.params.id;
    const { category, maxLimit, theme } = await req.json();

    const parsedMaxLimit = Number(maxLimit);
    const updatedBudget = await prisma.budget.update({
      where: { id: budgetId, userId },
      data: {
        category: category.toUpperCase(),
        maxLimit: parsedMaxLimit,
        theme: theme.toUpperCase(),
        userId,
      },
    });

    return NextResponse.json(updatedBudget, { status: 200 });
  } catch (error) {
    console.error("Error updating budget:", error);
    NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const userId = await verifyToken(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const budgetId = context.params.id;

    await prisma.budget.delete({
      where: { id: budgetId, userId },
    });

    return NextResponse.json(
      { message: "Budget deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting budget:", error);
    NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
