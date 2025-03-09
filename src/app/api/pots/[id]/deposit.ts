import { NextResponse } from "next/server";
import { verifyToken } from "../../transactions/route";
import { PrismaClient } from "@prisma/client";

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

    const pot = await prisma.pot.update({
      where: { id: params.id, userId },
      data: {
        currentAmount: { increment: Number(amount) },
      },
    });

    return NextResponse.json(pot, { status: 200 });
  } catch (error) {
    console.error("Error adding money to pot:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
