import { CalculationNotImplementedError } from "../errors";
import type { NakshatraPlacement } from "./nakshatra";

export interface GunaMilanScore {
  varna: number; // max 1
  vashya: number; // max 2
  tara: number; // max 3
  yoni: number; // max 4
  grahaMaitri: number; // max 5
  gana: number; // max 6
  bhakoot: number; // max 7
  nadi: number; // max 8
  total: number; // max 36
}

/**
 * Traditional Ashtakoot ("eight-fold") Guna Milan compatibility scoring,
 * comparing two people's birth nakshatras across 8 weighted factors.
 *
 * NOT IMPLEMENTED — and deliberately so. A correct implementation needs
 * several detailed reference tables this codebase doesn't have verified:
 * each of the 27 nakshatras' Varna/Vashya/Yoni/Gana/Nadi classifications,
 * a 7x7 planetary-friendship (Graha Maitri) matrix, and the Tara/Bhakoot
 * distance-to-points tables. That's 100+ specific classifications, some
 * of which have documented variance between Jyotish schools — a much
 * larger and more error-prone set of facts than the nakshatra/tithi/yoga
 * *names* used elsewhere in this package, and this result would directly
 * inform a real marriage decision. Wire in a verified reference table
 * (or a domain expert's review) before implementing this for real,
 * rather than shipping a guessed lookup table for something this
 * consequential.
 */
export function calculateGunaMilan(person1: NakshatraPlacement, person2: NakshatraPlacement): GunaMilanScore {
  void person1;
  void person2;
  throw new CalculationNotImplementedError(
    "Guna Milan compatibility",
    "verified Varna/Vashya/Yoni/Gana/Nadi nakshatra classification tables, a Graha Maitri planetary-friendship matrix, and Tara/Bhakoot scoring tables",
  );
}
