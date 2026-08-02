import type { Calculator, Field } from "./calculators";

/* Local helpers (kept local so this module never imports runtime values from
   calculators.ts, avoiding a circular dependency). */
const num = (v: string | undefined, fallback = 0) => {
  const n = parseFloat(String(v ?? "").replace(/,/g, ""));
  return Number.isFinite(n) ? n : fallback;
};

const fmt = (n: number, digits = 2) =>
  Number.isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: digits }) : "—";

const f = (key: string, label: string, def?: string | number, unit?: string): Field => ({
  key,
  label,
  default: def,
  unit,
  type: "number",
});

const txt = (key: string, label: string, def = ""): Field => ({ key, label, type: "text", default: def });

const dt = (key: string, label: string, def = ""): Field => ({ key, label, type: "date", default: def });

const sel = (key: string, label: string, options: string[], def?: string): Field => ({
  key,
  label,
  type: "select",
  default: def ?? options[0],
  options: options.map((o) => ({ value: o, label: o })),
});

const days = (a: string, b: string) =>
  Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);

/* ------------------------------------------------------------------ */
/* Finance                                                             */
/* ------------------------------------------------------------------ */

const finance: Calculator[] = [
  {
    slug: "loan-emi-calculator",
    name: "Loan EMI Calculator",
    category: "finance",
    popular: true,
    description: "Work out the monthly instalment on any loan.",
    formula: "EMI = P·r·(1+r)^n / ((1+r)^n − 1)",
    fields: [f("p", "Loan amount", 250000), f("rate", "Annual interest rate", 9, "%"), f("years", "Tenure", 5, "years")],
    compute: (v) => {
      const p = num(v.p);
      const r = num(v.rate) / 1200;
      const n = num(v.years) * 12;
      const emi = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = emi * n;
      return {
        result: `${fmt(emi)} / month`,
        detail: `Total repayment ${fmt(total)} · Interest ${fmt(total - p)}`,
        steps: [`Monthly rate = ${fmt(r * 100, 4)}%`, `Months = ${fmt(n, 0)}`, `EMI = ${fmt(emi)}`],
        chart: [
          { name: "Principal", value: Math.round(p) },
          { name: "Interest", value: Math.round(total - p) },
        ],
      };
    },
  },
  {
    slug: "mortgage-calculator",
    name: "Mortgage Calculator",
    category: "finance",
    popular: true,
    description: "Estimate home loan repayments including taxes and insurance.",
    fields: [
      f("price", "Property price", 400000),
      f("down", "Down payment", 80000),
      f("rate", "Interest rate", 6.5, "%"),
      f("years", "Term", 30, "years"),
      f("tax", "Annual property tax", 3600),
      f("ins", "Annual insurance", 1200),
    ],
    compute: (v) => {
      const p = Math.max(num(v.price) - num(v.down), 0);
      const r = num(v.rate) / 1200;
      const n = num(v.years) * 12;
      const pi = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const monthly = pi + num(v.tax) / 12 + num(v.ins) / 12;
      return {
        result: `${fmt(monthly)} / month`,
        detail: `Principal & interest ${fmt(pi)} · Loan ${fmt(p)}`,
        chart: [
          { name: "P&I", value: Math.round(pi) },
          { name: "Tax", value: Math.round(num(v.tax) / 12) },
          { name: "Insurance", value: Math.round(num(v.ins) / 12) },
        ],
      };
    },
  },
  {
    slug: "car-loan-calculator",
    name: "Car Loan Calculator",
    category: "finance",
    description: "Monthly payment and total cost for a vehicle loan.",
    fields: [f("price", "Vehicle price", 28000), f("down", "Down payment", 4000), f("rate", "Interest rate", 7.9, "%"), f("years", "Term", 5, "years")],
    compute: (v) => {
      const p = Math.max(num(v.price) - num(v.down), 0);
      const r = num(v.rate) / 1200;
      const n = num(v.years) * 12;
      const m = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      return { result: `${fmt(m)} / month`, detail: `Total paid ${fmt(m * n)} on a ${fmt(p)} loan` };
    },
  },
  {
    slug: "credit-card-payoff-calculator",
    name: "Credit Card Payoff Calculator",
    category: "finance",
    description: "See how long it takes to clear a card balance.",
    fields: [f("balance", "Balance", 5000), f("apr", "APR", 21, "%"), f("payment", "Monthly payment", 200)],
    compute: (v) => {
      const r = num(v.apr) / 1200;
      let bal = num(v.balance);
      const pay = num(v.payment);
      if (pay <= bal * r) return { result: "Payment too low", detail: "Increase the monthly payment to clear interest." };
      let months = 0;
      let interest = 0;
      while (bal > 0 && months < 1200) {
        const i = bal * r;
        interest += i;
        bal = bal + i - pay;
        months++;
      }
      return {
        result: `${months} months`,
        detail: `${(months / 12).toFixed(1)} years · Interest paid ${fmt(interest)}`,
      };
    },
  },
  {
    slug: "debt-to-income-calculator",
    name: "Debt-to-Income Calculator",
    category: "finance",
    description: "Check the DTI ratio lenders use to approve loans.",
    fields: [f("income", "Gross monthly income", 6000), f("debt", "Monthly debt payments", 1800)],
    compute: (v) => {
      const dti = (num(v.debt) / Math.max(num(v.income), 1e-9)) * 100;
      const band = dti < 36 ? "Healthy" : dti < 43 ? "Acceptable" : "High risk";
      return { result: `${fmt(dti)}%`, detail: `${band} debt-to-income ratio` };
    },
  },
  {
    slug: "break-even-calculator",
    name: "Break-Even Calculator",
    category: "finance",
    description: "Units you must sell to cover fixed costs.",
    formula: "Break-even = Fixed costs / (Price − Variable cost)",
    fields: [f("fixed", "Fixed costs", 20000), f("price", "Price per unit", 50), f("variable", "Variable cost per unit", 30)],
    compute: (v) => {
      const margin = num(v.price) - num(v.variable);
      if (margin <= 0) return { result: "No break-even", detail: "Price must exceed variable cost." };
      const units = num(v.fixed) / margin;
      return { result: `${fmt(units, 0)} units`, detail: `Revenue needed ${fmt(units * num(v.price))}` };
    },
  },
  {
    slug: "roi-calculator",
    name: "ROI Calculator",
    category: "finance",
    description: "Return on investment as a percentage and multiple.",
    fields: [f("cost", "Amount invested", 10000), f("return", "Final value", 15000)],
    compute: (v) => {
      const cost = num(v.cost);
      const gain = num(v.return) - cost;
      return { result: `${fmt((gain / Math.max(cost, 1e-9)) * 100)}%`, detail: `Net gain ${fmt(gain)}` };
    },
  },
  {
    slug: "cagr-calculator",
    name: "CAGR Calculator",
    category: "finance",
    description: "Compound annual growth rate between two values.",
    formula: "CAGR = (End/Start)^(1/years) − 1",
    fields: [f("start", "Starting value", 10000), f("end", "Ending value", 25000), f("years", "Years", 5)],
    compute: (v) => {
      const g = Math.pow(num(v.end) / Math.max(num(v.start), 1e-9), 1 / Math.max(num(v.years), 1e-9)) - 1;
      return { result: `${fmt(g * 100)}% per year`, detail: `Total growth ${fmt((num(v.end) / Math.max(num(v.start), 1e-9) - 1) * 100)}%` };
    },
  },
  {
    slug: "net-worth-calculator",
    name: "Net Worth Calculator",
    category: "finance",
    description: "Assets minus liabilities in one number.",
    fields: [f("assets", "Total assets", 350000), f("liabilities", "Total liabilities", 190000)],
    compute: (v) => {
      const nw = num(v.assets) - num(v.liabilities);
      return {
        result: fmt(nw),
        detail: nw >= 0 ? "Positive net worth" : "Liabilities exceed assets",
        chart: [
          { name: "Assets", value: Math.round(num(v.assets)) },
          { name: "Liabilities", value: Math.round(num(v.liabilities)) },
        ],
      };
    },
  },
  {
    slug: "npv-calculator",
    name: "NPV Calculator",
    category: "finance",
    description: "Net present value of an even annual cash flow.",
    fields: [f("initial", "Initial investment", 50000), f("cash", "Annual cash flow", 12000), f("rate", "Discount rate", 8, "%"), f("years", "Years", 6)],
    compute: (v) => {
      const r = num(v.rate) / 100;
      let npv = -num(v.initial);
      for (let t = 1; t <= num(v.years); t++) npv += num(v.cash) / Math.pow(1 + r, t);
      return { result: fmt(npv), detail: npv > 0 ? "Value-adding project" : "Destroys value at this rate" };
    },
  },
  {
    slug: "rule-of-72-calculator",
    name: "Rule of 72 Calculator",
    category: "finance",
    description: "How many years until your money doubles.",
    formula: "Years ≈ 72 / rate",
    fields: [f("rate", "Annual return", 8, "%")],
    compute: (v) => ({ result: `${fmt(72 / Math.max(num(v.rate), 1e-9), 1)} years`, detail: "Approximate doubling time" }),
  },
  {
    slug: "down-payment-calculator",
    name: "Down Payment Calculator",
    category: "finance",
    description: "How much cash you need upfront for a purchase.",
    fields: [f("price", "Purchase price", 400000), f("percent", "Down payment", 20, "%")],
    compute: (v) => {
      const d = (num(v.price) * num(v.percent)) / 100;
      return { result: fmt(d), detail: `Financed amount ${fmt(num(v.price) - d)}` };
    },
  },
  {
    slug: "simple-interest-calculator",
    name: "Simple Interest Calculator",
    category: "finance",
    description: "Flat interest on a principal amount.",
    formula: "I = P × r × t",
    fields: [f("p", "Principal", 10000), f("rate", "Rate", 6, "%"), f("years", "Time", 3, "years")],
    compute: (v) => {
      const i = (num(v.p) * num(v.rate) * num(v.years)) / 100;
      return { result: fmt(i), detail: `Maturity value ${fmt(num(v.p) + i)}` };
    },
  },
  {
    slug: "apy-calculator",
    name: "APY Calculator",
    category: "finance",
    description: "Effective annual yield from a nominal rate.",
    fields: [f("rate", "Nominal rate", 5, "%"), sel("freq", "Compounding", ["Daily", "Monthly", "Quarterly", "Annually"], "Monthly")],
    compute: (v) => {
      const n = v.freq === "Daily" ? 365 : v.freq === "Monthly" ? 12 : v.freq === "Quarterly" ? 4 : 1;
      const apy = (Math.pow(1 + num(v.rate) / 100 / n, n) - 1) * 100;
      return { result: `${fmt(apy, 3)}%`, detail: `Compounded ${String(v.freq).toLowerCase()}` };
    },
  },
  {
    slug: "markup-calculator",
    name: "Markup Calculator",
    category: "finance",
    description: "Selling price from cost and desired markup.",
    fields: [f("cost", "Unit cost", 40), f("markup", "Markup", 45, "%")],
    compute: (v) => {
      const price = num(v.cost) * (1 + num(v.markup) / 100);
      const margin = ((price - num(v.cost)) / Math.max(price, 1e-9)) * 100;
      return { result: fmt(price), detail: `Gross margin ${fmt(margin)}%` };
    },
  },
  {
    slug: "sales-tax-calculator",
    name: "Sales Tax Calculator",
    category: "finance",
    description: "Add or remove sales tax from any amount.",
    fields: [f("amount", "Amount", 250), f("rate", "Tax rate", 8.5, "%"), sel("mode", "Mode", ["Add tax", "Remove tax"], "Add tax")],
    compute: (v) => {
      const a = num(v.amount);
      const r = num(v.rate) / 100;
      const net = v.mode === "Add tax" ? a : a / (1 + r);
      const tax = v.mode === "Add tax" ? a * r : a - net;
      return { result: fmt(net + tax), detail: `Net ${fmt(net)} · Tax ${fmt(tax)}` };
    },
  },
  {
    slug: "hourly-to-salary-calculator",
    name: "Hourly to Salary Calculator",
    category: "finance",
    description: "Convert an hourly wage into weekly, monthly and yearly pay.",
    fields: [f("rate", "Hourly rate", 28), f("hours", "Hours per week", 40), f("weeks", "Weeks per year", 52)],
    compute: (v) => {
      const yearly = num(v.rate) * num(v.hours) * num(v.weeks);
      return { result: `${fmt(yearly)} / year`, detail: `${fmt(yearly / 12)} monthly · ${fmt(num(v.rate) * num(v.hours))} weekly` };
    },
  },
  {
    slug: "overtime-pay-calculator",
    name: "Overtime Pay Calculator",
    category: "finance",
    description: "Total pay including overtime multiplier.",
    fields: [f("rate", "Base hourly rate", 25), f("base", "Regular hours", 40), f("ot", "Overtime hours", 8), f("mult", "Overtime multiplier", 1.5)],
    compute: (v) => {
      const reg = num(v.rate) * num(v.base);
      const ot = num(v.rate) * num(v.mult) * num(v.ot);
      return { result: fmt(reg + ot), detail: `Regular ${fmt(reg)} · Overtime ${fmt(ot)}` };
    },
  },
  {
    slug: "emergency-fund-calculator",
    name: "Emergency Fund Calculator",
    category: "finance",
    description: "How much cash cushion you should keep.",
    fields: [f("expenses", "Monthly expenses", 2800), f("months", "Months of cover", 6), f("saved", "Already saved", 5000)],
    compute: (v) => {
      const target = num(v.expenses) * num(v.months);
      return { result: fmt(target), detail: `Still to save ${fmt(Math.max(target - num(v.saved), 0))}` };
    },
  },
  {
    slug: "lease-payment-calculator",
    name: "Lease Payment Calculator",
    category: "finance",
    description: "Estimate a monthly vehicle lease payment.",
    fields: [f("price", "Vehicle price", 35000), f("residual", "Residual value", 20000), f("months", "Lease term", 36), f("rate", "Money factor APR", 6, "%")],
    compute: (v) => {
      const dep = (num(v.price) - num(v.residual)) / Math.max(num(v.months), 1);
      const fin = ((num(v.price) + num(v.residual)) * (num(v.rate) / 2400));
      return { result: `${fmt(dep + fin)} / month`, detail: `Depreciation ${fmt(dep)} · Finance ${fmt(fin)}` };
    },
  },
];

