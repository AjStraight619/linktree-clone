import { clsx, type ClassValue } from "clsx";
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
