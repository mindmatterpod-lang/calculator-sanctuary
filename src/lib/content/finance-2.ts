import type { ContentMap } from "./types";

/* Batch 2a — Finance: interest, savings and investment tools. */

export const finance2Content: ContentMap = {
  "simple-interest-calculator": {
    intro:
      "Simple interest is the only interest formula where the balance never feeds back into itself. It still governs a surprising amount of real money: car loans quoted as flat-rate, informal family loans, short bridging finance, and most bond coupon payments. This calculator shows the interest and the maturity value so you can see exactly how much a flat rate costs.",
    method: [
      "Interest = P × r × t, where P is the principal, r is the annual rate as a decimal, and t is the time in years. Maturity value = P + interest.",
      "Because the base never changes, interest accrues in a straight line. Doubling the term exactly doubles the interest — something compound interest never does.",
      "Part-years go in as fractions: 9 months is 0.75, 18 months is 1.5. Feeding months in as whole numbers multiplies the answer twelvefold.",
    ],
    example: {
      title: "Worked example: 50,000 at 8% for 3 years",
      lines: [
        "Interest = 50,000 × 0.08 × 3 = 12,000.",
        "Maturity value = 50,000 + 12,000 = 62,000.",
        "Yearly interest is a flat 4,000 — identical in year one and year three.",
        "The same money at 8% compounded annually would earn 12,986, so compounding adds 986 over three years and far more over ten.",
      ],
    },
    mistakes: [
      {
        title: "Comparing a flat rate against a reducing-balance rate",
        body: "A 'flat 8%' car loan is roughly equivalent to 14–15% reducing balance, because you keep paying interest on money you have already repaid. Never compare the two headline numbers directly.",
      },
      {
        title: "Entering the rate as 8 instead of 0.08",
        body: "The formula needs a decimal. This calculator handles the conversion, but hand calculations frequently come out 100 times too large.",
      },
      {
        title: "Using simple interest for a savings projection",
        body: "Almost every real savings account compounds. Simple interest understates long-term growth badly and should only be used where the contract genuinely fixes the interest base.",
      },
    ],
    faqs: [
      { q: "What is the difference between simple and compound interest?", a: "Simple interest is charged only on the original principal; compound interest is charged on principal plus accumulated interest. Over one year they match, and the gap widens every year after." },
      { q: "Where is simple interest actually used?", a: "Flat-rate vehicle and consumer loans, short-term bridging finance, most bond coupons, and statutory interest on late payments or court awards." },
      { q: "How do I calculate simple interest for months?", a: "Divide the months by 12 and use that as t. For 7 months at 9% on 20,000: 20,000 × 0.09 × 7/12 = 1,050." },
      { q: "Can I work backwards to find the rate?", a: "Yes: r = Interest ÷ (P × t). If 20,000 earned 3,000 over two years, the rate is 3,000 ÷ 40,000 = 7.5%." },
      { q: "Is simple interest ever better for a borrower?", a: "Only when the same nominal rate is offered both ways, which is rare. Lenders usually quote flat rates precisely because the effective cost is higher." },
    ],
    related: ["compound-interest", "interest-calculator", "loan-calculator", "fd-calculator", "savings-calculator"],
    post: {
      slug: "flat-rate-vs-reducing-balance",
      title: "Flat rate vs reducing balance: why an 8% car loan costs 15%",
      excerpt: "Two loans, the same headline rate, nearly double the real cost. Here is the arithmetic dealers rely on you not doing.",
      readTime: "6 min",
      body: [
        "A dealer offers you 500,000 of car finance at 'just 8% for five years'. Another lender quotes 13% reducing balance. The first sounds obviously cheaper. It is not — it is slightly worse.",
        "On the flat-rate deal, interest is calculated once on the full 500,000: 500,000 × 0.08 × 5 = 200,000. You repay 700,000 in 60 instalments of 11,667. Critically, that interest never shrinks even though your balance does. By month 50 you owe about 83,000 but you are still being charged interest as though you owed the whole half million.",
        "On a reducing-balance loan, interest is recomputed each month on what is actually outstanding. At 13% over five years, the payment is roughly 11,377 and total interest lands near 182,600 — less money, on a rate five points higher.",
        "The rough conversion is useful to memorise: a flat rate is close to 1.8x the equivalent reducing-balance rate for a mid-length loan. An 8% flat quote is really about 14.5%. A 6% flat quote is really about 11%.",
        "How to protect yourself: ask for the total amount repayable, not the rate. Total repayable is definitionally comparable across quoting conventions. If a salesperson will not give you that number in writing, you have learned something more useful than the rate anyway.",
        "Then run both structures — simple interest for the flat quote, the loan calculator for the reducing-balance quote — and compare lifetime cost. The deal with the lower total wins, regardless of which one had the prettier percentage on the poster.",
      ],
      guides: ["emi-vs-total-interest", "car-loan-depreciation-trap"],
    },
  },

  "interest-calculator": {
    intro:
      "This is the general-purpose interest tool: give it a principal, a rate, a period and a compounding frequency, and it tells you what the money becomes. Use it when you are comparing offers whose terms do not line up — a bank quoting monthly compounding against a bond quoting annual, or a deposit quoted for 30 months against one quoted for three years.",
    method: [
      "Compound growth uses A = P × (1 + r/n)^(n×t), where n is the number of compounding periods per year. Interest earned is A − P.",
      "Raising n increases the result, but with diminishing returns. Monthly compounding is meaningfully better than annual; daily compounding is barely better than monthly.",
      "To compare offers fairly, convert each to an effective annual rate: EAR = (1 + r/n)^n − 1. That single number is the only honest basis for comparison.",
    ],
    example: {
      title: "Worked example: 100,000 at 7% for 5 years, four frequencies",
      lines: [
        "Annual (n=1): 100,000 × 1.07^5 = 140,255.",
        "Quarterly (n=4): 100,000 × (1 + 0.0175)^20 = 141,478.",
        "Monthly (n=12): 100,000 × (1 + 0.005833)^60 = 141,763.",
        "Daily (n=365): 141,902.",
        "Annual to monthly gains 1,508. Monthly to daily gains only 139 — the curve flattens fast.",
      ],
    },
    mistakes: [
      { title: "Comparing nominal rates across different frequencies", body: "A 7.1% annual-compounding deposit beats a 7.0% monthly one only if you check the effective rates: 7.10% versus 7.23%. The lower nominal rate wins here." },
      { title: "Forgetting tax on interest", body: "Interest income is usually taxable at your marginal rate. A 7% gross return at 30% tax is 4.9% net, which may be below inflation." },
      { title: "Mixing rate period and time period", body: "If the rate is monthly, t must be in months and n is 1. Half of all wrong answers come from a monthly rate paired with a yearly term." },
    ],
    faqs: [
      { q: "What is an effective annual rate?", a: "The rate that would produce the same yearly growth with a single annual compounding. It normalises offers so different compounding frequencies can be compared." },
      { q: "Does daily compounding make a real difference?", a: "Very little. Moving from monthly to daily typically adds under 0.02 percentage points of effective yield. Frequency matters most between annual and monthly." },
      { q: "How do I find the rate needed to reach a target?", a: "r = (A/P)^(1/t) − 1 for annual compounding. To turn 100,000 into 200,000 in eight years you need 9.05% a year." },
      { q: "Should I use this or the compound interest calculator?", a: "Use this one for single-deposit growth and frequency comparisons; use the compound interest tool when you are adding regular contributions." },
      { q: "Why does my bank's figure differ slightly?", a: "Banks often use day-count conventions such as 365/360 or accrue on cleared balances, which shifts the result by a few units on large sums." },
    ],
    related: ["compound-interest", "simple-interest-calculator", "apy-calculator", "fd-calculator", "savings-calculator"],
  },

  "apy-calculator": {
    intro:
      "APY is the number that lets you compare savings accounts honestly. Banks advertise nominal rates with different compounding schedules, and the one with the biggest headline is not always the one that pays most. This calculator converts a quoted rate and frequency into the annual percentage yield you would actually earn.",
    method: [
      "APY = (1 + r/n)^n − 1, where r is the nominal annual rate as a decimal and n is compounding periods per year.",
      "With continuous compounding the ceiling is APY = e^r − 1, which is the theoretical maximum for any given nominal rate.",
      "Going the other way, the nominal rate implied by an advertised APY is r = n × ((1 + APY)^(1/n) − 1) — useful when a bank quotes APY but pays monthly.",
    ],
    example: {
      title: "Worked example: which account pays more?",
      lines: [
        "Account A: 5.00% nominal, compounded monthly. APY = (1 + 0.05/12)^12 − 1 = 5.116%.",
        "Account B: 5.05% nominal, compounded annually. APY = 5.050%.",
        "Account C: 4.95% nominal, compounded daily. APY = (1 + 0.0495/365)^365 − 1 = 5.075%.",
        "On 250,000 for a year: A pays 12,790, C pays 12,688, B pays 12,625.",
        "The account with the lowest headline rate beats the one with the highest.",
      ],
    },
    mistakes: [
      { title: "Treating APR and APY as the same thing", body: "APR ignores compounding within the year; APY includes it. For deposits you want APY, for loan costs you want APR plus fees." },
      { title: "Ignoring introductory teaser periods", body: "Many advertised APYs apply for three or six months, then drop. Compute a blended yield across the full year you intend to hold the money." },
      { title: "Overlooking balance tiers and minimums", body: "A headline APY often applies only up to a cap, with the excess earning far less. Check the tier your balance actually lands in." },
    ],
    faqs: [
      { q: "What is the difference between APR and APY?", a: "APY accounts for intra-year compounding, APR does not. For the same nominal rate, APY is always equal to or higher than APR." },
      { q: "Is a higher APY always better?", a: "For a plain savings account, yes. But check lock-in periods, withdrawal penalties, minimum balances and whether the rate is promotional." },
      { q: "How do I convert APY back to a monthly rate?", a: "Monthly rate = (1 + APY)^(1/12) − 1. A 5.12% APY corresponds to about 0.4167% per month." },
      { q: "Does APY include fees?", a: "No. A monthly maintenance fee can wipe out the yield on a small balance, so subtract annual fees from projected interest before comparing." },
      { q: "Why do banks advertise APY instead of the nominal rate?", a: "Because APY is the larger, and more honest, number for depositors — and regulators in many markets require it precisely to prevent frequency games." },
    ],
    related: ["interest-calculator", "compound-interest", "savings-calculator", "fd-calculator", "inflation-calculator"],
  },

  "fd-calculator": {
    intro:
      "Fixed deposits trade flexibility for certainty: you lock money away for a set term and know the maturity value on day one. This calculator shows that value along with the interest earned, so you can weigh a 5-year FD against a shorter one you can roll over, or against a market-linked option.",
    method: [
      "Maturity value = P × (1 + r/n)^(n×t) for a cumulative FD, where interest is retained and compounded — most Indian banks use n = 4 (quarterly).",
      "For a non-cumulative FD that pays out periodically, interest is P × r ÷ n per payout and the principal never grows.",
      "Real return matters more than nominal: subtract tax at your slab rate, then subtract inflation. A 7% FD at 30% tax with 6% inflation has a negative real return.",
    ],
    example: {
      title: "Worked example: 500,000 for 5 years at 7.1%, quarterly compounding",
      lines: [
        "Periods: 5 × 4 = 20. Rate per period: 0.071 ÷ 4 = 0.01775.",
        "Maturity = 500,000 × 1.01775^20 = 711,600 approximately.",
        "Interest earned = 211,600, an effective annual yield of about 7.29%.",
        "At a 30% tax slab, post-tax interest is about 148,100, giving roughly 5.1% net.",
        "With 6% inflation over the same period, purchasing power actually falls slightly.",
      ],
    },
    mistakes: [
      { title: "Comparing FD rates without checking compounding frequency", body: "A 7.1% quarterly-compounded FD yields more than a 7.2% annually-compounded one. Convert both to effective yield first." },
      { title: "Forgetting the premature withdrawal penalty", body: "Breaking an FD early typically costs 0.5–1% off the applicable rate, and the rate applied is the one for the period actually held, not the original." },
      { title: "Ignoring tax deducted at source", body: "Banks withhold tax on interest above a threshold, so the amount credited is lower than the maturity value the calculator shows gross." },
    ],
    faqs: [
      { q: "What is the difference between cumulative and non-cumulative FDs?", a: "Cumulative reinvests interest so it compounds to maturity. Non-cumulative pays interest out monthly or quarterly, which suits income needs but forgoes compounding." },
      { q: "Is FD interest taxable?", a: "Yes, it is taxed as ordinary income in the year it accrues, whether or not it has been paid out to you." },
      { q: "Should I ladder my fixed deposits?", a: "Laddering across several maturities keeps part of your money liquid and reduces the risk of locking everything in just before rates rise." },
      { q: "Does a longer FD tenure always pay a higher rate?", a: "No. Rate curves often peak around 1–3 years, and very long tenures sometimes pay less while exposing you to more rate risk." },
      { q: "How is FD interest calculated for part-years?", a: "Banks apply the rate for the completed tenure slab and compound quarterly, with simple interest applied for the final incomplete quarter." },
    ],
    related: ["compound-interest", "apy-calculator", "savings-calculator", "inflation-calculator", "sip-calculator"],
  },

  "savings-calculator": {
    intro:
      "Most savings goals are not built from a lump sum — they are built from a monthly habit. This calculator combines a starting balance with recurring deposits and shows what the account becomes, which is the fastest way to answer the only two questions that matter: how long will this take, and how much do I need to put in each month.",
    method: [
      "Future value has two parts. The starting balance grows as P × (1 + i)^n, and the deposits grow as an annuity: D × ((1 + i)^n − 1) ÷ i, where i is the periodic rate and n the number of deposits.",
      "Total contributed is P + D × n. Anything above that in the final balance is interest, and that share grows non-linearly with time.",
      "To solve for the deposit needed to hit a target: D = (Target − P × (1 + i)^n) × i ÷ ((1 + i)^n − 1).",
    ],
    example: {
      title: "Worked example: 25,000 start, 500 a month, 5% for 10 years",
      lines: [
        "Periodic rate i = 0.05 ÷ 12 = 0.0041667. Deposits n = 120.",
        "Starting balance grows to 25,000 × 1.0041667^120 = 41,180.",
        "Deposits grow to 500 × (1.0041667^120 − 1) ÷ 0.0041667 = 77,641.",
        "Final balance ≈ 118,821 from 85,000 contributed — 33,821 is interest.",
        "Extend to 20 years and the balance reaches about 271,000, with interest now exceeding contributions.",
      ],
    },
    mistakes: [
      { title: "Assuming the interest share stays constant", body: "In year one interest is a rounding error; by year fifteen it can exceed your deposits. Judging a savings plan on its first two years always leads to quitting too early." },
      { title: "Modelling a growth rate you cannot get on cash", body: "Savings accounts pay cash rates. If you plug in 10%, you are modelling an equity portfolio and should also model the possibility of a down year." },
      { title: "Forgetting to index the deposit", body: "A fixed 500 a month loses purchasing power. Raising the deposit with your income each year changes the outcome far more than chasing a slightly better rate." },
    ],
    faqs: [
      { q: "How much should I save each month?", a: "A common benchmark is 20% of take-home pay across emergency fund, retirement and goals. Work backwards from your target with this calculator to get a specific number." },
      { q: "Do deposits at the start or end of the month matter?", a: "Slightly. Depositing at the start earns one extra period of interest per deposit, typically adding well under 1% to the final balance." },
      { q: "Is it better to save monthly or invest a lump sum?", a: "A lump sum has more time in the market and usually wins mathematically, but monthly saving is what most people can actually sustain and it smooths entry prices." },
      { q: "Should I fill my emergency fund before other goals?", a: "Yes. Without three to six months of expenses in cash, any shock turns into credit card debt at rates that dwarf any savings return." },
      { q: "How do I account for inflation in a savings goal?", a: "Either inflate the target by the expected rate, or run the projection with a real rate — nominal return minus inflation — and read the answer in today's money." },
    ],
    related: ["compound-interest", "emergency-fund-calculator", "investment-calculator", "inflation-calculator", "retirement-calculator"],
  },

  "investment-calculator": {
    intro:
      "This tool projects what an investment becomes when you combine an initial amount, ongoing contributions and an expected annual return. It is built for the planning question rather than the trading question: given the amount you can realistically add each month, what range of outcomes should you expect in ten, twenty or thirty years?",
    method: [
      "The engine is the same two-part future value used for savings: lump sum growth plus a contribution annuity, compounded at the periodic rate.",
      "Expected return should be a long-run average, not last year's number. Broad equity indices have historically averaged roughly 7–10% nominal before fees.",
      "Fees compound against you exactly as returns compound for you. A 1% annual fee on a 30-year plan typically removes a fifth or more of the final balance.",
    ],
    example: {
      title: "Worked example: 10,000 start, 1,000 a month, 8% for 25 years",
      lines: [
        "Lump sum: 10,000 × 1.0066667^300 = 73,400.",
        "Contributions: 1,000 × (1.0066667^300 − 1) ÷ 0.0066667 = 951,000 approximately.",
        "Projected total ≈ 1,024,000 from 310,000 contributed.",
        "Same plan at 7% instead of 8%: about 869,000 — a single percentage point costs 155,000.",
        "Add a 1% annual fee and the effective return drops to 7%, producing exactly that gap.",
      ],
    },
    mistakes: [
      { title: "Treating an average return as a yearly return", body: "An 8% average includes years of −20% and +30%. Sequence matters enormously if you are withdrawing, which is why retirement planning needs its own stress test." },
      { title: "Projecting in nominal money and spending in real money", body: "A million in 25 years buys what roughly 470,000 buys today at 3% inflation. Deflate the answer before deciding it is enough." },
      { title: "Ignoring the drag of taxes and expense ratios", body: "Model your net return: gross expected return minus fund costs, platform fees and any annual tax leakage." },
    ],
    faqs: [
      { q: "What return should I assume?", a: "Use a conservative long-run figure for your asset mix — often 6–8% nominal for equity-heavy portfolios — and run a pessimistic case two points lower." },
      { q: "How long does money take to double?", a: "Divide 72 by the return. At 8% it is about nine years; at 6% about twelve. The rule of 72 calculator does this instantly." },
      { q: "Is it better to increase contributions or chase returns?", a: "Early on, contributions dominate; after fifteen or twenty years, returns dominate. Raising contributions is the part you actually control." },
      { q: "Does this account for market crashes?", a: "No — it applies a smooth average. Treat the output as a central estimate and plan for outcomes 20–30% either side of it." },
      { q: "What is the difference between this and a SIP calculator?", a: "Mechanically they are the same annuity maths; the SIP tool is framed around a pure monthly plan, while this one starts from a lump sum plus contributions." },
    ],
    related: ["compound-interest", "sip-calculator", "cagr-calculator", "rule-of-72-calculator", "npv-calculator"],
    post: {
      slug: "one-percent-fee-thirty-years",
      title: "What a 1% fee really costs over thirty years",
      excerpt: "It sounds like a rounding error. Run the compounding and it is a fifth of your portfolio.",
      readTime: "5 min",
      body: [
        "Fees are quoted annually and small, which is exactly why they are so effective. One percent of a balance feels trivial. But the fee is not charged on your contributions — it is charged on the compounded balance, every year, forever.",
        "Take 1,000 a month for 30 years at an 8% gross return. Fee-free, the balance reaches about 1,490,000. Charge 1% a year and your effective return is 7%: the balance lands near 1,220,000. The fee took 270,000 — roughly 18% of the outcome, from a charge that never once looked large on a statement.",
        "The mechanism is simple. Each year's fee removes not just that amount but all the growth it would have produced in the remaining years. A fee taken in year three has 27 more years of lost compounding attached to it.",
        "This is also why the fee difference between funds matters more than their recent performance. A 0.05% index fund and a 0.85% active fund differ by 0.8 percentage points of guaranteed drag. The active fund must beat the index by more than that, after tax, every year, just to draw level.",
        "Three checks worth doing once a year: find the total expense ratio of every fund you hold, find any platform or advice fee charged on top, and add them. If the combined figure is above about 0.5%, know what you are buying with the difference.",
        "Then re-run your projection with the net number. Planning with a gross return and paying net fees is the most common way people end up short of a target they thought they had modelled correctly.",
      ],
      guides: ["sip-math-explained", "cagr-vs-average-return"],
    },
  },

  "rule-of-72-calculator": {
    intro:
      "The rule of 72 is the mental-maths shortcut every investor should know: divide 72 by the annual return and you get the years needed to double your money. This calculator applies it and compares it against the exact logarithmic answer, so you can see where the shortcut is reliable and where it drifts.",
    method: [
      "Years to double ≈ 72 ÷ r, where r is the annual percentage return. At 9%, that is 8 years.",
      "The exact answer is ln(2) ÷ ln(1 + r/100). At 9% that gives 8.04 years, so the shortcut is off by half a week.",
      "Accuracy is best between roughly 5% and 12%. Below that, 69.3 divided by the rate is closer; well above it, the rule increasingly overestimates the time needed.",
    ],
    example: {
      title: "Worked example: shortcut versus exact",
      lines: [
        "At 6%: 72 ÷ 6 = 12 years. Exact: 11.90 years.",
        "At 8%: 72 ÷ 8 = 9 years. Exact: 9.01 years.",
        "At 12%: 72 ÷ 12 = 6 years. Exact: 6.12 years.",
        "At 24%: 72 ÷ 24 = 3 years. Exact: 3.22 years — the shortcut is now clearly optimistic.",
        "Run it in reverse for inflation: at 6% inflation, prices double in about 12 years.",
      ],
    },
    mistakes: [
      { title: "Applying it to volatile returns", body: "The rule assumes a steady rate. With a portfolio that swings, use the compound annual growth rate rather than the average of yearly returns." },
      { title: "Forgetting it works on inflation too", body: "The same arithmetic tells you how fast your costs double. A 7% nominal return against 3.5% inflation means real doubling takes about 20 years, not 10." },
      { title: "Using it for very high rates", body: "Above roughly 20%, switch to the logarithmic formula. Credit card debt at 36% doubles in about 2.2 years, not the 2.0 the rule suggests." },
    ],
    faqs: [
      { q: "Why 72 and not 70?", a: "72 divides cleanly by 2, 3, 4, 6, 8, 9 and 12, which makes it far easier for mental maths, and it happens to be most accurate in the 6–10% range investors care about." },
      { q: "How do I find the tripling time?", a: "Use 114 instead of 72. At 8%, money triples in roughly 14 years. For quadrupling, use 144." },
      { q: "Can I use it to find a required return?", a: "Yes. To double in six years you need about 72 ÷ 6 = 12% a year." },
      { q: "Does it work for debt?", a: "Exactly the same way, which is the frightening part. Unpaid balances at 24% double in three years." },
      { q: "Is it useful with regular contributions?", a: "Not directly — it describes a single sum. For contribution plans, use the investment or SIP calculator." },
    ],
    related: ["compound-interest", "investment-calculator", "cagr-calculator", "inflation-calculator", "interest-calculator"],
  },

  "npv-calculator": {
    intro:
      "Net present value answers whether a project is worth doing once you account for the fact that future money is worth less than money today. It is the standard tool for capital decisions: buying equipment, launching a product line, or choosing between two contracts with different payment timings.",
    method: [
      "NPV = Σ CFt ÷ (1 + r)^t − initial investment, where CFt is the cash flow in period t and r is the discount rate.",
      "The discount rate represents your cost of capital or required return. Raising it penalises distant cash flows heavily, which is why long-payback projects fail first when rates rise.",
      "Decision rule: accept when NPV is positive, reject when negative. When comparing projects of similar size, the higher NPV wins.",
    ],
    example: {
      title: "Worked example: 100,000 machine, five years of savings",
      lines: [
        "Cash flows: 30,000 a year for five years. Discount rate: 10%.",
        "Discounted: 27,273 + 24,793 + 22,539 + 20,490 + 18,628 = 113,723.",
        "NPV = 113,723 − 100,000 = +13,723, so the purchase creates value.",
        "At a 15% discount rate the present value falls to 100,565 and NPV is barely positive.",
        "At 18% NPV turns negative — the project only works while capital is cheap.",
      ],
    },
    mistakes: [
      { title: "Picking a discount rate carelessly", body: "NPV is extremely sensitive to r. Use your weighted average cost of capital or a genuine required return, and always test a rate a few points higher." },
      { title: "Including sunk costs", body: "Money already spent is irrelevant to the decision. Only incremental future cash flows belong in the calculation." },
      { title: "Mixing nominal cash flows with a real discount rate", body: "Either inflate the cash flows and discount at a nominal rate, or keep both in today's money. Mixing the two systematically overstates NPV." },
    ],
    faqs: [
      { q: "What does a negative NPV mean?", a: "The project returns less than your required rate. It may still be cash-positive, but the capital would do better elsewhere at the same risk." },
      { q: "How is NPV different from IRR?", a: "NPV gives value in currency at a chosen discount rate; IRR gives the rate at which NPV equals zero. NPV is the more reliable ranking tool for projects of different sizes." },
      { q: "What discount rate should a small business use?", a: "Often the cost of borrowing plus a risk premium — commonly 10–15%. If the project is riskier than the business as a whole, go higher." },
      { q: "Should terminal value be included?", a: "Yes, if the asset has resale value or the cash flows continue beyond the modelled period. Discount it like any other future amount." },
      { q: "Does NPV handle uneven cash flows?", a: "Naturally — each period is discounted separately, so irregular or negative interim flows are handled without adjustment." },
    ],
    related: ["roi-calculator", "cagr-calculator", "break-even-calculator", "investment-calculator", "compound-interest"],
  },

  "crypto-profit-calculator": {
    intro:
      "Crypto positions are easy to misjudge because entry prices, fees and partial sales pile up quickly. This calculator works out your profit or loss in both absolute and percentage terms from buy price, sell price and quantity, so you know your actual result rather than the one your exchange dashboard implies.",
    method: [
      "Profit = (sell price − buy price) × quantity, minus fees on both sides.",
      "Return percentage = profit ÷ (buy price × quantity) × 100. Percentage return is what you compare across positions of different sizes.",
      "Break-even sell price = buy price × (1 + total fee rate), because you must clear the round-trip cost before any gain is real.",
    ],
    example: {
      title: "Worked example: 0.5 BTC bought at 42,000, sold at 61,000",
      lines: [
        "Cost: 0.5 × 42,000 = 21,000, plus 0.2% buy fee = 42. Total in: 21,042.",
        "Proceeds: 0.5 × 61,000 = 30,500, minus 0.2% sell fee = 61. Total out: 30,439.",
        "Profit = 30,439 − 21,042 = 9,397, a return of 44.7%.",
        "Gross price move was 45.2%, so fees cost half a percentage point.",
        "A 30% short-term tax on the gain would leave about 6,578 net.",
      ],
    },
    mistakes: [
      { title: "Ignoring the round trip on fees", body: "You pay to enter and to exit, and spreads add more on thin pairs. On active trading, fees frequently exceed the edge being traded." },
      { title: "Confusing percentage down with percentage needed to recover", body: "A 50% loss requires a 100% gain to break even. A 75% loss requires 300%. Losses and recoveries are not symmetric." },
      { title: "Forgetting that crypto-to-crypto trades are taxable events", body: "In most jurisdictions swapping one token for another realises a gain, even though no fiat was withdrawn." },
    ],
    faqs: [
      { q: "How do I calculate my average entry price?", a: "Divide total money spent by total units held. Buying 0.3 at 40,000 and 0.2 at 60,000 gives (12,000 + 12,000) ÷ 0.5 = 48,000." },
      { q: "What sell price do I need to break even after fees?", a: "Multiply your average entry by one plus your combined round-trip fee rate. At 0.4% total, a 48,000 entry needs about 48,192." },
      { q: "Is crypto profit taxed?", a: "Almost everywhere, yes — usually as capital gains, sometimes as income for staking or mining rewards. Holding periods often change the rate." },
      { q: "How should I account for staking rewards?", a: "Record them as income at their value on receipt; that value then becomes the cost basis when you eventually sell." },
      { q: "Why does my exchange show a different profit?", a: "Exchanges often display unrealised profit on current mark price, exclude fees, or use a different cost-basis method such as FIFO." },
    ],
    related: ["roi-calculator", "profit-calculator", "cagr-calculator", "tax-calculator", "currency-converter"],
  },

  "currency-converter": {
    intro:
      "Exchange rates decide what a foreign purchase, salary or transfer really costs, and the rate you get is never quite the rate you see quoted. This converter handles the arithmetic; the content below covers the part that actually costs travellers and freelancers money — spreads, fees and conversion direction.",
    method: [
      "Converted amount = amount × rate, where the rate is quoted as units of the target currency per one unit of the base currency.",
      "To reverse a conversion, divide instead of multiply — or use 1 ÷ rate. Mixing up direction on a rate like 0.011 versus 91 is the most common error in currency maths.",
      "Your effective rate after costs = amount received ÷ amount sent. That single figure exposes hidden margins better than any advertised 'zero commission' claim.",
    ],
    example: {
      title: "Worked example: sending 1,000 USD to INR",
      lines: [
        "Mid-market rate: 1 USD = 83.20 INR, so 1,000 USD = 83,200 INR.",
        "A provider quoting a 1.5% spread uses 81.95, delivering 81,950 INR.",
        "Add a 5 USD transfer fee and only 995 USD is converted: 81,540 INR.",
        "Effective rate = 81,540 ÷ 1,000 = 81.54, which is 2% below mid-market.",
        "The 'no commission' service therefore cost about 1,660 INR.",
      ],
    },
    mistakes: [
      { title: "Comparing providers on fees instead of the delivered amount", body: "A zero-fee provider with a 2.5% spread is worse than a 5 USD fee with a 0.4% spread on any meaningful transfer. Always compare the amount that arrives." },
      { title: "Accepting dynamic currency conversion at a card terminal", body: "Choosing to be billed in your home currency abroad typically adds 3–6%. Always pay in the local currency and let your own bank convert." },
      { title: "Using an old rate for a budget", body: "Rates can move several percent in a month. For future travel or contracts, budget with a buffer or hedge the amount." },
    ],
    faqs: [
      { q: "What is the mid-market rate?", a: "The midpoint between global buy and sell prices — the rate you see on search engines. No retail provider gives you exactly this; the gap is their margin." },
      { q: "Why does my card charge more than the quoted rate?", a: "Networks apply their own daily rate, and many issuers add a foreign transaction fee of 1–3% on top." },
      { q: "How do I convert in the other direction?", a: "Divide by the rate. If 1 EUR = 1.09 USD, then 500 USD = 500 ÷ 1.09 = 458.72 EUR." },
      { q: "Is it cheaper to exchange cash before travelling?", a: "Airport and hotel counters are usually the most expensive option. A low-fee card used in local currency almost always beats physical exchange." },
      { q: "How should freelancers price in a foreign currency?", a: "Quote with a buffer of 2–4% for rate movement plus your payment processor's conversion cost, or invoice in your own currency where the client allows it." },
    ],
    related: ["inflation-calculator", "crypto-profit-calculator", "sales-tax-calculator", "salary-calculator", "discount-calculator"],
  },

  "inflation-calculator": {
    intro:
      "Inflation quietly rewrites every long-term plan. This calculator converts an amount between years so you can see what a salary, a price or a savings target is worth in real terms — the difference between having a million and having a million that buys what 450,000 buys today.",
    method: [
      "Future cost = present amount × (1 + i)^n, where i is the annual inflation rate and n the number of years.",
      "Past purchasing power runs the same formula in reverse: present value = past amount × (1 + i)^n from the earlier year to now.",
      "Real return = (1 + nominal) ÷ (1 + inflation) − 1. Subtracting the two rates is a decent approximation, but this is the exact form.",
    ],
    example: {
      title: "Worked example: 1,000,000 target 25 years out at 3% inflation",
      lines: [
        "Multiplier: 1.03^25 = 2.094.",
        "So 1,000,000 in 25 years buys what 1,000,000 ÷ 2.094 = 477,600 buys today.",
        "To have today's million in purchasing power, you need 2,094,000 nominal.",
        "At 5% inflation instead, the multiplier is 3.386 and you would need 3,386,000.",
        "A 7% nominal return against 3% inflation is a real return of 1.07 ÷ 1.03 − 1 = 3.88%.",
      ],
    },
    mistakes: [
      { title: "Planning retirement in nominal money", body: "A target set in today's currency and reached in 30 years' currency is not the same target. Inflate the goal or plan in real returns throughout." },
      { title: "Assuming your personal inflation matches the headline rate", body: "Rent, healthcare and education routinely outpace the general index. If your spending is weighted to those, use a higher rate." },
      { title: "Ignoring inflation on fixed-income holdings", body: "A 7% deposit taxed at 30% nets 4.9%. With 6% inflation, the real return is negative even though the balance rises." },
    ],
    faqs: [
      { q: "What inflation rate should I use for planning?", a: "Long-run averages of 2–3% suit developed markets and 5–6% many emerging ones. Test your plan at a rate two points higher than your base case." },
      { q: "How fast does inflation halve my money?", a: "Divide 72 by the rate. At 6%, purchasing power halves in about twelve years." },
      { q: "Does a salary rise below inflation mean a pay cut?", a: "In real terms, yes. A 4% raise with 6% inflation is a 1.9% reduction in purchasing power." },
      { q: "Which assets historically beat inflation?", a: "Broad equities and real assets have over long periods; cash reliably has not. That is the core argument for investing rather than only saving long-horizon money." },
      { q: "How do I compare prices across decades?", a: "Multiply the older price by the cumulative inflation factor between the two years, which is exactly what this calculator does." },
    ],
    related: ["compound-interest", "retirement-calculator", "savings-calculator", "salary-calculator", "rule-of-72-calculator"],
    post: {
      slug: "inflation-and-the-real-return",
      title: "Nominal vs real: the return that actually buys things",
      excerpt: "Your account balance grew 7%. Your purchasing power may not have grown at all. Here is how to tell.",
      readTime: "6 min",
      body: [
        "There are two numbers in every investment result and only one of them matters. The nominal return is what the statement says. The real return is what remains after inflation, and it is the only one that determines whether you can buy more than you could last year.",
        "The exact relationship is (1 + nominal) ÷ (1 + inflation) − 1. Subtracting the rates works as a quick approximation, but it drifts once inflation is high. A 7% nominal return with 3% inflation is a 3.88% real return, not 4%. With 12% inflation, a 15% return is only 2.68% real.",
        "This changes how deposits look. A fixed deposit at 7.1% sounds solid. Tax it at 30% and you keep 4.97%. Put 6% inflation next to that and the real return is negative one percent — the balance grows while the purchasing power shrinks. That is not a bad deposit; it is what cash does in an inflationary period.",
        "It also changes how salaries look. A 5% raise in a 7% inflation year is a real pay cut of nearly two percent. Two such years in a row and you are meaningfully poorer despite two raises.",
        "The practical discipline is to run every long-horizon plan twice: once in nominal money, to know what the account balance will read, and once in real money, to know what it will buy. If a retirement projection only exists in nominal form, it is almost certainly too optimistic.",
        "Finally, decide the inflation number deliberately rather than by default. Your own basket — rent, school fees, medical cover — may be inflating well above the headline index, and planning with the headline figure quietly understates what you need.",
      ],
      guides: ["retirement-number-inflation", "cagr-vs-average-return"],
    },
  },

  "emergency-fund-calculator": {
    intro:
      "An emergency fund is the difference between a bad month and a debt spiral. This calculator sizes yours from your actual essential expenses and the number of months you want covered, then shows how long it takes to build at your current savings rate.",
    method: [
      "Target = essential monthly expenses × months of cover. Essentials means rent or mortgage, utilities, food, transport, insurance, minimum debt payments and childcare — not discretionary spending.",
      "Months to build = (target − current savings) ÷ monthly contribution.",
      "Cover length should scale with income volatility: three months for stable dual income, six for single income, nine to twelve for freelance or commission-based earnings.",
    ],
    example: {
      title: "Worked example: 3,200 of essentials, six months of cover",
      lines: [
        "Essentials: 1,400 rent + 300 utilities + 600 food + 250 transport + 400 insurance + 250 minimum debt payments = 3,200.",
        "Target: 3,200 × 6 = 19,200.",
        "Current savings: 4,000. Gap: 15,200.",
        "At 600 a month, the gap closes in 25.3 months — call it just over two years.",
        "Raising the contribution to 900 shortens it to under 17 months.",
      ],
    },
    mistakes: [
      { title: "Sizing the fund on total spending instead of essentials", body: "In a genuine emergency, subscriptions, dining out and travel stop. Using full spending inflates the target and makes it feel unreachable." },
      { title: "Keeping the fund somewhere hard to reach", body: "This money should be liquid within a day or two. Locking it in a fixed deposit or investing it defeats the purpose — you need it precisely when markets are bad." },
      { title: "Investing the fund for a better return", body: "An emergency fund is insurance, not an investment. A 20% drawdown arriving in the same month as a job loss is the exact scenario it exists to prevent." },
    ],
    faqs: [
      { q: "How many months should my emergency fund cover?", a: "Three months if you have stable, redundant income; six for a single income household; nine to twelve if you are self-employed or your income is commission-based." },
      { q: "Should I build the fund before paying off debt?", a: "Build one month of cover first, then attack high-interest debt, then finish the fund. Without any buffer, the next surprise goes back on the card." },
      { q: "Where should I keep it?", a: "A high-yield savings account or liquid money market fund — instant or next-day access, capital stable, some interest." },
      { q: "Does an emergency fund count towards retirement savings?", a: "No. Treat them as separate pots; raiding retirement accounts for emergencies usually triggers penalties and permanent lost compounding." },
      { q: "When is it legitimate to use it?", a: "Job loss, medical costs, essential home or vehicle repairs. A planned purchase is a savings goal, not an emergency." },
    ],
    related: ["savings-calculator", "debt-to-income-calculator", "net-worth-calculator", "salary-calculator", "credit-card-payoff-calculator"],
  },

  "net-worth-calculator": {
    intro:
      "Net worth is the single number that summarises financial position: everything you own minus everything you owe. Income tells you the rate of flow; net worth tells you where you have actually arrived. This calculator totals both sides and shows the gap.",
    method: [
      "Net worth = total assets − total liabilities.",
      "Assets include cash, deposits, investments, retirement accounts, property at realistic market value, and vehicles at resale value — not purchase price.",
      "Liabilities include mortgage balance, car and personal loans, student debt, credit card balances and any tax owed. Use current balances, not original amounts.",
    ],
    example: {
      title: "Worked example: a typical mid-career balance sheet",
      lines: [
        "Assets: 18,000 cash + 145,000 retirement + 60,000 brokerage + 420,000 home + 14,000 car = 657,000.",
        "Liabilities: 298,000 mortgage + 9,000 car loan + 22,000 student loan + 3,500 credit cards = 332,500.",
        "Net worth = 657,000 − 332,500 = 324,500.",
        "Liquid net worth, excluding home and car: 78,000 − 34,500 = 43,500.",
        "Tracking both figures quarterly shows whether progress is real or just house-price movement.",
      ],
    },
    mistakes: [
      { title: "Valuing assets at what you paid", body: "A car bought for 30,000 three years ago is worth perhaps 16,000. Optimistic valuations produce a comfortable number that is not useful for decisions." },
      { title: "Counting home equity as available money", body: "Equity is real but illiquid, and selling costs 6–10% in fees and moving. Track liquid net worth alongside the headline figure." },
      { title: "Omitting debts that feel invisible", body: "Buy-now-pay-later balances, tax due, family loans and deferred interest all belong on the liability side." },
    ],
    faqs: [
      { q: "What is a good net worth for my age?", a: "One common benchmark is annual income × age ÷ 10. It is crude and ignores location and career stage, so treat your own trend line as the real measure." },
      { q: "Should retirement accounts count?", a: "Yes, at current balance. Note that pre-tax accounts will be reduced by tax on withdrawal, so their spendable value is lower." },
      { q: "How often should I recalculate?", a: "Quarterly is enough to see a trend without reacting to market noise. Same day of the quarter each time, so comparisons are clean." },
      { q: "Why is my net worth negative?", a: "Usually student debt or a new mortgage. It is normal early on; what matters is the direction of travel over a year or two." },
      { q: "What is liquid net worth?", a: "Net worth excluding your primary home, vehicles and anything you cannot convert to cash quickly. It is the better measure of financial resilience." },
    ],
    related: ["debt-to-income-calculator", "emergency-fund-calculator", "retirement-calculator", "savings-calculator", "investment-calculator"],
  },
};
