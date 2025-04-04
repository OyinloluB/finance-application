import { BillStatus, FrequencyType, PrismaClient } from "@prisma/client";
import { verifyToken } from "@/utils/auth";
import { handleResponse } from "@/utils/responseHandler";

const prisma = new PrismaClient();

const profileImages = [
  "/images/profile-one.png",
  "/images/profile-two.png",
  "/images/profile-three.png",
  "/images/profile-one.png",
  "/images/profile-two.png",
  "/images/profile-three.png",
  "/images/profile-one.png",
  "/images/profile-two.png",
  "/images/profile-three.png",
  "/images/profile-one.png",
  "/images/profile-two.png",
  "/images/profile-three.png",
];

const defaultBills = [
  {
    name: "Spark Electric Solutions",
    amount: 100.0,
    dueDate: new Date(new Date().setDate(2)),
    image: "/images/profile-three.png",
    status: BillStatus.UPCOMING,
    frequency: FrequencyType.MONTHLY,
  },
  {
    name: "Serenity Spa & Wellness",
    amount: 30.0,
    dueDate: new Date(new Date().setDate(3)),
    image: "/images/profile-one.png",
    status: BillStatus.UPCOMING,
    frequency: FrequencyType.MONTHLY,
  },
  {
    name: "Elevate Education",
    amount: 50.0,
    dueDate: new Date(new Date().setDate(4)),
    image: "/images/profile-two.png",
    status: BillStatus.UPCOMING,
    frequency: FrequencyType.MONTHLY,
  },
  {
    name: "Nimbus Data Storage",
    amount: 9.99,
    dueDate: new Date(new Date().setDate(21)),
    image: "/images/profile-three.png",
    status: BillStatus.DUE_SOON,
    frequency: FrequencyType.MONTHLY,
  },
  {
    name: "ByteWise",
    amount: 49.99,
    dueDate: new Date(new Date().setDate(23)),
    image: "/images/profile-one.png",
    status: BillStatus.DUE_SOON,
    frequency: FrequencyType.MONTHLY,
  },
  {
    name: "EcoFuel Energy",
    amount: 35.0,
    dueDate: new Date(new Date().setDate(29)),
    image: "/images/profile-three.png",
    status: BillStatus.UPCOMING,
    frequency: FrequencyType.MONTHLY,
  },
  {
    name: "Aqua Flow Utilities",
    amount: 100.0,
    dueDate: new Date(new Date().setDate(30)),
    image: "/images/profile-two.png",
    status: BillStatus.UPCOMING,
    frequency: FrequencyType.MONTHLY,
  },
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

    const billCreationPromises = defaultBills.map((bill) =>
      prisma.recurringBill.create({
        data: {
          ...bill,
          userId: user.id,
        },
      })
    );
    await Promise.all(billCreationPromises);

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
