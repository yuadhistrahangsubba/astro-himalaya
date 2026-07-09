import { normalizeDegrees, toRadians } from "../astronomy/angles";
import { julianCenturiesSinceJ2000 } from "../astronomy/julian-date";
import type { EclipticPosition } from "./types";

/**
 * The Sun's apparent geocentric ecliptic longitude. Formula: Meeus,
 * "Astronomical Algorithms" (2nd ed.), ch. 25, "low accuracy" solar
 * coordinates — good to about 0.01 degree for dates within a few
 * centuries of J2000, which is every real birth date this app handles.
 * Latitude is 0 by definition (the ecliptic is the Sun's apparent path).
 */
export function sunPosition(julianDay: number): EclipticPosition {
  const t = julianCenturiesSinceJ2000(julianDay);

  const meanLongitude = 280.46646 + 36000.76983 * t + 0.0003032 * t ** 2;
  const meanAnomalyDeg = 357.52911 + 35999.05029 * t - 0.0001537 * t ** 2;
  const meanAnomaly = toRadians(meanAnomalyDeg);

  const equationOfCenter =
    (1.914602 - 0.004817 * t - 0.000014 * t ** 2) * Math.sin(meanAnomaly) +
    (0.019993 - 0.000101 * t) * Math.sin(2 * meanAnomaly) +
    0.000289 * Math.sin(3 * meanAnomaly);

  const trueLongitude = meanLongitude + equationOfCenter;

  // Nutation + aberration correction (Meeus eq. 25.8) to get apparent longitude.
  const omega = 125.04 - 1934.136 * t;
  const apparentLongitude = trueLongitude - 0.00569 - 0.00478 * Math.sin(toRadians(omega));

  return {
    longitudeDegrees: normalizeDegrees(apparentLongitude),
    latitudeDegrees: 0,
  };
}
