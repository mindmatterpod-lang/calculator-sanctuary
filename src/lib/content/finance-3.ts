import type { ContentMap } from "./types";

/* Batch 2b — Finance: pricing, payroll, tax and borrowing-capacity tools. */

export const finance3Content: ContentMap = {
  "break-even-calculator": {
    intro:
      "Break-even is the point where a business stops losing money on a product line. This calculator finds the unit volume and revenue you need before profit begins, using fixed costs, price and variable cost per unit — the three numbers that decide whether a price is viable at all.",
    method: [
      "Contribution margin per unit = price − variable cost. This is what each sale contributes towards fixed costs.",
      "Break-even units = fixed costs ÷ contribution margin. Break-even revenue = break-even units × price.",
      "To hit a profit target, add it to fixed costs: units = (fixed costs + target profit) ÷ contribution margin.",
    ],
    example: {
      title: "Worked example: a product with 40,000 of fixed costs",
      lines: [
        "Price: 250. Variable cost per unit: 150. Contribution margin: 100.",
        "Break-even units = 40,000 ÷ 100 = 400 units.",
        "Break-even revenue = 400 × 250 = 100,000.",
        "For 20,000 of profit: (40,000 + 20,000) ÷ 100 = 600 units.",
        "Cut the price to 220 and margin falls to 70, pushing break-even to 572 units — a 12% price cut needs 43% more volume.",
      ],
    },
    mistakes: [
      { title: "Misclassifying costs", body: "Rent, salaries and software are fixed; materials, shipping and payment fees are variable. Putting a variable cost in the fixed bucket makes break-even look reachable at any price." },
      { title: "Forgetting payment processing and returns", body: "Card fees of 2–3% and a return rate of a few percent both cut the contribution margin and should be modelled as variable costs." },
      { title: "Treating your own salary as optional", body: "If the business must pay you, your pay is a fixed cost. Break-even that excludes the founder's wage is not break-even." },
    ],
    faqs: [
      { q: "What is contribution margin?", a: "Price minus variable cost per unit — the amount each sale contributes to covering fixed costs and then to profit." },
      { q: "How do I find break-even for a service business?", a: "Use billable hours as the unit: fixed costs divided by (hourly rate minus per-hour delivery cost)." },
      { q: "What happens to break-even when I raise prices?", a: "It falls sharply, because margin rises faster than price in percentage terms. A 10% price rise on a 40% margin lifts margin by 25%." },
      { q: "Does break-even account for tax?", a: "No — it is a pre-tax operating measure. Add tax when you are modelling a net profit target." },
      { q: "What is the margin of safety?", a: "The gap between current sales and break-even sales, expressed as a percentage. It tells you how far revenue can fall before losses start." },
    ],
    related: ["profit-calculator", "markup-calculator", "npv-calculator", "roi-calculator", "commission-calculator"],
    post: {
      slug: "price-cut-volume-trap",
      title: "The price-cut trap: why a 10% discount needs 50% more sales",
      excerpt: "Discounting feels like a growth lever. On thin margins it is a volume treadmill you cannot run fast enough.",
      readTime: "5 min",
      body: [
        "A 10% price cut sounds like it needs roughly 10% more volume to compensate. That intuition is wrong, and how wrong depends entirely on your margin.",
        "Take a product priced at 100 with a variable cost of 70. Contribution margin is 30. Cut the price to 90 and the margin becomes 20 — a third of the profit per sale is gone. To generate the same total contribution you now need 30 ÷ 20 = 1.5 times the units. A 10% discount requires 50% more sales.",
        "On a fatter 60% margin the same 10% cut only requires 20% more volume. On a thin 15% margin it requires two-thirds more. The thinner your margin, the more violent the arithmetic — which is exactly backwards from how discounting is usually deployed, since thin-margin businesses discount most.",
        "The mirror image is the good news. A 10% price rise on that 30-margin product lifts margin to 40, so you can lose a quarter of your customers and still make the same money. Price increases are the highest-leverage change available to most small businesses, and the least attempted.",
        "Before running a promotion, calculate the break-even volume lift it demands and ask honestly whether the channel can deliver it. If a discount needs 50% more units and your best month ever was 15% above average, the promotion is a planned loss.",
        "Where discounting does work is when it moves fixed costs you are paying anyway — filling empty capacity, clearing inventory with holding costs, or acquiring customers with genuine repeat value. In those cases model the lifetime contribution, not the single transaction.",
      ],
      guides: ["roi-what-it-hides"],
    },
  },

  "markup-calculator": {
    intro:
      "Markup and margin are different numbers computed from the same two figures, and confusing them is one of the most expensive mistakes in retail and services. This calculator gives you selling price, markup percentage and gross margin together so you can price deliberately.",
    method: [
      "Markup % = (price − cost) ÷ cost × 100. It measures profit against what you paid.",
      "Margin % = (price − cost) ÷ price × 100. It measures profit against what you charged, and is always the smaller number.",
      "To price from a target margin: price = cost ÷ (1 − margin). A 40% margin on a 60 cost means 60 ÷ 0.6 = 100, not 60 × 1.4 = 84.",
    ],
    example: {
      title: "Worked example: cost 60, sold at 100",
      lines: [
        "Profit: 40.",
        "Markup = 40 ÷ 60 = 66.7%.",
        "Margin = 40 ÷ 100 = 40%.",
        "Pricing with a 40% markup instead would give 60 × 1.4 = 84, a margin of only 28.6%.",
        "On 500 units that mistake costs 8,000 of gross profit.",
      ],
    },
    mistakes: [
      { title: "Applying a target margin as a markup multiplier", body: "The single most common pricing error. Divide by (1 − margin) instead of multiplying by (1 + margin), or you will systematically underprice." },
      { title: "Marking up on incomplete cost", body: "Landed cost includes freight, duty, packaging and payment fees. Marking up on the invoice price alone erodes the margin you thought you set." },
      { title: "Using one markup across all lines", body: "Slow-moving or high-service items carry more overhead per unit and need a higher markup than fast, self-service ones." },
    ],
    faqs: [
      { q: "What is the difference between markup and margin?", a: "Markup is profit as a percentage of cost; margin is profit as a percentage of price. A 100% markup is a 50% margin." },
      { q: "How do I convert markup to margin?", a: "Margin = markup ÷ (1 + markup). A 66.7% markup is a 40% margin." },
      { q: "What markup is standard in retail?", a: "Keystone pricing doubles cost, a 100% markup and 50% margin. Grocery runs far thinner, apparel often higher." },
      { q: "Should tax be included in the calculation?", a: "No. Price your goods ex-tax and add sales tax or GST on top, or your margin will be computed on money that belongs to the tax authority." },
      { q: "How do discounts affect margin?", a: "Directly and steeply. A 20% discount on a 40% margin item leaves a 25% margin, cutting profit per unit by nearly 40%." },
    ],
    related: ["profit-calculator", "discount-calculator", "break-even-calculator", "sales-tax-calculator", "commission-calculator"],
  },

  "profit-calculator": {
    intro:
      "Profit has three commonly quoted forms — gross, operating and net — and businesses get into trouble by managing the wrong one. This calculator works out profit and profit margin from revenue and cost so you can see both the currency amount and the percentage that makes it comparable across periods.",
    method: [
      "Profit = revenue − cost. Profit margin = profit ÷ revenue × 100.",
      "Gross profit uses only direct costs; operating profit subtracts overheads; net profit subtracts interest and tax as well.",
      "Margin, not absolute profit, is what you track over time — growing revenue with a falling margin is often a warning rather than a win.",
    ],
    example: {
      title: "Worked example: a quarter of trading",
      lines: [
        "Revenue: 480,000. Direct costs: 288,000. Gross profit: 192,000, a 40% gross margin.",
        "Overheads: 120,000. Operating profit: 72,000, a 15% operating margin.",
        "Interest 8,000 and tax 16,000. Net profit: 48,000, a 10% net margin.",
        "Next quarter revenue grows to 560,000 but discounting pushes direct costs to 358,000.",
        "Gross margin falls to 36%, and despite 80,000 more revenue, gross profit rises only 10,000.",
      ],
    },
    mistakes: [
      { title: "Confusing profit with cash", body: "Profitable businesses fail on cash flow when receivables stretch and inventory absorbs money. Track both statements." },
      { title: "Leaving owner's compensation out", body: "Unpaid founder time makes margins look far healthier than they are and hides an unsustainable model." },
      { title: "Comparing margins across industries", body: "A 5% net margin is strong in grocery and alarming in software. Compare only against your own history and direct peers." },
    ],
    faqs: [
      { q: "What is a good profit margin?", a: "It depends entirely on the sector. Broadly, 10% net is respectable for a small business and 20% is strong, but services and software run much higher than retail." },
      { q: "How do I increase margin without raising prices?", a: "Reduce direct cost through supplier negotiation, cut returns and waste, shift mix toward high-margin lines, and remove overheads that do not drive revenue." },
      { q: "What is the difference between profit and markup?", a: "Profit is an amount; markup is that amount expressed against cost. Margin expresses it against revenue." },
      { q: "Should I include depreciation?", a: "Yes, in operating profit — it reflects the real consumption of assets, even though no cash leaves in that period." },
      { q: "Why did profit fall while sales rose?", a: "Almost always discounting, a shift toward low-margin products, or overheads growing faster than revenue. Check gross margin first." },
    ],
    related: ["markup-calculator", "break-even-calculator", "roi-calculator", "commission-calculator", "tax-calculator"],
  },

  "discount-calculator": {
    intro:
      "Shops present discounts in whatever form flatters them: percentages off, buy-one-get-one, stacked coupons, or a strikethrough price nobody ever paid. This calculator gives you the final price and the actual amount saved, and the notes below show how to compare offers that are deliberately hard to compare.",
    method: [
      "Sale price = original × (1 − discount). Amount saved = original × discount.",
      "Stacked discounts multiply, they do not add: 20% then 10% off gives 0.8 × 0.9 = 0.72, a 28% total reduction, not 30%.",
      "To find the discount from two prices: discount = (original − sale) ÷ original × 100.",
    ],
    example: {
      title: "Worked example: comparing three offers on a 4,000 item",
      lines: [
        "30% off: 4,000 × 0.7 = 2,800. Saved 1,200.",
        "20% off plus an extra 10% at checkout: 4,000 × 0.8 × 0.9 = 2,880. Saved 1,120.",
        "Buy two get one free on three items: 12,000 becomes 8,000, an effective 33.3% off — but only if you need three.",
        "Per-unit cost: 2,800 versus 2,880 versus 2,667.",
        "The headline 30% offer beats the stacked 'up to 30%' offer by 80.",
      ],
    },
    mistakes: [
      { title: "Adding stacked percentages", body: "Sequential discounts always total less than their sum. The second is applied to an already reduced price." },
      { title: "Judging value against an inflated list price", body: "A 60% discount from a price never charged is a marketing device. Compare against the typical street price instead." },
      { title: "Counting the whole discount as savings on bulk deals", body: "Buying three to save on one is only a saving if you would have bought three anyway." },
    ],
    faqs: [
      { q: "How do I calculate 20% off?", a: "Multiply the price by 0.8. For 20% off 1,750: 1,750 × 0.8 = 1,400." },
      { q: "Is a 20% + 10% discount the same as 30%?", a: "No. Stacked, it works out to 28% off. The order does not matter; the total is always less than the sum." },
      { q: "Is tax applied before or after the discount?", a: "Almost always after, on the reduced price — so a discount also reduces the tax you pay." },
      { q: "How do I find the original price from a sale price?", a: "Divide by (1 − discount). A 2,800 item at 30% off was originally 2,800 ÷ 0.7 = 4,000." },
      { q: "What discount does buy-one-get-one-free equal?", a: "50% off, provided you take both units. Buy-two-get-one is 33.3% across three units." },
    ],
    related: ["markup-calculator", "sales-tax-calculator", "profit-calculator", "commission-calculator", "gst-calculator"],
  },

  "sales-tax-calculator": {
    intro:
      "Sales tax sits on top of a price rather than inside it, which makes two calculations necessary: adding tax to a net price, and stripping tax out of a gross one. This calculator does both, which is what you need when reconciling receipts, pricing goods, or filing a return.",
    method: [
      "Adding tax: total = net × (1 + rate). Tax amount = net × rate.",
      "Removing tax: net = total ÷ (1 + rate). Tax amount = total − net. Multiplying a gross figure by the rate overstates the tax.",
      "Combined jurisdictional rates add before application: a 6% state and 2.5% local rate is a single 8.5% applied once, not 6% then 2.5%.",
    ],
    example: {
      title: "Worked example: 8.5% combined rate",
      lines: [
        "Net price 1,200: tax = 1,200 × 0.085 = 102. Total = 1,302.",
        "Reversing from a 1,302 receipt: net = 1,302 ÷ 1.085 = 1,200. Tax = 102.",
        "The wrong method: 1,302 × 0.085 = 110.67, overstating tax by 8.67.",
        "On monthly gross sales of 260,000 that error misstates the return by about 1,730.",
        "For a discounted item, apply the discount first: 1,200 × 0.9 = 1,080, then tax 91.80, total 1,171.80.",
      ],
    },
    mistakes: [
      { title: "Applying the rate to a tax-inclusive total", body: "The classic reverse-calculation error. Always divide by 1 plus the rate when extracting tax from a gross amount." },
      { title: "Using one rate across all locations", body: "Rates vary by state, county and city, and destination-based rules mean the buyer's address often governs." },
      { title: "Taxing exempt categories", body: "Groceries, prescriptions and some services are exempt or reduced-rate in many jurisdictions. Check the category before charging." },
    ],
    faqs: [
      { q: "How do I remove sales tax from a total?", a: "Divide the total by 1 plus the rate. At 7%, a 428 total has a net of 428 ÷ 1.07 = 400 and tax of 28." },
      { q: "Is sales tax charged on shipping?", a: "It depends on the jurisdiction — many tax shipping when the goods are taxable, some do not. Check local rules." },
      { q: "What is the difference between sales tax and VAT or GST?", a: "Sales tax is levied once at final sale; VAT and GST are collected at each stage with credit for tax already paid." },
      { q: "Is tax applied before or after a discount?", a: "After. Tax applies to the actual amount charged, so discounts reduce tax too." },
      { q: "Do I charge tax based on my location or the customer's?", a: "Most modern regimes are destination-based, meaning the customer's location sets the rate once you have nexus there." },
    ],
    related: ["gst-calculator", "discount-calculator", "markup-calculator", "tax-calculator", "profit-calculator"],
  },

  "tax-calculator": {
    intro:
      "Income tax is progressive almost everywhere, which means your marginal rate and your effective rate are very different numbers. This calculator applies bracket-by-bracket tax to your taxable income so you can see the actual liability rather than assuming your top rate applies to everything.",
    method: [
      "Tax is computed slab by slab: each portion of income is taxed at the rate for that band, and the results are summed.",
      "Effective rate = total tax ÷ total income. Marginal rate = the rate on your next unit of income. The effective rate is always lower in a progressive system.",
      "Taxable income is gross income minus deductions and allowances, so deductions reduce tax at your marginal rate, not your effective one.",
    ],
    example: {
      title: "Worked example: 900,000 of taxable income across four bands",
      lines: [
        "First 300,000 at 0%: no tax.",
        "Next 300,000 at 5%: 15,000.",
        "Next 200,000 at 10%: 20,000.",
        "Remaining 100,000 at 15%: 15,000.",
        "Total tax 50,000 — an effective rate of 5.6% even though the marginal rate is 15%.",
      ],
    },
    mistakes: [
      { title: "Applying the top rate to all income", body: "Entering a higher bracket taxes only the income above the threshold. A raise never leaves you with less money in a properly progressive system." },
      { title: "Confusing tax credits with deductions", body: "A deduction reduces taxable income and saves tax at your marginal rate; a credit reduces the tax bill directly and is worth more per unit." },
      { title: "Ignoring social security and surcharges", body: "Payroll contributions, cess and surcharges sit outside the income tax bands and can add several percentage points to the real burden." },
    ],
    faqs: [
      { q: "What is the difference between marginal and effective tax rate?", a: "Marginal is the rate on your next earned unit; effective is total tax divided by total income. Effective is always lower under progressive brackets." },
      { q: "Does a raise ever leave me worse off?", a: "Not through the brackets themselves. It can happen where a means-tested benefit has a hard cliff, which is a benefit rule, not a tax rule." },
      { q: "How much tax does a deduction save?", a: "Your marginal rate times the deduction. A 50,000 deduction at a 30% marginal rate saves 15,000." },
      { q: "Should I use gross or taxable income here?", a: "Taxable income — gross less deductions, exemptions and allowances. Using gross overstates the liability." },
      { q: "Are capital gains taxed at these rates?", a: "Usually not. Most systems tax long-term gains at separate, lower rates with their own holding-period rules." },
    ],
    related: ["salary-calculator", "sales-tax-calculator", "gst-calculator", "net-worth-calculator", "crypto-profit-calculator"],
    post: {
      slug: "marginal-vs-effective-tax",
      title: "Marginal vs effective tax: why a raise never costs you money",
      excerpt: "Entering a new tax bracket does not tax your whole income at the new rate. Here is the bracket arithmetic, worked out.",
      readTime: "5 min",
      body: [
        "The most persistent myth in personal finance is that crossing into a higher tax bracket can leave you worse off. In a progressive system it cannot, and the reason is that brackets tax slices of income, not the whole of it.",
        "Suppose the bands are 0% up to 300,000, 5% to 600,000, 10% to 800,000 and 15% above. Earning 800,001 does not tax you at 15% on 800,001. It taxes one unit at 15%. Your total tax rises by fifteen paise. Everything below the threshold keeps its old, lower treatment.",
        "This gives you two rates, and it is worth knowing both. On 900,000 of taxable income under those bands the total tax is 50,000. The effective rate — what you actually paid across everything — is 5.6%. The marginal rate, which governs your next raise and the value of any deduction, is 15%.",
        "The distinction matters practically. Use the marginal rate to price decisions at the edge: how much a bonus nets, how much a retirement contribution saves, whether overtime is worth the evening. Use the effective rate to budget, because that is the number that actually leaves your account across the year.",
        "One real exception exists, and it is not a tax phenomenon. Some benefits and subsidies have hard eligibility cliffs, so earning one unit more can withdraw a payment worth far more than the tax on it. That is a means-testing design flaw, not bracket creep, and it is worth checking if you are near such a threshold.",
        "The practical takeaway: never turn down income because of brackets, and never estimate your tax by multiplying your salary by your top rate. Run the bands, then judge.",
      ],
      guides: ["inflation-and-the-real-return"],
    },
  },

  "salary-calculator": {
    intro:
      "A job offer arrives as an annual number and lands in your account as something considerably smaller. This calculator breaks a salary into monthly, weekly, daily and hourly equivalents so you can compare offers, judge contract rates, and see what your time is actually worth.",
    method: [
      "Monthly = annual ÷ 12. Weekly = annual ÷ 52. Daily = annual ÷ working days. Hourly = annual ÷ (weekly hours × working weeks).",
      "A standard full-time year is 2,080 hours: 40 hours × 52 weeks. Paid leave is included in that figure, which is why salaried hourly equivalents look higher than they feel.",
      "For a contractor comparison, use billable weeks only. Forty-six billable weeks at 40 hours is 1,840 hours, so a contract rate must be about 13% higher just to match on time alone.",
    ],
    example: {
      title: "Worked example: a 96,000 annual salary",
      lines: [
        "Monthly: 8,000. Semi-monthly: 4,000. Bi-weekly: 3,692.",
        "Weekly: 1,846. Daily on 260 working days: 369.",
        "Hourly on 2,080 hours: 46.15.",
        "As a contractor covering own leave and insurance, the equivalent is roughly 46.15 × 1.3 = 60 an hour.",
        "Add employer retirement match and health cover worth 12,000 and total compensation is 108,000, or 51.92 an hour.",
      ],
    },
    mistakes: [
      { title: "Comparing gross salary against a contract rate", body: "Employment includes paid leave, employer contributions, insurance and payroll tax that a contractor pays personally. A like-for-like contract rate is typically 25–40% higher." },
      { title: "Ignoring the pay-period mismatch", body: "Bi-weekly pay produces 26 cheques, not 24. Two months a year contain three cheques, which distorts monthly budgeting if you plan on the semi-monthly figure." },
      { title: "Overlooking non-salary compensation", body: "Retirement matching, bonuses, equity and healthcare can be a fifth of total value. Compare total compensation, not base pay." },
    ],
    faqs: [
      { q: "How do I convert an annual salary to an hourly rate?", a: "Divide by 2,080 for a standard 40-hour full-time year. A 96,000 salary is 46.15 an hour." },
      { q: "How many working days are in a year?", a: "About 260 before holidays and leave, and typically 225–235 actually worked once both are deducted." },
      { q: "What contract rate matches my salary?", a: "Start with your hourly equivalent, add 25–40% for unpaid leave, self-employment tax and benefits you must now buy yourself." },
      { q: "Is bi-weekly the same as twice a month?", a: "No. Bi-weekly is every two weeks — 26 payments a year. Semi-monthly is 24. The per-cheque amounts differ accordingly." },
      { q: "Should I negotiate salary or benefits?", a: "Salary compounds through future raises and is portable, so it usually wins. Benefits matter most when they cover a cost you would otherwise pay from taxed income." },
    ],
    related: ["hourly-to-salary-calculator", "overtime-pay-calculator", "tax-calculator", "commission-calculator", "inflation-calculator"],
  },

  "hourly-to-salary-calculator": {
    intro:
      "Converting an hourly wage to an annual salary sounds like one multiplication, but the answer depends on how many hours you are actually paid for. This calculator does the conversion and the notes below cover the unpaid-time gap that makes hourly and salaried roles hard to compare.",
    method: [
      "Annual = hourly rate × hours per week × weeks worked per year. Full-time convention is 40 × 52 = 2,080 hours.",
      "Hourly workers are usually unpaid for holidays and leave. At 46 paid weeks, the same rate yields 1,840 hours — about 11.5% less income.",
      "Reversing it, hourly = annual ÷ total paid hours, which is the figure to use when comparing an offer against your current wage.",
    ],
    example: {
      title: "Worked example: 32 an hour under three assumptions",
      lines: [
        "Paid 52 weeks at 40 hours: 32 × 2,080 = 66,560.",
        "Paid 48 weeks (two weeks unpaid leave, one week holidays): 32 × 1,920 = 61,440.",
        "Paid 46 weeks with occasional slow periods: 32 × 1,840 = 58,880.",
        "The spread between best and worst case is 7,680 — over 11% of income.",
        "A salaried offer of 62,000 with paid leave therefore beats 32 an hour in most real scenarios.",
      ],
    },
    mistakes: [
      { title: "Assuming 52 paid weeks for hourly work", body: "Very few hourly roles pay for holidays and vacation. Use the weeks you will genuinely be paid for." },
      { title: "Forgetting overtime in the annual figure", body: "If overtime is routine, model it separately at the premium rate — it can add 10–20% and changes the comparison materially." },
      { title: "Ignoring benefit differences", body: "Health cover, retirement matching and sick pay are often thinner for hourly roles. Add their cash value before comparing." },
    ],
    faqs: [
      { q: "How many hours are in a work year?", a: "2,080 for full-time at 40 hours a week across 52 weeks. Realistic paid hours for hourly roles are often 1,840–1,950." },
      { q: "What annual salary is 25 an hour?", a: "52,000 at 2,080 hours. At 1,880 paid hours it is 47,000." },
      { q: "Does the conversion include tax?", a: "No, it produces gross pay. Run the result through the tax calculator for a take-home estimate." },
      { q: "How do I compare part-time to full-time?", a: "Convert both to an hourly rate including benefit value. Part-time roles often pay a similar rate but far less in benefits per hour." },
      { q: "Should I convert on scheduled or actual hours?", a: "Actual. Scheduled hours overstate income wherever shifts get cut or the work is seasonal." },
    ],
    related: ["salary-calculator", "overtime-pay-calculator", "tax-calculator", "commission-calculator", "savings-calculator"],
  },

  "overtime-pay-calculator": {
    intro:
      "Overtime is paid at a premium, and small errors in the base rate multiply straight through to the pay cheque. This calculator works out regular pay, overtime pay at your multiplier and the combined total, so you can check a payslip or decide whether extra hours are worth it.",
    method: [
      "Regular pay = hourly rate × regular hours, usually capped at 40 in a week.",
      "Overtime pay = hourly rate × multiplier × overtime hours. Time-and-a-half is 1.5; double time is 2.0.",
      "The base for overtime is the regular rate of pay, which in many jurisdictions must include non-discretionary bonuses and shift differentials — not just the nominal hourly wage.",
    ],
    example: {
      title: "Worked example: 28 an hour, 52 hours worked",
      lines: [
        "Regular: 40 × 28 = 1,120.",
        "Overtime hours: 12, at 1.5 × 28 = 42 an hour.",
        "Overtime pay: 12 × 42 = 504.",
        "Total gross for the week: 1,624 — a 45% pay increase for 30% more hours.",
        "Effective average rate across all 52 hours: 31.23.",
      ],
    },
    mistakes: [
      { title: "Using the wrong regular rate of pay", body: "Production bonuses and shift premiums usually have to be folded into the base before the multiplier is applied, which raises the overtime rate." },
      { title: "Averaging hours across two weeks", body: "Overtime is generally calculated per workweek. Working 50 hours then 30 does not net out to two 40-hour weeks." },
      { title: "Assuming paid leave counts toward the 40", body: "Holiday and vacation hours are typically not hours worked, so a 40-hour week that includes 8 hours of leave rarely triggers overtime." },
    ],
    faqs: [
      { q: "How is time-and-a-half calculated?", a: "Multiply the regular hourly rate by 1.5, then by the overtime hours. At 28 an hour, overtime pays 42." },
      { q: "When does double time apply?", a: "It depends on jurisdiction and contract — commonly for very long days, seventh consecutive days, or designated holidays." },
      { q: "Are salaried employees entitled to overtime?", a: "Some are. Exemption usually depends on duties and a salary threshold, not simply on being paid a salary." },
      { q: "Is overtime taxed at a higher rate?", a: "The income is taxed at your marginal rate, so a large overtime cheque can be over-withheld temporarily, but the annual tax owed is unchanged by how it was earned." },
      { q: "Does overtime count for retirement matching?", a: "Usually yes, if the plan matches on total eligible compensation. Check whether your plan defines pay as base only." },
    ],
    related: ["salary-calculator", "hourly-to-salary-calculator", "tax-calculator", "commission-calculator", "profit-calculator"],
  },

  "commission-calculator": {
    intro:
      "Commission plans are designed to be motivating, which often means they are complicated. This calculator computes commission from sales value and rate, and the notes cover the structures that most often catch people out: tiered rates, draws against commission, and commission paid on margin rather than revenue.",
    method: [
      "Flat commission = sales × rate. Total earnings = base salary + commission.",
      "Tiered plans apply different rates to different bands of sales, so each tier is computed separately and summed — the same slab logic as income tax.",
      "Margin-based plans pay on gross profit rather than revenue: commission = (revenue − cost) × rate, which is why discounting hits a salesperson's pay twice.",
    ],
    example: {
      title: "Worked example: tiered plan on 320,000 of sales",
      lines: [
        "First 100,000 at 2%: 2,000.",
        "Next 100,000 at 3%: 3,000.",
        "Remaining 120,000 at 5%: 6,000.",
        "Total commission: 11,000. With a 40,000 base, quarterly earnings are 51,000.",
        "A flat 3% on the same sales would have paid 9,600 — the tiers are worth 1,400.",
      ],
    },
    mistakes: [
      { title: "Applying the top tier rate to all sales", body: "Tiered plans are marginal, not retroactive. Reaching the 5% band pays 5% only on sales above the threshold, unless the plan explicitly says otherwise." },
      { title: "Forgetting a draw is a loan", body: "A recoverable draw is advanced against future commission and must be repaid from it. A strong month can produce a smaller cheque than expected." },
      { title: "Ignoring clawbacks and chargebacks", body: "Refunds, cancellations and unpaid invoices commonly reverse commission months later. Model realistic net sales, not booked sales." },
    ],
    faqs: [
      { q: "How do I calculate commission on sales?", a: "Multiply net sales by the commission rate. On 85,000 at 4%, commission is 3,400." },
      { q: "What is a draw against commission?", a: "A guaranteed advance that is later deducted from earned commission. Recoverable draws must be repaid; non-recoverable ones do not." },
      { q: "Is it better to be paid on revenue or margin?", a: "Revenue plans pay more when you discount; margin plans pay more when you hold price. Margin plans align you with the business but require price authority." },
      { q: "How does an accelerator work?", a: "Above quota, the rate increases — for example 4% to quota and 7% beyond, which is why the last month of a quarter matters so much." },
      { q: "Is commission taxed differently?", a: "It is ordinary income. It may be withheld at a flat supplemental rate initially, but the annual liability follows your normal brackets." },
    ],
    related: ["salary-calculator", "profit-calculator", "markup-calculator", "tax-calculator", "break-even-calculator"],
  },

  "debt-to-income-calculator": {
    intro:
      "Debt-to-income ratio is the number lenders use to decide whether you can carry another payment. It is also the fastest self-diagnostic in personal finance. This calculator gives you the ratio from your monthly debt payments and gross income, so you know where you stand before an underwriter tells you.",
    method: [
      "DTI = total monthly debt payments ÷ gross monthly income × 100. Gross means before tax.",
      "Front-end DTI counts only housing costs — PITI plus any HOA. Back-end DTI counts housing plus all other minimum debt payments.",
      "Include minimum payments on cards, all loan instalments, student debt and legally required support payments. Exclude utilities, groceries, insurance not escrowed, and subscriptions.",
    ],
    example: {
      title: "Worked example: 7,500 gross monthly income",
      lines: [
        "Housing: 1,850 mortgage PITI + 120 HOA = 1,970. Front-end DTI = 26.3%.",
        "Other debt: 420 car loan + 180 student loan + 150 card minimums = 750.",
        "Total debt payments: 2,720. Back-end DTI = 36.3%.",
        "That sits right at the conventional 36% guideline, so approval is likely but tight.",
        "Clearing the car loan drops back-end DTI to 30.7% and frees roughly 90,000 of borrowing capacity.",
      ],
    },
    mistakes: [
      { title: "Using net income instead of gross", body: "Lenders use pre-tax income. Calculating on take-home pay makes your ratio look 20–30% worse than the figure being underwritten." },
      { title: "Using actual card payments rather than minimums", body: "Underwriters use the minimum due. If you pay 800 on a card whose minimum is 150, only 150 counts." },
      { title: "Forgetting deferred student loans", body: "Loans in deferment usually still count, often at an imputed percentage of the balance rather than zero." },
    ],
    faqs: [
      { q: "What DTI do lenders want?", a: "Conventional guidance is 28% front-end and 36% back-end. Many programmes stretch to 43–50% with strong credit, reserves or a large down payment." },
      { q: "What counts as debt in the calculation?", a: "Housing costs, loan instalments, minimum card payments, student loans and court-ordered support. Not utilities, food, insurance or subscriptions." },
      { q: "How do I lower my DTI quickly?", a: "Pay off the smallest-balance instalment loan to remove its whole payment, avoid new credit, and increase documented income." },
      { q: "Does a high DTI mean automatic rejection?", a: "No, but it narrows options and raises the rate. Compensating factors like large reserves or a long credit history can offset it." },
      { q: "Is DTI the same as credit utilisation?", a: "No. Utilisation compares card balances to limits and affects your credit score; DTI compares payments to income and affects affordability." },
    ],
    related: ["mortgage-calculator", "loan-calculator", "credit-card-payoff-calculator", "down-payment-calculator", "net-worth-calculator"],
    post: {
      slug: "dti-the-number-lenders-really-use",
      title: "The 28/36 rule: how lenders decide what you can borrow",
      excerpt: "Your credit score gets the attention, but debt-to-income is what usually decides the answer.",
      readTime: "6 min",
      body: [
        "Borrowers obsess over credit scores. Underwriters obsess over debt-to-income. A high score gets you a good rate; an acceptable DTI is what gets you an approval at all, because it is the closest thing a lender has to a measure of whether the payment is survivable.",
        "The traditional benchmark is the 28/36 rule. No more than 28% of gross monthly income going to housing — principal, interest, taxes, insurance and any association fee — and no more than 36% going to all debt payments combined. Modern programmes stretch the back-end figure to 43% routinely and to 50% with compensating factors, but 36% remains the line where borrowing stays comfortable rather than merely permitted.",
        "Two details change the answer more than people expect. First, the calculation uses gross income, not take-home. On 7,500 gross with 5,600 net, a 2,720 debt load is a 36% DTI to a lender and a 49% squeeze in your actual bank account. Both numbers are true, and only one of them decides the loan.",
        "Second, only minimum payments count. If you voluntarily pay 800 a month against a card whose minimum is 150, the underwriter records 150. This creates a real strategic point: paying a card down to zero and closing nothing removes almost no DTI, while clearing a small instalment loan removes its entire payment from the ratio.",
        "That is the lever worth knowing. Retiring a 420 car payment on a 7,500 income cuts back-end DTI by 5.6 percentage points, which at typical rates translates into roughly 90,000 of extra mortgage capacity. No amount of credit-score optimisation moves the needle that far.",
        "Before you apply, run your own DTI both ways, front and back. If the back-end figure is above 40%, spend the months before an application removing payments rather than balances — it is the same money, deployed where the underwriting formula can actually see it.",
      ],
      guides: ["why-minimum-payments-never-end", "emi-vs-total-interest"],
    },
  },

  "down-payment-calculator": {
    intro:
      "The down payment decides three things at once: your loan size, your monthly payment, and whether you pay mortgage insurance. This calculator shows the deposit amount and resulting loan from a purchase price and percentage, so you can see what each extra percentage point actually buys.",
    method: [
      "Down payment = purchase price × percentage. Loan amount = price − down payment.",
      "Loan-to-value = loan ÷ price. Crossing below 80% LTV — that is, 20% down — is what removes private mortgage insurance on most conventional loans.",
      "Cash needed at closing is more than the deposit: add closing costs, typically 2–5% of the price, plus prepaid escrow.",
    ],
    example: {
      title: "Worked example: 400,000 home at three deposit levels",
      lines: [
        "5% down: 20,000 deposit, 380,000 loan, plus PMI of roughly 160 a month.",
        "10% down: 40,000 deposit, 360,000 loan, PMI around 120 a month.",
        "20% down: 80,000 deposit, 320,000 loan, no PMI.",
        "At 6.5% over 30 years, P&I is 2,402 / 2,275 / 2,022 respectively.",
        "Going from 10% to 20% costs 40,000 upfront and saves 373 a month including PMI — about 134,000 over the full term.",
      ],
    },
    mistakes: [
      { title: "Budgeting only for the deposit", body: "Closing costs, moving, immediate repairs and furniture routinely add 3–6% of the price. Buyers who spend every last unit on the deposit start ownership with no reserves." },
      { title: "Draining the emergency fund to reach 20%", body: "Avoiding PMI is worth money, but not at the cost of having zero buffer when a roof or a job goes. PMI can be removed later; a financial shock cannot be undone." },
      { title: "Assuming PMI disappears automatically", body: "Some loans require a request once you reach 20% equity; some government-backed loans carry insurance for the whole term regardless." },
    ],
    faqs: [
      { q: "How much down payment do I need?", a: "Conventional loans can start near 3–5%, while 20% avoids mortgage insurance. The right answer is the largest deposit that still leaves closing costs and an emergency fund intact." },
      { q: "What is loan-to-value?", a: "The loan as a percentage of the property value. 20% down is an 80% LTV, which is the usual threshold for better pricing." },
      { q: "How much is PMI?", a: "Typically 0.3–1.5% of the loan a year, varying with credit score and LTV. On a 360,000 loan that is roughly 90–450 a month." },
      { q: "Can I use gifted funds?", a: "Most programmes allow gifts with a documented letter confirming the money is not a loan. Rules on the minimum from your own funds vary." },
      { q: "Is a bigger deposit better than a shorter term?", a: "A shorter term usually saves more interest per unit of extra monthly outlay, but it locks in a higher required payment. A bigger deposit keeps flexibility." },
    ],
    related: ["mortgage-calculator", "loan-calculator", "debt-to-income-calculator", "savings-calculator", "emergency-fund-calculator"],
  },

  "lease-payment-calculator": {
    intro:
      "A lease payment is built from three parts that dealers rarely separate: depreciation, a rent charge, and tax. This calculator assembles them from vehicle price, residual value, term and money factor, so you can see which lever is actually driving the monthly figure you are being quoted.",
    method: [
      "Depreciation charge = (capitalised cost − residual value) ÷ term in months. This is the portion of the car you are consuming.",
      "Rent charge = (capitalised cost + residual value) × money factor. Money factor × 2400 gives the equivalent annual interest rate.",
      "Monthly payment = depreciation + rent charge, plus tax where applicable. Capitalised cost is the negotiated price less any down payment or trade-in.",
    ],
    example: {
      title: "Worked example: 42,000 vehicle, 36-month lease",
      lines: [
        "Negotiated price 39,500, down payment 2,500, so capitalised cost is 37,000.",
        "Residual 55% of MSRP: 42,000 × 0.55 = 23,100.",
        "Depreciation: (37,000 − 23,100) ÷ 36 = 386.11.",
        "Money factor 0.00175 (equivalent to 4.2%): rent charge = (37,000 + 23,100) × 0.00175 = 105.18.",
        "Payment before tax: 491.29. Total of payments plus down payment: 20,187 for three years of use.",
      ],
    },
    mistakes: [
      { title: "Negotiating the payment instead of the capitalised cost", body: "A dealer can hit any monthly figure by extending the term or raising the money factor. Negotiate the price first, then check the payment maths." },
      { title: "Not converting the money factor", body: "A money factor of 0.0025 looks tiny but equals 6% interest. Always multiply by 2400 before judging whether the financing is competitive." },
      { title: "Making a large down payment on a lease", body: "Capitalised cost reduction is not equity. If the car is totalled early, that money is generally gone — unlike a deposit on a purchase." },
    ],
    faqs: [
      { q: "What is a money factor?", a: "The lease equivalent of an interest rate. Multiply it by 2400 to get the annual percentage rate: 0.00175 equals 4.2%." },
      { q: "What is residual value?", a: "The lender's estimate of the car's worth at lease end, set as a percentage of MSRP. A higher residual means less depreciation to pay for and a lower payment." },
      { q: "Is leasing cheaper than buying?", a: "Cheaper monthly, more expensive over a decade, because you never stop making payments. Leasing wins on cash flow and warranty coverage, buying wins on lifetime cost." },
      { q: "What happens if I exceed the mileage allowance?", a: "You pay an excess charge, commonly 0.15–0.30 per unit of distance. Estimate honestly upfront; buying extra miles in advance is usually cheaper." },
      { q: "Can I end a lease early?", a: "Usually only by paying the remaining payments or a stated termination fee. Transferring the lease, where permitted, is often cheaper." },
    ],
    related: ["car-loan-calculator", "loan-calculator", "mortgage-calculator", "down-payment-calculator", "debt-to-income-calculator"],
  },
};
