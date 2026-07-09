/**
 * Julian Day Number and centuries-since-J2000, the two time units every
 * ephemeris formula in this package is expressed in. Formula: Meeus,
 * "Astronomical Algorithms" (2nd ed.), ch. 7 — valid for the Gregorian
 * calendar (dates after 1582-10-15, which covers every real birth date).
 */
export function toJulianDay(utc: Date): number {
  let year = utc.getUTCFullYear();
  let month = utc.getUTCMonth() + 1;
  const day =
    utc.getUTCDate() +
    (utc.getUTCHours() + utc.getUTCMinutes() / 60 + utc.getUTCSeconds() / 3600) / 24;

  if (month <= 2) {
    year -= 1;
    month += 12;
  }

  const a = Math.floor(year / 100);
  const b = 2 - a + Math.floor(a / 4);

  return (
    Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5
  );
}

/** Julian centuries since the J2000.0 epoch (JD 2451545.0) — the time unit VSOP/Meeus series use. */
export function julianCenturiesSinceJ2000(julianDay: number): number {
  return (julianDay - 2451545.0) / 36525;
}
