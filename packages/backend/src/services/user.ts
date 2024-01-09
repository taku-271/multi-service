import { PrismaClient } from "@prisma/client";

type postData = {
  email: string;
};

const prisma = new PrismaClient();

export const postSignIn = async (data: postData) => {
  return await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
};
