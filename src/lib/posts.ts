export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  related?: string;
  body: string[];
}

export const posts: Post[] = [
{
    slug: "how-to-calculate-gear-ratio",
    title: "How to Calculate Gear Ratio: Formulas, RPM, and Gearbox Math",
    excerpt: "Master gear ratio calculations, output RPM conversions, torque leverage, and multi-stage gearbox speed formulas with clear worked examples.",
    readTime: "6 min read",
    related: "gear-ratio-calculator",
    body: [
      "A gear ratio measures the mechanical relationship between two or more meshed gears in a gear train. It defines how input speed and torque transfer from a drive gear to a driven gear. The basic formula is: Gear Ratio = Driven Gear Teeth ÷ Drive Gear Teeth. For example, a 60-tooth driven gear powered by a 20-tooth drive gear yields a 3:1 gear ratio.",
      "Gear ratios directly alter rotational speed (RPM) and output torque. Calculate output shaft speed using the formula: Output RPM = Input RPM ÷ Gear Ratio. If a motor runs at 3,000 RPM through a 5:1 reduction gear, the output turns at 600 RPM while increasing output torque by a factor of 5.",
      "For compound gear trains with multiple reduction stages, multiply individual stage ratios together: Total Ratio = Stage 1 × Stage 2. For automotive transmission calculations, multiply the transmission ratio by the final drive ratio to determine total wheel RPM and vehicle speed."
    ]
  },
  {
    slug: "how-to-calculate-bmi",
    title: "How to Calculate BMI (and What It Actually Tells You)",
    excerpt: "The BMI formula, worked examples, and where the number falls short.",
    readTime: "4 min read",
    related: "bmi-calculator",
    body: [
      "Body Mass Index is a ratio of weight to height: BMI = weight in kilograms divided by height in metres squared. It was designed as a population-level screening tool, not a diagnosis.",
      "For a person weighing 70 kg at 1.75 m, the calculation is 70 ÷ (1.75 × 1.75) = 22.9. That falls inside the 18.5–24.9 band the WHO describes as healthy weight.",
      "BMI cannot distinguish muscle from fat, so athletes often read as overweight while people with low muscle mass can read as healthy. Use it as one signal alongside waist measurement, body-fat percentage and blood markers.",
    ],
  },
  {
    slug: "what-is-compound-interest",
    title: "What Is Compound Interest?",
    excerpt: "Why compounding frequency matters more than most people expect.",
    readTime: "5 min read",
    related: "compound-interest",
    body: [
      "Compound interest pays interest on your interest. The formula is A = P (1 + r/n)^(n·t), where n is the number of compounding periods per year.",
      "Invest 100,000 at 10% for 10 years and annual compounding gives about 259,374. Switch to monthly compounding and you finish near 270,704 — the same rate, a different frequency.",
      "The lesson is that time in the market does most of the work. Doubling your horizon usually beats chasing a slightly higher rate.",
    ],
  },
  {
    slug: "how-gpa-is-calculated",
    title: "How GPA Is Calculated",
    excerpt: "Credit-weighted averages explained with a worked transcript.",
    readTime: "3 min read",
    related: "gpa-calculator",
    body: [
      "GPA is a credit-weighted average: multiply each course's grade points by its credit hours, add them all up, then divide by total credits.",
      "Four courses worth 3, 3, 4 and 2 credits with grade points 4.0, 3.7, 3.3 and 4.0 give (12 + 11.1 + 13.2 + 8) ÷ 12 = 3.69.",
      "Because credits are weights, a weak grade in a heavy course hurts far more than the same grade in a one-credit elective.",
    ],
  },
  {
    slug: "mortgage-guide",
    title: "The Practical Mortgage Guide",
    excerpt: "How amortisation splits your payment between interest and principal.",
    readTime: "6 min read",
    related: "mortgage-calculator",
    body: [
      "Every mortgage payment is the same size, but its composition changes. Early payments are mostly interest; later payments are mostly principal.",
      "The instalment formula is EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1), where r is the monthly rate and n the number of payments.",
      "Small prepayments early in the term remove interest that would have compounded for decades, which is why they cut the total cost so sharply.",
    ],
  },
  {
    slug: "gst-explained",
    title: "GST Explained: Adding vs Removing Tax",
    excerpt: "Inclusive and exclusive pricing, and the mistake most people make.",
    readTime: "4 min read",
    related: "gst-calculator",
    body: [
      "To add GST, multiply the base amount by the rate: 10,000 at 18% adds 1,800 for a gross of 11,800.",
      "To remove GST from an inclusive price, divide rather than subtract: 11,800 ÷ 1.18 = 10,000. Subtracting 18% of the gross would wrongly give 9,676.",
      "Invoices must show the base, the tax and the total separately, so getting the direction of the calculation right matters for compliance as much as arithmetic.",
    ],
  },
  {
    slug: "loan-calculator-guide",
    title: "A Complete Loan Calculator Guide",
    excerpt: "Tenure, rate and principal — which lever actually saves money.",
    readTime: "5 min read",
    related: "loan-calculator",
    body: [
      "Three inputs decide a loan: principal, interest rate and tenure. Stretching tenure lowers the instalment but raises total interest, often dramatically.",
      "A 500,000 loan at 8.5% costs about 4,338 monthly over 20 years and 545,000 in interest. Over 10 years the payment rises to roughly 6,199 but interest falls to about 244,000.",
      "Compare offers on total cost of credit, not the monthly figure lenders lead with.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
