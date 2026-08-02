import { describe, expect, it } from "vitest";
import { calculators, categories } from "@/lib/calculators";
import { posts } from "@/lib/posts";

const BASE = process.env["TEST_BASE_URL"] ?? "http://localhost:8080";

async function getHtml(path: string) {
  const res = await fetch(`${BASE}${path}`);
  expect(res.status, `${path} should return 200`).toBe(200);
  return res.text();
}

function head(html: string) {
  return html.slice(0, html.indexOf("</head>") + 7);
}

function tag(html: string, re: RegExp) {
  return html.match(re)?.[1];
}

const routes = [
  "/",
  "/calculators",
  "/categories",
  "/blog",
  `/category/${categories[0].slug}`,
  `/calculator/${calculators[0].slug}`,
  `/blog/${posts[0].slug}`,
];

describe("SSR hydration", () => {
  for (const path of routes) {
    it(`${path} ships dehydrated router data`, async () => {
      const html = await getHtml(path);
      // TanStack Start writes the dehydrated router payload into the SSR HTML.
      // Its absence is what caused "Expected to find dehydrated data on window.$_TSR.router".
      expect(html).toContain("$_TSR");
      expect(html).toMatch(/<div id="root"|<body/);
    });
  }

  it("calculator page server-renders its interactive UI", async () => {
    const html = await getHtml(`/calculator/${calculators[0].slug}`);
    expect(html).toContain(calculators[0].name);
    expect(html).toMatch(/<input|<select/);
  });
});

describe("SEO metadata", () => {
  for (const path of routes) {
    it(`${path} has unique, non-default head metadata`, async () => {
      const h = head(await getHtml(path));

      const title = tag(h, /<title[^>]*>([^<]+)<\/title>/);
      expect(title, `${path} missing <title>`).toBeTruthy();
      expect(title!.length).toBeGreaterThan(10);
      expect(title).not.toMatch(/Lovable App|Lovable Generated Project/i);

      const desc = tag(h, /<meta[^>]+name="description"[^>]+content="([^"]+)"/);
      expect(desc, `${path} missing meta description`).toBeTruthy();
      expect(desc!.length).toBeGreaterThan(40);
      expect(desc!.length).toBeLessThan(320);

      expect(h, `${path} missing og:title`).toMatch(/property="og:title"/);
      expect(h, `${path} missing og:description`).toMatch(/property="og:description"/);
      expect(h, `${path} missing og:type`).toMatch(/property="og:type"/);
      expect(h, `${path} missing twitter:card`).toMatch(/name="twitter:card"/);
      expect(h, `${path} should not be noindex`).not.toMatch(/name="robots"[^>]+noindex/);
    });
  }

  it("titles are unique across routes", async () => {
    const titles = await Promise.all(
      routes.map(async (p) => tag(head(await getHtml(p)), /<title[^>]*>([^<]+)<\/title>/)),
    );
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("each page has exactly one H1", async () => {
    for (const path of routes) {
      const html = await getHtml(path);
      expect(html.match(/<h1[\s>]/g)?.length, `${path} H1 count`).toBe(1);
    }
  });

  it("calculator pages emit JSON-LD structured data", async () => {
    const html = await getHtml(`/calculator/${calculators[0].slug}`);
    const ld = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
    expect(ld, "missing JSON-LD").toBeTruthy();
    const parsed = JSON.parse(ld![1].replace(/&quot;/g, '"'));
    const types = (parsed["@graph"] ?? [parsed]).map((n: { "@type": string }) => n["@type"]);
    expect(types).toContain("SoftwareApplication");
    expect(types).toContain("BreadcrumbList");
  });

  it("leaf routes self-reference canonical", async () => {
    const slug = calculators[0].slug;
    const h = head(await getHtml(`/calculator/${slug}`));
    expect(tag(h, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)).toBe(`/calculator/${slug}`);
  });
});

describe("crawlability", () => {
  it("robots.txt allows crawling", async () => {
    const txt = await (await fetch(`${BASE}/robots.txt`)).text();
    expect(txt).toMatch(/User-agent:\s*\*/);
    expect(txt).not.toMatch(/^Disallow:\s*\/$/m);
  });

  it("sitemap.xml lists every public route", async () => {
    const res = await fetch(`${BASE}/sitemap.xml`);
    expect(res.status).toBe(200);
    const xml = await res.text();
    expect(res.headers.get("content-type")).toContain("xml");
    for (const p of routes) {
      const loc = p === "/" ? "<loc>/</loc>" : `<loc>${p}</loc>`;
      expect(xml, `sitemap missing ${p}`).toContain(loc);
    }
    const count = xml.match(/<url>/g)?.length ?? 0;
    expect(count).toBeGreaterThanOrEqual(calculators.length + categories.length + posts.length);
  });
});
