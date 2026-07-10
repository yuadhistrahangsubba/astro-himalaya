import { toJulianDay } from "./astronomy/julian-date";
import { lahiriAyanamsa } from "./ayanamsa/lahiri";
import { MeeusEphemerisProvider } from "./ephemeris/provider";
import { calculateMoonPhase } from "./moon-phase";
import type { MoonPhaseResult } from "./moon-phase";
import { placeBody } from "./placements";
import type { BodyPlacement } from "./types";
import { calculatePanchang, type PanchangResult } from "./vedic/panchang";

export interface SkySnapshot {
  at: Date;
  julianDay: number;
  ayanamsaDegrees: number;
  sun: BodyPlacement;
  moon: BodyPlacement;
  panchang: PanchangResult;
  moonPhase: MoonPhaseResult;
}

const ephemeris = new MeeusEphemerisProvider();

/**
 * The sky at a given instant — the live-dashboard counterpart to
 * computeChart. Same tested pieces (ephemeris → placements → panchang →
 * phase), no birth-specific parts (no ascendant/houses/dasha, which only
 * mean something relative to a birth). `localDateISO` is the calendar
 * date at the observer's location, used for the vara (weekday) limb.
 */
export function computeSkySnapshot(at: Date, localDateISO: string): SkySnapshot {
  const julianDay = toJulianDay(at);
  const ayanamsaDegrees = lahiriAyanamsa(julianDay);

  const sun = placeBody(ephemeris.getPosition("sun", julianDay).longitudeDegrees, ayanamsaDegrees);
  const moon = placeBody(ephemeris.getPosition("moon", julianDay).longitudeDegrees, ayanamsaDegrees);

  return {
    at,
    julianDay,
    ayanamsaDegrees,
    sun,
    moon,
    panchang: calculatePanchang({
      sunSiderealLongitude: sun.siderealLongitude,
      moonSiderealLongitude: moon.siderealLongitude,
      localDateISO,
    }),
    moonPhase: calculateMoonPhase(moon.tropicalLongitude, sun.tropicalLongitude),
  };
}
