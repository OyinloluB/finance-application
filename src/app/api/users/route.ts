import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/utils/auth";
import { handleResponse } from "@/utils/responseHandler";

const prisma = new PrismaClient();

const profileImages = [
  "/images/profile-one.png",
  "/images/profile-two.png",
  "/images/profile-three.png",
];

export async function POST(req: Request) {
  try {
    const userId = await verifyToken(req);
    if (!userId) {
      return handleResponse(401, { error: "Unauthorized" });
    }

    const { id, email, name } = await req.json();
    const randomImage =
      profileImages[Math.floor(Math.random() * profileImages.length)];

    const user = await prisma.user.create({
      data: {
        id,
        email,
        name,
        image: randomImage,
      },
    });

    return handleResponse(201, { user });
  } catch (error) {
    console.error("Error creating user:", error);
    return handleResponse(500, { error: "Failed to create user" });
  }
}

export async function GET(req: Request) {
  try {
    const userId = await verifyToken(req);
    if (!userId) {
      return handleResponse(401, { error: "Unauthorized" });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    return handleResponse(200, users);
  } catch (error) {
    console.error("Error creating user:", error);
    return handleResponse(500, { error: "Failed to fetch users" });
  }
}
