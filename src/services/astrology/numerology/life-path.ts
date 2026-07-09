import { reduceToDigitOrMasterNumber } from "./reduce";

/** Life Path Number: every digit of the birth date summed, then reduced. */
export function calculateLifePathNumber(birthDateISO: string): number {
  const digitSum = birthDateISO
    .replace(/-/g, "")
    .split("")
    .reduce((sum, char) => sum + Number(char), 0);

  return reduceToDigitOrMasterNumber(digitSum);
}
