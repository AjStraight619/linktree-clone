import { UserLink, UserLinkAction } from "@/lib/types";
import { motion } from "framer-motion";
import RemoveLink from "../dashboard-page/remove-link";

type TreeLinkProps = {
  link: UserLink;
  dispatch: React.Dispatch<UserLinkAction>;
};

const TreeLink = ({ link, dispatch }: TreeLinkProps) => {
  return (
    <motion.li
      className="flex items-center justify-between w-full"
      animate="animate"
      initial="hidden"
    >
      <a
        href={link.url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2"
      >
        <span>{link.icon}</span>
        <span>{link.title}</span>
      </a>
      <RemoveLink link={link} dispatch={dispatch} />
    </motion.li>
  );
};

export default TreeLink;
