"use client";

import { getSignedURL, saveAndReturnImage } from "@/actions/file-actions";
import { User } from "@prisma/client";
import { Undo2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserAvatar from "../landing-page/user-avatar";
import { Button } from "../ui/button";

type FileUploadProps = {
  dbUser: User | null;
};

const FileUpload = ({ dbUser }: FileUploadProps) => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    dbUser?.avatar || ""
  );

  const [tempImageUrl, setTempImageUrl] = useState<string | undefined>(
    undefined
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (tempImageUrl) {
      URL.revokeObjectURL(tempImageUrl);
      setTempImageUrl(undefined);
    }
    setFile(e.target.files?.[0]);
  };

  const handleAccept = async () => {
    const signedUrlResult = await getSignedURL();

    const url = signedUrlResult?.success?.url;
    console.log({ url });
    if (!url) {
      return;
    }
    if (!file) {
      return;
    }

    const response = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file?.type,
      },
    });
    if (response.ok) {
      toast.success("Image uploaded successfully");

      const newProfileImage = await saveAndReturnImage();
      console.log("This is the new image url: ", { newProfileImage });
      if (newProfileImage?.failure) {
        toast.error(newProfileImage?.failure?.error);
        return;
      }
      setImageUrl(tempImageUrl);
      console.log("This is the new image url after setting the state: ", {
        newProfileImage,
      });
      setFile(undefined);
    } else {
      toast.error("Failed to upload image");
      setFile(undefined);
      setImageUrl(undefined);
    }
  };

  useEffect(() => {
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setTempImageUrl(newImageUrl);
    }
  }, [file]);

  const handleUndo = () => {
    setFile(undefined);
    setImageUrl(undefined);
  };

  return (
    <div className="flex flex-row items-center justify-center gap-2 w-full">
      {/* <Image
        src={tempImageUrl || imageUrl || ""}
        alt={dbUser?.name || ""}
        width={80}
        height={80}
        className="h-24 w-24 rounded-full object-cover border-white shadow-xl"
        priority
      /> */}

      <UserAvatar dbUser={dbUser} src={tempImageUrl || imageUrl || ""} />
      {!file && (
        <Button
          type="button"
          className="dark:bg-gray-900 bg-gray-50 shadow-lg text-black dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <label className="hover:cursor-pointer" htmlFor="file">
            Upload Image
          </label>
          <input
            accept="image/jpg image/jpeg image/png"
            name="file"
            type="file"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </Button>
      )}
      {file && (
        <>
          <Button
            className="dark:bg-gray-900 bg-gray-50 shadow-lg text-black dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={handleAccept}
          >
            Save
          </Button>
          <Button
            type="button"
            className="dark:bg-gray-900 bg-gray-50 shadow-lg text-black dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800"
            size="icon"
            onClick={handleUndo}
          >
            <Undo2 />
          </Button>
        </>
      )}
    </div>
  );
};

export default FileUpload;
