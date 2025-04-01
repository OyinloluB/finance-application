import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/utils/auth";
import { handleResponse } from "@/utils/responseHandler";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await verifyToken(req);
    if (!userId) {
      return handleResponse(401, { error: "Unauthorized" });
    }

    const { name, targetAmount, theme } = await req.json();
    const potId = (await params).id;

    const updatedPot = await prisma.pot.update({
      where: { id: potId, userId },
      data: {
        name,
        targetAmount: Number(targetAmount),
        theme: theme,
      },
    });

    return handleResponse(200, updatedPot);
  } catch (error) {
    console.error("Error updating pot:", error);
    return handleResponse(500, { error: "Internal Server Error" });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await verifyToken(req);
    if (!userId) {
      return handleResponse(401, { error: "Unauthorized" });
    }

    const id = (await params).id;

    await prisma.pot.delete({ where: { id, userId } });
    return handleResponse(200, { message: "Pot deleted successfully" });
  } catch (error) {
    console.error("Error deleting pot:", error);
    return handleResponse(500, { error: "Internal Server Error" });
  }
}
