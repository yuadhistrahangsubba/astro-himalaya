import { describe, expect, it } from "vitest";

import { calculateHouseCusps, houseForLongitude } from "./houses";

describe("calculateHouseCusps", () => {
  it("whole-sign snaps house 1 to the start of the ascendant's sign", () => {
    const { cusps } = calculateHouseCusps(125, "whole-sign"); // Leo, 5 degrees in
    expect(cusps[0]).toBe(120); // start of Leo
    expect(cusps[1]).toBe(150); // start of Virgo
    expect(cusps).toHaveLength(12);
  });

  it("whole-sign wraps correctly across the Pisces/Aries boundary", () => {
    const { cusps } = calculateHouseCusps(355, "whole-sign"); // Pisces
    expect(cusps[0]).toBe(330);
    expect(cusps[11]).toBe(300);
  });

  it("equal house starts exactly at the ascendant degree", () => {
    const { cusps } = calculateHouseCusps(125, "equal");
    expect(cusps[0]).toBe(125);
    expect(cusps[1]).toBe(155);
  });

  it("equal house cusps wrap past 360", () => {
    const { cusps } = calculateHouseCusps(350, "equal");
    expect(cusps[0]).toBe(350);
    expect(cusps[1]).toBeCloseTo(20, 10);
  });
});

describe("houseForLongitude", () => {
  it("finds the correct house for a whole-sign chart", () => {
    const { cusps } = calculateHouseCusps(125, "whole-sign"); // house 1 = Leo (120-150)
    expect(houseForLongitude(cusps, 140)).toBe(1);
    expect(houseForLongitude(cusps, 150)).toBe(2);
    expect(houseForLongitude(cusps, 119)).toBe(12);
  });

  it("finds the correct house for an equal-house chart, including wraparound", () => {
    const { cusps } = calculateHouseCusps(350, "equal"); // house 1 starts at 350
    expect(houseForLongitude(cusps, 355)).toBe(1);
    expect(houseForLongitude(cusps, 5)).toBe(1); // still within 350-20 wraparound house
    expect(houseForLongitude(cusps, 25)).toBe(2);
  });

  it("rejects a malformed cusp list", () => {
    expect(() => houseForLongitude([0, 30, 60], 10)).toThrow(RangeError);
  });
});
