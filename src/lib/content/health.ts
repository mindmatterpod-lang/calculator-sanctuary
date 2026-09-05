import type { ContentMap } from "./types";

/* Batch 3 — Health & fitness. Educational only; not medical advice. */

export const healthContent: ContentMap = {
  "bmi-calculator": {
    intro:
      "BMI is a screening number, not a diagnosis. It compares your weight to your height and places you in a broad band, which is useful for spotting a trend over years but blunt for any single person. This calculator gives you the value and the WHO category, and the notes below explain where it misleads.",
    method: [
      "BMI = weight in kilograms ÷ height in metres squared. For imperial units: 703 × pounds ÷ inches².",
      "WHO bands: under 18.5 underweight, 18.5–24.9 healthy, 25–29.9 overweight, 30 and above obese. Asian population guidelines shift the overweight threshold down to about 23.",
      "Because height is squared, BMI systematically reads slightly high for tall people and slightly low for short people — a known limitation of the formula, not an error in your measurement.",
    ],
    example: {
      title: "Worked example: 78 kg at 1.75 m",
      lines: [
        "Height squared: 1.75 × 1.75 = 3.0625.",
        "BMI = 78 ÷ 3.0625 = 25.5 — just inside the overweight band.",
        "Reaching a BMI of 24.9 would mean 76.3 kg, a loss of about 1.7 kg.",
        "The same person carrying 12% body fat would be muscular, not overweight, despite the identical BMI.",
        "In imperial: 172 lb at 69 in gives 703 × 172 ÷ 4,761 = 25.4.",
      ],
    },
    mistakes: [
      { title: "Treating BMI as a body composition measure", body: "It cannot distinguish muscle from fat. Trained athletes routinely score in the overweight band while carrying low body fat." },
      { title: "Using adult bands for children", body: "Children and teenagers are assessed on age-and-sex percentile charts, not fixed cut-offs. An adult BMI category is meaningless under 18." },
      { title: "Reacting to a single reading", body: "Weight fluctuates 1–2 kg daily with hydration, food and salt. Compare weekly averages, not individual mornings." },
    ],
    faqs: [
      { q: "What is a healthy BMI?", a: "18.5 to 24.9 by WHO bands, though many Asian guidelines use 18.5 to 22.9 because cardiometabolic risk rises at a lower BMI in those populations." },
      { q: "Is BMI accurate for athletes?", a: "No. Muscle is denser than fat, so a lean, muscular person can register as overweight. Body fat percentage or waist-to-hip ratio is more informative." },
      { q: "Does BMI differ by sex?", a: "The formula and the bands do not, even though women naturally carry more essential body fat. That is one reason body fat measures are preferred for individuals." },
      { q: "What is a better measure than BMI?", a: "Waist circumference and waist-to-hip ratio capture abdominal fat, which drives most of the metabolic risk. Combining BMI with waist measurement is stronger than either alone." },
      { q: "How much weight change moves my BMI by one point?", a: "Roughly your height in metres squared, in kilograms. At 1.75 m, about 3 kg shifts BMI by one point." },
    ],
    related: ["healthy-weight-calculator", "body-fat-calculator", "waist-to-hip-ratio-calculator", "ideal-weight-calculator", "tdee-calculator"],
  },

  "healthy-weight-calculator": {
    intro:
      "Rather than a single ideal figure, this calculator gives the weight range that keeps your BMI between 18.5 and 24.9 for your height. A range is more honest than a target: two people of the same height can be healthy 15 kg apart depending on frame and muscle mass.",
    method: [
      "Lower bound = 18.5 × height², upper bound = 24.9 × height², with height in metres.",
      "The band widens with height because it scales with height squared — a 20 kg spread at 1.60 m becomes nearly 30 kg at 1.90 m.",
      "Where BMI is a poor fit, sanity-check against a body fat estimate or waist measurement rather than forcing yourself toward one end of the range.",
    ],
    example: {
      title: "Worked example: someone 1.68 m tall",
      lines: [
        "Height squared: 2.8224.",
        "Lower bound: 18.5 × 2.8224 = 52.2 kg.",
        "Upper bound: 24.9 × 2.8224 = 70.3 kg.",
        "Healthy range: roughly 52–70 kg, an 18 kg span.",
        "At 1.85 m the same calculation gives 63–85 kg.",
      ],
    },
    mistakes: [
      { title: "Aiming for the bottom of the range", body: "The lower bound is the edge of underweight, not an ideal. Most people function best in the middle of the band." },
      { title: "Ignoring muscle mass", body: "Strength training can push weight above the range while improving every health marker. Judge by measurements and performance too." },
      { title: "Measuring height incorrectly", body: "A 2 cm error at 1.70 m shifts the whole range by about 1.5 kg. Measure barefoot, heels together, without shoes or hair volume." },
    ],
    faqs: [
      { q: "Why is healthy weight a range and not one number?", a: "Frame size, muscle mass and body composition all vary at the same height, so a band covers healthy variation that a single figure would wrongly exclude." },
      { q: "Where in the range should I aim?", a: "The middle is a reasonable default for most people; athletes may sit above it and small-framed people comfortably below the midpoint." },
      { q: "How fast should I move toward the range?", a: "0.5–1% of body weight a week is the usual sustainable pace. Faster loss increases muscle loss and rebound risk." },
      { q: "Does the range change with age?", a: "The BMI-based range does not, though slightly higher BMI is associated with better outcomes in older adults. Preserving muscle matters more than the number after 60." },
      { q: "How does this differ from ideal weight?", a: "Ideal weight formulas such as Devine produce one figure for clinical dosing. This range reflects the healthy BMI band and is more appropriate for personal goals." },
    ],
    related: ["bmi-calculator", "ideal-weight-calculator", "body-fat-calculator", "calorie-calculator", "lean-body-mass-calculator"],
  },

  "ideal-weight-calculator": {
    intro:
      "Ideal body weight formulas were built for clinical purposes — drug dosing, ventilator settings — not for personal goal setting. This calculator applies the Devine formula so you can see that reference figure and understand why it should be read alongside a healthy weight range rather than instead of one.",
    method: [
      "Devine formula: men 50 kg + 2.3 kg per inch over 5 feet; women 45.5 kg + 2.3 kg per inch over 5 feet.",
      "Everything below 5 feet uses the base figure, which is one reason the formula behaves poorly at short statures.",
      "Related formulas — Robinson, Miller and Hamwi — use different constants and can differ by several kilograms for the same person.",
    ],
    example: {
      title: "Worked example: a man 5 ft 10 in tall",
      lines: [
        "Inches over 5 feet: 10.",
        "Devine: 50 + (2.3 × 10) = 73 kg.",
        "For a woman of the same height: 45.5 + 23 = 68.5 kg.",
        "The healthy BMI range at 1.78 m is 58.6–78.9 kg, so the Devine figure sits mid-range.",
        "At 6 ft 4 in, Devine gives 87.2 kg while the BMI range reaches 100 kg — the formula drifts low for tall people.",
      ],
    },
    mistakes: [
      { title: "Treating the output as a personal goal", body: "It is a population reference used for dosing calculations. A healthy weight range or a body composition target is far more appropriate for individuals." },
      { title: "Comparing outputs from different formulas", body: "Devine, Robinson, Miller and Hamwi disagree by design. Pick one and stay with it rather than choosing whichever is most flattering." },
      { title: "Applying it to children or athletes", body: "The formula was derived from adults of average build and has no validity for growing children or heavily muscled adults." },
    ],
    faqs: [
      { q: "What is the Devine formula?", a: "A 1974 clinical formula for ideal body weight based only on sex and height, originally created to standardise drug dosing." },
      { q: "Why does it give a lower figure than my healthy range?", a: "It produces a single mid-range point, and it drifts low at tall statures because it adds a fixed amount per inch rather than scaling with height squared." },
      { q: "Which formula is most accurate?", a: "None is accurate for individuals — they are population averages. Robinson tends to give slightly lower values than Devine, Hamwi slightly higher." },
      { q: "Should I use ideal weight or BMI?", a: "Use the healthy weight range from BMI for personal goals, and reserve ideal body weight for the clinical contexts it was designed for." },
      { q: "Does frame size adjust the result?", a: "Some clinicians add or subtract about 10% for large or small frames, usually judged by wrist circumference or elbow breadth." },
    ],
    related: ["healthy-weight-calculator", "bmi-calculator", "lean-body-mass-calculator", "body-surface-area-calculator", "body-fat-calculator"],
  },

  "body-fat-calculator": {
    intro:
      "Body fat percentage tells you what weight cannot: how much of you is fat and how much is everything else. This calculator uses the US Navy circumference method, which needs only a tape measure and gets within a few percentage points of far more expensive scans when the measurements are taken carefully.",
    method: [
      "The Navy method uses logarithms of circumferences: for men, neck and waist relative to height; for women, neck, waist and hips relative to height.",
      "Fat mass = body weight × body fat percentage. Lean mass is the remainder, which is the figure worth tracking during a diet.",
      "General bands for men: 6–13% athletic, 14–17% fit, 18–24% acceptable, 25%+ obese. For women add roughly 8–10 points to each band, because essential fat is higher.",
    ],
    example: {
      title: "Worked example: a man, 178 cm, 82 kg",
      lines: [
        "Neck 38 cm, waist 92 cm. Waist minus neck = 54 cm.",
        "Navy formula returns approximately 21.5% body fat.",
        "Fat mass: 82 × 0.215 = 17.6 kg. Lean mass: 64.4 kg.",
        "Losing 6 kg of pure fat would give 76 kg at 15.3% — a visible change with no lean loss.",
        "If the same 6 kg loss included 1.5 kg of muscle, body fat would only reach 17.2%.",
      ],
    },
    mistakes: [
      { title: "Measuring the waist in the wrong place", body: "Use the narrowest point for women and at the navel for men, tape level and skin uncompressed. A 2 cm error moves the result by roughly 1.5 percentage points." },
      { title: "Measuring at different times of day", body: "Bloating and hydration shift waist circumference. Measure first thing in the morning, before eating, every time." },
      { title: "Chasing very low percentages", body: "Below about 6% for men and 14% for women, hormonal and immune function degrades. Low is not automatically better." },
    ],
    faqs: [
      { q: "How accurate is the Navy method?", a: "Typically within 3–4 percentage points of a DEXA scan when measurements are careful. Its consistency over time is more valuable than its absolute accuracy." },
      { q: "What is a healthy body fat percentage?", a: "Roughly 10–20% for men and 18–28% for women, with athletic ranges lower. Essential fat is about 3% for men and 12% for women." },
      { q: "Why does my smart scale disagree?", a: "Bioelectrical impedance scales estimate from hydration-sensitive resistance and can swing several points day to day. Use one method consistently." },
      { q: "Can I lose fat without losing weight?", a: "Yes — body recomposition. Beginners and those returning to training often gain muscle while losing fat, so weight stalls while measurements improve." },
      { q: "Where does the body lose fat first?", a: "Distribution is genetic and cannot be targeted by exercise selection. Overall deficit determines fat loss; the order is not under your control." },
    ],
    related: ["lean-body-mass-calculator", "bmi-calculator", "waist-to-hip-ratio-calculator", "tdee-calculator", "macro-split-calculator"],
    post: {
      slug: "body-fat-vs-bmi",
      title: "Body fat vs BMI: why the scale misreads a muscular body",
      excerpt: "Two people, same height, same weight, completely different health profiles. BMI cannot tell them apart.",
      readTime: "6 min",
      body: [
        "Take two men, both 1.78 m and 82 kg. Both have a BMI of 25.9, which puts them in the overweight band. One carries 12% body fat and squats twice his bodyweight. The other carries 28% body fat and has not exercised in a decade. BMI reports them as identical, because it only knows height and weight.",
        "Body fat percentage separates them immediately. The first man has 9.8 kg of fat and 72.2 kg of lean mass. The second has 23 kg of fat and 59 kg of lean mass — 13 kg less muscle, bone and organ tissue on the same frame. Every meaningful health marker follows the composition, not the weight.",
        "This is why BMI is best understood as a population screening tool. Across a hundred thousand people it correlates well enough with risk to be useful for public health. Applied to one person, especially a trained one, it can be flatly wrong in either direction — including the so-called normal-weight person with high body fat and low muscle, whose BMI reassures while their metabolic profile does not.",
        "The cheap fix is a tape measure. The US Navy circumference method needs neck, waist and, for women, hip measurements, and lands within three or four percentage points of a DEXA scan. More importantly, it tracks direction reliably: if your waist is falling while your weight stalls, you are losing fat and gaining muscle, which the scale will never tell you.",
        "Waist-to-hip ratio adds the other piece. Abdominal fat is the fat most strongly linked to cardiovascular and metabolic risk, and a ratio above about 0.90 for men or 0.85 for women signals that risk regardless of what BMI says.",
        "The practical routine: weigh yourself weekly and average it, measure waist and neck monthly under the same conditions, and treat BMI as one line on the chart rather than the verdict. Progress that shows up in composition but not in weight is still progress — arguably the best kind.",
      ],
      guides: ["macro-split-calculator-guide"],
    },
  },

  "lean-body-mass-calculator": {
    intro:
      "Lean body mass is everything that is not fat: muscle, bone, organs, water. It is the number that matters during a diet, because losing weight is easy and losing only fat is not. This calculator applies the Boer formula, which is widely used clinically and needs only height, weight and sex.",
    method: [
      "Boer formula for men: LBM = 0.407 × weight in kg + 0.267 × height in cm − 19.2. For women: 0.252 × weight + 0.473 × height − 48.3.",
      "Fat mass = total weight − lean body mass, and body fat percentage = fat mass ÷ weight × 100.",
      "Lean mass also drives energy needs: it is the primary determinant of basal metabolic rate, which is why preserving it protects your maintenance calories.",
    ],
    example: {
      title: "Worked example: a woman, 165 cm, 68 kg",
      lines: [
        "0.252 × 68 = 17.14.",
        "0.473 × 165 = 78.05.",
        "LBM = 17.14 + 78.05 − 48.3 = 46.9 kg.",
        "Fat mass = 68 − 46.9 = 21.1 kg, about 31%.",
        "After losing 5 kg with resistance training and adequate protein, ideally lean mass stays near 46.9 and fat mass falls to 16 kg — roughly 25%.",
      ],
    },
    mistakes: [
      { title: "Assuming all weight loss is fat loss", body: "In an aggressive deficit without resistance training, 25–30% of the loss can be lean tissue. That lowers your metabolic rate and makes regain easier." },
      { title: "Using a formula instead of tracking change", body: "Boer estimates from height and weight only, so it cannot detect muscle you have built. Use it for a baseline and track measurements alongside it." },
      { title: "Under-eating protein while dieting", body: "Below roughly 1.6 g per kg of bodyweight, lean mass retention suffers markedly during a deficit." },
    ],
    faqs: [
      { q: "What is lean body mass?", a: "Total bodyweight minus fat mass — muscle, bone, organs, connective tissue and body water combined." },
      { q: "How do I preserve lean mass while dieting?", a: "Keep the deficit moderate, eat 1.6–2.2 g of protein per kg of bodyweight, and lift weights two to four times a week." },
      { q: "Is lean body mass the same as muscle mass?", a: "No. Skeletal muscle is roughly half of lean mass; the rest is bone, organs and water." },
      { q: "Why do drug doses use lean body mass?", a: "Many drugs distribute through lean tissue rather than fat, so dosing on total weight can overdose people with high body fat." },
      { q: "How much muscle can I realistically gain?", a: "Untrained people often gain 0.5–1 kg a month initially; after a few years it slows to a fraction of that per year." },
    ],
    related: ["body-fat-calculator", "bmr-calculator", "protein-intake-calculator", "tdee-calculator", "ideal-weight-calculator"],
  },

  "bmr-calculator": {
    intro:
      "Basal metabolic rate is what your body burns doing nothing at all — keeping your heart beating, your brain running and your temperature stable. It is the foundation of every calorie target, and this calculator uses the Mifflin-St Jeor equation, the most accurate of the common formulas for the general population.",
    method: [
      "Mifflin-St Jeor for men: BMR = 10 × weight in kg + 6.25 × height in cm − 5 × age + 5. For women the final constant is −161.",
      "BMR typically accounts for 60–70% of total daily energy expenditure; activity and digestion make up the rest.",
      "Multiply BMR by an activity factor to get TDEE, the number you actually eat against: 1.2 sedentary through to 1.9 for very heavy training.",
    ],
    example: {
      title: "Worked example: a 34-year-old man, 180 cm, 84 kg",
      lines: [
        "10 × 84 = 840.",
        "6.25 × 180 = 1,125.",
        "5 × 34 = 170.",
        "BMR = 840 + 1,125 − 170 + 5 = 1,800 kcal.",
        "At a moderately active factor of 1.55, TDEE ≈ 2,790 kcal.",
      ],
    },
    mistakes: [
      { title: "Eating at BMR to lose weight", body: "BMR is a resting floor, not a diet target. Eating at BMR while active produces an extreme deficit, muscle loss and rebound." },
      { title: "Overstating activity level", body: "Most people who describe themselves as very active are moderately active at best. Choosing too high a factor is the usual reason a diet stalls." },
      { title: "Never recalculating", body: "BMR falls as you lose weight. After 5–8 kg of loss, recalculate or your deficit quietly shrinks to nothing." },
    ],
    faqs: [
      { q: "What is the difference between BMR and TDEE?", a: "BMR is resting energy expenditure; TDEE adds activity, exercise and digestion. TDEE is the number you set calorie targets against." },
      { q: "Which BMR formula is most accurate?", a: "Mifflin-St Jeor for most people. Katch-McArdle is better if you know your body fat percentage, because it works from lean mass." },
      { q: "Can I raise my BMR?", a: "Modestly, by adding muscle — roughly 13 kcal per kg of lean tissue per day. Most of the variation between people is size and genetics." },
      { q: "Does age really lower BMR?", a: "Yes, largely through muscle loss rather than age itself. Resistance training offsets much of the decline." },
      { q: "Why is my measured metabolism different?", a: "Equations carry a 10% error band either way. Use the estimate as a starting point and adjust based on two to three weeks of real weight data." },
    ],
    related: ["tdee-calculator", "calorie-calculator", "macro-split-calculator", "lean-body-mass-calculator", "protein-intake-calculator"],
  },

  "tdee-calculator": {
    intro:
      "TDEE is the number of calories you burn in a full day, and therefore the number every diet is built around. This calculator combines your basal rate with an activity multiplier so you have a maintenance figure to work from — the baseline for losing, gaining or holding weight.",
    method: [
      "TDEE = BMR × activity factor. Factors: 1.2 sedentary, 1.375 light, 1.55 moderate, 1.725 very active, 1.9 extremely active.",
      "TDEE has four parts: BMR, the thermic effect of food (roughly 10%), planned exercise, and non-exercise activity such as walking and fidgeting, which varies enormously between people.",
      "A deficit of about 500 kcal a day yields roughly 0.45 kg of loss per week, since fat tissue stores approximately 7,700 kcal per kg.",
    ],
    example: {
      title: "Worked example: a 29-year-old woman, 167 cm, 70 kg, moderately active",
      lines: [
        "BMR = 10 × 70 + 6.25 × 167 − 5 × 29 − 161 = 1,437.75 kcal.",
        "TDEE = 1,437.75 × 1.55 = 2,229 kcal.",
        "Cutting to 1,730 kcal creates a 500 kcal deficit — about 0.45 kg a week.",
        "Bulking at 2,480 kcal gives a 250 kcal surplus, roughly 0.2 kg a week.",
        "After losing 6 kg, recalculated TDEE falls to about 2,096 — the target must move too.",
      ],
    },
    mistakes: [
      { title: "Double-counting exercise", body: "If your activity factor already includes training, adding your watch's calorie burn on top inflates the target substantially." },
      { title: "Trusting wearable calorie estimates", body: "Wrist devices commonly overestimate exercise expenditure by 20–90%. Treat them as motivation, not accounting." },
      { title: "Ignoring adaptive changes", body: "In a prolonged deficit, spontaneous movement drops and TDEE falls more than the maths predicts. Diet breaks and step tracking counteract this." },
    ],
    faqs: [
      { q: "How do I know my real TDEE?", a: "Track intake and weight for two to three weeks. Your true maintenance is the average intake that held weight steady, which beats any formula." },
      { q: "Which activity multiplier should I pick?", a: "Base it on daily life, not intent. Desk job with three gym sessions is usually 1.375–1.55, not 1.725." },
      { q: "How big should my deficit be?", a: "10–20% below TDEE for most people. Very large deficits accelerate muscle loss and rarely survive contact with real life." },
      { q: "Does TDEE change on rest days?", a: "Yes, but averaging across the week is simpler and just as effective as cycling intake day by day." },
      { q: "Why has my weight loss stalled at the same calories?", a: "A lighter body burns less, and adaptation reduces movement. Recalculate TDEE, verify portion accuracy, and add steps before cutting calories further." },
    ],
    related: ["bmr-calculator", "calorie-calculator", "macro-split-calculator", "protein-intake-calculator", "body-fat-calculator"],
    post: {
      slug: "why-calorie-targets-stop-working",
      title: "Why your calorie target stops working after two months",
      excerpt: "Nothing changed except your body. That is precisely the problem, and there are three fixes.",
      readTime: "6 min",
      body: [
        "You set 1,800 calories, lost weight steadily for eight weeks, and then it stopped — same food, same training, no movement on the scale. This is not a metabolic mystery. Three things are happening at once, and all three are predictable.",
        "First, a smaller body burns less. Energy expenditure scales with mass, so after losing 7 kg your maintenance requirement has fallen by roughly 100–150 kcal a day. The deficit you set against your original TDEE has quietly shrunk by a quarter or more.",
        "Second, spontaneous movement drops. In a sustained deficit people fidget less, walk slower and sit more, without noticing. This non-exercise component can account for several hundred calories a day and is the single largest source of stall.",
        "Third, tracking drifts. Portion estimates creep upward over weeks, cooking oil goes uncounted, and weekend meals get logged optimistically. Studies consistently find people under-report intake by 20–30% once the novelty of tracking fades.",
        "The fixes, in order of preference. Recalculate TDEE at your current weight and reset the target — this alone often restores progress. Add movement rather than subtracting food: 2,000 more steps a day is roughly 80–100 kcal and costs nothing in hunger. And re-weigh your food strictly for one week to recalibrate your eye.",
        "If you have been in a deficit for more than about twelve weeks, a planned two-week break at maintenance is worth more than another cut. It restores adherence, returns spontaneous activity, and makes the next phase work. Diets do not fail because the arithmetic is wrong; they fail because the arithmetic keeps moving and nobody updates it.",
      ],
      guides: ["body-fat-vs-bmi"],
    },
  },

  "calorie-calculator": {
    intro:
      "This calculator turns your body data and activity level into a daily calorie target for losing, maintaining or gaining weight. It is the practical version of the TDEE calculation: one number to eat against, adjusted for the direction you actually want to go.",
    method: [
      "Start from BMR via Mifflin-St Jeor, multiply by your activity factor for maintenance calories, then apply your goal adjustment.",
      "Typical adjustments: −20% for weight loss, −10% for slow loss, +10% for lean gain, +20% for a faster bulk.",
      "One kilogram of fat stores about 7,700 kcal, so a 550 kcal daily deficit is roughly 0.5 kg a week in theory — and about 0.4 kg in practice once adaptation is included.",
    ],
    example: {
      title: "Worked example: maintenance 2,600 kcal",
      lines: [
        "Slow loss at −10%: 2,340 kcal, about 0.25 kg a week.",
        "Standard loss at −20%: 2,080 kcal, about 0.5 kg a week.",
        "Lean gain at +10%: 2,860 kcal, about 0.25 kg a week.",
        "Over twelve weeks, the standard deficit predicts around 6 kg.",
        "Actual results usually land 10–15% short of prediction because expenditure falls as weight does.",
      ],
    },
    mistakes: [
      { title: "Setting the target too low", body: "Very low intakes cause muscle loss, hormonal disruption and binge cycles. Rarely go below 1,200 kcal for women or 1,500 for men without supervision." },
      { title: "Eating back exercise calories twice", body: "Your activity factor already accounts for training. Adding a watch's burn on top routinely erases the entire deficit." },
      { title: "Ignoring liquid calories", body: "Juice, sweetened coffee and alcohol are easy to omit from a log and can quietly account for 300–600 kcal a day." },
    ],
    faqs: [
      { q: "How many calories should I eat to lose weight?", a: "About 10–20% below your maintenance figure. For a 2,600 kcal maintenance that is 2,080–2,340 kcal, giving 0.25–0.5 kg of loss a week." },
      { q: "Is 1,200 calories a day safe?", a: "It is a common floor for women under supervision but is too low for most active adults and makes adequate protein and micronutrients hard to reach." },
      { q: "Do I need to count calories forever?", a: "No. Most people track for a few months to calibrate portions, then maintain with habits and periodic check-ins." },
      { q: "Does meal timing affect the total?", a: "Total intake dominates. Timing influences hunger, training performance and adherence, which matter indirectly but do not change energy balance." },
      { q: "Why am I gaining weight in a deficit?", a: "Usually water retention from new training, higher sodium or carbohydrate intake, or the menstrual cycle. Judge by weekly averages over three weeks." },
    ],
    related: ["tdee-calculator", "bmr-calculator", "macro-split-calculator", "protein-intake-calculator", "bmi-calculator"],
  },

  "macro-split-calculator": {
    intro:
      "A calorie target tells you how much to eat; a macro split tells you what to eat. This calculator converts your daily calories into grams of protein, carbohydrate and fat, which is the level of detail that decides whether you keep muscle while losing fat.",
    method: [
      "Energy per gram: protein 4 kcal, carbohydrate 4 kcal, fat 9 kcal. Grams = calories allocated to that macro ÷ its energy density.",
      "A reliable approach is to set protein first at 1.6–2.2 g per kg of bodyweight, then fat at a minimum of 0.6–0.8 g per kg for hormonal health, then fill the remainder with carbohydrate.",
      "Percentage splits such as 40/30/30 are convenient but can leave protein too low at small calorie targets, which is exactly when protein matters most.",
    ],
    example: {
      title: "Worked example: 2,100 kcal for a 75 kg lifter",
      lines: [
        "Protein at 2.0 g/kg: 150 g = 600 kcal.",
        "Fat at 0.8 g/kg: 60 g = 540 kcal.",
        "Remaining for carbohydrate: 2,100 − 1,140 = 960 kcal = 240 g.",
        "Split: 150 g protein, 240 g carbs, 60 g fat — roughly 29/46/26 by calories.",
        "A generic 40/30/30 split at the same calories would give only 158 g carbs and 210 g protein-equivalent mismatch, over-fatting the diet at 70 g.",
      ],
    },
    mistakes: [
      { title: "Setting percentages before protein", body: "Percentage-first splits scale protein down as calories fall. Anchor protein in grams per kilogram and let the percentages land where they land." },
      { title: "Cutting fat too low", body: "Below roughly 0.5 g per kg, hormone production and fat-soluble vitamin absorption suffer. Fat is not the enemy of a deficit." },
      { title: "Ignoring fibre", body: "Fibre is a subset of carbohydrate and drives satiety. Aim for 25–35 g a day; a technically perfect macro split of low-fibre food will leave you hungry." },
    ],
    faqs: [
      { q: "What is the best macro split?", a: "The one you can follow that hits adequate protein. Protein 1.6–2.2 g/kg, fat at least 0.6 g/kg, carbohydrate filling the rest works for most goals." },
      { q: "Do macros matter more than calories?", a: "Calories determine weight change; macros determine what that change is made of and how well you train and recover." },
      { q: "How much protein is too much?", a: "Intakes up to about 3 g/kg are safe for healthy kidneys, though benefits plateau above roughly 2.2 g/kg." },
      { q: "Should carbs be lower for fat loss?", a: "Not necessarily. Low-carb diets work through appetite reduction, not metabolic advantage. Choose based on adherence and training demands." },
      { q: "Do I need to hit macros exactly?", a: "Within about 5–10 g of protein and fat, and within 20 g of carbohydrate, is more than precise enough." },
    ],
    related: ["calorie-calculator", "protein-intake-calculator", "tdee-calculator", "bmr-calculator", "water-intake-calculator"],
    post: {
      slug: "macro-split-calculator-guide",
      title: "Set protein first: the macro order that actually works",
      excerpt: "Percentage splits quietly starve you of protein exactly when you need it most. Here is the better sequence.",
      readTime: "5 min",
      body: [
        "Most macro advice starts with percentages — 40/30/30, 50/25/25 — and that is the wrong end of the problem. Percentages scale with calories, so the moment you cut calories, your protein target falls. That is precisely backwards: protein requirements are driven by your bodyweight and training, not by how much you happen to be eating this month.",
        "Consider a 75 kg lifter on 3,000 kcal using a 30% protein split: that is 225 g, comfortably adequate. Cut to 1,900 kcal for a diet phase and the same 30% gives 143 g — a 36% reduction in protein at the exact moment muscle is most at risk.",
        "The fix is to order the decisions properly. First, protein in grams per kilogram of bodyweight: 1.6 g/kg is the minimum for preserving muscle in a deficit, and 2.0–2.2 g/kg is a sensible working target for anyone lifting. Second, fat, with a floor of about 0.6–0.8 g/kg to protect hormone production and fat-soluble vitamin absorption. Third, carbohydrate takes whatever calories remain, and that is where your training fuel comes from.",
        "Worked through: 75 kg on 2,100 kcal gives 150 g protein (600 kcal), 60 g fat (540 kcal), leaving 960 kcal or 240 g of carbohydrate. Notice the resulting percentages — roughly 29/46/26 — look nothing like a textbook split, and are better for the goal.",
        "Two refinements matter more than fine-tuning the ratios. Get 25–35 g of fibre, because satiety is what makes a deficit survivable. And distribute protein across three or four meals of 30–40 g rather than one large serving, which supports muscle protein synthesis more evenly through the day.",
        "Finally, precision has limits. Landing within 5–10 g of your protein and fat targets and within 20 g on carbohydrate is enough. Consistency across weeks beats accuracy on any single day.",
      ],
      guides: ["why-calorie-targets-stop-working", "body-fat-vs-bmi"],
    },
  },

  "protein-intake-calculator": {
    intro:
      "Protein is the macronutrient most people under-eat and the one that most affects whether a diet preserves muscle. This calculator sets a daily target from your bodyweight and goal, from sedentary maintenance through to hard training in a deficit.",
    method: [
      "Targets are set per kilogram of bodyweight: roughly 0.8 g/kg for sedentary adults, 1.2–1.6 g/kg for general fitness, 1.6–2.2 g/kg for muscle gain, and 2.0–2.4 g/kg when dieting while training hard.",
      "Where body fat is high, calculating from lean body mass or target weight prevents an unrealistically large figure.",
      "Distribution matters at the margin: 25–40 g per meal across three or four meals supports muscle protein synthesis better than one large serving.",
    ],
    example: {
      title: "Worked example: an 80 kg lifter cutting weight",
      lines: [
        "Target at 2.2 g/kg: 176 g of protein a day.",
        "That is 704 kcal — about 35% of a 2,000 kcal diet.",
        "Across four meals: 44 g each.",
        "Practical sources: 150 g chicken breast 46 g, 200 g Greek yoghurt 20 g, 3 eggs 18 g, 30 g whey 24 g, 150 g lentils 13 g.",
        "At 30% body fat, calculating from 60 kg of lean mass instead gives a more reasonable 132 g.",
      ],
    },
    mistakes: [
      { title: "Using total weight at high body fat", body: "Protein needs track lean tissue. At high body fat, use lean mass or goal weight or the target becomes impractical." },
      { title: "Counting protein from incomplete sources loosely", body: "Plant sources vary in amino acid profile. Vegetarian and vegan diets typically need 10–20% more total protein and more source variety." },
      { title: "Eating almost all protein at dinner", body: "A single 120 g serving is not used as efficiently as three or four moderate ones. Spread it across the day." },
    ],
    faqs: [
      { q: "How much protein do I need per day?", a: "0.8 g/kg is the minimum to avoid deficiency; 1.6–2.2 g/kg is the range that supports muscle gain or retention while training." },
      { q: "Is high protein bad for kidneys?", a: "In people with healthy kidneys, intakes up to about 3 g/kg have not been shown to cause harm. Existing kidney disease requires medical guidance." },
      { q: "Do I need protein immediately after training?", a: "The anabolic window is much wider than once claimed. Total daily intake matters far more than eating within an hour." },
      { q: "Can I get enough protein on a plant-based diet?", a: "Yes, with legumes, soy, seitan, grains and supplements, aiming slightly higher in total to account for digestibility and amino acid profile." },
      { q: "Does protein help with fat loss?", a: "It is the most satiating macronutrient, has the highest thermic effect, and protects lean mass in a deficit — so indirectly, substantially." },
    ],
    related: ["macro-split-calculator", "calorie-calculator", "lean-body-mass-calculator", "tdee-calculator", "bmr-calculator"],
  },

  "water-intake-calculator": {
    intro:
      "The eight-glasses rule is a slogan, not a guideline. Real fluid needs scale with bodyweight, activity, climate and diet. This calculator gives a weight-based starting point, and the notes explain how to adjust it and how to tell whether you are actually hydrated.",
    method: [
      "A common baseline is 30–35 ml per kg of bodyweight per day, which puts a 70 kg adult at roughly 2.1–2.5 litres of total fluid.",
      "Add 400–800 ml per hour of vigorous exercise, more in heat. Endurance athletes may need to weigh themselves before and after training to measure real losses.",
      "Food contributes roughly 20% of total fluid intake, and all drinks count — including tea and coffee, whose mild diuretic effect does not offset their water content.",
    ],
    example: {
      title: "Worked example: a 72 kg adult training for an hour",
      lines: [
        "Baseline: 72 × 33 ml = 2,376 ml.",
        "Exercise addition: 600 ml for one hard hour.",
        "Total target: about 3.0 litres of fluid.",
        "Food supplies roughly 20%, so around 2.4 litres needs to come from drinks.",
        "In hot weather with heavy sweating, add another 500–1,000 ml.",
      ],
    },
    mistakes: [
      { title: "Drinking to a fixed number regardless of conditions", body: "Needs vary daily with heat, activity and food. Urine colour and thirst are better real-time signals than a target on a bottle." },
      { title: "Over-drinking during endurance events", body: "Excessive plain water can dilute blood sodium — hyponatraemia — which is dangerous. Long efforts need electrolytes, not just volume." },
      { title: "Assuming coffee dehydrates you", body: "At normal intakes, caffeinated drinks contribute net fluid. They count toward your total." },
    ],
    faqs: [
      { q: "How much water should I drink a day?", a: "Roughly 30–35 ml per kg of bodyweight in total fluid, adjusted upward for exercise, heat, pregnancy or breastfeeding." },
      { q: "How do I know if I am hydrated?", a: "Pale straw-coloured urine, no persistent thirst, and stable bodyweight across a training session are the practical indicators." },
      { q: "Do other drinks count?", a: "Yes — tea, coffee, milk and juice all contribute. So does food, at about 20% of total intake." },
      { q: "Can I drink too much water?", a: "Yes. Drinking far beyond losses, especially without sodium, can cause hyponatraemia. Extremely rare in normal daily life, a genuine risk in long endurance events." },
      { q: "Does dehydration affect performance?", a: "Losses above about 2% of bodyweight measurably reduce endurance and cognitive performance, which is roughly 1.4 kg for a 70 kg person." },
    ],
    related: ["tdee-calculator", "calorie-calculator", "pace-calculator", "heart-rate-calculator", "macro-split-calculator"],
  },

  "heart-rate-calculator": {
    intro:
      "Training zones turn a heart rate monitor from a curiosity into a tool. This calculator estimates your maximum heart rate from age and derives the zone boundaries, so you know which efforts build endurance and which build top-end capacity.",
    method: [
      "Maximum heart rate is estimated as 220 − age, or more accurately by Tanaka: 208 − 0.7 × age.",
      "Zones as a percentage of maximum: Zone 1 50–60% recovery, Zone 2 60–70% aerobic base, Zone 3 70–80% tempo, Zone 4 80–90% threshold, Zone 5 90–100% maximal.",
      "The Karvonen method uses heart rate reserve for more personal zones: target = resting + (max − resting) × intensity.",
    ],
    example: {
      title: "Worked example: age 40, resting heart rate 58",
      lines: [
        "Simple max: 220 − 40 = 180 bpm. Tanaka: 208 − 28 = 180 bpm.",
        "Zone 2 by percentage of max: 108–126 bpm.",
        "By Karvonen, heart rate reserve is 180 − 58 = 122.",
        "Zone 2 (60–70% of reserve): 58 + 73 = 131 to 58 + 85 = 143 bpm.",
        "The Karvonen zones sit meaningfully higher, which is why fit people find percentage-of-max easy zones too easy.",
      ],
    },
    mistakes: [
      { title: "Trusting 220 minus age as an individual truth", body: "The formula has a standard deviation of 10–12 bpm, so your real maximum could be 20 bpm either side. A field test is far more useful." },
      { title: "Spending most training in Zone 3", body: "The classic mistake: too hard for easy days, too easy for hard days. Most endurance progress comes from lots of Zone 2 and a little Zone 4–5." },
      { title: "Comparing heart rates between people", body: "Maximum and resting rates are individual. A higher heart rate at the same pace says nothing about fitness relative to someone else." },
    ],
    faqs: [
      { q: "How do I find my real maximum heart rate?", a: "A supervised graded exercise test, or a hard field test such as three all-out efforts up a long hill. Only do this if you are healthy and cleared for maximal exercise." },
      { q: "What is Zone 2 training?", a: "Sustained easy aerobic work at roughly 60–70% of maximum, where conversation is possible. It builds the aerobic base most endurance improvement rests on." },
      { q: "What does a low resting heart rate mean?", a: "Usually good cardiovascular fitness — trained endurance athletes are often in the 40s. Genetics contributes too." },
      { q: "Does heart rate drift during long efforts?", a: "Yes, cardiac drift raises heart rate at constant pace as core temperature and dehydration increase. Pace-based targets can be more stable for long sessions." },
      { q: "Which zone burns the most fat?", a: "Fat oxidation peaks in Zone 2 as a proportion of fuel, but total calories and therefore fat loss depend on overall energy balance across the week." },
    ],
    related: ["vo2-max-calculator", "pace-calculator", "calorie-calculator", "tdee-calculator", "water-intake-calculator"],
  },

  "vo2-max-calculator": {
    intro:
      "VO2 max is the best single measure of aerobic fitness: the maximum oxygen your body can use per minute. Lab testing is expensive, but the Cooper 12-minute run gives a solid estimate from a running track. This calculator converts your distance into an estimated value and a fitness category.",
    method: [
      "Cooper formula: VO2 max ≈ (distance in metres − 504.9) ÷ 44.73, from a maximal 12-minute run.",
      "Results are in ml of oxygen per kg of bodyweight per minute, so losing fat raises the number even with unchanged aerobic capacity.",
      "Rough bands for a 30-year-old man: below 35 poor, 35–42 fair, 43–51 good, 52–60 excellent, above 60 superior. Women's bands sit approximately 7–8 points lower.",
    ],
    example: {
      title: "Worked example: 2,600 m covered in 12 minutes",
      lines: [
        "(2,600 − 504.9) ÷ 44.73 = 46.8 ml/kg/min.",
        "For a 30-year-old man, that is a good rating; for a 30-year-old woman, excellent.",
        "Average pace: 2.6 km in 12 minutes is 4:37 per km.",
        "Losing 4 kg from an 80 kg bodyweight, with identical absolute capacity, would raise the value to about 49.2.",
        "A 200 m improvement in distance is worth roughly 4.5 points.",
      ],
    },
    mistakes: [
      { title: "Not running maximally", body: "The Cooper test assumes a genuine all-out effort with even pacing. Starting too fast and fading understates the result significantly." },
      { title: "Testing on a hilly or windy course", body: "Use a flat track in calm conditions. Terrain and wind can distort the distance by more than any real fitness change." },
      { title: "Comparing to a lab number", body: "Field estimates carry a 10–15% error band. Track your own trend on the same course rather than comparing to a treadmill test." },
    ],
    faqs: [
      { q: "What is a good VO2 max?", a: "Around 43–51 ml/kg/min is good for a man in his thirties and 36–44 for a woman. Elite endurance athletes exceed 70." },
      { q: "How quickly can I improve it?", a: "Untrained people often gain 15–20% in two to three months of consistent aerobic work. Trained athletes gain far less and much more slowly." },
      { q: "Does VO2 max decline with age?", a: "By roughly 10% per decade after 30, though regular endurance training halves the rate of decline." },
      { q: "Are watch estimates accurate?", a: "They track direction reasonably but can be off by several points in absolute terms, since they infer from heart rate and pace rather than measuring oxygen." },
      { q: "What training raises VO2 max most?", a: "Intervals at 90–100% of maximum heart rate, three to five minutes long, on top of a large base of easy aerobic volume." },
    ],
    related: ["heart-rate-calculator", "pace-calculator", "bmi-calculator", "body-fat-calculator", "calorie-calculator"],
  },

  "pace-calculator": {
    intro:
      "Pace is the language of running: minutes per kilometre or mile rather than speed. This calculator converts between distance, time and pace so you can plan a race target, check whether a training pace is realistic, and work out split times you can actually remember.",
    method: [
      "Pace = total time ÷ distance. Time = pace × distance. Speed in km/h = 60 ÷ pace in minutes per km.",
      "Convert between units with 1 mile = 1.609 km: pace per mile = pace per km × 1.609.",
      "Race prediction across distances uses Riegel's formula: T2 = T1 × (D2 ÷ D1)^1.06, where the exponent accounts for the fact that longer races are run slower.",
    ],
    example: {
      title: "Worked example: a 50-minute 10 km target",
      lines: [
        "Pace = 50 ÷ 10 = 5:00 per km, which is 8:03 per mile.",
        "Speed: 60 ÷ 5 = 12 km/h.",
        "5 km split: 25:00. Every kilometre marker should read a clean multiple of five minutes.",
        "Riegel prediction for a half marathon: 50 × (21.0975 ÷ 10)^1.06 = 1h 44m.",
        "Marathon prediction from the same fitness: about 3h 37m, assuming appropriate endurance training.",
      ],
    },
    mistakes: [
      { title: "Racing every training run", body: "Most weekly volume should be conversational. Training at race pace daily produces fatigue rather than adaptation." },
      { title: "Predicting a marathon from a 5 km time alone", body: "Riegel assumes equivalent endurance training. Without the long-run base, real marathon times fall well short of the prediction." },
      { title: "Ignoring course and conditions", body: "Heat, humidity, hills and wind can each add 10–30 seconds per kilometre. Pace to effort on hard days, not to the watch." },
    ],
    faqs: [
      { q: "How do I convert pace per km to per mile?", a: "Multiply by 1.609. A 5:00 per km pace is 8:03 per mile." },
      { q: "What is a good 10 km time?", a: "Around 50–60 minutes is solid for a recreational runner; sub-40 is competitive club level. Compare against your own progression first." },
      { q: "How do I predict a race time from a shorter race?", a: "Use Riegel: new time = old time × (new distance ÷ old distance)^1.06, then add a margin if your long-run volume is limited." },
      { q: "Should I run negative splits?", a: "Starting slightly slower than target and finishing faster generally produces better times than going out hard, especially over 10 km and beyond." },
      { q: "What pace should easy runs be?", a: "Typically 60–90 seconds per kilometre slower than 10 km race pace — slow enough to hold a conversation throughout." },
    ],
    related: ["heart-rate-calculator", "vo2-max-calculator", "calorie-calculator", "water-intake-calculator", "tdee-calculator"],
  },

  "waist-to-hip-ratio-calculator": {
    intro:
      "Where you carry fat matters as much as how much you carry. Waist-to-hip ratio captures abdominal fat, which is the deposit most strongly linked to cardiovascular and metabolic risk — and it needs nothing but a tape measure.",
    method: [
      "Ratio = waist circumference ÷ hip circumference, in the same units.",
      "WHO risk thresholds: for men, above 0.90 is elevated; for women, above 0.85. Abdominal obesity is also flagged by waist alone above 102 cm for men or 88 cm for women.",
      "Measure the waist at the narrowest point or at the navel, and the hips at the widest point of the buttocks, standing relaxed after a normal breath out.",
    ],
    example: {
      title: "Worked example: waist 96 cm, hips 104 cm",
      lines: [
        "Ratio = 96 ÷ 104 = 0.92.",
        "For a man, that is just above the 0.90 threshold — elevated risk.",
        "Reducing the waist to 92 cm gives 0.88, back within range.",
        "Waist alone at 96 cm is below the 102 cm abdominal obesity marker, so the ratio is the more sensitive signal here.",
        "The same measurements in a woman would indicate clearly elevated risk at 0.92 against a 0.85 threshold.",
      ],
    },
    mistakes: [
      { title: "Pulling the tape tight", body: "Compressing the skin shrinks the waist reading by 2–3 cm and flatters the ratio. Snug, level, no indentation." },
      { title: "Measuring at inconsistent landmarks", body: "Waist at the navel one month and at the narrowest point the next makes the trend meaningless. Pick one and record it." },
      { title: "Assuming a good ratio means low risk", body: "It is one indicator. Blood pressure, lipids, blood glucose and family history all contribute, and no tape measure replaces them." },
    ],
    faqs: [
      { q: "What is a healthy waist-to-hip ratio?", a: "Below 0.90 for men and below 0.85 for women by WHO criteria. Lower ratios generally indicate less abdominal fat." },
      { q: "Is waist-to-hip ratio better than BMI?", a: "For predicting cardiovascular risk, abdominal measures usually perform better. Using both gives a fuller picture than either alone." },
      { q: "Can I target belly fat with exercise?", a: "No exercise burns fat from a specific region. Overall deficit reduces abdominal fat, and it often responds relatively early in the process." },
      { q: "Does the ratio change with age?", a: "It tends to rise, as fat redistributes toward the abdomen — particularly after menopause. Resistance training and activity slow the shift." },
      { q: "What is waist-to-height ratio?", a: "An even simpler alternative: keep your waist under half your height. It performs comparably and needs no hip measurement." },
    ],
    related: ["body-fat-calculator", "bmi-calculator", "healthy-weight-calculator", "lean-body-mass-calculator", "tdee-calculator"],
  },

  "body-surface-area-calculator": {
    intro:
      "Body surface area is the measure clinicians use where weight alone is too crude — chemotherapy dosing, cardiac index, burn assessment and paediatric fluids. This calculator applies the Mosteller formula, which is the most widely used because it is simple enough to check by hand.",
    method: [
      "Mosteller: BSA in m² = square root of (height in cm × weight in kg ÷ 3600).",
      "Du Bois and Haycock formulas exist and produce slightly different values; institutions standardise on one because dosing must be reproducible.",
      "Typical adult BSA is 1.6–2.0 m². Many protocols cap dosing BSA at 2.0 or 2.2 m² to avoid overdosing very large patients.",
    ],
    example: {
      title: "Worked example: 172 cm, 70 kg",
      lines: [
        "172 × 70 = 12,040.",
        "12,040 ÷ 3,600 = 3.344.",
        "BSA = √3.344 = 1.83 m².",
        "A drug dosed at 350 mg/m² would give 350 × 1.83 = 640 mg.",
        "The same patient at 90 kg would have a BSA of 2.07 m², a 13% higher dose.",
      ],
    },
    mistakes: [
      { title: "Mixing units", body: "Mosteller requires centimetres and kilograms. Feeding inches or pounds into the same divisor produces a wildly wrong area." },
      { title: "Switching formulas mid-treatment", body: "Du Bois and Mosteller can differ by a few percent. Dosing must use whatever the protocol specifies, consistently." },
      { title: "Treating it as a fitness metric", body: "BSA is a clinical scaling factor, not a health indicator. It says nothing about body composition." },
    ],
    faqs: [
      { q: "What is a normal body surface area?", a: "About 1.7 m² for an average adult woman and 1.9 m² for an average adult man. Children scale down with size." },
      { q: "Why is BSA used for drug dosing?", a: "It correlates better than weight with metabolic rate, cardiac output and renal clearance, which govern how a drug is processed." },
      { q: "Which BSA formula is most accurate?", a: "Mosteller is the most used for its simplicity; Du Bois is older and slightly underestimates in obesity. Accuracy differences are small relative to dosing tolerances." },
      { q: "Is BSA capped for large patients?", a: "Many protocols cap it at 2.0–2.2 m², though practice varies and some guidelines now recommend dosing on actual BSA." },
      { q: "How does BSA relate to cardiac index?", a: "Cardiac index is cardiac output divided by BSA, which allows comparison between patients of very different sizes." },
    ],
    related: ["ideal-weight-calculator", "lean-body-mass-calculator", "bmi-calculator", "bmr-calculator", "healthy-weight-calculator"],
  },

  "blood-alcohol-calculator": {
    intro:
      "This calculator estimates blood alcohol concentration with the Widmark formula, from drinks consumed, bodyweight, sex and elapsed time. Treat every result as a rough guide only: real BAC varies with food, medication, genetics and hydration, and no estimate makes it safe to drive.",
    method: [
      "Widmark: BAC % = (alcohol in grams ÷ (bodyweight in grams × distribution ratio)) × 100, with r about 0.68 for men and 0.55 for women.",
      "One standard drink is roughly 14 g of pure alcohol — 350 ml of 5% beer, 150 ml of 12% wine, or 45 ml of 40% spirits.",
      "Elimination is roughly linear at 0.015 percentage points per hour and cannot be accelerated. Subtract 0.015 × hours since the first drink.",
    ],
    example: {
      title: "Worked example: a 70 kg woman, three glasses of wine over two hours",
      lines: [
        "Alcohol consumed: 3 × 14 = 42 g.",
        "Body water mass: 70,000 g × 0.55 = 38,500 g.",
        "Peak BAC before elimination: 42 ÷ 38,500 × 100 = 0.109%.",
        "Less two hours of elimination: 0.109 − 0.030 = 0.079%.",
        "That is at or above the legal driving limit in most jurisdictions, and it will take over five more hours to reach zero.",
      ],
    },
    mistakes: [
      { title: "Assuming a pour is a standard drink", body: "Home pours of wine are frequently double a standard measure, and craft beers often run 7–9% rather than 5%. Both silently double the estimate." },
      { title: "Believing coffee, food or a cold shower help", body: "Nothing speeds elimination. Food slows absorption, lowering the peak, but the total time to sober is unchanged." },
      { title: "Treating an estimate as permission to drive", body: "Widmark carries wide individual variance. Impairment begins well below legal limits, and the only safe plan after drinking is not driving." },
    ],
    faqs: [
      { q: "How long does alcohol take to leave the body?", a: "Roughly one hour per standard drink, at about 0.015 BAC points per hour. A 0.08 BAC takes over five hours to clear." },
      { q: "Why do women reach a higher BAC than men?", a: "Lower average body water proportion and less gastric alcohol dehydrogenase mean the same dose is distributed into a smaller volume." },
      { q: "Does eating lower my BAC?", a: "Food slows gastric emptying and reduces the peak, but it does not reduce total alcohol absorbed or speed elimination." },
      { q: "Can I be over the limit the next morning?", a: "Easily. Heavy evening drinking can leave measurable BAC eight to ten hours later, which is a common cause of morning-after offences." },
      { q: "How accurate is this estimate?", a: "It is an approximation with substantial individual variance from genetics, medication, hydration and drinking pace. Never use it to judge fitness to drive." },
    ],
    related: ["water-intake-calculator", "smoking-cost-calculator", "calorie-calculator", "bmi-calculator", "sleep-cycle-calculator"],
  },

  "smoking-cost-calculator": {
    intro:
      "The health case against smoking is well known; the financial case is often more motivating in the short term. This calculator totals what a habit costs over a week, a year and a decade, and what the same money would become if it were invested instead.",
    method: [
      "Daily cost = cigarettes per day ÷ cigarettes per pack × pack price. Annual cost = daily × 365.",
      "Lifetime totals should account for price rises: tobacco duty typically outpaces general inflation, so a 5% annual increase is a conservative assumption.",
      "Invested instead, the same monthly amount compounds: FV = D × ((1 + i)^n − 1) ÷ i, which converts a habit into an opportunity cost.",
    ],
    example: {
      title: "Worked example: 15 a day at 12 per pack of 20",
      lines: [
        "Daily: 15 ÷ 20 × 12 = 9.00.",
        "Weekly: 63. Monthly: about 274. Annually: 3,285.",
        "Over ten years at flat prices: 32,850.",
        "With 5% annual price rises, the ten-year total is about 41,300.",
        "The same 274 a month invested at 7% for ten years becomes roughly 47,400.",
      ],
    },
    mistakes: [
      { title: "Counting only the packet price", body: "Higher insurance premiums, dental work, more frequent illness and lost productivity are real costs. Studies routinely put total lifetime cost at several times the tobacco spend." },
      { title: "Ignoring price escalation", body: "Tobacco taxes rise faster than general inflation almost everywhere, so a flat-price projection understates a ten-year total by 20–30%." },
      { title: "Framing quitting as pure loss", body: "Redirecting the exact amount into a visible savings goal converts an abstract saving into something you can watch grow, which sustains the change." },
    ],
    faqs: [
      { q: "How much does smoking cost per year?", a: "At 15 cigarettes a day and 12 per pack of 20, about 3,285 a year on tobacco alone, before health and insurance costs." },
      { q: "What would that money be worth invested?", a: "Roughly 47,000 over ten years and 137,000 over twenty at a 7% return, from the same monthly amount." },
      { q: "How soon do health benefits begin after quitting?", a: "Heart rate and blood pressure improve within a day, circulation and lung function within weeks to months, and cardiovascular risk drops substantially within a few years." },
      { q: "Is vaping cheaper?", a: "Usually, though device and liquid costs add up and long-term health effects are still being studied. Cost alone is a weak basis for the comparison." },
      { q: "Does the calculator include indirect costs?", a: "No, it covers direct tobacco spend. Add insurance loading, medical costs and time lost to illness for a fuller picture." },
    ],
    related: ["compound-interest", "savings-calculator", "investment-calculator", "water-intake-calculator", "blood-alcohol-calculator"],
  },

  "sleep-cycle-calculator": {
    intro:
      "Waking mid-cycle is why eight hours can feel worse than six. Sleep runs in roughly 90-minute cycles, and this calculator works backwards from your alarm — or forwards from now — to bedtimes that land between cycles rather than in the middle of deep sleep.",
    method: [
      "Cycles average about 90 minutes, so useful sleep durations cluster at 6 hours (4 cycles), 7.5 hours (5) and 9 hours (6).",
      "Add roughly 14 minutes of sleep latency — the time to fall asleep — when working back from a wake time.",
      "Cycle length genuinely varies between 80 and 120 minutes and lengthens through the night as REM proportions increase, so treat the suggestions as a range.",
    ],
    example: {
      title: "Worked example: a 6:30 alarm",
      lines: [
        "Six cycles (9 hours): asleep by 21:30, in bed about 21:16.",
        "Five cycles (7.5 hours): asleep by 23:00, in bed about 22:46.",
        "Four cycles (6 hours): asleep by 00:30, in bed about 00:16.",
        "Waking at 6:30 after going to bed at 23:45 lands roughly 80 minutes into the fifth cycle — likely to feel worst of all.",
        "Adults generally need 7–9 hours, so five to six cycles is the target range.",
      ],
    },
    mistakes: [
      { title: "Treating 90 minutes as exact", body: "Individual cycles vary by up to half an hour and change through the night. Use the timings as a guide and prioritise total duration." },
      { title: "Choosing four cycles routinely", body: "Six hours is below the adult requirement. Occasional short nights are survivable; a habitual six hours accumulates real cognitive and metabolic cost." },
      { title: "Keeping a fixed bedtime with a shifting wake time", body: "Consistency of wake time anchors the circadian rhythm more strongly than bedtime. Fix the morning first." },
    ],
    faqs: [
      { q: "How long is a sleep cycle?", a: "About 90 minutes on average, ranging from 80 to 120 minutes and lengthening as the night progresses." },
      { q: "Is 7.5 hours better than 8?", a: "Possibly, if 7.5 lands between cycles and 8 hours interrupts one. Total sleep still matters more than cycle alignment." },
      { q: "Why do I feel worse after a long lie-in?", a: "Sleep inertia from waking during deep sleep, plus a shifted circadian rhythm. A consistent wake time reduces both." },
      { q: "Do naps follow the same cycles?", a: "A 20-minute nap stays in light sleep and avoids inertia; a 90-minute nap completes a full cycle. The 45–60 minute middle ground tends to feel worst." },
      { q: "Can I train myself to need less sleep?", a: "Not meaningfully. You can adapt to feeling less sleepy while performance remains impaired, which is why self-assessment is unreliable." },
    ],
    related: ["heart-rate-calculator", "tdee-calculator", "water-intake-calculator", "calorie-calculator", "bmr-calculator"],
  },

  "pregnancy-due-date-calculator": {
    intro:
      "The estimated due date anchors every prenatal appointment and test window. This calculator uses Naegele's rule, counting 280 days from the first day of your last period, and adjusts for cycle length. It is an estimate: only about 4% of births land exactly on it.",
    method: [
      "Naegele's rule: due date = first day of last menstrual period + 280 days, or LMP + 1 year − 3 months + 7 days.",
      "This assumes a 28-day cycle with ovulation on day 14. For other cycle lengths, adjust by (cycle length − 28) days.",
      "Gestational age counts from LMP; conception occurs roughly two weeks later, which is why fetal age is about two weeks behind gestational age.",
    ],
    example: {
      title: "Worked example: LMP on 12 March, 31-day cycle",
      lines: [
        "Naegele's baseline: 12 March + 280 days = 17 December.",
        "Cycle adjustment: 31 − 28 = +3 days, giving 20 December.",
        "Estimated conception: around 28 March.",
        "First trimester ends around 12 June, second around 18 September.",
        "Full term spans 37–42 weeks, so a normal delivery window here is roughly 27 November to 1 January.",
      ],
    },
    mistakes: [
      { title: "Counting from conception instead of LMP", body: "Pregnancy is dated from the last period, not conception. Using a conception date adds about two weeks and misaligns every appointment." },
      { title: "Ignoring an irregular cycle", body: "Naegele's rule assumes 28 days with day-14 ovulation. With irregular cycles, an early ultrasound gives a much better date." },
      { title: "Treating the date as fixed", body: "Only about 4% of births occur on the estimated date, and around 80% fall within ten days either side. It is a midpoint, not a deadline." },
    ],
    faqs: [
      { q: "How accurate is a due date from the last period?", a: "It sets a reasonable midpoint, but a first-trimester ultrasound is more accurate — usually within five to seven days." },
      { q: "How many weeks pregnant am I?", a: "Count from the first day of your last period to today, then divide by seven. That is gestational age, which is what clinicians use." },
      { q: "What counts as full term?", a: "37 to 42 weeks. Before 37 weeks is preterm; after 42 is post-term, and induction is usually discussed around 41 weeks." },
      { q: "Does a long cycle change the due date?", a: "Yes. Add the difference between your cycle length and 28 days, because ovulation happens later." },
      { q: "When are the trimesters?", a: "First 0–13 weeks, second 14–27 weeks, third 28 weeks to delivery." },
    ],
    related: ["ovulation-calculator", "child-height-predictor", "bmi-calculator", "water-intake-calculator", "healthy-weight-calculator"],
  },

  "ovulation-calculator": {
    intro:
      "Fertility is not spread evenly across a cycle: conception is realistically possible in a window of about six days. This calculator estimates ovulation day and that fertile window from your cycle length and last period, which is the practical starting point whether you are trying to conceive or avoid it.",
    method: [
      "Ovulation is estimated as cycle length minus 14 days from the first day of the last period, because the luteal phase is relatively fixed at 12–16 days.",
      "The fertile window spans roughly five days before ovulation to one day after, since sperm survive up to five days and the egg about 12–24 hours.",
      "Cycle length variation shifts the window; the follicular phase varies far more than the luteal phase, which is why counting back from the next period is more reliable than counting forward.",
    ],
    example: {
      title: "Worked example: last period started 3 June, 30-day cycle",
      lines: [
        "Ovulation: 3 June + (30 − 14) = 19 June.",
        "Fertile window: 14 June to 20 June.",
        "Most fertile days: 17 to 19 June, immediately before ovulation.",
        "Next period expected: 3 July.",
        "On a 26-day cycle, ovulation would fall on 15 June instead — a four-day shift from cycle length alone.",
      ],
    },
    mistakes: [
      { title: "Assuming day 14 for every cycle", body: "Day 14 only applies to a 28-day cycle. On a 32-day cycle ovulation is nearer day 18, and timing intercourse for day 14 misses the window entirely." },
      { title: "Relying on calendar timing for contraception", body: "Calendar methods have high failure rates because cycles vary. They are not a substitute for contraception." },
      { title: "Waiting for a positive ovulation test to start trying", body: "Fertility peaks in the days before ovulation. By the time an LH surge is detected, much of the window has already opened." },
    ],
    faqs: [
      { q: "When am I most fertile?", a: "The two to three days immediately before ovulation, with the wider window running from about five days before to one day after." },
      { q: "How do I know I am ovulating?", a: "Ovulation predictor kits detect the LH surge; cervical mucus becomes clear and stretchy; basal body temperature rises slightly after ovulation." },
      { q: "Can I get pregnant during my period?", a: "It is unlikely but possible with a short cycle, where ovulation can occur soon after bleeding ends and sperm survive up to five days." },
      { q: "How long does it usually take to conceive?", a: "About 85% of couples conceive within a year of trying. Seeking advice earlier is reasonable after 35 or with known conditions." },
      { q: "Does cycle length change the accuracy?", a: "Yes. Irregular cycles make calendar estimates unreliable; tracking with tests or temperature over a few months is much better." },
    ],
    related: ["pregnancy-due-date-calculator", "child-height-predictor", "bmi-calculator", "healthy-weight-calculator", "water-intake-calculator"],
  },

  "child-height-predictor": {
    intro:
      "Adult height is largely inherited, so a child's likely range can be estimated from the parents. This calculator applies the mid-parental height method, which gives a central estimate and a range — useful for reassurance, and not a substitute for growth-chart tracking by a clinician.",
    method: [
      "Mid-parental height: average the parents' heights, then add 6.5 cm for a boy or subtract 6.5 cm for a girl.",
      "The prediction carries a range of roughly ±8.5 cm, which covers about 95% of outcomes — genetics sets a corridor, not a point.",
      "Nutrition, sleep, chronic illness and hormonal conditions all influence whether a child reaches the genetic potential the formula describes.",
    ],
    example: {
      title: "Worked example: father 178 cm, mother 165 cm",
      lines: [
        "Mid-parental height: (178 + 165) ÷ 2 = 171.5 cm.",
        "For a son: 171.5 + 6.5 = 178 cm.",
        "For a daughter: 171.5 − 6.5 = 165 cm.",
        "Likely range for the son: about 169.5 to 186.5 cm.",
        "Likely range for the daughter: about 156.5 to 173.5 cm.",
      ],
    },
    mistakes: [
      { title: "Reading the central estimate as a prediction", body: "The ±8.5 cm range is the honest answer. A single number implies precision the method does not have." },
      { title: "Comparing height to peers rather than a chart", body: "Growth velocity on a percentile chart matters far more than absolute height. A child tracking steadily along the 15th percentile is usually fine." },
      { title: "Expecting steady growth", body: "Growth comes in spurts, and puberty timing shifts everything. Early developers look tall then plateau; late developers catch up." },
    ],
    faqs: [
      { q: "How accurate is the mid-parental method?", a: "It predicts within about 8.5 cm for 95% of children. Bone-age radiographs give a tighter estimate when clinically needed." },
      { q: "At what age does growth stop?", a: "Typically 14–16 for girls and 16–18 for boys, when the growth plates close. Small gains can continue into the early twenties." },
      { q: "Can nutrition change final height?", a: "Poor nutrition or chronic illness can prevent a child reaching genetic potential. Beyond adequacy, extra food and supplements do not add height." },
      { q: "Does sleep affect growth?", a: "Growth hormone is released mostly during deep sleep, so chronic sleep restriction in children is a genuine concern." },
      { q: "When should I see a doctor about growth?", a: "If a child crosses two percentile lines downward, grows less than about 4 cm a year in mid-childhood, or is far outside the predicted range." },
    ],
    related: ["healthy-weight-calculator", "bmi-calculator", "pregnancy-due-date-calculator", "ovulation-calculator", "ideal-weight-calculator"],
  },
};
