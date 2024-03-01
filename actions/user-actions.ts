"use server";

import { prisma } from "@/prisma/prisma";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { revalidatePath } from "next/cache";

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
      username: name.split(" ").join("").toLowerCase(),
      avatar: user?.picture as string,
    },
  });
  return newUser;
};

export const addOrUpdateLinks = async (formData: FormData) => {
  const userId = formData.get("userId") as string;
  const titles = formData.getAll("title") as string[];
  const urls = formData.getAll("url") as string[];

  const linksData = titles.map((title, index) => ({
    title,
    url: urls[index],
  }));

  // Use Prisma to upsert links for the user
  const processedLinks = await Promise.all(
    linksData.map((link) =>
      prisma.link.upsert({
        where: {
          userId_url: {
            userId,
            url: link.url,
          },
        },
        update: {
          title: link.title,
        },
        create: {
          userId,
          title: link.title,
          url: link.url,
        },
      })
    )
  );

  revalidatePath(`/dashboard`);
};

export const getDbUserWithLinks = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      links: true,
    },
  });
};

export const updateUsername = async (formData: FormData) => {
  const userId = formData.get("userId") as string;
  const username = formData.get("username") as string;
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      username: username,
    },
  });
  revalidatePath(`/dashboard`);
};

export const removeLink = async (formData: FormData) => {
  const linkId = formData.get("linkId") as string;
  await prisma.link.delete({
    where: {
      id: linkId,
    },
  });
  revalidatePath(`/dashboard`);
};
