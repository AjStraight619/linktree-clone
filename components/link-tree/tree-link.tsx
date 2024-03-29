import { liVariants } from "@/lib/constants";
import { UserLink, UserLinkAction } from "@/lib/types";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import RemoveLink from "./remove-link";

type TreeLinkProps = {
  link: UserLink;
  dispatch: React.Dispatch<UserLinkAction>;
};

const TreeLink = ({ link, dispatch }: TreeLinkProps) => {
  const pathname = usePathname();
  return (
    <motion.li
      className="flex items-center justify-between w-full rounded-xl shadow-lg p-2 dark:bg-gray-900 border"
      variants={liVariants}
    >
      <a
        href={link.url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 w-full"
      >
        <span>{link.icon}</span>
        <span>{link.title}</span>
      </a>
      {pathname === "/dashboard" && (
        <RemoveLink link={link} dispatch={dispatch} />
      )}
    </motion.li>
  );
};

export default TreeLink;
