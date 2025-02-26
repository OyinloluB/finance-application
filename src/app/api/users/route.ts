import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { id, email, name } = await req.json();

    const user = await prisma.user.create({
      data: {
        id,
        email,
        name,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
