import { describe, expect, it } from "vitest";

import { angularSeparation, calculateTransitAspects, matchClassicalAspect } from "./index";

describe("angularSeparation", () => {
  it("is 0 for identical longitudes", () => {
    expect(angularSeparation(100, 100)).toBe(0);
  });

  it("takes the short way around past 180 degrees", () => {
    expect(angularSeparation(10, 350)).toBeCloseTo(20, 10);
  });

  it("never exceeds 180 degrees", () => {
    expect(angularSeparation(0, 179)).toBeLessThanOrEqual(180);
    expect(angularSeparation(0, 181)).toBeLessThanOrEqual(180);
  });
});

describe("matchClassicalAspect", () => {
  it("matches an exact conjunction", () => {
    expect(matchClassicalAspect(0)).toBe("Conjunction");
  });

  it("matches within orb but not outside it", () => {
    expect(matchClassicalAspect(92, 6)).toBe("Square");
    expect(matchClassicalAspect(100, 6)).toBeNull();
  });

  it("matches trine and opposition", () => {
    expect(matchClassicalAspect(120)).toBe("Trine");
    expect(matchClassicalAspect(180)).toBe("Opposition");
  });
});

describe("calculateTransitAspects", () => {
  it("produces one aspect entry per natal x transiting pairing", () => {
    const natal = { Sun: 10, Moon: 100 };
    const transiting = { Mars: 10, Saturn: 190 };
    const aspects = calculateTransitAspects(natal, transiting);

    expect(aspects).toHaveLength(4);
    const sunMars = aspects.find((a) => a.natalBody === "Sun" && a.transitingBody === "Mars");
    expect(sunMars?.aspectName).toBe("Conjunction");
    const moonSaturn = aspects.find((a) => a.natalBody === "Moon" && a.transitingBody === "Saturn");
    expect(moonSaturn?.aspectName).toBe("Square"); // |190-100|=90 degrees
  });
});
