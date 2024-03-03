import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import React from "react";
import { Icon } from "./types";

export const icons: { [key: string]: Icon } = {
  linkedin: { icon: React.createElement(LinkedinIcon), name: "LinkedIn" },
  twitter: { icon: React.createElement(TwitterIcon), name: "X" },
  github: { icon: React.createElement(GithubIcon), name: "GitHub" },
  facebook: { icon: React.createElement(FacebookIcon), name: "Facebook" },
  instagram: { icon: React.createElement(InstagramIcon), name: "Instagram" },
};
