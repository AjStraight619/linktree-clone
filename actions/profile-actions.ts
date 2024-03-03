"use server";

import { prisma } from "@/prisma/prisma";

import { getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const editProfile = async (formData: FormData) => {
  const userId = formData.get("userId") as string;
  const name = formData.get("name") as string;
  const username = formData.get("username") as string;
  const bio = formData.get("bio") as string;

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        username,
        bio,
      },
    });
  } catch (err) {
    const error = getErrorMessage(err);
    return {
      failure: {
        error,
      },
    };
  } finally {
    revalidatePath("/dashboard/profile");
  }

  return { success: true };
};

export const getDbUsersByUsername = async (username: string) => {
  const dbUsers = await prisma.user.findMany({
    where: {
      username: {
        contains: username,
      },
    },
    include: {
      links: true,
    },
  });

  return dbUsers;
};
