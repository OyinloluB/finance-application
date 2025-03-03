import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "oyinloluwab@gmail.com" },
    update: {},
    create: {
      id: "",
      email: "oyinloluwab@gmail.com",
      name: "Test User",
    },
  });

  await prisma.transaction.createMany({
    data: [
      {
        userId: user.id,
        name: "Emma Richardson",
        image: "/images/profile-one.png",
        category: "GENERAL",
        type: "INCOME",
        date: new Date("2024-08-19"),
        amount: 75.5,
      },
      {
        userId: user.id,
        name: "Savory Bites Bistro",
        image: "/images/profile-two.png",
        category: "DINING_OUT",
        type: "EXPENSE",
        date: new Date("2024-08-19"),
        amount: -55.5,
      },
      {
        userId: user.id,
        name: "Daniel Carter",
        image: "/images/profile-three.png",
        category: "GENERAL",
        type: "EXPENSE",
        date: new Date("2024-08-18"),
        amount: -42.3,
      },
      {
        userId: user.id,
        name: "Emma Richardson",
        image: "/images/profile-one.png",
        category: "GENERAL",
        type: "INCOME",
        date: new Date("2024-08-19"),
        amount: 75.5,
      },
      {
        userId: user.id,
        name: "Savory Bites Bistro",
        image: "/images/profile-two.png",
        category: "DINING_OUT",
        type: "EXPENSE",
        date: new Date("2024-08-19"),
        amount: -55.5,
      },
      {
        userId: user.id,
        name: "Daniel Carter",
        image: "/images/profile-three.png",
        category: "GENERAL",
        type: "EXPENSE",
        date: new Date("2024-08-18"),
        amount: -42.3,
      },
      {
        userId: user.id,
        name: "Emma Richardson",
        image: "/images/profile-one.png",
        category: "GENERAL",
        type: "INCOME",
        date: new Date("2024-08-19"),
        amount: 75.5,
      },
      {
        userId: user.id,
        name: "Savory Bites Bistro",
        image: "/images/profile-two.png",
        category: "DINING_OUT",
        type: "EXPENSE",
        date: new Date("2024-08-19"),
        amount: -55.5,
      },
      {
        userId: user.id,
        name: "Daniel Carter",
        image: "/images/profile-three.png",
        category: "GENERAL",
        type: "EXPENSE",
        date: new Date("2024-08-18"),
        amount: -42.3,
      },
    ],
  });

  console.log("Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
