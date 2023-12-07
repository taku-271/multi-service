import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSchedules = async () => {
  return await prisma.schedule.findMany();
};
