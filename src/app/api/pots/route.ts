import { verifyToken } from "@/utils/auth";
import { handleResponse } from "@/utils/responseHandler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const userId = await verifyToken(req);

    if (!userId) {
      return handleResponse(401, { error: "Unauthorized" });
    }

    const { name, targetAmount, theme } = await req.json();

    if (!name || !targetAmount || !theme) {
      return handleResponse(400, { error: "Missing required fields" });
    }

    const pot = await prisma.pot.create({
      data: {
        name,
        targetAmount: Number(targetAmount),
        theme: theme.toUpperCase(),
        userId,
      },
    });
    return handleResponse(201, pot);
  } catch (error) {
    console.error("Error creating pot:", error);
    return handleResponse(500, { error: "Internal Server Error" });
  }
}

export async function GET(req: Request) {
  try {
    const userId = await verifyToken(req);

    if (!userId) {
      return handleResponse(401, { error: "Unauthorized" });
    }

    const pots = await prisma.pot.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });

    return handleResponse(200, pots);
  } catch (error) {
    console.error("Error fetching pots:", error);
    return handleResponse(500, { error: "Internal Server Error" });
  }
}
