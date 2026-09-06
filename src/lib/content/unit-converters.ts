import type { ContentMap } from "./types";

/* Batch 11 — Unit Converters. This category actually has 18 calculators, not
   the 3 originally visible in a simple slug scan — 8 are built via the
   makeConverter() factory and 8 via the unitConverter() factory, both in
   calculators.ts / calculators-extra.ts. Every conversion factor below is
   copied directly from those factory calls. angle-converter is this
   category's highest-impression page per Search Console data (21
   impressions), so it gets the deepest treatment. */

export const unitConvertersContent: ContentMap = {
  "angle-converter": {
    intro:
      "Degrees, radians, gradians and turns all measure the same thing — rotation — but different fields default to different units, which is exactly why a CAD drawing in degrees and a physics formula in radians need converting before they'll agree.",
    method: [
      "Every unit converts through degrees as the common base: 1 Radian = 57.2957795°, 1 Gradian = 0.9°, 1 Turn = 360°, 1 Arcminute = 1/60°.",
      "To convert, the input is scaled to degrees, then from degrees to the target unit.",
    ],
    example: {
      title: "Worked example: π radians to degrees",
      lines: [
        "π ≈ 3.14159 radians.",
        "3.14159 × 57.2957795 ≈ 180°.",
        "This confirms the well-known identity that π radians equals exactly 180°.",
      ],
    },
    mistakes: [
      { title: "Leaving a calculator's angle mode on the wrong unit before converting", body: "A scientific calculator's trig functions interpret angle inputs according to its own mode setting (degrees or radians) — converting a value here doesn't change that mode, so it still needs to be set correctly wherever the converted value is actually used." },
      { title: "Assuming 'gradian' is the same as 'degree'", body: "A gradian divides a full circle into 400 parts rather than 360, making 1 gradian = 0.9° exactly — close enough in casual glancing to be confused with degrees, but a meaningfully different unit used mainly in surveying and some European engineering contexts." },
    ],
    faqs: [
      { q: "Why does a full circle equal 360° but 2π radians?", a: "Degrees are an arbitrary historical division of the circle (360, likely chosen for its many divisors); radians are defined geometrically as the ratio of arc length to radius, making a full circle exactly 2π radians — a definition rooted in the circle's own geometry rather than an arbitrary count." },
      { q: "Where are gradians actually used?", a: "Mainly in surveying and some European engineering and cartography contexts, where a 400-gradian circle offers convenient decimal subdivisions (100 gradians per quarter turn) compared to degrees' less decimal-friendly 90 per quarter turn." },
      { q: "How do I convert directly between radians and turns?", a: "1 turn = 2π radians ≈ 6.2832 radians — so dividing a radian value by roughly 6.2832 gives the equivalent number of full turns." },
      { q: "Why do trigonometric functions in most programming languages expect radians?", a: "Radians make calculus involving trig functions (derivatives, integrals) mathematically clean without extra conversion constants — this mathematical convenience is why radians became the standard internal unit in most programming languages and scientific computing, even though degrees remain more intuitive for everyday human use." },
    ],
    related: ["scientific-calculator", "geometry-calculator", "circle-calculator", "pythagorean-theorem-calculator", "length-converter"],
  },

  "length-converter": {
    intro:
      "Millimetres to miles and everything between, including the metric-imperial divide that trips up any project involving both systems at once — a US-sourced part drawing next to a metric assembly, for instance.",
    method: [
      "All units convert through metres as the common base — 1 Inch = 0.0254 m, 1 Foot = 0.3048 m, 1 Mile = 1,609.344 m, and so on.",
    ],
    example: {
      title: "Worked example: 5 miles to kilometres",
      lines: ["5 × 1,609.344 = 8,046.72 metres.", "8,046.72 ÷ 1,000 = 8.04672 kilometres."],
    },
    mistakes: [
      { title: "Rounding the mile-to-kilometre conversion too aggressively for precise work", body: "The often-quoted 'roughly 1.6 km per mile' shorthand is fine for a mental estimate, but the true factor is 1.609344 — for anything requiring genuine precision (engineering, navigation), the rounded shortcut introduces meaningful error over longer distances." },
      { title: "Confusing a nautical mile with a standard (statute) mile", body: "A nautical mile (1,852 m, defined via Earth's geometry for navigation) is longer than a standard mile (1,609.344 m) — using the wrong one in a maritime or aviation context produces a distance error of over 15%." },
    ],
    faqs: [
      { q: "Why is an inch defined as exactly 0.0254 metres?", a: "This exact value was formally adopted by international agreement in 1959, defining the inch precisely in terms of the metre rather than the reverse — before that, minor historical variations existed between different countries' inch definitions." },
      { q: "What's the difference between a nautical mile and a regular mile?", a: "A nautical mile (1,852 m) is based on one minute of latitude along a meridian, making it directly useful for navigation; a standard mile (1,609.344 m) has a different historical origin unrelated to Earth's geometry." },
      { q: "How precise is the metric system compared to imperial for everyday conversions?", a: "Metric units convert between each other by clean powers of 10 (mm to cm to m to km), while imperial units use irregular historical ratios (12 inches per foot, 3 feet per yard, 1,760 yards per mile) — this is why metric-to-metric conversions are simpler than metric-to-imperial ones." },
      { q: "Can this be used for very small or very large distances?", a: "Yes, the same linear scaling applies regardless of magnitude — from millimetres for precision engineering up through kilometres and miles for travel distances." },
    ],
    related: ["weight-converter", "area-converter", "speed-converter", "volume-converter", "angle-converter"],
  },

  "weight-converter": {
    intro:
      "Milligrams to tonnes, including the everyday metric-imperial mismatch of kilograms versus pounds that shows up on every food label, luggage scale, and body-weight conversation between countries using different default units.",
    method: [
      "All units convert through kilograms as the base — 1 Ounce = 0.0283495 kg, 1 Pound = 0.453592 kg, 1 Stone = 6.35029 kg, 1 Tonne = 1,000 kg.",
    ],
    example: {
      title: "Worked example: 154 pounds to kilograms",
      lines: ["154 × 0.453592 ≈ 69.85 kg.", "The same 69.85 kg converts to stone as 69.85 ÷ 6.35029 ≈ 11 stone — a common way body weight is expressed in the UK."],
    },
    mistakes: [
      { title: "Confusing a metric tonne with a US 'short ton'", body: "A metric tonne (1,000 kg) differs from a US short ton (about 907.18 kg) — using the wrong one for a shipping weight or heavy machinery spec introduces an error of roughly 10%, which matters significantly at industrial scale." },
      { title: "Mixing up mass units with force/weight units", body: "Kilograms and pounds here measure mass, not force — for engineering contexts where weight-as-a-force matters (like structural loading), the corresponding force in newtons or pound-force needs the separate Force Converter, since mass and force aren't interchangeable despite colloquial 'weight' language blurring the two." },
    ],
    faqs: [
      { q: "Why does the UK commonly use 'stone' for body weight?", a: "It's a historical British and Irish unit that remains in common everyday use for describing a person's weight in those countries, even though kilograms are the standard scientific and most other everyday-use unit there." },
      { q: "How many pounds are in a stone?", a: "Exactly 14 pounds — this is a fixed historical definition, unlike some other imperial unit relationships that vary by context." },
      { q: "Is a US 'ton' the same as a metric 'tonne'?", a: "No — a US short ton is about 907.18 kg, while a metric tonne is exactly 1,000 kg; there's also a UK 'long ton' (about 1,016 kg) distinct from both, making 'ton' an ambiguous term without specifying which convention is meant." },
      { q: "Why is milligram precision relevant for anything practical?", a: "Pharmaceutical dosing, jewellery (precious metals), and some scientific and lab contexts require milligram-level precision, where even small unit-conversion errors could have meaningful real-world consequences." },
    ],
    related: ["length-converter", "density-converter", "force-converter", "pet-food-calculator", "steel-weight-calculator"],
  },

  "area-converter": {
    intro:
      "Square metres to acres and hectares — the units that show up constantly in real estate, farming and land measurement, where the metric-imperial divide is especially pronounced by country and industry.",
    method: [
      "All units convert through square metres as the base — 1 Acre = 4,046.86 m², 1 Hectare = 10,000 m², 1 Square foot = 0.092903 m².",
    ],
    example: {
      title: "Worked example: a 2-hectare plot to acres",
      lines: [
        "2 × 10,000 = 20,000 m².",
        "20,000 ÷ 4,046.86 ≈ 4.94 acres.",
      ],
    },
    mistakes: [
      { title: "Assuming an acre and a hectare are roughly the same size", body: "A hectare (10,000 m²) is about 2.47 times larger than an acre (4,046.86 m²) — treating them as interchangeable when comparing land sizes across countries using different conventions leads to a significant misjudgment of actual area." },
      { title: "Squaring a linear conversion factor incorrectly when converting by hand", body: "Converting an area given in square feet to square metres isn't just multiplying by the linear length conversion factor (0.3048) — it requires squaring that factor (0.3048² ≈ 0.092903), since area scales with the square of linear dimensions, not linearly." },
    ],
    faqs: [
      { q: "Why is a hectare a commonly used unit despite not being a 'clean' round number of square metres?", a: "A hectare is defined as exactly 100m × 100m — a clean and practical field or plot size in metric terms, even though its conversion to acres or square feet doesn't look as clean." },
      { q: "How big is an acre in everyday terms?", a: "Roughly the size of a standard American football field including the end zones, or about 4,047 square metres — a useful mental anchor for picturing land area described in acres." },
      { q: "Does this handle very small areas, like square centimetres for a lab or craft context?", a: "This specific tool's unit list is focused on land-scale units — for very small area conversions, converting via the base square-metre figure using a length-squared calculation covers smaller units not directly listed." },
      { q: "How is area different from volume when converting units?", a: "Area conversions involve squaring a linear conversion factor (since area is length × length); volume conversions involve cubing it (length × length × length) — using the wrong power for either produces a substantially wrong result." },
    ],
    related: ["length-converter", "volume-converter", "concrete-volume-calculator", "circle-calculator", "geometry-calculator"],
  },

  "volume-converter": {
    intro:
      "From a millilitre to a gallon, including the often-overlooked detail that a US gallon and a UK gallon aren't the same size — a genuinely common source of recipe and fuel-economy confusion between countries.",
    method: [
      "All units convert through litres as the base — 1 Cubic metre = 1,000 L, 1 Gallon (US) = 3.785412 L, 1 Gallon (UK) = 4.54609 L, 1 Cup (US) = 0.2365882 L.",
    ],
    example: {
      title: "Worked example: 10 US gallons to litres, compared with UK gallons",
      lines: [
        "10 × 3.785412 = 37.85412 litres (US gallons).",
        "The same 10 UK gallons instead: 10 × 4.54609 = 45.4609 litres — about 20% more volume for the same nominal '10 gallons', purely from the definition difference.",
      ],
    },
    mistakes: [
      { title: "Assuming a US gallon and UK (imperial) gallon are interchangeable", body: "A UK gallon is about 20% larger than a US gallon — this matters significantly for fuel economy comparisons (miles per gallon means something different in each country) and any recipe or industrial specification crossing between US and UK conventions." },
      { title: "Confusing a US cup with a metric or Commonwealth 'cup'", body: "As with the Cooking Converter, the US customary cup (236.5882 ml) differs slightly from a metric cup sometimes informally treated as 250 ml — a small but real difference for precision baking." },
    ],
    faqs: [
      { q: "Why do the US and UK use different gallon sizes?", a: "They stem from different historical definitions that were never fully unified between the US and Britain — the US retained an older wine-gallon-based definition while the UK adopted a different standard, and the two never converged." },
      { q: "How does this affect fuel economy figures between countries?", a: "A car quoted as getting '40 MPG' in the UK is not directly comparable to '40 MPG' in the US, since the underlying gallon size differs — converting both to a common unit like litres per 100km is the only fair comparison." },
      { q: "What's the exact relationship between a litre and a cubic metre?", a: "1 cubic metre = 1,000 litres exactly, since a litre is defined as exactly 1,000 cubic centimetres, and a cubic metre contains 100³ = 1,000,000 cubic centimetres." },
      { q: "How is this related to the Fuel Economy Converter?", a: "That tool handles the combined distance-and-volume conversion (km/l, MPG, L/100km) directly; this tool handles pure volume-to-volume conversion on its own, useful as a building block for many other calculations." },
    ],
    related: ["fuel-economy-converter", "cooking-converter", "length-converter", "flow-rate-converter", "pipe-flow-rate-calculator"],
  },

  "speed-converter": {
    intro:
      "Metres per second, kilometres per hour, miles per hour and knots — the units that different countries, industries and contexts (road signs, aviation, sailing) all default to differently for the same underlying physical quantity.",
    method: [
      "All units convert through metres per second as the base — 1 km/h = 0.277778 m/s, 1 mph = 0.44704 m/s, 1 Knot = 0.514444 m/s.",
    ],
    example: {
      title: "Worked example: 100 km/h to mph and knots",
      lines: [
        "100 × 0.277778 ≈ 27.78 m/s (converting to the base unit).",
        "27.78 ÷ 0.44704 ≈ 62.14 mph.",
        "27.78 ÷ 0.514444 ≈ 54.0 knots.",
      ],
    },
    mistakes: [
      { title: "Assuming a knot is the same as a mile per hour", body: "A knot (0.514444 m/s) is based on nautical miles per hour, not standard miles per hour (0.44704 m/s) — these are close but genuinely different values, and confusing them in aviation or maritime contexts introduces a real, non-trivial speed error." },
      { title: "Using road-vehicle speed intuition to judge wind or aircraft speeds", body: "Wind speeds and aircraft speeds are often reported in knots specifically because of maritime and aviation convention — applying everyday km/h or mph intuition directly to a knot figure without converting can meaningfully misjudge the actual speed involved." },
    ],
    faqs: [
      { q: "Why does aviation and sailing use knots instead of km/h or mph?", a: "Knots are directly tied to nautical miles, which relate cleanly to degrees of latitude for navigation purposes — this made knots a practical, navigation-friendly unit long before km/h or mph existed as alternatives, and the convention has persisted." },
      { q: "How do I quickly estimate km/h from m/s in my head?", a: "Multiply by roughly 3.6 (since 1 km/h ≈ 0.278 m/s, and 1 ÷ 0.278 ≈ 3.6) — a useful mental shortcut for converting metric speed units without needing exact precision." },
      { q: "Is there a simple way to convert mph to km/h approximately?", a: "Multiplying by 1.6 gives a reasonably close approximation (the true factor is closer to 1.609), useful for quick mental estimates like judging a foreign speed limit sign." },
      { q: "How does this relate to the RPM-to-Speed Calculator?", a: "That tool derives a surface speed specifically from a rotating object's RPM and diameter; this converter simply translates an already-known speed value between different speed units, without any rotational geometry involved." },
    ],
    related: ["rpm-to-speed-calculator", "length-converter", "fuel-economy-converter", "velocity-calculator", "acceleration-calculator"],
  },

  "pressure-converter": {
    intro:
      "Pascals, bars, PSI and atmospheres — pressure units that vary by industry (tyre pressure in PSI, weather in millibars/hPa, scientific work in pascals) more than almost any other physical quantity in everyday use.",
    method: [
      "All units convert through pascals as the base — 1 Bar = 100,000 Pa, 1 PSI = 6,894.757 Pa, 1 Atmosphere = 101,325 Pa, 1 Torr = 133.322 Pa.",
    ],
    example: {
      title: "Worked example: 32 PSI (a typical car tyre pressure) to bar",
      lines: [
        "32 × 6,894.757 ≈ 220,632.2 Pa.",
        "220,632.2 ÷ 100,000 ≈ 2.21 bar.",
      ],
    },
    mistakes: [
      { title: "Confusing gauge pressure and absolute pressure when converting", body: "A tyre pressure gauge reads pressure above atmospheric (gauge pressure), not the true absolute pressure — converting a gauge PSI reading directly without accounting for this distinction can matter in contexts (like the Pressure at Depth Calculator) where absolute pressure is specifically needed." },
      { title: "Assuming 1 atmosphere and 1 bar are the same", body: "They're close (1 atm = 1.01325 bar) but not identical — for most everyday purposes the difference is negligible, but it's worth knowing they aren't defined as exactly equal." },
    ],
    faqs: [
      { q: "Why is standard atmospheric pressure exactly 101,325 Pa?", a: "It's an internationally defined reference value representing typical sea-level atmospheric pressure, used as a standard baseline across science and engineering, even though actual atmospheric pressure varies somewhat with weather and altitude." },
      { q: "What's the difference between Torr and mmHg?", a: "They're essentially interchangeable in practice — Torr was defined to closely match the older millimetres-of-mercury pressure unit historically used in barometers, with only a vanishingly small technical difference between the two definitions." },
      { q: "Why do car tyres use PSI in some countries and bar in others?", a: "It's largely a matter of regional convention rather than technical necessity — PSI is standard in the US, while bar (or kPa) is more common in much of Europe and elsewhere, requiring conversion when comparing specs across regions." },
      { q: "How is this related to the Pressure at Depth Calculator?", a: "That tool calculates the specific pressure caused by a column of fluid at a given depth, expressed in pascals; this converter simply translates any already-known pressure value between different pressure units generally." },
    ],
    related: ["pressure-at-depth-calculator", "density-converter", "force-converter", "power-converter", "flow-rate-converter"],
  },

  "data-storage-converter": {
    intro:
      "Bits, bytes, kilobytes through petabytes — this uses the binary convention (1,024 per step) that operating systems and memory hardware actually use internally, rather than the decimal 1,000-per-step convention some storage marketing uses.",
    method: [
      "All units convert through bytes as the base, using binary scaling — 1 Kilobyte = 1,024 bytes, 1 Megabyte = 1,024² bytes, 1 Gigabyte = 1,024³ bytes, and so on, with 1 Bit = 1/8 byte.",
    ],
    example: {
      title: "Worked example: 8 gigabytes to megabytes",
      lines: [
        "8 × 1,024³ bytes = 8 × 1,073,741,824 = 8,589,934,592 bytes.",
        "8,589,934,592 ÷ 1,024² = 8,192 megabytes.",
      ],
    },
    mistakes: [
      { title: "Assuming 1 GB always means exactly 1,000 MB", body: "Storage device manufacturers often market capacity using the decimal convention (1 GB = 1,000 MB = 1,000,000,000 bytes), while operating systems typically report capacity using the binary convention this calculator uses (1 GB = 1,024 MB) — this is exactly why a '1 TB' drive shows up as somewhat less than 1,000 GB when checked in a file browser." },
      { title: "Confusing bits and bytes in a data-transfer context", body: "As with internet speed calculations, storage size (bytes) and connection speed (bits) are different units — 1 byte equals 8 bits, so mixing them up produces results off by a factor of 8." },
    ],
    faqs: [
      { q: "Why is there a difference between the 'decimal' and 'binary' definitions of a gigabyte?", a: "Computer memory is naturally organized in powers of 2 (binary), making 1,024 a more technically natural grouping than 1,000 — but decimal SI prefixes (kilo=1,000, mega=1,000,000) were borrowed for convenience, creating two competing conventions that are both still in active, sometimes conflicting use today." },
      { q: "Why does my new hard drive show less capacity than advertised?", a: "The manufacturer almost certainly used the decimal convention (1 TB = 1,000,000,000,000 bytes) for marketing, while the operating system reports capacity using the binary convention (dividing that same byte count by 1,024³ instead of 1,000³) — the drive isn't actually missing storage, it's a unit-convention mismatch." },
      { q: "Is there a more precise term for the binary-based units to avoid this confusion?", a: "Yes — 'gibibyte' (GiB), 'mebibyte' (MiB) and similar 'kibi/mebi/gibi' terms were formally introduced specifically to distinguish binary-based (1,024) units from decimal-based (1,000) ones, though the older, ambiguous 'GB/MB' terminology remains far more common in everyday use." },
      { q: "How does this relate to the Internet Speed and File Transfer Time calculators?", a: "Both of those tools perform this same bit-versus-byte and 1,024-scaling conversion internally as part of estimating transfer time — this converter exposes that same underlying conversion as a standalone, general-purpose tool." },
    ],
    related: ["internet-speed-calculator", "file-transfer-time-calculator", "binary-converter", "hex-converter", "password-strength-calculator"],
  },

  "energy-converter": {
    intro:
      "Joules, calories, watt-hours and BTUs — energy units that vary by field (physics in joules, nutrition in calories, electricity billing in kilowatt-hours, heating/cooling in BTU) more than almost any other physical quantity.",
    method: [
      "All units convert through joules as the base — 1 Calorie = 4.184 J, 1 Kilocalorie = 4,184 J, 1 Watt hour = 3,600 J, 1 Kilowatt hour = 3.6×10⁶ J, 1 BTU = 1,055.06 J.",
    ],
    example: {
      title: "Worked example: a 2,000 kilocalorie daily diet, converted to kilojoules",
      lines: [
        "2,000 × 4,184 = 8,368,000 J.",
        "8,368,000 ÷ 1,000 = 8,368 kJ.",
      ],
    },
    mistakes: [
      { title: "Confusing a nutritional 'Calorie' with a scientific 'calorie'", body: "Food labels' 'Calorie' (capital C) is actually a kilocalorie (1,000 small calories) in scientific terms — this is why a nutritional label's '200 Calories' corresponds to 200,000 small calories, a distinction that matters when converting between nutritional and scientific energy figures." },
      { title: "Mixing up energy (joules, kWh) with power (watts)", body: "Energy is a total amount; power is a rate of energy use over time — a kilowatt-hour is a unit of energy (power × time), not power itself, which is why 'kWh' shows up on electricity bills (measuring total energy consumed) rather than as an instantaneous power rating." },
    ],
    faqs: [
      { q: "Why does a food label's 'Calorie' actually mean 1,000 scientific calories?", a: "This is a long-standing but often unstated convention in nutrition labelling — the capitalised 'Calorie' (kilocalorie) became the practical standard for food energy since raw calorie counts for food would otherwise be inconveniently large numbers." },
      { q: "How is a kilowatt-hour related to a joule?", a: "1 kWh = 3.6 million joules — it represents the energy used by a 1,000-watt device running for exactly one hour, and is the standard unit electricity is billed in specifically because it's a practically-sized number for household energy consumption." },
      { q: "Why is BTU used for heating and cooling systems specifically?", a: "It's a historical unit from imperial-based engineering that remains the entrenched standard for HVAC system ratings in several countries, even as most other engineering fields have moved to metric-based joules." },
      { q: "How does this relate to the Energy Calculator (kinetic/potential energy)?", a: "That tool calculates mechanical energy values directly in joules from physical quantities like mass, velocity and height; this converter translates an already-known energy value between different energy units generally, regardless of how that energy was originally calculated." },
    ],
    related: ["energy-calculator", "electricity-bill-calculator", "calorie-calculator", "power-converter", "watt-calculator"],
  },

  "time-converter": {
    intro:
      "Seconds up through years, all in one place — useful whenever a duration is given in one unit but needed in another, from converting a stopwatch reading to years for a long-term projection.",
    method: [
      "All units convert through seconds as the base — 1 Minute = 60 s, 1 Hour = 3,600 s, 1 Day = 86,400 s, 1 Week = 604,800 s, 1 Month = 2,629,800 s (an average month), 1 Year = 31,557,600 s (an average year, accounting for leap years).",
    ],
    example: {
      title: "Worked example: 1 million seconds to days",
      lines: [
        "1,000,000 ÷ 86,400 ≈ 11.57 days.",
        "This is a genuinely useful benchmark: a million seconds is just under 12 days, while a billion seconds is closer to 31.7 years — a striking illustration of how quickly scale compounds between a million and a billion.",
      ],
    },
    mistakes: [
      { title: "Assuming 'month' has one fixed, universal length", body: "This calculator uses an average month length (2,629,800 seconds, based on a 365.25-day year divided by 12) since actual months vary from 28 to 31 days — for exact calendar-specific month calculations, a dedicated date tool like the Date Difference Calculator handles real calendar months more precisely." },
      { title: "Using a flat 365-day year instead of accounting for leap years in the 'year' conversion", body: "This converter's 'year' value (31,557,600 seconds) is based on 365.25 days specifically to account for the extra day added roughly every 4 years — a plain 365-day year assumption would drift slightly out of sync with true elapsed time over many years." },
    ],
    faqs: [
      { q: "Why is the 'month' conversion an average rather than an exact figure?", a: "Because real months vary in length (28 to 31 days), there's no single 'correct' seconds-per-month value — this calculator uses the mathematically averaged figure across a full year, which is the most reasonable single number for general-purpose conversion." },
      { q: "How many seconds are in a full day?", a: "Exactly 86,400 — this comes from 24 hours × 60 minutes × 60 seconds, and is one of the few time conversions with no ambiguity or approximation involved." },
      { q: "Why does a year have 31,557,600 seconds rather than the 'simpler' 31,536,000 (365 × 86,400)?", a: "This calculator uses 365.25 days per year (accounting for the extra day added roughly every 4 years by leap years) rather than a flat 365, giving a more astronomically accurate average year length for long-duration conversions." },
      { q: "Is this the same conversion the Screen Time Calculator uses for its yearly projections?", a: "That calculator performs a similar seconds/days/years-style conversion internally for its own specific projection — this tool exposes the same general time-unit conversion as a standalone utility for any duration conversion need." },
    ],
    related: ["date-difference-calculator", "screen-time-calculator", "countdown-timer", "add-days-calculator", "week-number-calculator"],
  },

  "force-converter": {
    intro:
      "Newtons, pound-force, and kilogram-force — the everyday confusion of using a mass unit (kilograms) to informally describe a force is exactly why 'kilogram-force' exists as its own distinct, formally defined unit.",
    method: [
      "All units convert through newtons as the base — 1 Pound-force = 4.44822 N, 1 Kilogram-force = 9.80665 N (the force exerted by 1 kg under standard Earth gravity), 1 Dyne = 0.00001 N.",
    ],
    example: {
      title: "Worked example: 500 newtons to pound-force",
      lines: ["500 ÷ 4.44822 ≈ 112.4 lbf."],
    },
    mistakes: [
      { title: "Treating 'kilogram-force' as interchangeable with plain 'kilogram'", body: "A kilogram is a unit of mass; kilogram-force is a unit of force specifically defined as the force a 1 kg mass experiences under standard Earth gravity (9.80665 m/s²) — they're related but conceptually distinct, and mixing them up is a common source of confusion in informally described 'weight' figures." },
      { title: "Applying Earth-standard kilogram-force conversions in a different-gravity context", body: "Kilogram-force is specifically defined using standard Earth gravity — using it to describe force on the Moon or in a different gravitational context without adjustment would be technically inconsistent, since the same mass experiences a different actual force under different gravity." },
    ],
    faqs: [
      { q: "Why does the SI unit newton exist separately from kilogram-force?", a: "The newton is defined purely from mass, length and time (F = ma) without reference to any specific gravitational field, making it a universally consistent unit regardless of location — kilogram-force is tied specifically to Earth's standard gravity, making it less universal but more intuitively 'weight-like' in everyday informal use." },
      { q: "What's a dyne, and why is it so much smaller than a newton?", a: "A dyne is a unit from the older CGS (centimetre-gram-second) system of units — it's 100,000 times smaller than a newton, reflecting the smaller base units (centimetres and grams) that CGS uses compared to the metre-kilogram-second SI system." },
      { q: "How is force different from the pressure or torque units also covered elsewhere?", a: "Force is a straightforward push or pull; pressure is force distributed over an area; torque is force applied at a distance from a pivot point causing rotation — all three are related but measure conceptually distinct things, each with their own dedicated converter here." },
      { q: "Where does pound-force commonly get used?", a: "It's still common in US engineering and aerospace contexts, alongside the related but distinct 'pound-mass' — the two are easy to conflate since they share the word 'pound', despite measuring different physical quantities much like the kilogram/kilogram-force distinction." },
    ],
    related: ["torque-converter", "pressure-converter", "force-calculator", "weight-converter", "power-converter"],
  },

  "power-converter": {
    intro:
      "Watts, kilowatts, horsepower and BTU/hour — the units that make comparing a car engine's rating to a household appliance's rating, or an air conditioner's cooling capacity to an electric motor, actually possible.",
    method: [
      "All units convert through watts as the base — 1 Kilowatt = 1,000 W, 1 Megawatt = 1,000,000 W, 1 Horsepower = 745.7 W, 1 BTU/hour = 0.293071 W.",
    ],
    example: {
      title: "Worked example: a 150 horsepower engine, converted to kilowatts",
      lines: ["150 × 745.7 = 111,855 W.", "111,855 ÷ 1,000 ≈ 111.86 kW."],
    },
    mistakes: [
      { title: "Assuming all countries define 'horsepower' identically", body: "There are actually several slightly different historical horsepower definitions (mechanical/imperial horsepower, metric horsepower, and others) that differ by a small percentage — for most everyday comparisons the difference is minor, but it's not literally universal across every country and industry standard." },
      { title: "Using an air conditioner's BTU rating to directly infer its electrical power draw", body: "An air conditioner's BTU/hour rating describes its cooling capacity (heat removed), not its electrical power consumption directly — a unit's electrical efficiency (its coefficient of performance) determines how much actual electrical power in watts it draws to achieve that stated cooling capacity." },
    ],
    faqs: [
      { q: "Why is horsepower still used for vehicle engines when kilowatts is the SI standard?", a: "It's largely historical convention and market familiarity — many countries and industries continue to market and compare vehicle and engine power in horsepower even as most formal engineering work uses the SI standard of kilowatts internally." },
      { q: "What does a BTU/hour rating on an air conditioner actually tell me?", a: "It describes how much heat the unit can remove from a space per hour — a higher BTU/hour rating generally means it can cool a larger space, though actual cooling effectiveness also depends on insulation, climate and other factors." },
      { q: "How is power different from energy in this context?", a: "Power (watts, horsepower) is a rate — how fast energy is being used or produced; energy (joules, kWh) is the total amount — this converter handles rate (power) units specifically, while the separate Energy Converter handles total-amount units." },
      { q: "Why does converting horsepower to watts use the specific factor 745.7?", a: "This is the standard 'mechanical horsepower' definition's exact conversion factor to watts — a formally fixed historical value now used as the standard reference for this conversion." },
    ],
    related: ["energy-converter", "watt-calculator", "power-calculator", "electricity-bill-calculator", "torque-converter"],
  },

  "frequency-converter": {
    intro:
      "Hertz through gigahertz, plus RPM — the unit spanning everything from a slow rotating machine part to a processor's clock speed, all describing the same underlying idea of how many times something repeats per second.",
    method: [
      "All units convert through hertz as the base — 1 Kilohertz = 1,000 Hz, 1 Megahertz = 1,000,000 Hz, 1 Gigahertz = 1,000,000,000 Hz, 1 RPM = 1/60 Hz (since RPM counts revolutions per minute, not per second).",
    ],
    example: {
      title: "Worked example: a 3,000 RPM engine, converted to hertz",
      lines: ["3,000 ÷ 60 = 50 Hz.", "This makes sense: an engine spinning 3,000 times in a minute is completing 50 full revolutions every single second."],
    },
    mistakes: [
      { title: "Assuming RPM and Hz measure fundamentally different things", body: "They both measure rotational or cyclical rate — RPM is simply Hz scaled to a per-minute basis instead of per-second, making the conversion between them a straightforward factor of 60, not a conceptually different type of measurement." },
      { title: "Confusing processor clock speed (GHz) with actual computational performance", body: "A higher clock speed generally enables more operations per second, but modern processor performance also depends heavily on architecture, core count, and instruction efficiency — comparing two different processor models purely by GHz figure alone doesn't reliably predict which performs better overall." },
    ],
    faqs: [
      { q: "Why is engine speed measured in RPM rather than hertz?", a: "It's a long-standing automotive and mechanical engineering convention — RPM is simply a more intuitive, human-scaled number for describing rotational speeds in that context, even though it's mathematically just Hz scaled by 60." },
      { q: "How does frequency relate to wavelength?", a: "For any wave, frequency and wavelength are inversely related through the wave's speed (f = v/λ) — this specific relationship, and how to compute it, is covered in more detail by the Wave Frequency Calculator." },
      { q: "Why is 1 hertz defined as exactly 1 cycle per second?", a: "It's the modern SI unit definition, named after physicist Heinrich Hertz — 'cycle' can refer to any repeating event (a wave oscillation, a rotation, a digital clock pulse), making hertz a broadly applicable unit for describing repetition rate generally." },
      { q: "What's a typical range of gigahertz for a modern computer processor?", a: "This varies by generation and specific chip, but many consumer processors in recent years commonly clock somewhere in the low single-digit gigahertz range, with the exact figure changing as processor technology continues to advance." },
    ],
    related: ["wave-frequency-calculator", "gear-ratio-calculator", "rpm-to-speed-calculator", "pendulum-period-calculator", "torque-converter"],
  },

  "torque-converter": {
    intro:
      "Newton-metres, pound-feet, pound-inches and kilogram-metres — the units a torque wrench spec sheet, a car engine's torque rating, and a bolt-tightening manual might each use differently for the exact same physical quantity.",
    method: [
      "All units convert through newton-metres as the base — 1 Pound-foot = 1.35582 Nm, 1 Pound-inch = 0.112985 Nm, 1 Kilogram-metre = 9.80665 Nm.",
    ],
    example: {
      title: "Worked example: a bolt torqued to 25 Nm, converted to pound-feet",
      lines: ["25 ÷ 1.35582 ≈ 18.44 lb-ft."],
    },
    mistakes: [
      { title: "Confusing pound-foot with pound-inch", body: "These differ by a factor of 12 (since a foot is 12 inches) — using a pound-inch spec where pound-foot was intended (or vice versa) when torquing a fastener can result in either dangerous under-tightening or damaging over-tightening." },
      { title: "Assuming torque and work/energy (also measured in newton-metres) are the same thing", body: "As with the Torque Calculator itself, torque and energy share the same dimensional unit (Nm) but represent conceptually different physical quantities — a rotational force versus energy transferred, which is why they're treated as distinct despite the shared unit name." },
    ],
    faqs: [
      { q: "Why is precise torque conversion important for something like bolt tightening?", a: "Many mechanical specifications (engine components, wheel lug nuts, structural fasteners) specify an exact torque value for safety and reliability — using the wrong unit conversion when reading a spec sheet from a different regional convention could lead to a fastener being dangerously loose or damagingly over-tightened." },
      { q: "How is kilogram-metre used as a torque unit related to kilogram-force?", a: "It's built from the same kilogram-force concept (the force a 1kg mass exerts under standard gravity) applied at a 1-metre lever arm — this is why its conversion factor to newton-metres (9.80665) matches kilogram-force's conversion factor to newtons exactly." },
      { q: "Why do US car specifications often use pound-feet for torque?", a: "It's the conventional imperial torque unit used in US automotive and engineering contexts, analogous to how horsepower remains the conventional US power unit even as much of engineering standardises on SI units elsewhere." },
      { q: "How is this related to the plain Torque Calculator?", a: "That tool computes a torque value directly from force, lever-arm distance and angle; this converter simply translates an already-known torque value between different torque units, regardless of how it was originally calculated." },
    ],
    related: ["torque-calculator", "force-converter", "gear-ratio-calculator", "power-converter", "spring-constant-calculator"],
  },

  "flow-rate-converter": {
    intro:
      "Litres per second, cubic metres per hour, US gallons per minute and cubic feet per minute — the mismatched units that plumbing, HVAC and industrial fluid systems specs use depending on region and industry.",
    method: [
      "All units convert through litres per second as the base — 1 Litre/minute = 1/60 L/s, 1 Cubic metre/hour = 1/3.6 L/s, 1 Gallon/minute (US) = 0.0630902 L/s, 1 Cubic foot/minute = 0.471947 L/s.",
    ],
    example: {
      title: "Worked example: 500 US gallons per minute (GPM) to litres per second",
      lines: ["500 × 0.0630902 ≈ 31.55 L/s."],
    },
    mistakes: [
      { title: "Assuming a US gallon-based flow rate matches a UK-gallon-based one", body: "Since a US gallon and UK (imperial) gallon differ in size, a flow rate specified in 'gallons per minute' needs to specify which gallon convention is meant — mixing them up introduces roughly the same ~20% error the Volume Converter's gallon distinction would." },
      { title: "Confusing flow rate (volume per time) with flow velocity (distance per time)", body: "Flow rate describes how much volume passes a point per unit time; flow velocity describes how fast the fluid itself is moving — these are related (via the Pipe Flow Rate Calculator's area × velocity relationship) but are conceptually and dimensionally distinct quantities." },
    ],
    faqs: [
      { q: "Why does HVAC and plumbing use so many different flow-rate units?", a: "Different industries and regions developed their own conventional units historically (GPM in US plumbing, m³/h in much of metric-using industry, CFM for airflow specifically) — these conventions have persisted even as cross-regional and cross-industry comparisons increasingly require conversion." },
      { q: "How is this related to the Pipe Flow Rate Calculator?", a: "That tool derives flow rate directly from a pipe's diameter and the fluid's velocity through it; this converter simply translates an already-known flow-rate value between different flow-rate units, regardless of how it was originally derived." },
      { q: "Why is cubic feet per minute (CFM) specifically associated with airflow?", a: "It's the conventional unit for rating fans, HVAC air handling capacity, and ventilation systems in several countries, particularly common in US-based specifications for air-moving equipment." },
      { q: "Does flow rate unit choice affect the actual physical flow, or just how it's described?", a: "Only how it's described — the underlying physical flow is identical regardless of which unit is used to express it; converting between units changes the number, never the real-world flow itself." },
    ],
    related: ["pipe-flow-rate-calculator", "volume-converter", "density-converter", "pressure-converter", "concrete-volume-calculator"],
  },

  "density-converter": {
    intro:
      "Kilograms per cubic metre, grams per cubic centimetre, pounds per cubic foot — density units that materials science, cooking, and shipping specifications each default to differently for describing the exact same physical property.",
    method: [
      "All units convert through kilograms per cubic metre as the base — 1 Gram/cm³ = 1,000 kg/m³, 1 Pound/ft³ = 16.0185 kg/m³, 1 Pound/gallon (US) = 119.826 kg/m³.",
    ],
    example: {
      title: "Worked example: water's density, 1 g/cm³, converted to kg/m³",
      lines: ["1 × 1,000 = 1,000 kg/m³ — confirming the commonly cited reference value for water's density in either unit."],
    },
    mistakes: [
      { title: "Assuming density units convert with the same simple factor as the underlying mass or volume units alone", body: "Density conversions require handling both the mass unit and volume unit simultaneously (since density is mass per volume) — this is why the conversion factors here look more complex than a simple mass-to-mass or volume-to-volume conversion would." },
      { title: "Mixing up specific gravity (a unitless ratio) with density (a unit-bearing quantity)", body: "Specific gravity is density divided by water's density, producing a plain number with no units attached; density itself always carries units (kg/m³, g/cm³, etc.) — treating a specific gravity figure as if it were already in a specific density unit skips a necessary conversion step." },
    ],
    faqs: [
      { q: "Why is water's density used as such a common reference point?", a: "It's a universally recognisable, easily remembered benchmark (1 g/cm³ or 1,000 kg/m³) that makes it intuitive to judge whether another material is denser or less dense than water, and therefore whether it would sink or float in it." },
      { q: "How is this related to the plain Density Calculator?", a: "That tool computes density directly from a measured mass and volume; this converter translates an already-known density value between different density units, regardless of how it was originally measured or calculated." },
      { q: "Why do US material specifications sometimes use pounds per gallon for density?", a: "It's a conventional unit in certain US industrial and shipping contexts (particularly for liquids), analogous to how other US-specific units (GPM, PSI) persist in their respective industries despite most of the world using metric density units." },
      { q: "Does density change with temperature, and does that affect these conversion factors?", a: "The conversion factors between units are fixed mathematical relationships and don't change with temperature — but the actual density value of a real substance does change with temperature, which is a separate consideration from the unit conversion itself." },
    ],
    related: ["density-calculator", "pressure-at-depth-calculator", "weight-converter", "volume-converter", "steel-weight-calculator"],
  },

  "temperature-converter": {
    intro:
      "Celsius, Fahrenheit and Kelvin don't share a common zero point the way most unit systems do — this is why temperature conversion needs both a scaling factor and an offset, unlike a simple multiplication for most other unit types.",
    method: [
      "Converting to Celsius first as an intermediate step: from Fahrenheit, °C = (°F − 32) × 5/9; from Kelvin, °C = K − 273.15.",
      "Then converting from Celsius to the target unit: to Fahrenheit, °F = °C × 9/5 + 32; to Kelvin, K = °C + 273.15.",
    ],
    example: {
      title: "Worked example: 98.6°F (a commonly cited average body temperature) to Celsius",
      lines: ["(98.6 − 32) × 5/9 = 66.6 × 5/9 ≈ 37°C."],
    },
    mistakes: [
      { title: "Applying only a scaling factor without the necessary offset", body: "Unlike most unit conversions (which are pure multiplication), Fahrenheit-Celsius conversion specifically requires both a scaling factor (5/9 or 9/5) and an additive offset (32) — omitting the offset and only scaling produces a systematically wrong result at every temperature except one specific crossover point." },
      { title: "Forgetting Kelvin has no negative values", body: "Kelvin is an absolute temperature scale starting at absolute zero (0 K = −273.15°C) — there's no such thing as a negative Kelvin temperature in standard physics, unlike Celsius and Fahrenheit which both extend into negative values comfortably." },
    ],
    faqs: [
      { q: "Why do Celsius and Fahrenheit need an offset in their conversion, unlike most units?", a: "They use different zero points by definition — 0°C is water's freezing point, while 0°F was defined differently by its original creator — because the two scales don't share a common zero, a simple multiplication alone can't align them; an additive shift is also required." },
      { q: "What temperature is the same numerical value in both Celsius and Fahrenheit?", a: "−40 degrees — this is the one specific point where both scales happen to coincide exactly, since C = (C×9/5)+32 −32 solves uniquely to C = −40." },
      { q: "Why does science generally prefer Kelvin over Celsius or Fahrenheit?", a: "Kelvin is an absolute scale directly tied to a physical zero point (the theoretical absence of thermal motion), making it mathematically cleaner for physics equations involving temperature, particularly anywhere a ratio or proportional relationship with temperature is involved." },
      { q: "Is there a quick mental shortcut for Celsius to Fahrenheit?", a: "Doubling the Celsius value and adding 30 gives a reasonably close approximation for everyday use, though the exact formula (×9/5, +32) should be used whenever real precision matters." },
    ],
    related: ["density-converter", "energy-converter", "pressure-converter", "half-life-calculator", "bmr-calculator"],
  },

  "fuel-economy-converter": {
    intro:
      "Kilometres per litre, miles per gallon, and litres per 100 kilometres describe fuel efficiency in genuinely different directions — two of them measure 'distance per fuel' while the third measures 'fuel per distance', which is exactly why higher is better for two of them but lower is better for the third.",
    method: [
      "km/l and MPG (US) both increase with better efficiency: MPG (US) = km/l ÷ 0.425144.",
      "L/100km decreases with better efficiency, since it directly measures fuel consumed per fixed distance: L/100km = 100 ÷ km/l.",
    ],
    example: {
      title: "Worked example: 18 km/l converted to MPG (US) and L/100km",
      lines: [
        "MPG (US) = 18 ÷ 0.425144 ≈ 42.34 mpg.",
        "L/100km = 100 ÷ 18 ≈ 5.56 L/100km.",
      ],
    },
    mistakes: [
      { title: "Assuming a higher L/100km figure means better fuel economy, following the pattern of the other two units", body: "L/100km is inverted relative to km/l and MPG — a lower L/100km figure means better efficiency (less fuel needed per 100km), the opposite direction from km/l and MPG where a higher number is better." },
      { title: "Comparing US MPG directly against a UK-quoted MPG figure", body: "As with the Volume Converter's gallon distinction, a US MPG and a UK (imperial) MPG use different-sized gallons, making the same numeric MPG figure represent meaningfully different real fuel efficiency between the two conventions." },
    ],
    faqs: [
      { q: "Why does L/100km use a fixed-distance approach instead of fixed-fuel like the other units?", a: "It's simply a different, and arguably more intuitive, way of framing the same underlying efficiency — 'how much fuel does this specific trip length require' rather than 'how far does this specific amount of fuel take me', and it's the standard convention in much of Europe and elsewhere." },
      { q: "Is a US MPG figure the same as a UK MPG figure for the identical car?", a: "No — since the US gallon and UK gallon differ in size, the same real fuel efficiency produces different MPG numbers depending on which gallon convention is used, making direct comparison without conversion misleading." },
      { q: "Why does the L/100km-to-km/l conversion use a reciprocal (100 ÷ value) rather than a simple multiplication?", a: "Because the two units measure the relationship in opposite directions (distance-per-fuel versus fuel-per-distance), converting between them requires inverting the relationship (dividing into a constant) rather than the straightforward proportional scaling used for most other unit conversions." },
      { q: "How is this related to the Fuel Cost Calculator?", a: "That tool uses a km/l-style efficiency figure directly to calculate a trip's total fuel cost; this converter simply translates that efficiency figure between different fuel-economy unit conventions, which is a useful preliminary step if the original efficiency figure is quoted in an unfamiliar unit." },
    ],
    related: ["fuel-cost-calculator", "volume-converter", "length-converter", "speed-converter", "electricity-bill-calculator"],
  },
};
