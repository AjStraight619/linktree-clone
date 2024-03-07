import { clsx, type ClassValue } from "clsx";
import { UserIcon } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Icon } from "./types";

/**
 * Icons mapping to their respective React components and names.
 * @type {{[key: string]: Icon}}
 */
export const icons: { [key: string]: Icon } = {
  linkedin: { icon: React.createElement(FaLinkedinIn), name: "LinkedIn" },
  twitter: { icon: React.createElement(FaTwitter), name: "Twitter" },
  github: { icon: React.createElement(FaGithub), name: "GitHub" },
  facebook: { icon: React.createElement(FaFacebookF), name: "Facebook" },
  instagram: { icon: React.createElement(FaInstagram), name: "Instagram" },
};

/**
 * Merges class names using clsx and twMerge for handling conditional and combined class names in TailwindCSS.
 * @param {...ClassValue[]} inputs - Class values to be merged.
 * @returns {string} The merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts the domain from a given URL, removing 'www.' and leaving the primary domain name.
 * @param {string} url - The URL from which the domain will be extracted.
 * @returns {string} The extracted domain name or an empty string in case of an error.
 */
export const extractDomain = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname.replace("www.", "").split(".")[0];
  } catch (error) {
    console.error("Error parsing URL:", error);
    return ""; // Return an empty string to avoid null
  }
};

/**
 * Retrieves the title associated with a URL based on the domain.
 * @param {string} url - The URL to extract the title from.
 * @returns {string} The title associated with the URL or "Unknown" if no match is found.
 */
export const getTitleFromUrl = (url: string) => {
  const matchingKey = Object.keys(icons).find((key) =>
    url.toLowerCase().includes(key)
  );

  return matchingKey ? icons[matchingKey].name : "Unknown";
};

/**
 * Matches an icon to the given URL based on its domain.
 * @param {string} url - The URL to match an icon to.
 * @returns {React.ReactElement} The matched icon component or a default UserIcon if no match is found.
 */
export const matchIcon = (url: string): React.ReactElement => {
  const domain = getTitleFromUrl(url).toLowerCase();
  return (
    icons[domain as keyof typeof icons]?.icon || React.createElement(UserIcon)
  );
};

/**
 * Checks if a given link is a valid HTTP or HTTPS URL.
 * @param {string} link - The link to be validated.
 * @returns {boolean} True if the link starts with http:// or https://, otherwise false.
 */
export const checkIsLinkValid = (link: string) => {
  return link.startsWith("http://") || link.startsWith("https://");
};

/**
 * Extracts an error message from various error types.
 * @param {unknown} error - The error from which to extract the message.
 * @returns {string} The extracted error message or a default message if the extraction fails.
 */
export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};
