import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { calculators, categories } from "@/lib/calculators";
import { posts } from "@/lib/posts";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          "/",
          "/calculators",
          "/categories",
          "/blog",
          ...categories.map((c) => `/category/${c.slug}`),
          ...calculators.map((c) => `/calculator/${c.slug}`),
          ...posts.map((p) => `/blog/${p.slug}`),
        ];

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...paths.map(
            (p) =>
              `  <url>\n    <loc>${BASE_URL}${p}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${p === "/" ? "1.0" : "0.7"}</priority>\n  </url>`,
          ),
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
