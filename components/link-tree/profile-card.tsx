"use client";

import { icons } from "@/lib/data";
import { DbUserWithLinks, UserLink, UserLinkAction } from "@/lib/types";
import { getTitleFromUrl } from "@/lib/utils";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import TreeLinks from "./tree-links";
import Username from "./username";

type ProfileCardProps = {
  dbUser: DbUserWithLinks;
};

function reducer(state: UserLink[], action: UserLinkAction): UserLink[] {
  switch (action.type) {
    case "add":
      return Array.isArray(action.payload)
        ? [...state, ...action.payload]
        : [...state, action.payload];

    case "remove":
      return state.filter((link) => link.id !== action.payload.id);

    case "update":
      const updatePayloads = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      return state.map((link) => {
        const payloadItem = updatePayloads.find((item) => item.id === link.id);
        return payloadItem ? { ...link, ...payloadItem } : link;
      });

    case "pending":
      const pendingPayloads = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      return state.map((link) => {
        const payloadItem = pendingPayloads.find((item) => item.id === link.id);
        return payloadItem ? { ...link, pending: payloadItem.pending } : link;
      });

    default:
      return state;
  }
}

const ProfileCard = ({ dbUser }: ProfileCardProps) => {
  const matchIcon = (url: string): React.ReactElement => {
    const domain = getTitleFromUrl(url).toLowerCase();
    return icons[domain as keyof typeof icons]?.icon || <UserIcon />;
  };

  const initialUserLinks = dbUser?.links?.map((link) => ({
    id: link.id,
    title: link.title,
    url: link.url,
    icon: matchIcon(link.url),
  }));

  return (
    <Card>
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
      <CardContent className="flex flex-col items-center justify-center">
        <Username dbUser={dbUser} />
        <div className="mt-4">
          <TreeLinks dbUser={dbUser} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
