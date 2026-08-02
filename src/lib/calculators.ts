export type FieldType = "number" | "text" | "date" | "select";

export interface Field {
  key: string;
  label: string;
  type?: FieldType;
  unit?: string;
  options?: { value: string; label: string }[];
  default?: string | number;
  step?: number;
}

export interface CalcResult {
  result: string;
  detail?: string;
  steps?: string[];
  chart?: { name: string; value: number }[];
}

export interface Calculator {
  slug: string;
  name: string;
  category: string;
  description: string;
  formula?: string;
  fields?: Field[];
  compute?: (v: Record<string, string>) => CalcResult;
  faqs?: { q: string; a: string }[];
  popular?: boolean;
}

export interface Category {
  slug: string;
  name: string;
  blurb: string;
  icon: string;
  accent: string;
}

const num = (v: string | undefined, fallback = 0) => {
  const n = parseFloat(String(v ?? "").replace(/,/g, ""));
  return Number.isFinite(n) ? n : fallback;
};

const fmt = (n: number, digits = 2) =>
  Number.isFinite(n)
    ? n.toLocaleString(undefined, { maximumFractionDigits: digits })
    : "—";

export const categories: Category[] = [
  {
    slug: "finance",
    name: "Finance",
    blurb: "Loans, investments, taxes and everything money.",
    icon: "Banknote",
    accent: "from-emerald-500/20 to-teal-500/10",
  },
  {
    slug: "health",
    name: "Health",
    blurb: "Body metrics, nutrition and fitness planning.",
    icon: "HeartPulse",
    accent: "from-rose-500/20 to-orange-500/10",
  },
  {
    slug: "education",
    name: "Education",
    blurb: "Grades, GPA, attendance and study planning.",
    icon: "GraduationCap",
    accent: "from-indigo-500/20 to-sky-500/10",
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    blurb: "From basic arithmetic to statistics and algebra.",
    icon: "Sigma",
    accent: "from-violet-500/20 to-fuchsia-500/10",
  },
  {
    slug: "engineering",
    name: "Engineering",
    blurb: "Electrical, mechanical and design calculations.",
    icon: "Cog",
    accent: "from-amber-500/20 to-yellow-500/10",
  },
  {
    slug: "physics",
    name: "Physics",
    blurb: "Motion, energy, waves and classical mechanics.",
    icon: "Atom",
    accent: "from-cyan-500/20 to-blue-500/10",
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    blurb: "Moles, pH, gas laws and solutions.",
    icon: "FlaskConical",
    accent: "from-lime-500/20 to-emerald-500/10",
  },
  {
    slug: "time-date",
    name: "Time & Date",
    blurb: "Ages, durations, workdays and time zones.",
    icon: "CalendarClock",
    accent: "from-blue-500/20 to-indigo-500/10",
  },
  {
    slug: "unit-converters",
    name: "Unit Converters",
    blurb: "Instant conversion across every measurement system.",
    icon: "Ruler",
    accent: "from-sky-500/20 to-cyan-500/10",
  },
  {
    slug: "everyday-life",
    name: "Everyday Life",
    blurb: "Tips, bills, travel and household maths.",
    icon: "Coffee",
    accent: "from-orange-500/20 to-amber-500/10",
  },
  {
    slug: "programming",
    name: "Programming",
    blurb: "Encoders, converters and developer utilities.",
    icon: "Code2",
    accent: "from-slate-500/20 to-zinc-500/10",
  },
];

const f = (
  key: string,
  label: string,
  def?: string | number,
  unit?: string,
): Field => ({ key, label, default: def, unit, type: "number" });

const sel = (
  key: string,
  label: string,
  options: string[],
  def?: string,
): Field => ({
  key,
  label,
  type: "select",
  default: def ?? options[0],
  options: options.map((o) => ({ value: o, label: o })),
});

const dateField = (key: string, label: string, def = ""): Field => ({
  key,
  label,
  type: "date",
  default: def,
});

/* ------------------------------------------------------------------ */
/* Unit converter factory                                              */
/* ------------------------------------------------------------------ */

const unitSets: Record<string, { name: string; units: Record<string, number> }> = {
  length: {
    name: "Length",
    units: {
      Millimetre: 0.001,
      Centimetre: 0.01,
      Metre: 1,
      Kilometre: 1000,
      Inch: 0.0254,
      Foot: 0.3048,
      Yard: 0.9144,
      Mile: 1609.344,
      "Nautical mile": 1852,
    },
  },
  weight: {
    name: "Weight",
    units: {
      Milligram: 1e-6,
      Gram: 0.001,
      Kilogram: 1,
      Tonne: 1000,
      Ounce: 0.0283495,
      Pound: 0.453592,
      Stone: 6.35029,
    },
  },
  area: {
    name: "Area",
    units: {
      "Square metre": 1,
      "Square kilometre": 1e6,
      "Square foot": 0.092903,
      "Square yard": 0.836127,
      Acre: 4046.86,
      Hectare: 10000,
    },
  },
  volume: {
    name: "Volume",
    units: {
      Millilitre: 0.001,
      Litre: 1,
      "Cubic metre": 1000,
      "Cup (US)": 0.2365882,
      "Pint (US)": 0.4731765,
      "Gallon (US)": 3.785412,
      "Gallon (UK)": 4.54609,
    },
  },
  speed: {
    name: "Speed",
    units: {
      "Metre / second": 1,
      "Kilometre / hour": 0.277778,
      "Mile / hour": 0.44704,
      Knot: 0.514444,
      "Foot / second": 0.3048,
    },
  },
  pressure: {
    name: "Pressure",
    units: {
      Pascal: 1,
      Kilopascal: 1000,
      Bar: 100000,
      PSI: 6894.757,
      Atmosphere: 101325,
      Torr: 133.322,
    },
  },
  "data-storage": {
    name: "Data Storage",
    units: {
      Bit: 1 / 8,
      Byte: 1,
      Kilobyte: 1024,
      Megabyte: 1024 ** 2,
      Gigabyte: 1024 ** 3,
      Terabyte: 1024 ** 4,
      Petabyte: 1024 ** 5,
    },
  },
  "energy-unit": {
    name: "Energy",
    units: {
      Joule: 1,
      Kilojoule: 1000,
      Calorie: 4.184,
      Kilocalorie: 4184,
      "Watt hour": 3600,
      "Kilowatt hour": 3.6e6,
      BTU: 1055.06,
    },
  },
};

function unitConverter(slug: string, key: string): Calculator {
  const set = unitSets[key];
  const names = Object.keys(set.units);
  return {
    slug,
    name: `${set.name} Converter`,
    category: "unit-converters",
    description: `Convert ${set.name.toLowerCase()} between ${names.length} units instantly with full precision.`,
    formula: "value × (factor of source unit) ÷ (factor of target unit)",
    fields: [
      f("value", "Value", 1),
      sel("from", "From", names, names[0]),
      sel("to", "To", names, names[2] ?? names[1]),
    ],
    compute: (v) => {
      const value = num(v.value);
      const from = set.units[v.from] ?? 1;
      const to = set.units[v.to] ?? 1;
      const out = (value * from) / to;
      return {
        result: `${fmt(out, 6)} ${v.to}`,
        detail: `${fmt(value, 6)} ${v.from} = ${fmt(out, 6)} ${v.to}`,
        steps: [
          `Convert to base unit: ${fmt(value, 6)} × ${from} = ${fmt(value * from, 6)}`,
          `Convert to target unit: ${fmt(value * from, 6)} ÷ ${to} = ${fmt(out, 6)}`,
        ],
      };
    },
  };
}

/* ------------------------------------------------------------------ */
/* Calculators                                                         */
/* ------------------------------------------------------------------ */

