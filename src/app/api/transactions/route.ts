import { NextResponse } from "next/server";
import { CategoryType, Prisma, PrismaClient } from "@prisma/client";
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
  const { searchParams } = new URL(req.url);
  const userId = await verifyToken(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "5", 10);
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all_transactions";
  const sortBy = searchParams.get("sortBy") || "latest";

  const skip = (page - 1) * limit;

  const whereClause: Prisma.TransactionWhereInput = { userId };

  if (search) {
    whereClause.name = { contains: search, mode: "insensitive" };
  }

  if (category !== "all_transactions") {
    whereClause.category = category.toUpperCase() as CategoryType;
  }

  let orderByClause: Prisma.TransactionOrderByWithRelationInput = {
    date: "desc",
  };

  switch (sortBy) {
    case "oldest":
      orderByClause = { date: "asc" };
      break;
    case "a_to_z":
      orderByClause = { name: "asc" };
      break;
    case "z_to_a":
      orderByClause = { name: "desc" };
      break;
    case "highest":
      orderByClause = { amount: "desc" };
      break;
    case "lowest":
      orderByClause = { amount: "asc" };
      break;
  }

  const filteredTransactions = await prisma.transaction.findMany({
    where: whereClause,
    orderBy: orderByClause,
  });

  const paginatedTransactions = filteredTransactions.slice(skip, skip + limit);

  return NextResponse.json({
    transactions: paginatedTransactions,
    totalCount: filteredTransactions.length,
    totalPages: Math.ceil(filteredTransactions.length / limit),
    currentPage: page,
  });
}
