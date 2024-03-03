"use client";
import { ulVariants } from "@/lib/constants";
import { DbUserWithLinks, UserLink, UserLinkAction } from "@/lib/types";
import { matchIcon } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useOptimistic } from "react";
import AddNewLinks from "./add-new-links";
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
  const initialUserLinks = dbUser?.links?.map((link) => ({
    id: link.id,
    title: link.title,
    url: link.url,
    icon: matchIcon(link.url),
  }));

  const [optimisticUserLinks, dispatch] = useOptimistic(
    initialUserLinks ?? [],
    reducer
  );

  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <motion.ul
        className="flex flex-col w-full"
        animate="animate"
        initial="hidden"
        variants={ulVariants}
      >
        {optimisticUserLinks.map((link) => (
          <TreeLink key={link.id} link={link} dispatch={dispatch} />
        ))}
      </motion.ul>
      {pathname === "/dashboard" && (
        <AddNewLinks dispatch={dispatch} dbUser={dbUser} />
      )}
    </div>
  );
};

export default TreeLinks;
