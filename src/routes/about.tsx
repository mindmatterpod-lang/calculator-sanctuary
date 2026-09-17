import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/utils";

export const Route = createFileRoute("/about")({
  head: () => {
    const title = "About CalculatorHub — Who We Are & How We Work";
    const description =
      "CalculatorHub builds free, ad-light calculators with plain-language explanations, worked examples, and fact-checked content across finance, health, math, and everyday life.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE_URL}/about` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/about` }],
    };
  },
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            url: `${SITE_URL}/about`,
            mainEntity: {
              "@type": "Organization",
              name: "CalculatorHub",
              url: SITE_URL,
              description:
                "CalculatorHub publishes free online calculators with plain-language methods, worked examples, and fact-checked content.",
            },
          }),
        }}
      />

      <h1 className="font-display text-3xl font-bold sm:text-4xl">About CalculatorHub</h1>

      <div className="mt-6 space-y-6 text-base leading-relaxed text-muted-foreground">
        <p>
          CalculatorHub started as a simple idea: most online calculators give you a number and nothing else. We wanted
          calculators that also explain the formula behind the number, walk through a realistic worked example, and
          flag the mistakes people actually make — so you leave understanding the answer, not just copying it down.
        </p>

        <p>
          Every calculator on this site pairs a working tool with an editorial write-up covering the underlying
          method, a fully worked example with real numbers, common pitfalls, and answers to the questions people
          most often ask about that topic.
        </p>

        <h2 className="font-display text-xl font-semibold text-foreground">Our editorial process</h2>
        <p>
          Content is drafted using a mix of established reference formulas (WHO guidance, government tax and finance
          rules, standard engineering and physics equations) and then checked for accuracy against those sources
          before publishing. Pages covering health or financial topics link directly to the primary sources we used,
          and we note when a page was last fact-checked.
        </p>
        <p>
          We're a small, independent team. If you spot an error, an outdated figure, or a formula that doesn't match
          your region's rules, we want to know — corrections make every calculator on this site better.
        </p>

        <h2 className="font-display text-xl font-semibold text-foreground">What we don't do</h2>
        <p>
          Our calculators are educational tools, not professional advice. Health calculators aren't a substitute for
          a doctor; financial calculators aren't a substitute for a licensed advisor or accountant. We say this
          clearly on the calculators where it matters most.
        </p>
      </div>
    </div>
  );
}
