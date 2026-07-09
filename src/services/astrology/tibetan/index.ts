import { CalculationNotImplementedError } from "../errors";

export interface TibetanAstrologyResult {
  birthYearAnimal: string;
  birthYearElement: string;
  /** Srog — life-force element. */
  lifeForce: string;
  /** Lu — body element. */
  body: string;
  /** Wangthang — fortune/power element. */
  fortune: string;
}

/**
 * NOT IMPLEMENTED — see bhutanese/index.ts for the full reasoning.
 *
 * Tibetan astrology (both kar-tsi, the "white"/astronomical tradition,
 * and nag-tsi, the "black"/elemental divination tradition) needs the
 * same verified Tibetan lunisolar calendar conversion, plus the
 * srog/lu/wangthang element-assignment rules specific to this
 * tradition. Neither is verified in this codebase — implement against
 * a confirmed reference, not from memory.
 */
export function calculateTibetanAstrology(
  birthDateISO: string,
  birthTime: string | undefined,
): TibetanAstrologyResult {
  void birthDateISO;
  void birthTime;
  throw new CalculationNotImplementedError(
    "Tibetan astrology",
    "a verified Tibetan lunisolar calendar conversion and confirmed srog/lu/wangthang element-assignment rules for this tradition",
  );
}
