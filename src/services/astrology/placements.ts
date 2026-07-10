import { normalizeDegrees } from "./astronomy/angles";
import type { BodyPlacement } from "./types";
import { nakshatraFromSiderealLongitude } from "./vedic/nakshatra";
import { rashiFromSiderealLongitude } from "./vedic/rashi";
import { tropicalZodiacSign } from "./western/zodiac-sign";

/**
 * The full multi-tradition placement for one body from its tropical
 * longitude — shared by the birth-chart facade and the live sky
 * snapshot so the sidereal conversion happens in exactly one place.
 */
export function placeBody(tropicalLongitude: number, ayanamsaDegrees: number): BodyPlacement {
  const siderealLongitude = normalizeDegrees(tropicalLongitude - ayanamsaDegrees);
  return {
    tropicalLongitude,
    siderealLongitude,
    rashi: rashiFromSiderealLongitude(siderealLongitude),
    nakshatra: nakshatraFromSiderealLongitude(siderealLongitude),
    westernSign: tropicalZodiacSign(tropicalLongitude),
  };
}
