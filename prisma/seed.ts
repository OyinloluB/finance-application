import { PrismaClient, BillStatus, FrequencyType } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();

  const recurringBills = [
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

  for (const user of users) {
    for (const bill of recurringBills) {
      await prisma.recurringBill.create({
        data: {
          ...bill,
          userId: user.id,
        },
      });
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
