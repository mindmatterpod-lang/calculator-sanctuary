import type { ContentMap } from "./types";

/* Batch 7 — Everyday Life. Every worked example below is checked against the
   live compute() function for that slug in calculators.ts / calculators-extra.ts. */

export const everydayLifeContent: ContentMap = {
  "tip-calculator": {
    intro:
      "The tip amount, the new total, and each person's share — three numbers people mentally fumble at the table, solved before the bill even arrives at your hands twice.",
    method: [
      "Tip = bill × tip percentage ÷ 100.",
      "Total = bill + tip.",
      "Each person's share = total ÷ number of people.",
    ],
    example: {
      title: "Worked example: 2,400 bill, 10% tip, 4 people",
      lines: [
        "Tip = 2,400 × 10 ÷ 100 = 240.",
        "Total = 2,400 + 240 = 2,640.",
        "Each person pays 2,640 ÷ 4 = 660.",
      ],
    },
    mistakes: [
      { title: "Calculating tip on the post-tax total when the local norm is pre-tax", body: "Tipping conventions vary by region and establishment — some calculate tip on the pre-tax subtotal, others on the total including tax. Check which the bill or local custom expects before assuming." },
      { title: "Splitting evenly when orders were very uneven", body: "An even split is simplest but can feel unfair if one person ordered far more than others — for genuinely itemised splitting, each person's own items plus a proportional share of tax and tip is the fairer approach." },
    ],
    faqs: [
      { q: "What's a standard tip percentage?", a: "This varies enormously by country and context — anywhere from 0% (built into service charges already) to 20%+ is considered standard in different places, so use whatever fits local custom rather than a universal number." },
      { q: "How is this different from the Split Bill Calculator?", a: "This one starts from a plain bill and tip percentage; the Split Bill Calculator is built specifically around a total that already includes a combined tax-and-tip percentage to divide evenly." },
      { q: "Does the tip amount change if I split the bill fewer ways?", a: "No — the total tip is calculated on the whole bill regardless of how many people split the final total; splitting only affects the amount each individual person pays." },
      { q: "Should I round the per-person amount up or down in practice?", a: "Rounding up slightly is the common practical approach so the total collected covers the actual amount owed rather than falling just short." },
    ],
    related: ["split-bill-calculator", "unit-price-calculator", "gift-budget-calculator", "percent-change-calculator", "coffee-ratio-calculator"],
  },

  "split-bill-calculator": {
    intro:
      "A total bill, a group size, and a combined tax-and-tip percentage — this collapses straight to what each person actually owes, including all the extras baked into one number.",
    method: [
      "Grand total = bill × (1 + tax & tip percentage ÷ 100).",
      "Each person's share = grand total ÷ number of people.",
    ],
    example: {
      title: "Worked example: 5,000 bill, 5 people, 12% tax & tip",
      lines: [
        "Grand total = 5,000 × 1.12 = 5,600.",
        "Each person = 5,600 ÷ 5 = 1,120.",
      ],
    },
    mistakes: [
      { title: "Entering tax and tip as two separate additions on top of this tool's single percentage", body: "This calculator expects one combined percentage covering both tax and tip together — if you enter only the tax rate and plan to add tip mentally afterward, the per-person figure won't reflect the true final total." },
      { title: "Assuming an even split is always fair", body: "This tool assumes everyone owes an identical share — for a group where people ordered very different amounts, an even split can noticeably overcharge light eaters and undercharge heavy ones." },
    ],
    faqs: [
      { q: "How do I combine tax and tip into one percentage if I know them separately?", a: "Add them directly if both apply to the same base amount — an 8% tax plus a 15% tip both calculated on the bill total combine to 23% for this calculator's single field." },
      { q: "What if some people already paid for part of the bill, like drinks separately?", a: "Subtract any amounts already covered separately from the total bill before entering it here, so the remaining group split reflects only the shared portion." },
      { q: "Is this the same as splitting a restaurant bill using an app?", a: "The underlying math is identical — this just does the calculation directly without needing to install anything for a quick, one-off split." },
      { q: "Does rounding matter much for large groups?", a: "For larger groups, small rounding differences per person can add up to a noticeable gap between the sum collected and the actual total owed — round up slightly, or have one person cover any small shortfall." },
    ],
    related: ["tip-calculator", "gift-budget-calculator", "unit-price-calculator", "travel-cost-calculator", "percent-change-calculator"],
  },

  "cooking-converter": {
    intro:
      "Cups, tablespoons, teaspoons, millilitres and fluid ounces all measure volume, but every recipe seems to pick a different one — this converts directly between any pair without hunting down a conversion chart.",
    method: [
      "Every unit converts through a common millilitre reference: Cup = 236.588 ml, Tablespoon = 14.787 ml, Teaspoon = 4.929 ml, Fluid ounce = 29.5735 ml.",
      "To convert, the amount is scaled to millilitres and then to the target unit: result = amount × (source ml value) ÷ (target ml value).",
    ],
    example: {
      title: "Worked example: 2 cups to millilitres",
      lines: [
        "2 × 236.588 = 473.176 ml.",
        "The same 2 cups converted to tablespoons instead: 2 × 236.588 ÷ 14.787 ≈ 32 tablespoons — matching the commonly cited '16 tablespoons per cup' figure exactly.",
      ],
    },
    mistakes: [
      { title: "Assuming a US cup and a metric or imperial cup are the same size", body: "This tool uses the US customary cup (236.588 ml) — a UK/Commonwealth 'cup' is sometimes treated as exactly 250 ml in casual use, close but not identical, which can matter for precise baking." },
      { title: "Converting a volume measurement as if it were a weight", body: "This is purely a volume-to-volume conversion — the actual weight of 1 cup of flour versus 1 cup of sugar differs substantially, since they have different densities, and this tool doesn't account for that." },
    ],
    faqs: [
      { q: "Why does 1 cup of flour weigh less than 1 cup of sugar?", a: "Volume and weight are different properties — this converter handles volume-to-volume only. For precise baking, a kitchen scale measuring actual weight (grams) is more reliable than volume for ingredients like flour, which packs inconsistently." },
      { q: "How many teaspoons are in a tablespoon?", a: "Exactly 3 — 14.787 ÷ 4.929 = 3, which matches the standard kitchen conversion most recipes assume." },
      { q: "Is a fluid ounce the same as a regular (weight) ounce?", a: "No — fluid ounces measure volume, while regular ounces measure weight. For water specifically they're numerically close (since water's density is close to 1 g/ml), but for other ingredients they diverge." },
      { q: "Can I convert between more than two units at once?", a: "The tool converts a single source unit to a single target unit at a time — for a full ingredient list, convert each line individually." },
    ],
    related: ["unit-price-calculator", "coffee-ratio-calculator", "fraction-calculator", "ratio-calculator", "proportion-solver"],
  },

  "fuel-cost-calculator": {
    intro:
      "Total fuel cost for a trip comes down to distance, how efficiently the vehicle uses fuel, and the price per litre — three numbers that answer 'can I afford this drive' before setting off.",
    method: [
      "Litres required = distance ÷ fuel efficiency (km per litre).",
      "Total cost = litres required × price per litre.",
    ],
    example: {
      title: "Worked example: 450 km trip, 18 km/l efficiency, price 105 per litre",
      lines: [
        "Litres = 450 ÷ 18 = 25 litres.",
        "Cost = 25 × 105 = 2,625.",
      ],
    },
    mistakes: [
      { title: "Using a manufacturer's rated fuel efficiency instead of real-world figures", body: "Official efficiency ratings are typically measured under ideal test conditions — real-world driving (traffic, air conditioning, terrain, driving style) usually returns noticeably worse efficiency than the rated figure." },
      { title: "Forgetting the round trip", body: "If the distance entered is one-way but the actual trip is a round trip, the true fuel cost is double this calculation's result — always confirm whether 'distance' means one-way or return." },
    ],
    faqs: [
      { q: "How do I find my vehicle's real-world fuel efficiency?", a: "Track the litres used to refill a full tank against the distance driven since the last fill-up — dividing distance by litres gives a real, personal efficiency figure more accurate than a manufacturer's rating." },
      { q: "Does this account for fuel price changes during a long trip?", a: "No — it assumes one constant fuel price throughout. For a trip crossing regions with notably different fuel prices, calculate each leg separately with its local price for accuracy." },
      { q: "How does driving style affect the number this calculator gives?", a: "Aggressive acceleration, high speeds, and heavy air-conditioning use all reduce real fuel efficiency below typical rated figures — adjust the efficiency input downward for a more realistic estimate under those conditions." },
      { q: "Can this be used for electric vehicles?", a: "Not directly — EVs use energy consumption (like kWh per 100 km) and electricity price rather than litres and fuel price, which needs a different calculation entirely." },
    ],
    related: ["travel-cost-calculator", "electricity-bill-calculator", "flight-carbon-calculator", "gear-ratio-calculator", "unit-price-calculator"],
  },

  "travel-cost-calculator": {
    intro:
      "A trip's total cost is travel plus accommodation plus daily spending — this adds them together correctly, including the detail that daily spend applies for one more day than the number of nights, since the arrival day counts too.",
    method: [
      "Total = travel cost + (stay per night × nights) + (daily spend × (nights + 1)).",
      "The '+1' on daily spend accounts for the arrival day, which involves daily spending but isn't a full night's stay counted separately.",
    ],
    example: {
      title: "Worked example: 8,000 travel, 3,500/night, 4 nights, 1,500/day",
      lines: [
        "Accommodation = 3,500 × 4 = 14,000.",
        "Daily spend = 1,500 × (4+1) = 1,500 × 5 = 7,500.",
        "Total = 8,000 + 14,000 + 7,500 = 29,500.",
      ],
    },
    mistakes: [
      { title: "Assuming daily spend multiplies by nights, not nights+1", body: "A 4-night trip actually spans 5 days (arrival day through departure day), so daily spending applies to 5 days, not 4 — this calculator deliberately builds in that extra day, which is easy to under-budget for by hand." },
      { title: "Forgetting return travel if only one-way travel cost was entered", body: "If 'travel cost' only covers the outbound journey, remember to include the return leg too, either by doubling that figure or entering the full round-trip cost directly." },
    ],
    faqs: [
      { q: "Why does the calculator add one extra day to the nights for daily spend?", a: "A trip of 'n nights' actually covers n+1 days of activity, meals and incidentals — from the arrival day through the departure day — so budgeting only for the number of nights understates real daily spending." },
      { q: "Does this include big one-off purchases like souvenirs or activities?", a: "Only if you fold them into the daily spend estimate — for major planned expenses, it's more accurate to add them as a separate line rather than averaging them into daily spend." },
      { q: "How should I estimate daily spend if I've never been to the destination?", a: "Research typical costs for meals, local transport and casual spending at that destination specifically — costs vary enormously by country and city, far more than most people initially assume." },
      { q: "Can this handle a trip with varying accommodation costs across different nights?", a: "Not directly — this uses one flat per-night rate. For trips with different accommodation costs on different nights, calculate accommodation separately and add it to travel and daily-spend totals by hand." },
    ],
    related: ["fuel-cost-calculator", "flight-carbon-calculator", "gift-budget-calculator", "split-bill-calculator", "electricity-bill-calculator"],
  },

  "electricity-bill-calculator": {
    intro:
      "One appliance's monthly running cost, from its power rating and how many hours a day it's actually used — the number that reveals whether that always-on device is a minor cost or a real budget line.",
    method: [
      "Monthly energy = (power rating in watts ÷ 1,000) × hours per day × 30 days, giving kWh.",
      "Monthly cost = kWh × tariff rate per kWh.",
    ],
    example: {
      title: "Worked example: 1,500 W appliance, 6 hours/day, tariff 8 per kWh",
      lines: [
        "kWh = (1,500 ÷ 1,000) × 6 × 30 = 1.5 × 6 × 30 = 270 kWh per month.",
        "Cost = 270 × 8 = 2,160 per month.",
      ],
    },
    mistakes: [
      { title: "Using an appliance's peak power draw instead of its typical running power", body: "Many appliances (like air conditioners and refrigerators) cycle on and off rather than drawing their rated wattage continuously — using peak wattage as if it were constant significantly overstates real energy use." },
      { title: "Assuming a flat 30-day month always", body: "This calculator uses 30 days as a standard approximation — for a precise monthly bill matching a specific calendar month (28-31 days), adjust proportionally." },
    ],
    faqs: [
      { q: "How do I find an appliance's actual power rating?", a: "Check the nameplate or manual, usually listed in watts (W) — for appliances that cycle (fridges, AC units), this rated figure is typically the peak, not the continuous average draw." },
      { q: "Why is the result divided by 1,000 in the formula?", a: "Power ratings are given in watts, but electricity is billed in kilowatt-hours — dividing by 1,000 converts watts to kilowatts before multiplying by hours to get kWh." },
      { q: "How can I use this to compare two appliances' running costs?", a: "Run the calculation separately for each appliance's wattage and typical daily hours, then compare the monthly cost figures directly." },
      { q: "Does tariff rate ever change based on how much electricity is used?", a: "In many regions, yes — tiered or slab-based tariffs charge a higher rate once usage crosses certain thresholds. This calculator assumes one flat rate throughout, a simplification for tiered billing structures." },
    ],
    related: ["fuel-cost-calculator", "internet-speed-calculator", "screen-time-calculator", "flight-carbon-calculator", "watt-calculator"],
  },

  "internet-speed-calculator": {
    intro:
      "Connection speed is quoted in megabits per second, but file sizes are usually in gigabytes — mixing bits and bytes is exactly why a '100 Mbps' connection doesn't download a '100 MB' file in one second.",
    method: [
      "Download time (seconds) = (file size in GB × 8 × 1,024) ÷ speed in Mbps.",
      "The ×8 converts gigabytes to gigabits (since connection speed is measured in bits, not bytes); ×1,024 converts gigabits to megabits.",
    ],
    example: {
      title: "Worked example: 4.7 GB file (a standard DVD image), 100 Mbps connection",
      lines: [
        "Seconds = (4.7 × 8 × 1,024) ÷ 100 = 38,502.4 ÷ 100 = 385.024 seconds.",
        "In minutes: 385.024 ÷ 60 ≈ 6.42 minutes.",
      ],
    },
    mistakes: [
      { title: "Confusing megabits (Mbps) with megabytes (MB) per second", body: "Internet speeds are marketed in megabits per second, but file sizes are shown in megabytes — 1 byte equals 8 bits, so a '100 Mbps' connection downloads at roughly 12.5 megabytes per second, not 100." },
      { title: "Expecting to actually achieve the full advertised speed", body: "Advertised speed is typically a maximum under ideal conditions — real download speed is often reduced by network congestion, Wi-Fi signal quality, server-side limits, and other simultaneous usage on the connection." },
    ],
    faqs: [
      { q: "Why does '100 Mbps' feel much slower than 100 megabytes per second?", a: "Because Mbps measures megabits, not megabytes — divide by 8 to get the theoretical maximum megabytes per second, so 100 Mbps translates to roughly 12.5 MB/s at best." },
      { q: "Why might my actual download be slower than this calculation predicts?", a: "This is a theoretical best-case figure — real speeds are affected by network congestion, the specific server's upload capacity, Wi-Fi conditions, and other devices sharing the same connection simultaneously." },
      { q: "How is GB different from GiB in this context?", a: "This calculator uses 1,024 as the conversion factor (binary/GiB convention) rather than 1,000 (decimal/GB convention) — the difference is small but not zero for very large files." },
      { q: "What speed do I actually need for smooth video streaming?", a: "This varies by resolution — standard definition typically needs a few Mbps, while 4K streaming commonly recommends 25 Mbps or more, according to most major streaming services' own guidance." },
    ],
    related: ["electricity-bill-calculator", "screen-time-calculator", "password-strength-calculator", "binary-converter", "file-transfer-time-calculator"],
  },

  "password-strength-calculator": {
    intro:
      "Password strength isn't really about looking complicated — it's about how large a 'search space' an attacker has to try, which depends mathematically on both length and character variety.",
    method: [
      "Character pool size adds up based on which types are used: lowercase (+26), uppercase (+26), digits (+10), symbols (+33).",
      "Entropy (bits) = password length × log₂(pool size) — this represents how many yes/no guesses, roughly, it would take to narrow down the password by brute force.",
      "Strength label: under 40 bits is Weak, 40-60 Fair, 60-80 Strong, above 80 Very strong.",
    ],
    example: {
      title: "Worked example: 'Sunset-42!' (10 characters)",
      lines: [
        "Contains lowercase, uppercase, digits and a symbol: pool = 26+26+10+33 = 95.",
        "Entropy = 10 × log₂(95) ≈ 10 × 6.57 ≈ 65.7 bits.",
        "65.7 bits falls in the 60-80 range, so this is rated 'Strong'.",
      ],
    },
    mistakes: [
      { title: "Assuming a longer password with less variety beats a shorter one with more variety", body: "Both length and character pool multiply into entropy — a 20-character password using only lowercase letters (pool 26) can actually have lower entropy than a 12-character password mixing all four character types, depending on the exact numbers." },
      { title: "Treating a 'Strong' rating here as proof against every kind of attack", body: "This entropy calculation models resistance to brute-force guessing specifically — it says nothing about whether the password appears in leaked-password databases or follows a predictable pattern, which real attackers check first." },
    ],
    faqs: [
      { q: "Why does adding a symbol help more than adding another letter sometimes?", a: "It depends on the existing pool — adding a character type not yet present (like the first digit or symbol) expands the pool notably, while adding more characters from a type already used only adds length, not pool size." },
      { q: "What does 'bits of entropy' actually mean intuitively?", a: "Each additional bit roughly doubles the number of guesses needed to brute-force the password — so a jump from 40 to 60 bits represents roughly a million times more possible combinations to search." },
      { q: "Is a computed 'Very strong' rating enough on its own for account security?", a: "It's a good sign against brute-force guessing, but real-world security also depends on not reusing the password elsewhere and it not being an easily guessed pattern or dictionary phrase, which this entropy calculation doesn't detect." },
      { q: "Does password length matter more than character variety?", a: "Generally length has a larger effect for longer passwords, since it's a direct multiplier in the entropy formula, but both matter — a very short password can't reach high entropy no matter how varied its characters are." },
    ],
    related: ["binary-converter", "internet-speed-calculator", "screen-time-calculator", "hex-rgb-converter", "ascii-converter"],
  },

  "tile-calculator": {
    intro:
      "Tiles needed for a floor is more than area divided by tile size — cuts, breakage and pattern-matching waste mean the real order always needs a buffer on top of the theoretical minimum.",
    method: [
      "Base tile count = area to cover ÷ area per tile.",
      "Tiles to order = base count × (1 + wastage % ÷ 100), rounded up to a whole tile since partial tiles can't be purchased.",
    ],
    example: {
      title: "Worked example: 20 m² area, 0.36 m² tiles, 10% wastage",
      lines: [
        "Base tiles = 20 ÷ 0.36 ≈ 55.56.",
        "With 10% wastage: 55.56 × 1.1 ≈ 61.11, rounded up to 62 tiles.",
      ],
    },
    mistakes: [
      { title: "Ordering exactly the theoretical minimum with no wastage allowance", body: "Cutting tiles around edges, corners, pipes and doorways always produces some unusable offcuts — ordering with zero buffer commonly leaves a job short right at the finish, when matching tiles may no longer be in stock." },
      { title: "Using too low a wastage percentage for a complex layout", body: "Diagonal layouts, rooms with lots of corners, or patterns requiring alignment across tiles typically waste more than a simple straight layout — 10% is reasonable for simple layouts, but complex ones often need 15% or more." },
    ],
    faqs: [
      { q: "How much wastage allowance is typical?", a: "10% is a common default for straightforward rectangular rooms; more complex layouts, diagonal patterns, or rooms with many corners and cutouts often justify 15-20%." },
      { q: "Should I round up or down when the count comes out as a fraction?", a: "Always round up — a fractional tile in the calculation means you need one more whole tile to actually cover that portion of the floor." },
      { q: "Does this account for the grout lines between tiles?", a: "Not directly — grout lines take up a small amount of additional space, which is a further reason the wastage allowance exists as a buffer, though it's not calculated as a separate explicit factor here." },
      { q: "How do I find the area per tile if I only know its dimensions?", a: "Multiply the tile's length by its width (converting to the same unit as your room area) to get area per tile — a 30cm × 30cm tile is 0.3 × 0.3 = 0.09 m²." },
    ],
    related: ["wallpaper-calculator", "paint-coverage-calculator", "concrete-volume-calculator", "unit-price-calculator", "steel-weight-calculator"],
  },

  "wallpaper-calculator": {
    intro:
      "Wallpaper rolls needed depends on the room's total wall area and how much one roll actually covers — with a buffer added for pattern matching and trimming, since exact-fit ordering rarely works out in practice.",
    method: [
      "Wall area = room perimeter × wall height.",
      "Rolls needed = (wall area ÷ roll coverage) × 1.1, rounded up to a whole roll, with the 1.1 factor building in a 10% allowance for trimming and pattern matching.",
    ],
    example: {
      title: "Worked example: 18 m perimeter, 2.5 m height, 5 m² roll coverage",
      lines: [
        "Wall area = 18 × 2.5 = 45 m².",
        "Rolls = (45 ÷ 5) × 1.1 = 9 × 1.1 = 9.9, rounded up to 10 rolls.",
      ],
    },
    mistakes: [
      { title: "Forgetting to subtract door and window area for a more precise estimate", body: "This calculator uses gross wall area (perimeter × height) without subtracting doors and windows — for a room with large windows or multiple doors, the true wallpaper need is somewhat less than this calculation suggests, though the built-in 10% buffer often absorbs small differences." },
      { title: "Using coverage figures from a different-sized roll than what's actually being purchased", body: "Roll coverage varies by brand, width and length — always use the specific product's stated coverage area rather than a generic assumption, since standard roll sizes differ between regions and manufacturers." },
    ],
    faqs: [
      { q: "Why is a 10% buffer built directly into this calculation?", a: "Pattern-matched wallpaper especially wastes material aligning repeats across roll widths, and any wallpapering job involves trimming at ceiling and floor edges — 10% is a standard practical allowance for both." },
      { q: "Should I subtract door and window area before entering the perimeter and height?", a: "For a more precise (usually lower) estimate, yes — subtract the combined door/window area from the calculated wall area separately, keeping in mind the built-in buffer already covers some of this margin." },
      { q: "Do patterned wallpapers need more rolls than plain ones?", a: "Often yes — large repeat patterns can require extra material to align matches between drops, sometimes needing an allowance beyond the standard 10% built into this calculator." },
      { q: "How does roll coverage vary between wallpaper types?", a: "Standard and 'double' or 'triple' rolls have different total areas depending on the manufacturer and region — always check the specific coverage stated on the product rather than assuming a universal figure." },
    ],
    related: ["tile-calculator", "paint-coverage-calculator", "concrete-volume-calculator", "unit-price-calculator", "steel-weight-calculator"],
  },

  "pizza-value-calculator": {
    intro:
      "A bigger pizza almost always costs more per square inch to buy but less per square inch of actual pizza, because area grows with the square of the radius while price usually doesn't scale that fast — this settles which size is genuinely the better deal.",
    method: [
      "Area of each pizza = π × (diameter ÷ 2)².",
      "Cost per square inch = price ÷ area, for each pizza.",
      "The pizza with the lower cost per square inch is the better value.",
    ],
    example: {
      title: "Worked example: 12-inch pizza at 14, vs 16-inch pizza at 20",
      lines: [
        "Pizza 1 area = π × 6² ≈ 113.1 sq in. Cost per sq in = 14 ÷ 113.1 ≈ 0.1238.",
        "Pizza 2 area = π × 8² ≈ 201.1 sq in. Cost per sq in = 20 ÷ 201.1 ≈ 0.0995.",
        "0.0995 < 0.1238, so the 16-inch pizza is the better value despite costing more upfront.",
      ],
    },
    mistakes: [
      { title: "Comparing pizzas by price alone or by diameter alone", body: "Price alone ignores that a larger pizza has disproportionately more area; diameter alone ignores price entirely. Only cost per unit area accounts for both properly." },
      { title: "Assuming bigger is always better value", body: "It usually is for standard round pizzas due to the area-scaling effect, but toppings, crust style, and pricing strategy can occasionally break that pattern — this calculator checks the actual numbers rather than assuming the rule always holds." },
    ],
    faqs: [
      { q: "Why does a 16-inch pizza have so much more area than a 12-inch one, given it's not much wider?", a: "Area scales with the square of the radius — a 16-inch pizza's radius (8 in) is only about 33% larger than a 12-inch pizza's radius (6 in), but its area is roughly 78% larger, because area grows quadratically, not linearly, with radius." },
      { q: "Does this account for crust thickness or topping differences?", a: "No — this is a pure geometric area-versus-price comparison. A thin-crust and deep-dish pizza of the same diameter have the same calculated area here despite differing significantly in actual food content." },
      { q: "How is 'diameter' measured for an oddly-shaped or rectangular pizza?", a: "This formula assumes a standard round pizza — for rectangular or square pizzas, a length-times-width area calculation would be needed instead of the circular area formula used here." },
      { q: "Is this the same math used for the Unit Price Calculator?", a: "Conceptually yes — both compare cost per unit of what you're actually getting, but this one specifically accounts for round-pizza geometry rather than simple linear size." },
    ],
    related: ["unit-price-calculator", "circle-calculator", "geometry-calculator", "tip-calculator", "coffee-ratio-calculator"],
  },

  "coffee-ratio-calculator": {
    intro:
      "Coffee strength comes down to one ratio: water to coffee grounds by weight — this converts a target water amount directly into the grams of coffee needed for a chosen ratio, rather than eyeballing scoops.",
    method: [
      "Coffee needed (g) = water (g) ÷ water-to-coffee ratio.",
      "Rough tablespoon equivalent = coffee grams ÷ 7 (an approximate weight per tablespoon of ground coffee).",
    ],
    example: {
      title: "Worked example: 500 g water, 16:1 ratio",
      lines: [
        "Coffee = 500 ÷ 16 = 31.25 g.",
        "Approx tablespoons = 31.25 ÷ 7 ≈ 4.46 tablespoons.",
      ],
    },
    mistakes: [
      { title: "Assuming 1 gram of water always equals 1 millilitre for measuring purposes", body: "This is true for water specifically (density ≈ 1 g/ml) and is a convenient coincidence brewers rely on, but it's worth remembering it's water's particular density making this work, not a universal rule for all liquids." },
      { title: "Using a scoop instead of a scale for precision brewing", body: "Ground coffee's density varies with grind size and bean type, so a 'scoop' is a rough and inconsistent measure — a kitchen scale measuring the actual grams gives far more repeatable results between brews." },
    ],
    faqs: [
      { q: "What ratio is considered 'standard' for coffee?", a: "Common brewing guides suggest ratios roughly between 15:1 and 17:1 for a balanced cup, though personal taste and brew method (pour-over, French press, espresso) shift this considerably." },
      { q: "Why is a lower ratio number a stronger coffee?", a: "A ratio of 15:1 means less water per gram of coffee than 17:1 — fewer parts water relative to coffee produces a more concentrated, stronger-tasting brew." },
      { q: "Is the tablespoon conversion precise?", a: "It's a rough approximation (7g per tablespoon) — actual weight per tablespoon varies with grind size and how tightly the coffee is packed, which is exactly why a scale gives more consistent results than scoop-counting." },
      { q: "How would I adjust this for espresso instead of drip coffee?", a: "Espresso typically uses a much lower ratio (often around 2:1), reflecting its highly concentrated brewing method — this calculator's formula still applies, just with a very different ratio input." },
    ],
    related: ["cooking-converter", "ratio-calculator", "proportion-solver", "unit-price-calculator", "tip-calculator"],
  },

  "unit-price-calculator": {
    intro:
      "The bigger pack isn't automatically the better deal — this compares two products by price per unit of size, which is the only fair way to judge value between differently sized options.",
    method: [
      "Unit price for each item = price ÷ size.",
      "The item with the lower unit price is the cheaper option per unit.",
    ],
    example: {
      title: "Worked example: Item 1 at 4.5 for 500 g, Item 2 at 7.2 for 900 g",
      lines: [
        "Item 1 unit price = 4.5 ÷ 500 = 0.009 per gram.",
        "Item 2 unit price = 7.2 ÷ 900 = 0.008 per gram.",
        "0.008 < 0.009, so Item 2 is cheaper per gram despite costing more overall upfront.",
      ],
    },
    mistakes: [
      { title: "Comparing total price alone without accounting for different pack sizes", body: "A higher total price for a much larger pack can still be the better deal per unit — total price only tells you the full cost, not the value, unless both items are the exact same size." },
      { title: "Mixing units between the two items, like grams for one and ounces for the other", body: "Both size fields need to be in the same unit for the comparison to be valid — comparing 500 g against 32 oz without converting one to match the other produces a meaningless result." },
    ],
    faqs: [
      { q: "Why do many stores already show a 'price per unit' on shelf labels?", a: "It's specifically designed to let shoppers make exactly this kind of comparison without doing the math themselves — this calculator does the same thing for situations, like online shopping, where that label isn't shown." },
      { q: "Does a lower unit price always mean I should buy that option?", a: "Purely on cost-efficiency, yes — but consider whether you'll actually use the larger size before it expires or goes to waste, since a lower unit price only saves money if the product gets fully used." },
      { q: "Can this compare items in completely different units, like a liquid in litres versus one in millilitres?", a: "Convert both to the same unit first — entering mismatched units directly gives a comparison that looks valid but isn't." },
      { q: "How is this related to the Pizza Value Calculator?", a: "Same underlying idea — comparing price relative to the actual quantity received — but the pizza tool specifically accounts for circular area geometry rather than a simple linear size figure." },
    ],
    related: ["pizza-value-calculator", "tip-calculator", "cooking-converter", "ratio-calculator", "percent-change-calculator"],
  },

  "gift-budget-calculator": {
    intro:
      "A total gift budget rarely goes entirely to the gifts themselves — this reserves an amount for wrapping and extras up front, then splits what's left evenly across everyone on the list.",
    method: [
      "Amount per person = (total budget − wrapping reserve) ÷ number of people.",
    ],
    example: {
      title: "Worked example: 600 total budget, 8 people, 40 reserved for wrapping",
      lines: [
        "Spendable = 600 − 40 = 560.",
        "Each person = 560 ÷ 8 = 70.",
      ],
    },
    mistakes: [
      { title: "Forgetting to reserve for wrapping, cards, or shipping before dividing", body: "These small extras add up across a full gift list — reserving for them upfront, as this calculator does, avoids quietly overspending the total budget once they're accounted for at the end instead." },
      { title: "Assuming everyone on the list needs an identically priced gift", body: "An even split is a simple starting point, but nothing requires spending exactly the same on every person — this figure is a useful average target more than a strict rule for every individual gift." },
    ],
    faqs: [
      { q: "How much should I typically reserve for wrapping and cards?", a: "This varies by how many gifts and how elaborate the presentation — a rough reserve based on past spending on wrapping paper, tape, ribbons and cards for a similar-sized list is a reasonable starting estimate." },
      { q: "What if I want to spend more on some people and less on others?", a: "Use this calculator's result as an average target, then adjust up or down for individual people as long as the total across everyone still fits the overall budget." },
      { q: "Does this account for gifts that will be bought online with separate shipping costs?", a: "Not directly — if shipping is a meaningful cost, fold an estimate of it into the wrapping/reserve figure, or increase the total budget to account for it before dividing." },
      { q: "How is this different from just dividing the total budget by the number of people?", a: "The reserve step ensures wrapping and incidental costs are set aside first, so the per-person figure reflects what's actually available for the gifts themselves, not an amount that will later be eaten into by those extras." },
    ],
    related: ["split-bill-calculator", "tip-calculator", "travel-cost-calculator", "unit-price-calculator", "percent-change-calculator"],
  },

  "pet-food-calculator": {
    intro:
      "How much to feed a pet each day scales with its body weight, and knowing that daily amount tells you exactly how long a given bag will actually last before running out.",
    method: [
      "Daily feed (g) = pet weight (kg) × daily feed percentage ÷ 100 × 1,000.",
      "Days a bag lasts = bag size (kg) ÷ daily feed (kg).",
    ],
    example: {
      title: "Worked example: 18 kg pet, 2.5% daily feed, 12 kg bag",
      lines: [
        "Daily feed = 18 × 2.5 ÷ 100 = 0.45 kg = 450 g per day.",
        "Bag lasts = 12 ÷ 0.45 ≈ 26.67, rounds to about 27 days.",
      ],
    },
    mistakes: [
      { title: "Using a generic feeding percentage instead of the specific food's guidance", body: "Recommended daily feed percentage varies by food brand, calorie density, and the pet's age, activity level and health status — always check the specific product's feeding guide rather than assuming one universal percentage fits every situation." },
      { title: "Not adjusting for weight changes over time", body: "As a growing puppy or kitten gains weight, or an adult pet's weight changes, the daily feed amount calculated here should be recalculated periodically rather than left fixed indefinitely." },
    ],
    faqs: [
      { q: "Why is daily feed given as a percentage of body weight rather than a fixed amount?", a: "It scales feeding appropriately across different sized pets — a fixed gram amount that's right for a small dog would badly underfeed a large one, so percentage-of-bodyweight is the more universal starting guide." },
      { q: "How accurate is the typical 2-3% range often quoted for dogs?", a: "It's a reasonable general starting point for adult maintenance, but puppies, very active dogs, and pets needing weight management often fall outside that range — check the specific food's packaging guidance for the most accurate figure." },
      { q: "Does this work the same way for cats?", a: "The same percentage-based logic applies, though typical percentages and feeding guidance differ from dogs — always use the specific product's recommended feeding amount for the pet's actual weight." },
      { q: "How do I use the 'days a bag lasts' figure practically?", a: "It's useful for timing reorders in advance, so a new bag arrives before the current one runs out, especially for pets on a specific prescription or specialty diet with longer delivery times." },
    ],
    related: ["walking-calories-calculator", "unit-price-calculator", "cooking-converter", "protein-intake-calculator", "calorie-calculator"],
  },

  "walking-calories-calculator": {
    intro:
      "Calories burned walking depends on body weight, how long you walk, and the intensity of the pace — a brisk walk and an uphill walk at the same duration burn noticeably different amounts.",
    method: [
      "Uses MET (Metabolic Equivalent of Task) values per pace: Slow 2.8, Brisk 4.3, Fast 5.0, Uphill 6.5.",
      "Calories = MET × 3.5 × weight (kg) ÷ 200 × duration (minutes), the standard MET-based calorie estimation formula.",
    ],
    example: {
      title: "Worked example: 72 kg person, 45 minutes, Brisk pace",
      lines: [
        "Calories = 4.3 × 3.5 × 72 ÷ 200 × 45.",
        "= (4.3 × 3.5 × 72 ÷ 200) × 45 ≈ 5.418 × 45 ≈ 243.8 kcal.",
      ],
    },
    mistakes: [
      { title: "Assuming pace alone determines calories burned, ignoring body weight", body: "A heavier person burns more calories at the identical pace and duration than a lighter person, because the formula scales directly with body weight — MET value alone doesn't tell the whole story." },
      { title: "Treating MET-based estimates as precisely accurate for every individual", body: "MET values are population averages — actual calorie burn varies with fitness level, terrain, stride efficiency and other individual factors, so this is a solid estimate rather than an exact personal measurement." },
    ],
    faqs: [
      { q: "What is a MET value, in plain terms?", a: "It's a standardised measure of how many times more energy an activity uses compared to resting quietly — a MET of 4.3 means the activity burns roughly 4.3 times the calories of sitting still." },
      { q: "Why does 'Uphill' burn so much more than 'Slow'?", a: "Working against gravity on an incline requires substantially more muscular effort than walking on flat ground, reflected in its much higher MET value (6.5 vs 2.8)." },
      { q: "How does this compare to calories burned running?", a: "Running typically has a considerably higher MET value than any walking pace, generally burning calories at a noticeably faster rate for the same duration." },
      { q: "Can I use this to plan a weight-loss target?", a: "It gives a reasonable estimate of calories burned per walk, which can inform a broader calorie deficit plan, but should be combined with an honest accounting of calories consumed via something like the Calorie Calculator for a complete picture." },
    ],
    related: ["calorie-calculator", "bmr-calculator", "tdee-calculator", "pet-food-calculator", "heart-rate-calculator"],
  },

  "screen-time-calculator": {
    intro:
      "A daily screen-time habit compounds into a genuinely large chunk of a life when projected forward — this makes that abstract 'a few hours a day' concrete in days per year and years per decade.",
    method: [
      "Hours per year = hours per day × 365.",
      "Full days per year = hours per year ÷ 24.",
      "Years per decade = (hours per year × 10) ÷ 8,760 (the total hours in a year).",
    ],
    example: {
      title: "Worked example: 4.5 hours per day",
      lines: [
        "Hours per year = 4.5 × 365 = 1,642.5.",
        "Full days = 1,642.5 ÷ 24 ≈ 68.4 days.",
        "Years per decade = (1,642.5 × 10) ÷ 8,760 ≈ 1.87 years.",
      ],
    },
    mistakes: [
      { title: "Assuming this projection accounts for changing habits over time", body: "This is a straight-line projection assuming today's daily average continues unchanged for a full decade — in reality, habits shift, so treat the decade figure as an illustrative 'if nothing changes' scenario rather than a firm prediction." },
      { title: "Not distinguishing between different kinds of screen time", body: "This calculator treats all screen hours the same, whether that's work on a laptop, video calls with family, or passive scrolling — the number itself doesn't judge which of those hours are valuable and which aren't." },
    ],
    faqs: [
      { q: "Why express this in 'years per decade' specifically?", a: "It reframes an easy-to-dismiss daily number into a scale that's harder to ignore — a habit that feels small day-to-day can add up to nearly two years of a ten-year period, which is a genuinely different way of seeing the same number." },
      { q: "Does this distinguish between work-related and leisure screen time?", a: "No — it's a single daily-hours input covering all screen use combined. For a more meaningful personal breakdown, run the calculation separately for work versus leisure hours if you track them separately." },
      { q: "How could I use this number constructively rather than just alarmingly?", a: "As a starting point for deciding whether the current daily average matches your own priorities — the number itself is neutral; what it's spent on is what determines whether it's time well used." },
      { q: "Is there a 'healthy' amount of daily screen time this implies?", a: "This calculator doesn't set a target — it simply projects whatever daily figure you enter, leaving the judgment of what's appropriate to the individual and their own circumstances." },
    ],
    related: ["internet-speed-calculator", "electricity-bill-calculator", "sleep-cycle-calculator", "password-strength-calculator", "average-calculator"],
  },

  "flight-carbon-calculator": {
    intro:
      "A flight's carbon footprint scales with distance, how many people are travelling together, and the cabin class booked — business class carries a meaningfully larger footprint per person than economy for the identical route.",
    method: [
      "Emissions (kg CO₂) = distance (km) × emission factor for cabin class × number of passengers.",
      "Emission factors used: Economy 0.09 kg/km, Premium 0.14 kg/km, Business 0.26 kg/km.",
      "Trees-to-offset estimate = total kg CO₂ ÷ 21 (an approximate figure for CO₂ absorbed by one tree per year).",
    ],
    example: {
      title: "Worked example: 1,200 km flight, 2 passengers, Economy",
      lines: [
        "Emissions = 1,200 × 0.09 × 2 = 216 kg CO₂.",
        "Trees to offset for a year ≈ 216 ÷ 21 ≈ 10.3 trees.",
        "The same trip in Business class instead: 1,200 × 0.26 × 2 = 624 kg CO₂ — nearly three times the footprint for the same route and passenger count.",
      ],
    },
    mistakes: [
      { title: "Assuming cabin class doesn't affect the footprint since the plane is the same", body: "Business and first-class seats take up significantly more physical space per passenger, meaning fewer people share the same flight's total emissions — this is why the per-passenger footprint is meaningfully higher in premium cabins even on an identical flight." },
      { title: "Treating this as a precise measurement rather than an estimate", body: "Real emissions depend on the specific aircraft type, load factor, routing, and airline — these emission factors are reasonable industry-style averages for estimation, not an exact figure for any specific flight." },
    ],
    faqs: [
      { q: "Why does business class have a higher emissions factor per passenger?", a: "Premium cabin seats take up more of the aircraft's total space and weight allowance per person, meaning the plane's total emissions are divided among fewer passengers in that class compared to economy." },
      { q: "How reliable is the 'trees to offset' figure?", a: "It's a rough, illustrative estimate — actual CO₂ absorption per tree varies enormously by species, age, and growing conditions, so treat this as a relatable comparison rather than a precise offset calculation." },
      { q: "Does distance alone determine total flight emissions accurately?", a: "It's the primary driver and a reasonable basis for estimation, though real-world factors like ascent/descent patterns, aircraft efficiency, and routing can shift actual per-flight emissions somewhat from a pure distance-based estimate." },
      { q: "How does flying compare to other forms of long-distance travel for emissions?", a: "Aviation emissions per passenger-kilometre are generally higher than rail and often higher than car travel for equivalent distances, though this varies by specific circumstances and vehicle occupancy." },
    ],
    related: ["fuel-cost-calculator", "travel-cost-calculator", "electricity-bill-calculator", "density-calculator", "half-life-calculator"],
  },
};
