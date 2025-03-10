import { verifyToken } from "@/app/api/transactions/route";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await verifyToken(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const pot = await prisma.pot.findUnique({
      where: { id: params.id, userId },
    });

    if (!pot || pot.currentAmount < amount) {
      return NextResponse.json(
        { error: "Insufficient funds" },
        { status: 400 }
      );
    }

    const updatedPot = await prisma.pot.update({
      where: { id: params.id, userId },
      data: {
        currentAmount: { decrement: Number(amount) },
      },
    });

    return NextResponse.json(updatedPot, { status: 200 });
  } catch (error) {
    console.error("Error withdrawing from pot:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
