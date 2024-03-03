"use server";

import { prisma } from "@/prisma/prisma";
import { getSignedURL } from "./file-actions";

import { getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const editProfile = async (formData: FormData) => {
  const userId = formData.get("userId") as string;
  const name = formData.get("name") as string;
  const username = formData.get("username") as string;
  const bio = formData.get("bio") as string;
  const file = formData.get("file") as unknown as File;

  let signedUrlResult;
  try {
    signedUrlResult = await getSignedURL();
    if (!signedUrlResult) {
      throw new Error("Failed to get signed URL");
    }
  } catch (err) {
    const error = getErrorMessage(err);
    return {
      error: `Error getting signed URL: ${error}`,
    };
  }

  const url = signedUrlResult.success.url;

  console.log({ url });

  try {
    await updateProfileImage(file, url);
  } catch (err) {
    const error = getErrorMessage(err);
    return {
      error: `Error updating profile image: ${error}`,
    };
  }

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

const updateProfileImage = async (file: File, url: string) => {
  if (!file) {
    return;
  }
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const response = await fetch(url, {
      method: "PUT",
      body: buffer,
      headers: {
        "Content-Type": file?.type,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (err) {
    const error = getErrorMessage(err);
    throw new Error(`Error uploading profile image: ${error}`);
  }
};
