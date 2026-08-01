import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CalculatorCard } from "@/components/calculator-card";
import { calculatorsByCategory, getCategory } from "@/lib/calculators";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category not found — CalculatorHub" }, { name: "robots", content: "noindex" }] };
    }
    const { category } = loaderData;
    const title = `${category.name} Calculators — CalculatorHub`;
    const description = `${category.blurb} Free, instant ${category.name.toLowerCase()} calculators with formulas and step-by-step explanations.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/category/${category.slug}` }],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const calcs = calculatorsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link to="/categories" className="hover:text-foreground">
          Categories
        </Link>
        <span>/</span>
        <span className="text-foreground">{category.name}</span>
      </nav>

      <h1 className="mt-5 font-display text-3xl font-bold sm:text-4xl">{category.name} calculators</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{category.blurb}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calcs.map((calc, i) => (
          <CalculatorCard key={calc.slug} calc={calc} index={i} />
        ))}
      </div>
    </div>
  );
}
