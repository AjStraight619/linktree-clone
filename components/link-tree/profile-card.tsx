"use client";

import { DbUserWithLinks } from "@/lib/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import UserAvatar from "../landing-page/user-avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import TreeLinks from "./tree-links";

type ProfileCardProps = {
  dbUser: DbUserWithLinks | null;
};

const ProfileCard = ({ dbUser }: ProfileCardProps) => {
  const pathname = usePathname();
  const { push } = useRouter();

  return (
    <motion.div
      animate={{
        scale: [0, 1],
        opacity: [0, 1],
      }}
      initial={{
        scale: 0,
        opacity: 0,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <Card className="w-[24rem] dark:bg-gray-950 shadow-lg relative">
        <CardHeader>
          <div className="flex flex-row items-center justify-center">
            <div className="relative p-2">
              <UserAvatar dbUser={dbUser} className="h-16 w-16" />
            </div>

            <span className="text-2xl font-semibold ml-1">{dbUser?.name}</span>
          </div>
        </CardHeader>
        <CardDescription className="flex flex-col space-y-2">
          <Link
            href={`/${dbUser?.username}`}
            className="text-pretty text-center text-sm"
          >
            {"@" + dbUser?.username}
          </Link>
          <span className="text-center text-pretty tracking-tight leading-4 w-full pb-3 px-2">
            {dbUser?.bio}
          </span>
        </CardDescription>
        <CardContent className="flex flex-col items-center justify-center w-full">
          {/* <Username dbUser={dbUser} /> */}

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
    </motion.div>
  );
};

export default ProfileCard;
