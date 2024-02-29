import { User } from "@prisma/client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type UserAvatarProps = {
  dbUser: User | null;
};

const UserAvatar = ({ dbUser }: UserAvatarProps) => {
  return (
    <Link href="/dashboard">
      <Avatar className="absolute top-2 right-14">
        <AvatarImage src={dbUser?.avatar} alt={dbUser?.name} />
        <AvatarFallback>{dbUser?.name?.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
    </Link>
    // <div className="absolute top-4 right-12">
    //   <Image
    //     className="rounded-full"
    //     src={dbUser?.avatar || ""}
    //     alt={dbUser?.name || "User Avatar"}
    //     width={80}
    //     height={80}
    //   />
    // </div>
  );
};

export default UserAvatar;
