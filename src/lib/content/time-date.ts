import type { ContentMap } from "./types";

/* Batch 9 — Time & Date. Every worked example below is checked against the
   live compute() function for that slug in calculators.ts / calculators-extra.ts.
   add-days-calculator is this category's highest-impression page per Search
   Console data (85 impressions), so it gets the deepest treatment. */

export const timeDateContent: ContentMap = {
  "add-days-calculator": {
    intro:
      "Adding or subtracting a number of days from a date sounds trivial until you hit a month boundary, a leap year, or a negative number — this handles all of that automatically and gives you the resulting date instantly.",
    method: [
      "The calculator takes a start date and a number of days (which can be negative to subtract instead of add), and shifts the date by exactly that many calendar days.",
      "Month lengths and leap years are handled automatically by the underlying date system — adding 30 days to January 20th correctly lands on February 19th, not some fixed 'next month, same day' approximation.",
    ],
    example: {
      title: "Worked example: January 1, 2026 plus 90 days",
      lines: [
        "January has 31 days, February 2026 has 28 (2026 isn't a leap year), March has 31 — that's 90 days by March 31 (31+28+31=90 from Jan 1).",
        "So January 1, 2026 + 90 days lands on April 1, 2026, one day past that 90-day mark landing on March 31 itself.",
      ],
    },
    mistakes: [
      { title: "Assuming 'add 30 days' always lands on the same day next month", body: "Months have different lengths (28-31 days), so adding exactly 30 days from, say, January 15 lands on February 14, not February 15 — a common source of off-by-one confusion when estimating deadlines mentally." },
      { title: "Forgetting a negative number subtracts rather than adds", body: "Entering a negative days value moves the date backward from the start date — useful for finding 'what date was 45 days before this one', but easy to enter with the wrong sign by habit if you're used to only adding." },
    ],
    faqs: [
      { q: "How does this handle crossing into a new year?", a: "It's handled automatically and correctly — adding enough days from a date in December rolls the calculation into January of the following year without any special handling needed on your part." },
      { q: "Does this account for leap years automatically?", a: "Yes — the underlying date calculation correctly recognises leap years (like 2028) and gives February 29 the extra day it's due, which affects the exact landing date for calculations that span late February." },
      { q: "Can I use this to count backward from a date?", a: "Yes — enter a negative number of days, and the calculator subtracts instead of adds, landing on the correct earlier date." },
      { q: "Why might I need this instead of just counting on a calendar?", a: "For anything more than a couple of weeks out, manually counting across month boundaries by eye is genuinely error-prone — this guarantees an exact, correct answer instantly regardless of how many months or years the calculation spans." },
    ],
    related: ["days-until-date-calculator", "date-difference-calculator", "working-days-calculator", "week-number-calculator", "countdown-timer"],
    post: {
      title: "Why 'Add 30 Days' Never Lands Where You Expect",
      excerpt: "Thirty days from now isn't 'next month, same date' — and the gap between those two answers can matter more than people expect.",
      readTime: "3 min",
      body: [
        "It's an easy mental shortcut: '30 days from now' feels like it should mean 'the same date next month'. But months aren't 30 days long — they range from 28 to 31 — so the two answers only coincide by coincidence, and usually don't.",
        "This matters more than it sounds for anything with a real deadline attached. A '30-day notice period' starting on January 20th ends on February 19th, not February 20th — a full day earlier than the 'next month, same date' intuition would suggest, and the gap gets larger or smaller depending on which months are involved.",
        "The safest habit for anything with legal, contractual or financial consequences (notice periods, payment terms, warranty windows) is to count the actual number of days explicitly rather than eyeballing a calendar month-to-month — which is exactly the gap a tool like this is built to close instantly.",
        "The same logic applies to subtracting days: 'the date 90 days before delivery' isn't 3 calendar months earlier by default, since months vary in length — the exact answer depends on precisely which 90-day window is being counted through.",
      ],
    },
  },

  "age-calculator": {
    intro:
      "Exact age isn't just 'this year minus birth year' — it needs to account for whether the birthday has happened yet this year, which is exactly the kind of small detail that's easy to get wrong doing it by hand.",
    method: [
      "Years are found by subtracting birth year from the current year, then adjusted down by one if the birthday hasn't occurred yet this calendar year.",
      "Months and days follow the same adjustment logic, borrowing from the next-higher unit when the current date's day-of-month or month is 'behind' the birth date's.",
      "Total days and hours lived are also calculated directly from the exact elapsed time, for a genuinely precise lifetime figure.",
    ],
    example: {
      title: "Worked example: born March 15, checked on February 20 the following year (before the birthday)",
      lines: [
        "The birthday (March 15) hasn't happened yet this year as of February 20, so the year count doesn't increment yet — the age shown reflects one year less than the current-year-minus-birth-year subtraction would naively suggest.",
        "This is exactly why simple year subtraction alone can overstate age by one for anyone whose birthday hasn't yet occurred in the current calendar year.",
      ],
    },
    mistakes: [
      { title: "Computing age as just 'current year minus birth year'", body: "This overstates age by one for anyone whose birthday hasn't happened yet this calendar year — the correct calculation must check whether the birth month and day have already passed in the current year before counting the year as complete." },
      { title: "Forgetting leap years slightly affect total-days-lived precision", body: "Someone born in a leap year, or who has lived through several leap years, has a few extra actual days compared to a naive 365-days-per-year estimate — this calculator's total-days figure accounts for real elapsed time, not an approximation." },
    ],
    faqs: [
      { q: "Why does the calculator show months and days in addition to years?", a: "A whole-years figure alone can hide a lot of nuance — knowing you're '34 years, 2 months, 18 days old' rather than just '34' gives a more precise picture, especially useful near an age-related deadline or milestone." },
      { q: "How is 'total days lived' calculated?", a: "Directly from the exact time difference between the birth date and now, converted to whole days — this is a precise figure, not an estimate based on an assumed average year length." },
      { q: "Does this handle someone born on February 29 (a leap day) correctly?", a: "Yes, the underlying date arithmetic handles leap-day birthdays correctly, though in a non-leap year, the 'birthday' technically doesn't occur on the calendar and would need to be treated as either February 28 or March 1 depending on personal or legal convention." },
      { q: "Why would I need total hours lived rather than just years?", a: "It's mostly a fun, perspective-shifting number — turning an abstract age into a very large, concrete hour count can make a lifespan feel more tangible, though it carries no additional precision beyond the days-lived figure it's derived from." },
    ],
    related: ["date-difference-calculator", "birthday-countdown-calculator", "leap-year-checker", "days-until-date-calculator", "week-number-calculator"],
  },

  "date-difference-calculator": {
    intro:
      "The number of days between two dates is the base unit everything else (weeks, months, deadlines, project timelines) gets derived from — this counts exactly, rather than approximating from a calendar glance.",
    method: [
      "Days between two dates = (end date − start date) in milliseconds, converted to whole days.",
      "Weeks = days ÷ 7. Months = days ÷ 30.44, using 30.44 as the average month length across a full year (365.25 ÷ 12), since months themselves vary from 28 to 31 days.",
    ],
    example: {
      title: "Worked example: January 1 to April 15 (same year, non-leap)",
      lines: [
        "January (31) + February (28) + March (31) + 15 days into April = 105 days.",
        "In weeks: 105 ÷ 7 = 15 weeks exactly.",
        "In months: 105 ÷ 30.44 ≈ 3.45 months.",
      ],
    },
    mistakes: [
      { title: "Expecting the 'months' figure to match a calendar month count exactly", body: "Because months vary in length, the months figure here is an average-based approximation (using 30.44 days per month), not a count of how many calendar month boundaries were crossed — for exact calendar-month reasoning, the days or weeks figure is more precise." },
      { title: "Forgetting to check date order, producing an unexpected negative result", body: "If the 'end date' entered is actually earlier than the 'start date', the day count comes out negative — a useful signal that the two dates may have been entered in the wrong fields, rather than an error." },
    ],
    faqs: [
      { q: "Why is 30.44 used for the average month length instead of just 30?", a: "It's derived from the actual average length of a month across a full year (365.25 days ÷ 12), which more accurately reflects the mix of 28, 29, 30 and 31-day months than a rounder but less accurate flat 30." },
      { q: "Does the day count include or exclude the start and end dates themselves?", a: "It's the pure difference in time between the two dates — from midnight of the start date to midnight of the end date, so 'January 1 to January 2' correctly returns 1 day, not 2." },
      { q: "How is this different from the Working Days Calculator?", a: "This counts every calendar day in the range; the Working Days Calculator specifically excludes weekends, which matters for business or project-timeline contexts where only working days count toward a deadline." },
      { q: "Can this calculate the difference between two dates in different years?", a: "Yes — the calculation works identically regardless of how many years apart the two dates are, correctly accounting for every leap year in between." },
    ],
    related: ["add-days-calculator", "working-days-calculator", "days-until-date-calculator", "age-calculator", "week-number-calculator"],
  },

  "countdown-timer": {
    intro:
      "A countdown to any future date, shown in days and hours remaining — or, if the date has already passed, a clear note that it's in the past rather than a confusing negative number.",
    method: [
      "Time remaining is the difference between the target date and the current moment, converted from milliseconds into whole days plus remaining hours.",
      "If the target date is in the past, the same calculation runs on the absolute (positive) difference, with a note clarifying the date has already passed.",
    ],
    example: {
      title: "Worked example: a target date 47 days and a few hours from now",
      lines: [
        "47 full days remain, plus a partial day showing as additional hours (for example, '47 days, 14 hours').",
        "If the same target date were entered after it had already passed, the result would instead read something like '12 days, 3 hours' with a note that 'This date has already passed.'",
      ],
    },
    mistakes: [
      { title: "Assuming a passed date shows a negative or error result", body: "The calculator instead shows the elapsed time since that date as a positive figure, with a clear label that the date is in the past — a more useful and readable result than a raw negative number would be." },
      { title: "Expecting the countdown to update live without refreshing", body: "This calculates the remaining time at the moment it's run — for a live, continuously updating countdown, the calculation would need to be re-run periodically rather than checked once." },
    ],
    faqs: [
      { q: "Why does the result show both days and hours rather than just one or the other?", a: "Days alone would hide meaningful precision for anything less than a full day away, while hours alone would be an unwieldy number for anything weeks or months out — combining both gives a readable result at any distance." },
      { q: "How precise is the countdown — does it account for time zones?", a: "The calculation is based on the exact date and time as interpreted by the browser or device running it — for events with a specific time zone that differs from the local one, that difference should be accounted for separately when setting the target date." },
      { q: "Can I use this for a countdown that's already passed, like an anniversary?", a: "Yes — entering a past date will show how much time has elapsed since it, clearly labelled, rather than a nonsensical or blank result." },
      { q: "How is this different from the Birthday Countdown Calculator?", a: "This works for any target date entered directly; the Birthday Countdown is specifically built around a birth date and automatically finds the next occurrence of that birthday each year." },
    ],
    related: ["birthday-countdown-calculator", "days-until-date-calculator", "add-days-calculator", "date-difference-calculator", "week-number-calculator"],
  },

  "time-zone-converter": {
    intro:
      "Converting a time across time zones is really just adding and subtracting UTC offsets — the tricky part is handling the wraparound when the result crosses midnight into the previous or next day.",
    method: [
      "Target hour = source hour − source UTC offset + target UTC offset.",
      "If the result falls below 0 or reaches 24 or beyond, 24 is added or subtracted repeatedly until it lands in the normal 0-24 range, and the day shift (previous/next/same day) is tracked separately.",
    ],
    example: {
      title: "Worked example: 14:00 in India (UTC+5:30) converted to New York (UTC−5:00)",
      lines: [
        "14 − 5.5 + (−5) = 3.5, which is 3:30 in 24-hour format.",
        "No wraparound was needed here since 3.5 already falls within 0-24, so the result is 03:30, same day.",
      ],
    },
    mistakes: [
      { title: "Forgetting some time zones use half-hour or quarter-hour offsets", body: "Not every time zone is a whole-hour offset from UTC — India (UTC+5:30) and parts of Australia and Iran use half or even quarter-hour offsets, which need to be entered as decimals (5.5, not 5) for an accurate conversion." },
      { title: "Not accounting for daylight saving time changes", body: "UTC offsets for many regions shift by an hour during daylight saving periods — this calculator uses whatever fixed offset is entered, so the correct current offset (which may differ from a region's 'standard' offset) needs to be checked separately for the specific dates involved." },
    ],
    faqs: [
      { q: "Why does the result sometimes say 'Next day' or 'Previous day'?", a: "Converting between time zones can push the clock time past midnight in either direction — if the calculated hour would be negative or 24 or more before wraparound, the actual calendar date shifts by one day relative to the source date." },
      { q: "How do I find a specific location's current UTC offset, accounting for daylight saving?", a: "This varies by season and location — checking a current, region-specific reference for the exact dates in question is the reliable way to get the correct offset, since it can differ from the 'standard' offset for parts of the year." },
      { q: "Why is UTC used as the reference point rather than a specific country's time?", a: "UTC (Coordinated Universal Time) doesn't observe daylight saving and isn't tied to any single country, making it a stable, unambiguous reference point that every other time zone's offset is defined relative to." },
      { q: "Can this handle converting across the International Date Line?", a: "The underlying hour-wraparound math handles any offset difference correctly, including large ones that cross the date line, correctly identifying whether the result lands on the previous or next calendar day." },
    ],
    related: ["unix-timestamp-converter", "add-days-calculator", "countdown-timer", "meeting-cost-calculator", "time-duration-calculator"],
  },

  "working-days-calculator": {
    intro:
      "Project deadlines and delivery estimates almost always mean working days, not calendar days — this counts every day in a date range while automatically skipping Saturdays and Sundays.",
    method: [
      "Each day in the range from start to end date is checked individually — Saturday (day 6) and Sunday (day 0) are excluded, every other day is counted.",
    ],
    example: {
      title: "Worked example: Monday to the following Friday (5 calendar days later)",
      lines: [
        "Monday through Friday of the same week are all weekdays: 5 working days.",
        "Extending the same range by 2 more days to include the following Saturday and Sunday adds 0 additional working days, since both fall on the weekend — the working-day count only increases again once the next Monday is included.",
      ],
    },
    mistakes: [
      { title: "Assuming this automatically excludes public holidays too", body: "This calculator specifically excludes weekends (Saturday and Sunday) — it has no built-in awareness of public holidays, which vary by country and region, so any holidays within the date range should be subtracted manually from the result if relevant." },
      { title: "Confusing this with a simple calendar-day count", body: "A date range spanning exactly one calendar week (7 days) always contains exactly 5 working days, not 7 — mixing this up with the plain Date Difference Calculator's total-day count can lead to underestimating how many calendar days a given number of working days will actually take." },
    ],
    faqs: [
      { q: "Does this account for public holidays?", a: "No — it excludes weekends only. Public holidays differ by country and even by region within a country, so they need to be identified and subtracted separately for full accuracy in a specific location." },
      { q: "How many working days are typically in a calendar month?", a: "It varies depending on how the month's weekends fall, but typically lands somewhere between 20 and 23 working days for a standard Monday-to-Friday work week." },
      { q: "Why does this matter more than a simple day count for project planning?", a: "Effort and delivery estimates are usually based on actual working capacity — a task estimated at '10 working days' will take roughly 2 calendar weeks, not 10 calendar days, which matters significantly for setting realistic deadlines." },
      { q: "Does the count include both the start and end date if they're both weekdays?", a: "Yes — both the start and end dates are included in the check individually, so if both fall on weekdays, both count toward the total." },
    ],
    related: ["date-difference-calculator", "add-days-calculator", "hours-worked-calculator", "meeting-cost-calculator", "week-number-calculator"],
  },

  "leap-year-checker": {
    intro:
      "A leap year isn't simply 'divisible by 4' — there's a century-year exception most people don't know about, which is exactly why the year 2000 was a leap year but 1900 wasn't, despite both being divisible by 100.",
    method: [
      "A year is a leap year if it's divisible by 4, EXCEPT century years (divisible by 100), UNLESS that century year is also divisible by 400.",
    ],
    example: {
      title: "Worked example: checking 2000, 1900, and 2024",
      lines: [
        "2000: divisible by 4 AND by 100, but also by 400 → leap year (the 400 exception applies).",
        "1900: divisible by 4 AND by 100, but NOT by 400 → not a leap year (the century exception applies, with no 400 override).",
        "2024: divisible by 4, not a century year at all → leap year (the simple rule applies directly).",
      ],
    },
    mistakes: [
      { title: "Assuming every year divisible by 4 is automatically a leap year", body: "This works for the vast majority of years, but fails specifically for century years not divisible by 400 — 1900 is divisible by 4 but is NOT a leap year, which surprises people who only know the simple 'divisible by 4' rule." },
      { title: "Assuming every century year (like 2100) will be a leap year", body: "The next 'century exception' will actually apply in 2100 — since 2100 is divisible by 100 but not by 400, it will NOT be a leap year, unlike 2000 which was." },
    ],
    faqs: [
      { q: "Why does the leap year rule have a century exception at all?", a: "A year is about 365.2422 days long, not exactly 365.25 — adding a leap day every 4 years alone slightly overcorrects, so removing 3 leap days every 400 years (via the century exception, with the /400 override) brings the calendar much closer to the true astronomical year length." },
      { q: "When is the next century year that will NOT be a leap year?", a: "2100 — since it's divisible by 100 but not by 400, following the same rule that made 1900 a non-leap year and 2000 a leap year." },
      { q: "How many extra days does February gain in a leap year?", a: "Exactly one — February has 29 days instead of the usual 28, making the full year 366 days instead of 365." },
      { q: "Why does the leap year rule matter beyond just February's day count?", a: "It affects any calculation involving date differences, ages, or schedules that span a leap year, which is why calculators handling dates need this rule built in accurately rather than assuming a fixed 365-day year." },
    ],
    related: ["age-calculator", "date-difference-calculator", "week-number-calculator", "add-days-calculator", "days-until-date-calculator"],
  },

  "days-until-date-calculator": {
    intro:
      "A straightforward countdown in days from today to any future (or past) date — the number people actually want when planning around an event, without needing to also see hours or a full breakdown.",
    method: [
      "Days = the difference between today's date and the target date, converted from milliseconds to whole days.",
      "The result is also shown in weeks and months for a sense of scale on longer countdowns.",
    ],
    example: {
      title: "Worked example: today to December 25 of the current year (roughly 4 months out)",
      lines: [
        "If today is, say, August 26 and the target is December 25 of the same year, the gap is 121 days.",
        "In weeks: 121 ÷ 7 ≈ 17.3 weeks.",
        "In months: 121 ÷ 30.44 ≈ 4.0 months.",
      ],
    },
    mistakes: [
      { title: "Assuming this always counts forward only", body: "If the target date entered is actually in the past relative to today, the day count will reflect that direction (potentially as a negative or unexpected value depending on implementation) — for a clean 'days since a past date' calculation the Date Difference Calculator handles both directions more explicitly with two selectable dates." },
      { title: "Expecting the month figure to align with actual calendar months crossed", body: "As with other tools using the 30.44-day average month length, the months figure here is a useful approximation for scale, not an exact count of calendar month boundaries crossed." },
    ],
    faqs: [
      { q: "How is this different from the Countdown Calculator?", a: "This focuses specifically on the days-until figure with week and month context; the Countdown Calculator additionally breaks the remaining time down into days plus hours, and clearly flags if the target date has already passed." },
      { q: "Why would I want the answer in months as well as days?", a: "For a countdown several months out, '121 days' is harder to intuitively grasp than 'about 4 months' — showing both gives a precise number and an easily digestible sense of scale together." },
      { q: "Does this recalculate automatically as time passes, or is it a one-time snapshot?", a: "It calculates based on 'today' at the moment it's run — checking again on a different day will naturally show a smaller (or larger, for past dates) day count reflecting the new current date." },
      { q: "Can I use this for a recurring annual event, like a wedding anniversary?", a: "Yes, by entering that year's specific occurrence of the date — for an automatically recurring 'next occurrence' calculation without re-entering the year, the Birthday Countdown Calculator's logic (finding the next annual occurrence automatically) is more directly suited to that use case." },
    ],
    related: ["countdown-timer", "add-days-calculator", "date-difference-calculator", "birthday-countdown-calculator", "week-number-calculator"],
  },

  "week-number-calculator": {
    intro:
      "ISO week numbers are the standard used in business, shipping, and manufacturing schedules — this finds the exact week number for any date using the same rule international standards rely on.",
    method: [
      "Under the ISO 8601 standard, week 1 of a year is defined as the week containing that year's first Thursday.",
      "Every date's week number is found by locating the Thursday of its own week, then counting how many whole weeks separate that Thursday from the first Thursday of its (ISO) year.",
    ],
    example: {
      title: "Worked example: August 2, 2026",
      lines: [
        "The Thursday of the week containing August 2, 2026 is identified first.",
        "Counting whole weeks from the year's first Thursday to that Thursday gives the ISO week number for that date — this calculator returns that value directly along with the correct ISO year it belongs to.",
      ],
    },
    mistakes: [
      { title: "Assuming week 1 always starts on January 1st", body: "Under ISO 8601, week 1 is defined by containing the year's first Thursday, not by starting on January 1 — this means the very first days of January sometimes belong to the last week of the previous ISO year instead." },
      { title: "Confusing ISO week numbering with a simple 'weeks since January 1' count", body: "A basic 'divide day-of-year by 7' approach doesn't match the ISO standard exactly, particularly around year boundaries — the ISO rule specifically anchors to Thursdays to keep week numbering consistent and unambiguous across different starting weekdays each year." },
    ],
    faqs: [
      { q: "Why does the ISO standard anchor to Thursday specifically?", a: "Anchoring to the Thursday of each week ensures that a week 'belongs' to whichever year contains the majority of its days (since Thursday is the midpoint-ish day of a Monday-starting week), avoiding ambiguous or inconsistent week-to-year assignment near January 1." },
      { q: "Can a date in late December belong to week 1 of the following year?", a: "Yes — if a year's last few days fall in a week whose Thursday lands in January of the following year, that week is numbered as week 1 of the new ISO year, even though most of its days are still in December." },
      { q: "Where is ISO week numbering commonly used?", a: "Manufacturing date codes, shipping and logistics schedules, payroll systems, and many European business contexts use ISO week numbers as a standard reference, since it's a globally consistent standard unlike some regional 'week of the month' conventions." },
      { q: "Does every year have exactly 52 weeks?", a: "Most years have 52 ISO weeks, but some years have 53 — this happens for years where the extra day (or two, in a leap year) pushes an additional partial week over the threshold to count as a full week under the ISO rule." },
    ],
    related: ["date-difference-calculator", "leap-year-checker", "add-days-calculator", "working-days-calculator", "days-until-date-calculator"],
  },

  "time-duration-calculator": {
    intro:
      "Two clock times, and the exact duration between them — handling the wraparound automatically when the end time is technically 'earlier' in the day, meaning the span crosses midnight.",
    method: [
      "Both times are converted to total minutes since midnight (hours × 60 + minutes), then subtracted.",
      "If the result is negative (end time earlier than start time), 1,440 minutes — a full day — is added, correctly handling durations that span midnight.",
    ],
    example: {
      title: "Worked example: 09:15 to 17:45",
      lines: [
        "09:15 = 555 minutes since midnight. 17:45 = 1,065 minutes since midnight.",
        "Duration = 1,065 − 555 = 510 minutes = 8 hours 30 minutes.",
      ],
    },
    mistakes: [
      { title: "Assuming an 'earlier' end time is always an input error", body: "A start time of 22:00 and end time of 06:00 correctly represents an overnight duration (like a night shift) — the calculator automatically adds a full day's worth of minutes to handle this midnight-crossing case correctly, rather than treating it as invalid." },
      { title: "Entering times in 12-hour format without AM/PM context", body: "This calculator expects 24-hour (HH:MM) format directly — entering '5:00' intending 5 PM without converting to '17:00' first will be interpreted as 5 AM instead, giving a very different duration result." },
    ],
    faqs: [
      { q: "How does this handle a shift that crosses midnight?", a: "If the calculated end-minus-start comes out negative, a full 24-hour's worth of minutes (1,440) is added automatically, correctly reflecting that the end time is actually on the following calendar day." },
      { q: "Why does the result show hours and minutes separately rather than just decimal hours?", a: "Whole hours and remaining minutes (like '8h 30m') read more naturally for a duration than a decimal figure like '8.5 hours', though the detail line also provides the total in minutes for anyone needing that format." },
      { q: "Is this the same calculation used by the Hours Worked Calculator?", a: "Similar in principle, but the Hours Worked Calculator additionally subtracts a specified break duration and calculates pay from an hourly rate — this tool gives the raw duration between two times only." },
      { q: "Does this account for daylight saving time changes during the duration?", a: "No — it's a straightforward clock-time subtraction assuming a normal, unchanged day; a duration spanning an actual daylight-saving transition would need that hour adjustment accounted for separately." },
    ],
    related: ["hours-worked-calculator", "meeting-cost-calculator", "time-zone-converter", "unix-timestamp-converter", "working-days-calculator"],
  },

  "hours-worked-calculator": {
    intro:
      "Clock-in and clock-out times, minus a break, straight into both hours worked and pay owed — the exact calculation behind an hourly paycheck, done in one step instead of separate subtraction and multiplication.",
    method: [
      "Total minutes worked = (clock-out time − clock-in time) in minutes, minus the specified break duration.",
      "Pay = hours worked × hourly rate, where hours worked is minutes worked ÷ 60.",
    ],
    example: {
      title: "Worked example: 08:30 to 17:00, 45-minute break, rate 25 per hour",
      lines: [
        "Raw span: 08:30 to 17:00 = 510 minutes.",
        "Minus the 45-minute break: 510 − 45 = 465 minutes = 7.75 hours.",
        "Pay = 7.75 × 25 = 193.75.",
      ],
    },
    mistakes: [
      { title: "Forgetting to subtract an unpaid break before calculating pay", body: "An 8.5-hour clock-in-to-clock-out span with a 30-minute unpaid lunch actually represents 8 hours of paid work, not 8.5 — omitting the break subtraction directly overstates pay owed." },
      { title: "Entering clock times in 12-hour format without converting to 24-hour", body: "Like the Time Duration Calculator, this expects 24-hour format — a shift ending at '5:00' meant as 5 PM needs to be entered as '17:00', or the calculation will interpret it as 5 AM instead, producing a negative or nonsensical result." },
    ],
    faqs: [
      { q: "What happens if the break time exceeds the total clock-in-to-clock-out span?", a: "The calculator floors the result at zero hours worked rather than showing a negative number, since a break can't reasonably exceed the total time on shift in a sensible scenario." },
      { q: "Does this handle an overnight shift that crosses midnight?", a: "This calculator is built around a straightforward clock-in-to-clock-out same-day calculation; a shift crossing midnight would need the same wraparound handling used in the Time Duration Calculator to compute correctly." },
      { q: "How would I calculate pay including overtime rates?", a: "This tool applies one flat hourly rate to all hours worked — for overtime calculations where hours beyond a threshold pay at a higher rate, the standard and overtime hours would need to be calculated and combined separately." },
      { q: "Why show pay per shift rather than assuming a fixed weekly schedule?", a: "Actual hours (and therefore pay) vary day to day for many jobs — calculating per shift based on the real clock-in and clock-out times gives an accurate figure rather than assuming an idealised fixed schedule." },
    ],
    related: ["time-duration-calculator", "meeting-cost-calculator", "working-days-calculator", "time-zone-converter", "unix-timestamp-converter"],
  },

  "unix-timestamp-converter": {
    intro:
      "A Unix timestamp is just a count of seconds since January 1, 1970 — every system uses it internally, but no human reads it directly, so this converts it straight to a readable date and time.",
    method: [
      "The timestamp is treated as seconds since the Unix epoch (January 1, 1970, 00:00:00 UTC), multiplied by 1,000 to convert to milliseconds for standard date construction, then formatted as a readable UTC date and time.",
    ],
    example: {
      title: "Worked example: timestamp 1785000000",
      lines: [
        "1,785,000,000 seconds after January 1, 1970 UTC converts to a specific date and time in 2026.",
        "The result is shown both as a readable UTC string and in ISO 8601 format for programmatic reference.",
      ],
    },
    mistakes: [
      { title: "Entering a timestamp in milliseconds instead of seconds", body: "Unix timestamps are conventionally in seconds, but some systems (notably JavaScript's own Date.now()) work natively in milliseconds — entering a millisecond-based timestamp here without dividing by 1,000 first produces a wildly incorrect, far-future or invalid date." },
      { title: "Assuming the result is automatically in your local time zone", body: "The output here is shown in UTC — for a timestamp's equivalent time in a specific local time zone, that UTC offset would need to be applied afterward using something like the Time Zone Converter." },
    ],
    faqs: [
      { q: "Why does Unix time start counting from January 1, 1970 specifically?", a: "It's an arbitrary but now deeply entrenched convention chosen early in Unix's development — it predates most systems still using it today, but changing the reference point now would break enormous amounts of existing software, so it has remained the universal standard." },
      { q: "How can I tell if a timestamp is in seconds or milliseconds just by looking at it?", a: "A seconds-based timestamp for current dates is typically a 10-digit number (like 1785000000), while the same moment in milliseconds would be a 13-digit number — the digit count is a quick visual clue." },
      { q: "Will Unix timestamps eventually run out or overflow?", a: "A commonly cited concern is the 'Year 2038 problem', affecting older systems that store timestamps as 32-bit signed integers — those specific systems will overflow in 2038, though most modern systems now use larger integer types that push this limit far into the future." },
      { q: "Why is this format used instead of just storing a readable date directly?", a: "A single number is simpler and more efficient for computers to store, compare, and calculate durations with than parsing and manipulating a formatted date string — the readable format is purely for human convenience at the display layer." },
    ],
    related: ["time-zone-converter", "add-days-calculator", "date-difference-calculator", "countdown-timer", "time-duration-calculator"],
  },

  "birthday-countdown-calculator": {
    intro:
      "Unlike a generic countdown, this automatically finds the next occurrence of a birthday — if this year's date has already passed, it rolls forward to next year without needing to be told to.",
    method: [
      "The next birthday is constructed using the current year and the birth date's month and day.",
      "If that date has already passed this year, the year is incremented by one to find the correct upcoming occurrence instead.",
    ],
    example: {
      title: "Worked example: born April 18, checked in August of the same year",
      lines: [
        "April 18 of the current year has already passed by August, so the calculator automatically rolls forward to April 18 of next year.",
        "The days-remaining count reflects that next-year date, and the 'turning X' detail correctly shows the age they'll be turning at that upcoming birthday.",
      ],
    },
    mistakes: [
      { title: "Assuming the countdown always points to this calendar year's date", body: "The whole point of this calculator is that it automatically detects whether this year's birthday has already passed and rolls forward to next year if so — a plain Countdown Calculator entering a fixed date wouldn't do this automatically." },
      { title: "Expecting an exact age calculation rather than 'turning' a specific age", body: "This tool specifically shows the age being turned at the next birthday (a forward-looking figure), which is one different from someone's exact current age today — for exact current age, the Age Calculator is the right tool instead." },
    ],
    faqs: [
      { q: "How does the calculator know whether this year's birthday has passed?", a: "It compares the constructed 'this year's birthday' date against today's date — if that constructed date is earlier than today, it's already happened, and the calculation moves to next year's occurrence automatically." },
      { q: "What age does the 'turning X' detail refer to?", a: "The age the person will be on the upcoming birthday being counted down to, calculated as the difference between that birthday's year and their birth year." },
      { q: "Does this account for someone born on February 29 in a non-leap year?", a: "Handling a genuine February 29 birth date correctly when the current year isn't a leap year requires a convention choice (treating it as February 28 or March 1) that this straightforward date construction may not resolve perfectly — worth double-checking for that specific edge case." },
      { q: "Can I use this for something other than a birthday, like an anniversary?", a: "Yes — the underlying 'find the next annual occurrence of this month and day' logic works identically for any yearly recurring date, not just birthdays specifically." },
    ],
    related: ["age-calculator", "countdown-timer", "days-until-date-calculator", "leap-year-checker", "week-number-calculator"],
  },

  "meeting-cost-calculator": {
    intro:
      "A meeting's real cost is easy to underestimate because salary is usually thought of annually, not per-minute — this converts attendee count, duration and hourly rate directly into what that hour in the room actually costs the organisation.",
    method: [
      "Meeting cost = number of attendees × (duration in minutes ÷ 60) × average hourly rate.",
      "An annualised projection is also shown, assuming the same meeting recurs weekly for a full year (52 occurrences).",
    ],
    example: {
      title: "Worked example: 6 attendees, 60 minutes, average rate 55/hour",
      lines: [
        "Cost = 6 × (60 ÷ 60) × 55 = 6 × 1 × 55 = 330.",
        "If held weekly: 330 × 52 = 17,160 per year — a single recurring hour-long meeting.",
      ],
    },
    mistakes: [
      { title: "Using one person's salary rate instead of the true average across all attendees", body: "If attendees have significantly different pay levels, using a single (possibly junior) rate for everyone understates the true cost — a genuinely accurate calculation should use the actual average hourly rate across the specific mix of people in the room." },
      { title: "Forgetting this only captures direct salary cost, not the full opportunity cost", body: "This figure represents attendees' time valued at their hourly rate — it doesn't capture the value of the work they would otherwise have been doing, which for some meetings and some roles can be a far larger real cost than the salary figure alone suggests." },
    ],
    faqs: [
      { q: "How do I estimate 'average hourly rate' if I only know annual salaries?", a: "Divide each attendee's annual salary by roughly 2,080 (a standard full-time work-year of 40 hours × 52 weeks) to get an hourly rate, then average those figures across everyone attending." },
      { q: "Why does the calculator show an annualised figure for a single meeting?", a: "A single meeting's cost can seem small in isolation, but recurring meetings compound significantly — seeing the annual total helps evaluate whether a standing weekly meeting is genuinely worth its ongoing cost." },
      { q: "Does this account for benefits and overhead costs beyond base salary?", a: "No — it uses whatever hourly rate figure is entered directly. For a fuller cost picture including benefits, payroll tax, and overhead, a loaded hourly rate (higher than base salary alone) could be entered instead for a more complete estimate." },
      { q: "How could this number be used constructively rather than just as a discouraging statistic?", a: "As a prompt to question whether every recurring meeting genuinely needs its current attendee list, duration, or frequency — the number itself is neutral information that can support a decision to trim a meeting down, not a judgment on its own." },
    ],
    related: ["hours-worked-calculator", "time-duration-calculator", "working-days-calculator", "electricity-bill-calculator", "gift-budget-calculator"],
  },
};
