"use server";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

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
    // ContentType: contentType,
  });

  const signedUrl = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60, // 60 seconds
  });

  return {
    success: {
      url: signedUrl,
    },
  };
};

//   const putObjectCommand = new PutObjectCommand({
//     Bucket: process.env.AWS_BUCKET_NAME!,
//     Key: userId,
//     ContentType: contentType,
//   });

//   return { url, fields };
