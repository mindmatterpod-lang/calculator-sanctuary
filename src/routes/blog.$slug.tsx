import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCalculator } from "@/lib/calculators";
import { getPost } from "@/lib/posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found — CalculatorHub" }, { name: "robots", content: "noindex" }] };
    }
    const { post } = loaderData;
    const title = `${post.title} — CalculatorHub`;
    return {
      meta: [
        { title },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/blog/${post.slug}` }],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  const calc = post.related ? getCalculator(post.related) : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        articleSection: "Calculator guides",
        author: { "@type": "Organization", name: "CalculatorHub" },
        publisher: { "@type": "Organization", name: "CalculatorHub" },
        mainEntityOfPage: `/blog/${post.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
          { "@type": "ListItem", position: 3, name: post.title, item: `/blog/${post.slug}` },
        ],
      },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link to="/blog" className="hover:text-foreground">
          Blog
        </Link>
        <span>/</span>
        <span className="text-foreground">{post.title}</span>
      </nav>

      <h1 className="mt-5 font-display text-3xl font-bold sm:text-4xl">{post.title}</h1>
      <p className="mt-2 text-xs uppercase tracking-wide text-primary">{post.readTime}</p>

      <div className="mt-7 space-y-5 text-base leading-relaxed text-muted-foreground">
        {post.body.map((para: string, i: number) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {calc ? (
        <Link to="/calculator/$slug" params={{ slug: calc.slug }} className="surface-card mt-10 block p-5">
          <p className="text-xs uppercase tracking-wide text-primary">Try it yourself</p>
          <h2 className="mt-1 font-display text-lg font-semibold">{calc.name}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{calc.description}</p>
        </Link>
      ) : null}
    </article>
  );
}
