import type { ContentMap } from "./types";

/* Batch 1 — Finance. Each entry is written from a per-calculator brief:
   category + formula, real-world scenarios, calculator-specific mistakes,
   and the related questions people actually search. */

export const financeContent: ContentMap = {
  "mortgage-calculator": {
    intro:
      "A mortgage payment is rarely just principal and interest. This calculator adds property tax and homeowners insurance so the monthly figure matches what a lender will actually escrow — the number that matters when you are deciding between a 400,000 house with cheap taxes and a 360,000 house in a district that taxes twice as hard.",
    method: [
      "The loan itself is amortised: Monthly P&I = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is the price minus your down payment, r is the annual rate divided by 12, and n is the term in months.",
      "Tax and insurance are then divided by 12 and added on top, which is how a servicer builds the escrow portion of your bill. The result is a PITI figure: principal, interest, taxes, insurance.",
      "Because r is a monthly rate, a quoted 6.5% becomes 0.0054167 per month. Feeding 6.5 straight into the formula inflates the payment roughly twelvefold — the single most common arithmetic slip in mortgage maths.",
    ],
    example: {
      title: "Worked example: 400,000 home, 20% down, 6.5% over 30 years",
      lines: [
        "Loan amount: 400,000 − 80,000 down = 320,000.",
        "Monthly rate: 6.5 ÷ 12 ÷ 100 = 0.0054167. Payments: 30 × 12 = 360.",
        "P&I: 320,000 × 0.0054167 × 1.0054167^360 ÷ (1.0054167^360 − 1) ≈ 2,022 per month.",
        "Escrow: 3,600 property tax ÷ 12 = 300, plus 1,200 insurance ÷ 12 = 100.",
        "Total PITI ≈ 2,422 per month. Over the full term the interest alone comes to roughly 408,000 — more than the loan itself.",
      ],
    },
    mistakes: [
      {
        title: "Budgeting off P&I instead of PITI",
        body: "Taxes and insurance routinely add 15–25% to the payment. Buyers who shop on the P&I figure alone often find their approved price bracket shrinks once escrow is included.",
      },
      {
        title: "Assuming a bigger down payment always wins",
        body: "It lowers the payment, but draining your reserves to reach 20% can leave nothing for closing costs, moving, or the first repair. Compare the payment saving against the cost of having no cash buffer.",
      },
      {
        title: "Ignoring PMI below 20% equity",
        body: "Under 20% down, most lenders add private mortgage insurance. It is not part of the amortisation formula, so add it separately until your balance crosses the 80% loan-to-value line.",
      },
    ],
    faqs: [
      {
        q: "What does PITI stand for on a mortgage estimate?",
        a: "Principal, interest, taxes and insurance — the four parts of a typical escrowed monthly bill. Lenders qualify you on PITI, not on principal and interest alone.",
      },
      {
        q: "How much house can I afford on a 6.5% rate?",
        a: "Work backwards from your target payment. Most underwriters want housing costs under about 28% of gross income and total debt under 36%; the debt-to-income calculator makes that check quickly.",
      },
      {
        q: "Does paying extra each month actually help?",
        a: "Substantially, and early payments help most. An extra 200 a month on the example above clears the loan roughly five years early because each additional dollar removes decades of compounding interest.",
      },
      {
        q: "Why is my first statement almost all interest?",
        a: "Interest is charged on the outstanding balance, which is at its largest on day one. On a 320,000 loan at 6.5%, the first payment is about 1,733 interest and only 289 principal.",
      },
      {
        q: "Should I choose a 15-year or 30-year term?",
        a: "A 15-year term raises the payment by roughly 40% but cuts lifetime interest by more than half. Choose the shorter term only if the higher payment still leaves room for savings.",
      },
      {
        q: "Are property taxes fixed for the life of the loan?",
        a: "No. Assessments are re-run periodically, so the escrow portion drifts upward over time even when your rate is fixed.",
      },
    ],
    related: [
      "loan-calculator",
      "down-payment-calculator",
      "debt-to-income-calculator",
      "lease-payment-calculator",
      "interest-calculator",
    ],
  },

  "loan-calculator": {
    intro:
      "Most borrowing decisions come down to three numbers you control unevenly: principal, rate and tenure. This calculator shows what each lever does to the instalment and to the total cost of credit, which is the comparison that actually separates a good personal loan offer from a bad one.",
    method: [
      "Every fixed-instalment loan uses the same amortisation formula: Instalment = P × r × (1 + r)^n ÷ ((1 + r)^n − 1). P is the amount borrowed, r the periodic rate, n the number of periods.",
      "Total cost of credit = instalment × n − P. That subtraction is the figure worth optimising; lenders advertise the instalment because a longer tenure makes it look smaller while the interest total quietly grows.",
      "Rate and tenure do not move the total symmetrically. Cutting the rate by a point saves a modest amount; halving the tenure can cut interest by more than half.",
    ],
    example: {
      title: "Worked example: 500,000 at 8.5%, 20 years vs 10 years",
      lines: [
        "Monthly rate: 8.5 ÷ 1,200 = 0.0070833.",
        "Over 240 months the instalment is about 4,338, and total repayment is 1,041,000 — roughly 541,000 in interest.",
        "Over 120 months the instalment rises to about 6,199, but total repayment falls to 743,900 — about 243,900 in interest.",
        "The shorter term costs 1,861 more each month and saves close to 297,000 across the life of the loan.",
      ],
    },
    mistakes: [
      {
        title: "Comparing offers on the monthly figure",
        body: "A lower instalment stretched over more years is usually the more expensive loan. Always compare total repayment, and where possible the APR, which folds fees into the rate.",
      },
      {
        title: "Forgetting processing fees and insurance",
        body: "Origination fees, stamp duty and bundled credit insurance are often deducted from the disbursed amount, so you repay interest on money you never received.",
      },
      {
        title: "Treating prepayment as always free",
        body: "Some fixed-rate contracts charge 2–4% of the outstanding balance to settle early. Check the clause before planning a lump-sum payoff.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between flat and reducing-balance interest?",
        a: "Flat interest is charged on the original principal for the whole term; reducing-balance charges only on what you still owe. A 10% flat rate is roughly equivalent to 17–19% reducing, so never compare the two numbers directly.",
      },
      {
        q: "Does a longer tenure ever make sense?",
        a: "Yes, when cash-flow safety matters more than total cost — for example while income is uncertain. You can always prepay later, provided the contract allows it.",
      },
      {
        q: "How does credit score change the rate I am offered?",
        a: "Score bands drive pricing tiers. On a 500,000 loan, a two-point rate difference between tiers is worth roughly 60,000 over 20 years, which is why a few months of score repair can pay for itself.",
      },
      {
        q: "Should I take a shorter tenure or invest the difference?",
        a: "Compare the loan rate with the after-tax return you realistically expect. Paying down 8.5% debt is a guaranteed 8.5% return; few portfolios beat that reliably.",
      },
      {
        q: "What does amortisation actually mean?",
        a: "It is the schedule that splits each equal payment into interest on the current balance and principal repayment. The split shifts toward principal as the balance falls.",
      },
    ],
    related: [
      "loan-emi-calculator",
      "mortgage-calculator",
      "car-loan-calculator",
      "interest-calculator",
      "debt-to-income-calculator",
    ],
  },

  "loan-emi-calculator": {
    intro:
      "An EMI — equated monthly instalment — is what a lender quotes when you ask what a loan will cost each month. This tool is built for the moment you are comparing two sanction letters and need to see the instalment, the interest share and the amortisation split side by side.",
    method: [
      "EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1). The word 'equated' matters: the payment is constant, but its composition is not.",
      "Interest for any month = outstanding balance × r. Principal for that month = EMI − interest. Subtract that principal, and the next month's interest is smaller.",
      "That is why the interest share falls slowly at first. On a 20-year loan, the halfway point of the balance arrives years after the halfway point of the calendar.",
    ],
    example: {
      title: "Worked example: first three months of a 1,000,000 loan at 9% over 15 years",
      lines: [
        "r = 9 ÷ 1,200 = 0.0075, n = 180. EMI ≈ 10,143.",
        "Month 1: interest = 1,000,000 × 0.0075 = 7,500; principal = 2,643; balance = 997,357.",
        "Month 2: interest = 7,480; principal = 2,663; balance = 994,694.",
        "Month 3: interest = 7,460; principal = 2,683; balance = 992,011.",
        "After a full year, only about 33,000 of the principal is gone while roughly 89,700 has gone to interest.",
      ],
    },
    mistakes: [
      {
        title: "Using the annual rate directly",
        body: "The formula needs a monthly rate. Entering 9 instead of 0.0075 produces a nonsense instalment several times larger than reality.",
      },
      {
        title: "Assuming a floating EMI stays fixed",
        body: "On floating-rate loans, lenders usually hold the EMI and extend the tenure when rates rise. Your payment looks stable while the loan silently gets longer.",
      },
      {
        title: "Mixing moratorium periods into the schedule",
        body: "Interest accrues during a payment holiday and is capitalised. The post-moratorium EMI is calculated on a larger balance than you originally borrowed.",
      },
    ],
    faqs: [
      {
        q: "Is EMI the same as a monthly instalment on any loan?",
        a: "Functionally yes — EMI is the term used in South Asian and Middle Eastern lending for the level payment that Western lenders simply call the monthly payment.",
      },
      {
        q: "How can I reduce my EMI without refinancing?",
        a: "Make a part-prepayment and ask the lender to recalculate the instalment rather than shorten the tenure. Many default to keeping the EMI unchanged unless you specify.",
      },
      {
        q: "What is an EMI moratorium?",
        a: "A deferral of payments, not a waiver. Interest keeps accruing on the outstanding balance and is added to the principal.",
      },
      {
        q: "Why does my bank's EMI differ slightly from this result?",
        a: "Lenders round to the rupee or cent, may charge interest on a daily basis, and sometimes collect a broken-period interest amount for the days between disbursal and the first due date.",
      },
      {
        q: "Does a pre-EMI option save money?",
        a: "No. Paying only interest until full disbursal keeps the principal untouched, so the total cost rises even though early payments feel lighter.",
      },
    ],
    related: [
      "loan-calculator",
      "emi-calculator",
      "car-loan-calculator",
      "mortgage-calculator",
      "credit-card-payoff-calculator",
    ],
    post: {
      slug: "emi-vs-total-interest",
      title: "EMI vs Total Interest: The Number Lenders Don't Advertise",
      excerpt: "Why two loans with the same instalment can differ by hundreds of thousands in interest, and how to read an amortisation schedule properly.",
      readTime: "5 min read",
      body: [
        "Ask a lender what a loan costs and you will be told the instalment. It is a useful number for budgeting and a terrible number for comparison, because tenure hides inside it.",
        "Take two offers on 800,000. Offer A charges 9% for 12 years and asks 9,067 a month. Offer B charges 10.25% for 20 years and asks 7,857. Offer B looks cheaper by 1,210 every month. Over the full term, A repays 1,305,600 while B repays 1,885,700 — the 'cheaper' loan costs 580,000 more.",
        "The reason is visible in the amortisation split. Interest each month equals the outstanding balance multiplied by the monthly rate, so anything that keeps the balance high for longer multiplies the total. Stretching a term does exactly that.",
        "A practical habit: before signing, write down instalment × months and subtract the amount borrowed. That single subtraction is the true price of the credit, and it is the figure that changes decisions.",
        "One caveat worth respecting. A lower instalment genuinely buys safety. If your income is volatile, the longer loan with a prepayment clause can be the smarter risk decision even though it is the more expensive one on paper — provided you actually prepay when cash allows.",
      ],
      guides: ["loan-calculator-guide", "what-is-compound-interest", "mortgage-guide"],
    },
  },

  "emi-calculator": {
    intro:
      "This is the quick version: principal, rate, tenure, instalment. It exists for the moments when you are on a showroom floor or a phone call with a relationship manager and need one number fast, without filling in escrow or fee fields.",
    method: [
      "EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), with r as the monthly rate and n as the number of monthly payments.",
      "Total interest = EMI × n − P. The tool shows both so the instalment is never read in isolation.",
      "For a rough mental check, an instalment on a 10-year loan at around 9% lands near 1.27% of the principal per month — useful for sanity-checking a quote on the spot.",
    ],
    example: {
      title: "Worked example: 250,000 personal loan at 12% over 5 years",
      lines: [
        "r = 12 ÷ 1,200 = 0.01, n = 60.",
        "(1.01)^60 ≈ 1.8167.",
        "EMI = 250,000 × 0.01 × 1.8167 ÷ 0.8167 ≈ 5,561.",
        "Total repayment = 5,561 × 60 = 333,660, so interest is about 83,660 — a third of the amount borrowed.",
      ],
    },
    mistakes: [
      {
        title: "Quoting tenure in years into a monthly formula",
        body: "n must be months. Five years is 60, not 5; the mismatch is the most frequent cause of an implausible instalment.",
      },
      {
        title: "Ignoring the difference between rate and APR",
        body: "APR includes processing fees. On small, short loans a 2% fee can add more than a percentage point of effective cost.",
      },
    ],
    faqs: [
      {
        q: "What does EMI stand for?",
        a: "Equated monthly instalment — a fixed payment covering interest on the current balance plus a slice of principal.",
      },
      {
        q: "Can I calculate EMI without a formula?",
        a: "Only approximately. Simple-interest shortcuts understate the payment because they ignore the reducing balance, so use the amortisation formula for anything you plan to sign.",
      },
      {
        q: "How is EMI different from a mortgage payment?",
        a: "The arithmetic is identical. A mortgage bill usually adds escrowed taxes and insurance on top of the EMI-equivalent principal and interest.",
      },
      {
        q: "Does the first EMI include extra charges?",
        a: "Often. Lenders may collect interest for the broken period between disbursal and the first due date, so the opening debit can exceed the quoted instalment.",
      },
    ],
    related: ["loan-emi-calculator", "loan-calculator", "interest-calculator", "car-loan-calculator", "simple-interest-calculator"],
  },

  "car-loan-calculator": {
    intro:
      "Car finance goes wrong in a specific way: the vehicle depreciates faster than the loan amortises. This calculator gives you the instalment and total interest for a given price, down payment and term so you can see whether a 72-month deal leaves you underwater for years.",
    method: [
      "The instalment uses the same amortisation formula as any fixed loan: Payment = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), with P as price minus down payment and trade-in.",
      "Depreciation runs on a separate track. A typical new car loses 20% in year one and roughly 15% a year after, so compare the balance owed against the resale value, not against the sticker price.",
      "Negative equity happens whenever the outstanding balance exceeds market value. Longer terms and small down payments both widen that gap.",
    ],
    example: {
      title: "Worked example: 30,000 car, 3,000 down, 7.9% over 72 months",
      lines: [
        "Financed amount: 27,000. r = 7.9 ÷ 1,200 = 0.0065833, n = 72.",
        "Payment ≈ 471 per month; total repayment ≈ 33,900, so interest is about 6,900.",
        "After two years you have paid roughly 11,300 and still owe about 19,300.",
        "The car is worth roughly 20,400 by then — barely 1,100 of equity after two years of payments.",
      ],
    },
    mistakes: [
      {
        title: "Shopping by monthly payment",
        body: "Dealers can hit almost any monthly target by extending the term. A 96-month loan feels affordable and can leave you owing more than the car is worth halfway through.",
      },
      {
        title: "Rolling negative equity into the new loan",
        body: "Adding an old balance to a new purchase means financing a car you no longer own, at a rate applied to the combined total.",
      },
      {
        title: "Leaving out registration, tax and insurance",
        body: "On-road cost typically runs 8–12% above the quoted price, and it is usually financed too if you do not pay it separately.",
      },
    ],
    faqs: [
      {
        q: "Is a 72-month car loan a bad idea?",
        a: "It is not automatically wrong, but it extends the window where you owe more than the vehicle is worth. A larger down payment shortens that window more effectively than a lower rate.",
      },
      {
        q: "How much should I put down on a car?",
        a: "Around 20% keeps you close to break-even against first-year depreciation. Below 10%, negative equity for the first two to three years is likely.",
      },
      {
        q: "Should I take dealer finance or a bank loan?",
        a: "Compare APR, not rate. Subsidised manufacturer rates can genuinely beat banks, but often only when you forgo a cash rebate — price the rebate into the comparison.",
      },
      {
        q: "Does leasing work out cheaper than buying?",
        a: "Monthly cost is usually lower because you only pay for the depreciation you use, but you own nothing at the end. The lease payment calculator makes that trade explicit.",
      },
      {
        q: "Can I pay off a car loan early?",
        a: "Usually yes, and it is straightforward on reducing-balance contracts. Watch for precomputed-interest agreements, where early settlement saves far less than you would expect.",
      },
    ],
    related: ["loan-calculator", "lease-payment-calculator", "down-payment-calculator", "fuel-cost-calculator", "loan-emi-calculator"],
    post: {
      slug: "car-loan-depreciation-trap",
      title: "The Car Loan Trap: When Your Loan Outlasts Your Car's Value",
      excerpt: "Long terms make cars feel affordable and quietly leave buyers owing more than the vehicle is worth. Here's the arithmetic behind negative equity.",
      readTime: "4 min read",
      body: [
        "Vehicle finance has a structural problem that home finance does not: the asset falls in value while the debt is still large. Houses generally hold or gain value over a mortgage term. Cars almost never do.",
        "Consider a 24,000 hatchback financed over 84 months at 8% with nothing down. The payment is a comfortable-looking 374. Depreciation, though, does not care about the schedule. At roughly 20% in the first year and 15% a year after, the car is worth about 19,200 after twelve months while the loan balance is still near 21,600 — a 2,400 hole.",
        "That gap matters the moment something forces a sale: a job move, a growing family, or a write-off after an accident. Insurers pay market value, not the loan balance, which is precisely why gap cover exists as a product.",
        "Two levers close the gap and they work in different directions. A larger down payment removes debt immediately; a shorter term makes the balance fall faster than the value does. The rate barely moves the picture — going from 9% to 7% on this loan changes the monthly payment by about 22.",
        "Worth noting: depreciation curves vary widely by model and market. Used cars two to three years old have already taken the steepest hit, which is why financing one is far less likely to put you underwater.",
        "Run your own numbers before you sign, then check the on-road extras separately — registration and insurance are the costs most often financed by accident.",
      ],
      guides: ["loan-calculator-guide", "emi-vs-total-interest", "mortgage-guide"],
    },
  },

  "credit-card-payoff-calculator": {
    intro:
      "Credit card debt behaves differently from a loan because you choose the payment. This calculator shows how long a balance takes to clear at a fixed monthly amount, and how much of that amount is being swallowed by interest before it touches the balance.",
    method: [
      "Each month, interest = balance × APR ÷ 12. Whatever remains of your payment reduces the balance: new balance = balance + interest − payment.",
      "The calculation loops until the balance reaches zero, which is why the payoff time responds so sharply to small increases in payment.",
      "Minimum payments are typically 1–3% of the balance plus interest. Because the minimum shrinks as the balance shrinks, it stretches the payoff over years.",
    ],
    example: {
      title: "Worked example: 5,000 balance at 22% APR",
      lines: [
        "Monthly interest rate: 22 ÷ 12 = 1.833%. First month's interest = 5,000 × 0.01833 = 91.67.",
        "Paying 150: only 58.33 reduces the balance. Clearing the debt takes about 47 months and roughly 2,000 in interest.",
        "Paying 250: 158.33 hits the balance in month one, and the debt clears in about 24 months for roughly 1,000 in interest.",
        "An extra 100 a month halves both the time and the interest.",
      ],
    },
    mistakes: [
      {
        title: "Paying the minimum and assuming progress",
        body: "At a 2% minimum on a 22% card, most of the payment is interest and fees. A 5,000 balance can take well over a decade to clear this way.",
      },
      {
        title: "Believing new purchases share the promo rate",
        body: "Cards apply promotional 0% terms to specific balances. New spending often accrues at the standard purchase APR immediately, and payments may be allocated to the cheapest balance first.",
      },
      {
        title: "Overlooking the grace period",
        body: "Carrying any balance usually forfeits the interest-free window on new purchases, so the card starts charging from the transaction date.",
      },
    ],
    faqs: [
      {
        q: "How long will it take to pay off my credit card?",
        a: "It depends entirely on the fixed amount you commit to. Enter a payment above the minimum and hold it steady — the payoff time falls much faster than the payment rises.",
      },
      {
        q: "Should I use the snowball or avalanche method?",
        a: "Avalanche (highest APR first) costs less mathematically. Snowball (smallest balance first) clears accounts sooner and keeps motivation up. The gap is usually small, so the method you will actually finish wins.",
      },
      {
        q: "Does a balance transfer really help?",
        a: "It can, if you clear the balance inside the 0% window. Factor in the 3–5% transfer fee and check what rate applies afterwards.",
      },
      {
        q: "Why did my balance grow even though I paid?",
        a: "Interest is added before your payment is applied, and cash advances or fees can exceed a small payment. If the payment is below the monthly interest, the balance rises.",
      },
      {
        q: "Is it better to pay down cards or build savings first?",
        a: "A small emergency buffer prevents new card debt, so most planners build one month of essentials, then attack the cards, then finish the fund.",
      },
    ],
    related: ["debt-to-income-calculator", "interest-calculator", "emergency-fund-calculator", "loan-calculator", "savings-calculator"],
    post: {
      slug: "why-minimum-payments-never-end",
      title: "Why Credit Card Minimum Payments Never Seem to End",
      excerpt: "The minimum payment is designed to shrink as your balance shrinks. That single feature is what turns a modest balance into a decade of payments.",
      readTime: "4 min read",
      body: [
        "Card statements print a minimum payment because regulators require an option that keeps the account current. What they do not print prominently is that the minimum is a percentage of the balance, so it falls as you pay — and the payoff date recedes with it.",
        "Here is the mechanism on a 3,000 balance at 24% APR with a 2% minimum. Month one: interest is 60, the minimum is 60, and about nothing touches the principal. As the balance drifts down, so does the required payment, keeping the interest-to-principal ratio stubbornly high. Left alone, the account can stay open for well over fifteen years.",
        "Now fix the payment instead. Committing to a flat 120 a month on that same balance clears it in roughly 32 months with about 800 in interest. Nothing changed except refusing to let the payment shrink.",
        "The historical note is telling: minimum payment formulas were lowered across the industry in the 1990s, and several regulators have since pushed them back up precisely because low minimums extend debt so effectively.",
        "One limitation to keep in mind. Fixed-payment maths assumes you stop adding purchases. Every new charge resets the balance the interest is calculated on, which is why pausing the card matters as much as raising the payment.",
      ],
      guides: ["loan-calculator-guide", "emi-vs-total-interest", "what-is-compound-interest"],
    },
  },

  "compound-interest": {
    intro:
      "Compounding is the difference between saving and investing. This calculator lets you vary the rate, the horizon and — crucially — the compounding frequency, which is the input most people leave at 'annual' without realising how much it moves the final figure.",
    method: [
      "A = P × (1 + r/n)^(n × t). P is the starting amount, r the annual rate as a decimal, n the compounding periods per year, and t the years.",
      "Interest earned = A − P. Because the exponent is n × t, both frequency and time work multiplicatively rather than additively.",
      "Continuous compounding is the theoretical ceiling: A = P × e^(r × t). Daily compounding already sits very close to it.",
    ],
    example: {
      title: "Worked example: 100,000 at 10% for 10 years, by frequency",
      lines: [
        "Annual (n = 1): 100,000 × 1.1^10 = 259,374.",
        "Quarterly (n = 4): 100,000 × 1.025^40 = 268,506.",
        "Monthly (n = 12): 100,000 × (1 + 0.10/12)^120 = 270,704.",
        "Daily (n = 365): 271,790. Same rate, same decade — an 12,400 spread purely from frequency.",
      ],
    },
    mistakes: [
      {
        title: "Confusing nominal rate with effective yield",
        body: "10% compounded monthly is an effective 10.47%. When comparing deposits, compare effective annual yields or the numbers are not the same units.",
      },
      {
        title: "Entering the rate as a whole number",
        body: "The formula needs 0.10, not 10. Getting this wrong produces absurd growth that is easy to spot but easy to publish.",
      },
      {
        title: "Ignoring inflation and tax",
        body: "A 10% nominal return with 6% inflation is roughly 3.8% real growth. Compounding works on the real rate when you are measuring purchasing power.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between simple and compound interest?",
        a: "Simple interest is calculated only on the original principal; compound interest is calculated on principal plus accumulated interest. Over long horizons the gap becomes enormous.",
      },
      {
        q: "How often does compounding actually matter?",
        a: "Most at high rates and long horizons. At 3% over two years the frequency is nearly irrelevant; at 12% over 25 years it changes the outcome materially.",
      },
      {
        q: "What is the rule of 72?",
        a: "Divide 72 by the rate to estimate the doubling time. At 9%, money doubles in roughly eight years — a useful mental check on any projection.",
      },
      {
        q: "Does compounding work against me on debt?",
        a: "Exactly the same way. Unpaid credit card interest compounds monthly, which is why revolving balances grow faster than borrowers expect.",
      },
      {
        q: "Should I add regular contributions?",
        a: "Contributions usually dominate the outcome in the first decade, and compounding dominates later. A SIP calculator models the recurring-deposit version of this formula.",
      },
    ],
    related: ["sip-calculator", "investment-calculator", "savings-calculator", "cagr-calculator", "rule-of-72-calculator"],
  },

  "sip-calculator": {
    intro:
      "A systematic investment plan puts a fixed amount to work every month, so each instalment compounds for a different length of time. This calculator handles that staircase of contributions and shows how much of the final corpus is your money versus growth.",
    method: [
      "Future value of a monthly SIP = M × [((1 + i)^n − 1) ÷ i] × (1 + i), where M is the monthly amount, i the monthly return (annual ÷ 12), and n the number of instalments.",
      "The trailing (1 + i) assumes each instalment is invested at the start of the month. Total invested is simply M × n, so growth = future value − M × n.",
      "The first instalment compounds for the whole horizon and the last for a single month, which is why extending a SIP by a few years changes the corpus so dramatically.",
    ],
    example: {
      title: "Worked example: 10,000 a month for 15 years at 12%",
      lines: [
        "i = 12 ÷ 1,200 = 0.01, n = 180.",
        "(1.01)^180 ≈ 5.996, so ((5.996 − 1) ÷ 0.01) × 1.01 ≈ 504.6.",
        "Future value ≈ 10,000 × 504.6 = 5,046,000.",
        "Total invested = 10,000 × 180 = 1,800,000, so about 3,246,000 is growth — nearly two-thirds of the corpus.",
        "Run the same SIP for 20 years and the corpus roughly doubles to about 9,990,000 on only 600,000 more invested.",
      ],
    },
    mistakes: [
      {
        title: "Treating the assumed return as a promise",
        body: "Equity returns are not delivered in smooth monthly instalments. Model a pessimistic case as well; a 12% assumption dropping to 9% cuts the example corpus by roughly a third.",
      },
      {
        title: "Forgetting to step up contributions",
        body: "A flat SIP loses ground to inflation. Raising the amount 10% a year typically adds more to the corpus than chasing an extra percentage point of return.",
      },
      {
        title: "Stopping during drawdowns",
        body: "Pausing a SIP in a falling market removes the instalments that buy the most units, which is the mechanism that makes averaging work in the first place.",
      },
    ],
    faqs: [
      {
        q: "Is SIP better than a lump-sum investment?",
        a: "A lump sum wins mathematically when markets rise steadily, because the money is invested longer. SIP wins on behaviour and on volatile markets, since it removes timing decisions.",
      },
      {
        q: "What return should I assume for a SIP?",
        a: "Use a range rather than a point estimate — commonly 10–12% for diversified equity over long horizons, 6–8% for hybrid funds. Always check the projection against a lower figure.",
      },
      {
        q: "Does SIP guarantee a profit?",
        a: "No. Rupee-cost averaging reduces timing risk, not market risk. Short horizons can still end below the invested amount.",
      },
      {
        q: "What is a step-up SIP?",
        a: "A plan that raises the monthly amount by a fixed percentage each year, keeping contributions in line with income growth.",
      },
      {
        q: "How is SIP different from a recurring deposit?",
        a: "A recurring deposit pays a contracted interest rate with no capital risk; a SIP buys market-linked units whose value fluctuates.",
      },
    ],
    related: ["compound-interest", "investment-calculator", "cagr-calculator", "retirement-calculator", "fd-calculator"],
    post: {
      slug: "sip-math-explained",
      title: "SIP Maths: Why the Last Five Years Do the Heavy Lifting",
      excerpt: "Each monthly instalment compounds for a different length of time. Understanding that staircase explains why quitting a SIP early costs so much.",
      readTime: "5 min read",
      body: [
        "A systematic investment plan is not one investment; it is a stack of them. The instalment you paid in year one has been compounding for the entire horizon, while the one you paid last month has barely started. Averaging that staircase is what the SIP formula does.",
        "The consequence is that growth arrives late and unevenly. Take 5,000 a month at an assumed 11%. After ten years the corpus is roughly 1,088,000 on 600,000 invested — growth of 488,000. Push to fifteen years and it reaches about 2,510,000 on 900,000 invested. Half the extra corpus came from five extra years of contributions; the other half came from the earlier instalments finally compounding on a large base.",
        "This is also why the emotional test of a SIP falls in the middle years, when the balance is large enough for a market drop to feel expensive but not yet large enough for compounding to dominate.",
        "Some real-world context: rupee-cost averaging came out of dollar-cost averaging research from the 1940s, and its benefit was never about maximising returns. It was about removing the timing decision that causes most investors to underperform the funds they own.",
        "The honest limitation is horizon. Over three years, a SIP into equity can easily finish below the amount invested. The formula projects growth; it does not promise it.",
      ],
      guides: ["what-is-compound-interest", "loan-calculator-guide", "emi-vs-total-interest"],
    },
  },

  "cagr-calculator": {
    intro:
      "CAGR answers a narrow question well: if an investment had grown at one steady rate from start to finish, what would that rate have been? Analysts use it to compare holdings with different horizons, and it is the fairest single number for a five-year fund return.",
    method: [
      "CAGR = (Ending value ÷ Beginning value)^(1 ÷ years) − 1, expressed as a percentage.",
      "The exponent is the reciprocal of the holding period, which is what converts total growth into an annualised rate.",
      "For periods that are not whole years, use the exact fraction — 30 months is 2.5, not 2 or 3.",
    ],
    example: {
      title: "Worked example: 150,000 grows to 265,000 in 6 years",
      lines: [
        "Ratio: 265,000 ÷ 150,000 = 1.7667.",
        "Exponent: 1 ÷ 6 = 0.16667.",
        "1.7667^0.16667 ≈ 1.0993, so CAGR ≈ 9.93%.",
        "Check: 150,000 × 1.0993^6 ≈ 265,000. Total growth was 76.7%, but the annualised figure is under 10%.",
      ],
    },
    mistakes: [
      {
        title: "Reading CAGR as the return you experienced",
        body: "It is a smoothed rate. The same 9.93% CAGR could hide a 40% crash and a 60% recovery; volatility disappears entirely from the number.",
      },
      {
        title: "Averaging annual returns instead",
        body: "The arithmetic mean of +50% and −50% is zero, but 100 becomes 75. Growth rates compound, so they must be combined geometrically.",
      },
      {
        title: "Ignoring cash flows",
        body: "CAGR assumes one deposit and one withdrawal. If you added money along the way, XIRR or a money-weighted return is the correct measure.",
      },
    ],
    faqs: [
      {
        q: "What is a good CAGR for an investment?",
        a: "Judge it against a benchmark and the risk taken, not an absolute figure. Beating a broad index over the same window matters more than the raw number.",
      },
      {
        q: "How is CAGR different from absolute return?",
        a: "Absolute return is total growth over the whole period; CAGR converts that into a per-year rate so different holding periods can be compared.",
      },
      {
        q: "Can CAGR be negative?",
        a: "Yes. If the ending value is lower than the beginning value, the formula returns a negative annualised rate.",
      },
      {
        q: "Should I use CAGR for a SIP?",
        a: "No — SIPs involve many cash flows, so XIRR is the appropriate measure. CAGR would overstate or understate depending on when contributions landed.",
      },
      {
        q: "Is CAGR the same as ROI?",
        a: "ROI is total gain relative to cost and ignores time. CAGR is ROI annualised, which is why a 76% ROI over six years is only about 10% a year.",
      },
    ],
    related: ["roi-calculator", "compound-interest", "investment-calculator", "npv-calculator", "rule-of-72-calculator"],
    post: {
      slug: "cagr-vs-average-return",
      title: "CAGR vs Average Return: The Mistake That Flatters Every Portfolio",
      excerpt: "Averaging yearly percentages makes volatile investments look better than they were. Geometric growth is the only honest way to combine returns.",
      readTime: "4 min read",
      body: [
        "Investment marketing loves the arithmetic mean. Add the yearly returns, divide by the number of years, and volatility quietly turns into a flattering headline.",
        "The clearest demonstration uses two years. A fund gains 60% then loses 40%. The average return is +10% a year. Reality: 10,000 becomes 16,000, then 9,600 — a loss. The compound annual growth rate is (9,600 ÷ 10,000)^(1/2) − 1, or about −2.02% a year, which is the number that matches your balance.",
        "The gap between the two measures widens with volatility, and it never favours the investor. That is a mathematical property, not a market opinion: the geometric mean of a set of positive numbers is always less than or equal to the arithmetic mean, with equality only when every number is identical.",
        "Where CAGR falls short is in describing the ride. A steady 8% and a wild sequence averaging 8% geometrically produce the same endpoint and completely different experiences, and only one of them is easy to hold through. Pair the CAGR with a look at the worst single year before drawing conclusions.",
        "If you added or withdrew money during the period, neither figure applies. Use XIRR, which weights each cash flow by how long it was invested.",
      ],
      guides: ["what-is-compound-interest", "sip-math-explained", "loan-calculator-guide"],
    },
  },

  "roi-calculator": {
    intro:
      "Return on investment is the workhorse ratio for judging whether something was worth doing — a rental renovation, an ad campaign, a piece of machinery. It is simple by design, and the simplicity is exactly where it misleads if you forget what it leaves out.",
    method: [
      "ROI = (Gain − Cost) ÷ Cost × 100. Gain is everything the investment returned; Cost is everything you put in, including fees and your own outlay of time if you price it.",
      "The result is a percentage of the amount risked, with no reference to how long the money was tied up.",
      "To compare projects of different lengths, annualise: (1 + ROI)^(1 ÷ years) − 1, which is simply CAGR.",
    ],
    example: {
      title: "Worked example: a 12,000 kitchen refit on a rental",
      lines: [
        "Cost: 12,000 materials and labour, plus 900 in lost rent during the work = 12,900.",
        "Return: rent rises from 1,450 to 1,610 a month, worth 1,920 a year.",
        "After three years the gain is 5,760. ROI = (5,760 − 0) ÷ 12,900 × 100 = 44.7% on the outlay so far.",
        "Annualised, that is 1.447^(1/3) − 1 ≈ 13.1% a year — a very different impression from '45% return'.",
      ],
    },
    mistakes: [
      {
        title: "Leaving time out of the comparison",
        body: "A 45% ROI over three years and a 45% ROI over ten months are not comparable. Annualise before ranking options.",
      },
      {
        title: "Undercounting the cost side",
        body: "Fees, taxes, downtime and your own unpaid hours belong in Cost. Excluding them is the most common way ROI gets inflated.",
      },
      {
        title: "Counting revenue as gain",
        body: "Gain is net of the costs required to earn it. Using gross revenue on a marketing campaign can turn a loss into an apparent success.",
      },
    ],
    faqs: [
      {
        q: "What is a good ROI?",
        a: "It depends on the alternative. If an index fund would have returned 9% a year for the same period at lower risk, a project returning 6% annualised destroyed value even with a positive ROI.",
      },
      {
        q: "How do I calculate ROI on marketing spend?",
        a: "Use gross profit from the campaign, not revenue: (profit − spend) ÷ spend. Attribution windows matter, so fix the period before you measure.",
      },
      {
        q: "What is the difference between ROI and NPV?",
        a: "ROI is a ratio that ignores timing; NPV discounts each future cash flow to today's value. For multi-year projects, NPV is the more rigorous test.",
      },
      {
        q: "Can ROI be over 100%?",
        a: "Yes — it simply means the gain exceeded the amount invested. It says nothing about how long that took.",
      },
      {
        q: "Should ROI include inflation?",
        a: "For horizons beyond a couple of years, deflating the gain gives a real ROI that better reflects purchasing power.",
      },
    ],
    related: ["cagr-calculator", "npv-calculator", "profit-calculator", "break-even-calculator", "investment-calculator"],
    post: {
      slug: "roi-what-it-hides",
      title: "ROI Is a Useful Number That Hides Two Important Things",
      excerpt: "Return on investment ignores time and risk. Both omissions can turn a bad decision into a persuasive slide.",
      readTime: "4 min read",
      body: [
        "ROI earned its popularity honestly. One subtraction and one division give a figure anyone can interpret, which is why it appears in board packs, property listings and campaign reports alike.",
        "The first omission is time. A shop refit costing 40,000 that adds 26,000 of profit shows a 65% ROI whether it took eight months or six years. Annualised, those are wildly different decisions: about 105% a year in the first case and roughly 8.7% in the second. The fix is one step — raise (1 + ROI) to the power of 1 divided by the number of years.",
        "The second omission is risk. ROI treats a government bond and a speculative product launch identically if both return 12%. Any serious comparison has to ask what could have gone wrong, and how much capital was exposed while you waited.",
        "There is also a definitional trap worth naming. Because both 'gain' and 'cost' are chosen by whoever builds the model, ROI is easy to flatter — leave out your own labour, count revenue instead of profit, ignore the fees, and a marginal project starts to look excellent.",
        "Use ROI as a first screen, then test survivors with an annualised rate and, for anything multi-year, a discounted cash-flow view.",
      ],
      guides: ["cagr-vs-average-return", "what-is-compound-interest", "sip-math-explained"],
    },
  },

  "retirement-calculator": {
    intro:
      "Retirement planning is two calculations chained together: how large a pot your contributions will build, and how long that pot survives your withdrawals. This tool joins them so you can see whether a plan holds up rather than just admiring a corpus figure.",
    method: [
      "Accumulation uses the future value of a growing series: each monthly contribution compounds at i = annual return ÷ 12 for the months remaining until you stop working.",
      "Drawdown reverses it. A sustainable annual withdrawal is often approximated as 4% of the starting corpus, adjusted for inflation each year — a rule of thumb derived from historical market sequences, not a guarantee.",
      "Target corpus ≈ annual spending in retirement ÷ withdrawal rate. Spending 40,000 a year at a 4% rate implies roughly 1,000,000.",
    ],
    example: {
      title: "Worked example: age 35, retiring at 60",
      lines: [
        "Current savings 200,000, contributing 1,200 a month, assumed 8% return.",
        "Existing savings grow to 200,000 × 1.08^25 ≈ 1,370,000.",
        "Contributions: 1,200 × [((1 + 0.00667)^300 − 1) ÷ 0.00667] ≈ 1,140,000.",
        "Projected corpus ≈ 2,510,000. At a 4% withdrawal rate that supports about 100,400 in the first year.",
        "Adjusted for 3% inflation over 25 years, that 100,400 buys what roughly 48,000 buys today — the check most projections skip.",
      ],
    },
    mistakes: [
      {
        title: "Comparing future money to today's prices",
        body: "A seven-figure corpus in 2050 is not a seven-figure lifestyle. Either inflate your spending target or discount the corpus, but do one of them.",
      },
      {
        title: "Using the same return before and after retiring",
        body: "Portfolios usually shift toward bonds near retirement, lowering expected returns. Modelling 8% through a 30-year drawdown overstates safety.",
      },
      {
        title: "Ignoring sequence-of-returns risk",
        body: "A poor market in the first few retirement years does far more damage than the same market later, because withdrawals are taken from a shrinking base.",
      },
    ],
    faqs: [
      {
        q: "How much do I need to retire?",
        a: "Start from spending, not from a headline number. Annual retirement spending divided by a withdrawal rate of 3.5–4% gives a defensible target.",
      },
      {
        q: "Is the 4% rule still valid?",
        a: "It remains a reasonable planning anchor, but it came from a specific historical dataset and a 30-year horizon. Longer retirements or lower expected returns argue for 3–3.5%.",
      },
      {
        q: "What return should I assume?",
        a: "Model a range. A balanced portfolio at 6–8% nominal is a common planning band, and it is worth re-running the plan at two points lower.",
      },
      {
        q: "Does starting ten years earlier really matter that much?",
        a: "Enormously. At 8%, money invested at 30 has roughly double the growth multiple of money invested at 40, because the exponent is years.",
      },
      {
        q: "Should I count a state pension or social security?",
        a: "Include it, but as a reduction in the spending your portfolio must cover rather than as part of the corpus.",
      },
    ],
    related: ["compound-interest", "sip-calculator", "investment-calculator", "net-worth-calculator", "inflation-calculator"],
    post: {
      slug: "retirement-number-inflation",
      title: "Your Retirement Number Is Probably in the Wrong Currency",
      excerpt: "A million in 2050 is not a million today. Here's how to keep a retirement projection honest about purchasing power.",
      readTime: "5 min read",
      body: [
        "Retirement projections fail in a quiet way. The arithmetic is usually right; the units are wrong. A corpus is expressed in future money while the lifestyle it is meant to fund is imagined in today's prices.",
        "The correction is a single division. At 3% inflation, prices roughly double every 24 years, so a projected 1,800,000 in 2050 has the purchasing power of about 860,000 now. Plans that felt generous often turn merely adequate at that point — which is far better learned in a spreadsheet than at 62.",
        "Work in one currency of time throughout. Either inflate your target spending forward, or deflate the corpus back. Mixing the two is what produces confident projections that quietly assume prices freeze.",
        "It helps to know where the 4% figure came from. It emerged from studies of historical US market sequences over 30-year retirements, and its authors treated it as a starting point for analysis, not a law. Longer retirements, lower bond yields, or heavier fees all push the sustainable rate downward.",
        "A caveat on inflation itself: personal inflation is not the headline index. Healthcare and housing typically rise faster than the average, and they make up a growing share of spending later in life — worth reflecting in the target rather than assuming the general rate applies.",
      ],
      guides: ["what-is-compound-interest", "sip-math-explained", "cagr-vs-average-return"],
    },
  },

  "gst-calculator": {
    intro:
      "Invoicing goes wrong in one of two directions: adding tax to a price that already includes it, or 'removing' tax by subtracting a percentage. This calculator handles both directions cleanly so the base, the tax and the total reconcile on the invoice.",
    method: [
      "Adding GST to an exclusive price: Tax = Base × rate; Total = Base × (1 + rate).",
      "Removing GST from an inclusive price: Base = Total ÷ (1 + rate); Tax = Total − Base. Division, not subtraction — this is the whole game.",
      "Where a domestic supply splits the levy, the same total is divided into halves (for example CGST and SGST at 9% each on an 18% rate).",
    ],
    example: {
      title: "Worked example: an 11,800 inclusive invoice at 18%",
      lines: [
        "Base = 11,800 ÷ 1.18 = 10,000.",
        "Tax = 11,800 − 10,000 = 1,800, which splits into 900 + 900 for an intra-state supply.",
        "The wrong method: 18% of 11,800 is 2,124, implying a base of 9,676 — an error of 324 on a single line item.",
        "Going the other way, adding 18% to a 10,000 base gives 1,800 tax and an 11,800 total, which closes the loop.",
      ],
    },
    mistakes: [
      {
        title: "Subtracting the rate from an inclusive price",
        body: "Percentages are not reversible by subtraction. Dividing by 1 + rate is the only way to recover the base, and the error grows with the rate.",
      },
      {
        title: "Applying the rate to a discounted line incorrectly",
        body: "Tax is charged on the value after trade discount but generally before financial or cash discounts. Getting the order wrong changes the taxable value.",
      },
      {
        title: "Rounding each line then totalling",
        body: "Rounding tax per line and again on the invoice creates mismatches with the filed return. Fix one convention and apply it consistently.",
      },
    ],
    faqs: [
      {
        q: "How do I remove GST from a total?",
        a: "Divide the inclusive amount by 1 plus the rate as a decimal. For 18%, divide by 1.18; for 5%, divide by 1.05.",
      },
      {
        q: "What is the difference between inclusive and exclusive pricing?",
        a: "An exclusive price is the base before tax; an inclusive price already contains it. Retail prices are usually inclusive, B2B quotes usually exclusive.",
      },
      {
        q: "How does an 18% rate split into CGST and SGST?",
        a: "Equally, at 9% each, for supplies within a state. Inter-state supplies carry a single IGST charge at the full rate instead.",
      },
      {
        q: "Is GST calculated before or after a discount?",
        a: "After discounts that appear on the face of the invoice. Post-sale discounts are handled separately and usually require a credit note.",
      },
      {
        q: "Does the same maths apply to VAT and sales tax?",
        a: "For adding and removing tax, yes — only the rate and the compliance rules differ. The sales tax calculator uses identical arithmetic.",
      },
    ],
    related: ["sales-tax-calculator", "tax-calculator", "discount-calculator", "markup-calculator", "profit-calculator"],
  },
};
