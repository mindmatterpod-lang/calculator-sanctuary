import type { Post } from "@/lib/posts";
import type { CalcContent, ContentMap } from "./types";
import { financeContent } from "./finance";
import { finance2Content } from "./finance-2";
import { finance3Content } from "./finance-3";
import { healthContent } from "./health";
import { mathematicsContent } from "./mathematics";
import { engineeringContent } from "./engineering";
import { physicsContent } from "./physics";
import { everydayLifeContent } from "./everyday-life";
import { programmingContent } from "./programming";
import { timeDateContent } from "./time-date";
import { educationContent } from "./education";
import { unitConvertersContent } from "./unit-converters";
import { chemistryContent } from "./chemistry";

/** Registry of long-form content, keyed by calculator slug. Full site coverage as of this batch. */
export const calcContent: ContentMap = {
  ...financeContent,
  ...finance2Content,
  ...finance3Content,
  ...healthContent,
  ...mathematicsContent,
  ...engineeringContent,
  ...physicsContent,
  ...everydayLifeContent,
  ...programmingContent,
  ...timeDateContent,
  ...educationContent,
  ...unitConvertersContent,
  ...chemistryContent,
};

export const getContent = (slug: string): CalcContent | undefined => calcContent[slug];

/** Blog posts generated from companion content, wired back to their calculator. */
export const contentPosts: Post[] = Object.entries(calcContent)
  .filter(([, c]) => Boolean(c.post))
  .map(([calcSlug, c]) => {
    const post = c.post!;
    return {
      slug: post.slug ?? `${calcSlug}-guide`,
      title: post.title,
      excerpt: post.excerpt,
      readTime: post.readTime,
      related: calcSlug,
      body: post.body,
      guides: post.guides,
    };
  });
