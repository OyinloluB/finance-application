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

    const { name, targetAmount, theme } = await req.json();

    if (!name || !targetAmount || !theme) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const pot = await prisma.pot.create({
      data: {
        name,
        targetAmount: Number(targetAmount),
        theme: theme.toUpperCase(),
        userId,
      },
    });
    return NextResponse.json(pot, { status: 201 });
  } catch (error) {
    console.error("Error creating pot:", error);
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

    const pots = await prisma.pot.findMany({
      where: { userId },
    });

    return NextResponse.json(pots, { status: 200 });
  } catch (error) {
    console.error("Error fetching pots:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
