import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/utils/auth";
import { handleResponse } from "@/utils/responseHandler";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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

    const potId = (await params).id;

    const pot = await prisma.pot.update({
      where: { id: potId, userId },
      data: {
        currentAmount: { increment: Number(amount) },
      },
    });

    return handleResponse(200, pot);
  } catch (error) {
    console.error("Error adding money to pot:", error);
    return handleResponse(500, { error: "Internal Server Error" });
  }
}
