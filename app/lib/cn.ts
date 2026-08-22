import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names, letting later classes win over earlier ones.
 *
 * Plain concatenation leaves conflicting utilities in place (`"mb-4 mb-2.5"`),
 * and which one applies then depends on their order in the generated
 * stylesheet rather than on the call site. `twMerge` resolves the conflict.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
