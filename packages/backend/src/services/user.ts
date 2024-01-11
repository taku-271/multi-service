import { PrismaClient } from "@prisma/client";

type postData = {
  email: string;
};
type createUserType = {
  name: string;
  email: string;
  password: string;
};

const prisma = new PrismaClient();
export const postSignIn = async (data: postData) => {
  return await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
};

export const createUser = async (newUser: createUserType) => {
  return await prisma.user.create({
    data: { ...newUser },
  });
};
