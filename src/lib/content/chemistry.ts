import type { ContentMap } from "./types";

/* Batch 12 (final) — Chemistry. Every worked example below is checked
   against the live compute() function for that slug in calculators.ts /
   calculators-extra.ts. */

export const chemistryContent: ContentMap = {
  "molar-mass-calculator": {
    intro:
      "Molar mass connects a measurable, everyday quantity (grams on a scale) to a chemistry-scale quantity (moles) — this finds it directly from a known mass and mole count, useful for identifying an unknown substance or checking a calculation.",
    method: ["M = m ÷ n, where m is mass in grams and n is the number of moles, giving molar mass in g/mol."],
    example: {
      title: "Worked example: 18 g sample containing exactly 1 mole",
      lines: ["M = 18 ÷ 1 = 18 g/mol.", "This molar mass matches water (H₂O), a useful cross-check if identifying an unknown sample from a measured mass and mole count."],
    },
    mistakes: [
      { title: "Confusing molar mass with molecular weight units", body: "Molar mass (g/mol) and molecular weight (often expressed in atomic mass units, u or Da, for a single molecule) represent the same underlying value numerically for most practical purposes, but are conceptually distinct — one describes a bulk per-mole quantity, the other a single-particle mass." },
      { title: "Using an inaccurate or rounded mole count", body: "Since molar mass is calculated by dividing mass by moles, an imprecise mole count (from an earlier calculation or measurement) propagates its own error directly into the molar mass result — precision in the mole figure matters for a precise molar mass." },
    ],
    faqs: [
      { q: "Why is molar mass useful for identifying an unknown substance?", a: "Every distinct chemical compound has a specific, known molar mass — measuring a sample's mass and independently determining its mole count (often via another property like gas volume or reaction stoichiometry) lets the resulting molar mass be compared against known reference values to help identify the substance." },
      { q: "How is this related to the Mole Calculator?", a: "They're mathematical inverses of each other — this tool finds molar mass from mass and moles; the Mole Calculator finds moles from mass and a known molar mass." },
      { q: "Why does molar mass use grams specifically, not kilograms?", a: "It's simply the conventional unit chemists use (g/mol) since it produces convenient, human-scaled numbers for common laboratory quantities — using kilograms would just shift the numbers by a factor of 1,000 without adding meaning." },
      { q: "Does temperature or pressure affect molar mass?", a: "No — molar mass is a fixed property of a substance's chemical identity (based on its atomic composition), unlike properties such as gas volume or density, which do depend on temperature and pressure." },
    ],
    related: ["mole-calculator", "avogadro-particles-calculator", "gas-law-calculator", "molarity-calculator", "molality-calculator"],
  },

  "mole-calculator": {
    intro:
      "Converting a measured mass into the number of moles — and from there, the actual particle count — is the single most common calculation bridging what's weighed on a lab scale to what's actually happening at the molecular level.",
    method: [
      "n = m ÷ M, where m is mass in grams and M is molar mass in g/mol, giving the number of moles.",
      "Particle count = moles × Avogadro's number (6.02214076 × 10²³ particles per mole).",
    ],
    example: {
      title: "Worked example: 36 g of a substance with molar mass 18 g/mol",
      lines: [
        "n = 36 ÷ 18 = 2 mol.",
        "Particle count = 2 × 6.02214076×10²³ ≈ 1.2044×10²⁴ particles.",
      ],
    },
    mistakes: [
      { title: "Using the wrong molar mass for the specific substance in question", body: "Molar mass is substance-specific — using a generic or incorrect molar mass value (rather than the correct one for the actual compound being measured) produces a mole count that looks plausible but is quietly wrong." },
      { title: "Confusing 'particles' with 'molecules' when the substance is ionic or atomic", body: "The term 'particles' here refers generically to whatever the fundamental unit is — molecules for molecular compounds, formula units for ionic compounds, or atoms for elements — the calculation is identical, but what a 'particle' actually represents depends on the substance's nature." },
    ],
    faqs: [
      { q: "Why is Avogadro's number specifically 6.022 × 10²³?", a: "It's defined as the number of atoms in exactly 12 grams of carbon-12, chosen historically to make atomic mass units and grams relate conveniently — this specific value has since become one of the fixed defining constants of the modern SI system." },
      { q: "How large is a mole in everyday, relatable terms?", a: "It's an almost incomprehensibly large number — a mole of anything countable (like grains of sand) would vastly exceed the number of grains of sand on every beach on Earth combined many times over, illustrating just how small individual atoms and molecules are." },
      { q: "Why do chemists use moles instead of just counting particles directly?", a: "Individual atoms and molecules are far too small and numerous to count directly — moles provide a practical bridge between a measurable bulk quantity (mass, which can be weighed) and the actual number of particles involved in a chemical reaction." },
      { q: "How is this used in balancing chemical equations?", a: "Reaction stoichiometry is fundamentally about mole ratios between reactants and products — converting measured masses to moles (using this calculation) is the essential first step before applying a balanced equation's mole ratios to predict quantities of other substances involved." },
    ],
    related: ["molar-mass-calculator", "avogadro-particles-calculator", "molarity-calculator", "percent-yield-calculator", "chemical-equation-helper"],
  },

  "ph-calculator": {
    intro:
      "pH compresses an enormous range of hydrogen ion concentrations into a small, manageable number scale using a logarithm — which is exactly why each single pH unit represents a tenfold change in actual acidity, not a small linear step.",
    method: [
      "pH = −log₁₀[H⁺], where [H⁺] is hydrogen ion concentration in moles per litre.",
      "pOH = 14 − pH (at standard conditions), and the solution is classified as acidic (pH < 7), basic (pH > 7), or neutral (pH = 7).",
    ],
    example: {
      title: "Worked example: [H⁺] = 0.0001 mol/L",
      lines: [
        "pH = −log₁₀(0.0001) = −(−4) = 4.",
        "pOH = 14 − 4 = 10.",
        "pH 4 is well below 7, so this solution is classified as acidic.",
      ],
    },
    mistakes: [
      { title: "Treating pH differences as linear rather than logarithmic", body: "A solution with pH 3 isn't twice as acidic as one with pH 6 — it's a thousand times more acidic (10³, since each whole pH unit represents a tenfold change in hydrogen ion concentration), which is easy to underestimate without remembering the logarithmic scale." },
      { title: "Forgetting the negative sign in the pH formula", body: "Since [H⁺] concentrations are typically small decimal numbers, their log₁₀ is negative — the formula's leading minus sign converts that negative log into the conventional positive pH value most people are familiar with." },
    ],
    faqs: [
      { q: "Why does a pH of 7 count as 'neutral'?", a: "At pH 7, hydrogen ion concentration equals hydroxide ion concentration exactly, which is the defining condition for pure water at standard temperature — this balance point was adopted as the reference for 'neutral' on the scale." },
      { q: "Why is each pH unit a tenfold change rather than a simple linear step?", a: "Because pH is defined using a base-10 logarithm — each decrease of 1 in pH corresponds to a tenfold increase in actual hydrogen ion concentration, which is what makes the scale able to compactly represent an enormous range of real acidity levels." },
      { q: "How is pOH related to pH?", a: "At standard conditions (25°C), pH + pOH always equals 14 — knowing one directly gives the other through simple subtraction, since they represent complementary aspects of the same underlying water equilibrium." },
      { q: "Can pH go below 0 or above 14?", a: "Yes, for sufficiently concentrated acids or bases, pH can technically extend beyond the commonly cited 0-14 range — that range is a practical, commonly encountered window rather than a strict mathematical boundary." },
    ],
    related: ["henderson-hasselbalch-calculator", "molarity-calculator", "solution-dilution-calculator", "half-life-calculator", "logarithm-calculator"],
  },

  "solution-dilution-calculator": {
    intro:
      "Diluting a concentrated stock solution down to a target concentration is one of the most common lab tasks — this uses the standard C₁V₁ = C₂V₂ relationship to find exactly what final volume achieves the desired result.",
    method: [
      "C₁V₁ = C₂V₂, rearranged to solve for the final volume: V₂ = (C₁ × V₁) ÷ C₂.",
      "This works because the total amount of solute (moles) stays constant during dilution — only the volume of solvent around it increases.",
    ],
    example: {
      title: "Worked example: diluting 50 mL of a 2 M stock solution to 0.5 M",
      lines: [
        "V₂ = (2 × 50) ÷ 0.5 = 100 ÷ 0.5 = 200 mL.",
        "This means adding solvent to the original 50 mL until the total volume reaches 200 mL — not adding 200 mL of solvent on top of the original 50 mL.",
      ],
    },
    mistakes: [
      { title: "Adding the calculated V₂ as extra solvent rather than diluting up to that total volume", body: "The result represents the total final volume the solution should occupy, not the additional amount of solvent to add — practically, this usually means adding solvent gradually until the total volume in a graduated container reaches V₂, not simply adding V₂ worth of solvent on top of V₁." },
      { title: "Mismatching concentration and volume units between C₁/V₁ and C₂", body: "The formula is unit-agnostic as long as both concentrations use the same unit and volumes stay consistent within the equation — mixing molarity with a different concentration unit, or millilitres with litres without converting, breaks the proportional relationship the formula depends on." },
    ],
    faqs: [
      { q: "Why does the total amount of solute stay the same during dilution?", a: "Diluting only adds more solvent around the existing solute — no solute is added or removed, so the total moles of solute present is identical before and after, which is exactly the principle the C₁V₁ = C₂V₂ formula is built on." },
      { q: "How do I know how much solvent to actually add in practice?", a: "Subtract the original volume (V₁) from the calculated final volume (V₂) — that difference is the amount of solvent to add to reach the target concentration." },
      { q: "Can this formula be used for a concentration in the opposite direction (making a solution stronger)?", a: "The same relationship applies mathematically, but making a solution more concentrated (by removing solvent, or adding more solute) is a fundamentally different practical process than simple dilution — the formula's core relationship still holds if solute amount is conserved." },
      { q: "Does this account for volume changes from mixing different solutions (non-ideal mixing)?", a: "No — this assumes ideal dilution where combined volumes add straightforwardly, which is a very good approximation for most dilute aqueous solutions but can be slightly inaccurate for solutions where mixing causes a genuine, measurable volume change." },
    ],
    related: ["molarity-calculator", "molality-calculator", "ph-calculator", "henderson-hasselbalch-calculator", "unit-price-calculator"],
  },

  "gas-law-calculator": {
    intro:
      "The ideal gas law ties pressure, volume, temperature and amount of gas together in one equation — this specifically solves for pressure, useful whenever the other three variables are known but pressure needs to be found or verified.",
    method: [
      "PV = nRT, rearranged to solve for pressure: P = nRT ÷ V.",
      "R (the ideal gas constant) is used here as 0.082057 L·atm/(mol·K), giving pressure directly in atmospheres when temperature is in Kelvin and volume is in litres.",
    ],
    example: {
      title: "Worked example: 1 mole of gas at 298 K in a 22.4 L container",
      lines: [
        "P = (1 × 0.082057 × 298) ÷ 22.4.",
        "= 24.453 ÷ 22.4 ≈ 1.092 atm.",
        "This is close to but not exactly 1 atm, since standard conditions for exactly 1 atm (1 mole occupying 22.4 L) technically assume 273.15 K, not 298 K — the slightly higher temperature here raises the pressure somewhat above exactly 1 atm at the same volume.",
      ],
    },
    mistakes: [
      { title: "Entering temperature in Celsius instead of Kelvin", body: "The ideal gas law requires absolute temperature (Kelvin) specifically, since it's derived from molecular kinetic energy relationships that only make physical sense on an absolute scale — using Celsius directly (which can be negative or zero) produces a nonsensical or wildly incorrect result." },
      { title: "Assuming the ideal gas law is exactly accurate for all real gases in all conditions", body: "The ideal gas law is an approximation that works very well for many gases under normal conditions, but becomes less accurate at very high pressure or very low temperature, where real gas molecules' own volume and intermolecular attractions start to matter more than the ideal model accounts for." },
    ],
    faqs: [
      { q: "Why must temperature be in Kelvin for this calculation?", a: "The gas law's derivation relates directly to the average kinetic energy of gas molecules, which is proportional to absolute temperature — Kelvin starts at true zero (no molecular motion), making it the only temperature scale where this direct proportionality holds cleanly." },
      { q: "What does R (the gas constant) actually represent?", a: "It's a fixed proportionality constant that makes the units in the ideal gas law work out consistently — its specific numerical value depends on which units are chosen for pressure, volume and temperature, which is why different textbooks sometimes quote R with different numbers." },
      { q: "Why doesn't this calculator ask for the gas's identity (like whether it's oxygen or nitrogen)?", a: "The ideal gas law treats all gases as behaving identically under the same conditions, regardless of their specific molecular identity — this is a simplifying assumption that holds reasonably well for many real gases under everyday conditions." },
      { q: "How is this related to the other three gas law variables (volume, temperature, moles)?", a: "This specific tool solves for pressure given the other three — rearranging the same PV = nRT relationship differently would let it solve for volume, temperature, or moles instead, given whichever three variables are already known." },
    ],
    related: ["molar-mass-calculator", "mole-calculator", "pressure-converter", "pressure-at-depth-calculator", "density-calculator"],
  },

  "chemical-equation-helper": {
    intro:
      "Mass is conserved in any chemical reaction — this checks whether a reaction's measured reactant and product masses actually balance, and calculates the practical yield percentage if they don't match exactly.",
    method: [
      "The difference between reactant mass and product mass is checked — if it's effectively zero, the reaction is considered mass-balanced.",
      "Yield percentage = (product mass ÷ reactant mass) × 100, giving a practical sense of how much mass was actually converted versus lost.",
    ],
    example: {
      title: "Worked example: 100 g of reactant producing 98 g of product",
      lines: [
        "Difference = 100 − 98 = 2 g, so the reaction is reported as 'Unbalanced by 2 g' — some mass is unaccounted for in this simple check.",
        "Yield = (98 ÷ 100) × 100 = 98%.",
      ],
    },
    mistakes: [
      { title: "Assuming an 'unbalanced' mass result means the law of conservation of mass was violated", body: "In practice, an apparent mass discrepancy almost always reflects incomplete measurement (a gas product escaping unmeasured, residue left in equipment, or measurement imprecision) rather than an actual violation of a fundamental physical law — mass really is conserved overall, even when a specific lab measurement doesn't perfectly capture every product." },
      { title: "Confusing this simple mass-balance check with formally balancing a chemical equation", body: "This tool checks whether measured masses are consistent with conservation of mass; formally 'balancing a chemical equation' means adjusting stoichiometric coefficients so atom counts match on both sides symbolically — a related but distinct chemistry skill this calculator doesn't perform." },
    ],
    faqs: [
      { q: "Why might real reactant and product masses not match exactly even in a correctly performed reaction?", a: "Common real-world reasons include a gaseous product escaping without being captured and weighed, small amounts of product lost during transfer or filtration, or simple measurement imprecision — the underlying law of conservation of mass isn't actually being violated in these cases." },
      { q: "What does the 'yield' percentage shown here actually represent?", a: "It's the practical ratio of product mass recovered to reactant mass used — a simplified efficiency indicator, though the more standard chemistry concept of 'percent yield' (actual versus theoretical yield) is covered more precisely by the dedicated Percent Yield Calculator." },
      { q: "Is this the same as writing and balancing a chemical equation symbolically?", a: "No — this checks numeric mass measurements from an actual or hypothetical reaction; symbolically balancing an equation (like 2H₂ + O₂ → 2H₂O) is a separate process involving adjusting coefficients so atom counts match, which this tool doesn't perform directly." },
      { q: "Why does conservation of mass matter as a foundational chemistry principle?", a: "It reflects the fact that atoms are neither created nor destroyed in an ordinary chemical reaction — they're only rearranged into new molecular combinations, which is why the total mass before and after a reaction (accounting for every reactant and product) should be equal." },
    ],
    related: ["percent-yield-calculator", "mole-calculator", "molar-mass-calculator", "molarity-calculator", "gas-law-calculator"],
  },

  "molarity-calculator": {
    intro:
      "Molarity is the standard way chemists express solution concentration — moles of dissolved solute per litre of total solution — and it's the concentration unit most lab recipes, reactions, and titrations are built around.",
    method: ["M = n ÷ V, where n is moles of solute and V is total solution volume in litres, giving concentration in mol/L."],
    example: {
      title: "Worked example: 0.5 moles of solute dissolved in 2 litres of solution",
      lines: ["M = 0.5 ÷ 2 = 0.25 mol/L."],
    },
    mistakes: [
      { title: "Using solvent volume instead of total solution volume", body: "Molarity is defined using the total final solution volume (solute plus solvent combined), not just the volume of solvent added before the solute was dissolved — for solutes that add meaningful volume to the mixture, this distinction matters for an accurate molarity figure." },
      { title: "Confusing molarity (moles per litre of solution) with molality (moles per kilogram of solvent)", body: "These are genuinely different concentration measures, and they diverge for concentrated solutions or ones with a significant temperature-dependent volume change — molarity depends on total solution volume (which itself can shift slightly with temperature), while molality depends only on solvent mass, making it temperature-independent." },
    ],
    faqs: [
      { q: "Why is molarity defined using total solution volume rather than just solvent volume?", a: "Because in most practical lab work, the total volume of the finished solution is what's actually measured (using a volumetric flask, for instance) — defining molarity this way matches how solutions are typically prepared and measured in practice." },
      { q: "How does temperature affect molarity?", a: "Since molarity depends on solution volume, and most liquids expand slightly with heat, molarity can shift very slightly with temperature even though the actual moles of solute present haven't changed — molality avoids this issue since it's based on solvent mass instead." },
      { q: "How is this related to the Solution Dilution Calculator?", a: "That tool specifically handles diluting a solution from one known molarity to another; this tool computes molarity directly from a known moles-and-volume measurement, which is often the starting point before a dilution calculation is even relevant." },
      { q: "What's a typical molarity range for common laboratory solutions?", a: "This varies enormously by application, from very dilute solutions (well under 0.1 M) to concentrated stock solutions (several M or more) — there's no single 'typical' value, since it depends entirely on the specific substance and its intended use." },
    ],
    related: ["solution-dilution-calculator", "molality-calculator", "mole-calculator", "molar-mass-calculator", "ph-calculator"],
  },

  "molality-calculator": {
    intro:
      "Molality measures concentration per kilogram of solvent rather than per litre of solution — a small but important distinction that makes molality unaffected by temperature-driven volume changes, unlike molarity.",
    method: ["Molality = moles of solute ÷ mass of solvent in kilograms, giving concentration in mol/kg."],
    example: {
      title: "Worked example: 0.4 moles of solute dissolved in 0.75 kg of solvent",
      lines: ["Molality = 0.4 ÷ 0.75 ≈ 0.533 mol/kg."],
    },
    mistakes: [
      { title: "Using solution mass instead of solvent mass", body: "Molality specifically uses the mass of the solvent alone, before the solute is added — mistakenly using the total solution's mass (solvent plus solute combined) after mixing gives a subtly incorrect molality figure." },
      { title: "Assuming molality and molarity are numerically close for any solution", body: "For dilute aqueous solutions at room temperature, molarity and molality are often numerically similar (since water's density is close to 1 kg/L), but this coincidence breaks down for concentrated solutions or solvents with a notably different density from water." },
    ],
    faqs: [
      { q: "Why is molality preferred over molarity for certain calculations, like the ones involving boiling point elevation?", a: "Molality doesn't change with temperature (since it's based on a fixed solvent mass, not a temperature-sensitive volume) — this makes it the more appropriate concentration unit for colligative property calculations (like boiling point elevation or freezing point depression) that specifically involve temperature changes." },
      { q: "Does molality depend on the total solution volume at all?", a: "No — it's defined purely by moles of solute relative to the mass of solvent, completely independent of what volume the resulting solution occupies." },
      { q: "How is this related to the Boiling Point Elevation Calculator?", a: "That calculator uses molality directly as one of its required inputs, since boiling point elevation is a colligative property that's cleanly proportional to molality specifically, not molarity." },
      { q: "Can molality be calculated for a solvent other than water?", a: "Yes — the formula works identically for any solvent, using that solvent's actual mass rather than assuming water specifically." },
    ],
    related: ["molarity-calculator", "boiling-point-elevation-calculator", "mole-calculator", "solution-dilution-calculator", "molar-mass-calculator"],
  },

  "percent-yield-calculator": {
    intro:
      "No real chemical reaction converts 100% of its reactants into the desired product — percent yield measures exactly how close to that theoretical maximum a real reaction actually got.",
    method: [
      "Percent yield = (actual yield ÷ theoretical yield) × 100.",
      "Mass 'lost' = theoretical yield − actual yield, representing product that wasn't successfully recovered.",
    ],
    example: {
      title: "Worked example: actual yield 7.4 g, theoretical yield 9.1 g",
      lines: [
        "Percent yield = (7.4 ÷ 9.1) × 100 ≈ 81.32%.",
        "Mass lost = 9.1 − 7.4 = 1.7 g.",
      ],
    },
    mistakes: [
      { title: "Assuming a percent yield below 100% indicates an error in the experiment", body: "Some yield loss is normal and expected in virtually every real reaction, due to side reactions, incomplete reactions, purification losses, or minor measurement imprecision — a percent yield in the 80-95% range is often considered quite good for many real laboratory procedures, not a sign something went wrong." },
      { title: "Confusing theoretical yield with actual reactant mass used", body: "Theoretical yield specifically means the maximum possible product mass predicted by stoichiometry (based on the limiting reactant), not simply the mass of reactant that was originally used — these are related through the reaction's mole ratios, not directly equal to each other." },
    ],
    faqs: [
      { q: "Why do real reactions rarely achieve 100% yield?", a: "Common real-world causes include incomplete reactions (not all reactant converts), competing side reactions consuming some reactant into unwanted products, and physical product losses during transfer, filtration or purification steps." },
      { q: "How is theoretical yield calculated in the first place?", a: "It's derived from the balanced chemical equation's mole ratios, applied to whichever reactant is the limiting reagent — this calculation happens separately, upstream of the percent yield calculation, which simply compares that predicted maximum against what was actually obtained." },
      { q: "What's considered a 'good' percent yield?", a: "This varies enormously by reaction type and complexity — some straightforward reactions routinely achieve 90%+ yield, while complex multi-step syntheses might be considered successful at 50% or even lower, depending on the specific chemistry involved." },
      { q: "Can percent yield ever exceed 100%?", a: "In principle it shouldn't for a correctly measured reaction, but it can appear to in practice if the product is contaminated with an impurity adding extra mass, or if there's a measurement error — a yield over 100% is usually a signal to double-check purity or measurement accuracy, not a genuine result exceeding the theoretical maximum." },
    ],
    related: ["chemical-equation-helper", "mole-calculator", "molar-mass-calculator", "molarity-calculator", "gas-law-calculator"],
  },

  "henderson-hasselbalch-calculator": {
    intro:
      "This finds the pH of a buffer solution directly from its acid dissociation constant and the ratio of base to acid present — the standard calculation behind designing and understanding buffer chemistry.",
    method: ["pH = pKa + log₁₀([A⁻] ÷ [HA]), where [A⁻] is the conjugate base concentration and [HA] is the weak acid concentration."],
    example: {
      title: "Worked example: pKa 4.76, base and acid both at 0.1 M",
      lines: [
        "log₁₀(0.1 ÷ 0.1) = log₁₀(1) = 0.",
        "pH = 4.76 + 0 = 4.76.",
        "This confirms a key property of buffers: when base and acid concentrations are exactly equal, pH equals pKa exactly, since the log term vanishes to zero.",
      ],
    },
    mistakes: [
      { title: "Swapping the base and acid concentrations in the ratio", body: "[A⁻] (base) divided by [HA] (acid) is not the same as the reverse ratio — swapping them flips the sign of the log term, shifting the calculated pH away from pKa in the wrong direction entirely." },
      { title: "Applying this formula outside a buffer's effective range", body: "The Henderson-Hasselbalch equation works best when both the acid and base forms are present in meaningfully comparable amounts (typically within about a factor of 10 of each other) — far outside that range, the buffer's actual behavior deviates more from this simplified equation's prediction." },
    ],
    faqs: [
      { q: "Why does pH equal pKa exactly when base and acid concentrations are equal?", a: "Because log₁₀ of a ratio of 1 (equal concentrations) is exactly 0, leaving pH = pKa + 0 = pKa — this is precisely the point of maximum buffering capacity, where the solution best resists pH changes from added acid or base." },
      { q: "What does pKa actually represent?", a: "It's the pH at which a weak acid is exactly half dissociated into its conjugate base form — a fixed property of each specific acid, analogous to how molar mass is a fixed property tied to a substance's chemical identity." },
      { q: "Why are buffers useful in chemistry and biology?", a: "They resist significant pH changes when small amounts of acid or base are added, which is essential for many biological systems (like blood, which must maintain a very narrow pH range) and many controlled laboratory reactions sensitive to pH." },
      { q: "How is this related to the plain pH Calculator?", a: "The plain pH Calculator finds pH directly from hydrogen ion concentration for any solution; this tool is specifically for buffer systems, finding pH from the buffer's characteristic pKa and its base-to-acid ratio instead." },
    ],
    related: ["ph-calculator", "molarity-calculator", "solution-dilution-calculator", "logarithm-calculator", "molality-calculator"],
  },

  "avogadro-particles-calculator": {
    intro:
      "A direct multiplication by Avogadro's number — the fixed conversion between the chemist's mole and an actual particle count, whether those particles are atoms, molecules, or ions.",
    method: ["Particle count = moles × Avogadro's number (6.02214076 × 10²³ particles per mole)."],
    example: {
      title: "Worked example: 2 moles",
      lines: ["2 × 6.02214076×10²³ ≈ 1.2044 × 10²⁴ particles."],
    },
    mistakes: [
      { title: "Assuming a fraction of a mole gives a correspondingly 'small' particle count", body: "Even a tiny fraction of a mole still corresponds to an enormous number of actual particles — 0.001 moles is still over 6 × 10²⁰ particles, since Avogadro's number itself is so large that meaningful particle counts persist even at very small mole quantities." },
      { title: "Applying this conversion to a quantity that isn't actually in moles", body: "This calculation specifically converts a mole count to particles — applying the same multiplication to a mass or volume figure (which aren't moles) without first converting to moles produces a meaningless result." },
    ],
    faqs: [
      { q: "Why is Avogadro's number so specifically large?", a: "It reflects just how incredibly small individual atoms and molecules actually are — it takes an enormous number of them to add up to a chemically convenient, human-measurable mass like a single gram or a mole's worth of a substance." },
      { q: "Does this work for any kind of particle, or just atoms?", a: "The calculation is identical regardless of what the 'particle' actually is — atoms, molecules, ions, or even more abstract countable units — moles are a general counting unit, not specific to one particular type of particle." },
      { q: "How is this related to the Mole Calculator?", a: "The Mole Calculator finds moles from mass and molar mass, and already includes this same particle-count conversion as part of its detail output — this standalone tool is useful when moles are already known and only the particle-count conversion itself is needed." },
      { q: "Why was this specific numerical value chosen for Avogadro's number?", a: "It's defined so that the mass of one mole of a substance in grams numerically equals that substance's atomic or molecular mass in atomic mass units — a deliberate definitional choice that makes mass-to-mole conversions convenient." },
    ],
    related: ["mole-calculator", "molar-mass-calculator", "gas-law-calculator", "molarity-calculator", "half-life-calculator"],
  },

  "boiling-point-elevation-calculator": {
    intro:
      "Dissolving a solute in a solvent raises its boiling point above the pure solvent's — this calculates exactly how much, based on the solute's concentration and how many particles it actually breaks into when dissolved.",
    method: [
      "ΔTb = i × Kb × m, where i is the van 't Hoff factor (particles produced per formula unit dissolved), Kb is the solvent's specific ebullioscopic constant, and m is molality.",
    ],
    example: {
      title: "Worked example: van 't Hoff factor 2, Kb 0.512 °C·kg/mol, molality 0.5 mol/kg",
      lines: [
        "ΔTb = 2 × 0.512 × 0.5 = 0.512°C.",
        "For water (normal boiling point 100°C): new boiling point = 100 + 0.512 = 100.512°C.",
      ],
    },
    mistakes: [
      { title: "Using a van 't Hoff factor of 1 for a solute that actually dissociates into multiple ions", body: "A non-dissociating molecular solute (like sugar) has i = 1, but an ionic compound that fully dissociates (like a salt splitting into two ions) has i = 2 or higher — using the wrong factor for an ionic compound significantly understates the actual boiling point elevation." },
      { title: "Applying water's Kb value to a different solvent", body: "Kb is specific to each solvent, not a universal constant — using water's commonly cited 0.512 °C·kg/mol for a calculation actually involving a different solvent (which has its own distinct Kb value) produces an incorrect result." },
    ],
    faqs: [
      { q: "Why does dissolving something in a liquid raise its boiling point at all?", a: "Dissolved solute particles interfere with solvent molecules' ability to escape into vapour, effectively requiring a higher temperature to reach the same vapour pressure needed for boiling — this is a colligative property, depending on how many dissolved particles are present, not on what specific substance they are." },
      { q: "What does the van 't Hoff factor actually represent?", a: "It's the number of individual particles one formula unit of solute produces upon dissolving — a non-ionic molecular compound typically has i=1 (it stays as one particle), while an ionic compound that fully dissociates into multiple ions has a correspondingly higher i value." },
      { q: "Why is this called a 'colligative' property?", a: "Colligative properties depend on the number of dissolved particles present, not on their chemical identity — boiling point elevation, freezing point depression, and osmotic pressure are all colligative properties governed by this same particle-counting principle." },
      { q: "How is this related to the Molality Calculator?", a: "Molality is a required input for this calculation — the Molality Calculator would typically be used first to find that value from moles of solute and solvent mass, before applying it here to find the boiling point elevation." },
    ],
    related: ["molality-calculator", "molarity-calculator", "temperature-converter", "solution-dilution-calculator", "half-life-calculator"],
  },
};
