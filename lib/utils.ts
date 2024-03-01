import { clsx, type ClassValue } from "clsx";
import { UserIcon } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";
import { icons } from "./data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const extractDomain = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname.replace("www.", "").split(".")[0];
  } catch (error) {
    console.error("Error parsing URL:", error);
    return ""; // Return an empty string to avoid null
  }
};

export const getTitleFromUrl = (url: string) => {
  const domain = extractDomain(url).toLowerCase();

  // Iterate over the icons object keys to find a match
  const matchingKey = Object.keys(icons).find((key) =>
    url.toLowerCase().includes(key)
  );

  if (matchingKey) {
    return icons[matchingKey].name; // Return the 'name' from the matching icon entry
  } else {
    return "Unknown"; // Fallback title
  }
};

export const matchIcon = (url: string): React.ReactElement => {
  const domain = getTitleFromUrl(url).toLowerCase();
  return (
    icons[domain as keyof typeof icons]?.icon || React.createElement(UserIcon)
  );
};

export const checkIsLinkValid = (link: string) => {
  return link.startsWith("http://") || link.startsWith("https://");
};

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
