import type { ContentMap } from "./types";

/* Batch 8 — Programming. Every worked example below is checked against the
   live compute() function for that slug in calculators.ts / calculators-extra.ts.
   hex-converter and ascii-converter are this site's two highest-traffic
   uncovered pages per Search Console data, so they get the deepest treatment. */

export const programmingContent: ContentMap = {
  "hex-converter": {
    intro:
      "Hexadecimal shows up everywhere in computing — colour codes, memory addresses, error codes, MAC addresses — because it packs four binary bits into one readable character. This converts any hex value straight to decimal, binary and octal in one step.",
    method: [
      "Each hex digit represents exactly 4 binary bits, since hexadecimal is base 16 and 2⁴ = 16 — this is precisely why hex is used as a compact, human-readable stand-in for binary.",
      "To convert to decimal, each digit is multiplied by 16 raised to its position power and summed, exactly like place-value works in base 10 (just with 16 instead of 10 as the base).",
      "A leading '0x' prefix is optional and stripped automatically — it's a common convention marking a value as hexadecimal in code, not part of the number itself.",
    ],
    example: {
      title: "Worked example: hex value 1A4",
      lines: [
        "1×16² + A(10)×16¹ + 4×16⁰ = 256 + 160 + 4 = 420 in decimal.",
        "420 in binary: 110100100.",
        "420 in octal: 644.",
      ],
    },
    mistakes: [
      { title: "Reading hex letters as if they were decimal digits", body: "Hex uses A through F to represent the decimal values 10 through 15 — a common error is treating 'A' as if it means 1 or 10 in a decimal sense rather than its actual positional value of 10 within base 16." },
      { title: "Forgetting hex is case-insensitive by convention", body: "1a4 and 1A4 represent the identical value — hexadecimal letters are conventionally written in either case depending on the context (uppercase is common in some languages, lowercase in others), but the numeric meaning never changes." },
    ],
    faqs: [
      { q: "Why does computing use hexadecimal instead of just binary or decimal?", a: "Hex is a compact stand-in for binary — since each hex digit maps to exactly 4 bits, a long binary string like 110100100 becomes a much shorter, more readable 1A4 in hex, while still converting to binary trivially, digit by digit." },
      { q: "Where does hexadecimal commonly show up outside of pure programming?", a: "Web colour codes (#1A4F9C), memory addresses in debugging tools, MAC addresses on network hardware, and many error codes and hash outputs are all conventionally shown in hex." },
      { q: "How do I convert hex directly to binary without going through decimal?", a: "Convert each hex digit to its exact 4-bit binary equivalent and concatenate them — 1 becomes 0001, A becomes 1010, 4 becomes 0100, giving 000110100100, which trims to 110100100 once leading zeros are dropped." },
      { q: "What's the largest value a given number of hex digits can represent?", a: "n hex digits can represent values from 0 up to 16ⁿ − 1 — two digits (like FF) max out at 255, matching exactly the range of a single byte." },
    ],
    related: ["binary-converter", "decimal-converter", "ascii-converter", "hex-rgb-converter", "base64-encoder-decoder"],
    post: {
      title: "Why Computers 'Speak' in Hex, Not Decimal",
      excerpt: "Binary is what computers actually use — hex is the readable shorthand humans use to talk about it. Here's why base 16 specifically won.",
      readTime: "4 min",
      body: [
        "Computers fundamentally operate in binary — every value is ultimately a sequence of 0s and 1s. But a raw binary number like 1101001000110101 is nearly impossible for a person to read, remember, or type accurately.",
        "Hexadecimal solves this because 16 is a power of 2 (2⁴). That means every single hex digit corresponds to exactly 4 binary bits, with no remainder or overlap — a property decimal doesn't share with binary at all. This clean mapping is why converting between hex and binary is just digit-by-digit substitution, while converting between decimal and binary requires real arithmetic.",
        "This is also why hex specifically (rather than, say, base 8 or base 32) became the dominant shorthand: it compresses binary by exactly 4x with a simple, memorable digit set (0-9 plus A-F), striking a practical balance between readability and compactness that other bases don't hit as cleanly.",
        "The result shows up everywhere once you know to look for it: a byte (8 bits) is always exactly 2 hex digits, which is why colour codes, memory dumps, and low-level programming reference hex so consistently — it's not an arbitrary programmer preference, it's a direct consequence of binary's own structure.",
      ],
    },
  },

  "ascii-converter": {
    intro:
      "Every character on a keyboard maps to a specific number under the hood — ASCII is that mapping, and this shows exactly which number (and hex code) each character in your text corresponds to.",
    method: [
      "Each character in the input text is converted to its ASCII decimal code using the character's standard code-point value.",
      "The same codes are also shown in hexadecimal, since hex is the more common format for referencing character codes in programming contexts.",
    ],
    example: {
      title: "Worked example: the text 'Hi!'",
      lines: [
        "'H' = 72, 'i' = 105, '!' = 33.",
        "Decimal codes: 72 105 33.",
        "Hex codes: 48 69 21.",
      ],
    },
    mistakes: [
      { title: "Assuming uppercase and lowercase letters share the same code", body: "'A' (65) and 'a' (97) are 32 apart in ASCII — a very common bug source in text-processing code that doesn't account for the case difference explicitly." },
      { title: "Expecting this to handle characters beyond standard ASCII correctly", body: "Standard ASCII only covers 128 code points (0-127), the basic English alphabet, digits and punctuation — extended characters, emoji, and non-Latin scripts use Unicode code points that don't map onto the same 128-value ASCII table." },
    ],
    faqs: [
      { q: "Why is there exactly a difference of 32 between uppercase and lowercase letters?", a: "It's a deliberate design choice in the original ASCII standard — this fixed 32 gap means switching case can be done with a single bit flip in binary, which was a meaningful efficiency consideration in early computing." },
      { q: "What character does code 32 represent?", a: "The space character — one of several 'control' or whitespace codes that sit just before the printable character range (33 onward) begins." },
      { q: "How is ASCII related to Unicode?", a: "Unicode was designed to be backward-compatible with ASCII — the first 128 Unicode code points are identical to standard ASCII, meaning any plain ASCII text is automatically valid, correctly-interpreted Unicode text as well." },
      { q: "Why do programmers often reference ASCII codes in hex rather than decimal?", a: "Hex aligns more naturally with byte boundaries in memory (2 hex digits = 1 byte exactly), which is why source code, debuggers and documentation frequently show character codes in hex rather than decimal." },
    ],
    related: ["hex-converter", "binary-converter", "base64-encoder-decoder", "text-case-converter", "url-encoder-decoder"],
  },

  "binary-converter": {
    intro:
      "Binary is the actual language computers operate in underneath everything else — this shows a decimal number's exact binary form, plus its hex and octal equivalents for cross-reference.",
    method: [
      "Decimal-to-binary conversion repeatedly divides by 2, recording the remainder at each step — the remainders, read bottom to top, form the binary representation.",
      "The same number is also converted to hexadecimal (base 16) and octal (base 8) for comparison, since all three are common ways of representing the same underlying binary value.",
    ],
    example: {
      title: "Worked example: decimal 42",
      lines: [
        "42 ÷ 2 = 21 r0, 21 ÷ 2 = 10 r1, 10 ÷ 2 = 5 r0, 5 ÷ 2 = 2 r1, 2 ÷ 2 = 1 r0, 1 ÷ 2 = 0 r1.",
        "Reading remainders bottom-to-top: 101010.",
        "Hex: 2A. Octal: 52.",
      ],
    },
    mistakes: [
      { title: "Reading a binary number's digits left-to-right as if it were decimal place value", body: "Binary place values double from right to left (1, 2, 4, 8, 16...), not the powers of 10 used in decimal — the leftmost digit of a binary number represents a much larger place value than intuition based on decimal might suggest." },
      { title: "Entering a non-integer or negative number expecting a sensible binary result", body: "This converter is built for non-negative whole numbers — negative numbers and fractions in binary use different representations (two's complement, fractional binary) not covered by this straightforward conversion." },
    ],
    faqs: [
      { q: "Why does computer hardware use binary specifically, not decimal?", a: "Binary maps directly onto a simple physical reality — a transistor or switch being either on or off (1 or 0) — which is far more reliable and simpler to build reliably at massive scale than hardware that would need to distinguish 10 different voltage levels for decimal." },
      { q: "How many binary digits (bits) does it take to represent a given decimal number?", a: "Roughly log₂(n) + 1 bits are needed for a number n — 42 needs 6 bits (as shown above), while 255 needs exactly 8 bits (a full byte), and 256 needs 9." },
      { q: "What's the relationship between binary and a 'byte'?", a: "A byte is defined as exactly 8 binary bits, capable of representing decimal values from 0 to 255 — this is why byte-based units (kilobyte, megabyte) and hex (which maps 2 digits per byte) are so closely tied to binary's structure." },
      { q: "Why is octal (base 8) also shown here?", a: "Like hex, octal is a power of 2 (2³), so it also maps cleanly onto binary — 3 binary bits per octal digit — though it's less commonly used today than hex in most modern programming contexts." },
    ],
    related: ["hex-converter", "decimal-converter", "ascii-converter", "subnet-mask-calculator", "hash-generator"],
  },

  "decimal-converter": {
    intro:
      "A general base converter — any whole number in any base from 2 to 36 converts directly to any other base in that same range, going beyond the fixed binary/hex/octal/decimal set most tools limit themselves to.",
    method: [
      "The input value is first parsed as a number in its stated 'from' base, then converted through to the target 'to' base.",
      "Bases above 10 use letters to represent digit values beyond 9 (A=10, B=11, and so on up to Z=35 for base 36, the maximum supported here).",
    ],
    example: {
      title: "Worked example: 255 from base 10 to base 2",
      lines: [
        "255 in base 10 converts to binary (base 2) as 11111111 — exactly 8 ones, the maximum value representable in one byte.",
        "The same 255 converted to base 16 instead gives FF, and to base 8 gives 377.",
      ],
    },
    mistakes: [
      { title: "Entering digits invalid for the stated 'from' base", body: "A value like '9' entered with 'from base' set to 8 (octal) is invalid, since octal only uses digits 0-7 — the converter treats out-of-range digits as invalid input rather than silently ignoring or misreading them." },
      { title: "Assuming base 36 is a common or standard base in real systems", body: "Base 36 (using all 10 digits plus all 26 letters) is a useful theoretical maximum for compact encoding schemes, but it's far less commonly encountered in everyday computing than base 2, 8, 10 or 16." },
    ],
    faqs: [
      { q: "Why does base conversion use letters for bases above 10?", a: "There aren't enough distinct decimal digit symbols (0-9) to represent values 10 and above in a single character, so letters A onward extend the available symbol set as needed for higher bases." },
      { q: "What's a real-world use for an unusual base, like base 36?", a: "Compact ID or URL-shortening schemes sometimes use base 36 or base 62 to represent large numbers in fewer characters than decimal would require, since more available symbols per digit means shorter representations." },
      { q: "How is this different from the dedicated Binary, Hex, and Decimal converters?", a: "Those tools are fixed to specific common bases; this general converter handles any base pairing from 2 to 36, useful for less common conversions those dedicated tools don't cover." },
      { q: "Does base affect the actual value being represented, or just its written form?", a: "Only the written form — 255 (decimal), FF (hex), and 11111111 (binary) are all exactly the same underlying quantity, just expressed using different positional-notation systems." },
    ],
    related: ["binary-converter", "hex-converter", "prime-number-checker", "exponent-calculator", "logarithm-calculator"],
  },

  "base64-encoder-decoder": {
    intro:
      "Base64 turns arbitrary data (including binary data) into plain, safe-to-transmit text using only 64 printable characters — the reason email attachments and embedded images in web pages often look like long strings of letters, numbers, plus and slash characters.",
    method: [
      "Encoding maps groups of input bytes to a restricted alphabet of 64 characters (A-Z, a-z, 0-9, + and /), padded with '=' characters where the final group is incomplete.",
      "Decoding reverses this exactly, reconstructing the original bytes from the encoded text.",
    ],
    example: {
      title: "Worked example: encoding 'CalculatorHub'",
      lines: [
        "Encoding 'CalculatorHub' produces the Base64 string Q2FsY3VsYXRvckh1Yg==.",
        "Decoding that same string back reconstructs 'CalculatorHub' exactly, confirming the round trip preserves the original text.",
      ],
    },
    mistakes: [
      { title: "Assuming Base64 is a form of encryption", body: "Base64 is encoding, not encryption — anyone can decode it instantly with no key or password required. It provides safe transmission through text-only channels, not confidentiality or security." },
      { title: "Expecting the encoded output to be roughly the same size as the input", body: "Base64 encoding increases data size by roughly 33%, since it represents each group of 3 original bytes using 4 encoded characters — this overhead is a normal, expected cost of making binary-safe data transmittable as plain text." },
    ],
    faqs: [
      { q: "Why is Base64 used for images or attachments in emails and web pages?", a: "Many transmission systems (like early email protocols) were designed for plain text and could corrupt raw binary data — Base64 encodes binary content into safe, printable text characters that survive those text-only channels intact." },
      { q: "Is Base64-encoded text secure or private?", a: "No — it's trivially reversible by design, with no secret key involved. Anyone can decode Base64 text back to its original form using any standard decoder, so it should never be relied on to protect sensitive information." },
      { q: "Why does encoded output sometimes end with one or two '=' signs?", a: "Base64 processes input in groups of 3 bytes at a time — when the final group has fewer than 3 bytes, '=' padding characters fill out the encoding to maintain the expected 4-character block size." },
      { q: "Can any text or file be Base64 encoded?", a: "Yes — Base64 works on any binary data, whether it originated as text, an image, or any other file type, since it operates at the byte level rather than depending on the data's original format." },
    ],
    related: ["hex-converter", "url-encoder-decoder", "ascii-converter", "hash-generator", "binary-converter"],
  },

  "uuid-generator": {
    intro:
      "A UUID is a 128-bit identifier so large that generating one randomly is, for all practical purposes, guaranteed to be unique — no coordination between systems needed, which is exactly why they're used everywhere distributed systems need unique IDs.",
    method: [
      "This generates a version 4 UUID: entirely random except for a few fixed bits that mark its version and variant, per the RFC 4122 standard.",
      "The format is a 36-character string (32 hex digits plus 4 hyphens) arranged as 8-4-4-4-12 characters.",
    ],
    example: {
      title: "Example format",
      lines: [
        "A version 4 UUID looks like: 3fa85f64-5717-4562-b3fc-2c963f66afa6.",
        "The '4' in the third group and the leading digit pattern in the fourth group are fixed by the version-4 specification; every other hex digit is randomly generated.",
      ],
    },
    mistakes: [
      { title: "Assuming UUIDs are sequential or sortable by creation time", body: "Version 4 UUIDs are purely random — they carry no information about when they were generated and won't sort into creation order. Time-ordered use cases typically need a different UUID version (like version 7) instead." },
      { title: "Worrying about collision as if it were a realistic practical risk", body: "With 122 random bits (after the fixed version/variant bits), the probability of two independently generated version-4 UUIDs colliding is astronomically small — far below the risk of, say, hardware failure — making it safe to treat as effectively unique for virtually any application." },
    ],
    faqs: [
      { q: "Why use a UUID instead of a simple incrementing number for IDs?", a: "UUIDs can be generated independently by many different systems or services simultaneously with no risk of collision or need for central coordination — an incrementing counter requires a single authoritative source to avoid duplicates." },
      { q: "What does 'version 4' specifically mean?", a: "It indicates the UUID is generated using random or pseudo-random numbers, as opposed to other versions that incorporate timestamps, MAC addresses, or namespace-based hashing instead." },
      { q: "Are UUIDs guaranteed to be unique, or just extremely likely to be?", a: "Strictly speaking, they're probabilistically unique, not mathematically guaranteed — but the probability of a collision is so vanishingly small under normal random generation that it's treated as effectively guaranteed in practice." },
      { q: "Can a UUID be used as a password or security token?", a: "It's not designed for that purpose — while unpredictable, UUIDs aren't necessarily generated with cryptographic-grade randomness guarantees across every implementation, so dedicated secure token generation is preferable for security-sensitive contexts." },
    ],
    related: ["hash-generator", "random-number-generator", "hex-converter", "password-strength-calculator", "base64-encoder-decoder"],
  },

  "hash-generator": {
    intro:
      "This produces a fast checksum — a short fingerprint that changes completely if even one character of the input changes — useful for quickly detecting whether two pieces of text are identical, but explicitly not built for security purposes.",
    method: [
      "The algorithm processes the input character by character, mixing each character's code into two running 32-bit values using multiplication and XOR operations.",
      "The two final values are combined into a single 64-bit hexadecimal checksum.",
    ],
    example: {
      title: "Worked example: checking that a checksum changes with input",
      lines: [
        "'CalculatorHub' produces one specific 16-character hex checksum.",
        "Changing even one character — say, lowercasing the 'C' to 'calculatorHub' — produces a completely different checksum, with no obvious relationship to the original, which is exactly the intended 'avalanche' behaviour of a well-mixed hash function.",
      ],
    },
    mistakes: [
      { title: "Using this hash for password storage or security purposes", body: "This is explicitly a fast, non-cryptographic checksum — it's designed for speed and basic integrity checking, not resistance to deliberate attacks. Password storage needs a purpose-built cryptographic hash function (like bcrypt or Argon2), never a fast general-purpose checksum like this one." },
      { title: "Expecting a hash collision to be effectively impossible", body: "With a 64-bit output, unlike a proper cryptographic hash, a determined attacker (or even random chance at large enough scale) has a meaningfully higher chance of finding two different inputs producing the same hash — acceptable for casual integrity checks, not for adversarial contexts." },
    ],
    faqs: [
      { q: "What's a practical use for this kind of hash?", a: "Quickly checking whether two files or text blocks are likely identical without comparing them character by character — useful for cache invalidation, deduplication, or basic data-integrity spot checks." },
      { q: "Why does changing one character completely change the checksum?", a: "This 'avalanche effect' is a deliberate design goal of hash functions generally — it ensures similar inputs don't produce similar-looking (and therefore potentially confusable) outputs." },
      { q: "Is this the same kind of hash used in blockchain or password systems?", a: "No — those contexts use cryptographic hash functions (like SHA-256) specifically designed to resist deliberate attacks, which are computationally much more expensive than this fast, non-cryptographic checksum." },
      { q: "Can two completely different pieces of text produce the same hash here?", a: "Yes, it's possible (called a 'collision') — with a 64-bit output space, collisions are rare in casual use but not cryptographically implausible, which is exactly why this tool isn't suitable for security-sensitive verification." },
    ],
    related: ["uuid-generator", "base64-encoder-decoder", "hex-converter", "password-strength-calculator", "binary-converter"],
  },

  "json-formatter": {
    intro:
      "JSON is unforgiving about syntax — one missing comma or unmatched bracket makes the whole document invalid. This validates and pretty-prints it instantly, or points out exactly what's wrong if it isn't valid.",
    method: [
      "The input is parsed strictly according to the JSON specification — if parsing succeeds, the result is re-serialised with consistent indentation for readability.",
      "If parsing fails, the specific error message (including what was expected and roughly where the problem is) is shown rather than a generic failure.",
    ],
    example: {
      title: "Worked example: valid vs invalid JSON",
      lines: [
        "{\"name\":\"CalculatorHub\",\"calculators\":500} is valid JSON and reformats cleanly with proper indentation.",
        "Removing the closing brace, or adding a trailing comma after the last property, produces an 'Invalid JSON' result with a specific parser error message pinpointing the issue.",
      ],
    },
    mistakes: [
      { title: "Leaving a trailing comma after the last item in an object or array", body: "Unlike some programming languages, standard JSON strictly disallows a comma after the final item in an object or array — this specific mistake is one of the most common reasons seemingly correct-looking JSON fails to parse." },
      { title: "Using single quotes instead of double quotes for strings", body: "JSON requires double quotes for all string values and keys — single-quoted strings, while valid in JavaScript object literals, are not valid JSON and will cause a parse error here." },
    ],
    faqs: [
      { q: "Why is JSON so strict about trailing commas and quote types compared to JavaScript?", a: "JSON is a data-interchange format specification separate from JavaScript's own more flexible object literal syntax — it deliberately trades some convenience for strict, unambiguous parseability across every language and platform that implements a JSON parser." },
      { q: "How does 'pretty-printing' help beyond just validating?", a: "Consistent indentation makes nested structures (objects within objects, arrays of objects) visually clear at a glance, which is much harder to follow in minified, single-line JSON despite it being equally valid." },
      { q: "What does the specific error message actually tell me?", a: "It typically identifies what character or token the parser expected versus what it actually found, and roughly where in the string that mismatch occurred — a strong starting point for locating the specific syntax problem." },
      { q: "Can JSON contain comments?", a: "No — the standard JSON specification does not support comments at all, which surprises people coming from JavaScript or other languages where comments are common; any comment-like text will cause a parse failure." },
    ],
    related: ["regex-tester", "base64-encoder-decoder", "url-encoder-decoder", "hash-generator", "text-case-converter"],
  },

  "regex-tester": {
    intro:
      "Regular expressions are notoriously easy to get subtly wrong — this runs a pattern against real test text immediately, showing every match rather than making you guess whether the pattern actually does what you intended.",
    method: [
      "The pattern and flags are compiled into a live regular expression and matched against the provided test text.",
      "With the global ('g') flag, every non-overlapping match in the text is returned; without it, only the first match is found.",
    ],
    example: {
      title: "Worked example: pattern \\d+ against 'Order 66 shipped in 3 days'",
      lines: [
        "\\d+ matches one or more consecutive digits.",
        "With the 'g' flag: 2 matches found — '66' and '3'.",
        "Without the 'g' flag, only the first match, '66', would be returned.",
      ],
    },
    mistakes: [
      { title: "Forgetting to escape special regex characters that appear literally in the target text", body: "Characters like '.', '*', '+', '(' and ')' have special meaning in regex syntax — to match them as literal characters in the text, they need to be escaped with a backslash (e.g. \\. to match an actual period), or the pattern will behave unexpectedly." },
      { title: "Omitting the global flag when expecting all matches, not just the first", body: "Without the 'g' flag, JavaScript's regex matching stops at the first match found — a very common source of 'why is it only finding one result' confusion when testing a pattern intended to catch every occurrence." },
    ],
    faqs: [
      { q: "What does \\d+ actually mean in plain terms?", a: "\\d matches any single digit (0-9), and the + means 'one or more of the preceding thing' — combined, \\d+ matches any run of consecutive digits, however long." },
      { q: "What's the difference between the 'g' and 'i' flags?", a: "'g' (global) finds all matches instead of stopping at the first; 'i' (case-insensitive) makes letter matching ignore uppercase/lowercase differences. Both can be combined, like 'gi'." },
      { q: "Why does my pattern work in one context but not another?", a: "Regex syntax has minor variations between programming languages and tools — a pattern tested here (using JavaScript's regex engine) should transfer well to most languages, but some advanced features differ subtly between implementations." },
      { q: "How do I match an exact literal string rather than a pattern?", a: "If the text you want to match contains no special regex characters, it works as a literal pattern directly — for text that does contain special characters, escape each one with a backslash first." },
    ],
    related: ["json-formatter", "url-encoder-decoder", "text-case-converter", "slug-generator", "hash-generator"],
  },

  "hex-rgb-converter": {
    intro:
      "Web colours are almost always written in hex, but design tools and CSS both increasingly use RGB and HSL too — this converts a hex colour to both formats instantly, so a designer's Figma value and a developer's CSS variable can be checked against each other directly.",
    method: [
      "Hex colour codes split into three pairs of hex digits, one each for red, green and blue (each ranging 00-FF, i.e. 0-255 in decimal).",
      "RGB values are then converted to HSL (hue, saturation, lightness) using the standard colour-space conversion formula, which is often more intuitive for adjusting a colour's shade or vibrancy directly.",
    ],
    example: {
      title: "Worked example: hex #4F46E5",
      lines: [
        "R = 4F (79), G = 46 (70), B = E5 (229) in decimal → rgb(79, 70, 229).",
        "Converting to HSL gives approximately hsl(243°, 75%, 59%) — a vivid blue-purple.",
      ],
    },
    mistakes: [
      { title: "Assuming a short 3-digit hex code (like #FFF) works the same as a full 6-digit one here", body: "This tool expects a full 6-digit hex value — shorthand 3-digit hex codes (where each digit is doubled, e.g. #FFF meaning #FFFFFF) need to be expanded to their full 6-digit form first." },
      { title: "Confusing HSL's saturation and lightness with RGB's individual channel brightness", body: "HSL describes colour in terms of hue (the base colour), saturation (how vivid vs. grey) and lightness (how light vs. dark) — this is a fundamentally different, often more intuitive mental model than RGB's three separate colour-channel intensities." },
    ],
    faqs: [
      { q: "Why do designers often prefer HSL over RGB for adjusting colours?", a: "HSL separates 'what colour' (hue) from 'how vivid' (saturation) and 'how light or dark' (lightness) — this makes intuitive adjustments, like 'make this a bit darker' or 'make this less saturated', much more direct than fiddling with three separate RGB channel numbers." },
      { q: "What does a hue value of 0 versus 240 represent?", a: "Hue is measured in degrees around a colour wheel — 0° is red, 120° is green, 240° is blue, with everything in between representing a smooth gradient through the colour spectrum." },
      { q: "How is this related to the Hex Converter?", a: "The Hex Converter handles general hex-to-decimal/binary conversion for any hex number; this tool is specifically built for colour hex codes and converts them into colour-specific formats (RGB, HSL) rather than plain numeric bases." },
      { q: "Can I convert from RGB or HSL back to hex using this tool?", a: "This specific tool converts starting from hex only — for the reverse direction, most design and browser dev tools include a colour picker that shows the equivalent hex value directly." },
    ],
    related: ["hex-converter", "binary-converter", "text-case-converter", "ascii-converter", "slug-generator"],
  },

  "text-case-converter": {
    intro:
      "Every programming language and style guide seems to prefer a different way of writing multi-word identifiers — this converts freely between the common naming conventions, from plain title case to the camelCase and snake_case styles used in code.",
    method: [
      "Text is first split into individual words (breaking on spaces, hyphens and underscores), then reassembled according to the chosen case style's specific capitalisation and separator rules.",
    ],
    example: {
      title: "Worked example: 'CalculatorHub is fast' converted to each style",
      lines: [
        "camelCase: calculatorHubIsFast.",
        "snake_case: calculatorhub_is_fast.",
        "kebab-case: calculatorhub-is-fast.",
        "Title Case: Calculatorhub Is Fast.",
      ],
    },
    mistakes: [
      { title: "Assuming this tool preserves existing internal capitalisation, like 'CalculatorHub'", body: "Word-splitting here is based on spaces, hyphens and underscores only — a single word like 'CalculatorHub' with no separator isn't split into 'Calculator' and 'Hub', so case-converting it treats the whole thing as one word rather than two." },
      { title: "Using the wrong case convention for a given programming language's typical style", body: "Different languages have different naming conventions by community norm — JavaScript variables are typically camelCase, Python typically snake_case, and CSS classes and URL slugs typically kebab-case. Using the 'wrong' one won't break anything technically, but goes against common convention." },
    ],
    faqs: [
      { q: "Why do different programming languages prefer different naming cases?", a: "It's largely historical convention within each language's community rather than a technical requirement — JavaScript and Java favour camelCase, Python and Ruby favour snake_case, and these conventions became self-reinforcing as more code was written in each style within each ecosystem." },
      { q: "What's the difference between camelCase and PascalCase?", a: "camelCase starts with a lowercase letter (calculatorHub); PascalCase (not directly offered here) starts with an uppercase letter (CalculatorHub) — both capitalise subsequent word boundaries the same way." },
      { q: "Why is kebab-case commonly used in URLs specifically?", a: "Hyphens are treated favourably by search engines as word separators (unlike underscores, historically), and kebab-case URLs are considered more readable — this is why the URL Slug Generator produces kebab-case by default." },
      { q: "Does this tool handle numbers within the text correctly?", a: "Numbers are treated as part of whatever word they're attached to and pass through each case conversion largely unchanged, since case conversion rules apply specifically to letters." },
    ],
    related: ["slug-generator", "hex-rgb-converter", "url-encoder-decoder", "lorem-ipsum-generator", "regex-tester"],
  },

  "slug-generator": {
    intro:
      "A URL slug needs to be lowercase, hyphen-separated, and free of special characters — this turns any title or heading into a clean slug automatically, exactly the format most websites (including this one) use for calculator and blog post URLs.",
    method: [
      "The text is lowercased, then any run of characters that isn't a lowercase letter or digit is replaced with a single hyphen.",
      "Leading and trailing hyphens are trimmed from the result.",
    ],
    example: {
      title: "Worked example: '10 Best Calculators for Students!'",
      lines: [
        "Lowercased: '10 best calculators for students!'.",
        "Non-alphanumeric runs (spaces, the exclamation mark) become hyphens: '10-best-calculators-for-students-'.",
        "Trailing hyphen trimmed: '10-best-calculators-for-students'.",
      ],
    },
    mistakes: [
      { title: "Assuming special characters are simply removed rather than replaced with a hyphen", body: "A title like 'Q&A: Best Tips' doesn't collapse the '&' and the space around it into nothing — each non-alphanumeric run becomes exactly one hyphen, which is why consecutive special characters don't create multiple consecutive hyphens in the output." },
      { title: "Expecting accented or non-English characters to convert automatically to their plain equivalents", body: "This slug generator strips characters that aren't plain lowercase letters or digits — accented characters like 'é' or 'ñ' are removed rather than automatically converted to their unaccented equivalents ('e', 'n'), which can leave unexpected gaps in certain titles." },
    ],
    faqs: [
      { q: "Why do URL slugs typically use hyphens rather than underscores or spaces?", a: "Search engines have historically treated hyphens as word separators more reliably than underscores, and spaces aren't valid in URLs at all without being encoded — hyphens became the practical, SEO-friendly standard as a result." },
      { q: "What happens if my title has no valid characters left after cleaning?", a: "The result would be an empty string, which this tool flags directly as 'empty' rather than silently returning nothing, so it's obvious the input needs adjusting." },
      { q: "Should slugs include stop words like 'a', 'the', 'and'?", a: "This is a matter of site convention rather than a technical requirement — many sites keep them for readability and exact title matching, while others strip them for brevity; this tool preserves whatever words are in the original title." },
      { q: "Can two different titles produce the same slug?", a: "Yes, if they're similar enough after lowercasing and cleaning — real systems generating slugs for actual URLs typically add a uniqueness check or numeric suffix to handle this collision case, which this simple generator doesn't do automatically." },
    ],
    related: ["text-case-converter", "url-encoder-decoder", "lorem-ipsum-generator", "regex-tester", "hash-generator"],
  },

  "url-encoder-decoder": {
    intro:
      "URLs can only safely contain a limited set of characters — spaces, ampersands and other special symbols need to be percent-encoded to travel through a URL correctly without being misread as part of its structure.",
    method: [
      "Encoding replaces characters outside the URL-safe set with a '%' followed by their hex byte value — a space becomes %20, for instance.",
      "Decoding reverses this, converting percent-encoded sequences back to their original characters.",
    ],
    example: {
      title: "Worked example: encoding 'search?q=calculator hub'",
      lines: [
        "Encoded: search%3Fq%3Dcalculator%20hub.",
        "The '?' becomes %3F, '=' becomes %3D, and the space becomes %20 — each because those characters have special structural meaning in a URL and would otherwise be misinterpreted if left as-is within a value.",
      ],
    },
    mistakes: [
      { title: "Encoding an entire URL, including its structural characters like '://' and the domain", body: "Structural URL characters like the scheme separator and path slashes need to remain unencoded for the URL to work as a URL — typically only the specific value being inserted into a query parameter or path segment should be encoded, not the whole URL string." },
      { title: "Double-encoding a value that's already encoded", body: "Running an already-encoded string through encoding again turns each '%' into '%25', producing a mangled double-encoded result that won't decode back to the original text correctly in one pass." },
    ],
    faqs: [
      { q: "Why can't URLs just contain spaces directly?", a: "Spaces (and several other characters) have historically caused ambiguity or breakage in URL parsing across different systems — percent-encoding provides an unambiguous, universally supported way to represent any character safely within a URL." },
      { q: "What does %20 specifically represent?", a: "20 is the hexadecimal ASCII code for the space character (32 in decimal) — percent-encoding always uses the hex byte value of the character being encoded." },
      { q: "Is percent-encoding the same as Base64 encoding?", a: "No — they're different techniques for different purposes. Percent-encoding makes text safe specifically within a URL's character constraints; Base64 encodes arbitrary binary data into printable text for general safe transmission, unrelated to URL structure specifically." },
      { q: "Why might I need to encode a query parameter value but not the whole URL?", a: "Only the actual data value (like a search term containing spaces or special characters) typically needs encoding — the URL's own structural parts (scheme, domain, path separators, parameter names) should stay as literal, unencoded characters for the URL to remain valid." },
    ],
    related: ["base64-encoder-decoder", "slug-generator", "text-case-converter", "hex-converter", "json-formatter"],
  },

  "random-number-generator": {
    intro:
      "Random numbers within a chosen range, as many as needed at once — for picking a raffle winner, generating test data, or settling an argument about whose turn it is, without reaching for dice or a coin.",
    method: [
      "Each number is generated uniformly at random between the minimum and maximum (inclusive), using the standard formula: floor(random() × (max − min + 1)) + min.",
      "Up to 50 numbers can be generated in a single batch.",
    ],
    example: {
      title: "Worked example: 5 numbers between 1 and 100",
      lines: [
        "Each of the 5 output numbers is independently and uniformly drawn from the full range 1 to 100 inclusive.",
        "Because generation is random, running the calculator again with identical inputs produces a different set of 5 numbers each time.",
      ],
    },
    mistakes: [
      { title: "Assuming this generator is suitable for cryptographic or security purposes", body: "This uses standard pseudo-random generation suitable for everyday tasks like games, sampling, or picking a winner — it is not designed to meet the unpredictability standards required for cryptographic keys, security tokens, or anything with real stakes riding on unpredictability." },
      { title: "Expecting no repeated numbers within one batch", body: "Each number in the batch is drawn independently, so repeats within the same set are possible, especially with a small range or with many numbers requested — this generator doesn't automatically enforce uniqueness across the batch." },
    ],
    faqs: [
      { q: "Can the same number appear twice in one batch?", a: "Yes — each of the requested numbers is generated independently, so duplicates are possible, particularly when the range is small relative to how many numbers are requested." },
      { q: "How is 'uniform' randomness different from other distributions?", a: "Uniform means every value in the specified range has an exactly equal chance of being selected — no value is favoured or disfavoured relative to any other within the min-max bounds." },
      { q: "Why is there a cap of 50 numbers per batch?", a: "It's a practical usability limit — beyond a certain quantity, a long list of random numbers becomes harder to use meaningfully in a typical everyday task like this tool is designed for." },
      { q: "Is this suitable for generating a lottery-style unique number set?", a: "Not directly, since duplicates are possible within a batch — for guaranteed-unique sets, the numbers would need to be filtered for uniqueness after generation, or regenerated individually while checking against already-picked values." },
    ],
    related: ["uuid-generator", "password-strength-calculator", "probability-calculator", "binomial-probability-calculator", "hash-generator"],
  },

  "subnet-mask-calculator": {
    intro:
      "A CIDR prefix like /24 packs a lot of networking information into two characters — this expands it into the actual subnet mask, the number of usable host addresses, and the wildcard mask, all of which are needed for real network configuration.",
    method: [
      "The subnet mask is built by setting the first n bits (the CIDR prefix) to 1 and the remaining bits to 0, then displaying that 32-bit value in standard dotted-decimal form.",
      "Usable hosts = 2^(32−n) − 2 for typical prefixes, subtracting the network address and broadcast address, which aren't assignable to individual devices.",
      "The wildcard mask is the bitwise complement (inverse) of the subnet mask, used in some networking contexts like access control lists.",
    ],
    example: {
      title: "Worked example: /24 prefix",
      lines: [
        "Subnet mask: 255.255.255.0.",
        "Usable hosts = 2^(32−24) − 2 = 2⁸ − 2 = 256 − 2 = 254.",
        "Wildcard mask (inverse of the subnet mask): 0.0.0.255.",
      ],
    },
    mistakes: [
      { title: "Forgetting to subtract the network and broadcast addresses from usable host count", body: "A /24 network has 256 total addresses, but only 254 are usable for actual devices — the first address is reserved for identifying the network itself, and the last is reserved for broadcasting to every device on it." },
      { title: "Confusing CIDR prefix length with a percentage or a byte count", body: "The number after the slash (like /24) refers to how many bits, out of 32 total, are fixed as the 'network' portion — it's not a percentage of the address space and doesn't directly correspond to a whole number of bytes except at specific boundaries like /8, /16, /24." },
    ],
    faqs: [
      { q: "Why do /31 and /32 networks have 0 usable hosts by this calculation?", a: "At /31 there's no room left for separate network and broadcast addresses under the traditional scheme (though /31 has a special point-to-point-link exception in some contexts), and /32 identifies a single specific host address with no room for a broader network at all." },
      { q: "What's the practical difference between a /24 and a /16 network?", a: "A /24 provides 254 usable addresses (a common small office/home network size); a /16 provides 65,534 usable addresses (a much larger allocation), since fewer bits are fixed for the network portion, leaving more for individual host addresses." },
      { q: "What is a wildcard mask actually used for?", a: "It's the inverse of the subnet mask, commonly used in access control list (ACL) configurations on networking equipment, where matching rules are often expressed in terms of which bits should be ignored (wildcarded) rather than which bits must match exactly." },
      { q: "How is CIDR notation different from the older 'Class A/B/C' network system?", a: "CIDR (Classless Inter-Domain Routing) allows any prefix length from 0 to 32, offering far more flexible network sizing than the older fixed-size class system it replaced, which only supported a few rigid network size options." },
    ],
    related: ["binary-converter", "hex-converter", "decimal-converter", "three-phase-current-calculator", "internet-speed-calculator"],
  },

  "lorem-ipsum-generator": {
    intro:
      "Lorem Ipsum is deliberately meaningless Latin-derived text used to fill mockups and layouts, so a design's visual rhythm can be judged without a viewer's eye being drawn into actually reading the placeholder content.",
    method: [
      "A fixed bank of traditional Lorem Ipsum words is cycled through repeatedly until the requested word count is reached, then capitalised and punctuated as a single block.",
    ],
    example: {
      title: "Worked example: requesting 12 words",
      lines: [
        "Output cycles through the standard word bank: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.'",
        "Requesting more than the bank's own word count (well over 40 unique words here) simply repeats the cycle from the beginning again.",
      ],
    },
    mistakes: [
      { title: "Assuming Lorem Ipsum is actual, translatable Latin", body: "It's derived from a scrambled passage of classical Latin text but isn't coherent or directly translatable as meaningful Latin — its value is purely as visually plausible filler, not as genuine language content." },
      { title: "Leaving placeholder text in a final, shipped design by accident", body: "It's easy to forget to replace placeholder Lorem Ipsum text with real content before a design goes live — a final content check before shipping is worth doing specifically to catch this common oversight." },
    ],
    faqs: [
      { q: "Why use meaningless text instead of real sample content for mockups?", a: "Real, meaningful text pulls a viewer's attention into reading and evaluating the words themselves, which distracts from judging the actual visual design — meaningless but naturally-varied-length filler text keeps the focus on layout, spacing, and typography instead." },
      { q: "Where does Lorem Ipsum text actually come from?", a: "It originates from a scrambled and altered passage of a 1st-century BC Latin text by Cicero, adapted over centuries into the standard placeholder text now used throughout publishing and design." },
      { q: "Is there a maximum word count this can generate?", a: "This tool caps requests at 300 words per generation — a reasonable range for filling most mockup layouts without needing an extremely long single block of text." },
      { q: "Can I get different variations of Lorem Ipsum text, not just the standard version?", a: "This generator specifically cycles through the traditional standard word bank — other Lorem Ipsum generators sometimes offer themed variations, but the classic version remains the most widely recognised placeholder style." },
    ],
    related: ["text-case-converter", "slug-generator", "random-number-generator", "url-encoder-decoder", "regex-tester"],
  },

  "file-transfer-time-calculator": {
    intro:
      "Whether it's an upload or a download, transfer time depends on the same relationship between file size and connection speed — and the same bits-versus-bytes mix-up that trips people up when estimating download times generally applies here too.",
    method: [
      "Transfer time (seconds) = (file size in GB × 8 × 1,024) ÷ connection speed in Mbps.",
      "The ×8 converts gigabytes to gigabits, since connection speed is measured in bits per second, not bytes.",
    ],
    example: {
      title: "Worked example: 4.7 GB file, 100 Mbps connection",
      lines: [
        "Seconds = (4.7 × 8 × 1,024) ÷ 100 ≈ 385 seconds.",
        "In minutes: 385 ÷ 60 ≈ 6.42 minutes.",
      ],
    },
    mistakes: [
      { title: "Assuming upload and download speeds are the same on a given connection", body: "Many consumer internet connections (especially cable and DSL) have significantly slower upload speeds than download speeds — using a download speed figure to estimate an upload time can badly underestimate how long it will actually take." },
      { title: "Not accounting for other traffic sharing the same connection during transfer", body: "If other devices or applications are actively using bandwidth on the same connection during a transfer, the effective available speed is lower than the connection's rated maximum, extending real transfer time beyond this calculation's theoretical figure." },
    ],
    faqs: [
      { q: "Why is this essentially the same calculation as the Internet Speed Calculator?", a: "They use the identical underlying relationship between file size and connection speed — this tool is framed specifically around the general file-transfer use case (uploads and downloads alike), while the other frames it as a download-time estimate." },
      { q: "How do I find my actual upload speed if it's different from download speed?", a: "Most internet speed test tools report upload and download speeds separately — use the specific upload figure when estimating time to send a large file, rather than assuming it matches your download speed." },
      { q: "Does file compression affect this calculation?", a: "Indirectly — a compressed (smaller) file transfers faster simply because its size in GB is smaller, which this calculator would reflect if given the compressed file's actual size rather than its uncompressed size." },
      { q: "Why might a real transfer take noticeably longer than this calculation predicts?", a: "Network overhead, other simultaneous traffic, server-side limits, and connection instability can all add real-world delay beyond this theoretical best-case calculation based purely on rated connection speed." },
    ],
    related: ["internet-speed-calculator", "electricity-bill-calculator", "screen-time-calculator", "binary-converter", "subnet-mask-calculator"],
  },
};
