import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

export const Logout = () => {
  return (
    <LogoutLink className="dark:bg-gray-900 bg-gray-50 shadow-lg text-black dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-900 absolute top-2 right-2">
      Log out
    </LogoutLink>
  );
};