const amortize = (p: number, annualRate: number, months: number) => {
  const r = annualRate / 12 / 100;
  if (months <= 0) return { emi: 0, total: 0, interest: 0 };
  const emi =
    r === 0 ? p / months : (p * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const total = emi * months;
  return { emi, total, interest: total - p };
};

const loanCalc = (slug: string, name: string, description: string): Calculator => ({
  slug,
  name,
  category: "finance",
  popular: slug === "emi-calculator",
  description,
  formula: "EMI = P × r × (1+r)^n / ((1+r)^n − 1)",
  fields: [
    f("principal", "Loan amount", 500000),
    f("rate", "Annual interest rate", 8.5, "%"),
    f("years", "Tenure", 20, "years"),
  ],
  compute: (v) => {
    const p = num(v.principal);
    const rate = num(v.rate);
    const months = num(v.years) * 12;
    const { emi, total, interest } = amortize(p, rate, months);
    return {
      result: `${fmt(emi)} per month`,
      detail: `Total payable ${fmt(total)} · Total interest ${fmt(interest)}`,
      steps: [
        `Monthly rate r = ${rate}% ÷ 12 ÷ 100 = ${(rate / 1200).toFixed(6)}`,
        `Number of payments n = ${months}`,
        `EMI = P × r × (1+r)^n / ((1+r)^n − 1) = ${fmt(emi)}`,
        `Total interest = (EMI × n) − P = ${fmt(interest)}`,
      ],
      chart: [
        { name: "Principal", value: Math.round(p) },
        { name: "Interest", value: Math.round(interest) },
      ],
    };
  },
});

const baseCalculators: Calculator[] = [
  /* ---------------------------- FINANCE ---------------------------- */
  loanCalc("emi-calculator", "EMI Calculator", "Work out the exact monthly instalment for any loan, plus total interest."),
  loanCalc("loan-calculator", "Loan Calculator", "Estimate repayments, total cost and interest for personal or auto loans."),
  loanCalc("mortgage-calculator", "Mortgage Calculator", "Plan home-loan repayments across the full term of your mortgage."),
  {
    slug: "interest-calculator",
    name: "Interest Calculator",
    category: "finance",
    description: "Simple interest on any principal, rate and duration.",
    formula: "SI = P × R × T ÷ 100",
    fields: [f("p", "Principal", 100000), f("r", "Rate", 7, "% p.a."), f("t", "Time", 5, "years")],
    compute: (v) => {
      const si = (num(v.p) * num(v.r) * num(v.t)) / 100;
      return {
        result: fmt(si),
        detail: `Maturity amount ${fmt(num(v.p) + si)}`,
        steps: [`SI = ${v.p} × ${v.r} × ${v.t} ÷ 100 = ${fmt(si)}`],
      };
    },
  },
  {
    slug: "compound-interest",
    name: "Compound Interest Calculator",
    category: "finance",
    popular: true,
    description: "See how money compounds over time with any compounding frequency.",
    formula: "A = P (1 + r/n)^(n·t)",
    fields: [
      f("p", "Principal", 100000),
      f("r", "Annual rate", 10, "%"),
      f("t", "Years", 10),
      sel("n", "Compounding", ["Annually", "Semi-annually", "Quarterly", "Monthly", "Daily"], "Annually"),
    ],
    compute: (v) => {
      const map: Record<string, number> = {
        Annually: 1,
        "Semi-annually": 2,
        Quarterly: 4,
        Monthly: 12,
        Daily: 365,
      };
      const n = map[v.n] ?? 1;
      const p = num(v.p);
      const t = num(v.t);
      const a = p * Math.pow(1 + num(v.r) / 100 / n, n * t);
      const chart = Array.from({ length: Math.min(Math.max(Math.round(t), 1), 30) }, (_, i) => ({
        name: `Yr ${i + 1}`,
        value: Math.round(p * Math.pow(1 + num(v.r) / 100 / n, n * (i + 1))),
      }));
      return {
        result: fmt(a),
        detail: `Interest earned ${fmt(a - p)}`,
        steps: [
          `n = ${n} compounding periods per year`,
          `A = ${fmt(p)} × (1 + ${num(v.r) / 100}/${n})^(${n}×${t}) = ${fmt(a)}`,
        ],
        chart,
      };
    },
  },
  {
    slug: "investment-calculator",
    name: "Investment Calculator",
    category: "finance",
    description: "Project the future value of a lump sum plus regular contributions.",
    formula: "FV = P(1+r)^t + C × [((1+r)^t − 1) / r]",
    fields: [f("p", "Initial investment", 50000), f("c", "Yearly contribution", 12000), f("r", "Expected return", 12, "%"), f("t", "Years", 15)],
    compute: (v) => {
      const r = num(v.r) / 100;
      const t = num(v.t);
      const fv = num(v.p) * Math.pow(1 + r, t) + (r === 0 ? num(v.c) * t : num(v.c) * ((Math.pow(1 + r, t) - 1) / r));
      const invested = num(v.p) + num(v.c) * t;
      return {
        result: fmt(fv),
        detail: `Invested ${fmt(invested)} · Gains ${fmt(fv - invested)}`,
        chart: [
          { name: "Invested", value: Math.round(invested) },
          { name: "Gains", value: Math.round(fv - invested) },
        ],
      };
    },
  },
  {
    slug: "sip-calculator",
    name: "SIP Calculator",
    category: "finance",
    popular: true,
    description: "Future value of a monthly systematic investment plan.",
    formula: "FV = M × [((1+i)^n − 1) / i] × (1+i)",
    fields: [f("m", "Monthly investment", 10000), f("r", "Expected return", 12, "% p.a."), f("y", "Years", 10)],
    compute: (v) => {
      const i = num(v.r) / 1200;
      const n = num(v.y) * 12;
      const fv = i === 0 ? num(v.m) * n : num(v.m) * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      const invested = num(v.m) * n;
      return {
        result: fmt(fv),
        detail: `Invested ${fmt(invested)} · Estimated returns ${fmt(fv - invested)}`,
        chart: [
          { name: "Invested", value: Math.round(invested) },
          { name: "Returns", value: Math.round(fv - invested) },
        ],
      };
    },
  },
  {
    slug: "fd-calculator",
    name: "FD Calculator",
    category: "finance",
    description: "Maturity value of a fixed deposit with quarterly compounding.",
    formula: "A = P (1 + r/4)^(4t)",
    fields: [f("p", "Deposit amount", 100000), f("r", "Interest rate", 7, "%"), f("t", "Years", 5)],
    compute: (v) => {
      const a = num(v.p) * Math.pow(1 + num(v.r) / 400, 4 * num(v.t));
      return { result: fmt(a), detail: `Interest earned ${fmt(a - num(v.p))}` };
    },
  },
  {
    slug: "savings-calculator",
    name: "Savings Calculator",
    category: "finance",
    description: "How much your savings grow with regular monthly deposits.",
    fields: [f("start", "Starting balance", 20000), f("monthly", "Monthly saving", 5000), f("r", "Interest rate", 5, "%"), f("y", "Years", 5)],
    compute: (v) => {
      const i = num(v.r) / 1200;
      const n = num(v.y) * 12;
      const fv = num(v.start) * Math.pow(1 + i, n) + (i === 0 ? num(v.monthly) * n : num(v.monthly) * ((Math.pow(1 + i, n) - 1) / i));
      return { result: fmt(fv), detail: `Total saved ${fmt(num(v.start) + num(v.monthly) * n)}` };
    },
  },
  {
    slug: "retirement-calculator",
    name: "Retirement Calculator",
    category: "finance",
    description: "Project your retirement corpus and how long it will last.",
    fields: [f("age", "Current age", 30), f("retire", "Retirement age", 60), f("corpus", "Current savings", 500000), f("monthly", "Monthly saving", 15000), f("r", "Return", 10, "%")],
    compute: (v) => {
      const years = Math.max(num(v.retire) - num(v.age), 0);
      const i = num(v.r) / 1200;
      const n = years * 12;
      const fv = num(v.corpus) * Math.pow(1 + i, n) + (i === 0 ? num(v.monthly) * n : num(v.monthly) * ((Math.pow(1 + i, n) - 1) / i));
      return { result: fmt(fv), detail: `Corpus available after ${years} years of saving` };
    },
  },
  {
    slug: "inflation-calculator",
    name: "Inflation Calculator",
    category: "finance",
    description: "What today's money will be worth in the future.",
    formula: "Future cost = P × (1 + i)^t",
    fields: [f("p", "Amount today", 100000), f("i", "Inflation rate", 6, "%"), f("t", "Years", 10)],
    compute: (v) => {
      const future = num(v.p) * Math.pow(1 + num(v.i) / 100, num(v.t));
      const value = num(v.p) / Math.pow(1 + num(v.i) / 100, num(v.t));
      return { result: fmt(future), detail: `Purchasing power of today's ${fmt(num(v.p))} falls to ${fmt(value)}` };
    },
  },
  {
    slug: "salary-calculator",
    name: "Salary Calculator",
    category: "finance",
    description: "Break an annual salary into monthly, weekly and hourly pay.",
    fields: [f("annual", "Annual salary", 900000), f("hours", "Hours per week", 40)],
    compute: (v) => {
      const a = num(v.annual);
      return {
        result: `${fmt(a / 12)} per month`,
        detail: `Weekly ${fmt(a / 52)} · Hourly ${fmt(a / 52 / Math.max(num(v.hours), 1))}`,
      };
    },
  },
  {
    slug: "tax-calculator",
    name: "Tax Calculator",
    category: "finance",
    description: "Estimate tax payable on income using a flat or slab rate.",
    fields: [f("income", "Taxable income", 1200000), f("rate", "Effective tax rate", 20, "%"), f("deductions", "Deductions", 150000)],
    compute: (v) => {
      const taxable = Math.max(num(v.income) - num(v.deductions), 0);
      const tax = (taxable * num(v.rate)) / 100;
      return {
        result: fmt(tax),
        detail: `Taxable income ${fmt(taxable)} · Take home ${fmt(num(v.income) - tax)}`,
        steps: [`Taxable = ${fmt(num(v.income))} − ${fmt(num(v.deductions))} = ${fmt(taxable)}`, `Tax = ${fmt(taxable)} × ${v.rate}% = ${fmt(tax)}`],
      };
    },
  },
  {
    slug: "gst-calculator",
    name: "GST Calculator",
    category: "finance",
    popular: true,
    description: "Add or remove GST at any rate with a full tax breakdown.",
    formula: "GST = amount × rate ÷ 100",
    fields: [f("amount", "Amount", 10000), f("rate", "GST rate", 18, "%"), sel("mode", "Mode", ["Add GST", "Remove GST"], "Add GST")],
    compute: (v) => {
      const amt = num(v.amount);
      const rate = num(v.rate);
      if (v.mode === "Remove GST") {
        const base = amt / (1 + rate / 100);
        return { result: fmt(base), detail: `GST component ${fmt(amt - base)} · Gross ${fmt(amt)}`, steps: [`Base = ${fmt(amt)} ÷ (1 + ${rate}/100) = ${fmt(base)}`] };
      }
      const gst = (amt * rate) / 100;
      return { result: fmt(amt + gst), detail: `GST ${fmt(gst)} on base ${fmt(amt)}`, steps: [`GST = ${fmt(amt)} × ${rate}% = ${fmt(gst)}`] };
    },
  },
  {
    slug: "discount-calculator",
    name: "Discount Calculator",
    category: "finance",
    description: "Final price after a percentage discount and how much you save.",
    fields: [f("price", "Original price", 2999), f("discount", "Discount", 25, "%")],
    compute: (v) => {
      const save = (num(v.price) * num(v.discount)) / 100;
      return { result: fmt(num(v.price) - save), detail: `You save ${fmt(save)}` };
    },
  },
  {
    slug: "profit-calculator",
    name: "Profit Calculator",
    category: "finance",
    description: "Profit, margin and markup from cost and selling price.",
    fields: [f("cost", "Cost price", 800), f("sell", "Selling price", 1200)],
    compute: (v) => {
      const profit = num(v.sell) - num(v.cost);
      return {
        result: fmt(profit),
        detail: `Margin ${fmt((profit / Math.max(num(v.sell), 1)) * 100)}% · Markup ${fmt((profit / Math.max(num(v.cost), 1)) * 100)}%`,
      };
    },
  },
  {
    slug: "commission-calculator",
    name: "Commission Calculator",
    category: "finance",
    description: "Commission earned on a sale at any rate.",
    fields: [f("sale", "Sale amount", 250000), f("rate", "Commission rate", 3, "%")],
    compute: (v) => ({ result: fmt((num(v.sale) * num(v.rate)) / 100) }),
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    category: "finance",
    description: "Convert between currencies using your own exchange rate.",
    fields: [f("amount", "Amount", 100), f("rate", "Exchange rate", 83.2)],
    compute: (v) => ({ result: fmt(num(v.amount) * num(v.rate)), detail: `at a rate of ${v.rate}` }),
  },
  {
    slug: "crypto-profit-calculator",
    name: "Crypto Profit Calculator",
    category: "finance",
    description: "Profit, loss and ROI on a crypto trade including fees.",
    fields: [f("buy", "Buy price", 30000), f("sell", "Sell price", 42000), f("qty", "Quantity", 0.5), f("fee", "Fees", 0.2, "%")],
    compute: (v) => {
      const cost = num(v.buy) * num(v.qty);
      const proceeds = num(v.sell) * num(v.qty);
      const fees = ((cost + proceeds) * num(v.fee)) / 100;
      const profit = proceeds - cost - fees;
      return { result: fmt(profit), detail: `ROI ${fmt((profit / Math.max(cost, 1)) * 100)}% · Fees ${fmt(fees)}` };
    },
  },

  /* ---------------------------- HEALTH ----------------------------- */
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    category: "health",
    popular: true,
    description: "Body Mass Index from height and weight, with WHO category.",
    formula: "BMI = weight (kg) ÷ height (m)²",
    fields: [f("weight", "Weight", 70, "kg"), f("height", "Height", 175, "cm")],
    compute: (v) => {
      const h = num(v.height) / 100;
      const bmi = num(v.weight) / (h * h);
      const cat = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal weight" : bmi < 30 ? "Overweight" : "Obese";
      return {
        result: fmt(bmi, 1),
        detail: `Category: ${cat}`,
        steps: [`Height in metres = ${v.height} ÷ 100 = ${h}`, `BMI = ${v.weight} ÷ ${fmt(h * h, 4)} = ${fmt(bmi, 1)}`],
      };
    },
    faqs: [
      { q: "What is a healthy BMI?", a: "For most adults a BMI between 18.5 and 24.9 is considered healthy." },
      { q: "Does BMI work for athletes?", a: "BMI does not distinguish muscle from fat, so very muscular people may read as overweight." },
    ],
  },
  {
    slug: "bmr-calculator",
    name: "BMR Calculator",
    category: "health",
    description: "Basal metabolic rate using the Mifflin-St Jeor equation.",
    formula: "BMR = 10w + 6.25h − 5a + s",
    fields: [f("weight", "Weight", 70, "kg"), f("height", "Height", 175, "cm"), f("age", "Age", 30), sel("sex", "Sex", ["Male", "Female"], "Male")],
    compute: (v) => {
      const bmr = 10 * num(v.weight) + 6.25 * num(v.height) - 5 * num(v.age) + (v.sex === "Female" ? -161 : 5);
      return { result: `${fmt(bmr, 0)} kcal/day`, detail: `Maintenance at light activity ≈ ${fmt(bmr * 1.375, 0)} kcal` };
    },
  },
  {
    slug: "body-fat-calculator",
    name: "Body Fat Calculator",
    category: "health",
    description: "Estimate body fat percentage with the US Navy method.",
    fields: [sel("sex", "Sex", ["Male", "Female"], "Male"), f("height", "Height", 175, "cm"), f("neck", "Neck", 38, "cm"), f("waist", "Waist", 85, "cm"), f("hip", "Hip (female)", 95, "cm")],
    compute: (v) => {
      const h = num(v.height);
      const bf =
        v.sex === "Female"
          ? 495 / (1.29579 - 0.35004 * Math.log10(num(v.waist) + num(v.hip) - num(v.neck)) + 0.221 * Math.log10(h)) - 450
          : 495 / (1.0324 - 0.19077 * Math.log10(num(v.waist) - num(v.neck)) + 0.15456 * Math.log10(h)) - 450;
      return { result: `${fmt(bf, 1)} %` };
    },
  },
  {
    slug: "calorie-calculator",
    name: "Calorie Calculator",
    category: "health",
    description: "Daily calorie needs based on activity level and goal.",
    fields: [
      f("weight", "Weight", 70, "kg"),
      f("height", "Height", 175, "cm"),
      f("age", "Age", 30),
      sel("sex", "Sex", ["Male", "Female"], "Male"),
      sel("activity", "Activity", ["Sedentary", "Light", "Moderate", "Active", "Very active"], "Moderate"),
    ],
    compute: (v) => {
      const bmr = 10 * num(v.weight) + 6.25 * num(v.height) - 5 * num(v.age) + (v.sex === "Female" ? -161 : 5);
      const map: Record<string, number> = { Sedentary: 1.2, Light: 1.375, Moderate: 1.55, Active: 1.725, "Very active": 1.9 };
      const tdee = bmr * (map[v.activity] ?? 1.55);
      return {
        result: `${fmt(tdee, 0)} kcal/day`,
        detail: `Lose weight ${fmt(tdee - 500, 0)} kcal · Gain weight ${fmt(tdee + 500, 0)} kcal`,
      };
    },
  },
  {
    slug: "water-intake-calculator",
    name: "Water Intake Calculator",
    category: "health",
    description: "Recommended daily water intake for your body weight.",
    fields: [f("weight", "Weight", 70, "kg"), f("exercise", "Exercise", 30, "minutes/day")],
    compute: (v) => {
      const litres = num(v.weight) * 0.033 + (num(v.exercise) / 30) * 0.35;
      return { result: `${fmt(litres, 2)} litres/day`, detail: `About ${fmt((litres * 1000) / 250, 0)} glasses of 250 ml` };
    },
  },
  {
    slug: "pregnancy-due-date-calculator",
    name: "Pregnancy Due Date Calculator",
    category: "health",
    description: "Estimated due date from the first day of your last period.",
    fields: [dateField("lmp", "First day of last period")],
    compute: (v) => {
      if (!v.lmp) return { result: "Select a date" };
      const d = new Date(v.lmp);
      const due = new Date(d.getTime() + 280 * 86400000);
      const weeks = Math.floor((Date.now() - d.getTime()) / (7 * 86400000));
      return { result: due.toDateString(), detail: `Currently around week ${Math.max(weeks, 0)} of pregnancy` };
    },
  },
  {
    slug: "ovulation-calculator",
    name: "Ovulation Calculator",
    category: "health",
    description: "Fertile window and ovulation day from your cycle.",
    fields: [dateField("lmp", "First day of last period"), f("cycle", "Cycle length", 28, "days")],
    compute: (v) => {
      if (!v.lmp) return { result: "Select a date" };
      const d = new Date(v.lmp);
      const ov = new Date(d.getTime() + (num(v.cycle, 28) - 14) * 86400000);
      const start = new Date(ov.getTime() - 5 * 86400000);
      return { result: ov.toDateString(), detail: `Fertile window ${start.toDateString()} → ${ov.toDateString()}` };
    },
  },
  {
    slug: "healthy-weight-calculator",
    name: "Healthy Weight Calculator",
    category: "health",
    description: "Healthy weight range for your height based on BMI 18.5–24.9.",
    fields: [f("height", "Height", 175, "cm")],
    compute: (v) => {
      const h = num(v.height) / 100;
      return { result: `${fmt(18.5 * h * h, 1)} – ${fmt(24.9 * h * h, 1)} kg` };
    },
  },
  {
    slug: "heart-rate-calculator",
    name: "Heart Rate Calculator",
    category: "health",
    description: "Maximum heart rate and training zones by age.",
    fields: [f("age", "Age", 30), f("resting", "Resting heart rate", 65, "bpm")],
    compute: (v) => {
      const max = 220 - num(v.age);
      const reserve = max - num(v.resting);
      return {
        result: `${fmt(max, 0)} bpm max`,
        detail: `Fat burn ${fmt(num(v.resting) + reserve * 0.6, 0)}–${fmt(num(v.resting) + reserve * 0.7, 0)} · Cardio ${fmt(num(v.resting) + reserve * 0.7, 0)}–${fmt(num(v.resting) + reserve * 0.85, 0)} bpm`,
      };
    },
  },
  {
    slug: "pace-calculator",
    name: "Pace Calculator",
    category: "health",
    description: "Running pace per kilometre and mile from distance and time.",
    fields: [f("distance", "Distance", 10, "km"), f("minutes", "Time", 55, "minutes")],
    compute: (v) => {
      const pace = num(v.minutes) / Math.max(num(v.distance), 0.001);
      const mins = Math.floor(pace);
      const secs = Math.round((pace - mins) * 60);
      return { result: `${mins}:${String(secs).padStart(2, "0")} / km`, detail: `Speed ${fmt((num(v.distance) / num(v.minutes)) * 60, 2)} km/h` };
    },
  },

  /* --------------------------- EDUCATION --------------------------- */
  {
    slug: "gpa-calculator",
    name: "GPA Calculator",
    category: "education",
    popular: true,
    description: "Grade point average from credit hours and grade points.",
    formula: "GPA = Σ(grade points × credits) ÷ Σcredits",
    fields: [f("points", "Total grade points", 108), f("credits", "Total credits", 30)],
    compute: (v) => ({
      result: fmt(num(v.points) / Math.max(num(v.credits), 1), 2),
      steps: [`GPA = ${v.points} ÷ ${v.credits} = ${fmt(num(v.points) / Math.max(num(v.credits), 1), 2)}`],
    }),
  },
  {
    slug: "cgpa-calculator",
    name: "CGPA Calculator",
    category: "education",
    description: "Cumulative GPA across semesters, with percentage conversion.",
    fields: [f("sgpaSum", "Sum of semester GPAs", 34.2), f("semesters", "Number of semesters", 4)],
    compute: (v) => {
      const cgpa = num(v.sgpaSum) / Math.max(num(v.semesters), 1);
      return { result: fmt(cgpa, 2), detail: `Approx. percentage ${fmt(cgpa * 9.5, 2)}%` };
    },
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    category: "education",
    popular: true,
    description: "Find what percent one number is of another, instantly.",
    formula: "% = (value ÷ total) × 100",
    fields: [f("value", "Value", 450), f("total", "Total", 500)],
    compute: (v) => ({
      result: `${fmt((num(v.value) / Math.max(num(v.total), 1)) * 100, 2)} %`,
      steps: [`(${v.value} ÷ ${v.total}) × 100 = ${fmt((num(v.value) / Math.max(num(v.total), 1)) * 100, 2)}%`],
    }),
  },
  {
    slug: "grade-calculator",
    name: "Grade Calculator",
    category: "education",
    description: "Final grade from weighted assessment scores.",
    fields: [f("current", "Current score", 78, "%"), f("weight", "Weight completed", 70, "%"), f("final", "Expected final exam score", 85, "%")],
    compute: (v) => {
      const done = (num(v.current) * num(v.weight)) / 100;
      const rest = (num(v.final) * (100 - num(v.weight))) / 100;
      return { result: `${fmt(done + rest, 2)} %`, detail: `Completed portion contributes ${fmt(done, 2)}%` };
    },
  },
  {
    slug: "marks-calculator",
    name: "Marks Calculator",
    category: "education",
    description: "Total marks, percentage and grade from obtained scores.",
    fields: [f("obtained", "Marks obtained", 432), f("max", "Maximum marks", 500)],
    compute: (v) => {
      const pct = (num(v.obtained) / Math.max(num(v.max), 1)) * 100;
      const grade = pct >= 90 ? "A+" : pct >= 80 ? "A" : pct >= 70 ? "B" : pct >= 60 ? "C" : pct >= 50 ? "D" : "F";
      return { result: `${fmt(pct, 2)} %`, detail: `Grade ${grade}` };
    },
  },
  {
    slug: "attendance-calculator",
    name: "Attendance Calculator",
    category: "education",
    description: "Attendance percentage and classes needed to reach your target.",
    fields: [f("attended", "Classes attended", 62), f("total", "Total classes", 80), f("target", "Target", 75, "%")],
    compute: (v) => {
      const pct = (num(v.attended) / Math.max(num(v.total), 1)) * 100;
      const need = Math.max(Math.ceil((num(v.target) * num(v.total) - 100 * num(v.attended)) / (100 - num(v.target))), 0);
      return { result: `${fmt(pct, 2)} %`, detail: pct >= num(v.target) ? "You are above target" : `Attend ${need} more classes in a row to reach ${v.target}%` };
    },
  },
  {
    slug: "study-time-calculator",
    name: "Study Time Calculator",
    category: "education",
    description: "Daily study hours needed to cover your syllabus in time.",
    fields: [f("topics", "Topics remaining", 40), f("hoursPer", "Hours per topic", 1.5), f("days", "Days left", 20)],
    compute: (v) => {
      const total = num(v.topics) * num(v.hoursPer);
      return { result: `${fmt(total / Math.max(num(v.days), 1), 2)} hours/day`, detail: `${fmt(total, 1)} total study hours required` };
    },
  },

  /* -------------------------- MATHEMATICS -------------------------- */
  {
    slug: "basic-calculator",
    name: "Basic Calculator",
    category: "mathematics",
    description: "Add, subtract, multiply and divide two numbers.",
    fields: [f("a", "First number", 12), sel("op", "Operation", ["+", "−", "×", "÷"], "+"), f("b", "Second number", 8)],
    compute: (v) => {
      const a = num(v.a);
      const b = num(v.b);
      const r = v.op === "+" ? a + b : v.op === "−" ? a - b : v.op === "×" ? a * b : b === 0 ? NaN : a / b;
      return { result: fmt(r, 6), steps: [`${a} ${v.op} ${b} = ${fmt(r, 6)}`] };
    },
  },
  {
    slug: "scientific-calculator",
    name: "Scientific Calculator",
    category: "mathematics",
    description: "Trigonometric, logarithmic and exponential functions.",
    fields: [sel("fn", "Function", ["sin", "cos", "tan", "ln", "log10", "√", "e^x", "x²"], "sin"), f("x", "Value", 45)],
    compute: (v) => {
      const x = num(v.x);
      const rad = (x * Math.PI) / 180;
      const map: Record<string, number> = {
        sin: Math.sin(rad),
        cos: Math.cos(rad),
        tan: Math.tan(rad),
        ln: Math.log(x),
        log10: Math.log10(x),
        "√": Math.sqrt(x),
        "e^x": Math.exp(x),
        "x²": x * x,
      };
      return { result: fmt(map[v.fn], 8), detail: ["sin", "cos", "tan"].includes(v.fn) ? "Angle interpreted in degrees" : undefined };
    },
  },
  {
    slug: "matrix-calculator",
    name: "Matrix Calculator",
    category: "mathematics",
    description: "Determinant and inverse of a 2×2 matrix.",
    fields: [f("a", "a11", 4), f("b", "a12", 7), f("c", "a21", 2), f("d", "a22", 6)],
    compute: (v) => {
      const det = num(v.a) * num(v.d) - num(v.b) * num(v.c);
      return {
        result: `det = ${fmt(det, 4)}`,
        detail: det === 0 ? "Matrix is singular — no inverse" : `Inverse = 1/${fmt(det, 4)} × [${fmt(num(v.d), 2)}, ${fmt(-num(v.b), 2)}; ${fmt(-num(v.c), 2)}, ${fmt(num(v.a), 2)}]`,
      };
    },
  },
  {
    slug: "algebra-solver",
    name: "Algebra Solver",
    category: "mathematics",
    description: "Solve linear equations of the form ax + b = c.",
    formula: "x = (c − b) ÷ a",
    fields: [f("a", "a", 3), f("b", "b", 5), f("c", "c", 20)],
    compute: (v) => {
      const a = num(v.a);
      if (a === 0) return { result: "No unique solution (a = 0)" };
      const x = (num(v.c) - num(v.b)) / a;
      return { result: `x = ${fmt(x, 6)}`, steps: [`${a}x + ${v.b} = ${v.c}`, `${a}x = ${fmt(num(v.c) - num(v.b), 6)}`, `x = ${fmt(x, 6)}`] };
    },
  },
  {
    slug: "equation-solver",
    name: "Equation Solver",
    category: "mathematics",
    description: "Solve simultaneous linear equations in two variables.",
    fields: [f("a1", "a₁", 2), f("b1", "b₁", 3), f("c1", "c₁", 12), f("a2", "a₂", 4), f("b2", "b₂", -1), f("c2", "c₂", 5)],
    compute: (v) => {
      const det = num(v.a1) * num(v.b2) - num(v.a2) * num(v.b1);
      if (det === 0) return { result: "No unique solution" };
      const x = (num(v.c1) * num(v.b2) - num(v.c2) * num(v.b1)) / det;
      const y = (num(v.a1) * num(v.c2) - num(v.a2) * num(v.c1)) / det;
      return { result: `x = ${fmt(x, 4)}, y = ${fmt(y, 4)}` };
    },
  },
  {
    slug: "fraction-calculator",
    name: "Fraction Calculator",
    category: "mathematics",
    description: "Add, subtract, multiply or divide two fractions.",
    fields: [f("n1", "Numerator 1", 1), f("d1", "Denominator 1", 2), sel("op", "Operation", ["+", "−", "×", "÷"], "+"), f("n2", "Numerator 2", 1), f("d2", "Denominator 2", 3)],
    compute: (v) => {
      const [n1, d1, n2, d2] = [num(v.n1), num(v.d1, 1), num(v.n2), num(v.d2, 1)];
      let n = 0;
      let d = 1;
      if (v.op === "+") [n, d] = [n1 * d2 + n2 * d1, d1 * d2];
      else if (v.op === "−") [n, d] = [n1 * d2 - n2 * d1, d1 * d2];
      else if (v.op === "×") [n, d] = [n1 * n2, d1 * d2];
      else [n, d] = [n1 * d2, d1 * n2];
      const g = (a: number, b: number): number => (b ? g(b, a % b) : Math.abs(a) || 1);
      const k = g(n, d);
      return { result: `${n / k}/${d / k}`, detail: `Decimal ${fmt(n / d, 6)}` };
    },
  },
  {
    slug: "prime-number-checker",
    name: "Prime Number Checker",
    category: "mathematics",
    description: "Check if a number is prime and see its factors.",
    fields: [f("n", "Number", 97)],
    compute: (v) => {
      const n = Math.floor(num(v.n));
      if (n < 2) return { result: "Not prime" };
      for (let i = 2; i * i <= n; i++) if (n % i === 0) return { result: "Not prime", detail: `Divisible by ${i}` };
      return { result: `${n} is prime` };
    },
  },
  {
    slug: "factorial-calculator",
    name: "Factorial Calculator",
    category: "mathematics",
    description: "Compute n! for any reasonable value of n.",
    fields: [f("n", "n", 10)],
    compute: (v) => {
      const n = Math.floor(num(v.n));
      if (n < 0 || n > 170) return { result: "Enter 0 – 170" };
      let r = 1;
      for (let i = 2; i <= n; i++) r *= i;
      return { result: r.toExponential(6).replace("e+", " × 10^"), detail: r < 1e15 ? r.toLocaleString() : undefined };
    },
  },
  {
    slug: "lcm-calculator",
    name: "LCM Calculator",
    category: "mathematics",
    description: "Lowest common multiple of two numbers.",
    fields: [f("a", "First number", 12), f("b", "Second number", 18)],
    compute: (v) => {
      const g = (a: number, b: number): number => (b ? g(b, a % b) : a);
      const a = Math.abs(Math.floor(num(v.a)));
      const b = Math.abs(Math.floor(num(v.b)));
      return { result: fmt((a * b) / (g(a, b) || 1), 0), detail: `GCD is ${g(a, b)}` };
    },
  },
  {
    slug: "gcd-calculator",
    name: "GCD Calculator",
    category: "mathematics",
    description: "Greatest common divisor using the Euclidean algorithm.",
    fields: [f("a", "First number", 48), f("b", "Second number", 180)],
    compute: (v) => {
      const g = (a: number, b: number): number => (b ? g(b, a % b) : a);
      return { result: String(g(Math.abs(Math.floor(num(v.a))), Math.abs(Math.floor(num(v.b))))) };
    },
  },
  {
    slug: "polynomial-calculator",
    name: "Polynomial Calculator",
    category: "mathematics",
    description: "Evaluate a cubic polynomial at any value of x.",
    fields: [f("a", "a (x³)", 1), f("b", "b (x²)", -2), f("c", "c (x)", 3), f("d", "constant", -4), f("x", "x", 2)],
    compute: (v) => {
      const x = num(v.x);
      const y = num(v.a) * x ** 3 + num(v.b) * x ** 2 + num(v.c) * x + num(v.d);
      return { result: fmt(y, 6), steps: [`f(${x}) = ${v.a}·${x}³ + ${v.b}·${x}² + ${v.c}·${x} + ${v.d} = ${fmt(y, 6)}`] };
    },
  },
  {
    slug: "quadratic-equation-solver",
    name: "Quadratic Equation Solver",
    category: "mathematics",
    description: "Roots of ax² + bx + c = 0 with discriminant analysis.",
    formula: "x = (−b ± √(b² − 4ac)) ÷ 2a",
    fields: [f("a", "a", 1), f("b", "b", -3), f("c", "c", 2)],
    compute: (v) => {
      const [a, b, c] = [num(v.a), num(v.b), num(v.c)];
      if (a === 0) return { result: "Not quadratic (a = 0)" };
      const disc = b * b - 4 * a * c;
      if (disc < 0) {
        const re = -b / (2 * a);
        const im = Math.sqrt(-disc) / (2 * a);
        return { result: `x = ${fmt(re, 4)} ± ${fmt(im, 4)}i`, detail: "Complex roots (discriminant < 0)" };
      }
      const r1 = (-b + Math.sqrt(disc)) / (2 * a);
      const r2 = (-b - Math.sqrt(disc)) / (2 * a);
      return { result: `x₁ = ${fmt(r1, 4)}, x₂ = ${fmt(r2, 4)}`, steps: [`Discriminant = ${fmt(disc, 4)}`, `x = (−${b} ± √${fmt(disc, 4)}) ÷ ${2 * a}`] };
    },
  },
  {
    slug: "geometry-calculator",
    name: "Geometry Calculator",
    category: "mathematics",
    description: "Area and perimeter of common 2D shapes.",
    fields: [sel("shape", "Shape", ["Circle", "Rectangle", "Triangle", "Square"], "Circle"), f("a", "Dimension A", 5), f("b", "Dimension B", 3)],
    compute: (v) => {
      const a = num(v.a);
      const b = num(v.b);
      if (v.shape === "Circle") return { result: `Area ${fmt(Math.PI * a * a, 4)}`, detail: `Circumference ${fmt(2 * Math.PI * a, 4)} (radius ${a})` };
      if (v.shape === "Square") return { result: `Area ${fmt(a * a, 4)}`, detail: `Perimeter ${fmt(4 * a, 4)}` };
      if (v.shape === "Rectangle") return { result: `Area ${fmt(a * b, 4)}`, detail: `Perimeter ${fmt(2 * (a + b), 4)}` };
      return { result: `Area ${fmt(0.5 * a * b, 4)}`, detail: `Base ${a}, height ${b}` };
    },
  },
  {
    slug: "statistics-calculator",
    name: "Statistics Calculator",
    category: "mathematics",
    description: "Mean, median, mode and standard deviation of a data set.",
    fields: [{ key: "data", label: "Numbers (comma separated)", type: "text", default: "4, 8, 15, 16, 23, 42" }],
    compute: (v) => {
      const arr = String(v.data ?? "")
        .split(/[,\s]+/)
        .map((x) => parseFloat(x))
        .filter((x) => Number.isFinite(x));
      if (!arr.length) return { result: "Enter some numbers" };
      const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
      const sorted = [...arr].sort((a, b) => a - b);
      const median = sorted.length % 2 ? sorted[(sorted.length - 1) / 2] : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
      const sd = Math.sqrt(arr.reduce((s, x) => s + (x - mean) ** 2, 0) / arr.length);
      return {
        result: `Mean ${fmt(mean, 4)}`,
        detail: `Median ${fmt(median, 4)} · Std dev ${fmt(sd, 4)} · Count ${arr.length} · Range ${fmt(sorted[0], 2)}–${fmt(sorted[sorted.length - 1], 2)}`,
        chart: arr.slice(0, 24).map((value, i) => ({ name: `#${i + 1}`, value })),
      };
    },
  },
  {
    slug: "probability-calculator",
    name: "Probability Calculator",
    category: "mathematics",
    description: "Single and combined event probability.",
    fields: [f("a", "P(A)", 0.5), f("b", "P(B)", 0.3)],
    compute: (v) => {
      const a = num(v.a);
      const b = num(v.b);
      return { result: `P(A and B) = ${fmt(a * b, 4)}`, detail: `P(A or B) = ${fmt(a + b - a * b, 4)} · P(not A) = ${fmt(1 - a, 4)}` };
    },
  },

  /* -------------------------- ENGINEERING -------------------------- */
  {
    slug: "ohms-law-calculator",
    name: "Ohm's Law Calculator",
    category: "engineering",
    description: "Solve for voltage, current or resistance.",
    formula: "V = I × R",
    fields: [sel("solve", "Solve for", ["Voltage", "Current", "Resistance"], "Voltage"), f("v", "Voltage", 12, "V"), f("i", "Current", 2, "A"), f("r", "Resistance", 6, "Ω")],
    compute: (v) => {
      if (v.solve === "Voltage") return { result: `${fmt(num(v.i) * num(v.r), 4)} V` };
      if (v.solve === "Current") return { result: `${fmt(num(v.v) / Math.max(num(v.r), 1e-9), 4)} A` };
      return { result: `${fmt(num(v.v) / Math.max(num(v.i), 1e-9), 4)} Ω` };
    },
  },
  {
    slug: "voltage-divider-calculator",
    name: "Voltage Divider Calculator",
    category: "engineering",
    description: "Output voltage across a two-resistor divider.",
    formula: "Vout = Vin × R2 ÷ (R1 + R2)",
    fields: [f("vin", "Input voltage", 12, "V"), f("r1", "R1", 1000, "Ω"), f("r2", "R2", 2000, "Ω")],
    compute: (v) => ({
      result: `${fmt((num(v.vin) * num(v.r2)) / Math.max(num(v.r1) + num(v.r2), 1e-9), 4)} V`,
      detail: `Current through divider ${fmt((num(v.vin) / Math.max(num(v.r1) + num(v.r2), 1e-9)) * 1000, 3)} mA`,
    }),
  },
  {
    slug: "watt-calculator",
    name: "Watt Calculator",
    category: "engineering",
    description: "Electrical power from voltage and current.",
    formula: "P = V × I",
    fields: [f("v", "Voltage", 230, "V"), f("i", "Current", 5, "A")],
    compute: (v) => ({ result: `${fmt(num(v.v) * num(v.i), 2)} W`, detail: `${fmt((num(v.v) * num(v.i)) / 1000, 3)} kW` }),
  },
  {
    slug: "power-calculator",
    name: "Power Calculator",
    category: "engineering",
    description: "Power from work done over time.",
    formula: "P = W ÷ t",
    fields: [f("w", "Work / energy", 5000, "J"), f("t", "Time", 20, "s")],
    compute: (v) => ({ result: `${fmt(num(v.w) / Math.max(num(v.t), 1e-9), 3)} W` }),
  },
  {
    slug: "resistor-color-code",
    name: "Resistor Color Code Calculator",
    category: "engineering",
    description: "Decode 4-band resistor colour codes into resistance.",
    fields: [
      sel("b1", "Band 1", ["Black", "Brown", "Red", "Orange", "Yellow", "Green", "Blue", "Violet", "Grey", "White"], "Brown"),
      sel("b2", "Band 2", ["Black", "Brown", "Red", "Orange", "Yellow", "Green", "Blue", "Violet", "Grey", "White"], "Black"),
      sel("mult", "Multiplier", ["Black", "Brown", "Red", "Orange", "Yellow", "Green", "Blue"], "Red"),
      sel("tol", "Tolerance", ["Gold ±5%", "Silver ±10%", "Brown ±1%", "Red ±2%"], "Gold ±5%"),
    ],
    compute: (v) => {
      const colors = ["Black", "Brown", "Red", "Orange", "Yellow", "Green", "Blue", "Violet", "Grey", "White"];
      const value = (colors.indexOf(v.b1) * 10 + colors.indexOf(v.b2)) * Math.pow(10, colors.indexOf(v.mult));
      const label = value >= 1e6 ? `${fmt(value / 1e6, 2)} MΩ` : value >= 1000 ? `${fmt(value / 1000, 2)} kΩ` : `${fmt(value, 2)} Ω`;
      return { result: label, detail: `Tolerance ${v.tol}` };
    },
  },
  {
    slug: "capacitance-calculator",
    name: "Capacitance Calculator",
    category: "engineering",
    description: "Total capacitance in series or parallel.",
    fields: [sel("mode", "Configuration", ["Parallel", "Series"], "Parallel"), f("c1", "C1", 10, "µF"), f("c2", "C2", 22, "µF")],
    compute: (v) => {
      const c1 = num(v.c1);
      const c2 = num(v.c2);
      const total = v.mode === "Parallel" ? c1 + c2 : (c1 * c2) / Math.max(c1 + c2, 1e-9);
      return { result: `${fmt(total, 4)} µF` };
    },
  },
  {
    slug: "torque-calculator",
    name: "Torque Calculator",
    category: "engineering",
    description: "Torque from force applied at a distance.",
    formula: "τ = F × r × sin θ",
    fields: [f("force", "Force", 150, "N"), f("radius", "Distance", 0.4, "m"), f("angle", "Angle", 90, "°")],
    compute: (v) => ({ result: `${fmt(num(v.force) * num(v.radius) * Math.sin((num(v.angle) * Math.PI) / 180), 4)} N·m` }),
  },
  {
    slug: "gear-ratio-calculator",
    name: "Gear Ratio Calculator",
    category: "engineering",
    description: "Gear ratio and output speed from tooth counts.",
    fields: [f("driver", "Driver teeth", 20), f("driven", "Driven teeth", 60), f("rpm", "Input RPM", 1500)],
    compute: (v) => {
      const ratio = num(v.driven) / Math.max(num(v.driver), 1);
      return { result: `${fmt(ratio, 3)} : 1`, detail: `Output speed ${fmt(num(v.rpm) / ratio, 1)} RPM` };
    },
  },

  /* ---------------------------- PHYSICS ---------------------------- */
  {
    slug: "velocity-calculator",
    name: "Velocity Calculator",
    category: "physics",
    description: "Velocity from displacement and time.",
    formula: "v = d ÷ t",
    fields: [f("d", "Distance", 100, "m"), f("t", "Time", 9.58, "s")],
    compute: (v) => ({ result: `${fmt(num(v.d) / Math.max(num(v.t), 1e-9), 4)} m/s`, detail: `${fmt((num(v.d) / Math.max(num(v.t), 1e-9)) * 3.6, 3)} km/h` }),
  },
  {
    slug: "acceleration-calculator",
    name: "Acceleration Calculator",
    category: "physics",
    description: "Acceleration from change in velocity over time.",
    formula: "a = (v − u) ÷ t",
    fields: [f("u", "Initial velocity", 0, "m/s"), f("v", "Final velocity", 27, "m/s"), f("t", "Time", 9, "s")],
    compute: (v) => ({ result: `${fmt((num(v.v) - num(v.u)) / Math.max(num(v.t), 1e-9), 4)} m/s²` }),
  },
  {
    slug: "force-calculator",
    name: "Force Calculator",
    category: "physics",
    description: "Newton's second law: force from mass and acceleration.",
    formula: "F = m × a",
    fields: [f("m", "Mass", 70, "kg"), f("a", "Acceleration", 9.81, "m/s²")],
    compute: (v) => ({ result: `${fmt(num(v.m) * num(v.a), 3)} N` }),
  },
  {
    slug: "momentum-calculator",
    name: "Momentum Calculator",
    category: "physics",
    description: "Linear momentum of a moving body.",
    formula: "p = m × v",
    fields: [f("m", "Mass", 1200, "kg"), f("v", "Velocity", 25, "m/s")],
    compute: (v) => ({ result: `${fmt(num(v.m) * num(v.v), 2)} kg·m/s` }),
  },
  {
    slug: "energy-calculator",
    name: "Energy Calculator",
    category: "physics",
    description: "Mass-energy equivalence and total mechanical energy.",
    fields: [f("m", "Mass", 2, "kg"), f("v", "Velocity", 10, "m/s"), f("h", "Height", 5, "m")],
    compute: (v) => {
      const ke = 0.5 * num(v.m) * num(v.v) ** 2;
      const pe = num(v.m) * 9.81 * num(v.h);
      return { result: `${fmt(ke + pe, 3)} J total`, detail: `Kinetic ${fmt(ke, 3)} J · Potential ${fmt(pe, 3)} J` };
    },
  },
  {
    slug: "kinetic-energy-calculator",
    name: "Kinetic Energy Calculator",
    category: "physics",
    description: "Energy of a body in motion.",
    formula: "KE = ½ m v²",
    fields: [f("m", "Mass", 2, "kg"), f("v", "Velocity", 10, "m/s")],
    compute: (v) => ({ result: `${fmt(0.5 * num(v.m) * num(v.v) ** 2, 3)} J` }),
  },
  {
    slug: "potential-energy-calculator",
    name: "Potential Energy Calculator",
    category: "physics",
    description: "Gravitational potential energy at a height.",
    formula: "PE = m g h",
    fields: [f("m", "Mass", 2, "kg"), f("h", "Height", 10, "m"), f("g", "Gravity", 9.81, "m/s²")],
    compute: (v) => ({ result: `${fmt(num(v.m) * num(v.g) * num(v.h), 3)} J` }),
  },
  {
    slug: "projectile-motion-calculator",
    name: "Projectile Motion Calculator",
    category: "physics",
    description: "Range, max height and flight time of a projectile.",
    fields: [f("v", "Launch speed", 20, "m/s"), f("angle", "Angle", 45, "°"), f("g", "Gravity", 9.81, "m/s²")],
    compute: (v) => {
      const rad = (num(v.angle) * Math.PI) / 180;
      const g = num(v.g) || 9.81;
      const speed = num(v.v);
      return {
        result: `Range ${fmt((speed ** 2 * Math.sin(2 * rad)) / g, 3)} m`,
        detail: `Max height ${fmt((speed * Math.sin(rad)) ** 2 / (2 * g), 3)} m · Flight time ${fmt((2 * speed * Math.sin(rad)) / g, 3)} s`,
      };
    },
  },
  {
    slug: "wave-frequency-calculator",
    name: "Wave Frequency Calculator",
    category: "physics",
    description: "Frequency from wave speed and wavelength.",
    formula: "f = v ÷ λ",
    fields: [f("v", "Wave speed", 340, "m/s"), f("lambda", "Wavelength", 0.5, "m")],
    compute: (v) => ({ result: `${fmt(num(v.v) / Math.max(num(v.lambda), 1e-9), 4)} Hz`, detail: `Period ${fmt(num(v.lambda) / Math.max(num(v.v), 1e-9), 6)} s` }),
  },
  {
    slug: "optics-calculator",
    name: "Optics Calculator",
    category: "physics",
    description: "Thin lens equation: image distance and magnification.",
    formula: "1/f = 1/u + 1/v",
    fields: [f("f", "Focal length", 10, "cm"), f("u", "Object distance", 30, "cm")],
    compute: (val) => {
      const f0 = num(val.f);
      const u = num(val.u);
      const inv = 1 / f0 - 1 / u;
      const v = 1 / inv;
      return { result: `Image distance ${fmt(v, 4)} cm`, detail: `Magnification ${fmt(-v / u, 4)}` };
    },
  },

  /* --------------------------- CHEMISTRY --------------------------- */
  {
    slug: "molar-mass-calculator",
    name: "Molar Mass Calculator",
    category: "chemistry",
    description: "Molar mass from mass and number of moles.",
    formula: "M = m ÷ n",
    fields: [f("m", "Mass", 18, "g"), f("n", "Moles", 1, "mol")],
    compute: (v) => ({ result: `${fmt(num(v.m) / Math.max(num(v.n), 1e-9), 4)} g/mol` }),
  },
  {
    slug: "mole-calculator",
    name: "Mole Calculator",
    category: "chemistry",
    description: "Moles from mass and molar mass, plus particle count.",
    formula: "n = m ÷ M",
    fields: [f("m", "Mass", 36, "g"), f("mm", "Molar mass", 18, "g/mol")],
    compute: (v) => {
      const n = num(v.m) / Math.max(num(v.mm), 1e-9);
      return { result: `${fmt(n, 5)} mol`, detail: `${(n * 6.02214076e23).toExponential(4)} particles` };
    },
  },
  {
    slug: "ph-calculator",
    name: "pH Calculator",
    category: "chemistry",
    description: "pH and pOH from hydrogen ion concentration.",
    formula: "pH = −log₁₀[H⁺]",
    fields: [f("h", "[H⁺] concentration", 0.0001, "mol/L")],
    compute: (v) => {
      const ph = -Math.log10(Math.max(num(v.h), 1e-30));
      return { result: fmt(ph, 3), detail: `pOH ${fmt(14 - ph, 3)} · ${ph < 7 ? "Acidic" : ph > 7 ? "Basic" : "Neutral"}` };
    },
  },
  {
    slug: "solution-dilution-calculator",
    name: "Solution Dilution Calculator",
    category: "chemistry",
    description: "Dilution using C1V1 = C2V2.",
    formula: "C₁V₁ = C₂V₂",
    fields: [f("c1", "C₁", 2, "M"), f("v1", "V₁", 50, "mL"), f("c2", "C₂", 0.5, "M")],
    compute: (v) => ({ result: `V₂ = ${fmt((num(v.c1) * num(v.v1)) / Math.max(num(v.c2), 1e-9), 3)} mL`, detail: "Add solvent up to this final volume" }),
  },
  {
    slug: "gas-law-calculator",
    name: "Gas Law Calculator",
    category: "chemistry",
    description: "Ideal gas law solved for pressure.",
    formula: "PV = nRT",
    fields: [f("n", "Moles", 1, "mol"), f("t", "Temperature", 298, "K"), f("v", "Volume", 22.4, "L")],
    compute: (v) => ({ result: `${fmt((num(v.n) * 0.082057 * num(v.t)) / Math.max(num(v.v), 1e-9), 4)} atm` }),
  },
  {
    slug: "chemical-equation-helper",
    name: "Chemical Equation Helper",
    category: "chemistry",
    description: "Check mass balance between reactants and products.",
    fields: [f("reactant", "Reactant mass", 100, "g"), f("product", "Product mass", 98, "g")],
    compute: (v) => {
      const diff = num(v.reactant) - num(v.product);
      return { result: Math.abs(diff) < 1e-6 ? "Balanced" : `Unbalanced by ${fmt(diff, 4)} g`, detail: `Yield ${fmt((num(v.product) / Math.max(num(v.reactant), 1e-9)) * 100, 2)}%` };
    },
  },

  /* -------------------------- TIME & DATE -------------------------- */
  {
    slug: "age-calculator",
    name: "Age Calculator",
    category: "time-date",
    popular: true,
    description: "Your exact age in years, months, days and total days lived.",
    fields: [dateField("dob", "Date of birth")],
    compute: (v) => {
      if (!v.dob) return { result: "Select your date of birth" };
      const d = new Date(v.dob);
      const now = new Date();
      let years = now.getFullYear() - d.getFullYear();
      let months = now.getMonth() - d.getMonth();
      let days = now.getDate() - d.getDate();
      if (days < 0) {
        months -= 1;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }
      const totalDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
      return { result: `${years} years, ${months} months, ${days} days`, detail: `${fmt(totalDays, 0)} days · ${fmt(totalDays * 24, 0)} hours lived` };
    },
  },
  {
    slug: "date-difference-calculator",
    name: "Date Difference Calculator",
    category: "time-date",
    description: "Days, weeks and months between any two dates.",
    fields: [dateField("start", "Start date"), dateField("end", "End date")],
    compute: (v) => {
      if (!v.start || !v.end) return { result: "Select both dates" };
      const days = Math.round((new Date(v.end).getTime() - new Date(v.start).getTime()) / 86400000);
      return { result: `${fmt(days, 0)} days`, detail: `${fmt(days / 7, 2)} weeks · ${fmt(days / 30.44, 2)} months` };
    },
  },
  {
    slug: "countdown-timer",
    name: "Countdown Calculator",
    category: "time-date",
    description: "Time remaining until an important date.",
    fields: [dateField("target", "Target date")],
    compute: (v) => {
      if (!v.target) return { result: "Select a date" };
      const ms = new Date(v.target).getTime() - Date.now();
      const days = Math.floor(Math.abs(ms) / 86400000);
      const hours = Math.floor((Math.abs(ms) % 86400000) / 3600000);
      return { result: `${days} days, ${hours} hours`, detail: ms < 0 ? "This date has already passed" : "remaining" };
    },
  },
  {
    slug: "time-zone-converter",
    name: "Time Zone Converter",
    category: "time-date",
    description: "Convert a local time across UTC offsets.",
    fields: [f("hour", "Hour (24h)", 14), f("from", "From UTC offset", 5.5), f("to", "To UTC offset", -5)],
    compute: (v) => {
      let h = num(v.hour) - num(v.from) + num(v.to);
      let dayShift = 0;
      while (h < 0) {
        h += 24;
        dayShift -= 1;
      }
      while (h >= 24) {
        h -= 24;
        dayShift += 1;
      }
      const hh = Math.floor(h);
      const mm = Math.round((h - hh) * 60);
      return { result: `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`, detail: dayShift === 0 ? "Same day" : dayShift > 0 ? "Next day" : "Previous day" };
    },
  },
  {
    slug: "working-days-calculator",
    name: "Working Days Calculator",
    category: "time-date",
    description: "Business days between two dates, excluding weekends.",
    fields: [dateField("start", "Start date"), dateField("end", "End date")],
    compute: (v) => {
      if (!v.start || !v.end) return { result: "Select both dates" };
      let count = 0;
      const d = new Date(v.start);
      const end = new Date(v.end);
      while (d <= end) {
        const day = d.getDay();
        if (day !== 0 && day !== 6) count++;
        d.setDate(d.getDate() + 1);
      }
      return { result: `${count} working days` };
    },
  },
  {
    slug: "leap-year-checker",
    name: "Leap Year Checker",
    category: "time-date",
    description: "Check whether any year is a leap year.",
    fields: [f("year", "Year", 2026)],
    compute: (v) => {
      const y = Math.floor(num(v.year));
      const leap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
      return { result: leap ? `${y} is a leap year` : `${y} is not a leap year`, detail: leap ? "February has 29 days" : "February has 28 days" };
    },
  },

  /* ------------------------- EVERYDAY LIFE ------------------------- */
  {
    slug: "tip-calculator",
    name: "Tip Calculator",
    category: "everyday-life",
    popular: true,
    description: "Tip amount and total bill, split across your group.",
    fields: [f("bill", "Bill amount", 2400), f("tip", "Tip", 10, "%"), f("people", "People", 4)],
    compute: (v) => {
      const tip = (num(v.bill) * num(v.tip)) / 100;
      const total = num(v.bill) + tip;
      return { result: fmt(total), detail: `Tip ${fmt(tip)} · Each person pays ${fmt(total / Math.max(num(v.people), 1))}` };
    },
  },
  {
    slug: "split-bill-calculator",
    name: "Split Bill Calculator",
    category: "everyday-life",
    description: "Divide a bill evenly, including tax and tip.",
    fields: [f("bill", "Total bill", 5000), f("people", "People", 5), f("extra", "Tax & tip", 12, "%")],
    compute: (v) => {
      const total = num(v.bill) * (1 + num(v.extra) / 100);
      return { result: `${fmt(total / Math.max(num(v.people), 1))} each`, detail: `Grand total ${fmt(total)}` };
    },
  },
  {
    slug: "cooking-converter",
    name: "Cooking Converter",
    category: "everyday-life",
    description: "Convert cups, tablespoons, millilitres and grams.",
    fields: [f("value", "Amount", 2), sel("from", "From", ["Cup", "Tablespoon", "Teaspoon", "Millilitre", "Fluid ounce"], "Cup"), sel("to", "To", ["Cup", "Tablespoon", "Teaspoon", "Millilitre", "Fluid ounce"], "Millilitre")],
    compute: (v) => {
      const ml: Record<string, number> = { Cup: 236.588, Tablespoon: 14.787, Teaspoon: 4.929, Millilitre: 1, "Fluid ounce": 29.5735 };
      return { result: `${fmt((num(v.value) * ml[v.from]) / ml[v.to], 4)} ${v.to}` };
    },
  },
  {
    slug: "fuel-cost-calculator",
    name: "Fuel Cost Calculator",
    category: "everyday-life",
    description: "Total fuel cost for any journey.",
    fields: [f("distance", "Distance", 450, "km"), f("efficiency", "Fuel efficiency", 18, "km/l"), f("price", "Fuel price", 105, "per litre")],
    compute: (v) => {
      const litres = num(v.distance) / Math.max(num(v.efficiency), 1e-9);
      return { result: fmt(litres * num(v.price)), detail: `${fmt(litres, 2)} litres required` };
    },
  },
  {
    slug: "travel-cost-calculator",
    name: "Travel Cost Calculator",
    category: "everyday-life",
    description: "Total trip budget across travel, stay and food.",
    fields: [f("travel", "Travel cost", 8000), f("stay", "Stay per night", 3500), f("nights", "Nights", 4), f("daily", "Daily spend", 1500)],
    compute: (v) => {
      const total = num(v.travel) + num(v.stay) * num(v.nights) + num(v.daily) * (num(v.nights) + 1);
      return { result: fmt(total), detail: `Per day ${fmt(total / Math.max(num(v.nights) + 1, 1))}` };
    },
  },
  {
    slug: "electricity-bill-calculator",
    name: "Electricity Bill Calculator",
    category: "everyday-life",
    description: "Monthly electricity cost from appliance usage.",
    fields: [f("watts", "Power rating", 1500, "W"), f("hours", "Hours per day", 6), f("rate", "Tariff", 8, "per kWh")],
    compute: (v) => {
      const kwh = (num(v.watts) / 1000) * num(v.hours) * 30;
      return { result: fmt(kwh * num(v.rate)), detail: `${fmt(kwh, 2)} kWh per month` };
    },
  },
  {
    slug: "internet-speed-calculator",
    name: "Internet Speed Calculator",
    category: "everyday-life",
    description: "How long a download takes at a given connection speed.",
    fields: [f("size", "File size", 4.7, "GB"), f("speed", "Speed", 100, "Mbps")],
    compute: (v) => {
      const seconds = (num(v.size) * 8 * 1024) / Math.max(num(v.speed), 1e-9);
      return { result: `${fmt(seconds / 60, 2)} minutes`, detail: `${fmt(seconds, 0)} seconds at ${v.speed} Mbps` };
    },
  },
  {
    slug: "password-strength-calculator",
    name: "Password Strength Calculator",
    category: "everyday-life",
    description: "Entropy and estimated crack time for a password.",
    fields: [{ key: "pw", label: "Password", type: "text", default: "Sunset-42!" }],
    compute: (v) => {
      const pw = String(v.pw ?? "");
      let pool = 0;
      if (/[a-z]/.test(pw)) pool += 26;
      if (/[A-Z]/.test(pw)) pool += 26;
      if (/[0-9]/.test(pw)) pool += 10;
      if (/[^A-Za-z0-9]/.test(pw)) pool += 33;
      const bits = pw.length * Math.log2(Math.max(pool, 1));
      const label = bits < 40 ? "Weak" : bits < 60 ? "Fair" : bits < 80 ? "Strong" : "Very strong";
      return { result: `${label} (${fmt(bits, 1)} bits)`, detail: `Character pool ${pool} · Length ${pw.length}` };
    },
  },

  /* --------------------------- PROGRAMMING -------------------------- */
  {
    slug: "binary-converter",
    name: "Binary Converter",
    category: "programming",
    description: "Convert decimal numbers to binary and back.",
    fields: [f("n", "Decimal number", 42)],
    compute: (v) => {
      const n = Math.floor(num(v.n));
      return { result: n.toString(2), detail: `Hex ${n.toString(16).toUpperCase()} · Octal ${n.toString(8)}` };
    },
  },
  {
    slug: "hex-converter",
    name: "Hex Converter",
    category: "programming",
    description: "Convert hexadecimal values to decimal and binary.",
    fields: [{ key: "hex", label: "Hex value", type: "text", default: "1A4" }],
    compute: (v) => {
      const n = parseInt(String(v.hex ?? "").replace(/^0x/i, ""), 16);
      if (!Number.isFinite(n)) return { result: "Invalid hex" };
      return { result: String(n), detail: `Binary ${n.toString(2)} · Octal ${n.toString(8)}` };
    },
  },
  {
    slug: "decimal-converter",
    name: "Decimal Converter",
    category: "programming",
    description: "Convert a number between any two bases (2–36).",
    fields: [{ key: "value", label: "Value", type: "text", default: "255" }, f("from", "From base", 10), f("to", "To base", 2)],
    compute: (v) => {
      const n = parseInt(String(v.value ?? ""), num(v.from, 10));
      if (!Number.isFinite(n)) return { result: "Invalid input" };
      return { result: n.toString(Math.min(Math.max(num(v.to, 2), 2), 36)).toUpperCase() };
    },
  },
  {
    slug: "ascii-converter",
    name: "ASCII Converter",
    category: "programming",
    description: "Convert text to ASCII character codes.",
    fields: [{ key: "text", label: "Text", type: "text", default: "Hello" }],
    compute: (v) => {
      const codes = Array.from(String(v.text ?? "")).map((c) => c.charCodeAt(0));
      return { result: codes.join(" "), detail: `Hex ${codes.map((c) => c.toString(16).padStart(2, "0")).join(" ")}` };
    },
  },
  {
    slug: "base64-encoder-decoder",
    name: "Base64 Encoder / Decoder",
    category: "programming",
    description: "Encode text to Base64 or decode it back.",
    fields: [{ key: "text", label: "Text", type: "text", default: "CalculatorHub" }, sel("mode", "Mode", ["Encode", "Decode"], "Encode")],
    compute: (v) => {
      const text = String(v.text ?? "");
      try {
        if (v.mode === "Encode") return { result: btoa(unescape(encodeURIComponent(text))) };
        return { result: decodeURIComponent(escape(atob(text))) };
      } catch {
        return { result: "Invalid input for this mode" };
      }
    },
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    category: "programming",
    description: "Generate an RFC-4122 version 4 UUID.",
    fields: [f("seed", "Press calculate to regenerate", 1)],
    compute: () => ({
      result:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
              const r = (Math.random() * 16) | 0;
              return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
            }),
      detail: "Version 4, randomly generated",
    }),
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    category: "programming",
    description: "Fast non-cryptographic checksum for any string.",
    fields: [{ key: "text", label: "Text", type: "text", default: "CalculatorHub" }],
    compute: (v) => {
      const s = String(v.text ?? "");
      let h1 = 0xdeadbeef;
      let h2 = 0x41c6ce57;
      for (let i = 0; i < s.length; i++) {
        const ch = s.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
      }
      const out = (h1 >>> 0).toString(16).padStart(8, "0") + (h2 >>> 0).toString(16).padStart(8, "0");
      return { result: out, detail: "64-bit checksum (not for security use)" };
    },
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    category: "programming",
    description: "Validate and pretty-print JSON instantly.",
    fields: [{ key: "json", label: "JSON", type: "text", default: '{"name":"CalculatorHub","calculators":500}' }],
    compute: (v) => {
      try {
        return { result: "Valid JSON", detail: JSON.stringify(JSON.parse(String(v.json ?? "")), null, 2) };
      } catch (e) {
        return { result: "Invalid JSON", detail: (e as Error).message };
      }
    },
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    category: "programming",
    description: "Test a regular expression against sample text.",
    fields: [
      { key: "pattern", label: "Pattern", type: "text", default: "\\d+" },
      { key: "text", label: "Test string", type: "text", default: "Order 66 shipped in 3 days" },
      { key: "flags", label: "Flags", type: "text", default: "g" },
    ],
    compute: (v) => {
      try {
        const re = new RegExp(String(v.pattern ?? ""), String(v.flags ?? ""));
        const matches = String(v.text ?? "").match(re);
        return { result: matches ? `${matches.length} match(es)` : "No matches", detail: matches ? matches.join(", ") : undefined };
      } catch (e) {
        return { result: "Invalid regex", detail: (e as Error).message };
      }
    },
  },
];

