import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

/**
 * Creates a presigned POST URL for uploading files to AWS S3.
 * This function is designed to be used in serverless functions or APIs to securely allow clients to upload files directly to an S3 bucket.
 *
 * @param {Request} request - The incoming request object containing the filename, contentType, and userId.
 * @returns {Promise<Response>} A response object with the presigned POST URL and fields necessary for the upload, or an error message.
 */
export async function POST(request: Request) {
  const { filename, contentType, userId } = await request.json();

  try {
    // Initialize the S3 client with credentials and region from environment variables.
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    });

    // Create a presigned POST request for uploading a file.
    const { url, fields } = await createPresignedPost(s3Client, {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: userId, // The object key in S3 bucket, using userId for this example.
      Conditions: [
        ["content-length-range", 0, 10485760], // Limit file size to 10 MB.
        ["starts-with", "$Content-Type", contentType], // Ensure the content type starts with the specified value.
      ],
      Fields: {
        acl: "public-read", // Make the uploaded file publicly readable.
        "Content-Type": contentType, // Set the content type of the uploaded file.
      },
      Expires: 600, // Set expiration time of the presigned URL (in seconds).
    });

    // Return the presigned URL and form fields for the client to use for the upload.
    return Response.json({ url, fields });
  } catch (error) {
    // In case of an error, return a JSON response with an error message.
    return Response.json({ error: "error" });
  }
}
