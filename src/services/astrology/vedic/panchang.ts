import { normalizeDegrees } from "../astronomy/angles";
import { nakshatraFromSiderealLongitude, type NakshatraPlacement } from "./nakshatra";

const TITHI_NAMES = [
  "Pratipada",
  "Dwitiya",
  "Tritiya",
  "Chaturthi",
  "Panchami",
  "Shashthi",
  "Saptami",
  "Ashtami",
  "Navami",
  "Dashami",
  "Ekadashi",
  "Dwadashi",
  "Trayodashi",
  "Chaturdashi",
] as const;

const VARA_NAMES = [
  "Ravivara",
  "Somavara",
  "Mangalavara",
  "Budhavara",
  "Guruvara",
  "Shukravara",
  "Shanivara",
] as const;

const YOGA_NAMES = [
  "Vishkambha",
  "Priti",
  "Ayushman",
  "Saubhagya",
  "Shobhana",
  "Atiganda",
  "Sukarma",
  "Dhriti",
  "Shoola",
  "Ganda",
  "Vriddhi",
  "Dhruva",
  "Vyaghata",
  "Harshana",
  "Vajra",
  "Siddhi",
  "Vyatipata",
  "Variyana",
  "Parigha",
  "Shiva",
  "Siddha",
  "Sadhya",
  "Shubha",
  "Shukla",
  "Brahma",
  "Indra",
  "Vaidhriti",
] as const;

const MOVABLE_KARANAS = ["Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti"] as const;

export interface TithiResult {
  index: number; // 0-29
  paksha: "Shukla" | "Krishna";
  numberInPaksha: number; // 1-15
  name: string;
  degreesInTithi: number; // 0-12
}

export interface NamedIndex {
  index: number;
  name: string;
}

export interface PanchangResult {
  tithi: TithiResult;
  vara: NamedIndex;
  nakshatra: NakshatraPlacement;
  yoga: NamedIndex;
  karana: NamedIndex;
}

/** A tithi is 12 degrees of (sidereal Moon - sidereal Sun); 15 per paksha, 2 pakshas per month. */
export function calculateTithi(moonSiderealLongitude: number, sunSiderealLongitude: number): TithiResult {
  const diff = normalizeDegrees(moonSiderealLongitude - sunSiderealLongitude);
  const index = Math.floor(diff / 12);
  const degreesInTithi = diff - index * 12;
  const paksha: "Shukla" | "Krishna" = index < 15 ? "Shukla" : "Krishna";
  const numberInPaksha = (index % 15) + 1;
  const name =
    numberInPaksha === 15
      ? paksha === "Shukla"
        ? "Purnima"
        : "Amavasya"
      : (TITHI_NAMES[numberInPaksha - 1] as string);

  return { index, paksha, numberInPaksha, name, degreesInTithi };
}

/**
 * Vara (weekday) for a calendar date. Weekday-of-a-date is a pure
 * calendar fact independent of time zone, so this takes the LOCAL
 * calendar date directly rather than a UTC instant.
 *
 * CAVEAT: traditional Panchang defines the day as running sunrise to
 * sunrise, not midnight to midnight — a birth in the hours just after
 * midnight but before local sunrise is traditionally still the
 * *previous* vara/tithi/nakshatra-of-day. This implementation uses the
 * given calendar date directly and does not apply that sunrise shift.
 */
export function calculateVara(localDateISO: string): NamedIndex {
  const [year, month, day] = localDateISO.split("-").map(Number) as [number, number, number];
  const index = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return { index, name: VARA_NAMES[index] as string };
}

/** Yoga is 360/27 degrees of (sidereal Sun + sidereal Moon) — unlike tithi, the sum is not ayanamsa-invariant. */
export function calculateYoga(sunSiderealLongitude: number, moonSiderealLongitude: number): NamedIndex {
  const sum = normalizeDegrees(sunSiderealLongitude + moonSiderealLongitude);
  const index = Math.floor(sum / (360 / 27));
  return { index, name: YOGA_NAMES[index] as string };
}

/** Karana is a half-tithi (6 degrees); 1 fixed + 56 cycling movable + 3 fixed = 60 per month. */
export function calculateKarana(moonSiderealLongitude: number, sunSiderealLongitude: number): NamedIndex {
  const diff = normalizeDegrees(moonSiderealLongitude - sunSiderealLongitude);
  const index = Math.floor(diff / 6);

  let name: string;
  if (index === 0) name = "Kimstughna";
  else if (index === 57) name = "Shakuni";
  else if (index === 58) name = "Chatushpada";
  else if (index === 59) name = "Naga";
  else name = MOVABLE_KARANAS[(index - 1) % 7] as string;

  return { index, name };
}

export function calculatePanchang(input: {
  sunSiderealLongitude: number;
  moonSiderealLongitude: number;
  localDateISO: string;
}): PanchangResult {
  return {
    tithi: calculateTithi(input.moonSiderealLongitude, input.sunSiderealLongitude),
    vara: calculateVara(input.localDateISO),
    nakshatra: nakshatraFromSiderealLongitude(input.moonSiderealLongitude),
    yoga: calculateYoga(input.sunSiderealLongitude, input.moonSiderealLongitude),
    karana: calculateKarana(input.moonSiderealLongitude, input.sunSiderealLongitude),
  };
}