/* ------------------------------------------------------------------ */
/* Health                                                              */
/* ------------------------------------------------------------------ */

const health: Calculator[] = [
  {
    slug: "ideal-weight-calculator",
    name: "Ideal Weight Calculator",
    category: "health",
    description: "Devine formula ideal body weight from height.",
    fields: [f("height", "Height", 175, "cm"), sel("sex", "Sex", ["Male", "Female"], "Male")],
    compute: (v) => {
      const inches = num(v.height) / 2.54;
      const over = Math.max(inches - 60, 0);
      const w = v.sex === "Male" ? 50 + 2.3 * over : 45.5 + 2.3 * over;
      return { result: `${fmt(w, 1)} kg`, detail: `${fmt(w * 2.20462, 1)} lb (Devine formula)` };
    },
  },
  {
    slug: "lean-body-mass-calculator",
    name: "Lean Body Mass Calculator",
    category: "health",
    description: "Estimate fat-free mass using the Boer formula.",
    fields: [f("weight", "Weight", 78, "kg"), f("height", "Height", 178, "cm"), sel("sex", "Sex", ["Male", "Female"], "Male")],
    compute: (v) => {
      const w = num(v.weight);
      const h = num(v.height);
      const lbm = v.sex === "Male" ? 0.407 * w + 0.267 * h - 19.2 : 0.252 * w + 0.473 * h - 48.3;
      return { result: `${fmt(lbm, 1)} kg`, detail: `Body fat mass ≈ ${fmt(w - lbm, 1)} kg` };
    },
  },
  {
    slug: "waist-to-hip-ratio-calculator",
    name: "Waist to Hip Ratio Calculator",
    category: "health",
    description: "A quick cardiovascular risk indicator.",
    fields: [f("waist", "Waist", 84, "cm"), f("hip", "Hip", 98, "cm"), sel("sex", "Sex", ["Male", "Female"], "Male")],
    compute: (v) => {
      const r = num(v.waist) / Math.max(num(v.hip), 1e-9);
      const limit = v.sex === "Male" ? 0.9 : 0.85;
      return { result: fmt(r, 2), detail: r <= limit ? "Low risk range" : "Above the recommended range" };
    },
  },
  {
    slug: "tdee-calculator",
    name: "TDEE Calculator",
    category: "health",
    popular: true,
    description: "Total daily energy expenditure from BMR and activity.",
    fields: [
      f("weight", "Weight", 72, "kg"),
      f("height", "Height", 175, "cm"),
      f("age", "Age", 30, "years"),
      sel("sex", "Sex", ["Male", "Female"], "Male"),
      sel("activity", "Activity level", ["Sedentary", "Light", "Moderate", "Active", "Very active"], "Moderate"),
    ],
    compute: (v) => {
      const bmr =
        10 * num(v.weight) + 6.25 * num(v.height) - 5 * num(v.age) + (v.sex === "Male" ? 5 : -161);
      const mult: Record<string, number> = { Sedentary: 1.2, Light: 1.375, Moderate: 1.55, Active: 1.725, "Very active": 1.9 };
      const tdee = bmr * (mult[String(v.activity)] ?? 1.55);
      return {
        result: `${fmt(tdee, 0)} kcal / day`,
        detail: `BMR ${fmt(bmr, 0)} kcal`,
        chart: [
          { name: "Cut", value: Math.round(tdee - 500) },
          { name: "Maintain", value: Math.round(tdee) },
          { name: "Bulk", value: Math.round(tdee + 400) },
        ],
      };
    },
  },
  {
    slug: "macro-split-calculator",
    name: "Macro Split Calculator",
    category: "health",
    description: "Turn a calorie target into protein, carb and fat grams.",
    fields: [f("calories", "Daily calories", 2200), f("protein", "Protein", 30, "%"), f("carbs", "Carbs", 40, "%"), f("fat", "Fat", 30, "%")],
    compute: (v) => {
      const c = num(v.calories);
      const p = (c * num(v.protein)) / 100 / 4;
      const cb = (c * num(v.carbs)) / 100 / 4;
      const ft = (c * num(v.fat)) / 100 / 9;
      return {
        result: `${fmt(p, 0)}g P · ${fmt(cb, 0)}g C · ${fmt(ft, 0)}g F`,
        chart: [
          { name: "Protein", value: Math.round(p) },
          { name: "Carbs", value: Math.round(cb) },
          { name: "Fat", value: Math.round(ft) },
        ],
      };
    },
  },
  {
    slug: "protein-intake-calculator",
    name: "Protein Intake Calculator",
    category: "health",
    description: "Daily protein target based on weight and goal.",
    fields: [f("weight", "Weight", 72, "kg"), sel("goal", "Goal", ["Sedentary", "Fat loss", "Muscle gain", "Athlete"], "Muscle gain")],
    compute: (v) => {
      const per: Record<string, number> = { Sedentary: 0.9, "Fat loss": 1.8, "Muscle gain": 2.0, Athlete: 2.2 };
      const g = num(v.weight) * (per[String(v.goal)] ?? 1.6);
      return { result: `${fmt(g, 0)} g / day`, detail: `${fmt(g / 4, 0)} g per meal across 4 meals` };
    },
  },
  {
    slug: "body-surface-area-calculator",
    name: "Body Surface Area Calculator",
    category: "health",
    description: "Mosteller BSA, widely used for dosing.",
    formula: "BSA = √(height × weight / 3600)",
    fields: [f("height", "Height", 175, "cm"), f("weight", "Weight", 72, "kg")],
    compute: (v) => ({
      result: `${fmt(Math.sqrt((num(v.height) * num(v.weight)) / 3600), 2)} m²`,
      detail: "Mosteller formula",
    }),
  },
  {
    slug: "vo2-max-calculator",
    name: "VO2 Max Calculator",
    category: "health",
    description: "Aerobic fitness estimate from a 12-minute run.",
    fields: [f("distance", "Distance covered in 12 min", 2600, "m")],
    compute: (v) => {
      const vo2 = (num(v.distance) - 504.9) / 44.73;
      return { result: `${fmt(vo2, 1)} ml/kg/min`, detail: "Cooper test estimate" };
    },
  },
  {
    slug: "sleep-cycle-calculator",
    name: "Sleep Cycle Calculator",
    category: "health",
    description: "Best wake-up times based on 90-minute cycles.",
    fields: [txt("time", "Bedtime (HH:MM)", "23:00")],
    compute: (v) => {
      const [h, m] = String(v.time ?? "23:00").split(":").map((x) => parseInt(x, 10) || 0);
      const start = (h ?? 0) * 60 + (m ?? 0) + 14;
      const times = [3, 4, 5, 6].map((c) => {
        const t = (start + c * 90) % 1440;
        return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
      });
      return { result: times.join(" · "), detail: "Wake at the end of a cycle to feel refreshed" };
    },
  },
  {
    slug: "smoking-cost-calculator",
    name: "Smoking Cost Calculator",
    category: "health",
    description: "What a smoking habit costs over time.",
    fields: [f("perday", "Cigarettes per day", 10), f("packprice", "Price per pack of 20", 9)],
    compute: (v) => {
      const daily = (num(v.perday) / 20) * num(v.packprice);
      return { result: `${fmt(daily * 365)} / year`, detail: `${fmt(daily)} per day · ${fmt(daily * 3650)} in 10 years` };
    },
  },
  {
    slug: "blood-alcohol-calculator",
    name: "Blood Alcohol Calculator",
    category: "health",
    description: "Estimated BAC using the Widmark formula.",
    fields: [f("drinks", "Standard drinks", 3), f("weight", "Weight", 72, "kg"), f("hours", "Hours since first drink", 2), sel("sex", "Sex", ["Male", "Female"], "Male")],
    compute: (v) => {
      const r = v.sex === "Male" ? 0.68 : 0.55;
      const grams = num(v.drinks) * 14;
      const bac = Math.max((grams / (num(v.weight) * 1000 * r)) * 100 - 0.015 * num(v.hours), 0);
      return { result: `${bac.toFixed(3)}%`, detail: "Estimate only — never use to decide whether to drive." };
    },
  },
  {
    slug: "child-height-predictor",
    name: "Child Height Predictor",
    category: "health",
    description: "Mid-parental height estimate for a child.",
    fields: [f("mother", "Mother's height", 163, "cm"), f("father", "Father's height", 178, "cm"), sel("sex", "Child", ["Boy", "Girl"], "Boy")],
    compute: (v) => {
      const avg = (num(v.mother) + num(v.father)) / 2;
      const h = v.sex === "Boy" ? avg + 6.5 : avg - 6.5;
      return { result: `${fmt(h, 1)} cm`, detail: `Typical range ${fmt(h - 8, 1)}–${fmt(h + 8, 1)} cm` };
    },
  },
];

