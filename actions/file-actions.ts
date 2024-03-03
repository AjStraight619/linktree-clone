"use server";

import { getErrorMessage } from "@/lib/utils";
import { prisma } from "@/prisma/prisma";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const bucketName = process.env.AWS_BUCKET_NAME!;
const region = process.env.AWS_REGION!;

export const getSignedURL = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id;
  if (!user) {
    return null;
  }
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: userId,
  });

  const signedUrl = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60, // 60 seconds
  });

  console.log(signedUrl);

  return {
    success: {
      url: signedUrl,
    },
  };
};

export const saveAndReturnImage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id;
  if (!user) {
    return null;
  }

  try {
    const newImage = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar: `https://${bucketName}.s3.${region}.amazonaws.com/${userId}`,
      },
    });

    return {
      success: {
        image: newImage.avatar,
      },
    };
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
};
