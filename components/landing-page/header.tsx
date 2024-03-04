import { User } from "@prisma/client";
import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import UserAvatar from "./user-avatar";

type HeaderProps = {
  dbUser: User | null;
};

export const Header = ({ dbUser }: HeaderProps) => (
  <header className="fixed top-0 w-full h-16 border-b bg-white dark:bg-gray-800">
    <div className="container mx-auto flex justify-between items-center h-full px-4">
      <div>
        {/* Place for logo or application name */}
        <Link className="text-xl font-bold" href="/">
          Link Tree Clone
        </Link>
      </div>
      <ul className="flex items-center gap-4">
        {dbUser && (
          <li className="flex items-center gap-2">
            <Link className="inline-flex items-center gap-2" href="/dashboard">
              <UserAvatar dbUser={dbUser} />
              <span>{dbUser.name}</span>
            </Link>
          </li>
        )}
        <li>
          <ModeToggle />
        </li>
      </ul>
    </div>
  </header>
);