/* ------------------------------------------------------------------ */
/* Education                                                           */
/* ------------------------------------------------------------------ */

const education: Calculator[] = [
  {
    slug: "percentage-to-cgpa-calculator",
    name: "Percentage to CGPA Calculator",
    category: "education",
    description: "Convert marks percentage into CGPA on a 10-point scale.",
    fields: [f("percent", "Percentage", 82, "%")],
    compute: (v) => ({ result: fmt(num(v.percent) / 9.5, 2), detail: "Using the standard ÷9.5 conversion" }),
  },
  {
    slug: "final-exam-mark-calculator",
    name: "Final Exam Mark Calculator",
    category: "education",
    description: "The score you need on the final to hit your target.",
    fields: [f("current", "Current grade", 74, "%"), f("weight", "Final exam weight", 40, "%"), f("target", "Target grade", 80, "%")],
    compute: (v) => {
      const w = num(v.weight) / 100;
      const needed = (num(v.target) - num(v.current) * (1 - w)) / Math.max(w, 1e-9);
      return {
        result: `${fmt(needed, 1)}%`,
        detail: needed > 100 ? "Not achievable with this weighting" : "Score at least this in the final",
      };
    },
  },
  {
    slug: "reading-time-calculator",
    name: "Reading Time Calculator",
    category: "education",
    description: "How long a piece of text takes to read.",
    fields: [f("words", "Word count", 1200), f("wpm", "Reading speed", 230, "wpm")],
    compute: (v) => {
      const mins = num(v.words) / Math.max(num(v.wpm), 1);
      return { result: `${fmt(mins, 1)} minutes`, detail: `${fmt(mins * 1.6, 1)} minutes if read aloud` };
    },
  },
  {
    slug: "word-count-calculator",
    name: "Word Count Calculator",
    category: "education",
    description: "Words, characters and sentences in any text.",
    fields: [txt("text", "Text", "Paste your text here to count the words.")],
    compute: (v) => {
      const s = String(v.text ?? "");
      const words = s.trim() ? s.trim().split(/\s+/).length : 0;
      const sentences = (s.match(/[.!?]+/g) ?? []).length;
      return { result: `${words} words`, detail: `${s.length} characters · ${sentences} sentences` };
    },
  },
  {
    slug: "typing-speed-calculator",
    name: "Typing Speed Calculator",
    category: "education",
    description: "Words per minute adjusted for accuracy.",
    fields: [f("words", "Words typed", 320), f("minutes", "Minutes", 5), f("errors", "Errors", 8)],
    compute: (v) => {
      const gross = num(v.words) / Math.max(num(v.minutes), 1e-9);
      const net = gross - num(v.errors) / Math.max(num(v.minutes), 1e-9);
      return { result: `${fmt(net, 0)} WPM net`, detail: `Gross ${fmt(gross, 0)} WPM` };
    },
  },
  {
    slug: "weighted-grade-calculator",
    name: "Weighted Grade Calculator",
    category: "education",
    description: "Combine assignment scores with their weights.",
    fields: [
      txt("scores", "Scores (comma separated)", "88, 72, 91"),
      txt("weights", "Weights (comma separated)", "30, 30, 40"),
    ],
    compute: (v) => {
      const s = String(v.scores ?? "").split(",").map((x) => parseFloat(x) || 0);
      const w = String(v.weights ?? "").split(",").map((x) => parseFloat(x) || 0);
      const tw = w.reduce((a, b) => a + b, 0);
      const total = s.reduce((acc, x, i) => acc + x * (w[i] ?? 0), 0) / Math.max(tw, 1e-9);
      return { result: `${fmt(total, 2)}%`, detail: `Weights total ${fmt(tw, 0)}%` };
    },
  },
  {
    slug: "class-percentile-calculator",
    name: "Class Percentile Calculator",
    category: "education",
    description: "Your percentile rank within a class.",
    fields: [f("rank", "Your rank", 12), f("total", "Students in class", 120)],
    compute: (v) => {
      const p = ((num(v.total) - num(v.rank)) / Math.max(num(v.total), 1)) * 100;
      return { result: `${fmt(p, 1)}th percentile`, detail: `Ahead of ${fmt(num(v.total) - num(v.rank), 0)} students` };
    },
  },
  {
    slug: "pomodoro-planner",
    name: "Pomodoro Study Planner",
    category: "education",
    description: "Break a study session into focus and break blocks.",
    fields: [f("hours", "Study hours", 3), f("focus", "Focus block", 25, "min"), f("break", "Break", 5, "min")],
    compute: (v) => {
      const cycle = num(v.focus) + num(v.break);
      const blocks = Math.floor((num(v.hours) * 60) / Math.max(cycle, 1));
      return { result: `${blocks} pomodoros`, detail: `${fmt(blocks * num(v.focus), 0)} min focused · ${fmt(blocks * num(v.break), 0)} min break` };
    },
  },
];

