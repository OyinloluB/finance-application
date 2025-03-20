import { verifyToken } from "@/utils/auth";
import { handleResponse } from "@/utils/responseHandler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await verifyToken(req);
    if (!userId) {
      return handleResponse(401, { error: "Unauthorized" });
    }

    const { amount } = await req.json();

    if (!amount || amount <= 0) {
      return handleResponse(400, { error: "Invalid amount" });
    }

    const pot = await prisma.pot.findUnique({
      where: { id: params.id, userId },
    });

    if (!pot || pot.currentAmount < amount) {
      return handleResponse(400, { error: "Insufficient funds" });
    }

    const updatedPot = await prisma.pot.update({
      where: { id: params.id, userId },
      data: {
        currentAmount: { decrement: Number(amount) },
      },
    });

    return handleResponse(200, updatedPot);
  } catch (error) {
    console.error("Error withdrawing from pot:", error);
    return handleResponse(500, { error: "Internal Server Error" });
  }
}
