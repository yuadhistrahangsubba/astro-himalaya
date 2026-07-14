import type { DashaPlanet } from "../vedic/dasha";
import type { DomainKey } from "./types";

export interface DomainConfig {
  key: DomainKey;
  title: string;
  /** Either a fixed house number (read via that house's lord) or a specific graha, per classical significators. */
  house?: number;
  planet?: DashaPlanet;
  /** How the computed placement sentence frames this domain, e.g. "shapes your core identity". */
  framingVerb: string;
}

export const DOMAIN_CONFIGS: readonly DomainConfig[] = [
  { key: "character", title: "Character", house: 1, framingVerb: "shapes your core identity" },
  { key: "happiness", title: "Happiness And Fulfillment", house: 4, framingVerb: "colors your inner contentment" },
  { key: "lifestyle", title: "Life Style", planet: "Moon", framingVerb: "sets the rhythm of your daily life" },
  { key: "career", title: "Career", house: 10, framingVerb: "shapes your career trajectory" },
  { key: "occupation", title: "Occupation", house: 10, framingVerb: "points to the nature of the work you gravitate to" },
  { key: "health", title: "Health", house: 6, framingVerb: "governs your vitality and wellbeing" },
  { key: "hobbies", title: "Hobbies", house: 5, framingVerb: "colors your creative and leisure life" },
  { key: "love", title: "Love Matters", house: 7, framingVerb: "shapes your relationships and romantic instincts" },
  { key: "finance", title: "Finance", house: 2, framingVerb: "governs your finances and resources" },
  { key: "education", title: "Education", planet: "Mercury", framingVerb: "shapes your learning style and intellect" },
];
