import { calculators } from "@/lib/calculators";
import { calcContent } from "@/lib/content";
console.log(calculators.filter(c=>c.category==="health").map(c=>`${c.slug} :: ${c.name ?? ""} :: ${(c as any).description?.slice(0,80)}`).join("\n"));
