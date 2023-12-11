import { createScheduleType, updateScheduleType } from "@/types/types";
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

export const deleteSchedule = async (id: number) => {
  return await prisma.schedule.delete({
    where: { id },
  });
};

export const updateSchedule = async (data: updateScheduleType) => {
  return await prisma.schedule.update({
    where: { id: data.id },
    data: { ...data },
  });
};
