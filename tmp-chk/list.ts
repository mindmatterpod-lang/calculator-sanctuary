import { calculators } from "@/lib/calculators";
import { calcContent } from "@/lib/content";
const fin = calculators.filter(c=>c.category==="finance");
console.log(fin.length);
console.log(fin.filter(c=>!calcContent[c.slug]).map(c=>c.slug+" | "+c.title).join("\n"));
