import type { HouseStrength } from "./types";

const KENDRA_TRIKONA = new Set([1, 4, 5, 7, 9, 10]);
const UPACHAYA = new Set([3, 6, 11]);
// The remaining houses (2, 8, 12) are neither — steady/resource houses that don't fit the growth or trial framing.

/**
 * Classical kendra (angular) / trikona (trine) houses are the strongest
 * placements; upachaya houses (3, 6, 11) improve with effort and time;
 * dusthana houses (6, 8, 12) traditionally ask for more patience — 6 is
 * both upachaya and mildly dusthana, so it's read as "growth through
 * effort" rather than purely testing.
 */
export function classifyHouseStrength(houseNumber: number): HouseStrength {
  if (houseNumber === 8 || houseNumber === 12) return "testing";
  if (KENDRA_TRIKONA.has(houseNumber)) return "strong";
  if (UPACHAYA.has(houseNumber)) return "growth";
  return "supportive";
}

export const STRENGTH_PHRASES: Record<HouseStrength, string> = {
  strong: "a position of real strength and visibility",
  supportive: "a steady, quietly supportive position",
  growth: "a position that tends to strengthen with effort and time",
  testing: "a position that traditionally asks for more patience and inner work",
};
