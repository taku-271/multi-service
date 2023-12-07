import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const schedule1 = await prisma.schedule.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: "Schedule 1",
      description: "Description 1",
      start: new Date("2023/12/7"),
      end: new Date("2023/12/7"),
    },
  });

  const schedule2 = await prisma.schedule.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      title: "Schedule 2",
      description: "Description 2",
      start: new Date("2023/12/6"),
      end: new Date("2023/12/6"),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
