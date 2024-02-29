import { prisma } from "@/prisma/prisma";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";

export const checkIfUserExistsInDb = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
};

export const createUserInDb = async (user: KindeUser) => {
  const name = user?.given_name + " " + user?.family_name;
  const newUser = await prisma.user.create({
    data: {
      id: user?.id,
      email: user.email as string,
      name: name,
      avatar: user?.picture as string,
    },
  });
  return newUser;
};

export const getUserFromDb = async (userId: string) => {};
