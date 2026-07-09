import { namedSignFromLongitude, type ZodiacPlacement } from "../constants";

export type WesternSignPlacement = ZodiacPlacement;

/** The tropical (Western) zodiac sign a body occupies, given its tropical longitude. */
export function tropicalZodiacSign(tropicalLongitude: number): WesternSignPlacement {
  return namedSignFromLongitude(tropicalLongitude);
}
