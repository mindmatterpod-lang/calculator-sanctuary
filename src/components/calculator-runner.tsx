import { useEffect, useMemo, useState } from "react";
import { Copy, Download, Heart, Share2 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import type { Calculator } from "@/lib/calculators";

function initialValues(calc: Calculator) {
  const out: Record<string, string> = {};
  for (const field of calc.fields ?? []) out[field.key] = String(field.default ?? "");
  return out;
}

function pushHistory(calc: Calculator, result: string) {
  try {
    const key = "ch-history";
    const prev = JSON.parse(localStorage.getItem(key) ?? "[]") as {
      slug: string;
      name: string;
      result: string;
      at: number;
    }[];
    const next = [{ slug: calc.slug, name: calc.name, result, at: Date.now() }, ...prev.filter((h) => h.slug !== calc.slug)].slice(0, 12);
    localStorage.setItem(key, JSON.stringify(next));
  } catch {
    /* storage unavailable */
  }
}

export function CalculatorRunner({ calc }: { calc: Calculator }) {
  const [values, setValues] = useState<Record<string, string>>(() => initialValues(calc));
  const [nonce, setNonce] = useState(0);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setValues(initialValues(calc));
  }, [calc]);

  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem("ch-favorites") ?? "[]") as string[];
      setFavorite(favs.includes(calc.slug));
    } catch {
      /* ignore */
    }
  }, [calc.slug]);

  const output = useMemo(() => {
    if (!calc.compute) return null;
    void nonce;
    try {
      return calc.compute(values);
    } catch {
      return { result: "Check your inputs" };
    }
  }, [calc, values, nonce]);

  useEffect(() => {
    if (output?.result) pushHistory(calc, output.result);
  }, [calc, output?.result]);

  const toggleFavorite = () => {
    try {
      const favs = new Set<string>(JSON.parse(localStorage.getItem("ch-favorites") ?? "[]"));
      if (favs.has(calc.slug)) favs.delete(calc.slug);
      else favs.add(calc.slug);
      localStorage.setItem("ch-favorites", JSON.stringify([...favs]));
      setFavorite(favs.has(calc.slug));
      toast.success(favs.has(calc.slug) ? "Saved to favorites" : "Removed from favorites");
    } catch {
      /* ignore */
    }
  };

  const copyResult = async () => {
    await navigator.clipboard.writeText(`${calc.name}: ${output?.result ?? ""}`);
    toast.success("Result copied to clipboard");
  };

  const shareResult = async () => {
    const text = `${calc.name} — ${output?.result ?? ""} · CalculatorHub`;
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: calc.name, text, url: window.location.href });
        return;
      } catch {
        /* fall through to copy */
      }
    }
    await navigator.clipboard.writeText(`${text} ${window.location.href}`);
    toast.success("Shareable summary copied");
  };

  const printResult = () => window.print();

  if (!calc.fields || !calc.compute) {
    return (
      <div className="surface-card p-6">
        <p className="text-sm text-muted-foreground">This calculator is being prepared.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="surface-card p-5 sm:p-6">
        <h2 className="font-display text-lg font-semibold">Inputs</h2>
        <div className="mt-5 space-y-4">
          {calc.fields.map((field) => (
            <div key={field.key} className="grid gap-1.5">
              <label htmlFor={`${calc.slug}-${field.key}`} className="text-sm font-medium">
                {field.label}
                {field.unit ? <span className="ml-1 text-muted-foreground">({field.unit})</span> : null}
              </label>
              {field.type === "select" ? (
                <select
                  id={`${calc.slug}-${field.key}`}
                  value={values[field.key] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                  className="h-11 rounded-xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {field.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={`${calc.slug}-${field.key}`}
                  type={field.type === "date" ? "date" : field.type === "text" ? "text" : "number"}
                  inputMode={field.type === "number" || !field.type ? "decimal" : undefined}
                  value={values[field.key] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                  className="h-11 rounded-xl border border-input bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setNonce((n) => n + 1)}
            className="h-11 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Calculate
          </button>
          <button
            type="button"
            onClick={() => setValues(initialValues(calc))}
            className="h-11 rounded-xl border border-border px-5 text-sm font-medium transition-colors hover:bg-accent"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass-panel rounded-3xl p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Result</p>
          <p className="mt-2 break-words font-display text-3xl font-bold sm:text-4xl">{output?.result}</p>
          {output?.detail ? <p className="mt-2 text-sm text-muted-foreground">{output.detail}</p> : null}

          <div className="mt-5 flex flex-wrap gap-2">
            <ActionButton onClick={copyResult} icon={<Copy className="h-4 w-4" />} label="Copy" />
            <ActionButton onClick={shareResult} icon={<Share2 className="h-4 w-4" />} label="Share" />
            <ActionButton onClick={printResult} icon={<Download className="h-4 w-4" />} label="Save PDF" />
            <ActionButton
              onClick={toggleFavorite}
              icon={<Heart className={`h-4 w-4 ${favorite ? "fill-current text-primary" : ""}`} />}
              label={favorite ? "Favorited" : "Favorite"}
            />
          </div>
        </div>

        {output?.chart && output.chart.length > 1 ? (
          <div className="surface-card p-5">
            <h3 className="font-display text-base font-semibold">Visual breakdown</h3>
            <div className="mt-4 h-56">
              <ClientOnly fallback={null}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={output.chart}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} width={54} />
                    <ChartTooltip
                      contentStyle={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        color: "var(--foreground)",
                      }}
                    />
                    <Bar dataKey="value" fill="var(--brand)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ClientOnly>
            </div>

          </div>
        ) : null}

        {calc.formula || output?.steps?.length ? (
          <div className="surface-card p-5">
            <h3 className="font-display text-base font-semibold">How it works</h3>
            {calc.formula ? (
              <p className="mt-3 rounded-xl bg-secondary px-3 py-2 font-mono text-sm text-secondary-foreground">
                {calc.formula}
              </p>
            ) : null}
            {output?.steps?.length ? (
              <ol className="mt-4 space-y-2 text-sm text-muted-foreground">
                {output.steps.map((step, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                      {i + 1}
                    </span>
                    <span className="min-w-0 break-words">{step}</span>
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ActionButton({
  onClick,
  icon,
  label,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card/60 px-3.5 text-sm font-medium transition-colors hover:bg-accent"
    >
      {icon}
      {label}
    </button>
  );
}
