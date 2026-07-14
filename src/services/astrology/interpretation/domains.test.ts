import { describe, expect, it } from "vitest";

import { computeChart } from "../index";

import { DOMAIN_CONFIGS } from "./config";
import { interpretAllDomains, interpretDomain } from "./domains";

const withTime = {
  birthDate: "2001-06-07",
  birthTime: "13:15",
  timezone: "Asia/Thimphu",
  latitude: 27 + 1 / 60,
  longitude: 90 + 7 / 60,
};

describe("interpretAllDomains", () => {
  it("produces all 10 domains with non-empty summary and flavor text", () => {
    const chart = computeChart(withTime);
    const domains = interpretAllDomains(chart);
    expect(domains).toHaveLength(10);
    for (const domain of domains) {
      expect(domain.summary.length).toBeGreaterThan(10);
      expect(domain.flavor.length).toBeGreaterThan(10);
    }
  });

  it("grounds house-driven domains in the real Ascendant (Virgo) for the reference chart", () => {
    const chart = computeChart(withTime);
    const character = interpretDomain(DOMAIN_CONFIGS[0]!, chart); // house 1 = Lagna
    expect(character.houseSign).toBe("Virgo");
    expect(character.lord).toBe("Mercury"); // Virgo's lord
  });

  it("planet-driven domains read straight from the graha's own placement", () => {
    const chart = computeChart(withTime);
    const lifestyle = interpretDomain(DOMAIN_CONFIGS.find((d) => d.key === "lifestyle")!, chart);
    expect(lifestyle.lord).toBe("Moon");
    expect(lifestyle.lordSign).toBe(chart.moon.rashi.signName);
  });

  it("falls back to the Moon sign, without fabricating a house, when birth time is unknown", () => {
    const chart = computeChart({ ...withTime, birthTime: undefined });
    const domains = interpretAllDomains(chart);
    for (const domain of domains) {
      expect(domain.summary).toContain(chart.moon.rashi.signName);
    }
  });
});
