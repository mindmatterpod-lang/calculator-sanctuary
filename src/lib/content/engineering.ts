import type { ContentMap } from "./types";

/* Batch 5 — Engineering. Every worked example below is checked against the
   live compute() function for that slug in calculators.ts / calculators-extra.ts. */

export const engineeringContent: ContentMap = {
  "ohms-law-calculator": {
    intro:
      "V = I × R connects voltage, current and resistance so tightly that knowing any two always gives you the third. This solves for whichever one you're missing — the single most-used relationship in basic electronics, from choosing a resistor to diagnosing why an LED just burned out.",
    method: [
      "Voltage: V = I × R.",
      "Current: I = V ÷ R.",
      "Resistance: R = V ÷ I.",
      "Pick which one you're solving for — the tool uses the other two inputs and ignores the field you're solving for.",
    ],
    example: {
      title: "Worked example: sizing a resistor for an LED",
      lines: [
        "Supply is 12 V, the LED needs 2 A across the resistor, solve for Resistance.",
        "R = V ÷ I = 12 ÷ 2 = 6 Ω.",
        "Swap to solving for Current with V = 12 and R = 6 instead: I = 12 ÷ 6 = 2 A — the same relationship, confirmed from a different starting pair.",
      ],
    },
    mistakes: [
      { title: "Leaving 'Solve for' on the wrong field", body: "The tool uses whatever the other two fields say and computes the one you've selected — if 'Solve for' is left on Voltage while you actually changed the resistance, you'll get an answer to a question you didn't ask." },
      { title: "Applying this to AC circuits with reactance", body: "Plain Ohm's Law assumes purely resistive load. Circuits with capacitors or inductors need impedance (which includes a reactive component), not simple resistance, or the numbers will be wrong for AC calculations." },
    ],
    faqs: [
      { q: "Does Ohm's Law apply to every electrical component?", a: "It applies exactly to ideal resistors (and closely to real ones within their rated range). Diodes, transistors, and other non-linear components don't follow a simple V=IR relationship." },
      { q: "What's the relationship to power (watts)?", a: "Once you know any two of V, I, and R, power follows directly: P = V × I, or equivalently P = I²R or P = V²/R." },
      { q: "Why is resistance sometimes shown as a range rather than a single value?", a: "Real resistors have manufacturing tolerance (often ±5% or ±1%) around their marked value — the Resistor Color Code Calculator shows exactly what tolerance a given colour band represents." },
      { q: "How do I use this for a series circuit with multiple resistors?", a: "Sum the resistances first (R_total = R1 + R2 + ...) then treat that total as the R in this calculator." },
    ],
    related: ["voltage-divider-calculator", "watt-calculator", "resistor-color-code", "power-factor-calculator", "capacitance-calculator"],
    post: {
      title: "Ohm's Law: The One Formula Electronics Keeps Coming Back To",
      excerpt: "V = I × R looks trivial until you realise it's the answer to nearly every 'why isn't this circuit working' question.",
      readTime: "4 min",
      body: [
        "Ohm's Law is deceptively simple: voltage equals current times resistance. But its real value shows up when something in a circuit isn't behaving — a component running hot, an LED that won't light, a motor drawing more current than expected.",
        "Every one of those problems is really a question about one of the three variables, with the other two known or measurable. A resistor running hotter than expected usually means more current is flowing than the resistance should allow at that voltage — which points back to a voltage or resistance value that isn't what you assumed.",
        "The formula also scales: put two resistors in series and their resistances simply add, so V = I × (R1+R2) tells you the current for the whole loop, and V = I × R1 gives you the voltage dropped across just the first one — this is exactly the logic behind the Voltage Divider Calculator.",
        "Where it stops applying cleanly is AC circuits with capacitors or inductors, where resistance becomes 'impedance' — a value that also depends on frequency. For straightforward DC and resistive AC loads, though, this one formula is doing more diagnostic work than almost anything else in basic electronics.",
      ],
    },
  },

  "voltage-divider-calculator": {
    intro:
      "Two resistors in series split an input voltage in a fixed, predictable ratio — the standard trick for stepping a voltage down for a sensor or logic input without a full regulator circuit.",
    method: [
      "Vout = Vin × R2 ÷ (R1 + R2), where R2 is the resistor across which the output is measured.",
      "Current through the divider is the same through both resistors in series: I = Vin ÷ (R1 + R2).",
    ],
    example: {
      title: "Worked example: 12 V in, R1 = 1000 Ω, R2 = 2000 Ω",
      lines: [
        "Vout = 12 × 2000 ÷ (1000 + 2000) = 24,000 ÷ 3,000 = 8 V.",
        "Current through the divider = 12 ÷ 3,000 = 0.004 A = 4 mA.",
      ],
    },
    mistakes: [
      { title: "Swapping which resistor is R1 and which is R2", body: "Vout is measured across R2 specifically in this formula. Swap the two resistor values and you get a completely different output voltage — R1 = 2000, R2 = 1000 with the same 12 V gives 4 V, not 8 V." },
      { title: "Ignoring the load connected to the output", body: "This formula assumes nothing else draws current from the Vout node. A real load in parallel with R2 pulls the actual output voltage lower than this ideal calculation, sometimes significantly if the load resistance is close to R2's." },
    ],
    faqs: [
      { q: "Why use a voltage divider instead of a voltage regulator?", a: "Simplicity and cost for low-current, non-critical signals — like scaling a sensor's output down to fit a microcontroller's input range. For anything needing stable voltage under varying load, a regulator is the correct choice instead." },
      { q: "How much current does the divider itself waste?", a: "Continuously, Vin ÷ (R1+R2) worth of current flows through the divider whether or not anything uses the output — larger resistor values waste less power but make the divider more sensitive to loading effects." },
      { q: "Can I use this to step a voltage up instead of down?", a: "No — a resistive divider can only produce an output between 0 and Vin, never higher. Stepping up needs a different circuit entirely, like a boost converter." },
      { q: "What happens if R1 is zero?", a: "Vout becomes equal to Vin — with no first resistor, all of the input voltage appears directly at the output." },
    ],
    related: ["ohms-law-calculator", "watt-calculator", "resistor-color-code", "capacitance-calculator", "power-factor-calculator"],
  },

  "watt-calculator": {
    intro:
      "Power in watts from voltage and current — the number on your electricity bill's per-appliance breakdown, and the first check before assuming a circuit, fuse, or extension cord can handle a given load.",
    method: [
      "P = V × I, in watts when V is in volts and I is in amps.",
      "Divide by 1,000 for kilowatts, the unit electricity is typically billed in.",
    ],
    example: {
      title: "Worked example: 230 V mains, 5 A draw",
      lines: ["P = 230 × 5 = 1,150 W.", "In kilowatts: 1,150 ÷ 1,000 = 1.15 kW."],
    },
    mistakes: [
      { title: "Using nameplate current for a motor or compressor's running power", body: "Motors often draw a much higher inrush current briefly at startup than their steady running current — using the startup figure overstates continuous power draw significantly." },
      { title: "Confusing watts with volt-amps for AC loads with poor power factor", body: "For non-resistive AC loads (motors, some electronics), V × I gives apparent power (VA), not necessarily real power in watts — the Power Factor Calculator bridges that gap." },
    ],
    faqs: [
      { q: "How do I convert watts to the units on my electricity bill?", a: "Electricity is billed in kilowatt-hours (kWh) — multiply the power in kW by the hours used to get the energy consumed, which is what's actually billed." },
      { q: "Why does my appliance's power rating differ from V × I on its nameplate?", a: "For AC devices with a power factor below 1 (common in motors), the nameplate volts × amps is apparent power, while actual power drawn is lower — multiply by the power factor to reconcile the two." },
      { q: "What's a safe current draw for a standard household circuit?", a: "This varies heavily by country and circuit rating (commonly 13-20 A per circuit) — check your specific circuit breaker or fuse rating rather than assuming a universal figure." },
      { q: "How is this different from the Power Calculator?", a: "This one uses electrical inputs (voltage and current); the Power Calculator instead computes power from mechanical work done over time — same unit, different starting quantities." },
    ],
    related: ["ohms-law-calculator", "power-calculator", "power-factor-calculator", "voltage-divider-calculator", "three-phase-current-calculator"],
  },

  "power-calculator": {
    intro:
      "Power is simply how fast work is done — the same 5,000 joules delivered in 5 seconds is a very different power output than that same work spread across 50 seconds, even though the total energy is identical.",
    method: [
      "P = W ÷ t, where W is work or energy in joules and t is time in seconds, giving power in watts.",
    ],
    example: {
      title: "Worked example: 5,000 J of work in 20 seconds",
      lines: ["P = 5,000 ÷ 20 = 250 W.", "The same 5,000 J done in just 2 seconds instead would be 2,500 W — ten times the power, for the identical amount of work."],
    },
    mistakes: [
      { title: "Confusing power with total energy", body: "Power is a rate (energy per second); energy itself is the total amount done, regardless of how fast. A low-power device running for a long time can still deliver more total energy than a high-power device running briefly." },
      { title: "Mixing units — kilojoules or minutes without converting", body: "This formula expects joules and seconds directly. Entering work in kilojoules or time in minutes without converting first will overstate or understate the result by that same factor." },
    ],
    faqs: [
      { q: "How does this relate to horsepower?", a: "1 horsepower ≈ 746 watts — divide a watt result by 746 to get an approximate horsepower figure." },
      { q: "What's the difference between this and the Watt Calculator?", a: "This computes power from mechanical work and time; the Watt Calculator computes electrical power directly from voltage and current — different inputs reaching the same unit." },
      { q: "Can I use this for calories or other energy units instead of joules?", a: "Convert to joules first (1 calorie ≈ 4.184 joules) since the formula here assumes joules as the energy unit." },
      { q: "Why does power matter separately from total energy in engineering?", a: "Equipment (motors, cables, batteries) is rated by the power it can handle at any instant, not just total energy over time — undersizing for peak power, even briefly, can damage components even if average energy use is fine." },
    ],
    related: ["watt-calculator", "torque-calculator", "spring-constant-calculator", "gear-ratio-calculator", "ohms-law-calculator"],
  },

  "resistor-color-code": {
    intro:
      "Reads a standard 4-band resistor exactly the way an engineer would by eye — two significant digits, a multiplier, and a tolerance — without needing to memorise the colour-to-number mapping every time.",
    method: [
      "Bands 1 and 2 give two significant digits (0-9, colour-coded black through white).",
      "The multiplier band scales that two-digit number by a power of 10 matching its own colour position.",
      "The tolerance band (often gold or silver, set apart from the value bands) states how far the actual resistance may vary from the marked value.",
    ],
    example: {
      title: "Worked example: Brown, Black, Red, Gold",
      lines: [
        "Brown = 1, Black = 0 → digits '10'.",
        "Red multiplier = ×100.",
        "10 × 100 = 1,000 Ω = 1 kΩ, with Gold indicating ±5% tolerance.",
      ],
    },
    mistakes: [
      { title: "Reading the bands from the wrong end", body: "The tolerance band (commonly gold or silver, and often spaced slightly apart from the others) marks the end of the sequence — reading right-to-left instead of left-to-right gives a completely different, wrong value." },
      { title: "Confusing a 4-band and 5-band resistor", body: "5-band resistors use three digit bands for extra precision instead of two — applying this 4-band tool's logic to a 5-band resistor's colours will misread the value." },
    ],
    faqs: [
      { q: "How do I know which end to start reading from on a physical resistor?", a: "The tolerance band is usually gold or silver and sits noticeably apart from the tightly-grouped value bands — start reading from the opposite end." },
      { q: "What does the tolerance percentage actually mean in practice?", a: "A 1 kΩ resistor with ±5% tolerance could measure anywhere from 950 Ω to 1,050 Ω and still be within spec — this matters for precision circuits where an exact value is assumed." },
      { q: "Why do component values often look like unusual numbers, like 4.7 kΩ instead of 5 kΩ?", a: "Resistors are manufactured in standardised value series (like E12 or E24) spaced to cover a decade with even percentage steps, not round numbers — 4.7 is one of those standard values." },
      { q: "Can this tool decode a 5-band or 6-band resistor?", a: "No, it's specifically built for the common 4-band case — 5 and 6-band resistors use an additional digit or a temperature coefficient band this tool doesn't account for." },
    ],
    related: ["ohms-law-calculator", "capacitance-calculator", "voltage-divider-calculator", "watt-calculator", "power-factor-calculator"],
  },

  "capacitance-calculator": {
    intro:
      "Two capacitors combine in exactly the opposite way resistors do — parallel capacitance simply adds, while series capacitance behaves like the reciprocal-sum rule resistors use in parallel.",
    method: [
      "Parallel: total capacitance = C1 + C2 — capacitors in parallel add directly.",
      "Series: total capacitance = (C1 × C2) ÷ (C1 + C2) — the same reciprocal-style combination rule used for resistors in parallel.",
    ],
    example: {
      title: "Worked example: C1 = 10 µF, C2 = 22 µF",
      lines: [
        "Parallel: 10 + 22 = 32 µF.",
        "Series: (10 × 22) ÷ (10 + 22) = 220 ÷ 32 ≈ 6.875 µF.",
        "Series combination is always smaller than the smallest individual capacitor — 6.875 µF is less than even the 10 µF alone.",
      ],
    },
    mistakes: [
      { title: "Applying the resistor combination rules directly", body: "Capacitors combine the opposite way resistors do: series capacitors need the reciprocal-sum formula (like parallel resistors), while parallel capacitors simply add (like series resistors)." },
      { title: "Expecting series capacitance to be an average of the two values", body: "Series combination is always less than the smaller of the two capacitors, not an average — this surprises people used to resistor-parallel intuition where the combined value is always less than the smallest resistor too, but for a different underlying reason." },
    ],
    faqs: [
      { q: "Why does capacitance combine oppositely to resistance?", a: "Capacitance relates to charge storage rather than current opposition. Series capacitors share the same charge but split voltage, which mathematically produces the reciprocal-sum relationship — the mirror image of how parallel resistors share voltage but split current." },
      { q: "What's a practical reason to put capacitors in series?", a: "Voltage rating — putting two capacitors in series shares the applied voltage across them, letting the combination handle a higher voltage than either capacitor alone is rated for, at the cost of reduced total capacitance." },
      { q: "Does capacitor combination depend on frequency, like impedance does?", a: "No — capacitance itself (in farads) is a fixed property based on how the capacitors combine; it's the resulting reactance (opposition to AC current) that additionally depends on frequency." },
      { q: "Can I combine more than two capacitors with this tool?", a: "This tool handles the two-capacitor case directly; for more, combine two at a time and feed the running total back in as one of the two values for the next combination." },
    ],
    related: ["ohms-law-calculator", "resistor-color-code", "voltage-divider-calculator", "power-factor-calculator", "watt-calculator"],
  },

  "torque-calculator": {
    intro:
      "Torque depends on force, the distance from the pivot, and the angle at which the force is applied — pushing straight down on a wrench close to the nut does far less than pushing perpendicular to it further out.",
    method: [
      "τ = F × r × sin θ, where θ is the angle between the applied force and the lever arm.",
      "Torque is maximised when the force is applied perpendicular to the lever (θ = 90°, sin θ = 1) and drops to zero when the force is applied directly along the lever's length (θ = 0°).",
    ],
    example: {
      title: "Worked example: 150 N applied at 0.4 m, 90°",
      lines: [
        "τ = 150 × 0.4 × sin(90°) = 150 × 0.4 × 1 = 60 N·m.",
        "The same force and distance at a 30° angle instead gives 150 × 0.4 × sin(30°) = 150 × 0.4 × 0.5 = 30 N·m — exactly half, from the angle alone.",
      ],
    },
    mistakes: [
      { title: "Ignoring the angle and assuming τ = F × r always", body: "That formula only holds when the force is applied exactly perpendicular to the lever. At any other angle, the effective torque is reduced by the sine of that angle, sometimes substantially." },
      { title: "Confusing torque (N·m) with energy or work, which share the same unit", body: "Torque and work/energy are dimensionally the same (N·m or joules) but conceptually different — torque is a rotational force, not energy transferred, even though the units look identical." },
    ],
    faqs: [
      { q: "Why does pushing at 90° to the lever give the most torque?", a: "sin(90°) = 1, the maximum value the sine function reaches — any other angle reduces the effective perpendicular component of the applied force." },
      { q: "What happens to torque if the force is applied exactly along the lever's length?", a: "It produces zero torque — sin(0°) = 0, meaning no rotational effect at all, since the force does nothing but pull or push along the arm rather than rotate it." },
      { q: "How does torque relate to power in a rotating system?", a: "Power = torque × angular velocity — a motor's torque combined with how fast it's spinning determines its power output." },
      { q: "Is this the same calculation used for wrench and bolt tightening specs?", a: "Yes, exactly — bolt torque specifications assume a perpendicular force applied at a specified lever-arm distance, which is precisely what this formula models." },
    ],
    related: ["power-calculator", "spring-constant-calculator", "gear-ratio-calculator", "watt-calculator", "rpm-to-speed-calculator"],
  },

  "gear-ratio-calculator": {
    intro:
      "A gear ratio isn't just a number for comparing setups — it directly tells you the output shaft's speed once you know the input RPM, which is what most people actually need it for.",
    method: [
      "Gear ratio = driven gear teeth ÷ driver gear teeth.",
      "Output speed = input RPM ÷ gear ratio — a ratio greater than 1 (more teeth driven than driving) reduces speed; less than 1 increases it.",
    ],
    example: {
      title: "Worked example: driver 20 teeth, driven 60 teeth, input 1,500 RPM",
      lines: [
        "Ratio = 60 ÷ 20 = 3 : 1.",
        "Output speed = 1,500 ÷ 3 = 500 RPM.",
        "This is a reduction: the output spins one-third as fast as the input, but with three times the torque (ignoring losses), since gear systems trade speed for torque.",
      ],
    },
    mistakes: [
      { title: "Swapping which gear is 'driver' and which is 'driven'", body: "The driver is the gear receiving input power (e.g. from a motor); the driven gear is turned by it. Swapping the two inverts the ratio and gives the reciprocal of the correct answer." },
      { title: "Assuming gear ratio alone tells you torque directly without accounting for efficiency", body: "In an ideal gearbox, torque multiplies by the same ratio speed divides by, but real gearboxes lose some power to friction — actual torque output is slightly less than the ideal calculation suggests." },
    ],
    faqs: [
      { q: "What does a ratio like 3:1 actually mean in practice?", a: "For every 3 rotations of the driver gear, the driven gear completes 1 rotation — the driven gear turns slower but with proportionally more torque, ignoring mechanical losses." },
      { q: "How do I calculate a gear ratio for more than two gears in sequence?", a: "Multiply the individual ratios of each gear pair in the train together to get the overall ratio from first input to final output." },
      { q: "Does gear ratio affect torque as well as speed?", a: "Yes — in an ideal system, torque changes by the same ratio speed does, but in the opposite direction: reducing speed by a factor of 3 roughly triples torque." },
      { q: "Is a gear ratio below 1 a 'reduction' or an 'increase'?", a: "A ratio below 1 (fewer teeth on the driven gear than the driver) increases output speed above input speed — this is an overdrive, the opposite of a reduction." },
    ],
    related: ["belt-length-calculator", "rpm-to-speed-calculator", "torque-calculator", "power-calculator", "spring-constant-calculator"],
    post: {
      title: "Gear Ratios: Why 'Bigger Gear' Doesn't Always Mean 'Faster'",
      excerpt: "A 3:1 gear ratio doesn't triple your speed — it does the opposite. Here's the intuition that trips people up.",
      readTime: "4 min",
      body: [
        "It's a common mix-up: a '3:1 ratio' sounds like it should make things go 3 times faster, but in the standard convention (driven teeth ÷ driver teeth), a 3:1 ratio actually means the output spins at one-third the input speed.",
        "Think of it as a trade: gears don't create speed or torque from nothing, they convert one into the other. A large driven gear with many teeth takes more rotations of a smaller driver gear to complete one full turn — slower, but each of those rotations is carrying proportionally more torque.",
        "This is exactly why a bicycle's lowest gear (easiest to pedal, hardest to go fast) uses a large rear cog relative to the front chainring, and the highest gear (hardest to pedal, fastest top speed) reverses that relationship.",
        "The practical takeaway: when someone says 'gear it down' they mean increase the ratio (more driven teeth relative to driver) for more torque and less speed; 'gear it up' means the opposite — less torque, more speed. Getting this backwards is the single most common gear-ratio mistake.",
      ],
    },
  },

  "power-factor-calculator": {
    intro:
      "Power factor is the ratio between the power actually doing useful work and the total power the supply has to provide — a number below 1 means some capacity is being 'wasted' on reactive load, even though it's not literally lost as heat.",
    method: [
      "Power factor = real power ÷ apparent power.",
      "Reactive power = √(apparent² − real²), the component that oscillates back and forth without doing net useful work.",
    ],
    example: {
      title: "Worked example: 8 kW real, 10 kVA apparent",
      lines: [
        "Power factor = 8 ÷ 10 = 0.8.",
        "Reactive power = √(10² − 8²) = √(100−64) = √36 = 6 kVAR.",
      ],
    },
    mistakes: [
      { title: "Assuming a low power factor means wasted energy on the bill", body: "Reactive power isn't converted to heat or lost as waste — but a poor power factor still means the supply and wiring need to be sized for more current than the useful work alone requires, and many commercial tariffs penalise it directly." },
      { title: "Treating power factor as always improvable to exactly 1", body: "A power factor of exactly 1 means purely resistive load with no reactive component at all — for most real motors and electronic loads, some reactive component is inherent, though it can be corrected closer to 1 with capacitor banks." },
    ],
    faqs: [
      { q: "Why do industrial electricity bills sometimes include a power-factor penalty?", a: "A poor power factor forces the utility's generation and distribution equipment to handle more current for the same useful power delivered, so some tariffs charge extra to encourage correction." },
      { q: "What causes a low power factor in the first place?", a: "Inductive loads like motors and transformers are the most common cause — they draw reactive current in addition to the real current doing useful work." },
      { q: "How is power factor corrected in practice?", a: "Capacitor banks are added to the circuit to offset the inductive reactive power, bringing the overall power factor closer to 1 without changing the useful work being done." },
      { q: "Can power factor be a value other than between 0 and 1?", a: "No — by definition it's real power divided by apparent power, and apparent power is always at least as large as real power, keeping the ratio between 0 and 1." },
    ],
    related: ["watt-calculator", "three-phase-current-calculator", "ohms-law-calculator", "voltage-divider-calculator", "capacitance-calculator"],
  },

  "three-phase-current-calculator": {
    intro:
      "Three-phase power calculations need a √3 factor that trips people up if they're used to single-phase math — this handles that directly from power, line voltage and power factor.",
    method: [
      "Line current: I = P ÷ (√3 × V × power factor), where P is in watts, V is line-to-line voltage.",
      "The √3 (≈1.732) accounts for the phase relationship between the three conductors in a balanced three-phase system.",
    ],
    example: {
      title: "Worked example: 15 kW load, 415 V line voltage, 0.85 power factor",
      lines: [
        "I = (15 × 1000) ÷ (1.732 × 415 × 0.85) = 15,000 ÷ 611.3 ≈ 24.54 A.",
      ],
    },
    mistakes: [
      { title: "Applying the single-phase formula (I = P ÷ V) to a three-phase system", body: "Skipping the √3 factor overstates the current by roughly 73%, since three-phase power delivers the same total power at a lower current per conductor than single-phase would for the same voltage." },
      { title: "Using phase voltage instead of line voltage, or vice versa", body: "Line-to-line voltage (between any two of the three phases) and line-to-neutral voltage are different values in a three-phase system — mixing them up throws off the result by a factor of √3 in the wrong direction." },
    ],
    faqs: [
      { q: "Why is three-phase power used for larger industrial loads?", a: "It delivers the same total power at lower current per conductor than single-phase, meaning thinner cables and smaller equipment for a given power rating — a major cost saving at scale." },
      { q: "What's the relationship between line voltage and phase voltage?", a: "In a standard three-phase system, line voltage = phase voltage × √3 — for example, 230 V phase voltage corresponds to about 400 V line voltage." },
      { q: "Does power factor affect three-phase systems the same way it affects single-phase?", a: "Yes, the same underlying concept applies — a lower power factor increases the current needed to deliver the same real power, in both single and three-phase systems." },
      { q: "How would this change for an unbalanced three-phase load?", a: "This formula assumes a balanced load across all three phases; an unbalanced load needs each phase's current calculated separately, since they'd draw different amounts." },
    ],
    related: ["power-factor-calculator", "watt-calculator", "ohms-law-calculator", "transformer-turns-calculator", "voltage-divider-calculator"],
  },

  "transformer-turns-calculator": {
    intro:
      "A transformer's turns ratio directly sets its voltage ratio — more turns on one side than the other steps voltage up or down by exactly that proportion, with no moving parts.",
    method: [
      "Turns ratio = primary turns ÷ secondary turns.",
      "Secondary voltage = primary voltage ÷ turns ratio.",
    ],
    example: {
      title: "Worked example: 1,000 primary turns, 250 secondary turns, 240 V primary",
      lines: [
        "Turns ratio = 1,000 ÷ 250 = 4 : 1.",
        "Secondary voltage = 240 ÷ 4 = 60 V.",
      ],
    },
    mistakes: [
      { title: "Assuming secondary current scales the same direction as voltage", body: "Ideally, power is conserved across a transformer, so as voltage steps down, current steps up by the same ratio (and vice versa) — a step-down transformer doesn't just lower voltage for free, it proportionally raises available current." },
      { title: "Forgetting real transformers have some power loss", body: "This ideal calculation assumes 100% efficiency. Real transformers lose a small percentage to resistance and core losses, so actual secondary voltage under load is slightly lower than this calculation predicts." },
    ],
    faqs: [
      { q: "How do I find secondary current if I know primary current?", a: "In an ideal transformer, primary voltage × primary current = secondary voltage × secondary current (power is conserved), so secondary current = (primary voltage × primary current) ÷ secondary voltage." },
      { q: "What does a turns ratio of exactly 1:1 mean?", a: "The transformer is an isolation transformer — same voltage on both sides, used to electrically isolate a circuit rather than change voltage." },
      { q: "Is a step-up transformer just this calculator in reverse?", a: "Yes — if secondary turns exceed primary turns, the turns ratio is less than 1 and secondary voltage comes out higher than primary voltage, the step-up case." },
      { q: "Does this work for three-phase transformers?", a: "This is the single-phase turns-ratio relationship; three-phase transformer configurations (delta, wye) add extra factors depending on winding arrangement." },
    ],
    related: ["three-phase-current-calculator", "voltage-divider-calculator", "ohms-law-calculator", "watt-calculator", "power-factor-calculator"],
  },

  "belt-length-calculator": {
    intro:
      "The length of a belt wrapped around two pulleys isn't just the straight-line distance doubled — it also has to account for the curve around each pulley, more so when the two pulleys are different sizes.",
    method: [
      "L = 2C + (π/2)(D1 + D2) + (D2 − D1)² ÷ (4C), where C is the centre distance and D1, D2 are the two pulley diameters.",
      "The first term is the two straight belt runs; the second approximates the wrap around both pulleys; the third corrects for the extra length needed when the pulleys are different sizes.",
    ],
    example: {
      title: "Worked example: pulleys 120 mm and 300 mm, 600 mm centre distance",
      lines: [
        "2C term: 2 × 600 = 1,200.",
        "Wrap term: (π/2)(120+300) = 1.5708 × 420 ≈ 659.7.",
        "Correction term: (300−120)² ÷ (4×600) = 32,400 ÷ 2,400 = 13.5.",
        "Total L ≈ 1,200 + 659.7 + 13.5 = 1,873.2 mm (about 73.75 inches).",
      ],
    },
    mistakes: [
      { title: "Using this formula for a chain-and-sprocket system instead of a belt", body: "Chain length calculations use a related but distinct formula based on the number of teeth per sprocket rather than continuous diameters — mixing the two gives an inexact result for a chain drive." },
      { title: "Forgetting the centre distance is measured between pulley axles, not edges", body: "C is the distance between the two pulleys' rotational centres, not the gap between their outer edges — using edge-to-edge distance understates the true centre distance and skews the result." },
    ],
    faqs: [
      { q: "Why does the formula get more complex when pulleys are different sizes?", a: "With equal-sized pulleys, the belt wraps each one by exactly the same amount and the geometry simplifies; unequal pulleys create an asymmetric wrap angle on each pulley, which the correction term accounts for." },
      { q: "How much slack should I allow beyond this calculated length?", a: "Real belts typically need a small amount of adjustable slack for tensioning — check the belt manufacturer's tensioning guidance rather than cutting to the exact calculated length." },
      { q: "Does this work for a crossed-belt configuration (figure-8 layout)?", a: "No, this formula assumes an open (non-crossed) belt configuration — a crossed belt uses a different geometry entirely." },
      { q: "What if the two pulleys are the same diameter?", a: "The correction term becomes zero (D2−D1 = 0), and the formula simplifies to L = 2C + πD — the classic 'two straight runs plus one full circle' approximation." },
    ],
    related: ["gear-ratio-calculator", "rpm-to-speed-calculator", "torque-calculator", "spring-constant-calculator", "power-calculator"],
  },

  "rpm-to-speed-calculator": {
    intro:
      "Rotational speed alone doesn't tell you how fast a surface point is actually moving — that depends on the diameter too, which is why a small wheel and a large wheel spinning at the same RPM travel very different actual speeds.",
    method: [
      "Surface (linear) speed = π × diameter × RPM ÷ 60, converting the diameter from mm to metres and RPM (per minute) to a per-second basis.",
    ],
    example: {
      title: "Worked example: 1,500 RPM, 200 mm diameter",
      lines: [
        "Diameter in metres: 200 ÷ 1,000 = 0.2 m.",
        "Speed = π × 0.2 × 1,500 ÷ 60 ≈ 15.71 m/s.",
        "In km/h: 15.71 × 3.6 ≈ 56.55 km/h.",
      ],
    },
    mistakes: [
      { title: "Assuming the same RPM always means the same surface speed", body: "Surface speed scales directly with diameter — doubling the diameter at the same RPM exactly doubles the surface speed, which is why cutting-tool and tyre specifications always pair RPM with a specific diameter." },
      { title: "Entering diameter instead of radius, or vice versa, inconsistently with the formula", body: "This formula specifically expects diameter (not radius) in millimetres — halving or doubling by using the wrong one throws the result off by exactly a factor of 2." },
    ],
    faqs: [
      { q: "Why does this matter for cutting tools or grinding wheels?", a: "Manufacturers specify a maximum safe surface speed for a tool material — the same RPM that's safe for a small-diameter wheel could exceed the safe surface speed on a larger one." },
      { q: "How is this related to a vehicle's speed from wheel RPM?", a: "The exact same formula: a wheel's rotational speed (RPM) combined with its diameter gives the vehicle's linear ground speed, which is essentially how a mechanical speedometer historically worked." },
      { q: "What if I know surface speed and need to find the required RPM?", a: "Rearrange: RPM = (speed in m/s × 60) ÷ (π × diameter in metres)." },
      { q: "Does this account for slip, like a tyre slipping on a road surface?", a: "No — this is the ideal surface speed assuming no slip; a slipping wheel's actual ground speed would be less than this calculation predicts." },
    ],
    related: ["gear-ratio-calculator", "belt-length-calculator", "torque-calculator", "power-calculator", "pipe-flow-rate-calculator"],
  },

  "pipe-flow-rate-calculator": {
    intro:
      "Flow rate through a pipe depends on both how fast the fluid moves and how much cross-sectional area it has to move through — the same velocity through a wider pipe delivers far more volume per second.",
    method: [
      "Cross-sectional area = π × (diameter/2)², converting diameter from mm to metres.",
      "Flow rate = area × velocity, converted to litres per second and cubic metres per hour for readability.",
    ],
    example: {
      title: "Worked example: 100 mm inner diameter, 2 m/s flow velocity",
      lines: [
        "Radius in metres: 0.1 ÷ 2 = 0.05 m.",
        "Area = π × 0.05² = π × 0.0025 ≈ 0.007854 m².",
        "Flow rate = 0.007854 × 2 = 0.015708 m³/s = 15.708 L/s = 56.55 m³/h.",
      ],
    },
    mistakes: [
      { title: "Using outer diameter instead of inner diameter", body: "Flow area depends on the actual internal bore the fluid passes through, not the pipe's outer dimension — pipe walls have thickness, so outer diameter overstates the usable cross-section." },
      { title: "Assuming flow rate doubles when diameter doubles", body: "Because area depends on the square of the radius, doubling the diameter actually quadruples the flow rate at the same velocity, not doubles it — a common and costly sizing mistake." },
    ],
    faqs: [
      { q: "Why does doubling pipe diameter more than double the flow rate?", a: "Cross-sectional area scales with the square of the radius, so doubling diameter quadruples area — and flow rate scales directly with area at a given velocity." },
      { q: "How do I find required pipe diameter for a target flow rate?", a: "Rearrange: diameter = 2 × √(flow rate ÷ (π × velocity)) — decide on a reasonable velocity for the application first, since velocity itself affects pressure loss and pipe wear." },
      { q: "Does this account for friction losses along the pipe length?", a: "No — this is the ideal flow-rate-from-velocity relationship. Real systems also need pressure-drop calculations that account for pipe length, roughness, and fittings." },
      { q: "What's a typical safe flow velocity for water pipes?", a: "This varies by application and pipe material, but many general guidelines suggest keeping velocity under roughly 2-3 m/s to limit erosion and noise — check relevant codes for your specific use case." },
    ],
    related: ["rpm-to-speed-calculator", "concrete-volume-calculator", "gear-ratio-calculator", "belt-length-calculator", "steel-weight-calculator"],
  },

  "concrete-volume-calculator": {
    intro:
      "Concrete for a slab is straightforward volume — length times width times thickness — but the real-world number always needs a waste allowance on top, since spillage, formwork imperfections and uneven ground all eat into a razor-thin order.",
    method: [
      "Base volume = length × width × thickness.",
      "Final volume = base volume × (1 + waste allowance ÷ 100).",
      "Approximate weight = volume × 2.4 tonnes/m³, a typical density for standard concrete.",
    ],
    example: {
      title: "Worked example: 6 m × 4 m slab, 0.15 m thick, 8% waste",
      lines: [
        "Base volume = 6 × 4 × 0.15 = 3.6 m³.",
        "With 8% waste: 3.6 × 1.08 = 3.888 m³.",
        "Approximate weight: 3.888 × 2.4 ≈ 9.33 tonnes.",
      ],
    },
    mistakes: [
      { title: "Ordering exactly the calculated volume with no waste allowance", body: "Real pours almost always use somewhat more than the theoretical volume due to ground irregularities, formwork seepage and minor spillage — a 5-10% allowance is standard practice, not padding." },
      { title: "Mixing up thickness units (cm vs m)", body: "This formula expects thickness in metres. A 150 mm slab is 0.15 m, not 150 — entering 150 directly would produce a wildly overstated volume." },
    ],
    faqs: [
      { q: "How much waste allowance should I actually use?", a: "5-10% is common for straightforward, well-prepared slabs; rougher or uneven ground, or complex formwork, often justifies allowances toward the higher end of that range." },
      { q: "Is 2.4 tonnes per cubic metre accurate for all concrete mixes?", a: "It's a reasonable general-purpose figure for standard concrete, but density varies somewhat with mix design and aggregate type — check your supplier's specific mix density for critical projects." },
      { q: "How is concrete typically ordered from a supplier?", a: "Most ready-mix suppliers sell by the cubic metre, often with a minimum order quantity — this calculator's final volume (including waste allowance) is the number to quote them." },
      { q: "Does this work for non-rectangular slabs?", a: "Not directly — for irregular shapes, break the area into rectangular sections, calculate each separately, and sum the volumes before applying the waste allowance." },
    ],
    related: ["paint-coverage-calculator", "steel-weight-calculator", "pipe-flow-rate-calculator", "belt-length-calculator", "gear-ratio-calculator"],
  },

  "paint-coverage-calculator": {
    intro:
      "How much paint a room needs depends on wall area, number of coats, and the specific paint's coverage rate — skip any one of the three and you'll either run short mid-job or over-order.",
    method: [
      "Litres needed = (wall area × number of coats) ÷ coverage per litre.",
      "Tins to buy = round up litres needed divided by tin size (5 L used here as a common size).",
    ],
    example: {
      title: "Worked example: 60 m² wall area, 2 coats, 11 m² per litre coverage",
      lines: [
        "Litres = (60 × 2) ÷ 11 = 120 ÷ 11 ≈ 10.91 L.",
        "Tins: 10.91 ÷ 5 = 2.18, rounded up to 3 × 5 L tins.",
      ],
    },
    mistakes: [
      { title: "Using the coverage figure from the tin label without adjustment for surface texture", body: "Rough, porous, or previously unpainted surfaces absorb more paint than the label's coverage rate assumes, which is usually measured on a smooth, primed reference surface." },
      { title: "Forgetting that a dark-to-light colour change may need extra coats", body: "The number of coats entered should reflect the real job — going from a dark existing colour to a much lighter one often needs a third coat beyond the standard two, which this calculator will happily account for once told." },
    ],
    faqs: [
      { q: "Why does the calculator round up to whole tins?", a: "Paint is sold in fixed tin sizes, so a requirement of 10.91 litres genuinely needs 3 tins of 5 L (15 L total) even though only about 11 litres will actually be used." },
      { q: "How do I account for doors, windows, and other areas not being painted?", a: "Subtract their combined area from the total wall area before entering it, since paint isn't needed there." },
      { q: "Does ceiling area need to be calculated separately?", a: "Yes — ceilings often use a different coverage rate and are usually a separate area calculation from wall area." },
      { q: "What if my paint's coverage rate isn't given on the tin?", a: "Many standard interior paints fall in the 10-13 m² per litre range per coat, but check the specific product's data sheet where possible for accuracy." },
    ],
    related: ["concrete-volume-calculator", "steel-weight-calculator", "pipe-flow-rate-calculator", "belt-length-calculator", "gear-ratio-calculator"],
  },

  "steel-weight-calculator": {
    intro:
      "The weight of a round steel bar follows a simple relationship with diameter and length — useful for estimating material costs or checking a delivery against what was ordered.",
    method: [
      "Weight per metre (kg/m) = diameter² ÷ 162.28, a standard approximation for mild steel's density applied to a round cross-section.",
      "Total weight = weight per metre × length × quantity.",
    ],
    example: {
      title: "Worked example: 16 mm diameter, 12 m length, 10 bars",
      lines: [
        "Weight per metre = 16² ÷ 162.28 = 256 ÷ 162.28 ≈ 1.578 kg/m.",
        "Total = 1.578 × 12 × 10 ≈ 189.31 kg.",
      ],
    },
    mistakes: [
      { title: "Assuming weight scales linearly with diameter", body: "Weight per metre depends on diameter squared, since it's proportional to cross-sectional area — doubling the bar diameter roughly quadruples its weight per metre, not doubles it." },
      { title: "Applying this constant to non-steel or non-round bar stock", body: "162.28 is specific to mild steel's density for a round cross-section — square or rectangular bar, or a different metal like aluminium, needs a different constant and shape formula entirely." },
    ],
    faqs: [
      { q: "Why does the formula use 162.28 specifically?", a: "It's derived from mild steel's density (about 7,850 kg/m³) applied to the area of a circle, simplified into a single constant so weight per metre can be found directly from diameter squared." },
      { q: "How would this differ for stainless steel?", a: "Stainless steel has a slightly different density than mild steel, so the constant would shift somewhat — this calculator's constant is specifically calibrated for standard mild steel." },
      { q: "Does bar length affect the weight-per-metre figure?", a: "No — weight per metre depends only on diameter (cross-sectional area); length is a separate multiplier applied afterward to get total weight." },
      { q: "How is this useful beyond costing a straightforward order?", a: "It's also used to check a delivered bundle's actual weight against its expected count and length as a quality/quantity verification step." },
    ],
    related: ["concrete-volume-calculator", "paint-coverage-calculator", "spring-constant-calculator", "pipe-flow-rate-calculator", "torque-calculator"],
  },

  "spring-constant-calculator": {
    intro:
      "Hooke's Law says a spring's extension is directly proportional to the force applied — this finds the stiffness constant k from a measured force and extension, plus the energy stored at that point.",
    method: [
      "k = F ÷ x, where F is applied force and x is the resulting extension from the spring's natural length.",
      "Stored elastic energy = ½ × k × x², the area under the force-extension line up to that point.",
    ],
    example: {
      title: "Worked example: 50 N force, 0.08 m extension",
      lines: [
        "k = 50 ÷ 0.08 = 625 N/m.",
        "Stored energy = 0.5 × 625 × 0.08² = 0.5 × 625 × 0.0064 = 2 J.",
      ],
    },
    mistakes: [
      { title: "Assuming k stays constant beyond the spring's elastic limit", body: "Hooke's Law only holds within a spring's elastic range — stretch it too far and it deforms permanently, and the force-extension relationship stops being linear well before that point." },
      { title: "Using total spring length instead of extension from natural length", body: "x specifically means how far the spring has stretched or compressed from its own rest length, not the spring's absolute length — using the wrong reference point gives a meaningless k." },
    ],
    faqs: [
      { q: "What does a higher spring constant actually mean physically?", a: "A stiffer spring — more force is needed to achieve the same extension, or equivalently, the same force produces less extension than in a spring with lower k." },
      { q: "Why does stored energy use ½kx² instead of just kx²?", a: "Because force increases linearly with extension (starting from zero), the average force over the stretch is half the final force — the ½ factor accounts for that averaging, matching the triangular area under a force-extension graph." },
      { q: "How do springs combine in series and parallel?", a: "Springs in parallel add their k values directly (stiffer overall); springs in series combine like capacitors in series (1/k_total = 1/k1 + 1/k2), making the combination less stiff than either alone." },
      { q: "Can this be used for a compressed spring, not just a stretched one?", a: "Yes — Hooke's Law applies symmetrically to compression and extension for an ideal spring, with x simply representing the displacement in either direction." },
    ],
    related: ["torque-calculator", "power-calculator", "gear-ratio-calculator", "steel-weight-calculator", "belt-length-calculator"],
  },
};
