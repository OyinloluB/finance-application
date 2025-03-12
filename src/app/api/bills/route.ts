import { NextResponse } from "next/server";
import { verifyToken } from "../transactions/route";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const userId = await verifyToken(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const sortBy = searchParams.get("sortBy") || "latest";
    const search = searchParams.get("search") || "";

    const whereClause: Prisma.RecurringBillWhereInput = {
      userId,
      ...(search
        ? {
            name: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {}),
    };

    let orderByClause: Prisma.RecurringBillOrderByWithRelationInput = {
      dueDate: "desc",
    };

    switch (sortBy) {
      case "oldest":
        orderByClause = { dueDate: "asc" };
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

    const bills = await prisma.recurringBill.findMany({
      where: whereClause,
      orderBy: orderByClause,
    });

    return NextResponse.json({ bills }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch recurring bills", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
