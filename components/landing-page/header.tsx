"use client";
import { User } from "@prisma/client";
import { motion } from "framer-motion";
import { LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ModeToggle } from "../ui/mode-toggle";
import UserAvatar from "./user-avatar";

type HeaderProps = {
  dbUser: User | null;
};

const userOptions = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: React.createElement(LayoutDashboard),
  },
  {
    label: "Log Out",
    href: "/api/auth/logout",
    icon: React.createElement(LogOut),
  },
];

export const Header = ({ dbUser }: HeaderProps) => {
  return (
    <header className="fixed top-0 w-full h-16 pt-4">
      <div className="container mx-auto flex justify-between items-center h-full px-4">
        <div>
          {/* Place for logo or application name */}
          {/* <Link className="text-xl font-bold" href="/">
            Link Tree Clone
          </Link> */}
        </div>
        <ul className="flex items-center gap-4">
          {dbUser && (
            <li className="flex items-center gap-2">
              <UserDropdown dbUser={dbUser} />
            </li>
          )}
          <li>
            <ModeToggle />
          </li>
        </ul>
      </div>
    </header>
  );
};

const UserDropdown = ({ dbUser }: HeaderProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <UserAvatar dbUser={dbUser} width={40} height={40} />
          <span>{dbUser?.name}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white dark:bg-gray-900 p-2">
        <motion.ul className="flex flex-col gap-2">
          {userOptions.map((option, index) => (
            <motion.li key={index}>
              <Link href={option.href}>
                <div className="flex items-center gap-2">
                  <span>{option.icon}</span>
                  <span>{option.label}</span>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
