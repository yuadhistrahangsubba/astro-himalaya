import { nakshatraFromSiderealLongitude } from "./nakshatra";

export const DASHA_SEQUENCE = [
  "Ketu",
  "Venus",
  "Sun",
  "Moon",
  "Mars",
  "Rahu",
  "Jupiter",
  "Saturn",
  "Mercury",
] as const;

export type DashaPlanet = (typeof DASHA_SEQUENCE)[number];

/** Total years per planet in the 120-year Vimshottari cycle (7+20+6+10+7+18+16+19+17=120). */
export const DASHA_YEARS: Record<DashaPlanet, number> = {
  Ketu: 7,
  Venus: 20,
  Sun: 6,
  Moon: 10,
  Mars: 7,
  Rahu: 18,
  Jupiter: 16,
  Saturn: 19,
  Mercury: 17,
};

const NAKSHATRA_SPAN = 360 / 27;

// Mean solar year — the common modern-software convention. Some
// traditional sources use a 360-day "elapsed year" for dasha specifically,
// which shifts every boundary date; this uses the more common convention.
const DAYS_PER_YEAR = 365.2425;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export interface MahadashaPeriod {
  planet: DashaPlanet;
  startDate: Date;
  endDate: Date;
  durationYears: number;
}

/**
 * Vimshottari Mahadasha periods from birth. Each of the 27 nakshatras
 * has a fixed lord (index % 9 into DASHA_SEQUENCE); the first period's
 * length is the *remaining* balance of that lord's full term based on
 * how far through the birth nakshatra the Moon already was, every
 * period after that runs the lord's full term.
 */
export function calculateVimshottariDasha(
  moonSiderealLongitude: number,
  birthUtc: Date,
  periodsToInclude = 9,
): MahadashaPeriod[] {
  const nakshatra = nakshatraFromSiderealLongitude(moonSiderealLongitude);
  const lordIndex = nakshatra.index % 9;
  const elapsedFraction = nakshatra.degreesInNakshatra / NAKSHATRA_SPAN;

  const periods: MahadashaPeriod[] = [];
  let cursor = birthUtc;

  for (let i = 0; i < periodsToInclude; i++) {
    const planet = DASHA_SEQUENCE[(lordIndex + i) % 9] as DashaPlanet;
    const fullYears = DASHA_YEARS[planet];
    const durationYears = i === 0 ? fullYears * (1 - elapsedFraction) : fullYears;
    const endDate = new Date(cursor.getTime() + durationYears * DAYS_PER_YEAR * MS_PER_DAY);

    periods.push({ planet, startDate: cursor, endDate, durationYears });
    cursor = endDate;
  }

  return periods;
}

/** Which Mahadasha period covers a given moment (e.g. "right now"). */
export function findMahadashaAt(periods: MahadashaPeriod[], at: Date): MahadashaPeriod | undefined {
  return periods.find((period) => at >= period.startDate && at < period.endDate);
}
