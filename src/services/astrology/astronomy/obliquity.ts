/**
 * Mean obliquity of the ecliptic — the tilt of Earth's axis, which the
 * ascendant and ecliptic-to-equatorial conversions both need. Formula:
 * Meeus, "Astronomical Algorithms" (2nd ed.), eq. 22.2. Valid within
 * about 0.01 arcsecond for several thousand years either side of J2000,
 * far beyond what a birth-chart date range needs.
 */
export function meanObliquityOfEcliptic(julianCenturiesSinceJ2000: number): number {
  const t = julianCenturiesSinceJ2000;
  const arcseconds = 84381.448 - 46.815 * t - 0.00059 * t ** 2 + 0.001813 * t ** 3;
  return arcseconds / 3600;
}
