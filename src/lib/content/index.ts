import type { Post } from "@/lib/posts";
import type { CalcContent, ContentMap } from "./types";
import { financeContent } from "./finance";

/** Registry of long-form content, keyed by calculator slug. Batches are added per category. */
export const calcContent: ContentMap = {
  ...financeContent,
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
