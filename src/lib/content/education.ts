import type { ContentMap } from "./types";

/* Batch 10 — Education. Every worked example below is checked against the
   live compute() function for that slug in calculators.ts / calculators-extra.ts.
   gpa-calculator's companion blog post is this category's highest-impression
   page per Search Console data (126 impressions), so GPA gets deep treatment. */

export const educationContent: ContentMap = {
  "gpa-calculator": {
    intro:
      "GPA compresses an entire semester of different-sized courses into one number by weighting each grade by how many credits it was worth — a 4.0 in a 1-credit seminar shouldn't count the same as a 4.0 in a 4-credit core class, and this is exactly why credits matter as much as grades.",
    method: [
      "GPA = total grade points ÷ total credit hours, where 'total grade points' is the sum of (grade point value × credits) for every course.",
      "This weighting means a course worth more credits has proportionally more influence on the final GPA than a course worth fewer credits, even if both received the identical letter grade.",
    ],
    example: {
      title: "Worked example: 108 total grade points across 30 total credits",
      lines: [
        "GPA = 108 ÷ 30 = 3.6.",
        "This 108 figure itself would typically come from something like: a 4-credit course at a 4.0 grade point (16 points) plus a 3-credit course at 3.5 (10.5 points) plus other courses, all summed together before dividing by total credits.",
      ],
    },
    mistakes: [
      { title: "Averaging letter grades directly instead of weighting by credits", body: "A 4.0 in a 1-credit course and a 2.0 in a 4-credit course don't average to 3.0 in a properly weighted GPA — the 4-credit course's lower grade pulls the true GPA down much closer to 2.0, because it carries four times the weight of grade points." },
      { title: "Mixing up 'total grade points' with 'total credits' when entering values", body: "Grade points already reflect the credit-weighting from each course (grade value × that course's credits, summed) — entering the wrong figure in either field, or entering an already-averaged GPA where raw grade points are expected, throws off the whole calculation." },
    ],
    faqs: [
      { q: "Why does a higher-credit course affect GPA more than a lower-credit one?", a: "Because GPA is a weighted average where credits are the weights — a 4-credit course contributes four times as many grade points to the total (for the same letter grade) as a 1-credit course does, so it has proportionally more pull on the final number." },
      { q: "How do I convert a letter grade to grade points?", a: "Most institutions use a standard scale (commonly A=4.0, B=3.0, C=2.0, D=1.0, F=0), though the exact scale, and whether pluses/minuses adjust it slightly, varies by institution — check your specific school's official grading scale for precision." },
      { q: "Is GPA the same as percentage?", a: "No — GPA is a points-based scale (typically 0-4.0) while percentage is 0-100. They're related through an institution's specific grading scale, but aren't directly interchangeable without knowing that scale." },
      { q: "How is GPA different from CGPA?", a: "GPA typically refers to a single term or semester's average; CGPA (cumulative GPA) averages across multiple semesters or the entire academic history to date." },
    ],
    related: ["cgpa-calculator", "weighted-grade-calculator", "percentage-to-cgpa-calculator", "grade-calculator", "class-percentile-calculator"],
    post: {
      title: "Why Credit Hours Matter More Than People Realize for GPA",
      excerpt: "A 4.0 and a 2.0 don't average to 3.0 once credit weighting enters the picture — here's the math that trips students up most.",
      readTime: "4 min",
      body: [
        "It's a natural first instinct: got a 4.0 in one class and a 2.0 in another, so the average must be 3.0, right? That's true only if both classes carry the same number of credits — and in most real semesters, they don't.",
        "GPA is a weighted average, not a plain one. Each course's grade points are multiplied by its credit hours before anything is summed, meaning a heavier course pulls the overall average toward its own grade more strongly than a lighter one does.",
        "This has a genuinely practical consequence: a student weighing whether to take a hard 4-credit course or an easier 1-credit elective should recognize that the 4-credit course's outcome will move their GPA roughly four times as much as the elective's outcome will, in either direction.",
        "It also explains why retaking a failed high-credit course (where many institutions allow the new grade to replace or partially replace the old one in GPA calculations) can move a cumulative GPA more dramatically than students often expect — the credit weighting works in the recovery direction just as strongly as it worked against them the first time.",
      ],
    },
  },

  "cgpa-calculator": {
    intro:
      "Cumulative GPA averages every semester's own GPA together into one long-run figure — and because many countries also report grades on a 10-point CGPA scale rather than the 4.0 scale, this includes a rough percentage conversion too.",
    method: [
      "CGPA = sum of all semester GPAs ÷ number of semesters.",
      "Approximate percentage = CGPA × 9.5, a commonly used conversion factor in 10-point grading systems (particularly in India), though it's an approximation, not a universal standard.",
    ],
    example: {
      title: "Worked example: semester GPAs summing to 34.2 across 4 semesters",
      lines: [
        "CGPA = 34.2 ÷ 4 = 8.55.",
        "Approximate percentage = 8.55 × 9.5 ≈ 81.2%.",
      ],
    },
    mistakes: [
      { title: "Averaging semesters with very different credit loads as if they were equal", body: "This calculation treats each semester's GPA equally regardless of how many credits that semester actually carried — a semester with unusually few or many credits compared to others technically deserves a more nuanced, credit-weighted cumulative calculation for full precision." },
      { title: "Assuming the ×9.5 percentage conversion is universal", body: "This specific conversion factor is a common convention in certain 10-point grading systems, but not every institution or country uses the same formula — always check your specific institution's official conversion method for anything with real stakes, like an application requiring a percentage figure." },
    ],
    faqs: [
      { q: "Why is CGPA sometimes reported on a 10-point scale rather than 4.0?", a: "Different countries and institutions use different grading conventions — a 10-point scale is common in several education systems, particularly in South Asia, while the 4.0 scale is standard in much of North America." },
      { q: "Is the ×9.5 conversion to percentage exact?", a: "It's a widely used approximation for 10-point scales, not a precise mathematical law — institutions sometimes specify their own official conversion, which can differ slightly, so it's worth confirming for anything formal like a transcript or application." },
      { q: "How is CGPA different from calculating GPA fresh across all courses ever taken?", a: "Averaging semester GPAs (as this tool does) is a simpler approximation; a fully precise cumulative GPA would instead sum every individual course's grade points and credits across the entire academic history and divide by total credits — the two can differ slightly if semester credit loads varied." },
      { q: "Does a low CGPA in an early semester permanently limit the final result?", a: "Its influence shrinks as more semesters are added to the average — a rough early semester weighs less on the overall CGPA the longer and more consistently strong the remaining semesters are." },
    ],
    related: ["gpa-calculator", "percentage-to-cgpa-calculator", "weighted-grade-calculator", "class-percentile-calculator", "grade-calculator"],
  },

  "percentage-calculator": {
    intro:
      "What percent one number is of another — the single most universally useful academic calculation, whether it's a test score, an assignment grade, or comparing two different-sized assessments on the same scale.",
    method: ["Percentage = (value ÷ total) × 100."],
    example: {
      title: "Worked example: 450 out of 500",
      lines: ["(450 ÷ 500) × 100 = 0.9 × 100 = 90%."],
    },
    mistakes: [
      { title: "Swapping which number is the value and which is the total", body: "450 out of 500 (90%) is very different from 500 out of 450 (over 111%) — always confirm which number represents the part and which represents the whole before dividing." },
      { title: "Forgetting that a percentage above 100% is sometimes legitimate", body: "If 'value' can genuinely exceed 'total' in context (like bonus marks pushing a score past the maximum), a result over 100% isn't necessarily an error — it depends entirely on what the two numbers represent." },
    ],
    faqs: [
      { q: "How do I find what number is 20% of 150, rather than what percent one number is of another?", a: "That's a different, related calculation: 20% of 150 = 0.20 × 150 = 30 — multiplying the total by the percentage as a decimal, rather than dividing two known numbers." },
      { q: "Why does multiplying by 100 convert a decimal ratio to a percentage?", a: "'Percent' literally means 'per hundred' — multiplying a decimal fraction (like 0.9) by 100 expresses that same proportion in terms of parts per hundred (90), which is what a percentage represents by definition." },
      { q: "Can this calculate the reverse — finding the total if I know the value and the percentage?", a: "Rearranged, total = value ÷ (percentage ÷ 100) — for example, if 90 is 60% of some total, that total = 90 ÷ 0.6 = 150." },
      { q: "How is this different from the Percent Change Calculator?", a: "This finds what percent one number is of another (a static ratio); Percent Change specifically measures the percentage increase or decrease between an original and a new value over time." },
    ],
    related: ["marks-calculator", "grade-calculator", "percentage-to-cgpa-calculator", "percent-change-calculator", "gpa-calculator"],
  },

  "grade-calculator": {
    intro:
      "Most courses combine an already-completed portion of the grade with a final exam still to come — this blends the two together using the course's own weighting to project the final overall percentage.",
    method: [
      "Completed portion's contribution = current score × (weight already completed ÷ 100).",
      "Remaining portion's contribution = expected final exam score × ((100 − weight completed) ÷ 100).",
      "Final projected grade = completed contribution + remaining contribution.",
    ],
    example: {
      title: "Worked example: 78% current score, 70% of the grade already completed, expecting 85% on the final",
      lines: [
        "Completed contribution = 78 × 70 ÷ 100 = 54.6.",
        "Remaining contribution (30% of the grade, expecting 85%) = 85 × 30 ÷ 100 = 25.5.",
        "Final projected grade = 54.6 + 25.5 = 80.1%.",
      ],
    },
    mistakes: [
      { title: "Confusing 'weight completed' with a raw percentage of the total course score", body: "Weight completed refers to how much of the grade's total weighting has already been determined (e.g. assignments and midterms worth 70% of the final grade combined), not the score received on those components — those are two separate numbers this calculator needs distinctly." },
      { title: "Assuming the current score already reflects the whole course rather than just the completed portion", body: "The 'current score' entered should represent performance on just the completed weighted components specifically, not a blended guess at the whole course — mixing this up double-counts or under-counts part of the calculation." },
    ],
    faqs: [
      { q: "How is 'weight completed' different from 'current score'?", a: "Current score is how well you've done (a percentage) on the parts of the course already graded; weight completed is what fraction of the total course grade those parts represent — a student could have a high current score but a low weight-completed figure if most of the course grade is still ahead." },
      { q: "What does it mean if the projected final grade seems impossible to achieve?", a: "If even a 100% on the remaining weighted portion wouldn't be enough to reach a desired target, that specific target isn't mathematically achievable given the current standing — this is exactly what the Final Exam Mark Calculator is built to check directly." },
      { q: "Can I use this partway through a course to see if I'm on track?", a: "Yes — entering your actual current performance and a realistic (rather than best-case) expected final score gives a genuinely useful projection of where the course grade is heading." },
      { q: "How is this different from the Weighted Grade Calculator?", a: "This tool specifically splits a course into 'already completed' and 'still to come' portions; the Weighted Grade Calculator combines any list of individual assignment scores and weights directly, without that completed/remaining split." },
    ],
    related: ["final-exam-mark-calculator", "weighted-grade-calculator", "marks-calculator", "percentage-calculator", "gpa-calculator"],
  },

  "marks-calculator": {
    intro:
      "Marks obtained out of a maximum, converted straight into a percentage and an approximate letter grade — the quick check after any test or assignment before the official grade comes back.",
    method: [
      "Percentage = (marks obtained ÷ maximum marks) × 100.",
      "Grade band: 90%+ is A+, 80-89% is A, 70-79% is B, 60-69% is C, 50-59% is D, below 50% is F, using this calculator's specific fixed thresholds.",
    ],
    example: {
      title: "Worked example: 432 out of 500",
      lines: [
        "Percentage = (432 ÷ 500) × 100 = 86.4%.",
        "86.4% falls in the 80-89% band, so the grade shown is A.",
      ],
    },
    mistakes: [
      { title: "Assuming this calculator's letter-grade bands match your specific institution's grading scale", body: "Grading scales genuinely vary between schools, countries and courses — this tool's A+/A/B/C/D/F bands are a common reference pattern, but should be checked against the specific institution's official scale for anything with real academic consequences." },
      { title: "Entering marks obtained higher than maximum marks", body: "If bonus marks genuinely push obtained marks above the stated maximum, the resulting percentage over 100% is mathematically consistent with that input, but worth double-checking that 'maximum marks' was entered correctly for the specific assessment." },
    ],
    faqs: [
      { q: "Why might my actual grade differ from what this calculator shows?", a: "This tool uses one fixed generic grading scale — your institution's actual scale for grade boundaries (what percentage counts as an A versus a B, for instance) may set the cutoffs at different percentages than the ones used here." },
      { q: "How is this different from the Percentage Calculator?", a: "The core percentage math is identical; this tool additionally maps that percentage onto a letter grade using its built-in scale, which the plain Percentage Calculator doesn't attempt." },
      { q: "Can this be used for any test, or only specific exam formats?", a: "It works for any assessment expressed as marks obtained out of a stated maximum — quizzes, exams, assignments, or any other marks-based scoring system." },
      { q: "What should I do if my percentage falls right at a grade boundary, like exactly 80%?", a: "This calculator's bands are inclusive at the lower bound shown (80% and above falls in the A band here) — but always verify against the specific institution's own stated boundary rules, since some use strictly-greater-than cutoffs instead." },
    ],
    related: ["percentage-calculator", "grade-calculator", "gpa-calculator", "class-percentile-calculator", "weighted-grade-calculator"],
  },

  "attendance-calculator": {
    intro:
      "Current attendance percentage is only half the story — this also works out exactly how many classes in a row you'd need to attend to climb back up to a required target, which is the number that actually matters when attendance is close to a cutoff.",
    method: [
      "Current attendance % = (classes attended ÷ total classes) × 100.",
      "Classes needed to reach a target % = (target% × total classes − 100 × classes attended) ÷ (100 − target%), assuming every future class from here on is attended.",
    ],
    example: {
      title: "Worked example: 62 attended out of 80 total, targeting 75%",
      lines: [
        "Current attendance = 62 ÷ 80 × 100 = 77.5%, already above the 75% target in this specific case.",
        "If instead only 55 of 80 had been attended (68.75%, below target), the classes-needed formula would calculate exactly how many additional classes attended in a row would be needed to climb back to 75%.",
      ],
    },
    mistakes: [
      { title: "Assuming 'classes needed' means classes total, not classes still to attend consecutively", body: "The result specifically represents how many additional classes (attended without missing any) are needed from this point forward — it assumes perfect attendance from here on, not a mix of some more misses along the way." },
      { title: "Not accounting for the total number of remaining classes in the term", body: "This calculation shows the number of classes needed to reach a target mathematically, but doesn't check whether that many classes actually remain in the term — if fewer classes are left than the number needed, the target isn't reachable regardless of attendance from here on." },
    ],
    faqs: [
      { q: "Why does attendance often have a required minimum percentage at all?", a: "Many institutions set attendance minimums as an eligibility requirement for exams or course credit, treating regular attendance as a proxy for engagement with the course material." },
      { q: "What if the target seems unreachable given how few classes remain?", a: "If the calculated 'classes needed' figure exceeds the actual number of classes left in the term, the target percentage genuinely can't be reached this term through attendance alone — that's a real constraint worth flagging early with an instructor or advisor if attendance requirements have serious consequences." },
      { q: "Does missing just one more class significantly hurt attendance percentage?", a: "The impact depends heavily on how many total classes there are — missing one class out of 15 total moves the percentage far more than missing one out of 80, since each class represents a larger share of the smaller total." },
      { q: "How is this useful beyond just checking a single number?", a: "The 'classes needed' figure turns an abstract shortfall into a concrete, actionable plan — rather than just knowing you're 'below target', you know exactly how many consecutive classes need attending to fix it." },
    ],
    related: ["class-percentile-calculator", "study-time-calculator", "gpa-calculator", "working-days-calculator", "percentage-calculator"],
  },

  "study-time-calculator": {
    intro:
      "Turning a syllabus into a daily study schedule just needs three numbers — how much material is left, how long each piece realistically takes, and how many days remain — multiplied out into a concrete daily target.",
    method: [
      "Total study hours required = topics remaining × hours per topic.",
      "Daily study hours needed = total study hours ÷ days left.",
    ],
    example: {
      title: "Worked example: 40 topics remaining, 1.5 hours per topic, 20 days left",
      lines: [
        "Total hours required = 40 × 1.5 = 60 hours.",
        "Daily hours needed = 60 ÷ 20 = 3 hours/day.",
      ],
    },
    mistakes: [
      { title: "Underestimating hours per topic based on how long the easiest topics take", body: "If 'hours per topic' is based on the fastest or easiest topics rather than a realistic average across all remaining material, the resulting daily target will be optimistic and likely to slip as harder topics take longer than budgeted." },
      { title: "Not building in rest days or buffer time", body: "This calculation assumes every single day until the deadline is used for study — in practice, building in a few buffer days (by using a slightly smaller 'days left' figure than the actual full count) makes the schedule more resilient to a missed day here or there." },
    ],
    faqs: [
      { q: "How should I estimate 'hours per topic' if topics vary a lot in difficulty?", a: "Use a genuinely realistic average across the whole remaining syllabus, weighting mentally toward the harder topics rather than the easiest ones — an optimistic average that assumes every topic is quick tends to produce an unrealistic daily target." },
      { q: "What if the daily hours needed comes out higher than realistically possible?", a: "That's valuable information early rather than late — it signals either the timeline needs adjusting (starting sooner, or reducing scope) or some topics may need to be deprioritized rather than covered in full depth." },
      { q: "Should I include revision/review time in 'hours per topic', or add it separately?", a: "Either approach works as long as it's consistent — building revision into the per-topic estimate is simpler, while adding a separate revision phase at the end gives more visibility into how much time is allocated to first-pass learning versus review." },
      { q: "How does this compare to something like the Pomodoro Study Planner?", a: "This tool answers 'how many hours per day, overall'; the Pomodoro Planner takes a total study-hours figure (which could come from this calculator) and breaks it into structured focus/break blocks for actually executing a single study session." },
    ],
    related: ["pomodoro-planner", "attendance-calculator", "reading-time-calculator", "typing-speed-calculator", "grade-calculator"],
  },

  "percentage-to-cgpa-calculator": {
    intro:
      "Converting a marks percentage into a 10-point CGPA figure using the same standard divisor many institutions apply — useful for translating a percentage-based transcript into the CGPA format some applications or systems expect.",
    method: ["CGPA = percentage ÷ 9.5, a widely used standard conversion in certain 10-point grading systems."],
    example: {
      title: "Worked example: 82% converted to CGPA",
      lines: ["CGPA = 82 ÷ 9.5 ≈ 8.63."],
    },
    mistakes: [
      { title: "Assuming ÷9.5 is a universal, officially mandated conversion everywhere", body: "This specific divisor is a widely referenced convention, particularly associated with certain education boards, but it isn't a universal global standard — some institutions specify their own distinct conversion formula, which should be checked directly for anything requiring an officially accepted figure." },
      { title: "Using this conversion for an already-weighted CGPA rather than a raw percentage", body: "This formula is meant to convert a marks percentage into an approximate CGPA — running an already-calculated CGPA back through this formula (rather than the reverse ×9.5 direction) would produce a meaningless result." },
    ],
    faqs: [
      { q: "Where does the 9.5 conversion factor come from?", a: "It's derived from certain grading scale conventions where a 10-point CGPA scale is designed to roughly correspond to marks percentages under specific assumptions about the underlying grade distribution — it's a widely used approximation rather than a universal mathematical law." },
      { q: "Is there a reverse calculation, going from CGPA back to percentage?", a: "Yes — multiplying CGPA by 9.5 gives the reverse conversion, which is exactly the approximate-percentage detail shown by the CGPA Calculator." },
      { q: "Why would I need to convert percentage to CGPA at all?", a: "Certain applications, scholarships, or further-study programs specifically request a CGPA figure — if your transcript is percentage-based, a standard conversion provides an approximate equivalent for that purpose." },
      { q: "Should I trust this conversion for an official application, or verify separately?", a: "For anything with real stakes (a formal application, an official transcript conversion), it's worth confirming the specific conversion method your target institution or organisation expects, since conventions do vary." },
    ],
    related: ["cgpa-calculator", "gpa-calculator", "percentage-calculator", "marks-calculator", "grade-calculator"],
  },

  "final-exam-mark-calculator": {
    intro:
      "Rather than guessing what score you'll get and seeing where that lands you, this works backward from a target grade to tell you exactly what you need on the final exam — including flagging clearly when that target simply isn't achievable anymore.",
    method: [
      "Required final exam score = (target grade − current grade × (1 − exam weight)) ÷ exam weight, where exam weight is expressed as a decimal (e.g. 40% becomes 0.4).",
      "If the required score exceeds 100%, the target isn't achievable through the final exam alone given the current standing and that exam's weighting.",
    ],
    example: {
      title: "Worked example: current grade 74%, final exam worth 40% of the total, targeting 80% overall",
      lines: [
        "Weight as decimal: 0.4.",
        "Required = (80 − 74 × (1−0.4)) ÷ 0.4 = (80 − 74×0.6) ÷ 0.4 = (80 − 44.4) ÷ 0.4 = 35.6 ÷ 0.4 = 89%.",
        "So an 89% on the final exam would bring the overall course grade to exactly 80%.",
      ],
    },
    mistakes: [
      { title: "Assuming a required score over 100% means a calculation error", body: "It genuinely means the target grade is not achievable through the final exam alone, given the current grade and the exam's specific weighting — this is useful, actionable information rather than a bug, and signals it's time to either adjust the target or find other ways to improve the grade." },
      { title: "Using the wrong exam weight value", body: "The exam weight needs to reflect exactly what fraction of the total course grade the final exam determines — using an incorrect weight (confusing it with, say, the exam's own point value rather than its course-wide weighting) produces a meaningless required score." },
    ],
    faqs: [
      { q: "What does it mean if the required score comes out negative?", a: "It means the target grade is already guaranteed regardless of final exam performance, given how well the completed portion of the course has already gone — even a 0% on the final wouldn't bring the overall grade below the target in that case." },
      { q: "How is this different from the Grade Calculator?", a: "The Grade Calculator projects a final grade forward from an assumed final exam score; this tool works backward from a specific target grade to find exactly what score is needed to hit it." },
      { q: "Why does exam weight matter so much to the required score?", a: "A higher-weighted final exam gives more room to move the overall grade in either direction — the same target grade requires a very different final exam score depending on whether that exam is worth 20% or 60% of the total course grade." },
      { q: "What should I do if the target isn't achievable?", a: "Recognizing this early (rather than after the exam) allows for a realistic conversation with an instructor about options, a revised personal target, or a focused effort on any other remaining assessable components of the course if any exist." },
    ],
    related: ["grade-calculator", "weighted-grade-calculator", "gpa-calculator", "percentage-calculator", "attendance-calculator"],
  },

  "reading-time-calculator": {
    intro:
      "How long a piece of text actually takes to read depends on word count and reading speed — this gives both a silent-reading estimate and a read-aloud estimate, since speaking a text takes noticeably longer than reading it silently.",
    method: [
      "Silent reading time (minutes) = word count ÷ reading speed (words per minute).",
      "Read-aloud time is estimated at roughly 1.6× the silent reading time, reflecting that speaking is generally slower than silent reading.",
    ],
    example: {
      title: "Worked example: 1,200 words at 230 wpm",
      lines: [
        "Silent reading time = 1,200 ÷ 230 ≈ 5.2 minutes.",
        "Read-aloud estimate = 5.2 × 1.6 ≈ 8.3 minutes.",
      ],
    },
    mistakes: [
      { title: "Using a generic reading speed rather than a personal or context-specific one", body: "230 wpm (the default here) is a reasonable average adult silent-reading speed, but actual speed varies significantly by individual, by text difficulty, and by familiarity with the subject matter — a technical or unfamiliar text is read more slowly than easy, familiar prose." },
      { title: "Applying the read-aloud multiplier to already-spoken content, like transcribed speech", body: "The 1.6× read-aloud estimate is meant for converting a silent-reading estimate into a spoken-delivery estimate for written text — it isn't meaningful to apply to text that's already a transcript of speech, since that has its own natural pacing already." },
    ],
    faqs: [
      { q: "Why is speaking a text slower than reading it silently?", a: "Speech has a natural pacing constrained by articulation, breathing, and clarity, all of which cap how fast someone can speak intelligibly — silent reading isn't bound by those physical speech constraints, so it's typically faster." },
      { q: "How accurate is a 230 wpm reading speed assumption?", a: "It's a commonly cited average, but individual reading speeds vary widely (some readers are notably faster or slower) — adjusting the wpm input to a personally measured reading speed gives a more accurate estimate for that specific individual." },
      { q: "Does text difficulty affect the estimate this calculator gives?", a: "Not directly — it applies one flat reading speed regardless of content complexity. A denser or more technical text is typically read more slowly in practice than this calculation would suggest if the wpm figure used reflects easy general reading." },
      { q: "How is this useful for presentations or speeches specifically?", a: "The read-aloud estimate gives a starting point for how long a written speech or script will actually take to deliver, which is directly useful for staying within a time limit — though actual delivery speed varies by speaker and pacing style." },
    ],
    related: ["typing-speed-calculator", "word-count-calculator", "study-time-calculator", "pomodoro-planner", "screen-time-calculator"],
  },

  "word-count-calculator": {
    intro:
      "Words, characters and sentences, all counted directly from pasted text — the quick check against an assignment's minimum or maximum length requirement before submitting.",
    method: [
      "Word count = the text split on whitespace, counting each resulting non-empty chunk as one word.",
      "Sentence count = the number of sentence-ending punctuation groups (periods, question marks, exclamation marks) found in the text.",
    ],
    example: {
      title: "Worked example: a short sample sentence",
      lines: [
        "'Paste your text here to count the words.' splits into 8 words by whitespace.",
        "It contains 1 sentence-ending punctuation group (the final period), so sentence count = 1.",
        "Character count is the full length of the string, including spaces and punctuation.",
      ],
    },
    mistakes: [
      { title: "Assuming word count matches exactly how a specific word processor counts words", body: "Different tools sometimes handle edge cases (hyphenated words, numbers, contractions) slightly differently in their word-counting logic — for an assignment with a strict word-count requirement enforced by a specific platform, that platform's own count is the authoritative one to check against." },
      { title: "Expecting sentence count to catch every grammatically correct sentence perfectly", body: "This counts punctuation patterns (groups of periods, question marks, exclamation marks) rather than performing genuine grammatical sentence parsing — abbreviations with periods, ellipses, or unconventional punctuation can shift the count slightly from a strict grammatical sentence tally." },
    ],
    faqs: [
      { q: "Does this count count numbers and symbols as words?", a: "Any whitespace-separated chunk of characters counts as one word by this method, including standalone numbers or symbols — it doesn't distinguish grammatically between actual words and other character sequences separated by spaces." },
      { q: "Why might character count matter separately from word count?", a: "Some platforms and forms (social media character limits, certain form fields) constrain by character count rather than word count, so both figures serve different practical purposes depending on the specific requirement being checked against." },
      { q: "How is average words-per-sentence useful?", a: "Dividing word count by sentence count gives a rough readability signal — very long average sentence length can indicate a piece that might benefit from being broken into shorter, clearer sentences." },
      { q: "Can this handle very long documents?", a: "Yes, in principle — the counting logic works the same regardless of text length, though pasting an extremely long document may be limited by the input field's own practical size constraints." },
    ],
    related: ["reading-time-calculator", "typing-speed-calculator", "lorem-ipsum-generator", "text-case-converter", "study-time-calculator"],
  },

  "typing-speed-calculator": {
    intro:
      "Raw words-per-minute alone doesn't reflect real typing skill — a fast typist who makes lots of mistakes may have a similar effective output to a slower, more accurate one, which is exactly why this adjusts for errors to give a net WPM figure.",
    method: [
      "Gross WPM = words typed ÷ minutes taken.",
      "Net WPM = gross WPM − (errors ÷ minutes taken), effectively subtracting an error penalty rate from the raw typing speed.",
    ],
    example: {
      title: "Worked example: 320 words typed in 5 minutes, with 8 errors",
      lines: [
        "Gross WPM = 320 ÷ 5 = 64 WPM.",
        "Error penalty rate = 8 ÷ 5 = 1.6 WPM.",
        "Net WPM = 64 − 1.6 = 62.4, rounding to 62 WPM net.",
      ],
    },
    mistakes: [
      { title: "Comparing gross WPM figures between two typists without accounting for accuracy", body: "A typist who types 70 gross WPM with 15 errors may have a lower net WPM than one who types 55 gross WPM with 2 errors — gross speed alone can be a misleading comparison without factoring in the error penalty." },
      { title: "Assuming 'errors' means the same thing across different typing tests", body: "Different typing tests define and count errors somewhat differently (character-level mistakes versus whole incorrect words, for instance) — comparing net WPM scores from two different testing tools may not be a perfectly apples-to-apples comparison." },
    ],
    faqs: [
      { q: "Why does the calculation subtract an error penalty rather than just reducing the word count directly?", a: "This specific formula treats errors as a rate-based penalty (errors per minute) subtracted from gross speed, which is one common convention among several possible ways different typing tests choose to penalise mistakes for a net score." },
      { q: "What's considered a 'good' typing speed?", a: "This varies by context, but many general references suggest an average typist reaches somewhere in the 35-45 WPM range, with 60+ WPM considered fast, and touch-typing professionals sometimes well beyond that." },
      { q: "How can I actually improve my net WPM, not just gross WPM?", a: "Focusing on accuracy alongside raw speed — since errors directly reduce net WPM in this formula, slowing down slightly to reduce mistakes can sometimes improve net WPM more than trying to type faster with more errors." },
      { q: "Does this account for backspacing and correcting mistakes during the test?", a: "This specific calculation only needs the final words-typed and errors counts at the end of the timed period — it doesn't separately track how much time was spent correcting mistakes along the way." },
    ],
    related: ["word-count-calculator", "reading-time-calculator", "study-time-calculator", "pomodoro-planner", "password-strength-calculator"],
  },

  "weighted-grade-calculator": {
    intro:
      "Any list of scores and their weights combines into one overall percentage — a general-purpose version of grade weighting that works for any number of assignments, not tied to a specific completed/remaining course structure.",
    method: [
      "Overall grade = Σ(score × weight) ÷ Σ(weights), for however many score/weight pairs are entered.",
      "Total weight is also shown, since weights should typically sum to 100% for a complete, sensible grading breakdown.",
    ],
    example: {
      title: "Worked example: scores 88, 72, 91 with weights 30, 30, 40",
      lines: [
        "Weighted sum = 88×30 + 72×30 + 91×40 = 2,640 + 2,160 + 3,640 = 8,440.",
        "Total weight = 30+30+40 = 100.",
        "Overall grade = 8,440 ÷ 100 = 84.4%.",
      ],
    },
    mistakes: [
      { title: "Entering weights that don't sum to 100%", body: "The calculator still computes a result even if weights sum to something other than 100 (like 90 or 110), but the 'total weight' detail specifically flags this — a genuine grading breakdown should typically account for the full 100% of the grade, so a mismatch is worth double-checking against the actual syllabus." },
      { title: "Mismatching the order of scores and weights lists", body: "The nth score in the list is paired with the nth weight — entering scores and weights in inconsistent order (say, scores sorted differently from how the weights were listed) pairs the wrong score with the wrong weight throughout the whole calculation." },
    ],
    faqs: [
      { q: "What happens if I enter more scores than weights, or vice versa?", a: "Any score without a matching weight entry is effectively treated as having zero weight in the total, which would understate its contribution — always keep the two lists the same length and in matching order." },
      { q: "How is this different from the Grade Calculator?", a: "The Grade Calculator is specifically structured around a 'completed portion plus expected final exam' scenario with just two components; this tool handles any number of arbitrary score/weight pairs directly, useful for a full breakdown of many assignments at once." },
      { q: "Can weights be entered as decimals instead of whole-number percentages?", a: "The formula works correctly either way, as long as all weights are entered consistently in the same units — mixing whole-number percentages with decimal fractions in the same list would give a wrong result." },
      { q: "Why check that weights total 100%?", a: "A grading scheme should generally account for the entire grade — if weights only sum to, say, 90%, that likely means either a component was missed or the actual weighting differs from what's assumed, worth reconciling against the official syllabus." },
    ],
    related: ["grade-calculator", "final-exam-mark-calculator", "gpa-calculator", "percentage-calculator", "marks-calculator"],
  },

  "class-percentile-calculator": {
    intro:
      "Rank alone doesn't convey much without knowing the class size — being 12th out of 15 is a very different standing than 12th out of 500, and percentile converts rank into a comparable, class-size-independent figure.",
    method: [
      "Percentile = ((total students − rank) ÷ total students) × 100, expressing what percentage of the class you're ranked ahead of.",
    ],
    example: {
      title: "Worked example: rank 12 out of 120 students",
      lines: [
        "Percentile = (120 − 12) ÷ 120 × 100 = 108 ÷ 120 × 100 = 90th percentile.",
        "This means the student is ranked ahead of 108 of their 120 classmates.",
      ],
    },
    mistakes: [
      { title: "Confusing percentile with percentage score", body: "A 90th percentile ranking says nothing directly about the actual test score or grade percentage — it's purely a relative-standing figure within a specific group, which could correspond to very different absolute scores depending on how the whole class performed." },
      { title: "Assuming percentile is comparable across different classes or cohorts", body: "A 90th percentile in one class isn't directly comparable to a 90th percentile in a different class unless both groups have similar overall performance distributions — percentile is relative to its own specific reference group only." },
    ],
    faqs: [
      { q: "What does being in the '90th percentile' actually mean?", a: "It means the person's rank places them ahead of 90% of the group they're being compared against — it says nothing on its own about their actual absolute score or grade." },
      { q: "Why might rank 1 (the top position) not show exactly 100th percentile with this formula?", a: "With rank 1 in a class of, say, 120, this formula gives (120−1)÷120×100 ≈ 99.2 — very close to but not exactly 100, since the formula measures 'percentage of others ranked below', and the very top rank is still technically ahead of everyone but itself." },
      { q: "How is percentile useful beyond just knowing your rank number?", a: "It normalises rank across different class or cohort sizes — a percentile figure allows a rough, meaningful comparison of relative standing even between groups of very different total sizes, which raw rank numbers alone can't provide." },
      { q: "Does a higher percentile always mean a meaningfully better absolute performance?", a: "Not necessarily — percentile reflects standing relative to a specific group's performance distribution, which could be uniformly strong, uniformly weak, or anything in between, independent of any individual's actual absolute score." },
    ],
    related: ["attendance-calculator", "gpa-calculator", "marks-calculator", "average-calculator", "median-mode-calculator"],
  },

  "pomodoro-planner": {
    intro:
      "The Pomodoro technique breaks study time into focused blocks separated by short breaks — this converts a total study session length into exactly how many full focus/break cycles fit, so the schedule is planned rather than guessed at mid-session.",
    method: [
      "One full cycle = focus block length + break length.",
      "Number of complete pomodoros = floor(total study minutes ÷ cycle length), rounding down since a partial cycle at the end doesn't count as a complete pomodoro.",
    ],
    example: {
      title: "Worked example: 3 hours of study, 25-minute focus blocks, 5-minute breaks",
      lines: [
        "Cycle length = 25 + 5 = 30 minutes.",
        "Total minutes available = 3 × 60 = 180 minutes.",
        "Complete pomodoros = floor(180 ÷ 30) = 6 pomodoros.",
        "That's 6 × 25 = 150 minutes focused, and 6 × 5 = 30 minutes on breaks.",
      ],
    },
    mistakes: [
      { title: "Assuming the total study hours entered translates directly into focused time", body: "Some of the total session time is spent on breaks by design — the actual focused work time is always somewhat less than the full session length, which is exactly why this calculator reports focused minutes and break minutes separately rather than assuming they're the same." },
      { title: "Choosing focus blocks that are unrealistically long for genuine sustained concentration", body: "The traditional Pomodoro length (25 minutes) is chosen specifically because it's a duration many people can sustain focused attention for — much longer focus blocks risk diminishing concentration quality well before the block ends, even if the schedule technically allows for it." },
    ],
    faqs: [
      { q: "Why does the traditional Pomodoro use 25-minute focus blocks specifically?", a: "It's the original duration proposed by the technique's creator, chosen as a length long enough for meaningful focused progress but short enough to sustain genuine concentration without excessive fatigue — though many people adapt the exact length to their own preference." },
      { q: "What happens to leftover time that doesn't fill a complete pomodoro cycle?", a: "This calculator only counts complete cycles — any partial time left over after the last full pomodoro isn't included in either the focused or break totals, since it wouldn't represent a properly completed cycle." },
      { q: "Should breaks always be the same length, or should some be longer?", a: "Many practical implementations of this technique use a longer break every 3-4 pomodoros in addition to the short breaks between each one — this calculator's simple version treats every break as the same length, which is a reasonable simplification for basic planning." },
      { q: "How does this help beyond just setting a timer manually?", a: "It converts an abstract total study-time goal into a concrete number of complete work/break cycles ahead of time, making the session feel more structured and giving a clear sense of progress as each pomodoro completes." },
    ],
    related: ["study-time-calculator", "typing-speed-calculator", "reading-time-calculator", "screen-time-calculator", "meeting-cost-calculator"],
  },
};
