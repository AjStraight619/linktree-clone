import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";

type UserAvatarProps = {
  user: KindeUser | null;
};

const UserAvatar = ({ user }: UserAvatarProps) => {
  return <div>UserAvatar</div>;
};

export default UserAvatar;
