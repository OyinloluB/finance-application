import { NextResponse } from "next/server";
import { verifyToken } from "../../transactions/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await verifyToken(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, targetAmount, theme } = await req.json();

    const updatedPot = await prisma.pot.update({
      where: { id: params.id, userId },
      data: {
        name,
        targetAmount: Number(targetAmount),
        theme: theme.toUpperCase(),
      },
    });

    return NextResponse.json(updatedPot, { status: 200 });
  } catch (error) {
    console.error("Error updating pot:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
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

    await prisma.pot.delete({ where: { id: params.id, userId } });
  } catch (error) {
    console.error("Error deleting pot:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