/* ------------------------------------------------------------------ */
/* Mathematics                                                         */
/* ------------------------------------------------------------------ */

const parseList = (s: string) =>
  String(s ?? "")
    .split(/[,\s]+/)
    .map((x) => parseFloat(x))
    .filter((x) => Number.isFinite(x));

const mathematics: Calculator[] = [
  {
    slug: "average-calculator",
    name: "Average Calculator",
    category: "mathematics",
    description: "Mean, sum and count for a list of numbers.",
    fields: [txt("numbers", "Numbers", "12, 18, 24, 30, 9")],
    compute: (v) => {
      const n = parseList(String(v.numbers ?? ""));
      const sum = n.reduce((a, b) => a + b, 0);
      return { result: fmt(sum / Math.max(n.length, 1), 4), detail: `Sum ${fmt(sum, 4)} across ${n.length} values` };
    },
  },
  {
    slug: "median-mode-calculator",
    name: "Median & Mode Calculator",
    category: "mathematics",
    description: "Middle value and most frequent value in a data set.",
    fields: [txt("numbers", "Numbers", "4, 7, 7, 9, 12, 15")],
    compute: (v) => {
      const n = parseList(String(v.numbers ?? "")).sort((a, b) => a - b);
      if (!n.length) return { result: "Enter some numbers" };
      const mid = Math.floor(n.length / 2);
      const median = n.length % 2 ? n[mid]! : ((n[mid - 1]! + n[mid]!) / 2);
      const counts = new Map<number, number>();
      n.forEach((x) => counts.set(x, (counts.get(x) ?? 0) + 1));
      const best = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]!;
      return { result: `Median ${fmt(median, 4)}`, detail: `Mode ${fmt(best[0], 4)} (appears ${best[1]}×)` };
    },
  },
  {
    slug: "ratio-calculator",
    name: "Ratio Calculator",
    category: "mathematics",
    description: "Simplify a ratio and scale it to a new total.",
    fields: [f("a", "First value", 24), f("b", "Second value", 36)],
    compute: (v) => {
      const gcd = (x: number, y: number): number => (y ? gcd(y, x % y) : x);
      const a = Math.round(num(v.a));
      const b = Math.round(num(v.b));
      const g = Math.abs(gcd(a, b)) || 1;
      return { result: `${a / g} : ${b / g}`, detail: `Decimal ratio ${fmt(a / Math.max(b, 1e-9), 4)}` };
    },
  },
  {
    slug: "proportion-solver",
    name: "Proportion Solver",
    category: "mathematics",
    description: "Solve a/b = c/x for the missing value.",
    fields: [f("a", "a", 3), f("b", "b", 4), f("c", "c", 15)],
    compute: (v) => {
      const x = (num(v.b) * num(v.c)) / Math.max(num(v.a), 1e-9);
      return { result: `x = ${fmt(x, 4)}`, steps: [`${fmt(num(v.a))}/${fmt(num(v.b))} = ${fmt(num(v.c))}/x`, `x = ${fmt(x, 4)}`] };
    },
  },
  {
    slug: "exponent-calculator",
    name: "Exponent Calculator",
    category: "mathematics",
    description: "Raise any base to any power.",
    fields: [f("base", "Base", 2), f("power", "Exponent", 10)],
    compute: (v) => ({ result: fmt(Math.pow(num(v.base), num(v.power)), 6) }),
  },
  {
    slug: "logarithm-calculator",
    name: "Logarithm Calculator",
    category: "mathematics",
    description: "Log of a number in any base.",
    fields: [f("value", "Value", 1000), f("base", "Base", 10)],
    compute: (v) => ({
      result: fmt(Math.log(num(v.value)) / Math.log(num(v.base, 10)), 6),
      detail: `ln = ${fmt(Math.log(num(v.value)), 6)} · log₁₀ = ${fmt(Math.log10(num(v.value)), 6)}`,
    }),
  },
  {
    slug: "root-calculator",
    name: "Root Calculator",
    category: "mathematics",
    description: "Square, cube and nth roots.",
    fields: [f("value", "Value", 256), f("n", "Root", 4)],
    compute: (v) => ({
      result: fmt(Math.pow(num(v.value), 1 / Math.max(num(v.n), 1e-9)), 6),
      detail: `√ = ${fmt(Math.sqrt(num(v.value)), 6)} · ∛ = ${fmt(Math.cbrt(num(v.value)), 6)}`,
    }),
  },
  {
    slug: "permutation-combination-calculator",
    name: "Permutation & Combination Calculator",
    category: "mathematics",
    description: "nPr and nCr for counting problems.",
    fields: [f("n", "n", 10), f("r", "r", 3)],
    compute: (v) => {
      const fact = (x: number) => {
        let out = 1;
        for (let i = 2; i <= x; i++) out *= i;
        return out;
      };
      const n = Math.round(num(v.n));
      const r = Math.round(num(v.r));
      const p = fact(n) / fact(n - r);
      return { result: `nPr = ${fmt(p, 0)}`, detail: `nCr = ${fmt(p / fact(r), 0)}` };
    },
  },
  {
    slug: "binomial-probability-calculator",
    name: "Binomial Probability Calculator",
    category: "mathematics",
    description: "Probability of exactly k successes in n trials.",
    fields: [f("n", "Trials", 10), f("k", "Successes", 4), f("p", "Success probability", 0.5)],
    compute: (v) => {
      const fact = (x: number) => {
        let out = 1;
        for (let i = 2; i <= x; i++) out *= i;
        return out;
      };
      const n = Math.round(num(v.n));
      const k = Math.round(num(v.k));
      const p = num(v.p);
      const c = fact(n) / (fact(k) * fact(n - k));
      const prob = c * Math.pow(p, k) * Math.pow(1 - p, n - k);
      return { result: `${fmt(prob * 100, 4)}%`, detail: `P = ${fmt(prob, 6)}` };
    },
  },
  {
    slug: "arithmetic-sequence-calculator",
    name: "Arithmetic Sequence Calculator",
    category: "mathematics",
    description: "nth term and sum of an arithmetic progression.",
    fields: [f("a", "First term", 3), f("d", "Common difference", 5), f("n", "Term number", 20)],
    compute: (v) => {
      const a = num(v.a);
      const d = num(v.d);
      const n = num(v.n);
      const an = a + (n - 1) * d;
      return { result: `aₙ = ${fmt(an, 4)}`, detail: `Sum of first ${fmt(n, 0)} terms = ${fmt((n / 2) * (a + an), 4)}` };
    },
  },
  {
    slug: "geometric-sequence-calculator",
    name: "Geometric Sequence Calculator",
    category: "mathematics",
    description: "nth term and sum of a geometric progression.",
    fields: [f("a", "First term", 2), f("r", "Common ratio", 3), f("n", "Term number", 8)],
    compute: (v) => {
      const a = num(v.a);
      const r = num(v.r);
      const n = num(v.n);
      const an = a * Math.pow(r, n - 1);
      const sum = r === 1 ? a * n : (a * (Math.pow(r, n) - 1)) / (r - 1);
      return { result: `aₙ = ${fmt(an, 4)}`, detail: `Sum = ${fmt(sum, 4)}` };
    },
  },
  {
    slug: "circle-calculator",
    name: "Circle Calculator",
    category: "mathematics",
    description: "Area, circumference and diameter from a radius.",
    fields: [f("r", "Radius", 7)],
    compute: (v) => {
      const r = num(v.r);
      return {
        result: `Area ${fmt(Math.PI * r * r, 4)}`,
        detail: `Circumference ${fmt(2 * Math.PI * r, 4)} · Diameter ${fmt(2 * r, 4)}`,
      };
    },
  },
  {
    slug: "triangle-area-calculator",
    name: "Triangle Area Calculator",
    category: "mathematics",
    description: "Heron's formula area from three sides.",
    formula: "A = √(s(s−a)(s−b)(s−c))",
    fields: [f("a", "Side a", 5), f("b", "Side b", 6), f("c", "Side c", 7)],
    compute: (v) => {
      const a = num(v.a);
      const b = num(v.b);
      const c = num(v.c);
      const s = (a + b + c) / 2;
      const area = Math.sqrt(Math.max(s * (s - a) * (s - b) * (s - c), 0));
      return { result: fmt(area, 4), detail: `Perimeter ${fmt(a + b + c, 4)}` };
    },
  },
  {
    slug: "pythagorean-theorem-calculator",
    name: "Pythagorean Theorem Calculator",
    category: "mathematics",
    description: "Find the hypotenuse or a missing leg.",
    formula: "a² + b² = c²",
    fields: [f("a", "Side a", 3), f("b", "Side b", 4)],
    compute: (v) => ({
      result: `c = ${fmt(Math.hypot(num(v.a), num(v.b)), 6)}`,
      detail: `Angle A = ${fmt((Math.atan2(num(v.a), num(v.b)) * 180) / Math.PI, 2)}°`,
    }),
  },
  {
    slug: "sphere-volume-calculator",
    name: "Sphere Volume Calculator",
    category: "mathematics",
    description: "Volume and surface area of a sphere.",
    fields: [f("r", "Radius", 5)],
    compute: (v) => {
      const r = num(v.r);
      return { result: fmt((4 / 3) * Math.PI * r ** 3, 4), detail: `Surface area ${fmt(4 * Math.PI * r * r, 4)}` };
    },
  },
  {
    slug: "percent-change-calculator",
    name: "Percent Change Calculator",
    category: "mathematics",
    popular: true,
    description: "Increase or decrease between two numbers.",
    fields: [f("from", "Original value", 120), f("to", "New value", 150)],
    compute: (v) => {
      const change = ((num(v.to) - num(v.from)) / Math.max(Math.abs(num(v.from)), 1e-9)) * 100;
      return { result: `${fmt(change, 3)}%`, detail: change >= 0 ? "Increase" : "Decrease" };
    },
  },
];

