export const CHINESE_ZODIAC_ANIMALS = [
  "Rat",
  "Ox",
  "Tiger",
  "Rabbit",
  "Dragon",
  "Snake",
  "Horse",
  "Goat",
  "Monkey",
  "Rooster",
  "Dog",
  "Pig",
] as const;

export const CHINESE_ELEMENTS = ["Wood", "Fire", "Earth", "Metal", "Water"] as const;

export interface ChineseZodiacPlacement {
  animal: string;
  element: string;
}

// 1984 was "Jiazi" (甲子) — Wood Rat, year 1 of the 60-year sexagenary
// cycle — a fixed, unambiguous anchor point for both the 12-year animal
// cycle and the 10-year (5 elements x yang/yin) stem cycle.
const REFERENCE_YEAR = 1984;

function positiveModulo(value: number, modulus: number): number {
  return ((value % modulus) + modulus) % modulus;
}

/**
 * CAVEAT: uses the Gregorian calendar year, not the true Chinese lunar
 * new year date (which falls between Jan 21 and Feb 20 and moves every
 * year). A birth in January or early February can actually belong to
 * the *previous* Chinese zodiac year by the real lunar calendar. Exact
 * results near that boundary need the true new-year date for that
 * specific year, which this does not look up.
 */
export function chineseZodiacForYear(gregorianYear: number): ChineseZodiacPlacement {
  const animalIndex = positiveModulo(gregorianYear - REFERENCE_YEAR, 12);
  const elementIndex = Math.floor(positiveModulo(gregorianYear - REFERENCE_YEAR, 10) / 2);

  return {
    animal: CHINESE_ZODIAC_ANIMALS[animalIndex] as string,
    element: CHINESE_ELEMENTS[elementIndex] as string,
  };
}
