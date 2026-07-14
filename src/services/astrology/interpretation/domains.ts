import { RASHI_LORDS } from "../vedic/lords";
import type { DashaPlanet } from "../vedic/dasha";
import type { ChartResult, Grahas } from "../types";

import { DOMAIN_CONFIGS, type DomainConfig } from "./config";
import { FLAVOR_TEXT } from "./flavor-text";
import { classifyHouseStrength, STRENGTH_PHRASES } from "./strength";
import type { DomainInterpretation, HouseStrength } from "./types";

const GRAHA_KEY: Record<DashaPlanet, keyof Grahas<unknown>> = {
  Sun: "sun",
  Moon: "moon",
  Mars: "mars",
  Mercury: "mercury",
  Jupiter: "jupiter",
  Venus: "venus",
  Saturn: "saturn",
  Rahu: "rahu",
  Ketu: "ketu",
};

interface Placement {
  houseNumber?: number;
  sign: string;
}

function placementOf(result: ChartResult, planet: DashaPlanet): Placement {
  const body = result[GRAHA_KEY[planet]];
  return { houseNumber: body.house, sign: body.rashi.signName };
}

/**
 * Computes one domain's interpretation from the real chart. When the
 * birth time is exact, the dynamic sentence is grounded in whole-sign
 * house placement (the domain's house, its lord, and where that lord
 * actually sits) — the standard classical technique. Without an exact
 * time, houses can't be computed at all, so the reading instead leans
 * on the Moon sign, transparently noting the fallback rather than
 * fabricating a house placement.
 */
export function interpretDomain(config: DomainConfig, result: ChartResult): DomainInterpretation {
  const ascendantSignIndex = result.ascendant?.rashi.signIndex;
  const flavorSign = result.ascendant?.rashi.signName ?? result.moon.rashi.signName;
  const flavor = FLAVOR_TEXT[config.key][flavorSign] ?? "";

  if (ascendantSignIndex === undefined) {
    const summary = `${config.title} ${config.framingVerb}. Your exact birth time isn't set, so this reading leans on your Moon sign, ${result.moon.rashi.signName}, rather than house placements.`;
    return {
      key: config.key,
      title: config.title,
      house: 0,
      houseSign: result.moon.rashi.signName,
      lord: "Moon",
      lordSign: result.moon.rashi.signName,
      strength: "supportive",
      summary,
      flavor,
    };
  }

  if (config.planet) {
    const { houseNumber, sign } = placementOf(result, config.planet);
    const strength: HouseStrength = houseNumber ? classifyHouseStrength(houseNumber) : "supportive";
    const summary = `${config.planet} ${config.framingVerb}; in your chart it sits in your ${ordinal(houseNumber ?? 0)} house in ${sign} — ${STRENGTH_PHRASES[strength]}.`;
    return {
      key: config.key,
      title: config.title,
      house: houseNumber ?? 0,
      houseSign: sign,
      lord: config.planet,
      lordHouse: houseNumber,
      lordSign: sign,
      strength,
      summary,
      flavor,
    };
  }

  const houseNumber = config.house!;
  const houseSignIndex = (ascendantSignIndex + houseNumber - 1) % 12;
  const houseSign = SIGN_NAMES[houseSignIndex]!;
  const lord = rasiLordBySignIndex(houseSignIndex);
  const { houseNumber: lordHouse, sign: lordSign } = placementOf(result, lord);
  const strength: HouseStrength = lordHouse ? classifyHouseStrength(lordHouse) : "supportive";
  const summary = `Your ${ordinal(houseNumber)} house (${houseSign}) ${config.framingVerb}. It's ruled by ${lord}, who sits in your ${ordinal(lordHouse ?? 0)} house in ${lordSign} — ${STRENGTH_PHRASES[strength]}.`;

  return {
    key: config.key,
    title: config.title,
    house: houseNumber,
    houseSign,
    lord,
    lordHouse,
    lordSign,
    strength,
    summary,
    flavor,
  };
}

export function interpretAllDomains(result: ChartResult): DomainInterpretation[] {
  return DOMAIN_CONFIGS.map((config) => interpretDomain(config, result));
}

const SIGN_NAMES = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
] as const;

function rasiLordBySignIndex(signIndex: number): DashaPlanet {
  return RASHI_LORDS[signIndex]!;
}

function ordinal(n: number): string {
  if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1: return `${n}st`;
    case 2: return `${n}nd`;
    case 3: return `${n}rd`;
    default: return `${n}th`;
  }
}
