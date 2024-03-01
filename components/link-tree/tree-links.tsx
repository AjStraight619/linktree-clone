"use client";

import { ulVariants } from "@/lib/constants";
import { icons } from "@/lib/data";
import { DbUserWithLinks, UserLink, UserLinkAction } from "@/lib/types";
import { getTitleFromUrl } from "@/lib/utils";
import { motion } from "framer-motion";
import { UserIcon } from "lucide-react";
import { useOptimistic } from "react";
import TreeLink from "./tree-link";

type LinksProps = {
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

const TreeLinks = ({ dbUser }: LinksProps) => {
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

  console.log("initialUserLinks", initialUserLinks);

  const [optimisticUserLinks, dispatch] = useOptimistic(
    initialUserLinks ?? [],
    reducer
  );

  return (
    <div className="flex flex-col items-center justify-between">
      <motion.ul animate="animate" initial="hidden" variants={ulVariants}>
        {optimisticUserLinks.map((link) => (
          <TreeLink key={link.id} link={link} dispatch={dispatch} />
        ))}
      </motion.ul>
    </div>
  );
};

export default TreeLinks;
