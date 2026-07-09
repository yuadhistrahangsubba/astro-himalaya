const REFERENCE_JULIAN_DAY = 2415020.0; // 1900-01-01 12:00 UT
const AYANAMSA_AT_REFERENCE_DEGREES = 22.4595; // ~22°27'34" — see caveat below
const PRECESSION_RATE_DEGREES_PER_YEAR = 50.2388 / 3600; // general precession, standard IAU value

/**
 * Lahiri (Chitrapaksha) ayanamsa — the correction subtracted from a
 * tropical longitude to get the sidereal longitude Vedic astrology uses.
 *
 * CAVEAT: "Lahiri ayanamsa" is not one universally bit-identical number
 * — different software packages use slightly different reference-epoch
 * values and precession models, disagreeing with each other by up to a
 * few arcminutes. This implementation uses a commonly cited 1900.0
 * reference value plus the standard general-precession rate (a real,
 * well-established astronomical constant). For applications that must
 * match a specific published Panchang exactly, verify against Swiss
 * Ephemeris's SE_SIDM_LAHIRI before relying on boundary-sensitive
 * results — a few arcminutes only matters when a placement sits almost
 * exactly on a sign or nakshatra boundary, but it can happen.
 */
export function lahiriAyanamsa(julianDay: number): number {
  const yearsSinceReference = (julianDay - REFERENCE_JULIAN_DAY) / 365.25;
  return AYANAMSA_AT_REFERENCE_DEGREES + PRECESSION_RATE_DEGREES_PER_YEAR * yearsSinceReference;
}
