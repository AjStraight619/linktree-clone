"use client";

import { DbUserWithLinks } from "@/lib/types";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import TreeLinks from "./tree-links";
import Username from "./username";

type ProfileCardProps = {
  dbUser: DbUserWithLinks | null;
};

const ProfileCard = ({ dbUser }: ProfileCardProps) => {
  const pathname = usePathname();
  const { push } = useRouter();

  return (
    <>
      <Card className="w-[24rem] dark:bg-gray-950 shadow-lg relative">
        <CardHeader>
          <div className="flex flex-row items-center justify-center">
            <div className="relative p-2">
              <Image
                src={dbUser?.avatar || ""}
                alt={dbUser?.name || ""}
                width={80}
                height={80}
                className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
                priority
              />
            </div>

            <span className="text-2xl font-semibold ml-1">{dbUser?.name}</span>
          </div>
        </CardHeader>
        <CardDescription className="text-center text-pretty tracking-tight leading-4 w-full pb-3 px-2">
          {dbUser?.bio}
        </CardDescription>
        <CardContent className="flex flex-col items-center justify-center w-full">
          <Username dbUser={dbUser} />
          <div className="mt-4 w-full">
            <TreeLinks dbUser={dbUser} />
          </div>
        </CardContent>
        {pathname === "/dashboard" && (
          <div className="absolute right-1 top-1">
            <Button
              onClick={() => push("/dashboard/profile")}
              className="dark:bg-gray-900 bg-gray-50 shadow-lg dark:text-gray-50 text-black dark:hover:bg-gray-800 hover:bg-gray-100"
              size="sm"
            >
              Edit Profile
            </Button>
          </div>
        )}
      </Card>
    </>
  );
};

export default ProfileCard;
