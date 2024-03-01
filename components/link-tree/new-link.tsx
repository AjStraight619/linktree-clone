import { UserLink } from "@/lib/types";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "../ui/button";

type NewLinksProps = {
  link: UserLink;
  handleRemoveNewLink: (link: UserLink) => void;
};

const NewLink = ({ link, handleRemoveNewLink }: NewLinksProps) => {
  return (
    <>
      <motion.li
        className="flex flex-row justify-between items-center rounded-xl p-2 shadow-lg dark:bg-gray-950 bg-gray-200 w-full"
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        initial={{
          y: 20,
          opacity: 0,
          scale: 0.8,
        }}
      >
        <div className="flex flex-row items-center gap-2">
          <span>{link.icon}</span>
          <span>{link.title}</span>
        </div>
        <Button
          onClick={() => handleRemoveNewLink(link)}
          type="button"
          variant="ghost"
          size="icon"
        >
          <X />
        </Button>
      </motion.li>
    </>
  );
};

export default NewLink;
