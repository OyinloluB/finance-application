import { verifyToken } from "@/utils/auth";
import { handleResponse } from "@/utils/responseHandler";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await verifyToken(req);

    if (!userId) {
      return handleResponse(401, { error: "Unauthorized" });
    }

    const budgetId = (await params).id;

    const budget = await prisma.budget.findUnique({
      where: { id: budgetId, userId },
      include: { transactions: true },
    });

    if (!budget) {
      return handleResponse(404, { error: "Budget not found" });
    }

    return handleResponse(200, budget);
  } catch (error) {
    console.error("Error fetching budget:", error);
    return handleResponse(500, { error: "Internal Server Error" });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await verifyToken(req);

    if (!userId) {
      return handleResponse(401, { error: "Unauthorized" });
    }

    const budgetId = (await params).id;
    const { category, maxLimit, theme } = await req.json();

    const parsedMaxLimit = Number(maxLimit);
    const updatedBudget = await prisma.budget.update({
      where: { id: budgetId, userId },
      data: {
        category: category.toUpperCase(),
        maxLimit: parsedMaxLimit,
        theme: theme,
        userId,
      },
    });

    return handleResponse(200, updatedBudget);
  } catch (error) {
    console.error("Error updating budget:", error);
    return handleResponse(500, { error: "Internal Server Error" });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await verifyToken(req);

    if (!userId) {
      return handleResponse(401, { error: "Unauthorized" });
    }

    const budgetId = (await params).id;

    await prisma.budget.delete({
      where: { id: budgetId, userId },
    });

    return handleResponse(200, { message: "Budget deleted successfully" });
  } catch (error) {
    console.error("Error deleting budget:", error);
    return handleResponse(500, { error: "Internal Server Error" });
  }
}
