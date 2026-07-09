import { normalizeDegrees, toRadians } from "../astronomy/angles";
import { julianCenturiesSinceJ2000 } from "../astronomy/julian-date";
import type { EclipticPosition } from "./types";

/**
 * The Moon's geocentric ecliptic position.
 *
 * IMPORTANT — precision tier, read before using: the Moon's true motion
 * (Meeus ch. 47) is a series of ~60 periodic terms; this implements only
 * the mean elements plus the 6 largest perturbation terms (the ones with
 * the largest, most-cited amplitudes). Typical error is under ~0.3
 * degrees, worst case around 1 degree — nowhere near the Sun's ~0.01
 * degree accuracy in sun.ts. That's precise enough to reliably place
 * the Moon in the correct zodiac sign and *usually* the correct
 * nakshatra (each spans 13°20'), but a birth near a nakshatra or tithi
 * boundary can land on the wrong side. Do not treat dasha start times
 * computed from this as exact to the day without upgrading to a full
 * VSOP/ELP-2000 series or Swiss Ephemeris.
 */
export function moonPosition(julianDay: number): EclipticPosition {
  const t = julianCenturiesSinceJ2000(julianDay);

  const meanLongitude = 218.3164477 + 481267.88123421 * t - 0.0015786 * t ** 2;
  const meanElongation = toRadians(297.8501921 + 445267.1114034 * t - 0.0018819 * t ** 2);
  const sunMeanAnomaly = toRadians(357.5291092 + 35999.0502909 * t - 0.0001536 * t ** 2);
  const moonMeanAnomaly = toRadians(134.9633964 + 477198.8675055 * t + 0.0087414 * t ** 2);
  const moonArgOfLatitude = toRadians(93.272095 + 483202.0175233 * t - 0.0036539 * t ** 2);

  const longitudeCorrection =
    6.288774 * Math.sin(moonMeanAnomaly) +
    1.274027 * Math.sin(2 * meanElongation - moonMeanAnomaly) +
    0.658314 * Math.sin(2 * meanElongation) +
    0.213618 * Math.sin(2 * moonMeanAnomaly) -
    0.185116 * Math.sin(sunMeanAnomaly) -
    0.114332 * Math.sin(2 * moonArgOfLatitude);

  const latitudeCorrection = 5.128122 * Math.sin(moonArgOfLatitude);

  return {
    longitudeDegrees: normalizeDegrees(meanLongitude + longitudeCorrection),
    latitudeDegrees: latitudeCorrection,
  };
}
