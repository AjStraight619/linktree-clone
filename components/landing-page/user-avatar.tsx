import { User } from "@prisma/client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type UserAvatarProps = {
  dbUser: User | null;
};

const UserAvatar = ({ dbUser }: UserAvatarProps) => {
  return (
    <>
      {dbUser && (
        <Link href="/dashboard">
          <Avatar className="absolute top-2 right-14">
            <AvatarImage src={dbUser?.avatar || ""} alt={dbUser?.name} />
            <AvatarFallback>
              {dbUser?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>
      )}
    </>
  );
};

export default UserAvatar;
