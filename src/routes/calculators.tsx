import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CalculatorCard } from "@/components/calculator-card";
import { calculators, categories, searchCalculators } from "@/lib/calculators";

const title = "All Calculators — CalculatorHub";
const description =
  "Search and filter every calculator on CalculatorHub: finance, health, education, maths, engineering, physics, chemistry, time, units, everyday life and programming.";

export const Route = createFileRoute("/calculators")({
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
  component: AllCalculators,
});

function AllCalculators() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const results = useMemo(() => {
    const base = searchCalculators(query);
    return category === "all" ? base : base.filter((c) => c.category === category);
  }, [query, category]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">All calculators</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {calculators.length} calculators, filtered instantly as you type.
      </p>

      <div className="glass-panel mt-8 flex items-center gap-3 rounded-2xl px-4 py-3">
        <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search calculators…"
          aria-label="Search calculators"
          className="h-9 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <FilterChip active={category === "all"} onClick={() => setCategory("all")} label="All" />
        {categories.map((cat) => (
          <FilterChip key={cat.slug} active={category === cat.slug} onClick={() => setCategory(cat.slug)} label={cat.name} />
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((calc, i) => (
          <CalculatorCard key={calc.slug} calc={calc} index={i} />
        ))}
      </div>
      {results.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">No calculators matched that search.</p>
      ) : null}
    </div>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card/60 text-muted-foreground hover:bg-accent hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}
