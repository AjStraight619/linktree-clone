import React from "react";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Icon } from "./types";

export const icons: { [key: string]: Icon } = {
  linkedin: { icon: React.createElement(FaLinkedinIn), name: "LinkedIn" },
  twitter: { icon: React.createElement(FaTwitter), name: "Twitter" },
  github: { icon: React.createElement(FaGithub), name: "GitHub" },
  facebook: { icon: React.createElement(FaFacebookF), name: "Facebook" },
  instagram: { icon: React.createElement(FaInstagram), name: "Instagram" },
};
