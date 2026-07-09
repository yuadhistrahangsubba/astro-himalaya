import { calculateAscendant } from "./astronomy/ascendant";
import { normalizeDegrees } from "./astronomy/angles";
import { calculateHouseCusps } from "./astronomy/houses";
import { julianCenturiesSinceJ2000, toJulianDay } from "./astronomy/julian-date";
import { meanObliquityOfEcliptic } from "./astronomy/obliquity";
import { localSiderealTime } from "./astronomy/sidereal-time";
import { localToUtc } from "./astronomy/timezone";
import { lahiriAyanamsa } from "./ayanamsa/lahiri";
import { PlanetNotSupportedError } from "./errors";
import type { CelestialBody } from "./ephemeris/types";
import { MeeusEphemerisProvider } from "./ephemeris/provider";
import { calculateMoonPhase } from "./moon-phase";
import type { BirthInput, BodyPlacement, ChartResult } from "./types";
import { calculateVimshottariDasha } from "./vedic/dasha";
import { nakshatraFromSiderealLongitude } from "./vedic/nakshatra";
import { calculatePanchang } from "./vedic/panchang";
import { rashiFromSiderealLongitude } from "./vedic/rashi";
import { tropicalZodiacSign } from "./western/zodiac-sign";

export { PlanetNotSupportedError, CalculationNotImplementedError } from "./errors";
export type * from "./types";

const OUTER_BODIES: readonly CelestialBody[] = [
  "mercury",
  "venus",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
  "pluto",
];

const ephemeris = new MeeusEphemerisProvider();

function placeBody(tropicalLongitude: number, ayanamsaDegrees: number): BodyPlacement {
  const siderealLongitude = normalizeDegrees(tropicalLongitude - ayanamsaDegrees);
  return {
    tropicalLongitude,
    siderealLongitude,
    rashi: rashiFromSiderealLongitude(siderealLongitude),
    nakshatra: nakshatraFromSiderealLongitude(siderealLongitude),
    westernSign: tropicalZodiacSign(tropicalLongitude),
  };
}

/**
 * Computes what this engine can currently place for real: Sun, Moon,
 * Panchang, Vimshottari Dasha, Moon phase, and — only when an exact
 * birth time is known — the Ascendant and Equal/Whole-Sign houses.
 * Planets beyond Sun/Moon are listed in `unavailableBodies` rather than
 * guessed at (see PlanetNotSupportedError).
 */
export function computeChart(input: BirthInput): ChartResult {
  const timeConfidence: "exact" | "date-only" = input.birthTime ? "exact" : "date-only";
  const birthUtc = localToUtc(input.birthDate, input.birthTime ?? "12:00", input.timezone);

  const julianDayUtc = toJulianDay(birthUtc);
  const ayanamsaDegrees = lahiriAyanamsa(julianDayUtc);

  const sun = placeBody(ephemeris.getPosition("sun", julianDayUtc).longitudeDegrees, ayanamsaDegrees);
  const moon = placeBody(ephemeris.getPosition("moon", julianDayUtc).longitudeDegrees, ayanamsaDegrees);

  const unavailableBodies = OUTER_BODIES.filter((body) => {
    try {
      ephemeris.getPosition(body, julianDayUtc);
      return false;
    } catch (error) {
      if (error instanceof PlanetNotSupportedError) return true;
      throw error;
    }
  });

  const panchang = calculatePanchang({
    sunSiderealLongitude: sun.siderealLongitude,
    moonSiderealLongitude: moon.siderealLongitude,
    localDateISO: input.birthDate,
  });

  const vimshottariDasha = calculateVimshottariDasha(moon.siderealLongitude, birthUtc);
  const moonPhase = calculateMoonPhase(moon.tropicalLongitude, sun.tropicalLongitude);

  const result: ChartResult = {
    julianDayUtc,
    ayanamsaDegrees,
    timeConfidence,
    sun,
    moon,
    panchang,
    vimshottariDasha,
    moonPhase,
    unavailableBodies,
  };

  if (timeConfidence === "exact") {
    const t = julianCenturiesSinceJ2000(julianDayUtc);
    const obliquity = meanObliquityOfEcliptic(t);
    const lst = localSiderealTime(julianDayUtc, input.longitude);
    const tropicalAscendant = calculateAscendant(lst, input.latitude, obliquity);
    const siderealAscendant = normalizeDegrees(tropicalAscendant - ayanamsaDegrees);

    result.ascendant = {
      tropicalLongitude: tropicalAscendant,
      siderealLongitude: siderealAscendant,
      rashi: rashiFromSiderealLongitude(siderealAscendant),
      westernSign: tropicalZodiacSign(tropicalAscendant),
    };

    result.houses = {
      western: calculateHouseCusps(tropicalAscendant, "equal"),
      vedic: calculateHouseCusps(siderealAscendant, "whole-sign"),
    };
  }

  return result;
}
