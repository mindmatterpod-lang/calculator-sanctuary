import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Sparkles, Zap } from "lucide-react";
import { FloatingSymbols } from "@/components/floating-symbols";
import { CalculatorCard } from "@/components/calculator-card";
import {
  calculators,
  categories,
  calculatorsByCategory,
  popularCalculators,
  searchCalculators,
} from "@/lib/calculators";

const title = "CalculatorHub — Every Calculator You'll Ever Need";
const description =
  "Hundreds of fast, accurate, free calculators for finance, health, maths, physics, chemistry and unit conversion — instantly searchable.";

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "CalculatorHub",
      url: "/",
      description,
      potentialAction: {
        "@type": "SearchAction",
        target: "/calculators?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      name: "CalculatorHub",
      url: "/",
      description: "CalculatorHub builds free, accurate online calculators for finance, health, education and science.",
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const examples = ["BMI", "Age", "Loan", "GST", "Percentage", "GPA", "Time", "Date", "Currency", "Physics", "Chemistry"];

function Home() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => (query.trim() ? searchCalculators(query).slice(0, 12) : []), [query]);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
      <section className="relative overflow-hidden px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
        <div className="aurora" />
        <FloatingSymbols />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="animate-rise inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {calculators.length}+ calculators live, more added weekly
          </span>
          <h1 className="animate-rise mt-6 text-balance font-display text-4xl font-bold leading-[1.05] sm:text-6xl" style={{ animationDelay: "60ms" }}>
            Every Calculator <span className="text-gradient">You'll Ever Need</span>
          </h1>
          <p className="animate-rise mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg" style={{ animationDelay: "120ms" }}>
            One website. Hundreds of powerful calculators. Fast, accurate, free, and beautifully designed.
          </p>
          <div className="animate-rise mt-8 flex flex-wrap justify-center gap-3" style={{ animationDelay: "180ms" }}>
            <Link
              to="/calculators"
              className="h-12 rounded-2xl bg-primary px-6 text-sm font-semibold leading-[3rem] text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Explore Calculators
            </Link>
            <a
              href="#popular"
              className="inline-flex h-12 items-center gap-2 rounded-2xl border border-border bg-card/70 px-6 text-sm font-semibold backdrop-blur transition-colors hover:bg-accent"
            >
              <Zap className="h-4 w-4 text-primary" />
              Most Popular
            </a>
          </div>

          <div className="animate-rise mt-12" style={{ animationDelay: "240ms" }}>
            <div className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3 text-left">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 500+ calculators — try BMI, loan, GST…"
                aria-label="Search calculators"
                className="h-9 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {examples.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => setQuery(ex)}
                  className="rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </div>

        {results.length > 0 ? (
          <div className="relative mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((calc, i) => (
              <CalculatorCard key={calc.slug} calc={calc} index={i} />
            ))}
          </div>
        ) : null}
        {query.trim() && results.length === 0 ? (
          <p className="relative mt-10 text-center text-sm text-muted-foreground">
            Nothing matched “{query}”. Try a shorter term.
          </p>
        ) : null}
      </section>

      <section id="popular" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">Most popular</h2>
        <p className="mt-2 text-sm text-muted-foreground">The calculators people reach for every single day.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularCalculators.map((calc, i) => (
            <CalculatorCard key={calc.slug} calc={calc} index={i} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Browse by category</h2>
            <p className="mt-2 text-sm text-muted-foreground">Eleven collections, from mortgages to molar mass.</p>
          </div>
          <Link to="/categories" className="text-sm font-medium text-primary hover:underline">
            See all categories
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              to="/category/$slug"
              params={{ slug: cat.slug }}
              className={`surface-card animate-rise relative overflow-hidden bg-gradient-to-br p-5 ${cat.accent}`}
              style={{ animationDelay: `${i * 35}ms` }}
            >
              <h3 className="font-display text-lg font-semibold">{cat.name}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{cat.blurb}</p>
              <p className="mt-4 text-xs font-medium uppercase tracking-wide text-primary">
                {calculatorsByCategory(cat.slug).length} calculators
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
