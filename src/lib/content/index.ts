import type { Post } from "@/lib/posts";
import type { CalcContent, ContentMap } from "./types";
import { financeContent } from "./finance";
import { finance2Content } from "./finance-2";
import { finance3Content } from "./finance-3";
import { healthContent } from "./health";
import { mathematicsContent } from "./mathematics";
import { engineeringContent } from "./engineering";

/** Registry of long-form content, keyed by calculator slug. Batches are added per category. */
export const calcContent: ContentMap = {
  ...financeContent,
  ...finance2Content,
  ...finance3Content,
  ...healthContent,
  ...mathematicsContent,
  ...engineeringContent,
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
