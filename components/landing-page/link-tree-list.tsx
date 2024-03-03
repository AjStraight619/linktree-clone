"use client";

import { DbUserWithLinks } from "@/lib/types";
import { motion } from "framer-motion";
import ProfileCard from "../link-tree/profile-card";

type LinkTreeListProps = {
  dbUser: DbUserWithLinks;
};

const LinkTreeList = ({ dbUser }: LinkTreeListProps) => {
  return (
    <motion.div>
      <ProfileCard dbUser={dbUser} />
    </motion.div>
  );
};

export default LinkTreeList;
