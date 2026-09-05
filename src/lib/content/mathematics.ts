import type { ContentMap } from "./types";

/* Batch 4 — Mathematics. Every worked example below is checked against the
   live compute() function for that slug in calculators.ts / calculators-extra.ts. */

export const mathematicsContent: ContentMap = {
  "basic-calculator": {
    intro:
      "Four operations, two numbers, no ambiguity. This exists for the moment a phone calculator app is one swipe further away than this tab, or you want a clean record of exactly what you typed rather than trusting a running total.",
    method: [
      "Add, subtract, multiply or divide two values directly: a + b, a − b, a × b, or a ÷ b.",
      "Division by zero has no defined result — the tool reports it rather than silently returning zero or an error you have to interpret.",
      "Every step is shown as typed, so you can screenshot the exact expression alongside the answer.",
    ],
    example: {
      title: "Worked example: 12 × 8",
      lines: ["12 × 8 = 96.", "Swap the operation to ÷ with the same numbers and you get 12 ÷ 8 = 1.5 — the tool re-computes instantly rather than requiring a reset."],
    },
    mistakes: [
      { title: "Expecting order of operations across multiple steps", body: "This tool computes exactly one operation between exactly two numbers. For a multi-step expression like 3 + 4 × 2, use the Scientific Calculator, which can chain functions." },
      { title: "Dividing by zero and expecting a fallback", body: "The result is undefined, not 0 or infinity by convention here. Reformulate the question if you hit this — it usually means one of the two inputs was meant to be something else." },
    ],
    faqs: [
      { q: "Why does dividing by zero show an error instead of a number?", a: "Division by zero is mathematically undefined, so the tool reports that directly rather than guessing at a convention like 0 or infinity." },
      { q: "Can I chain more than one operation?", a: "Not on this page — it is deliberately a single two-number operation. The Scientific Calculator handles multi-function expressions and powers." },
      { q: "Does it handle negative numbers?", a: "Yes, enter a negative sign directly in either field and the operation applies normally." },
      { q: "How many decimal places does it show?", a: "Results are rounded to 6 decimal places, which is enough precision for virtually any everyday calculation." },
    ],
    related: ["scientific-calculator", "fraction-calculator", "percent-change-calculator", "exponent-calculator", "algebra-solver"],
  },

  "scientific-calculator": {
    intro:
      "One input, one function, one answer — trig, logs, roots, powers and factorials without opening a physical calculator or a heavier app. Built for the moment you need sin(45°) or 2^10 mid-conversation and don't want to lose your place.",
    method: [
      "Pick a function (sin, cos, ln, x², x^y, x!, and others), enter x, and for two-input functions like x^y or the y-th root, also enter y.",
      "Trig functions respect the angle unit you select — degrees or radians — since sin(45) and sin(45°) are different numbers and mixing them up is the single most common scientific-calculator error.",
      "Inverse trig functions (asin, acos, atan) return an angle in the unit you have selected, not a raw ratio.",
    ],
    example: {
      title: "Worked example: sin(45°) and 2^10",
      lines: [
        "Function = sin, x = 45, angle unit = degrees: sin(45°) ≈ 0.7071.",
        "Function = x^y, x = 2, y = 10: 2^10 = 1024.",
        "Switching the same sin(45) calculation to radians instead of degrees gives ≈ 0.8509 — a completely different, and usually wrong, answer if degrees was intended.",
      ],
    },
    mistakes: [
      { title: "Leaving the angle unit on radians by habit", body: "Most everyday trig problems (construction, navigation, homework) are posed in degrees. Radians are the default in a lot of software, so check the toggle before trusting a trig result." },
      { title: "Confusing x^y with y-th root of x", body: "These are inverse operations. 8^(1/3) and 'cube root of 8' both equal 2, but entering them in the wrong function gives 512 instead." },
      { title: "Requesting factorial of a non-integer or large n", body: "Factorial is defined for non-negative integers here; very large n produces a number too large to display meaningfully well before it becomes actually wrong." },
    ],
    faqs: [
      { q: "What's the difference between log10, log2 and ln?", a: "log10 is log base 10, log2 is log base 2 (common in computing), and ln is the natural log, base e ≈ 2.71828. Pick the one matching your original problem's base." },
      { q: "Why did my trig answer come out completely different from my textbook?", a: "Almost always an angle-unit mismatch. Re-check whether the problem is posed in degrees or radians and match the toggle." },
      { q: "How do I compute a root that isn't square or cube?", a: "Use the 'y-th root of x' function and enter the root you need in the y field — a 5th root uses y = 5." },
      { q: "Is there a limit to how large a number I can raise to a power?", a: "Very large results will show in scientific notation or become imprecise due to floating-point limits — for extreme exponents, expect the display to switch to exponential form." },
    ],
    related: ["basic-calculator", "exponent-calculator", "logarithm-calculator", "root-calculator", "algebra-solver"],
    post: {
      title: "Degrees vs Radians: The Silent Trig Calculator Bug",
      excerpt: "The same sin() call gives two different answers depending on one toggle. Here's how to always know which one you're getting.",
      readTime: "4 min",
      body: [
        "Every scientific calculator, physical or digital, has an angle-unit setting that quietly changes what every trig function means. Left on the wrong setting, sin(30) can return 0.5 (correct, in degrees) or -0.988 (in radians) — both are 'right answers' to different questions.",
        "Degrees split a circle into 360 parts; radians measure the angle by arc length, so a full circle is 2π radians (about 6.283). A right angle is 90° or π/2 radians (about 1.571) — same angle, different number.",
        "The practical rule: everyday and classroom trigonometry (angles of elevation, construction, navigation) is almost always in degrees. Physics and calculus, especially anything involving derivatives of trig functions, is almost always in radians, because the calculus only works cleanly in radians.",
        "If a trig answer looks wildly wrong — often flipped in sign or scaled by a factor that doesn't obviously relate to your inputs — the angle unit is the first thing to check, before assuming the formula or your arithmetic is at fault.",
      ],
    },
  },

  "matrix-calculator": {
    intro:
      "Determinant and inverse of a 2×2 matrix, the size that shows up constantly in early linear algebra and in quick geometric transformations, without setting up a full computer algebra system for four numbers.",
    method: [
      "For a matrix [[a, b], [c, d]], the determinant is ad − bc.",
      "A matrix has an inverse only when its determinant is non-zero. When it is zero, the matrix is 'singular' and no inverse exists — this isn't a computation error, it's a real property of that matrix.",
      "When invertible, the inverse is (1/det) × [[d, −b], [−c, a]] — the diagonal entries swap places and the off-diagonal entries flip sign.",
    ],
    example: {
      title: "Worked example: [[4, 7], [2, 6]]",
      lines: [
        "det = 4×6 − 7×2 = 24 − 14 = 10.",
        "Since det ≠ 0, the inverse exists: (1/10) × [[6, −7], [−2, 4]].",
        "That is [[0.6, −0.7], [−0.2, 0.4]] once the fraction is distributed through each entry.",
      ],
    },
    mistakes: [
      { title: "Assuming every matrix has an inverse", body: "A determinant of exactly zero means no inverse exists, full stop — it isn't a rounding issue to work around, it's a defining property of that particular matrix." },
      { title: "Entering rows and columns swapped", body: "a12 is row 1, column 2, and a21 is row 2, column 1 — swapping them changes the determinant unless the matrix happens to be symmetric." },
    ],
    faqs: [
      { q: "What does it mean for a matrix to be singular?", a: "Its determinant is zero, so it cannot be inverted — geometrically, the transformation it represents collapses the plane onto a line or a point." },
      { q: "Can this handle matrices larger than 2×2?", a: "No, this tool is specifically for the 2×2 case; larger matrices need row-reduction methods a simple four-field calculator can't represent well." },
      { q: "Why is the determinant useful beyond checking for an inverse?", a: "Its absolute value is the area-scaling factor of the linear transformation the matrix represents, and its sign indicates whether orientation is flipped." },
      { q: "How do I verify an inverse is correct?", a: "Multiply the original matrix by its computed inverse — the result should be the identity matrix [[1, 0], [0, 1]]." },
    ],
    related: ["algebra-solver", "equation-solver", "quadratic-equation-solver", "polynomial-calculator", "geometry-calculator"],
  },

  "algebra-solver": {
    intro:
      "Every linear equation of the form ax + b = c reduces to the same three-line solution. This tool skips straight to x, which is useful for checking homework or a quick real-world rearrangement without redoing the algebra by hand.",
    method: [
      "Rearranging ax + b = c gives x = (c − b) ÷ a.",
      "If a = 0, the equation either has no solution (b ≠ c) or is true for every x (b = c) — either way, there is no single unique answer, which is why the tool flags this case instead of dividing by zero.",
    ],
    example: {
      title: "Worked example: 3x + 5 = 20",
      lines: ["3x + 5 = 20.", "3x = 20 − 5 = 15.", "x = 15 ÷ 3 = 5."],
    },
    mistakes: [
      { title: "Entering a = 0 and expecting a numeric answer", body: "With a = 0 the x term vanishes entirely, so there's no coefficient to divide by — the equation is either always true or never true, not solvable for a single x." },
      { title: "Mixing up which side b belongs on", body: "This solver assumes the standard form ax + b = c. If your equation is written differently (e.g. b on the right with a sign flip already applied), rearrange it into this form first or the sign of x will come out wrong." },
    ],
    faqs: [
      { q: "What if my equation has x on both sides, like 2x + 3 = x + 9?", a: "Move all x terms to one side by hand first: 2x − x + 3 = 9 becomes x + 3 = 9, which is a = 1, b = 3, c = 9 in this tool's form." },
      { q: "Can this solve quadratics or equations with x²?", a: "No — for anything with x² use the Quadratic Equation Solver, which handles the discriminant and complex roots this linear tool can't." },
      { q: "Why does it say 'no unique solution' sometimes?", a: "That happens when a = 0. If b also equals c the equation is true for all x; if not, it has no solution at all." },
      { q: "Does it handle fractional or negative coefficients?", a: "Yes, a, b and c can be any real numbers including negatives and decimals." },
    ],
    related: ["quadratic-equation-solver", "equation-solver", "proportion-solver", "polynomial-calculator", "basic-calculator"],
  },

  "equation-solver": {
    intro:
      "Two linear equations, two unknowns — the classic simultaneous-equations problem, solved instantly with Cramer's rule instead of substitution or elimination by hand.",
    method: [
      "For a₁x + b₁y = c₁ and a₂x + b₂y = c₂, the determinant of the coefficient matrix is a₁b₂ − a₂b₁.",
      "When that determinant is non-zero, x = (c₁b₂ − c₂b₁) ÷ determinant and y = (a₁c₂ − a₂c₁) ÷ determinant.",
      "A determinant of zero means the two lines are parallel (no solution) or identical (infinite solutions) — there's no single (x, y) pair to report either way.",
    ],
    example: {
      title: "Worked example: 2x + 3y = 12 and 4x − y = 5",
      lines: [
        "Determinant = 2×(−1) − 4×3 = −2 − 12 = −14.",
        "x = (12×(−1) − 5×3) ÷ (−14) = (−12 − 15) ÷ (−14) = 27 ÷ 14 ≈ 1.929.",
        "y = (2×5 − 4×12) ÷ (−14) = (10 − 48) ÷ (−14) = 38 ÷ 14 ≈ 2.714.",
      ],
    },
    mistakes: [
      { title: "Assuming 'no unique solution' means a data-entry error", body: "It means the two equations describe parallel or identical lines — a genuine mathematical property of that system, not a bug to fix by re-entering numbers." },
      { title: "Mismatching which equation is '1' and which is '2'", body: "The labelling doesn't matter mathematically, but keep each equation's own a, b, c together — mixing a₁ with c₂ produces a different, wrong system." },
    ],
    faqs: [
      { q: "What does it mean geometrically when there's no unique solution?", a: "The two equations represent either two parallel lines that never meet (no solution) or the exact same line (every point is a solution)." },
      { q: "Can this handle three equations and three unknowns?", a: "No, this tool is built specifically for the 2×2 case; a 3-variable system needs a larger determinant method this simple form can't represent." },
      { q: "How do I check the answer is right?", a: "Substitute the computed x and y back into both original equations — both should balance exactly (allowing for small rounding)." },
      { q: "Does the order of the two equations change the answer?", a: "No, swapping which equation is labelled 1 versus 2 gives the identical x and y — the system itself hasn't changed." },
    ],
    related: ["algebra-solver", "matrix-calculator", "quadratic-equation-solver", "proportion-solver", "polynomial-calculator"],
  },

  "fraction-calculator": {
    intro:
      "Add, subtract, multiply or divide two fractions and get the answer already reduced to lowest terms — the step people usually get wrong by hand isn't the arithmetic, it's forgetting to simplify at the end.",
    method: [
      "Addition and subtraction: cross-multiply to a common denominator first — a/b ± c/d = (ad ± cb) ÷ bd.",
      "Multiplication: multiply numerators and denominators directly — a/b × c/d = ac ÷ bd.",
      "Division: multiply by the reciprocal — a/b ÷ c/d = a/b × d/c = ad ÷ bc.",
      "Every result is reduced by dividing both numerator and denominator by their greatest common divisor before it's displayed.",
    ],
    example: {
      title: "Worked example: 1/2 + 1/3",
      lines: [
        "Common denominator: 1/2 = 3/6, 1/3 = 2/6.",
        "3/6 + 2/6 = 5/6.",
        "5/6 is already in lowest terms (GCD of 5 and 6 is 1), so that's the final answer.",
      ],
    },
    mistakes: [
      { title: "Adding numerators and denominators straight across", body: "1/2 + 1/3 is not 2/5 — that shortcut only works for multiplication, not addition. Addition and subtraction need a common denominator first." },
      { title: "Forgetting a fraction can simplify after the operation", body: "Even if both original fractions were already in lowest terms, the result of adding or multiplying them often isn't — e.g. 2/4 + 1/4 = 3/4, but 1/6 + 1/6 = 2/6, which reduces to 1/3." },
    ],
    faqs: [
      { q: "Can I enter a whole number instead of a fraction?", a: "Yes — enter it as itself over 1, e.g. 5 as numerator 5, denominator 1." },
      { q: "What if my denominator is negative?", a: "The tool handles negative numerators or denominators correctly, but it's clearer to keep the negative sign in the numerator by convention." },
      { q: "Why is my answer shown as a fraction instead of a decimal?", a: "The exact fraction is the primary result since it's precise; the decimal equivalent is shown alongside it for a quick sanity check." },
      { q: "How does it find the simplified form?", a: "It computes the greatest common divisor of the resulting numerator and denominator and divides both by it." },
    ],
    related: ["basic-calculator", "ratio-calculator", "proportion-solver", "lcm-calculator", "gcd-calculator"],
  },

  "prime-number-checker": {
    intro:
      "Enter a number, get a straight yes-or-no on primality — and if it isn't prime, the smallest factor that proves it, which is usually more useful than the verdict alone.",
    method: [
      "A number is prime if it has no divisors other than 1 and itself. The check tests divisibility by every integer from 2 up to the square root of the number.",
      "Testing only up to the square root is enough: if n has a factor larger than √n, it must also have a matching factor smaller than √n, so any factor would already have been found.",
    ],
    example: {
      title: "Worked example: is 97 prime?",
      lines: [
        "√97 ≈ 9.85, so only divisors 2 through 9 need checking.",
        "97 is odd, not divisible by 3 (9+7=16), not by 5, and 97 ÷ 7 ≈ 13.86 (not exact).",
        "No divisor found up to 9, so 97 is prime.",
      ],
    },
    mistakes: [
      { title: "Assuming a large number needs checking all the way to itself", body: "You only ever need to test up to the square root — for a number like 10,000, that's checking up to 100, not 10,000, which is why this runs instantly even for large inputs." },
      { title: "Forgetting that 1 is not prime", body: "By definition, primes must have exactly two distinct divisors (1 and themselves). The number 1 has only one divisor, so it's excluded by convention, not by mistake." },
    ],
    faqs: [
      { q: "Is 2 the only even prime number?", a: "Yes — every other even number is divisible by 2 in addition to itself and 1, which disqualifies it from being prime." },
      { q: "What's the largest number this can practically check?", a: "Since the check only needs to go up to the square root, even numbers in the billions are checked essentially instantly." },
      { q: "What does 'divisible by X' in the result actually mean?", a: "It's the smallest factor found, proving the number isn't prime — dividing your input by that factor gives a whole number with no remainder." },
      { q: "Are negative numbers or zero ever prime?", a: "No, primality is only defined for integers 2 and above by convention." },
    ],
    related: ["gcd-calculator", "lcm-calculator", "factorial-calculator", "basic-calculator", "exponent-calculator"],
  },

  "factorial-calculator": {
    intro:
      "n! grows faster than almost any other common function — 10! is already over 3.6 million, and 20! has 19 digits. This tool computes it exactly where possible and switches to scientific notation once the number gets unwieldy.",
    method: [
      "n! = n × (n−1) × (n−2) × ... × 2 × 1, with 0! defined as 1 by convention.",
      "Results are shown in scientific notation (e.g. '2.43 × 10^18') once they exceed roughly 15 digits, since a full 19-digit integer stops being readable at a glance anyway.",
      "Values above 170 aren't computed — factorials that size exceed the range a standard floating-point number can represent accurately.",
    ],
    example: {
      title: "Worked example: 10!",
      lines: [
        "10! = 10 × 9 × 8 × 7 × 6 × 5 × 4 × 3 × 2 × 1.",
        "= 3,628,800.",
        "For comparison, 15! is already 1,307,674,368,000 — about 360,000 times larger, from just 5 more terms.",
      ],
    },
    mistakes: [
      { title: "Expecting factorial to grow linearly", body: "It compounds multiplicatively, so intuition from addition-based growth badly underestimates it — the jump from 10! to 20! is a factor of over 6.7 billion, not 2×." },
      { title: "Entering a non-integer or negative number", body: "Factorial as computed here is only defined for whole numbers 0 and above; fractional factorials require the separate gamma function, which this tool doesn't implement." },
    ],
    faqs: [
      { q: "Why is 0! equal to 1 and not 0?", a: "It's a mathematical convention that makes formulas involving factorials (like combinations and permutations) work correctly at the boundary case of choosing nothing from a set." },
      { q: "What is factorial actually used for?", a: "Counting arrangements and combinations — how many ways a set of n items can be ordered, which underlies permutation, combination and probability calculations." },
      { q: "Why does the calculator stop at n = 170?", a: "Beyond that, the result exceeds what a standard double-precision number can represent without losing accuracy in the least significant digits." },
      { q: "How can I estimate a huge factorial without computing it exactly?", a: "Stirling's approximation, n! ≈ √(2πn) × (n/e)^n, gives a very close estimate for large n without needing the full multiplication." },
    ],
    related: ["permutation-combination-calculator", "binomial-probability-calculator", "prime-number-checker", "exponent-calculator", "probability-calculator"],
  },

  "lcm-calculator": {
    intro:
      "The lowest common multiple is the smallest number both inputs divide into evenly — the number you actually need when adding fractions with different denominators or scheduling two repeating events to line up.",
    method: [
      "LCM(a, b) = (a × b) ÷ GCD(a, b), computed via the Euclidean algorithm for the greatest common divisor.",
      "This works because every common multiple of a and b must be a multiple of their product divided by whatever they share as a common factor.",
    ],
    example: {
      title: "Worked example: LCM of 12 and 18",
      lines: [
        "GCD(12, 18) = 6 (found via the Euclidean algorithm: 18 mod 12 = 6, 12 mod 6 = 0).",
        "LCM = (12 × 18) ÷ 6 = 216 ÷ 6 = 36.",
        "Check: 36 ÷ 12 = 3 and 36 ÷ 18 = 2 — both whole numbers, confirming 36 is a common multiple; nothing smaller works.",
      ],
    },
    mistakes: [
      { title: "Confusing LCM with GCD", body: "GCD is the largest number that divides both inputs; LCM is the smallest number both inputs divide into. They move in opposite directions as the numbers change." },
      { title: "Assuming LCM is always the product of the two numbers", body: "That's only true when the numbers share no common factors (are coprime). Whenever they share a factor, like 12 and 18 sharing 6, the true LCM is smaller than the raw product." },
    ],
    faqs: [
      { q: "When do I actually need LCM in real life?", a: "Most commonly for adding or comparing fractions with different denominators, and for scheduling problems — like figuring out when two events on different cycles will next coincide." },
      { q: "What is the LCM of two prime numbers?", a: "Simply their product, since prime numbers share no common factors other than 1." },
      { q: "Can LCM be found for more than two numbers?", a: "Yes conceptually, by finding the LCM of the first two, then the LCM of that result with the third number, and so on — this tool handles the two-number case directly." },
      { q: "Why does the tool also show the GCD?", a: "GCD is computed as an intermediate step to get the LCM, so it's shown alongside since it's often independently useful — for simplifying fractions, for instance." },
    ],
    related: ["gcd-calculator", "fraction-calculator", "ratio-calculator", "prime-number-checker", "proportion-solver"],
  },

  "gcd-calculator": {
    intro:
      "The greatest common divisor is the largest number that divides both inputs with no remainder — the number you need to fully simplify a fraction or split two lengths into equal-sized pieces with nothing left over.",
    method: [
      "The Euclidean algorithm: GCD(a, b) = GCD(b, a mod b), repeated until the remainder is 0. The last non-zero value is the GCD.",
      "This converges quickly — even for large numbers, it typically takes only a handful of steps because the remainder shrinks fast.",
    ],
    example: {
      title: "Worked example: GCD of 48 and 180",
      lines: [
        "180 mod 48 = 36, so GCD(48, 180) = GCD(36, 48).",
        "48 mod 36 = 12, so GCD(36, 48) = GCD(12, 36).",
        "36 mod 12 = 0, so the GCD is 12.",
      ],
    },
    mistakes: [
      { title: "Trying to list all factors of large numbers by hand", body: "Listing every factor of a large number to find the shared ones is slow and error-prone; the Euclidean algorithm this tool uses reaches the answer in a handful of steps regardless of how large the numbers are." },
      { title: "Assuming GCD is always small", body: "When one number divides the other exactly, the GCD is the smaller number itself — e.g. GCD(6, 18) is 6, not something tiny." },
    ],
    faqs: [
      { q: "What does it mean if the GCD is 1?", a: "The two numbers are 'coprime' — they share no common factors other than 1, even though each may individually have many factors." },
      { q: "How is GCD used to simplify a fraction?", a: "Divide both the numerator and denominator by their GCD — the Fraction Calculator does exactly this automatically after every operation." },
      { q: "Does the order of the two numbers matter?", a: "No, GCD(a, b) always equals GCD(b, a) — the result is the same regardless of which number is entered first." },
      { q: "Can GCD be found for negative numbers?", a: "Conventionally GCD is defined using absolute values, since divisibility doesn't depend on sign." },
    ],
    related: ["lcm-calculator", "fraction-calculator", "ratio-calculator", "prime-number-checker", "proportion-solver"],
  },

  "polynomial-calculator": {
    intro:
      "Evaluate a cubic polynomial ax³ + bx² + cx + d at any value of x in one step — useful for checking a homework answer, plotting a few points by hand, or verifying a root someone claims solves the equation.",
    method: [
      "Substitute the given x directly into ax³ + bx² + cx + d and evaluate term by term, respecting the usual order of operations (powers before multiplication, multiplication before addition).",
    ],
    example: {
      title: "Worked example: f(x) = x³ − 2x² + 3x − 4 at x = 2",
      lines: [
        "x³ term: 2³ = 8.",
        "−2x² term: −2 × 4 = −8.",
        "3x term: 3 × 2 = 6.",
        "Constant: −4.",
        "f(2) = 8 − 8 + 6 − 4 = 2.",
      ],
    },
    mistakes: [
      { title: "Mixing up the coefficient order", body: "This tool expects a as the x³ coefficient, b as x², c as x, and d as the constant — entering them in the wrong slots evaluates a completely different polynomial." },
      { title: "Forgetting the sign belongs to the coefficient", body: "For x³ − 2x² + 3x − 4, the b value is −2, not 2 — the minus sign is part of the coefficient you enter, not something applied separately." },
    ],
    faqs: [
      { q: "Can this find the roots of the polynomial rather than just evaluate it?", a: "Not directly — it evaluates f(x) at one point. Finding where f(x) = 0 for a cubic generally needs either the quadratic formula's cubic cousin or numerical methods beyond a single-point evaluator." },
      { q: "Can I use this for a quadratic instead of a cubic?", a: "Yes — simply set a to 0 and the x³ term disappears, leaving bx² + cx + d, an ordinary quadratic evaluation." },
      { q: "How do I check if a specific x is a root?", a: "Evaluate f(x) at that value — if the result is exactly 0, that x is a root of the polynomial." },
      { q: "What does a negative x do to odd-powered terms?", a: "It flips their sign, since (−x)³ = −(x³), while even-powered terms like x² stay positive regardless of the sign of x." },
    ],
    related: ["quadratic-equation-solver", "algebra-solver", "exponent-calculator", "equation-solver", "basic-calculator"],
  },

  "quadratic-equation-solver": {
    intro:
      "Every quadratic ax² + bx + c = 0 has a fixed formula for its roots — the trick is the discriminant, which tells you in advance whether those roots are two real numbers, one repeated real number, or a complex pair, before you finish the arithmetic.",
    method: [
      "The quadratic formula: x = (−b ± √(b² − 4ac)) ÷ 2a.",
      "The discriminant, b² − 4ac, decides the outcome: positive gives two distinct real roots, exactly zero gives one repeated real root, and negative gives two complex roots.",
      "When the discriminant is negative, the square root of a negative number becomes an imaginary component, and the two roots are complex conjugates of each other.",
    ],
    example: {
      title: "Worked example: x² − 3x + 2 = 0",
      lines: [
        "Discriminant = (−3)² − 4×1×2 = 9 − 8 = 1.",
        "Since 1 > 0, expect two distinct real roots.",
        "x = (3 ± √1) ÷ 2 = (3 ± 1) ÷ 2.",
        "x₁ = 4 ÷ 2 = 2, x₂ = 2 ÷ 2 = 1.",
      ],
    },
    mistakes: [
      { title: "Forgetting the ± produces two separate answers", body: "A quadratic generically has two roots, not one — dropping the minus branch of ± silently discards half the solution." },
      { title: "Assuming a negative discriminant means an error", body: "It means the roots are complex, not real — a legitimate mathematical outcome, not a broken input. It happens whenever the parabola never crosses the x-axis." },
      { title: "Entering a = 0", body: "With no x² term, the equation is linear, not quadratic — use the Algebra Solver instead, since dividing by 2a with a = 0 is undefined." },
    ],
    faqs: [
      { q: "What does it mean when the discriminant is exactly zero?", a: "The parabola touches the x-axis at exactly one point — a repeated root, meaning both x₁ and x₂ come out equal." },
      { q: "How do complex roots show up in the result?", a: "As a real part plus or minus an imaginary part, e.g. x = 2 ± 3i, where i represents the square root of −1." },
      { q: "Can I verify a root without redoing the formula?", a: "Substitute it back into ax² + bx + c — if the equation is genuinely satisfied, the result should equal exactly 0." },
      { q: "Does the order of a, b, c matter?", a: "Yes — they must correspond exactly to the coefficients of x², x, and the constant respectively in that order." },
    ],
    related: ["algebra-solver", "polynomial-calculator", "equation-solver", "exponent-calculator", "root-calculator"],
    post: {
      title: "The Discriminant: Knowing the Answer's Shape Before You Solve",
      excerpt: "b² − 4ac tells you whether a quadratic has two real roots, one, or none — before you finish the formula.",
      readTime: "4 min",
      body: [
        "The quadratic formula always looks the same, but the discriminant hiding inside it — b² − 4ac — decides what kind of answer you're about to get before you finish computing.",
        "A positive discriminant means the parabola crosses the x-axis at two distinct points, so there are two different real solutions. A discriminant of exactly zero means the parabola just touches the axis at its vertex — one repeated solution.",
        "A negative discriminant means the parabola never touches the x-axis at all — there is no real x that makes the equation zero, and the two solutions are complex numbers, a real part plus or minus an imaginary part.",
        "This is worth checking first, before grinding through the square root: if a homework problem is supposed to have 'nice' real-number answers and the discriminant comes out negative, that's usually a signal to re-check the coefficients rather than continue into complex numbers unnecessarily.",
      ],
    },
  },

  "geometry-calculator": {
    intro:
      "Area and perimeter for the four shapes that come up constantly — circle, square, rectangle, triangle — from just one or two dimensions, without hunting down four different formulas.",
    method: [
      "Circle: area = πr², circumference = 2πr, where the single dimension entered is the radius.",
      "Square: area = side², perimeter = 4 × side.",
      "Rectangle: area = length × width, perimeter = 2 × (length + width).",
      "Triangle here uses area = ½ × base × height — a right-angle-style calculation, distinct from Heron's formula which uses three side lengths instead.",
    ],
    example: {
      title: "Worked example: rectangle 8 × 5",
      lines: ["Area = 8 × 5 = 40.", "Perimeter = 2 × (8 + 5) = 2 × 13 = 26."],
    },
    mistakes: [
      { title: "Entering diameter where radius is expected for a circle", body: "This tool's circle mode takes the radius, not the diameter — entering the diameter directly quadruples the computed area instead of the intended value." },
      { title: "Using the triangle mode for three known side lengths", body: "This triangle calculation needs base and height, not three sides. For a triangle where only the three sides are known, use the dedicated Triangle Area Calculator, which applies Heron's formula instead." },
    ],
    faqs: [
      { q: "Why does the triangle option only ask for two values?", a: "It uses the base-times-height form of the area formula, which is the simplest version when you already know or can measure the perpendicular height." },
      { q: "What if I only know a triangle's three side lengths, not its height?", a: "Use the separate Triangle Area Calculator, which applies Heron's formula and needs only the three sides." },
      { q: "Does this handle 3D shapes like spheres or cubes?", a: "No — this is 2D shapes only. For a sphere's volume and surface area, use the Sphere Volume Calculator." },
      { q: "How precise are the results?", a: "Calculations use full floating-point precision internally and display to 4 decimal places, which is more than enough for almost any practical measurement." },
    ],
    related: ["circle-calculator", "triangle-area-calculator", "pythagorean-theorem-calculator", "sphere-volume-calculator", "basic-calculator"],
  },

  "statistics-calculator": {
    intro:
      "Paste in a list of numbers and get mean, median, mode and standard deviation together — the four summary numbers that describe a data set's centre and spread without opening a spreadsheet.",
    method: [
      "Mean is the sum divided by the count — the arithmetic average.",
      "Median is the middle value once sorted; with an even count, it's the average of the two middle values.",
      "Standard deviation measures typical spread from the mean: it's the square root of the average squared distance of each value from the mean.",
    ],
    example: {
      title: "Worked example: 4, 8, 15, 16, 23, 42",
      lines: [
        "Mean = (4+8+15+16+23+42) ÷ 6 = 108 ÷ 6 = 18.",
        "Sorted: 4, 8, 15, 16, 23, 42 — median = (15+16) ÷ 2 = 15.5 (average of the two middle values, since there are 6 numbers).",
        "Standard deviation ≈ 12.1, reflecting that 42 pulls the spread up noticeably relative to the cluster of smaller numbers.",
      ],
    },
    mistakes: [
      { title: "Reading mean and median as interchangeable", body: "They can differ a lot when a data set is skewed by outliers — the mean of 4, 8, 15, 16, 23, 42 is pulled upward by 42, while the median stays closer to where most of the data actually sits." },
      { title: "Expecting a single mode from data with no repeats", body: "If every value in the list is unique, there is no meaningful mode — the calculator will still return a value, but with a repeat count of 1 it carries little statistical meaning." },
    ],
    faqs: [
      { q: "When should I trust the mean over the median, or vice versa?", a: "The median is more robust to outliers — for skewed data like incomes or house prices, the median usually represents the 'typical' value better than the mean." },
      { q: "What does a low standard deviation actually indicate?", a: "The data points cluster tightly around the mean; a high standard deviation means the values are spread widely, with some far from the average." },
      { q: "Does this calculate population or sample standard deviation?", a: "It computes the population standard deviation (dividing by n), which is the appropriate choice when your data set is the entire group of interest rather than a sample drawn from a larger population." },
      { q: "How should I format the numbers I paste in?", a: "Separate them with commas or spaces — the tool parses either format and ignores anything that isn't a valid number." },
    ],
    related: ["average-calculator", "median-mode-calculator", "probability-calculator", "binomial-probability-calculator", "ratio-calculator"],
  },

  "probability-calculator": {
    intro:
      "Given the probability of two independent events, this returns the three numbers that come up in every introductory probability problem: both happening, either happening, and neither happening.",
    method: [
      "For independent events A and B: P(A and B) = P(A) × P(B).",
      "P(A or B) = P(A) + P(B) − P(A and B) — the subtraction avoids double-counting the overlap where both occur.",
      "P(not A) = 1 − P(A), the complement rule.",
    ],
    example: {
      title: "Worked example: P(A) = 0.5, P(B) = 0.3",
      lines: [
        "P(A and B) = 0.5 × 0.3 = 0.15.",
        "P(A or B) = 0.5 + 0.3 − 0.15 = 0.65.",
        "P(not A) = 1 − 0.5 = 0.5.",
      ],
    },
    mistakes: [
      { title: "Assuming this works for dependent events", body: "P(A and B) = P(A) × P(B) is only valid when the two events don't influence each other. For dependent events (like drawing cards without replacement), the true joint probability requires conditional probability instead." },
      { title: "Forgetting to subtract the overlap in 'or' calculations", body: "Simply adding P(A) + P(B) double-counts the outcomes where both occur — the subtraction of P(A and B) is what makes the 'or' probability correct." },
    ],
    faqs: [
      { q: "What does 'independent events' actually mean?", a: "The outcome of one event has no effect on the probability of the other — like two separate coin flips, where the first result tells you nothing about the second." },
      { q: "How would this calculation change for dependent events?", a: "You'd need the conditional probability P(B|A) — the probability of B given A has already happened — in place of the plain P(B) in the joint-probability formula." },
      { q: "Can probabilities entered here be percentages instead of decimals?", a: "Enter them as decimals between 0 and 1 (0.5 for 50%) — the tool doesn't auto-convert percentage-style inputs like 50." },
      { q: "What's the difference between this and the Binomial Probability Calculator?", a: "This handles two single events combined once; the binomial tool handles a fixed number of repeated independent trials, like the chance of exactly 4 heads in 10 coin flips." },
    ],
    related: ["binomial-probability-calculator", "permutation-combination-calculator", "statistics-calculator", "average-calculator", "median-mode-calculator"],
  },

  "average-calculator": {
    intro:
      "The plain arithmetic mean of a list — sum divided by count — for whenever you need a quick average without pulling up a spreadsheet for a handful of numbers.",
    method: [
      "Mean = sum of all values ÷ number of values.",
      "Every value in the list contributes equally, which is exactly what makes the mean sensitive to a single unusually large or small outlier.",
    ],
    example: {
      title: "Worked example: 12, 18, 24, 30, 9",
      lines: ["Sum = 12+18+24+30+9 = 93.", "Count = 5.", "Mean = 93 ÷ 5 = 18.6."],
    },
    mistakes: [
      { title: "Treating the mean as automatically representative", body: "One extreme value can pull the mean well away from where most of the data actually sits — for skewed data, the Median & Mode Calculator often paints a more honest picture." },
      { title: "Including blank or non-numeric entries in the list", body: "Stray text or empty items in a comma-separated list are dropped automatically before averaging, so double-check the count in the result matches how many numbers you intended to include." },
    ],
    faqs: [
      { q: "How is this different from the Statistics Calculator?", a: "This is a fast single-purpose mean-only tool; the Statistics Calculator additionally reports median, mode and standard deviation from the same list." },
      { q: "Does order matter in the list I enter?", a: "No — sum and count don't depend on order, so the mean comes out identical no matter how the numbers are arranged." },
      { q: "What if I need a weighted average instead of a plain one?", a: "This tool treats every value equally; a genuinely weighted average (where some values count more than others) needs each value multiplied by its weight before summing, which isn't what this calculator does." },
      { q: "How are the numbers separated when I paste them in?", a: "Commas, spaces, or a mix of both all work — the parser splits on either." },
    ],
    related: ["statistics-calculator", "median-mode-calculator", "ratio-calculator", "percent-change-calculator", "probability-calculator"],
  },

  "median-mode-calculator": {
    intro:
      "Median and mode together — the middle value once sorted, and the most frequently repeated value — for the two summary statistics the plain average can hide entirely.",
    method: [
      "Sort the list. With an odd count, the median is the single middle value; with an even count, it's the average of the two middle values.",
      "Mode is whichever value appears most often. If several values tie for the most repeats, the tool reports the first one found among the tied values.",
    ],
    example: {
      title: "Worked example: 4, 7, 7, 9, 12, 15",
      lines: [
        "Sorted (already sorted here): 4, 7, 7, 9, 12, 15 — 6 values, so median = (7+9) ÷ 2 = 8.",
        "7 appears twice, more than any other value, so the mode is 7.",
      ],
    },
    mistakes: [
      { title: "Expecting a mode from data with no repeated value", body: "If every number in the list is unique, the reported 'mode' will technically be whichever value the tool encounters, but it carries no real statistical meaning since nothing actually repeats." },
      { title: "Confusing median with mean", body: "Median is a position (the middle after sorting); mean is a calculation (sum over count). They coincide only for symmetric data and diverge sharply when a data set is skewed." },
    ],
    faqs: [
      { q: "Why might median be more useful than mean for something like income data?", a: "A handful of very high incomes pull the mean upward without changing the median much, so median better reflects what a 'typical' person in the group actually earns." },
      { q: "Can a data set have more than one mode?", a: "Yes, when two or more values tie for the highest frequency — this is called bimodal (two) or multimodal (more) data, though this tool reports only the single most frequent value found first." },
      { q: "Does the mode calculation care about decimal precision?", a: "Yes — 7 and 7.0 are treated as the same value, but 7 and 7.01 are treated as distinct values that won't count toward the same mode." },
      { q: "How is this different from the Statistics Calculator?", a: "This tool focuses specifically on median and mode; the Statistics Calculator additionally reports the mean and standard deviation from the same data." },
    ],
    related: ["average-calculator", "statistics-calculator", "probability-calculator", "ratio-calculator", "binomial-probability-calculator"],
  },

  "ratio-calculator": {
    intro:
      "Simplify a ratio to its lowest terms and see its decimal equivalent in one step — for recipe scaling, mixing solutions, or checking whether two quoted ratios (like 3:4 and 24:32) are actually the same proportion.",
    method: [
      "Divide both values by their greatest common divisor to reach the simplest whole-number form of the ratio.",
      "The decimal ratio (first value ÷ second value) gives a single comparable number — useful for checking whether two differently-written ratios are actually equal.",
    ],
    example: {
      title: "Worked example: 24 : 36",
      lines: [
        "GCD(24, 36) = 12.",
        "24 ÷ 12 = 2, 36 ÷ 12 = 3, so the simplified ratio is 2 : 3.",
        "Decimal ratio = 24 ÷ 36 ≈ 0.6667, matching 2 ÷ 3 exactly — confirming the simplification is correct.",
      ],
    },
    mistakes: [
      { title: "Assuming a ratio and a fraction behave identically in every context", body: "A ratio like 2:3 and the fraction 2/3 are mathematically related but describe different things — a fraction is a part of one whole, while a ratio compares two separate quantities." },
      { title: "Not simplifying before comparing two ratios", body: "24:36 and 2:3 look different but are the same ratio — always reduce to lowest terms (or compare decimal equivalents) before concluding two ratios differ." },
    ],
    faqs: [
      { q: "How do I scale a ratio to a specific total, like a recipe for a different number of servings?", a: "Divide the target total by the sum of the simplified ratio's parts, then multiply each part by that scaling factor." },
      { q: "Can this handle ratios with decimal inputs?", a: "The simplification step works cleanly with whole numbers; for decimal inputs, multiply both values up to whole numbers first for the cleanest simplified result." },
      { q: "What does the decimal ratio actually represent?", a: "It's simply the first value divided by the second — a single number that makes it easy to check whether two differently-written ratios are equivalent." },
      { q: "Is a ratio of 1:1 the same as saying two quantities are equal?", a: "Yes exactly — a 1:1 ratio always means both quantities are the same size." },
    ],
    related: ["fraction-calculator", "proportion-solver", "percent-change-calculator", "gcd-calculator", "lcm-calculator"],
  },

  "proportion-solver": {
    intro:
      "Solve a/b = c/x for the missing fourth value — the exact structure behind recipe scaling, map-scale distances, and unit-price comparisons, without cross-multiplying by hand.",
    method: [
      "Cross-multiplying a/b = c/x gives x = (b × c) ÷ a.",
    ],
    example: {
      title: "Worked example: 3/4 = 15/x",
      lines: ["x = (4 × 15) ÷ 3 = 60 ÷ 3 = 20.", "Check: 3/4 = 0.75 and 15/20 = 0.75 — the two ratios match, confirming x = 20 is correct."],
    },
    mistakes: [
      { title: "Setting up the proportion with mismatched units on each side", body: "a/b and c/x need to represent the same kind of relationship in the same order — e.g. if a/b is miles-per-hour, c/x must also be miles-per-hour, not hours-per-mile, or the answer will be inverted." },
      { title: "Entering a = 0", body: "Since x = (b×c) ÷ a, an a of 0 makes the division undefined — there's no proportion to solve if the first ratio's numerator is zero." },
    ],
    faqs: [
      { q: "What's a real example this solves?", a: "If 3 kg of a mixture costs 15 dollars, how much do you pay for 20 kg? Set up 3/15 = 20/x and solve for x, the cost." },
      { q: "Can this solve for a different position, like the 'b' value instead of x?", a: "The tool is set up specifically to solve for the fourth term given the other three in the a/b = c/x layout — rearrange your known values into that position before entering them." },
      { q: "How is this different from the Ratio Calculator?", a: "The Ratio Calculator simplifies a single given ratio; this tool solves for an unknown fourth value across two equal ratios." },
      { q: "Does the direction of the ratio matter?", a: "Yes — a/b = c/x is a different equation from b/a = c/x, so make sure both ratios are set up in the same order (e.g. both as 'part over whole' or both as 'whole over part')." },
    ],
    related: ["ratio-calculator", "fraction-calculator", "algebra-solver", "percent-change-calculator", "equation-solver"],
  },

  "exponent-calculator": {
    intro:
      "Raise any base to any power, including negative and fractional exponents — the single operation behind compound growth, scientific notation, and a surprising amount of everyday scaling.",
    method: [
      "Base^exponent means the base multiplied by itself 'exponent' times for positive whole exponents.",
      "A negative exponent means the reciprocal: base^(−n) = 1 ÷ base^n.",
      "A fractional exponent means a root: base^(1/n) is the nth root of the base.",
    ],
    example: {
      title: "Worked example: 2^10, 2^(-2), and 8^(1/3)",
      lines: [
        "2^10 = 1,024.",
        "2^(−2) = 1 ÷ 2² = 1 ÷ 4 = 0.25.",
        "8^(1/3) = cube root of 8 = 2.",
      ],
    },
    mistakes: [
      { title: "Reading a negative exponent as a negative result", body: "Base^(−n) doesn't produce a negative number for a positive base — it produces the reciprocal, which is still positive. 2^(−2) is 0.25, not −4." },
      { title: "Confusing base^(1/n) with (base/n) or (base×n)", body: "A fractional exponent is a root, not a division or multiplication — 8^(1/3) is 2 (the cube root), which is easy to mistake for 8÷3 ≈ 2.67 at a glance." },
    ],
    faqs: [
      { q: "What does raising a number to the power of 0 give?", a: "Any non-zero base raised to the power 0 equals 1, by definition and consistent with the pattern of the exponent rules." },
      { q: "How do I compute a root, like a fifth root, using this?", a: "Enter 1/5 (0.2) as the exponent — base^0.2 gives the fifth root of the base. The dedicated Root Calculator is a more direct route for pure root problems." },
      { q: "What happens with a negative base and a fractional exponent?", a: "This can produce a complex result or be undefined in the real numbers, depending on the fraction — this tool is built for the common real-number cases and may not display a meaningful answer for those edge cases." },
      { q: "Is there a limit to how large the exponent can be?", a: "Very large exponents will produce results in scientific notation or exceed floating-point precision — practically, results become approximate well before they become wrong." },
    ],
    related: ["root-calculator", "logarithm-calculator", "scientific-calculator", "basic-calculator", "polynomial-calculator"],
  },

  "logarithm-calculator": {
    intro:
      "Log undoes exponentiation — this answers 'what power do I raise the base to, to get this value?' in any base, not just the common base-10 and natural-log versions a basic calculator offers.",
    method: [
      "log_base(value) = ln(value) ÷ ln(base), using the change-of-base formula, since most underlying math libraries only implement natural log directly.",
      "The natural log (ln) and base-10 log (log₁₀) are shown alongside the requested base as a quick cross-reference.",
    ],
    example: {
      title: "Worked example: log base 10 of 1000",
      lines: [
        "ln(1000) ≈ 6.9078, ln(10) ≈ 2.3026.",
        "log₁₀(1000) = 6.9078 ÷ 2.3026 = 3.",
        "Check: 10³ = 1000, confirming the log is exactly 3.",
      ],
    },
    mistakes: [
      { title: "Trying to take the log of zero or a negative number", body: "Logarithms are only defined for positive real numbers — there is no real exponent that produces zero or a negative result from a positive base." },
      { title: "Assuming log always means base 10", body: "In many math and science contexts, especially calculus and computing, 'log' silently means natural log (base e) or base 2. Always confirm which base a problem intends before comparing answers." },
    ],
    faqs: [
      { q: "What is the natural log (ln) actually used for?", a: "It's the log with base e ≈ 2.71828, and it appears throughout calculus, compound growth, and any process involving continuous (rather than stepped) change." },
      { q: "Why is log base 2 relevant in computing?", a: "It answers 'how many times can this be halved (or doubled)?', which is exactly the question behind binary representations, algorithm complexity, and data-size doubling." },
      { q: "How do I undo a logarithm to get back the original value?", a: "Raise the base to the power of the log result — if log_b(x) = y, then b^y = x exactly." },
      { q: "Can this compute a log with a fractional or unusual base, like base 0.5?", a: "Yes, the change-of-base formula works for any valid base greater than 0 and not equal to 1." },
    ],
    related: ["exponent-calculator", "scientific-calculator", "root-calculator", "basic-calculator", "algebra-solver"],
  },

  "root-calculator": {
    intro:
      "Square roots, cube roots, and any nth root of a value, computed together so you can compare them at a glance — for whenever you need more than the square-root button on a basic calculator.",
    method: [
      "The nth root of a value equals value^(1/n) — root-taking and fractional exponentiation are the same operation.",
      "Square root (n=2) and cube root (n=3) are shown by default alongside whatever custom root n you enter.",
    ],
    example: {
      title: "Worked example: 4th root of 256",
      lines: [
        "256^(1/4) = 4, since 4⁴ = 4×4×4×4 = 256.",
        "For comparison, √256 = 16 and ∛256 ≈ 6.3496 — each higher root pulls the result down toward 1 as n grows.",
      ],
    },
    mistakes: [
      { title: "Taking an even root of a negative number", body: "The square root, 4th root, or any even root of a negative number has no real result — only odd roots (cube root, 5th root, etc.) are defined for negative inputs in the real numbers." },
      { title: "Confusing 'root' with 'divide by n'", body: "The nth root of a value is not the same as dividing it by n — 256 ÷ 4 is 64, while the 4th root of 256 is 4. These are entirely different operations." },
    ],
    faqs: [
      { q: "Why does a negative number under an even root show no result?", a: "No real number multiplied by itself an even number of times can produce a negative result, so even roots of negatives are undefined in the real number system." },
      { q: "Can I take a root of a fraction or decimal?", a: "Yes — root-taking works the same way for any positive real number, whole or fractional." },
      { q: "How does this relate to the Exponent Calculator?", a: "They're mathematical inverses: this tool finds the base given a result and a root, while the Exponent Calculator finds the result given a base and a power." },
      { q: "What's the largest root this can meaningfully compute?", a: "Any positive integer root works; as n grows very large, the result approaches 1 for any value greater than 1, since higher and higher roots flatten toward that limit." },
    ],
    related: ["exponent-calculator", "logarithm-calculator", "scientific-calculator", "quadratic-equation-solver", "basic-calculator"],
  },

  "permutation-combination-calculator": {
    intro:
      "nPr counts ordered arrangements, nCr counts unordered selections — the two counting-problem answers that constantly get swapped for each other, resolved together from the same n and r so you can see both at once.",
    method: [
      "Permutations (order matters): nPr = n! ÷ (n−r)!.",
      "Combinations (order doesn't matter): nCr = nPr ÷ r! = n! ÷ (r! × (n−r)!).",
      "Combinations are always smaller than or equal to permutations for the same n and r, since every combination corresponds to r! different orderings that permutations count separately.",
    ],
    example: {
      title: "Worked example: n = 10, r = 3",
      lines: [
        "nPr = 10! ÷ 7! = 10 × 9 × 8 = 720.",
        "nCr = 720 ÷ 3! = 720 ÷ 6 = 120.",
        "720 ordered arrangements collapse into 120 unordered groups because each group of 3 can be ordered 3! = 6 different ways.",
      ],
    },
    mistakes: [
      { title: "Using permutations when order genuinely doesn't matter", body: "Picking 3 people for a committee (roles undefined) is a combination problem; picking a president, vice-president and treasurer from the same group is a permutation problem — the same n and r give very different answers depending on which applies." },
      { title: "Entering r larger than n", body: "You can't choose or arrange more items than exist in the set — r must be less than or equal to n, or the calculation is meaningless." },
    ],
    faqs: [
      { q: "How do I know whether my problem needs permutations or combinations?", a: "Ask whether swapping two selected items would create a genuinely different outcome. If yes (like assigning distinct roles), use permutations; if no (like selecting an unordered group), use combinations." },
      { q: "What does nCr = 1 mean when r equals n?", a: "There is only one way to choose all n items from a set of n — the entire set itself, with nothing left to choose between." },
      { q: "Why is nCr always the smaller of the two results?", a: "Every unordered selection of r items corresponds to r! different ordered arrangements, so combinations divide permutations down by that overcounting factor." },
      { q: "Is this related to the binomial probability formula?", a: "Yes directly — nCr is exactly the coefficient used in the Binomial Probability Calculator to count how many ways k successes can occur among n trials." },
    ],
    related: ["binomial-probability-calculator", "factorial-calculator", "probability-calculator", "statistics-calculator", "exponent-calculator"],
  },

  "binomial-probability-calculator": {
    intro:
      "The probability of getting exactly k successes in n independent trials, each with the same success probability — the standard model behind coin flips, pass/fail testing, and quality-control sampling.",
    method: [
      "P(exactly k successes) = C(n,k) × p^k × (1−p)^(n−k), where C(n,k) is the number of ways to choose which k of the n trials succeed.",
      "This assumes every trial is independent and has the identical probability p of success — changing conditions between trials breaks the model.",
    ],
    example: {
      title: "Worked example: 10 coin flips, exactly 4 heads, p = 0.5",
      lines: [
        "C(10,4) = 10! ÷ (4!×6!) = 210.",
        "p^k = 0.5^4 = 0.0625, (1−p)^(n−k) = 0.5^6 = 0.015625.",
        "P = 210 × 0.0625 × 0.015625 ≈ 0.2051, or about 20.5%.",
      ],
    },
    mistakes: [
      { title: "Using this for 'at least k' instead of 'exactly k' questions", body: "This formula gives the probability of precisely k successes. For 'at least k' or 'at most k', you need to sum this formula across every relevant value of k, not just look up one." },
      { title: "Applying it when trials aren't truly independent or identical", body: "Drawing cards without replacement, for example, changes the probability with each draw — the binomial model assumes p stays constant, which sampling without replacement violates." },
    ],
    faqs: [
      { q: "What counts as a 'trial' in this formula?", a: "Any repeatable event with exactly two outcomes (success/failure) and a fixed probability each time — a coin flip, a pass/fail test, a yes/no survey response." },
      { q: "How would I find the probability of at least 4 successes instead of exactly 4?", a: "Sum this formula's result for k = 4, 5, 6... up to n, or equivalently subtract the sum for k = 0 through 3 from 1." },
      { q: "Why does C(n,k) appear in the formula at all?", a: "Because there are multiple different orders in which exactly k successes among n trials could occur, and each order is equally likely — C(n,k) counts how many such orders exist." },
      { q: "What happens if p = 0.5 exactly, like a fair coin?", a: "The distribution becomes symmetric around n/2 successes, so k successes and (n−k) successes have identical probability." },
    ],
    related: ["permutation-combination-calculator", "probability-calculator", "factorial-calculator", "statistics-calculator", "average-calculator"],
  },

  "arithmetic-sequence-calculator": {
    intro:
      "An arithmetic sequence adds the same fixed amount at every step. This finds any term directly, and the sum of the first n terms, without listing out every value in between.",
    method: [
      "The nth term: aₙ = a + (n−1)d, where a is the first term and d is the common difference.",
      "The sum of the first n terms: Sₙ = (n/2) × (a + aₙ) — the average of the first and last term, times how many terms there are.",
    ],
    example: {
      title: "Worked example: first term 3, common difference 5, 20th term",
      lines: [
        "a₂₀ = 3 + (20−1)×5 = 3 + 95 = 98.",
        "Sum of first 20 terms = (20/2) × (3 + 98) = 10 × 101 = 1,010.",
      ],
    },
    mistakes: [
      { title: "Using (n) instead of (n−1) in the term formula", body: "The first term itself, a₁, adds zero multiples of d — it's a + (1−1)d = a. Forgetting the −1 shifts every term calculation by exactly one step of d." },
      { title: "Assuming a negative common difference means an error", body: "A negative d simply means a decreasing sequence — perfectly valid, and the sum formula works identically regardless of the sign of d." },
    ],
    faqs: [
      { q: "What real situations follow an arithmetic sequence?", a: "Anything that increases or decreases by a fixed amount each step — simple (non-compounding) savings deposits, seating rows that each add the same number of seats, or a countdown timer." },
      { q: "How is this different from a geometric sequence?", a: "Arithmetic adds a fixed amount each step; geometric multiplies by a fixed ratio each step — the two grow completely differently over many terms, linear versus exponential." },
      { q: "Can I find which term number has a specific value?", a: "Rearrange the formula: n = (aₙ − a)/d + 1. This tool computes forward from n, but the same formula runs in reverse by hand." },
      { q: "Why does the sum formula use the average of first and last term?", a: "Because in an arithmetic sequence, pairing the first and last, second and second-last, and so on, always gives the same sum — the classic trick often attributed to a young Gauss adding 1 to 100." },
    ],
    related: ["geometric-sequence-calculator", "average-calculator", "algebra-solver", "statistics-calculator", "percent-change-calculator"],
  },

  "geometric-sequence-calculator": {
    intro:
      "A geometric sequence multiplies by the same fixed ratio at every step rather than adding a fixed amount — the pattern behind compound interest, viral growth, and radioactive decay, depending on whether the ratio is above or below 1.",
    method: [
      "The nth term: aₙ = a × r^(n−1), where a is the first term and r is the common ratio.",
      "The sum of the first n terms (r ≠ 1): Sₙ = a × (r^n − 1) ÷ (r − 1). When r = 1, every term is identical, so the sum is simply a × n.",
    ],
    example: {
      title: "Worked example: first term 2, common ratio 3, 8th term",
      lines: [
        "a₈ = 2 × 3^7 = 2 × 2,187 = 4,374.",
        "Sum of first 8 terms = 2 × (3^8 − 1) ÷ (3 − 1) = 2 × 6,560 ÷ 2 = 6,560.",
      ],
    },
    mistakes: [
      { title: "Using (n) instead of (n−1) in the exponent", body: "The first term a₁ has zero multiplications by r: a × r^(1−1) = a × 1 = a. Forgetting the −1 in the exponent throws off every term by one extra factor of r." },
      { title: "Forgetting the special case r = 1", body: "When the ratio is exactly 1, every term is identical and the standard sum formula divides by zero — the sum is simply a × n instead." },
    ],
    faqs: [
      { q: "What does a common ratio between 0 and 1 mean for the sequence?", a: "The terms shrink toward zero rather than grow — this is the pattern behind exponential decay, like a bouncing ball losing height with each bounce." },
      { q: "How is this related to compound interest?", a: "Compound interest is exactly a geometric sequence: the balance each year is the previous balance multiplied by (1 + rate), making the rate-plus-one the common ratio." },
      { q: "Can the common ratio be negative?", a: "Yes — this makes the sequence alternate in sign every term (positive, negative, positive...) while still growing or shrinking in magnitude according to |r|." },
      { q: "What happens to the sum as n grows very large, if r is between -1 and 1?", a: "The sum converges to a finite limit, a ÷ (1 − r), rather than growing without bound — this is the basis of the 'infinite geometric series' result." },
    ],
    related: ["arithmetic-sequence-calculator", "compound-interest", "exponent-calculator", "percent-change-calculator", "rule-of-72-calculator"],
  },

  "circle-calculator": {
    intro:
      "Area, circumference and diameter, all from a single radius — the three measurements of a circle that are each simple alone but easy to mix up with each other when working quickly.",
    method: [
      "Area = πr².",
      "Circumference = 2πr.",
      "Diameter = 2r — twice the radius, and the value most often confused with the radius itself in word problems.",
    ],
    example: {
      title: "Worked example: radius 7",
      lines: [
        "Area = π × 7² = π × 49 ≈ 153.94.",
        "Circumference = 2 × π × 7 ≈ 43.98.",
        "Diameter = 2 × 7 = 14.",
      ],
    },
    mistakes: [
      { title: "Entering the diameter where radius is expected", body: "This tool takes the radius. Entering a diameter directly overstates the area by a factor of 4, since area scales with the square of whatever length is entered." },
      { title: "Mixing up area and circumference units", body: "Area is in square units (like cm²) while circumference is a plain length (cm) — reporting one with the other's unit is a common but easy-to-catch labelling mistake." },
    ],
    faqs: [
      { q: "How do I find the area if I only know the diameter?", a: "Divide the diameter by 2 to get the radius first, then enter that radius here — or compute area directly as π × (diameter/2)²." },
      { q: "Why is π involved in both area and circumference?", a: "π is the fixed ratio between any circle's circumference and its diameter — it shows up in area too because area is built from the same radius that defines circumference." },
      { q: "What's a practical use for knowing circumference specifically?", a: "Anything involving the distance around a circular object — wheel rotations per distance travelled, the material needed to wrap a circular edge, or belt length around a pulley." },
      { q: "Does this handle a circle given only its area, working backward to radius?", a: "Not directly — this tool computes forward from radius. To reverse it, take the square root of (area ÷ π) to recover the radius." },
    ],
    related: ["geometry-calculator", "sphere-volume-calculator", "triangle-area-calculator", "pythagorean-theorem-calculator", "basic-calculator"],
  },

  "triangle-area-calculator": {
    intro:
      "Heron's formula finds a triangle's area from its three side lengths alone — no angle or height measurement needed, which is exactly the situation land surveying, carpentry, and geometry homework problems often hand you.",
    method: [
      "Semi-perimeter: s = (a + b + c) ÷ 2.",
      "Heron's formula: Area = √(s(s−a)(s−b)(s−c)).",
      "For this to produce a real, positive area, the three sides must satisfy the triangle inequality — each side shorter than the sum of the other two.",
    ],
    example: {
      title: "Worked example: sides 5, 6, 7",
      lines: [
        "s = (5+6+7) ÷ 2 = 9.",
        "Area = √(9×(9−5)×(9−6)×(9−7)) = √(9×4×3×2) = √216 ≈ 14.70.",
      ],
    },
    mistakes: [
      { title: "Entering three sides that can't form a real triangle", body: "If any one side is longer than or equal to the sum of the other two, the expression under the square root becomes zero or negative — there's no such triangle, not a computational glitch." },
      { title: "Using this when you already know base and height", body: "If a perpendicular height is already known, ½ × base × height is faster and simpler — Heron's formula is specifically for when only the three side lengths are available." },
    ],
    faqs: [
      { q: "What is the triangle inequality, exactly?", a: "The rule that the sum of any two sides of a triangle must exceed the third side — it's what makes a valid, closeable triangle geometrically possible." },
      { q: "Does this work for any triangle, including obtuse ones?", a: "Yes — Heron's formula works for any valid triangle shape (acute, right, or obtuse) as long as the three side lengths are geometrically valid." },
      { q: "How is the semi-perimeter useful beyond this formula?", a: "It also appears in the formula for a triangle's inradius (the radius of its inscribed circle), making it a genuinely reusable intermediate value in triangle geometry." },
      { q: "What if I know two sides and the angle between them instead?", a: "That calls for a different formula, Area = ½ × a × b × sin(C) — Heron's formula specifically needs all three side lengths, not an angle." },
    ],
    related: ["pythagorean-theorem-calculator", "geometry-calculator", "circle-calculator", "sphere-volume-calculator", "quadratic-equation-solver"],
  },

  "pythagorean-theorem-calculator": {
    intro:
      "For any right triangle, the two legs determine the hypotenuse directly — a² + b² = c². This also reports the angle opposite side a, useful when you need the triangle's shape, not just its longest side.",
    method: [
      "Hypotenuse: c = √(a² + b²).",
      "Angle A (opposite side a) = arctan(a ÷ b), converted from radians to degrees for readability.",
    ],
    example: {
      title: "Worked example: legs 3 and 4",
      lines: [
        "c = √(3² + 4²) = √(9+16) = √25 = 5 — the classic 3-4-5 right triangle.",
        "Angle A = arctan(3÷4) ≈ 36.87°.",
      ],
    },
    mistakes: [
      { title: "Entering the hypotenuse as one of the two inputs", body: "This tool expects the two legs (the sides forming the right angle), not the hypotenuse itself — entering the hypotenuse in place of a leg gives a geometrically meaningless result." },
      { title: "Assuming this works for non-right triangles", body: "The Pythagorean theorem is only valid when the triangle has a genuine 90° angle. For any other triangle, use the Law of Cosines or Heron's formula (via the Triangle Area Calculator) instead." },
    ],
    faqs: [
      { q: "How do I find a missing leg instead of the hypotenuse?", a: "Rearrange to b = √(c² − a²) — subtract the known leg's square from the hypotenuse's square, then take the square root." },
      { q: "What are some other common Pythagorean triples besides 3-4-5?", a: "5-12-13, 8-15-17, and 7-24-25 are all whole-number right-triangle combinations that satisfy a² + b² = c² exactly." },
      { q: "Why does the calculator also give an angle?", a: "Knowing just the hypotenuse tells you the triangle's size but not its shape — the angle pins down exactly how 'tall and narrow' versus 'short and wide' the right triangle is." },
      { q: "Does the order of entering the two legs matter?", a: "Not for the hypotenuse (addition is symmetric), but it does matter for which angle is reported — swapping a and b swaps which angle you're seeing." },
    ],
    related: ["triangle-area-calculator", "geometry-calculator", "circle-calculator", "quadratic-equation-solver", "root-calculator"],
  },

  "sphere-volume-calculator": {
    intro:
      "Volume and surface area of a sphere from a single radius — the 3D counterpart to the circle calculator, for anything from a scoop of ice cream to a storage tank's capacity.",
    method: [
      "Volume = (4/3)πr³.",
      "Surface area = 4πr².",
    ],
    example: {
      title: "Worked example: radius 5",
      lines: [
        "Volume = (4/3) × π × 5³ = (4/3) × π × 125 ≈ 523.6.",
        "Surface area = 4 × π × 5² = 4 × π × 25 ≈ 314.16.",
      ],
    },
    mistakes: [
      { title: "Entering the diameter instead of the radius", body: "Volume scales with the cube of whatever length is entered, so mistaking diameter for radius here overstates the volume by a factor of 8, not just 2." },
      { title: "Mixing up volume and surface area units", body: "Volume is in cubic units (like cm³) while surface area is in square units (cm²) — a result reported with the wrong unit label is a common but easily caught error." },
    ],
    faqs: [
      { q: "Why does volume use r³ while surface area uses r²?", a: "Volume measures 3D space (length × width × height, conceptually), while surface area measures a 2D covering — this is why volume grows much faster than surface area as a sphere gets bigger." },
      { q: "What's a practical way to double-check a sphere volume result?", a: "For a sphere with the same radius as a cylinder's radius and height equal to its diameter, the sphere's volume is exactly two-thirds of that cylinder's volume — a useful sanity check." },
      { q: "How would I find the radius if I only know the volume?", a: "Rearrange to r = ((3V) ÷ (4π))^(1/3) — divide the volume appropriately and take the cube root." },
      { q: "Does this work for a hemisphere (half a sphere)?", a: "Not directly — halve the full-sphere volume for a hemisphere's volume, but note the surface area calculation needs adjusting differently since a hemisphere also has a flat circular face." },
    ],
    related: ["circle-calculator", "geometry-calculator", "triangle-area-calculator", "root-calculator", "exponent-calculator"],
  },

  "percent-change-calculator": {
    intro:
      "The percentage increase or decrease between an original and a new value — the number behind price changes, growth reporting, and 'how much did this actually change' questions that raw differences don't answer on their own.",
    method: [
      "Percent change = ((new value − original value) ÷ |original value|) × 100.",
      "A positive result is an increase; a negative result is a decrease. Using the absolute value of the original keeps the sign meaningful even when the original value itself is negative.",
    ],
    example: {
      title: "Worked example: from 120 to 150",
      lines: [
        "Change = 150 − 120 = 30.",
        "Percent change = 30 ÷ 120 × 100 = 25%.",
        "Reversing direction, from 150 back to 120, gives (120−150)÷150×100 = −20% — proof that percent increase and the corresponding percent decrease are not the same size, since the base changed.",
      ],
    },
    mistakes: [
      { title: "Assuming a percent increase and decrease of the same raw amount are symmetric", body: "A 25% increase from 120 to 150 is undone by a 20% decrease, not 25%, because the percentage base (the denominator) changes depending on which direction you're calculating from." },
      { title: "Using the new value as the denominator by mistake", body: "Percent change is always measured against the original value, not the new one — dividing by the wrong number gives a plausible-looking but incorrect percentage." },
    ],
    faqs: [
      { q: "Why isn't a 25% increase undone by a 25% decrease?", a: "Because the base for each percentage is different — 25% of 120 is 30 (getting you to 150), but 25% of 150 is 37.5, not 30, so a 25% decrease from 150 overshoots down to 112.5." },
      { q: "How is percent change different from percentage points?", a: "Percent change is a relative measure (proportional to the original value); percentage points are an absolute difference between two percentages, e.g. going from 20% to 25% is a 5 percentage-point rise but a 25% relative increase." },
      { q: "Can percent change exceed 100%?", a: "Yes, easily — if a value more than doubles, the percent change is over 100%. Going from 50 to 200 is a 300% increase." },
      { q: "What does a percent change of exactly 0 mean?", a: "The new value is identical to the original — no change occurred." },
    ],
    related: ["percentage-calculator", "ratio-calculator", "proportion-solver", "discount-calculator", "markup-calculator"],
  },
};
