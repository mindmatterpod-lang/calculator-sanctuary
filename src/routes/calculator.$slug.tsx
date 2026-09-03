import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CalculatorRunner } from "@/components/calculator-runner";
import { CalculatorCard } from "@/components/calculator-card";
import { calculators, calculatorsByCategory, getCalculator, getCategory } from "@/lib/calculators";
import { posts } from "@/lib/posts";
import { getContent } from "@/lib/content";

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
      // Old line 33:
// links: [{ rel: 'canonical', href: `/calculator/${calc.slug}` }],

// Fixed line 33:
links: [{ rel: 'canonical', href: `https://calculator-sanctuary.vercel.app/calculator/${calc.slug}` }],
    };
  },

  component: CalculatorPage,
});

function CalculatorPage() {
  const { slug } = Route.useLoaderData();
  const calc = getCalculator(slug);
  if (!calc) throw notFound();
  const category = getCategory(calc.category);

  const content = getContent(calc.slug);
  const faqs = content?.faqs?.length ? content.faqs : (calc.faqs ?? []);
  const curated = content?.related
    ?.map((s) => calculators.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c) && c!.slug !== calc.slug);
  const related = (curated?.length ? curated : calculatorsByCategory(calc.category).filter((c) => c.slug !== calc.slug)).slice(
    0,
    6,
  );
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
        "itemListElement": [
  { 
    "@type": "ListItem", 
    position: 1, 
    name: "Home", 
    item: "https://calculator-sanctuary.vercel.app/" 
  },
  { 
    "@type": "ListItem", 
    position: 2, 
    name: "Calculators", 
    item: "https://calculator-sanctuary.vercel.app/calculators" 
  },
  { 
    "@type": "ListItem", 
    position: 3, 
    name: calc.name, 
    item: `https://calculator-sanctuary.vercel.app/calculator/${calc.slug}` 
  }
],
      },
      ...(faqs.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((faq: { q: string; a: string }) => ({
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />


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
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{content?.intro ?? calc.description}</p>
      </header>

      <div className="mt-8">
        <CalculatorRunner calc={calc} />
      </div>

      {content ? (
        <>
          <section className="mt-14 max-w-3xl">
            <h2 className="font-display text-2xl font-bold">How the {calc.name.toLowerCase()} works</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
              {content.method.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </section>

          <section className="mt-12 max-w-3xl">
            <h2 className="font-display text-2xl font-bold">{content.example.title}</h2>
            <ol className="surface-card mt-4 space-y-3 p-5 text-sm leading-relaxed text-muted-foreground">
              {content.example.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          </section>

          <section className="mt-12 max-w-3xl">
            <h2 className="font-display text-2xl font-bold">Common mistakes to avoid</h2>
            <div className="mt-4 space-y-3">
              {content.mistakes.map((m) => (
                <div key={m.title} className="surface-card p-5">
                  <h3 className="font-display text-base font-semibold">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : null}

      {faqs.length ? (
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold">Frequently asked questions</h2>
          <div className="mt-5 space-y-3">
            {faqs.map((faq: { q: string; a: string }) => (
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
