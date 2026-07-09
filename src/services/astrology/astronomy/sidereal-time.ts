import { normalizeDegrees } from "./angles";
import { julianCenturiesSinceJ2000 } from "./julian-date";

/**
 * Greenwich Mean Sidereal Time, in degrees. Formula: Meeus, "Astronomical
 * Algorithms" (2nd ed.), eq. 12.4 — valid at any UT instant (the JD
 * already encodes the time of day), no separate hour-angle term needed.
 */
export function greenwichMeanSiderealTime(julianDay: number): number {
  const t = julianCenturiesSinceJ2000(julianDay);
  const gmst =
    280.46061837 +
    360.98564736629 * (julianDay - 2451545.0) +
    0.000387933 * t ** 2 -
    t ** 3 / 38710000;
  return normalizeDegrees(gmst);
}

/** Local Sidereal Time — GMST corrected for the observer's longitude (east positive). */
export function localSiderealTime(julianDay: number, longitudeDegreesEast: number): number {
  return normalizeDegrees(greenwichMeanSiderealTime(julianDay) + longitudeDegreesEast);
}
