/** Long-form, server-rendered editorial content attached to a calculator. */
export interface CalcContent {
  /** 2-4 sentence opener written for this specific tool and its real users. */
  intro: string;
  /** Plain-language method, with the actual variables named. */
  method: string[];
  /** One full worked example with realistic numbers, rendered as static text. */
  example: { title: string; lines: string[] };
  /** Calculator-specific pitfalls. */
  mistakes: { title: string; body: string }[];
  /** 4-6 pairs sourced from real related queries. Overrides the calculator's short FAQ. */
  faqs: { q: string; a: string }[];
  /** Slugs of genuinely related calculators (4-6). */
  related?: string[];
  /** Companion blog post. Omit when the calculator already has a hand-written post. */
  post?: {
    slug?: string;
    title: string;
    excerpt: string;
    readTime: string;
    body: string[];
    /** Slugs of related blog posts for the "Related guides" block. */
    guides?: string[];
  };
}

export type ContentMap = Record<string, CalcContent>;
