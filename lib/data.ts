import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";
import { Icon } from "./types";

export const icons: { [key: string]: Icon } = {
  linkedin: { icon: React.createElement(Linkedin), name: "LinkedIn" },
  twitter: { icon: React.createElement(Twitter), name: "X" },
  github: { icon: React.createElement(Github), name: "GitHub" },
  facebook: { icon: React.createElement(Facebook), name: "Facebook" },
  instagram: { icon: React.createElement(Instagram), name: "Instagram" },
};

export const testLinks = [
  {
    id: 1,
    title: "GitHub",
    url: "https://github.com",
  },
  {
    id: 2,
    title: "LinkedIn",
    url: "https://linkedin.com",
  },
  {
    id: 3,
    title: "Twitter",
    url: "https://twitter.com",
  },
  {
    id: 4,
    title: "Instagram",
    url: "https://instagram.com",
  },
  {
    id: 5,
    title: "Facebook",
    url: "https://facebook.com",
  },
];
