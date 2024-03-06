"use client";
import { editProfile } from "@/actions/profile-actions";
import Bio from "@/components/profile-page/bio";
import FileUpload from "@/components/profile-page/file-upload";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submit-btn";
import { useSearch } from "@/hooks/useSearch";
import { User } from "@prisma/client";
import { Check, ChevronLeftIcon, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type EditProfileProps = {
  dbUser: User | null;
  usernameAvailability?: boolean;
  username?: string;
};

const EditProfile = ({
  dbUser,
  usernameAvailability,
  username,
}: EditProfileProps) => {
  const [usernameValidityMessage, setUsernameValidityMessage] =
    useState<string>("");

  const handleAction = async (formData: FormData) => {
    if (!username) return;
    if (username.length < 3 || username.length > 20) {
      return;
    }
    formData.append("userId", dbUser?.id as string);
    const actionResponse = await editProfile(formData);
    if (actionResponse.failure) {
      toast.error(actionResponse.failure.error);
    } else {
      toast.success("Profile updated successfully");
    }
  };

  const { handleSearch, searchParams } = useSearch("username");

  useEffect(() => {
    if (!username || username.length === 0) {
      setUsernameValidityMessage("");
      return;
    }
    if (username && username.length < 3) {
      setUsernameValidityMessage("Username must be at least 3 characters");
      return;
    }
    if (username && username.length > 20) {
      setUsernameValidityMessage("Username must be at most 20 characters");
      return;
    }
    setUsernameValidityMessage(
      usernameAvailability
        ? "Username is available"
        : "Username is already taken"
    );
  }, [username, usernameAvailability]);

  return (
    <Card className="w-[24rem] dark:bg-gray-950 shadow-lg relative">
      <CardHeader>
        <CardTitle className="text-center">Edit Profile</CardTitle>
      </CardHeader>

      <form action={handleAction}>
        <CardContent className="flex flex-col space-y-2">
          <FileUpload dbUser={dbUser} />

          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            required
            defaultValue={dbUser?.name}
            placeholder="Enter your name"
          />

          <Label htmlFor="username">Username</Label>
          <div className="flex flex-col space-y-1">
            <Input
              required
              name="username"
              defaultValue={dbUser?.username ?? ""}
              placeholder="Enter a user name"
              minLength={3}
              maxLength={20}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div className="flex flex-row gap-1 tracking-tighter leading-4 text-xs sm:text-sm items-center">
              {usernameValidityMessage}
              <span>
                {usernameAvailability === true ? (
                  <Check className="text-green-500" />
                ) : usernameAvailability == false ? (
                  <X className="text-red-500" />
                ) : null}
              </span>
            </div>
          </div>
          <Bio dbUser={dbUser} />
        </CardContent>

        <CardFooter className="justify-between">
          <Link
            className="inline-flex gap-1 items-center group transition-all hover:opacity-75"
            href="/dashboard"
          >
            <ChevronLeftIcon className="transition-transform group-hover:-translate-x-1" />
            <span className="transition-opacity group-hover:opacity-75">
              Dashboard
            </span>
          </Link>
          <SubmitButton className="dark:bg-gray-900 bg-gray-50 shadow-lg text-black dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800">
            Save Changes
          </SubmitButton>
        </CardFooter>
      </form>
    </Card>
  );
};

export default EditProfile;
