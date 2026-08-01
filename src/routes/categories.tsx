import { createFileRoute, Link } from "@tanstack/react-router";
import { calculatorsByCategory, categories } from "@/lib/calculators";

const title = "Calculator Categories — CalculatorHub";
const description =
  "Explore CalculatorHub by category: finance, health, education, mathematics, engineering, physics, chemistry, time and date, unit converters, everyday life and programming.";

export const Route = createFileRoute("/categories")({
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
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Categories</h1>
      <p className="mt-2 text-sm text-muted-foreground">Eleven curated collections covering every kind of calculation.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => (
          <Link
            key={cat.slug}
            to="/category/$slug"
            params={{ slug: cat.slug }}
            className={`surface-card animate-rise bg-gradient-to-br p-5 ${cat.accent}`}
            style={{ animationDelay: `${i * 35}ms` }}
          >
            <h2 className="font-display text-lg font-semibold">{cat.name}</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">{cat.blurb}</p>
            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-primary">
              {calculatorsByCategory(cat.slug).length} calculators
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
