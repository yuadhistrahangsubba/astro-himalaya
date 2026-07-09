import { signFromLongitude } from "./astronomy/angles";

export const ZODIAC_SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

export interface ZodiacPlacement {
  signIndex: number;
  signName: string;
  degreesInSign: number;
}

/**
 * The zodiac-sign-with-name lookup shared by Vedic rashi (pass a
 * sidereal longitude) and Western sun-sign (pass a tropical longitude)
 * — the math is identical either way, only which longitude convention
 * the caller passes in differs.
 */
export function namedSignFromLongitude(longitude: number): ZodiacPlacement {
  const { signIndex, degreesInSign } = signFromLongitude(longitude);
  return { signIndex, signName: ZODIAC_SIGNS[signIndex] as string, degreesInSign };
}
