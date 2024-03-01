"use client";

import { DbUserWithLinks } from "@/lib/types";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import TreeLinks from "./tree-links";
import Username from "./username";

type ProfileCardProps = {
  dbUser: DbUserWithLinks;
};

const ProfileCard = ({ dbUser }: ProfileCardProps) => {
  return (
    <Card className="min-w-[24rem] dark:bg-gray-950 shadow-lg relative">
      <CardHeader className="flex flex-row items-center justify-center">
        <Image
          src="/headshot.jpg"
          alt={dbUser?.name || ""}
          width={80}
          height={80}
          className="rounded-full p-2"
        />
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-semibold">{dbUser?.name}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center w-full">
        <Username dbUser={dbUser} />
        <div className="mt-4 w-full">
          <TreeLinks dbUser={dbUser} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
