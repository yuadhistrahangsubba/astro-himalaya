/** Known Yenyem names and their English meaning (cycle of 7 — the 8th slot in
 * panchanga data simply repeats the 1st). */
export const YENYEM_LEGEND = [
  { name: "Mangghu", meaning: "Nectar" },
  { name: "Siya", meaning: "Death" },
  { name: "Pano", meaning: "Auspicious" },
  { name: "Tung", meaning: "Illness" },
  { name: "Mudo", meaning: "Anxiety" },
  { name: "Membupek", meaning: "Moving" },
  { name: "Labo", meaning: "Profit" },
] as const;

/** Known Senlendat names and their governed activity (cycle of 7, repeating
 * across the 12 daily/nightly slots in panchanga data). */
export const SENLENDAT_LEGEND = [
  { name: "Singla", meaning: "All works Auspicious" },
  { name: "Pung", meaning: "Collection of Money" },
  { name: "Payang", meaning: "Marriage" },
  { name: "Khawa", meaning: "War" },
  { name: "Thung", meaning: "Government work" },
  { name: "Tung", meaning: "Travel" },
  { name: "Saya", meaning: "Studies" },
] as const;

/** Known Kirat Rashi (moon/sun sign) name pairings encountered in the
 * panchanga data. Extend as more names are confirmed. */
export const KIRAT_RASHI_LEGEND = [
  { name: "Anam", sign: "♈ Aries" },
  { name: "Wakla", sign: "♉ Taurus" },
  { name: "Kanam", sign: "♊ Gemini" },
  { name: "Chakla", sign: "♓ Pisces" },
  { name: "Phanam", sign: "♐ Sagittarius" },
] as const;
