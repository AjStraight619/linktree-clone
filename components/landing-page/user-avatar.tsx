import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Image from "next/image";
import BorderGradient from "../ui/background-gradient";

type UserAvatarProps = {
  dbUser: User | null;
  className?: string;
  width?: number;
  height?: number;
  src?: string;
};

const UserAvatar = ({
  dbUser,
  className,
  width = 60,
  height = 60,
  src,
}: UserAvatarProps) => {
  return (
    <>
      {dbUser && (
        <BorderGradient className="rounded-full">
          <Image
            src={dbUser?.avatar || src || ""}
            alt={dbUser?.name || ""}
            width={width}
            height={height}
            className={cn(
              "rounded-full  bg-white p-[1px] shadow-xl",
              className
            )}
            priority
            quality={100}
          />
        </BorderGradient>
      )}
    </>
  );
};

export default UserAvatar;