/* ------------------------------------------------------------------ */
/* Engineering                                                         */
/* ------------------------------------------------------------------ */

const engineering: Calculator[] = [
  {
    slug: "power-factor-calculator",
    name: "Power Factor Calculator",
    category: "engineering",
    description: "Real, apparent power and the resulting power factor.",
    fields: [f("real", "Real power", 8, "kW"), f("apparent", "Apparent power", 10, "kVA")],
    compute: (v) => {
      const pf = num(v.real) / Math.max(num(v.apparent), 1e-9);
      return { result: fmt(pf, 3), detail: `Reactive power ${fmt(Math.sqrt(Math.max(num(v.apparent) ** 2 - num(v.real) ** 2, 0)), 3)} kVAR` };
    },
  },
  {
    slug: "three-phase-current-calculator",
    name: "Three-Phase Current Calculator",
    category: "engineering",
    description: "Line current from three-phase power and voltage.",
    fields: [f("power", "Power", 15, "kW"), f("voltage", "Line voltage", 415, "V"), f("pf", "Power factor", 0.85)],
    compute: (v) => {
      const i = (num(v.power) * 1000) / (Math.sqrt(3) * num(v.voltage) * Math.max(num(v.pf), 1e-9));
      return { result: `${fmt(i, 2)} A`, detail: "I = P / (√3 × V × pf)" };
    },
  },
  {
    slug: "transformer-turns-calculator",
    name: "Transformer Turns Calculator",
    category: "engineering",
    description: "Turns ratio and secondary voltage.",
    fields: [f("np", "Primary turns", 1000), f("ns", "Secondary turns", 250), f("vp", "Primary voltage", 240, "V")],
    compute: (v) => {
      const ratio = num(v.np) / Math.max(num(v.ns), 1e-9);
      return { result: `${fmt(num(v.vp) / ratio, 2)} V secondary`, detail: `Turns ratio ${fmt(ratio, 3)} : 1` };
    },
  },
  {
    slug: "belt-length-calculator",
    name: "Belt Length Calculator",
    category: "engineering",
    description: "Required V-belt length between two pulleys.",
    fields: [f("d1", "Pulley 1 diameter", 120, "mm"), f("d2", "Pulley 2 diameter", 300, "mm"), f("c", "Centre distance", 600, "mm")],
    compute: (v) => {
      const d1 = num(v.d1);
      const d2 = num(v.d2);
      const c = num(v.c);
      const l = 2 * c + (Math.PI / 2) * (d1 + d2) + ((d2 - d1) ** 2) / (4 * c);
      return { result: `${fmt(l, 1)} mm`, detail: `${fmt(l / 25.4, 2)} inches` };
    },
  },
  {
    slug: "rpm-to-speed-calculator",
    name: "RPM to Linear Speed Calculator",
    category: "engineering",
    description: "Surface speed from rotational speed and diameter.",
    fields: [f("rpm", "Rotational speed", 1500, "rpm"), f("d", "Diameter", 200, "mm")],
    compute: (v) => {
      const mps = (Math.PI * (num(v.d) / 1000) * num(v.rpm)) / 60;
      return { result: `${fmt(mps, 3)} m/s`, detail: `${fmt(mps * 3.6, 2)} km/h` };
    },
  },
  {
    slug: "pipe-flow-rate-calculator",
    name: "Pipe Flow Rate Calculator",
    category: "engineering",
    description: "Volumetric flow from pipe size and velocity.",
    fields: [f("d", "Inner diameter", 100, "mm"), f("velocity", "Flow velocity", 2, "m/s")],
    compute: (v) => {
      const a = Math.PI * Math.pow(num(v.d) / 2000, 2);
      const q = a * num(v.velocity);
      return { result: `${fmt(q * 1000, 3)} L/s`, detail: `${fmt(q * 3600, 3)} m³/h` };
    },
  },
  {
    slug: "concrete-volume-calculator",
    name: "Concrete Volume Calculator",
    category: "engineering",
    description: "Concrete needed for a slab, with a waste allowance.",
    fields: [f("length", "Length", 6, "m"), f("width", "Width", 4, "m"), f("depth", "Thickness", 0.15, "m"), f("waste", "Waste allowance", 8, "%")],
    compute: (v) => {
      const vol = num(v.length) * num(v.width) * num(v.depth) * (1 + num(v.waste) / 100);
      return { result: `${fmt(vol, 3)} m³`, detail: `≈ ${fmt(vol * 2.4, 2)} tonnes of concrete` };
    },
  },
  {
    slug: "paint-coverage-calculator",
    name: "Paint Coverage Calculator",
    category: "engineering",
    description: "Litres of paint needed for a room.",
    fields: [f("area", "Wall area", 60, "m²"), f("coats", "Coats", 2), f("coverage", "Coverage per litre", 11, "m²")],
    compute: (v) => {
      const litres = (num(v.area) * num(v.coats)) / Math.max(num(v.coverage), 1e-9);
      return { result: `${fmt(litres, 2)} litres`, detail: `Buy ${Math.ceil(litres / 5)} × 5 L tins` };
    },
  },
  {
    slug: "steel-weight-calculator",
    name: "Steel Weight Calculator",
    category: "engineering",
    description: "Weight of a round steel bar.",
    fields: [f("d", "Diameter", 16, "mm"), f("length", "Length", 12, "m"), f("qty", "Quantity", 10)],
    compute: (v) => {
      const perM = (num(v.d) ** 2) / 162.28;
      const total = perM * num(v.length) * num(v.qty);
      return { result: `${fmt(total, 2)} kg`, detail: `${fmt(perM, 3)} kg per metre` };
    },
  },
  {
    slug: "spring-constant-calculator",
    name: "Spring Constant Calculator",
    category: "engineering",
    description: "Hooke's law stiffness from force and extension.",
    formula: "k = F / x",
    fields: [f("force", "Force", 50, "N"), f("x", "Extension", 0.08, "m")],
    compute: (v) => {
      const k = num(v.force) / Math.max(num(v.x), 1e-9);
      return { result: `${fmt(k, 2)} N/m`, detail: `Stored energy ${fmt(0.5 * k * num(v.x) ** 2, 4)} J` };
    },
  },
];

/* ------------------------------------------------------------------ */
/* Physics                                                             */
/* ------------------------------------------------------------------ */

