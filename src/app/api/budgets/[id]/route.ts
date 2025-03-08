import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { verifyToken } from "../../transactions/route";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await verifyToken(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const budget = await prisma.budget.findUnique({
      where: { id: params.id, userId },
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

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await verifyToken(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { category, maxLimit, theme } = await req.json();

    const updatedBudget = await prisma.budget.update({
      where: { id: params.id, userId },
      data: { category, maxLimit, theme },
    });

    return NextResponse.json(updatedBudget, { status: 200 });
  } catch (error) {
    console.error("Error updating budget:", error);
    NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await verifyToken(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.budget.delete({ where: { id: params.id, userId } });
  } catch (error) {
    console.error("Error deleting budget:", error);
    NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
