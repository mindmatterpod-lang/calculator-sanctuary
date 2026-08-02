import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CalculatorRunner } from "@/components/calculator-runner";
import { CalculatorCard } from "@/components/calculator-card";
import { calculatorsByCategory, getCalculator, getCategory } from "@/lib/calculators";
import { posts } from "@/lib/posts";

export const Route = createFileRoute("/calculator/$slug")({
  loader: ({ params }) => {
    const calc = getCalculator(params.slug);
    if (!calc) throw notFound();
    // Only serializable data may cross the SSR boundary — compute() is a function.
    return { slug: calc.slug };
  },
  head: ({ loaderData }) => {
    const calc = loaderData ? getCalculator(loaderData.slug) : undefined;
    if (!calc) {
      return { meta: [{ title: "Calculator not found — CalculatorHub" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${calc.name} — Free Online Calculator | CalculatorHub`;
    const description = `${calc.description} Instant results, formula breakdown and step-by-step working.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `/calculator/${calc.slug}` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: `/calculator/${calc.slug}` }],
    };
  },

  component: CalculatorPage,
});

function CalculatorPage() {
  const { slug } = Route.useLoaderData();
  const calc = getCalculator(slug);
  if (!calc) throw notFound();
  const category = getCategory(calc.category);

  const related = calculatorsByCategory(calc.category)
    .filter((c) => c.slug !== calc.slug)
    .slice(0, 3);
  const article = posts.find((p) => p.related === calc.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: calc.name,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description: calc.description,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Calculators", item: "/calculators" },
          { "@type": "ListItem", position: 3, name: calc.name, item: `/calculator/${calc.slug}` },
        ],
      },
      ...(calc.faqs?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: calc.faqs.map((faq: { q: string; a: string }) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">

      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">

        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link to="/category/$slug" params={{ slug: calc.category }} className="hover:text-foreground">
          {category?.name ?? "Calculators"}
        </Link>
        <span>/</span>
        <span className="text-foreground">{calc.name}</span>
      </nav>

      <header className="mt-5 max-w-3xl">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">{calc.name}</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{calc.description}</p>
      </header>

      <div className="mt-8">
        <CalculatorRunner calc={calc} />
      </div>

      {calc.faqs?.length ? (
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold">Frequently asked questions</h2>
          <div className="mt-5 space-y-3">
            {calc.faqs.map((faq: { q: string; a: string }) => (
              <div key={faq.q} className="surface-card p-5">
                <h3 className="font-display text-base font-semibold">{faq.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {article ? (
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold">Learn more</h2>
          <Link to="/blog/$slug" params={{ slug: article.slug }} className="surface-card mt-5 block p-5">
            <h3 className="font-display text-base font-semibold">{article.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{article.excerpt}</p>
          </Link>
        </section>
      ) : null}

      {related.length ? (
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold">Related calculators</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rel, i) => (
              <CalculatorCard key={rel.slug} calc={rel} index={i} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
