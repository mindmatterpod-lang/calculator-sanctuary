import { Link } from "@tanstack/react-router";
import { Calculator } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  { to: "/calculators", label: "All calculators" },
  { to: "/categories", label: "Categories" },
  { to: "/blog", label: "Blog" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-panel border-b border-border/60">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:flex sm:justify-between sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Calculator className="h-[18px] w-[18px]" />
            </span>
            <span className="truncate font-display text-lg font-semibold tracking-tight">
              Calculator<span className="text-gradient">Hub</span>
            </span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <nav className="hidden items-center gap-1 md:flex">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  activeProps={{ className: "bg-accent text-foreground" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} CalculatorHub. Fast, accurate, free.</p>
        <nav className="flex flex-wrap gap-4">
          <Link to="/calculators" className="hover:text-foreground">
            Calculators
          </Link>
          <Link to="/categories" className="hover:text-foreground">
            Categories
          </Link>
          <Link to="/blog" className="hover:text-foreground">
            Blog
          </Link>
        </nav>
      </div>
    </footer>
  );
}
