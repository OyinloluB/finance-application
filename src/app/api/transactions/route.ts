import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import admin from "@/lib/firebaseAdmin";

const prisma = new PrismaClient();

export async function verifyToken(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return null;

  const token = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken.uid;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function GET(req: Request) {
  const userId = await verifyToken(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const transactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });

  return NextResponse.json(transactions);
}
