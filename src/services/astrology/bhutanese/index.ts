import { CalculationNotImplementedError } from "../errors";

export interface BhutaneseAstrologyResult {
  birthYearAnimal: string;
  birthYearElement: string;
  /** Trigram (one of 8) derived from birth year, used in Bhutanese elemental astrology. */
  parkha: string;
  lifeForceElement: string;
}

/**
 * NOT IMPLEMENTED — deliberately.
 *
 * Bhutanese astrology ("Tsi") is a regional tradition built on Tibetan
 * Buddhist astrology and needs its own Tibetan lunisolar calendar
 * conversion (the Phugpa/Tsurphu systems have leap *months* and
 * occasionally skipped or doubled days — nothing like the Gregorian
 * calendar's simple leap-year rule), plus verified elemental/parkha
 * (trigram) assignment rules specific to this tradition. This codebase
 * doesn't have that reference data or domain expertise verified, and
 * this app's target audience includes real Bhutanese users — a guessed
 * implementation would be actively disrespectful to the practice, not
 * just imprecise. Implement this against a verified Tibetan calendar
 * conversion source and, ideally, review from someone versed in the
 * tradition — not from memory.
 */
export function calculateBhutaneseAstrology(
  birthDateISO: string,
  birthTime: string | undefined,
): BhutaneseAstrologyResult {
  void birthDateISO;
  void birthTime;
  throw new CalculationNotImplementedError(
    "Bhutanese astrology (Tsi)",
    "a verified Tibetan lunisolar calendar conversion (Phugpa/Tsurphu system) and confirmed elemental/parkha assignment rules for this specific tradition",
  );
}
