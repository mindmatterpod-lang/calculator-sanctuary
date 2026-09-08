import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Canonical site origin, no trailing slash. Use this for every absolute URL
 * needed in structured data (BreadcrumbList, Article, etc.) and canonical
 * links -- schema.org's "item"/"@id" fields must be absolute URLs, and a few
 * routes previously hardcoded relative paths like "/" instead, which Google's
 * Rich Results Test flags as "Invalid URL in field id".
 */
export const SITE_URL = "https://calculator-sanctuary.vercel.app";