const converterCalcs: Calculator[] = [
  unitConverter("length-converter", "length"),
  unitConverter("weight-converter", "weight"),
  unitConverter("area-converter", "area"),
  unitConverter("volume-converter", "volume"),
  unitConverter("speed-converter", "speed"),
  unitConverter("pressure-converter", "pressure"),
  unitConverter("data-storage-converter", "data-storage"),
  unitConverter("energy-converter", "energy-unit"),
  {
    slug: "temperature-converter",
    name: "Temperature Converter",
    category: "unit-converters",
    popular: true,
    description: "Convert between Celsius, Fahrenheit and Kelvin.",
    fields: [f("value", "Temperature", 25), sel("from", "From", ["Celsius", "Fahrenheit", "Kelvin"], "Celsius"), sel("to", "To", ["Celsius", "Fahrenheit", "Kelvin"], "Fahrenheit")],
    compute: (v) => {
      const value = num(v.value);
      const c = v.from === "Celsius" ? value : v.from === "Fahrenheit" ? ((value - 32) * 5) / 9 : value - 273.15;
      const out = v.to === "Celsius" ? c : v.to === "Fahrenheit" ? (c * 9) / 5 + 32 : c + 273.15;
      return { result: `${fmt(out, 4)} ${v.to}`, steps: [`Convert to Celsius: ${fmt(c, 4)} °C`, `Convert to ${v.to}: ${fmt(out, 4)}`] };
    },
  },
  {
    slug: "fuel-economy-converter",
    name: "Fuel Economy Converter",
    category: "unit-converters",
    description: "Convert between km/l, MPG and litres per 100 km.",
    fields: [f("value", "Value", 18), sel("from", "From", ["km/l", "MPG (US)", "L/100km"], "km/l"), sel("to", "To", ["km/l", "MPG (US)", "L/100km"], "MPG (US)")],
    compute: (v) => {
      const value = num(v.value);
      const kmpl = v.from === "km/l" ? value : v.from === "MPG (US)" ? value * 0.425144 : 100 / Math.max(value, 1e-9);
      const out = v.to === "km/l" ? kmpl : v.to === "MPG (US)" ? kmpl / 0.425144 : 100 / Math.max(kmpl, 1e-9);
      return { result: `${fmt(out, 3)} ${v.to}` };
    },
  },
];

export const calculators: Calculator[] = [
  ...baseCalculators,
  ...converterCalcs,
  ...extraCalculators,
].sort((a, b) => a.name.localeCompare(b.name));


export const calculatorsByCategory = (slug: string) =>
  calculators.filter((c) => c.category === slug);

export const getCalculator = (slug: string) => calculators.find((c) => c.slug === slug);

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const popularCalculators = calculators.filter((c) => c.popular);

export const searchCalculators = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return calculators;
  return calculators.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.replace("-", " ").includes(q),
  );
};
