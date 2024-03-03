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
import { User } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

type ProfileCardProps = {
  dbUser: User | null;
};

const ProfileCard = ({ dbUser }: ProfileCardProps) => {
  const handleAction = async (formData: FormData) => {
    formData.append("userId", dbUser?.id as string);
    const actionResponse = await editProfile(formData);
    if (actionResponse.failure) {
      toast.error(actionResponse.failure.error);
    } else {
      toast.success("Profile updated successfully");
    }
  };
  return (
    <Card className="min-w-[24rem] dark:bg-gray-950 shadow-lg relative">
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
          <Input
            required
            name="username"
            defaultValue={dbUser?.username ?? ""}
            placeholder="Enter a user name"
            minLength={3}
            maxLength={20}
          />
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
          <SubmitButton className="dark:bg-gray-900 bg-gray-50 shadow-lg text-black dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-900">
            Save Changes
          </SubmitButton>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProfileCard;
