import { normalizeDegrees } from "./astronomy/angles";
import { houseForLongitude } from "./astronomy/houses";
import type { BodyPlacement } from "./types";
import { nakshatraFromSiderealLongitude } from "./vedic/nakshatra";
import { rashiFromSiderealLongitude } from "./vedic/rashi";
import { tropicalZodiacSign } from "./western/zodiac-sign";

/**
 * The full multi-tradition placement for one body from its tropical
 * longitude — shared by the birth-chart facade and the live sky
 * snapshot so the sidereal conversion happens in exactly one place.
 * `vedicHouseCusps` is optional because house placement only makes
 * sense with an exact birth time (see ChartResult.timeConfidence) —
 * pass it and every placement also gets a whole-sign house number.
 * `retrograde` is passed in rather than computed here — the caller
 * already has the ephemeris provider and julian day, and Sun/Moon/nodes
 * never need the sampling `isRetrograde` does (see BodyPlacement's doc).
 */
export function placeBody(
  tropicalLongitude: number,
  ayanamsaDegrees: number,
  vedicHouseCusps?: readonly number[],
  retrograde?: boolean,
): BodyPlacement {
  const siderealLongitude = normalizeDegrees(tropicalLongitude - ayanamsaDegrees);
  return {
    tropicalLongitude,
    siderealLongitude,
    rashi: rashiFromSiderealLongitude(siderealLongitude),
    nakshatra: nakshatraFromSiderealLongitude(siderealLongitude),
    westernSign: tropicalZodiacSign(tropicalLongitude),
    house: vedicHouseCusps ? houseForLongitude(vedicHouseCusps, siderealLongitude) : undefined,
    retrograde,
  };
}
