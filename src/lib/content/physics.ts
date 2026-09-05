import type { ContentMap } from "./types";

/* Batch 6 — Physics. Every worked example below is checked against the
   live compute() function for that slug in calculators.ts / calculators-extra.ts. */

export const physicsContent: ContentMap = {
  "velocity-calculator": {
    intro:
      "Velocity is distance covered per unit time, and nothing more — the calculation everyone learns first, and the one that everything else in kinematics (acceleration, momentum, kinetic energy) builds on top of.",
    method: ["v = d ÷ t, where d is distance and t is the time taken to cover it."],
    example: {
      title: "Worked example: Usain Bolt's 100 m world record",
      lines: [
        "v = 100 ÷ 9.58 ≈ 10.44 m/s.",
        "In km/h: 10.44 × 3.6 ≈ 37.58 km/h — for the full 100 m, average speed only; his peak speed mid-race is considerably higher than this average.",
      ],
    },
    mistakes: [
      { title: "Reporting average velocity as if it were constant throughout", body: "This calculation gives the average over the whole distance and time — actual instantaneous speed at any single moment (like Bolt's peak speed around the 60-70 m mark) is typically higher than the average for the full run." },
      { title: "Confusing velocity with speed when direction matters", body: "Velocity is technically a vector (has direction); speed is just its magnitude. For straight-line motion in one direction, the two numbers are identical, but for motion that changes direction, average velocity can differ from average speed." },
    ],
    faqs: [
      { q: "What's the difference between speed and velocity?", a: "Speed is how fast something moves regardless of direction; velocity specifies both speed and direction. For simple straight-line motion, they're numerically the same." },
      { q: "How do I find average velocity for a trip with multiple different speeds?", a: "Total distance divided by total time, not the average of the individual speeds — those are only the same if each leg takes equal time, which usually isn't the case." },
      { q: "Why does 10 m/s equal 36 km/h?", a: "Multiply by 3.6: there are 3,600 seconds in an hour and 1,000 metres in a kilometre, so m/s × 3.6 = km/h." },
      { q: "Does this calculator handle negative velocity (moving backward)?", a: "It computes magnitude from distance and time as entered; direction (sign) would need to be tracked separately based on your reference frame." },
    ],
    related: ["acceleration-calculator", "momentum-calculator", "kinetic-energy-calculator", "rpm-to-speed-calculator", "force-calculator"],
  },

  "acceleration-calculator": {
    intro:
      "Acceleration measures how quickly velocity itself is changing — not how fast something is moving, but how fast that speed is increasing or decreasing, which is what actually determines the force involved.",
    method: ["a = (v − u) ÷ t, where u is initial velocity, v is final velocity, and t is the time over which the change happens."],
    example: {
      title: "Worked example: 0 to 27 m/s in 9 seconds",
      lines: ["a = (27 − 0) ÷ 9 = 3 m/s².", "This means velocity increases by 3 m/s for every second that passes — after 3 seconds it's at 9 m/s, after 6 seconds at 18 m/s, and so on if acceleration stays constant."],
    },
    mistakes: [
      { title: "Forgetting acceleration can be negative (deceleration)", body: "If final velocity is lower than initial velocity, the result comes out negative — that's not an error, it's simply describing slowing down rather than speeding up." },
      { title: "Assuming acceleration units (m/s²) are the same as velocity units (m/s)", body: "Acceleration is a rate of change of velocity, not a velocity itself — mixing these up (like reporting an acceleration result in m/s) is a common unit-labelling mistake." },
    ],
    faqs: [
      { q: "What does 9.81 m/s² specifically represent?", a: "It's the acceleration due to Earth's gravity at the surface — the rate at which any freely falling object speeds up, ignoring air resistance." },
      { q: "How is acceleration related to force?", a: "Newton's second law: F = m × a — a given force produces more acceleration on a lighter mass and less on a heavier one." },
      { q: "Can acceleration be zero while velocity is not?", a: "Yes — constant velocity (no speeding up or slowing down) means zero acceleration, regardless of how fast the object is actually moving." },
      { q: "What if initial and final velocity are given in different units, like km/h and m/s?", a: "Convert both to the same unit before entering them — mixing units silently produces a nonsensical result since the formula assumes both are already in the same scale." },
    ],
    related: ["velocity-calculator", "force-calculator", "free-fall-calculator", "momentum-calculator", "centripetal-force-calculator"],
  },

  "force-calculator": {
    intro:
      "Newton's second law in its most direct form: force equals mass times acceleration. This is the calculation behind everything from how hard a car's engine has to work to how much a seatbelt has to withstand in a crash.",
    method: ["F = m × a, giving force in newtons when mass is in kilograms and acceleration is in m/s²."],
    example: {
      title: "Worked example: 70 kg person under standard gravity",
      lines: ["F = 70 × 9.81 = 686.7 N.", "This is the person's weight — the gravitational force acting on their mass at Earth's surface."],
    },
    mistakes: [
      { title: "Confusing mass and weight", body: "Mass (kg) is an intrinsic property of an object; weight (N) is the force gravity exerts on that mass, and changes depending on which gravitational field the object is in. This calculator computes force (weight) from mass and a given acceleration." },
      { title: "Using the wrong acceleration for the situation", body: "9.81 m/s² is specifically Earth's surface gravity — for any other acceleration (braking, cornering, a different planet), enter that specific value rather than defaulting to gravity by habit." },
    ],
    faqs: [
      { q: "Why does the same mass weigh less on the Moon?", a: "Weight is F = m × g, and the Moon's gravitational acceleration is roughly 1/6th of Earth's — the mass itself doesn't change, only the force gravity exerts on it." },
      { q: "How is this used for things other than gravity, like braking a car?", a: "Any acceleration works in the formula — braking deceleration, cornering (centripetal) acceleration, or a rocket's thrust-driven acceleration all use the same F = m × a relationship." },
      { q: "What's the unit of force and what does it represent physically?", a: "The newton (N) is the force needed to accelerate 1 kg at 1 m/s² — roughly the weight of a small apple resting in your hand under Earth's gravity." },
      { q: "Does this account for multiple forces acting at once?", a: "This calculates one force from one mass and one acceleration — for multiple simultaneous forces, you'd need the net acceleration resulting from all of them combined." },
    ],
    related: ["acceleration-calculator", "momentum-calculator", "centripetal-force-calculator", "work-done-calculator", "potential-energy-calculator"],
  },

  "momentum-calculator": {
    intro:
      "Momentum captures both how much mass is moving and how fast — a slow-moving truck and a fast-moving car can carry comparable momentum, which is exactly why momentum, not just speed, determines collision severity.",
    method: ["p = m × v, giving momentum in kg·m/s."],
    example: {
      title: "Worked example: 1,200 kg car at 25 m/s",
      lines: ["p = 1,200 × 25 = 30,000 kg·m/s.", "A much lighter 300 kg motorcycle would need to travel at 100 m/s (360 km/h) to match that same momentum — an extreme and unrealistic speed, illustrating how much mass alone contributes."],
    },
    mistakes: [
      { title: "Treating momentum as interchangeable with kinetic energy", body: "Momentum scales linearly with velocity (double the speed, double the momentum), while kinetic energy scales with velocity squared (double the speed, quadruple the energy) — they behave very differently as speed increases." },
      { title: "Forgetting momentum is a vector", body: "Direction matters for momentum — two equal masses moving toward each other at the same speed have momenta that cancel (sum to zero), not add, when treated as a system." },
    ],
    faqs: [
      { q: "Why does momentum matter in collisions specifically?", a: "Total momentum of a closed system is conserved before and after a collision — this conservation law is what lets you calculate outcomes like how fast two vehicles move after impact, without needing to know the details of the collision force itself." },
      { q: "How is momentum different from force?", a: "Momentum is mass times velocity (a property of motion); force is what changes momentum over time (F = change in momentum ÷ time) — force causes a change in momentum, it isn't momentum itself." },
      { q: "Does a heavier, slower object always have more momentum than a lighter, faster one?", a: "Not necessarily — it depends on the specific numbers. A 2,000 kg truck at 5 m/s (10,000 kg·m/s) has less momentum than a 1,000 kg car at 15 m/s (15,000 kg·m/s), despite being far heavier." },
      { q: "What's the unit of momentum in words?", a: "Kilogram-metres per second (kg·m/s) — there's no separate named unit for momentum the way there is for force (newtons) or energy (joules)." },
    ],
    related: ["velocity-calculator", "kinetic-energy-calculator", "force-calculator", "acceleration-calculator", "energy-calculator"],
  },

  "energy-calculator": {
    intro:
      "Total mechanical energy is the sum of an object's kinetic energy (from motion) and potential energy (from height) — this splits both out so you can see exactly where the total comes from.",
    method: [
      "Kinetic energy: KE = ½mv².",
      "Potential energy: PE = mgh, using standard gravity g = 9.81 m/s².",
      "Total mechanical energy = KE + PE.",
    ],
    example: {
      title: "Worked example: 2 kg object moving at 10 m/s, 5 m above ground",
      lines: [
        "KE = 0.5 × 2 × 10² = 100 J.",
        "PE = 2 × 9.81 × 5 = 98.1 J.",
        "Total = 100 + 98.1 = 198.1 J.",
      ],
    },
    mistakes: [
      { title: "Forgetting this uses fixed standard gravity", body: "This calculator always uses 9.81 m/s² for the potential-energy term — if working on a different planet or wanting a custom gravity value, use the standalone Potential Energy Calculator, which lets gravity be entered directly." },
      { title: "Assuming total mechanical energy always stays exactly the same as an object moves", body: "In an idealised, friction-free system, total mechanical energy is conserved — kinetic and potential trade off as height and speed change, but real systems lose some energy to air resistance and friction along the way." },
    ],
    faqs: [
      { q: "Why does total energy stay constant as an object rises or falls (ideally)?", a: "As height increases, potential energy rises and kinetic energy falls (the object slows), and vice versa — the two trade off so their sum remains constant, assuming no energy is lost to friction or air resistance." },
      { q: "What happens to the total when velocity is zero?", a: "All the mechanical energy is potential — this is the situation for an object momentarily at rest at the top of its trajectory, like a ball thrown straight up at its peak." },
      { q: "Can total mechanical energy be negative?", a: "Not in this everyday context — both KE (½mv², always non-negative since v² can't be negative) and PE relative to a ground reference (using positive height) are non-negative here." },
      { q: "How is this different from just using the Kinetic and Potential Energy calculators separately?", a: "This tool adds the convenience of combining both in one step and showing the total, which is useful for problems that specifically ask for total mechanical energy at a given moment." },
    ],
    related: ["kinetic-energy-calculator", "potential-energy-calculator", "free-fall-calculator", "momentum-calculator", "velocity-calculator"],
  },

  "kinetic-energy-calculator": {
    intro:
      "Kinetic energy grows with the square of velocity, not linearly — which is why doubling a vehicle's speed doesn't double its stopping distance or crash energy, it quadruples it.",
    method: ["KE = ½ × m × v², giving energy in joules when mass is in kg and velocity is in m/s."],
    example: {
      title: "Worked example: 2 kg object at 10 m/s, then doubled to 20 m/s",
      lines: [
        "At 10 m/s: KE = 0.5 × 2 × 10² = 100 J.",
        "At 20 m/s: KE = 0.5 × 2 × 20² = 400 J — four times the energy from only twice the speed.",
      ],
    },
    mistakes: [
      { title: "Assuming kinetic energy doubles when speed doubles", body: "Because velocity is squared in the formula, doubling speed quadruples kinetic energy, not doubles it — this is exactly why small increases in vehicle speed disproportionately increase collision severity." },
      { title: "Forgetting the ½ factor", body: "Dropping the ½ overstates kinetic energy by exactly double — a common formula-recall slip that's easy to catch by checking against a known reference value." },
    ],
    faqs: [
      { q: "Why does kinetic energy use velocity squared instead of velocity directly?", a: "It comes from integrating force over distance for an accelerating object (work-energy theorem) — the mathematics of that derivation produces the v² relationship, which is a well-established physical result, not an arbitrary convention." },
      { q: "How does this relate to braking distance in vehicles?", a: "Since kinetic energy scales with v², and braking force does work to dissipate that energy, stopping distance also scales roughly with the square of speed — doubling speed roughly quadruples the distance needed to stop." },
      { q: "What's a real-world reference point for 1 joule of kinetic energy?", a: "Roughly the energy of a 100 g apple moving at about 4.5 m/s (16 km/h) — a helpful mental anchor for judging whether a computed KE value is large or small." },
      { q: "Does this formula apply to rotating objects too?", a: "Rotational kinetic energy uses a related but different formula (½Iω², involving moment of inertia and angular velocity) — this calculator is specifically for straight-line (translational) motion." },
    ],
    related: ["energy-calculator", "potential-energy-calculator", "momentum-calculator", "velocity-calculator", "work-done-calculator"],
  },

  "potential-energy-calculator": {
    intro:
      "Gravitational potential energy is stored purely by virtue of height — lift something up and you've done work against gravity, and that work is recoverable as kinetic energy on the way back down.",
    method: ["PE = m × g × h, where g is gravitational acceleration and h is height above the reference point."],
    example: {
      title: "Worked example: 2 kg mass at 10 m height",
      lines: ["PE = 2 × 9.81 × 10 = 196.2 J.", "On the Moon (g ≈ 1.62 m/s²) instead, the same mass and height would give PE = 2 × 1.62 × 10 = 32.4 J — far less, because gravity itself is weaker there."],
    },
    mistakes: [
      { title: "Forgetting height is always relative to a chosen reference point", body: "Potential energy has no single absolute value — it depends entirely on where you define h = 0. Comparing PE between two setups only makes sense if both use the same reference height." },
      { title: "Using the wrong gravity value for the context", body: "This calculator lets gravity be entered directly, which matters for anything other than Earth's surface — using 9.81 m/s² for a Moon or Mars calculation gives a badly wrong answer for that context." },
    ],
    faqs: [
      { q: "Why does potential energy depend on where you set the reference height?", a: "Only changes in potential energy have real physical meaning (like the energy released falling from one height to another) — the absolute value is a bookkeeping choice, and any consistent reference point works as long as it's used consistently." },
      { q: "How does this convert into kinetic energy when something falls?", a: "In free fall (ignoring air resistance), potential energy lost exactly equals kinetic energy gained — this is the core idea used in the Free Fall Calculator to derive impact speed from height alone." },
      { q: "What if gravity varies with altitude in a very tall structure?", a: "This formula assumes constant g, which is an excellent approximation for everyday heights but becomes less accurate over very large altitude changes, like satellite orbits, where gravity itself measurably weakens with distance." },
      { q: "Can potential energy be negative?", a: "Yes, relative to a chosen reference point — an object below the reference height (like an object at the bottom of a well relative to ground level) has negative potential energy in that reference frame." },
    ],
    related: ["kinetic-energy-calculator", "free-fall-calculator", "energy-calculator", "work-done-calculator", "escape-velocity-calculator"],
  },

  "projectile-motion-calculator": {
    intro:
      "A launched projectile's range, maximum height and total flight time all come from the same launch speed and angle — the classic 'cannonball' problem, and the reason 45° maximises range for a given speed.",
    method: [
      "Range = v² × sin(2θ) ÷ g.",
      "Maximum height = (v × sin θ)² ÷ (2g).",
      "Flight time = 2v × sin θ ÷ g.",
      "All three assume launch and landing at the same height, with no air resistance.",
    ],
    example: {
      title: "Worked example: 20 m/s launch speed at 45°",
      lines: [
        "Range = 20² × sin(90°) ÷ 9.81 = 400 × 1 ÷ 9.81 ≈ 40.77 m.",
        "Max height = (20 × sin 45°)² ÷ (2×9.81) = (14.14)² ÷ 19.62 ≈ 10.19 m.",
        "Flight time = 2×20×sin(45°) ÷ 9.81 ≈ 2.88 s.",
      ],
    },
    mistakes: [
      { title: "Assuming range increases the higher the launch angle goes", body: "Range peaks at exactly 45° for a given speed and then decreases again — a 70° launch, for instance, gives a lower range than 45° despite being a 'higher' angle, because it trades distance for height." },
      { title: "Applying this formula when launch and landing heights differ", body: "This formula assumes the projectile lands at the same height it launched from. A projectile launched from a cliff or thrown from shoulder height landing on the ground needs a more complete equation accounting for that height difference." },
    ],
    faqs: [
      { q: "Why does 45° give the maximum range?", a: "Range depends on sin(2θ), which peaks at 2θ = 90°, i.e. θ = 45° — any angle above or below that reduces sin(2θ) and therefore range, for the same launch speed." },
      { q: "Do two different angles ever give the same range?", a: "Yes — angles that add up to 90° (like 30° and 60°) produce the same range for the same launch speed, since sin(2×30°) = sin(60°) = sin(120°) = sin(2×60°)." },
      { q: "Does this account for air resistance?", a: "No — this is the idealised, vacuum-style projectile motion model. Real projectiles (especially fast or light ones) experience drag that reduces range and alters the trajectory shape." },
      { q: "How would this change on the Moon or another planet?", a: "Simply change the gravity value — lower gravity increases both range and flight time for the same launch speed and angle, which is exactly why golf balls travel further on the Moon." },
    ],
    related: ["free-fall-calculator", "velocity-calculator", "kinetic-energy-calculator", "centripetal-force-calculator", "work-done-calculator"],
    post: {
      title: "Why 45 Degrees Isn't Always the 'Best' Launch Angle",
      excerpt: "Physics says 45° maximises range — but only under an assumption that almost never holds in the real world.",
      readTime: "4 min",
      body: [
        "The textbook result is clean: for a projectile launched and landing at the same height with no air resistance, 45° gives the maximum possible range for a given launch speed. It's one of the most quoted facts in introductory physics.",
        "But that result depends entirely on the launch and landing heights being equal. A shot put thrown from shoulder height lands on the ground, not back at shoulder height — and for that case, the optimal angle is actually somewhat below 45°, because the extra time spent in the air from a higher initial release favours a flatter trajectory.",
        "Air resistance changes the picture further. For anything light or fast enough for drag to matter — a golf ball, a baseball hit hard — the optimal angle for real-world range is often noticeably lower than 45°, because a flatter trajectory spends less time fighting drag.",
        "The 45° rule is a genuinely useful mental anchor and exactly correct for the idealised case this calculator models. But treating it as a universal 'best angle' for every real throwing or launching situation is a common oversimplification worth knowing about.",
      ],
    },
  },

  "wave-frequency-calculator": {
    intro:
      "Frequency, wavelength and wave speed are locked together by one relationship — this is the calculation behind everything from tuning a radio to understanding why a longer guitar string sounds a lower note.",
    method: ["f = v ÷ λ, where v is wave speed and λ (lambda) is wavelength, giving frequency in hertz (cycles per second)."],
    example: {
      title: "Worked example: sound wave, speed 340 m/s, wavelength 0.5 m",
      lines: ["f = 340 ÷ 0.5 = 680 Hz.", "Period (time for one full cycle) = 0.5 ÷ 340 ≈ 0.00147 s, the reciprocal relationship between frequency and period."],
    },
    mistakes: [
      { title: "Assuming wave speed is always the speed of light or sound universally", body: "Wave speed depends on the medium and wave type — sound travels at roughly 340 m/s in air but much faster in water or solids; light travels at about 3×10⁸ m/s in a vacuum but slower in glass or water. Using the wrong speed for the actual medium gives a wrong frequency." },
      { title: "Confusing frequency with period", body: "They're reciprocals of each other (f = 1/T), not the same quantity — a higher frequency means a shorter period, and mixing them up inverts the relationship entirely." },
    ],
    faqs: [
      { q: "Why does wave speed change between different mediums?", a: "It depends on the physical properties of the medium — for sound, density and elasticity of the material; for light, the refractive index. This is exactly why light bends (refracts) when passing between mediums." },
      { q: "How is wavelength related to musical pitch?", a: "Shorter wavelength means higher frequency (since v = fλ, and speed of sound is roughly constant in air), and higher frequency is perceived as higher pitch — a shorter guitar string or tighter drum produces a shorter wavelength and higher note." },
      { q: "What's the relationship between frequency and energy for light waves?", a: "For electromagnetic radiation, higher frequency corresponds to higher photon energy (E = hf) — this is why ultraviolet light (higher frequency) can damage skin in ways visible light (lower frequency) doesn't." },
      { q: "Can this calculator be used for electromagnetic waves as well as sound?", a: "Yes, the relationship f = v/λ is universal to all wave types — just use the correct wave speed for the specific medium and wave type in question." },
    ],
    related: ["optics-calculator", "velocity-calculator", "pendulum-period-calculator", "half-life-calculator", "energy-calculator"],
  },

  "optics-calculator": {
    intro:
      "The thin lens equation predicts exactly where an image forms and how magnified it is, from just the lens's focal length and how far the object sits from it.",
    method: [
      "1/f = 1/u + 1/v, rearranged here to solve for image distance: v = 1 ÷ (1/f − 1/u).",
      "Magnification = −v ÷ u, where a negative sign conventionally indicates an inverted image.",
    ],
    example: {
      title: "Worked example: 10 cm focal length, object at 30 cm",
      lines: [
        "1/v = 1/10 − 1/30 = 3/30 − 1/30 = 2/30, so v = 15 cm.",
        "Magnification = −15 ÷ 30 = −0.5, meaning the image is inverted and half the size of the object.",
      ],
    },
    mistakes: [
      { title: "Mixing up sign conventions between different optics textbooks", body: "This calculator uses a standard convention where a negative magnification means an inverted image — some textbooks and regions use different sign conventions for object/image distance, so double-check against your specific course's convention before comparing results directly." },
      { title: "Entering an object distance smaller than the focal length without expecting a different image type", body: "When the object is closer to the lens than its focal length, the lens produces a virtual, upright, magnified image rather than a real inverted one — the formula's output (a negative or unusual-looking v) reflects this different physical situation." },
    ],
    faqs: [
      { q: "What does a negative magnification value mean?", a: "The image is inverted relative to the object — this is the normal case for a real image formed by a converging lens when the object is beyond the focal length." },
      { q: "What's the difference between a real and virtual image in this context?", a: "A real image can be projected onto a screen (light actually converges there); a virtual image cannot (light only appears to diverge from that point) — which type forms depends on where the object sits relative to the focal length." },
      { q: "How would this change for a diverging (concave) lens instead of a converging one?", a: "A diverging lens has a negative focal length by convention, which changes the sign pattern of the result — always producing a virtual, upright, reduced image regardless of object distance." },
      { q: "Can this be used for mirrors as well as lenses?", a: "The mirror equation has an identical mathematical form (1/f = 1/u + 1/v), so the same calculation applies, though sign conventions for mirrors can differ slightly by convention from those used for lenses." },
    ],
    related: ["wave-frequency-calculator", "half-life-calculator", "pendulum-period-calculator", "escape-velocity-calculator", "energy-calculator"],
  },

  "free-fall-calculator": {
    intro:
      "Drop something from a known height and, ignoring air resistance, both the fall time and the impact speed follow directly — the calculation behind everything from a dropped phone screen to a skydiving physics problem.",
    method: [
      "Fall time: t = √(2h ÷ g).",
      "Impact speed: v = t × g (equivalently, √(2gh)).",
    ],
    example: {
      title: "Worked example: dropped from 45 m",
      lines: [
        "t = √(2×45 ÷ 9.81) = √9.174 ≈ 3.03 s.",
        "Impact speed = 3.03 × 9.81 ≈ 29.7 m/s (about 107 km/h).",
      ],
    },
    mistakes: [
      { title: "Ignoring that this assumes no air resistance", body: "Real falling objects, especially light or large-surface-area ones like a sheet of paper or a skydiver at high speed, experience significant air resistance that this idealised calculation doesn't account for — actual fall time and speed can differ substantially for such objects." },
      { title: "Assuming heavier objects fall faster", body: "In the absence of air resistance, all objects fall at the same rate regardless of mass — mass doesn't appear anywhere in either formula, which is exactly the famous result usually attributed to Galileo." },
    ],
    faqs: [
      { q: "Why doesn't mass appear in either formula?", a: "Gravitational acceleration is the same for all masses in the absence of air resistance — a heavier object experiences more gravitational force, but also has proportionally more inertia resisting that force, and the two effects exactly cancel." },
      { q: "How significant is air resistance in practice?", a: "For dense, compact objects falling relatively short distances (like a dropped tool from a few metres), air resistance is often negligible. For light objects, long falls, or high speeds, it becomes significant and this idealised calculation increasingly overstates the real impact speed." },
      { q: "What does terminal velocity have to do with this?", a: "Terminal velocity is the speed at which air resistance exactly balances gravity, so the object stops accelerating — this calculator's ever-increasing impact speed with height eventually becomes unrealistic once terminal velocity would actually be reached first." },
      { q: "How would this change on the Moon?", a: "Enter the Moon's gravity (about 1.62 m/s²) instead of Earth's — the fall would take considerably longer and result in a lower impact speed for the same height, exactly as seen in footage of Apollo astronauts dropping objects." },
    ],
    related: ["potential-energy-calculator", "kinetic-energy-calculator", "acceleration-calculator", "projectile-motion-calculator", "escape-velocity-calculator"],
  },

  "pendulum-period-calculator": {
    intro:
      "A simple pendulum's swing period depends only on its length and local gravity — not on how heavy the bob is or how wide the swing angle is (for small swings), which is a genuinely surprising and useful physical result.",
    method: ["T = 2π√(L ÷ g), where L is the pendulum's length and g is local gravitational acceleration."],
    example: {
      title: "Worked example: 1 metre pendulum on Earth",
      lines: [
        "T = 2π × √(1 ÷ 9.81) = 6.2832 × 0.3193 ≈ 2.006 s.",
        "Frequency = 1 ÷ 2.006 ≈ 0.4985 Hz — just under one full swing per second.",
      ],
    },
    mistakes: [
      { title: "Assuming a heavier pendulum bob swings slower or faster", body: "Mass doesn't appear anywhere in the formula — a heavier bob on the same length string has exactly the same period as a lighter one, for the same reason mass doesn't affect free-fall time." },
      { title: "Applying this formula to a wide swing angle", body: "This exact formula is an approximation valid for small swing angles (typically under about 15-20°) — a pendulum swinging through a much wider arc takes measurably longer per swing than this formula predicts." },
    ],
    faqs: [
      { q: "Why doesn't the pendulum's mass affect its period?", a: "Just as with free fall, a heavier bob experiences proportionally more gravitational force but also more inertia resisting acceleration — the two effects cancel, leaving period dependent only on length and gravity." },
      { q: "How is this used in real clock design?", a: "Pendulum clocks rely on this length-gravity relationship for consistent timekeeping — historically, clockmakers would fine-tune the pendulum's effective length to correct a clock running fast or slow." },
      { q: "What happens to a pendulum's period on the Moon?", a: "Lower gravity means a longer period for the same length — a pendulum clock accurate on Earth would run measurably slow if simply transported to the Moon without recalibration." },
      { q: "How does swing angle affect accuracy if it's not exactly small?", a: "Larger swing angles introduce a period slightly longer than this small-angle formula predicts, growing more significant as the angle increases well beyond about 20°." },
    ],
    related: ["wave-frequency-calculator", "free-fall-calculator", "optics-calculator", "escape-velocity-calculator", "half-life-calculator"],
  },

  "density-calculator": {
    intro:
      "Density is mass packed into a given volume — the single number that tells you whether something floats or sinks in a given fluid, and a quick way to identify an unknown material.",
    method: ["ρ = m ÷ V, giving density in g/cm³ when mass is in grams and volume is in cm³ (equivalent to kg/L, and convertible to kg/m³ by multiplying by 1,000)."],
    example: {
      title: "Worked example: 250 g object with 100 cm³ volume",
      lines: ["ρ = 250 ÷ 100 = 2.5 g/cm³.", "In kg/m³: 2.5 × 1,000 = 2,500 kg/m³ — denser than water (1,000 kg/m³), so this object would sink."],
    },
    mistakes: [
      { title: "Comparing densities in mismatched units", body: "g/cm³ and kg/m³ differ by a factor of 1,000, not 1 — comparing a value in one unit directly against a reference value in the other without converting first leads to a factor-of-1000 error in judging the comparison." },
      { title: "Assuming density alone determines whether something floats", body: "An object floats in a fluid if its overall density is less than the fluid's, but shape matters for how it floats (a steel ship floats despite steel being denser than water, because its overall shape displaces enough water to support its weight)." },
    ],
    faqs: [
      { q: "Why is water's density used as a common reference point (1,000 kg/m³ or 1 g/cm³)?", a: "It's a convenient, universally recognised benchmark — anything denser than water sinks in it, and anything less dense floats, making water density a natural comparison point for everyday materials." },
      { q: "Does density change with temperature?", a: "Yes, generally — most materials expand slightly (becoming less dense) as they warm and contract (becoming denser) as they cool, though water has a well-known unusual exception around 4°C." },
      { q: "How is density used to identify an unknown material?", a: "Every pure substance has a characteristic density under given conditions — measuring an unknown sample's mass and volume and comparing the resulting density to reference tables can help identify what it's made of." },
      { q: "What's the difference between density and specific gravity?", a: "Specific gravity is a substance's density divided by water's density (a unitless ratio) — a specific gravity of 2.5 means 2.5 times denser than water, which is the same information as this calculator's g/cm³ result since water is defined as 1 g/cm³." },
    ],
    related: ["pressure-at-depth-calculator", "energy-calculator", "molarity-calculator", "kinetic-energy-calculator", "steel-weight-calculator"],
  },

  "pressure-at-depth-calculator": {
    intro:
      "Pressure underwater (or under any fluid) increases steadily with depth, regardless of the container's shape or size — this is why ear pressure builds the same way whether you're diving in a pool or the ocean, at the same depth.",
    method: [
      "Gauge pressure (pressure due to the fluid alone) = fluid density × 9.81 × depth.",
      "Absolute pressure = gauge pressure + atmospheric pressure (101,325 Pa at sea level).",
    ],
    example: {
      title: "Worked example: 20 m deep in fresh water (density 1,000 kg/m³)",
      lines: [
        "Gauge pressure = 1,000 × 9.81 × 20 = 196,200 Pa = 196.2 kPa.",
        "Absolute pressure = (196,200 + 101,325) ÷ 1,000 = 297.525 kPa.",
        "In atmospheres (gauge): 196,200 ÷ 101,325 ≈ 1.94 atm — meaning pressure at 20 m is already nearly double what it is at the surface, from the water alone.",
      ],
    },
    mistakes: [
      { title: "Confusing gauge pressure with absolute pressure", body: "Gauge pressure is the extra pressure from the fluid alone (what a typical pressure gauge reads, zeroed at the surface); absolute pressure additionally includes atmospheric pressure pressing down from above. Diving and engineering contexts often need to be explicit about which one is meant." },
      { title: "Using seawater density where fresh water was intended, or vice versa", body: "Seawater is denser (roughly 1,025 kg/m³) than fresh water (1,000 kg/m³) — using the wrong value for the actual fluid slightly understates or overstates real pressure, which matters for precise diving or engineering calculations." },
    ],
    faqs: [
      { q: "Why does pressure increase with depth regardless of container shape?", a: "Pressure at a given depth depends only on the weight of fluid directly above that point, which is determined by depth and density alone — not on the total volume of fluid in a wider or narrower container." },
      { q: "How does this relate to scuba diving safety?", a: "Every 10 m of depth in seawater adds roughly 1 atmosphere of pressure — this rapid pressure increase is why divers must ascend slowly and manage air expansion carefully to avoid decompression sickness." },
      { q: "What's a typical value for atmospheric pressure at sea level?", a: "101,325 Pa (101.325 kPa), also known as 1 standard atmosphere — this is the baseline value this calculator adds to gauge pressure to get absolute pressure." },
      { q: "Does this formula apply to gases as well as liquids?", a: "The same principle applies, but gas density changes significantly with pressure and altitude in a way liquid density mostly doesn't over normal ranges, so atmospheric pressure calculations for gases need a more complex model than this simple linear relationship." },
    ],
    related: ["density-calculator", "force-calculator", "energy-calculator", "escape-velocity-calculator", "molarity-calculator"],
  },

  "work-done-calculator": {
    intro:
      "Work in physics has a precise meaning: force applied in the direction of motion, over a distance — push something sideways while it moves forward and you're doing less work than if you pushed directly along its path.",
    method: ["W = F × d × cos θ, where θ is the angle between the applied force direction and the direction of motion."],
    example: {
      title: "Worked example: 120 N pushed 5 m, force aligned with motion (0°)",
      lines: [
        "W = 120 × 5 × cos(0°) = 120 × 5 × 1 = 600 J.",
        "The same force and distance at a 60° angle instead gives 120 × 5 × cos(60°) = 120 × 5 × 0.5 = 300 J — exactly half, purely from the angle.",
      ],
    },
    mistakes: [
      { title: "Assuming work is just force times distance regardless of angle", body: "That's only true when force is applied exactly in the direction of motion (θ = 0°). At any other angle, only the component of force in the direction of motion contributes to work, which is what cos θ accounts for." },
      { title: "Forgetting that a force perpendicular to motion does zero work", body: "At exactly 90°, cos(90°) = 0, meaning that force contributes no work at all — this is why carrying a heavy bag while walking horizontally (force is vertical, motion is horizontal) technically involves zero physics-definition 'work' from the carrying force, even though it feels effortful." },
    ],
    faqs: [
      { q: "Why does carrying something horizontally feel like work but technically isn't?", a: "The muscular effort to support the weight against gravity involves internal biological energy use, but in the strict physics definition, work requires force in the direction of displacement — supporting weight while moving horizontally involves a vertical force and horizontal motion, which are perpendicular." },
      { q: "How is work related to energy?", a: "Work done on an object equals the energy transferred to or from it — this is the fundamental connection between force, motion, and energy change captured in the work-energy theorem." },
      { q: "What does negative work mean?", a: "When the angle exceeds 90° (force has a component opposing motion, like braking friction), cos θ becomes negative — negative work means energy is being removed from the object's motion rather than added." },
      { q: "Why is the result also shown in kWh?", a: "kWh is a more familiar large-scale energy unit (used for electricity billing) — showing the joule result converted to kWh helps put mechanical work into a more everyday-recognisable scale, even though the actual number is usually tiny in kWh terms." },
    ],
    related: ["kinetic-energy-calculator", "force-calculator", "potential-energy-calculator", "torque-calculator", "power-calculator"],
  },

  "centripetal-force-calculator": {
    intro:
      "Anything moving in a circle needs a constant inward force to keep curving rather than flying off in a straight line — this is that force, and it grows fast with speed since it depends on velocity squared.",
    method: [
      "F = mv² ÷ r, where r is the radius of the circular path.",
      "Centripetal acceleration = v² ÷ r, independent of mass.",
    ],
    example: {
      title: "Worked example: 1,200 kg car cornering at 15 m/s, 50 m radius",
      lines: [
        "F = 1,200 × 15² ÷ 50 = 1,200 × 225 ÷ 50 = 5,400 N.",
        "Acceleration = 15² ÷ 50 = 4.5 m/s² — nearly half of standard gravity, sideways.",
      ],
    },
    mistakes: [
      { title: "Assuming doubling speed doubles the required force", body: "Because velocity is squared, doubling cornering speed actually quadruples the centripetal force needed — this is a major reason why exceeding a curve's safe speed by even a modest margin dramatically increases the risk of losing grip." },
      { title: "Confusing centripetal force with 'centrifugal force'", body: "Centripetal force is the real inward force causing circular motion (like tyre friction on a curve); the outward 'centrifugal force' passengers feel is a perceived effect of inertia in a rotating reference frame, not a real force acting on the object." },
    ],
    faqs: [
      { q: "What provides the centripetal force for a car going around a curve?", a: "Friction between the tyres and the road — if the required centripetal force exceeds the maximum friction available (a wet or icy road, or too high a speed), the car skids outward rather than following the curve." },
      { q: "Why does a smaller radius require more force at the same speed?", a: "The formula has r in the denominator — a tighter curve at the same speed demands proportionally more centripetal force, which is why sharp turns feel more forceful than gentle ones at equal speed." },
      { q: "Is centripetal force a completely separate force from gravity or friction?", a: "No — centripetal force is a description of the net inward force required for circular motion, which in practice is provided by an existing force like friction, tension, or gravity, not a distinct new force of its own." },
      { q: "How does this relate to satellites orbiting a planet?", a: "For an orbiting satellite, gravity itself provides exactly the centripetal force needed to maintain its circular (or elliptical) path — no other explicit force is needed for a stable orbit." },
    ],
    related: ["force-calculator", "velocity-calculator", "acceleration-calculator", "escape-velocity-calculator", "momentum-calculator"],
  },

  "escape-velocity-calculator": {
    intro:
      "Escape velocity is the minimum speed needed to break free of a body's gravity entirely, without further propulsion — the number that made getting to the Moon meaningfully harder than getting to low Earth orbit.",
    method: ["v_escape = √(2Gm ÷ r), where G is the gravitational constant (6.674×10⁻¹¹), m is the body's mass, and r is its radius."],
    example: {
      title: "Worked example: Earth (mass 5.972×10²⁴ kg, radius 6,371,000 m)",
      lines: [
        "v = √(2 × 6.674×10⁻¹¹ × 5.972×10²⁴ ÷ 6,371,000).",
        "≈ √(1.253×10⁸) ≈ 11,190 m/s.",
        "In km/s: ≈ 11.19 km/s — the well-known figure for Earth's escape velocity.",
      ],
    },
    mistakes: [
      { title: "Assuming escape velocity depends on the escaping object's own mass", body: "The escaping object's mass cancels out of the derivation entirely — a feather and a spacecraft need the identical escape velocity from a given body, though obviously very different amounts of energy to reach it." },
      { title: "Confusing escape velocity with orbital velocity", body: "Escape velocity is the speed needed to leave a gravitational field entirely; orbital velocity (needed to maintain a stable circular orbit) is lower — for a given body, orbital velocity is escape velocity divided by √2." },
    ],
    faqs: [
      { q: "Why doesn't the escaping object's own mass matter?", a: "In the energy-conservation derivation, the object's mass appears on both sides of the equation (in its kinetic energy and in its gravitational potential energy) and cancels out — only the mass of the body being escaped from matters." },
      { q: "How does escape velocity relate to a black hole?", a: "A black hole's escape velocity at its event horizon equals the speed of light — since nothing can exceed that speed, nothing, including light, can escape from within that boundary." },
      { q: "Why is the Moon's escape velocity so much lower than Earth's?", a: "The Moon has both much less mass and a smaller radius than Earth, and since escape velocity depends on √(mass/radius), the combined effect makes lunar escape velocity roughly one-fifth of Earth's — about 2.4 km/s." },
      { q: "Does escape velocity depend on the direction of launch?", a: "The formula gives the minimum speed regardless of direction (assuming no atmosphere to fight through) — real launches account for atmospheric drag and often use Earth's rotation to reduce the effective speed needed." },
    ],
    related: ["centripetal-force-calculator", "free-fall-calculator", "potential-energy-calculator", "kinetic-energy-calculator", "pressure-at-depth-calculator"],
    post: {
      title: "Escape Velocity: Why Mass Doesn't Matter (But Direction Sort Of Does)",
      excerpt: "A feather and a rocket need exactly the same escape velocity from Earth — here's the counterintuitive reason why.",
      readTime: "4 min",
      body: [
        "Escape velocity is one of those physics results that feels wrong the first time you hear it: a paperclip and a fully loaded spacecraft need exactly the same speed, about 11.2 km/s, to escape Earth's gravity completely.",
        "The reason is that the formula comes from setting kinetic energy equal to gravitational potential energy and solving for the speed where an object has just enough energy to reach infinite distance with zero velocity remaining. The escaping object's own mass appears in both the kinetic energy term and the potential energy term, and cancels out algebraically.",
        "What differs enormously between a paperclip and a spacecraft isn't the required speed, but the energy needed to reach that speed — energy scales with mass, so a heavier object needs proportionally more fuel or force to accelerate up to the same 11.2 km/s.",
        "One subtlety worth knowing: real rocket launches don't usually aim straight for escape velocity from a standing start. Launching eastward takes advantage of Earth's own rotational speed (fastest near the equator), effectively giving a 'free' velocity boost and reducing the fuel needed compared to launching against that rotation.",
      ],
    },
  },

  "half-life-calculator": {
    intro:
      "Radioactive decay (and several other natural processes) shrink by half over a fixed time interval, repeatedly — never fully disappearing in a finite time, only ever getting closer to zero.",
    method: ["Remaining amount = initial amount × 0.5^(elapsed time ÷ half-life)."],
    example: {
      title: "Worked example: Carbon-14, half-life 5,730 years, 11,460 years elapsed",
      lines: [
        "Elapsed time ÷ half-life = 11,460 ÷ 5,730 = 2 half-lives exactly.",
        "Remaining = 100 × 0.5² = 100 × 0.25 = 25.",
        "So 25% of the original Carbon-14 remains after exactly two half-lives — this is the basis of radiocarbon dating." ,
      ],
    },
    mistakes: [
      { title: "Assuming the substance is completely gone after one half-life", body: "One half-life means half remains, not none — the amount keeps halving indefinitely (25% after two half-lives, 12.5% after three), approaching but never mathematically reaching exactly zero." },
      { title: "Treating half-life as a linear decay rate", body: "The decay is exponential, not linear — the substance doesn't lose the same fixed amount every year; it loses a fixed proportion of whatever remains, so the actual amount lost keeps shrinking over time even as the percentage rate stays constant." },
    ],
    faqs: [
      { q: "How is half-life used in radiocarbon dating?", a: "By measuring how much Carbon-14 remains in an organic sample relative to the amount expected when it was alive, and knowing Carbon-14's half-life (5,730 years), the elapsed time since the organism died can be calculated using this same formula rearranged for time." },
      { q: "Does half-life apply to anything besides radioactivity?", a: "Yes — the same exponential-decay mathematics describes drug elimination from the body (pharmacokinetics), certain chemical reaction rates, and even some population decline models, wherever a quantity decreases by a fixed proportion per fixed time interval." },
      { q: "Why can't a substance ever reach exactly zero using this model?", a: "Because each half-life only ever halves the remaining amount — mathematically, repeatedly multiplying by 0.5 approaches zero asymptotically but never reaches it exactly, though in practice a physically negligible amount remains after enough half-lives." },
      { q: "How would I find the half-life if I know the remaining fraction and elapsed time?", a: "Rearrange the formula: half-life = elapsed time × ln(0.5) ÷ ln(remaining fraction ÷ initial amount) — using natural logarithms to solve for the exponent." },
    ],
    related: ["optics-calculator", "wave-frequency-calculator", "pendulum-period-calculator", "molarity-calculator", "ph-calculator"],
  },
};
