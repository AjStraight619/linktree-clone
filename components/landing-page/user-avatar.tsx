import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Image from "next/image";
import BorderGradient from "../ui/background-gradient";

type UserAvatarProps = {
  dbUser: User | null;
  className?: string;
};

const UserAvatar = ({ dbUser, className }: UserAvatarProps) => {
  return (
    <>
      {dbUser && (
        <BorderGradient className="rounded-full">
          <Image
            src={dbUser?.avatar || ""}
            alt={dbUser?.name || ""}
            width={60}
            height={60}
            className={cn(
              "h-12 w-12 rounded-full object-cover border-[0.2rem] border-white shadow-xl",
              className
            )}
            priority
          />
        </BorderGradient>
      )}
    </>
  );
};

export default UserAvatar;