const physics: Calculator[] = [
  {
    slug: "free-fall-calculator",
    name: "Free Fall Calculator",
    category: "physics",
    description: "Fall time and impact speed from a height.",
    fields: [f("h", "Height", 45, "m"), f("g", "Gravity", 9.81, "m/s²")],
    compute: (v) => {
      const t = Math.sqrt((2 * num(v.h)) / Math.max(num(v.g), 1e-9));
      return { result: `${fmt(t, 3)} s`, detail: `Impact speed ${fmt(t * num(v.g), 2)} m/s` };
    },
  },
  {
    slug: "pendulum-period-calculator",
    name: "Pendulum Period Calculator",
    category: "physics",
    description: "Swing period of a simple pendulum.",
    formula: "T = 2π√(L/g)",
    fields: [f("l", "Length", 1, "m"), f("g", "Gravity", 9.81, "m/s²")],
    compute: (v) => {
      const t = 2 * Math.PI * Math.sqrt(num(v.l) / Math.max(num(v.g), 1e-9));
      return { result: `${fmt(t, 4)} s`, detail: `Frequency ${fmt(1 / t, 4)} Hz` };
    },
  },
  {
    slug: "density-calculator",
    name: "Density Calculator",
    category: "physics",
    description: "Density from mass and volume.",
    formula: "ρ = m / V",
    fields: [f("mass", "Mass", 250, "g"), f("volume", "Volume", 100, "cm³")],
    compute: (v) => {
      const d = num(v.mass) / Math.max(num(v.volume), 1e-9);
      return { result: `${fmt(d, 4)} g/cm³`, detail: `${fmt(d * 1000, 2)} kg/m³` };
    },
  },
  {
    slug: "pressure-at-depth-calculator",
    name: "Pressure at Depth Calculator",
    category: "physics",
    description: "Hydrostatic pressure below a fluid surface.",
    fields: [f("depth", "Depth", 20, "m"), f("density", "Fluid density", 1000, "kg/m³")],
    compute: (v) => {
      const p = num(v.density) * 9.81 * num(v.depth);
      return { result: `${fmt(p / 1000, 2)} kPa`, detail: `Absolute ${fmt((p + 101325) / 1000, 2)} kPa · ${fmt(p / 101325, 3)} atm gauge` };
    },
  },
  {
    slug: "work-done-calculator",
    name: "Work Done Calculator",
    category: "physics",
    description: "Mechanical work from force, distance and angle.",
    formula: "W = F·d·cos θ",
    fields: [f("force", "Force", 120, "N"), f("distance", "Distance", 5, "m"), f("angle", "Angle", 0, "°")],
    compute: (v) => {
      const w = num(v.force) * num(v.distance) * Math.cos((num(v.angle) * Math.PI) / 180);
      return { result: `${fmt(w, 3)} J`, detail: `${fmt(w / 3600000, 8)} kWh` };
    },
  },
  {
    slug: "centripetal-force-calculator",
    name: "Centripetal Force Calculator",
    category: "physics",
    description: "Force keeping an object in circular motion.",
    formula: "F = mv²/r",
    fields: [f("m", "Mass", 1200, "kg"), f("v", "Speed", 15, "m/s"), f("r", "Radius", 50, "m")],
    compute: (v) => ({
      result: `${fmt((num(v.m) * num(v.v) ** 2) / Math.max(num(v.r), 1e-9), 2)} N`,
      detail: `Acceleration ${fmt(num(v.v) ** 2 / Math.max(num(v.r), 1e-9), 3)} m/s²`,
    }),
  },
  {
    slug: "escape-velocity-calculator",
    name: "Escape Velocity Calculator",
    category: "physics",
    description: "Speed needed to escape a body's gravity.",
    fields: [f("mass", "Mass of body", 5.972e24, "kg"), f("radius", "Radius", 6371000, "m")],
    compute: (v) => {
      const ve = Math.sqrt((2 * 6.674e-11 * num(v.mass)) / Math.max(num(v.radius), 1e-9));
      return { result: `${fmt(ve, 1)} m/s`, detail: `${fmt(ve / 1000, 3)} km/s` };
    },
  },
  {
    slug: "half-life-calculator",
    name: "Half-Life Calculator",
    category: "physics",
    description: "Remaining quantity after radioactive decay.",
    fields: [f("initial", "Initial amount", 100), f("halflife", "Half-life", 5730, "years"), f("time", "Elapsed time", 11460, "years")],
    compute: (v) => {
      const n = num(v.initial) * Math.pow(0.5, num(v.time) / Math.max(num(v.halflife), 1e-9));
      return { result: fmt(n, 4), detail: `${fmt((n / Math.max(num(v.initial), 1e-9)) * 100, 3)}% remaining` };
    },
  },
];

/* ------------------------------------------------------------------ */
/* Chemistry                                                           */
/* ------------------------------------------------------------------ */

const chemistry: Calculator[] = [
  {
    slug: "molarity-calculator",
    name: "Molarity Calculator",
    category: "chemistry",
    description: "Concentration from moles and solution volume.",
    formula: "M = n / V",
    fields: [f("moles", "Moles of solute", 0.5, "mol"), f("volume", "Solution volume", 2, "L")],
    compute: (v) => ({
      result: `${fmt(num(v.moles) / Math.max(num(v.volume), 1e-9), 4)} mol/L`,
      detail: "Molar concentration",
    }),
  },
  {
    slug: "molality-calculator",
    name: "Molality Calculator",
    category: "chemistry",
    description: "Moles of solute per kilogram of solvent.",
    fields: [f("moles", "Moles of solute", 0.4, "mol"), f("mass", "Solvent mass", 0.75, "kg")],
    compute: (v) => ({ result: `${fmt(num(v.moles) / Math.max(num(v.mass), 1e-9), 4)} mol/kg` }),
  },
  {
    slug: "percent-yield-calculator",
    name: "Percent Yield Calculator",
    category: "chemistry",
    description: "Reaction efficiency from actual vs theoretical yield.",
    fields: [f("actual", "Actual yield", 7.4, "g"), f("theoretical", "Theoretical yield", 9.1, "g")],
    compute: (v) => ({
      result: `${fmt((num(v.actual) / Math.max(num(v.theoretical), 1e-9)) * 100, 2)}%`,
      detail: `Lost ${fmt(num(v.theoretical) - num(v.actual), 3)} g`,
    }),
  },
  {
    slug: "henderson-hasselbalch-calculator",
    name: "Henderson-Hasselbalch Calculator",
    category: "chemistry",
    description: "Buffer pH from pKa and the base/acid ratio.",
    formula: "pH = pKa + log([A⁻]/[HA])",
    fields: [f("pka", "pKa", 4.76), f("base", "[Base]", 0.1, "M"), f("acid", "[Acid]", 0.1, "M")],
    compute: (v) => ({
      result: `pH ${fmt(num(v.pka) + Math.log10(num(v.base) / Math.max(num(v.acid), 1e-9)), 3)}`,
    }),
  },
  {
    slug: "avogadro-particles-calculator",
    name: "Avogadro Particles Calculator",
    category: "chemistry",
    description: "Particles in a given number of moles.",
    fields: [f("moles", "Moles", 2, "mol")],
    compute: (v) => ({
      result: `${(num(v.moles) * 6.02214076e23).toExponential(4)} particles`,
      detail: "Using Avogadro's number 6.022×10²³",
    }),
  },
  {
    slug: "boiling-point-elevation-calculator",
    name: "Boiling Point Elevation Calculator",
    category: "chemistry",
    description: "How solutes raise a solvent's boiling point.",
    formula: "ΔTb = i·Kb·m",
    fields: [f("i", "Van 't Hoff factor", 2), f("kb", "Kb", 0.512, "°C·kg/mol"), f("m", "Molality", 0.5, "mol/kg")],
    compute: (v) => {
      const dt = num(v.i) * num(v.kb) * num(v.m);
      return { result: `+${fmt(dt, 3)} °C`, detail: `Water would boil at ${fmt(100 + dt, 3)} °C` };
    },
  },
];

/* ------------------------------------------------------------------ */
/* Time & Date                                                         */
/* ------------------------------------------------------------------ */

const timeDate: Calculator[] = [
  {
    slug: "days-until-date-calculator",
    name: "Days Until Date Calculator",
    category: "time-date",
    description: "Countdown in days from today to any date.",
    fields: [dt("target", "Target date", "2026-12-25")],
    compute: (v) => {
      const today = new Date().toISOString().slice(0, 10);
      const d = days(today, String(v.target ?? today));
      return { result: `${d} days`, detail: `${(d / 7).toFixed(1)} weeks · ${(d / 30.44).toFixed(1)} months` };
    },
  },
  {
    slug: "add-days-calculator",
    name: "Add Days Calculator",
    category: "time-date",
    description: "Add or subtract days from a date.",
    fields: [dt("start", "Start date", "2026-01-01"), f("days", "Days to add", 90)],
    compute: (v) => {
      const d = new Date(String(v.start ?? ""));
      d.setDate(d.getDate() + Math.round(num(v.days)));
      return { result: d.toDateString(), detail: d.toISOString().slice(0, 10) };
    },
  },
  {
    slug: "week-number-calculator",
    name: "Week Number Calculator",
    category: "time-date",
    description: "ISO week number for any date.",
    fields: [dt("date", "Date", "2026-08-02")],
    compute: (v) => {
      const d = new Date(String(v.date ?? ""));
      const target = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      const dayNum = (target.getUTCDay() + 6) % 7;
      target.setUTCDate(target.getUTCDate() - dayNum + 3);
      const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
      const week = 1 + Math.round((target.getTime() - firstThursday.getTime()) / 604800000);
      return { result: `Week ${week}`, detail: target.getUTCFullYear().toString() };
    },
  },
  {
    slug: "time-duration-calculator",
    name: "Time Duration Calculator",
    category: "time-date",
    description: "Hours and minutes between two times.",
    fields: [txt("start", "Start (HH:MM)", "09:15"), txt("end", "End (HH:MM)", "17:45")],
    compute: (v) => {
      const toMin = (s: string) => {
        const [h, m] = s.split(":").map((x) => parseInt(x, 10) || 0);
        return (h ?? 0) * 60 + (m ?? 0);
      };
      let mins = toMin(String(v.end ?? "")) - toMin(String(v.start ?? ""));
      if (mins < 0) mins += 1440;
      return { result: `${Math.floor(mins / 60)}h ${mins % 60}m`, detail: `${mins} minutes total` };
    },
  },
  {
    slug: "hours-worked-calculator",
    name: "Hours Worked Calculator",
    category: "time-date",
    description: "Daily worked hours minus break time, plus pay.",
    fields: [txt("in", "Clock in", "08:30"), txt("out", "Clock out", "17:00"), f("break", "Break", 45, "min"), f("rate", "Hourly rate", 25)],
    compute: (v) => {
      const toMin = (s: string) => {
        const [h, m] = s.split(":").map((x) => parseInt(x, 10) || 0);
        return (h ?? 0) * 60 + (m ?? 0);
      };
      const mins = Math.max(toMin(String(v.out ?? "")) - toMin(String(v.in ?? "")) - num(v.break), 0);
      const hours = mins / 60;
      return { result: `${fmt(hours, 2)} hours`, detail: `Pay ${fmt(hours * num(v.rate))}` };
    },
  },
  {
    slug: "unix-timestamp-converter",
    name: "Unix Timestamp Converter",
    category: "time-date",
    description: "Convert a Unix timestamp into a readable date.",
    fields: [f("ts", "Unix timestamp (seconds)", 1785000000)],
    compute: (v) => {
      const d = new Date(num(v.ts) * 1000);
      return { result: d.toUTCString(), detail: d.toISOString() };
    },
  },
  {
    slug: "birthday-countdown-calculator",
    name: "Birthday Countdown Calculator",
    category: "time-date",
    description: "Days left until your next birthday.",
    fields: [dt("dob", "Date of birth", "1995-04-18")],
    compute: (v) => {
      const dob = new Date(String(v.dob ?? ""));
      const now = new Date();
      const next = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
      if (next < now) next.setFullYear(next.getFullYear() + 1);
      const d = Math.ceil((next.getTime() - now.getTime()) / 86400000);
      return { result: `${d} days`, detail: `Turning ${next.getFullYear() - dob.getFullYear()} on ${next.toDateString()}` };
    },
  },
  {
    slug: "meeting-cost-calculator",
    name: "Meeting Cost Calculator",
    category: "time-date",
    description: "What a meeting costs in salaried time.",
    fields: [f("people", "Attendees", 6), f("minutes", "Duration", 60, "min"), f("rate", "Average hourly rate", 55)],
    compute: (v) => {
      const cost = num(v.people) * (num(v.minutes) / 60) * num(v.rate);
      return { result: fmt(cost), detail: `${fmt(cost * 52)} per year if held weekly` };
    },
  },
];

