export type DomainKey =
  | "character"
  | "happiness"
  | "lifestyle"
  | "career"
  | "occupation"
  | "health"
  | "hobbies"
  | "love"
  | "finance"
  | "education";

/** Kendra (angular) and trikona (trine) houses are classically the strongest; upachaya grow over time; dusthana ask for more effort. */
export type HouseStrength = "strong" | "supportive" | "growth" | "testing";

export interface DomainInterpretation {
  key: DomainKey;
  title: string;
  /** The house this domain is read from, and which sign/lord occupies it in this chart. */
  house: number;
  houseSign: string;
  lord: string;
  /** Which house (and sign) the lord itself is placed in — the "strength" of the domain. */
  lordHouse?: number;
  lordSign: string;
  strength: HouseStrength;
  /** One computed sentence grounded in the actual chart placement. */
  summary: string;
  /** 1-2 sentences of ascendant-flavored color, keyed by the chart's own Ascendant sign. */
  flavor: string;
}
