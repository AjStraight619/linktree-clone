"use server";

import { getErrorMessage } from "@/lib/utils";
import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export const removeLink = async (formData: FormData) => {
  const linkId = formData.get("linkId") as string;

  try {
    await prisma.link.delete({
      where: {
        id: linkId,
      },
    });

    return {
      success: true,
      error: null,
    };
  } catch (err) {
    const error = getErrorMessage(err);
    return {
      success: false,
      error,
    };
  } finally {
    revalidatePath(`/dashboard`);
  }
};
