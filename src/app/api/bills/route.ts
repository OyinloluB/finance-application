import { Prisma, PrismaClient } from "@prisma/client";
import { handleResponse } from "@/utils/responseHandler";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sortBy = searchParams.get("sortBy") || "latest";
    const search = searchParams.get("search") || "";

    const whereClause: Prisma.RecurringBillWhereInput = {
      ...(search
        ? {
            name: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {}),
    };

    const orderByOptions: Record<
      string,
      Prisma.RecurringBillOrderByWithRelationInput
    > = {
      latest: { dueDate: "desc" },
      oldest: { dueDate: "asc" },
      a_to_z: { name: "asc" },
      z_to_a: { name: "desc" },
      highest: { amount: "desc" },
      lowest: { amount: "asc" },
    };

    const bills = await prisma.recurringBill.findMany({
      where: whereClause,
      orderBy: orderByOptions[sortBy] || { dueDate: "desc" },
    });

    return handleResponse(200, { bills });
  } catch (error) {
    console.error("Failed to fetch recurring bills", error);
    return handleResponse(500, { error: "Internal Server Error" });
  }
}
