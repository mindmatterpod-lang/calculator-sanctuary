import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "@/lib/posts";

const title = "Calculator Guides & Explainers — CalculatorHub Blog";
const description =
  "Plain-English guides on BMI, compound interest, GPA, mortgages, GST and loans — written to sit alongside the calculators you use.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Guides & explainers</h1>
      <p className="mt-2 text-sm text-muted-foreground">Short, practical articles that pair with our calculators.</p>

      <div className="mt-8 space-y-4">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="surface-card animate-rise block p-5"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <h2 className="font-display text-lg font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
            <p className="mt-3 text-xs uppercase tracking-wide text-primary">{post.readTime}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
