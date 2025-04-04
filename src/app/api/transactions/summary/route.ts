import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/utils/auth";
import { handleResponse } from "@/utils/responseHandler";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const userId = await verifyToken(req);

    if (!userId) {
      return handleResponse(401, { error: "Unauthorized" });
    }

    const transactions = await prisma.transaction.findMany({
      where: { userId },
      select: { type: true, amount: true },
    });

    const totalIncome = transactions
      .filter((t) => t.type === "INCOME")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return handleResponse(200, { totalIncome, totalExpenses });
  } catch (error) {
    console.error("Error fetching transaction summary:", error);
    return handleResponse(500, { error: "Internal Server Error" });
  }
}
