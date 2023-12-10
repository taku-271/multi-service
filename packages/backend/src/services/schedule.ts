import { createScheduleType } from "@/types/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSchedules = async () => {
  return await prisma.schedule.findMany();
};

export const createSchedule = async (newSchedule: createScheduleType) => {
  return await prisma.schedule.create({
    data: { ...newSchedule },
  });
};