/* ------------------------------------------------------------------ */
/* Unit converters                                                     */
/* ------------------------------------------------------------------ */

const makeConverter = (
  slug: string,
  name: string,
  units: Record<string, number>,
  defFrom: string,
  defTo: string,
  description: string,
): Calculator => {
  const keys = Object.keys(units);
  return {
    slug,
    name,
    category: "unit-converters",
    description,
    fields: [f("value", "Value", 1), sel("from", "From", keys, defFrom), sel("to", "To", keys, defTo)],
    compute: (v) => {
      const from = units[String(v.from)] ?? 1;
      const to = units[String(v.to)] ?? 1;
      const out = (num(v.value) * from) / to;
      return {
        result: `${fmt(out, 6)} ${v.to}`,
        steps: [`${fmt(num(v.value), 6)} ${v.from} → base = ${fmt(num(v.value) * from, 6)}`, `Base → ${v.to} = ${fmt(out, 6)}`],
      };
    },
  };
};

const converters: Calculator[] = [
  makeConverter(
    "time-converter",
    "Time Converter",
    { Second: 1, Minute: 60, Hour: 3600, Day: 86400, Week: 604800, Month: 2629800, Year: 31557600 },
    "Hour",
    "Minute",
    "Convert between seconds, minutes, hours, days and years.",
  ),
  makeConverter(
    "angle-converter",
    "Angle Converter",
    { Degree: 1, Radian: 57.2957795, Gradian: 0.9, Turn: 360, Arcminute: 1 / 60 },
    "Degree",
    "Radian",
    "Convert degrees, radians, gradians and turns.",
  ),
  makeConverter(
    "force-converter",
    "Force Converter",
    { Newton: 1, Kilonewton: 1000, "Pound-force": 4.44822, "Kilogram-force": 9.80665, Dyne: 1e-5 },
    "Newton",
    "Pound-force",
    "Convert newtons, pound-force and kilogram-force.",
  ),
  makeConverter(
    "power-converter",
    "Power Converter",
    { Watt: 1, Kilowatt: 1000, Megawatt: 1e6, Horsepower: 745.7, "BTU/hour": 0.293071 },
    "Kilowatt",
    "Horsepower",
    "Convert watts, kilowatts, horsepower and BTU/h.",
  ),
  makeConverter(
    "frequency-converter",
    "Frequency Converter",
    { Hertz: 1, Kilohertz: 1000, Megahertz: 1e6, Gigahertz: 1e9, RPM: 1 / 60 },
    "Megahertz",
    "Kilohertz",
    "Convert hertz, kilohertz, megahertz and RPM.",
  ),
  makeConverter(
    "torque-converter",
    "Torque Converter",
    { "Newton-metre": 1, "Kilonewton-metre": 1000, "Pound-foot": 1.35582, "Pound-inch": 0.112985, "Kilogram-metre": 9.80665 },
    "Newton-metre",
    "Pound-foot",
    "Convert Nm, lb-ft and kgf-m torque values.",
  ),
  makeConverter(
    "flow-rate-converter",
    "Flow Rate Converter",
    { "Litre/second": 1, "Litre/minute": 1 / 60, "Cubic metre/hour": 1 / 3.6, "Gallon/minute (US)": 0.0630902, "Cubic foot/minute": 0.471947 },
    "Litre/second",
    "Cubic metre/hour",
    "Convert L/s, m³/h, GPM and CFM.",
  ),
  makeConverter(
    "density-converter",
    "Density Converter",
    { "Kilogram/m³": 1, "Gram/cm³": 1000, "Pound/ft³": 16.0185, "Pound/gallon (US)": 119.826 },
    "Gram/cm³",
    "Kilogram/m³",
    "Convert between common density units.",
  ),
];

/* ------------------------------------------------------------------ */
/* Everyday life                                                       */
/* ------------------------------------------------------------------ */

const everyday: Calculator[] = [
  {
    slug: "tile-calculator",
    name: "Tile Calculator",
    category: "everyday-life",
    description: "Tiles needed for a floor or wall, with wastage.",
    fields: [f("area", "Area to cover", 20, "m²"), f("tile", "Tile size", 0.36, "m²"), f("waste", "Wastage", 10, "%")],
    compute: (v) => {
      const tiles = (num(v.area) / Math.max(num(v.tile), 1e-9)) * (1 + num(v.waste) / 100);
      return { result: `${Math.ceil(tiles)} tiles`, detail: `Includes ${fmt(num(v.waste), 0)}% wastage` };
    },
  },
  {
    slug: "wallpaper-calculator",
    name: "Wallpaper Calculator",
    category: "everyday-life",
    description: "Rolls of wallpaper needed for a room.",
    fields: [f("perimeter", "Room perimeter", 18, "m"), f("height", "Wall height", 2.5, "m"), f("roll", "Roll coverage", 5, "m²")],
    compute: (v) => {
      const rolls = (num(v.perimeter) * num(v.height)) / Math.max(num(v.roll), 1e-9);
      return { result: `${Math.ceil(rolls * 1.1)} rolls`, detail: `Wall area ${fmt(num(v.perimeter) * num(v.height), 2)} m² (incl. 10% extra)` };
    },
  },
  {
    slug: "pizza-value-calculator",
    name: "Pizza Value Calculator",
    category: "everyday-life",
    description: "Which pizza size is actually better value.",
    fields: [f("d1", "Pizza 1 diameter", 12, "in"), f("p1", "Pizza 1 price", 14), f("d2", "Pizza 2 diameter", 16, "in"), f("p2", "Pizza 2 price", 20)],
    compute: (v) => {
      const a1 = Math.PI * (num(v.d1) / 2) ** 2;
      const a2 = Math.PI * (num(v.d2) / 2) ** 2;
      const c1 = num(v.p1) / a1;
      const c2 = num(v.p2) / a2;
      return {
        result: c1 < c2 ? "Pizza 1 wins" : "Pizza 2 wins",
        detail: `${fmt(c1, 4)} vs ${fmt(c2, 4)} per square inch`,
        chart: [
          { name: "Pizza 1", value: Math.round(a1) },
          { name: "Pizza 2", value: Math.round(a2) },
        ],
      };
    },
  },
  {
    slug: "coffee-ratio-calculator",
    name: "Coffee Ratio Calculator",
    category: "everyday-life",
    description: "Coffee grounds and water for a perfect brew.",
    fields: [f("water", "Water", 500, "g"), f("ratio", "Water : coffee ratio", 16)],
    compute: (v) => {
      const coffee = num(v.water) / Math.max(num(v.ratio), 1e-9);
      return { result: `${fmt(coffee, 1)} g coffee`, detail: `${fmt(coffee / 7, 1)} tablespoons approx.` };
    },
  },
  {
    slug: "unit-price-calculator",
    name: "Unit Price Calculator",
    category: "everyday-life",
    description: "Compare grocery deals by price per unit.",
    fields: [f("price1", "Item 1 price", 4.5), f("size1", "Item 1 size", 500), f("price2", "Item 2 price", 7.2), f("size2", "Item 2 size", 900)],
    compute: (v) => {
      const u1 = num(v.price1) / Math.max(num(v.size1), 1e-9);
      const u2 = num(v.price2) / Math.max(num(v.size2), 1e-9);
      return { result: u1 < u2 ? "Item 1 is cheaper" : "Item 2 is cheaper", detail: `${fmt(u1, 5)} vs ${fmt(u2, 5)} per unit` };
    },
  },
  {
    slug: "gift-budget-calculator",
    name: "Gift Budget Calculator",
    category: "everyday-life",
    description: "Split a gift budget across a list of people.",
    fields: [f("budget", "Total budget", 600), f("people", "People", 8), f("reserve", "Reserve for wrapping", 40)],
    compute: (v) => {
      const each = (num(v.budget) - num(v.reserve)) / Math.max(num(v.people), 1);
      return { result: `${fmt(each)} per person`, detail: `Reserve kept aside: ${fmt(num(v.reserve))}` };
    },
  },
  {
    slug: "pet-food-calculator",
    name: "Pet Food Calculator",
    category: "everyday-life",
    description: "Daily food portion and how long a bag lasts.",
    fields: [f("weight", "Pet weight", 18, "kg"), f("percent", "Daily feed", 2.5, "% of body weight"), f("bag", "Bag size", 12, "kg")],
    compute: (v) => {
      const daily = (num(v.weight) * num(v.percent)) / 100;
      return { result: `${fmt(daily * 1000, 0)} g / day`, detail: `A ${fmt(num(v.bag), 1)} kg bag lasts ${fmt(num(v.bag) / Math.max(daily, 1e-9), 0)} days` };
    },
  },
  {
    slug: "walking-calories-calculator",
    name: "Walking Calories Calculator",
    category: "everyday-life",
    description: "Calories burned on a walk.",
    fields: [f("weight", "Weight", 72, "kg"), f("minutes", "Duration", 45, "min"), sel("pace", "Pace", ["Slow", "Brisk", "Fast", "Uphill"], "Brisk")],
    compute: (v) => {
      const met: Record<string, number> = { Slow: 2.8, Brisk: 4.3, Fast: 5.0, Uphill: 6.5 };
      const kcal = ((met[String(v.pace)] ?? 4.3) * 3.5 * num(v.weight)) / 200 * num(v.minutes);
      return { result: `${fmt(kcal, 0)} kcal`, detail: `≈ ${fmt(kcal / 7700, 3)} kg of fat equivalent` };
    },
  },
  {
    slug: "screen-time-calculator",
    name: "Screen Time Calculator",
    category: "everyday-life",
    description: "How much of your life goes to screens.",
    fields: [f("hours", "Hours per day", 4.5)],
    compute: (v) => {
      const perYear = num(v.hours) * 365;
      return { result: `${fmt(perYear, 0)} hours / year`, detail: `${fmt(perYear / 24, 1)} full days · ${fmt((perYear * 10) / 8760, 2)} years per decade` };
    },
  },
  {
    slug: "flight-carbon-calculator",
    name: "Flight Carbon Calculator",
    category: "everyday-life",
    description: "Estimated CO₂ emissions from a flight.",
    fields: [f("distance", "Distance", 1200, "km"), f("passengers", "Passengers in party", 2), sel("class", "Cabin", ["Economy", "Premium", "Business"], "Economy")],
    compute: (v) => {
      const factor: Record<string, number> = { Economy: 0.09, Premium: 0.14, Business: 0.26 };
      const kg = num(v.distance) * (factor[String(v.class)] ?? 0.09) * num(v.passengers);
      return { result: `${fmt(kg, 1)} kg CO₂`, detail: `≈ ${fmt(kg / 21, 1)} trees needed for a year to offset` };
    },
  },
];

