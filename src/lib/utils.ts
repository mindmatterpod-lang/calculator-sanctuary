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

/**
 * Builds a meta description from a calculator's own long-form intro instead
 * of a generic template suffix. Every calculator on the site previously
 * shared the identical trailing sentence ("Instant results, formula
 * breakdown and step-by-step working.") in its meta description -- a
 * template Google can detect, and one that gives a searcher no real reason
 * to click over a competitor, especially on sensitive/YMYL queries where
 * trust signals matter more than ranking position. Since every calculator
 * now has a genuinely unique, specific intro, this pulls from that instead,
 * truncated to a clean sentence boundary near Google's ~155-160 char
 * display limit. Falls back to the short template description only if a
 * calculator somehow has no long-form content yet.
 */
export function metaDescriptionFrom(intro: string | undefined, fallback: string): string {
  if (!intro) return fallback;
  const maxLen = 158;
  if (intro.length <= maxLen) return intro;
  const truncated = intro.slice(0, maxLen);
  const lastSentenceEnd = Math.max(truncated.lastIndexOf(". "), truncated.lastIndexOf("? "));
  if (lastSentenceEnd > 60) return truncated.slice(0, lastSentenceEnd + 1);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace)}…`;
}

