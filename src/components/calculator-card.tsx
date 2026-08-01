import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Calculator } from "@/lib/calculators";

export function CalculatorCard({ calc, index = 0 }: { calc: Calculator; index?: number }) {
  return (
    <Link
      to="/calculator/$slug"
      params={{ slug: calc.slug }}
      className="surface-card animate-rise group flex flex-col justify-between gap-3 p-5"
      style={{ animationDelay: `${Math.min(index, 12) * 35}ms` }}
    >
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-semibold leading-snug">{calc.name}</h3>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{calc.description}</p>
      </div>
      <span className="w-fit rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-secondary-foreground">
        {calc.category.replace("-", " ")}
      </span>
    </Link>
  );
}