/* ------------------------------------------------------------------ */
/* Programming                                                         */
/* ------------------------------------------------------------------ */

const programming: Calculator[] = [
  {
    slug: "hex-rgb-converter",
    name: "Hex to RGB Converter",
    category: "programming",
    description: "Convert a hex colour into RGB and HSL.",
    fields: [txt("hex", "Hex colour", "#4f46e5")],
    compute: (v) => {
      const hex = String(v.hex ?? "").replace("#", "").padEnd(6, "0").slice(0, 6);
      const r = parseInt(hex.slice(0, 2), 16) || 0;
      const g = parseInt(hex.slice(2, 4), 16) || 0;
      const b = parseInt(hex.slice(4, 6), 16) || 0;
      const [rr, gg, bb] = [r / 255, g / 255, b / 255];
      const max = Math.max(rr, gg, bb);
      const min = Math.min(rr, gg, bb);
      const l = (max + min) / 2;
      const d = max - min;
      const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
      let h = 0;
      if (d !== 0) {
        if (max === rr) h = ((gg - bb) / d) % 6;
        else if (max === gg) h = (bb - rr) / d + 2;
        else h = (rr - gg) / d + 4;
      }
      h = Math.round(h * 60);
      if (h < 0) h += 360;
      return { result: `rgb(${r}, ${g}, ${b})`, detail: `hsl(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)` };
    },
  },
  {
    slug: "text-case-converter",
    name: "Text Case Converter",
    category: "programming",
    description: "Convert text between common naming cases.",
    fields: [txt("text", "Text", "CalculatorHub is fast"), sel("mode", "Case", ["UPPER", "lower", "Title", "camelCase", "snake_case", "kebab-case"], "kebab-case")],
    compute: (v) => {
      const s = String(v.text ?? "");
      const words = s.trim().split(/[\s_-]+/).filter(Boolean);
      let out = s;
      if (v.mode === "UPPER") out = s.toUpperCase();
      else if (v.mode === "lower") out = s.toLowerCase();
      else if (v.mode === "Title") out = words.map((w) => w[0]!.toUpperCase() + w.slice(1).toLowerCase()).join(" ");
      else if (v.mode === "camelCase")
        out = words.map((w, i) => (i ? w[0]!.toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase())).join("");
      else if (v.mode === "snake_case") out = words.map((w) => w.toLowerCase()).join("_");
      else out = words.map((w) => w.toLowerCase()).join("-");
      return { result: out };
    },
  },
  {
    slug: "slug-generator",
    name: "URL Slug Generator",
    category: "programming",
    description: "Turn any title into a clean URL slug.",
    fields: [txt("title", "Title", "10 Best Calculators for Students!")],
    compute: (v) => {
      const slug = String(v.title ?? "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      return { result: slug || "empty", detail: `${slug.length} characters` };
    },
  },
  {
    slug: "url-encoder-decoder",
    name: "URL Encoder / Decoder",
    category: "programming",
    description: "Percent-encode or decode a URL string.",
    fields: [txt("text", "Text", "search?q=calculator hub"), sel("mode", "Mode", ["Encode", "Decode"], "Encode")],
    compute: (v) => {
      const s = String(v.text ?? "");
      try {
        return { result: v.mode === "Encode" ? encodeURIComponent(s) : decodeURIComponent(s) };
      } catch {
        return { result: "Invalid input for this mode" };
      }
    },
  },
  {
    slug: "random-number-generator",
    name: "Random Number Generator",
    category: "programming",
    description: "Generate random numbers in a range.",
    fields: [f("min", "Minimum", 1), f("max", "Maximum", 100), f("count", "How many", 5)],
    compute: (v) => {
      const min = Math.ceil(num(v.min));
      const max = Math.floor(num(v.max, 100));
      const count = Math.min(Math.max(Math.round(num(v.count, 1)), 1), 50);
      const out = Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
      return { result: out.join(", "), detail: `Range ${min}–${max}` };
    },
  },
  {
    slug: "subnet-mask-calculator",
    name: "Subnet Mask Calculator",
    category: "programming",
    description: "Mask, host count and wildcard from a CIDR prefix.",
    fields: [f("cidr", "CIDR prefix", 24)],
    compute: (v) => {
      const bits = Math.min(Math.max(Math.round(num(v.cidr, 24)), 0), 32);
      const maskNum = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
      const toDotted = (n: number) => [24, 16, 8, 0].map((s) => (n >>> s) & 255).join(".");
      const hosts = bits >= 31 ? 0 : Math.pow(2, 32 - bits) - 2;
      return {
        result: `${toDotted(maskNum)} /${bits}`,
        detail: `Usable hosts ${fmt(hosts, 0)} · Wildcard ${toDotted(~maskNum >>> 0)}`,
      };
    },
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    category: "programming",
    description: "Placeholder text for mockups and layouts.",
    fields: [f("words", "Words", 40)],
    compute: (v) => {
      const bank = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat".split(" ");
      const n = Math.min(Math.max(Math.round(num(v.words, 40)), 1), 300);
      const out = Array.from({ length: n }, (_, i) => bank[i % bank.length]).join(" ");
      return { result: `${n} words generated`, detail: out.charAt(0).toUpperCase() + out.slice(1) + "." };
    },
  },
  {
    slug: "file-transfer-time-calculator",
    name: "File Transfer Time Calculator",
    category: "programming",
    description: "How long a download or upload will take.",
    fields: [f("size", "File size", 4.7, "GB"), f("speed", "Connection speed", 100, "Mbps")],
    compute: (v) => {
      const seconds = (num(v.size) * 8 * 1024) / Math.max(num(v.speed), 1e-9);
      return { result: `${fmt(seconds / 60, 2)} minutes`, detail: `${fmt(seconds, 0)} seconds at ${fmt(num(v.speed), 0)} Mbps` };
    },
  },
];

export const extraCalculators: Calculator[] = [
  ...finance,
  ...health,
  ...education,
  ...mathematics,
  ...engineering,
  ...physics,
  ...chemistry,
  ...timeDate,
  ...converters,
  ...everyday,
  ...programming,
];
