import { namedSignFromLongitude, type ZodiacPlacement } from "../constants";

export type RashiPlacement = ZodiacPlacement;

/** The sidereal (Vedic) zodiac sign a body occupies, given its sidereal longitude. */
export function rashiFromSiderealLongitude(siderealLongitude: number): RashiPlacement {
  return namedSignFromLongitude(siderealLongitude);
}
