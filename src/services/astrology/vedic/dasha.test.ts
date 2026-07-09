import { describe, expect, it } from "vitest";

import { calculateVimshottariDasha, DASHA_YEARS, findMahadashaAt } from "./dasha";

describe("DASHA_YEARS", () => {
  it("sums to the well-known 120-year Vimshottari cycle", () => {
    const total = Object.values(DASHA_YEARS).reduce((sum, years) => sum + years, 0);
    expect(total).toBe(120);
  });
});

describe("calculateVimshottariDasha", () => {
  it("starts with Ketu's full 7-year term when the Moon is at the very start of Ashwini", () => {
    const birth = new Date("2000-01-01T00:00:00Z");
    const [first] = calculateVimshottariDasha(0, birth, 1);
    expect(first!.planet).toBe("Ketu");
    expect(first!.durationYears).toBeCloseTo(7, 6);
    expect(first!.startDate).toEqual(birth);
  });

  it("gives a partial first period proportional to how far through the nakshatra the Moon already is", () => {
    const nakshatraSpan = 360 / 27;
    const halfway = nakshatraSpan / 2; // half of Ashwini already elapsed
    const [first] = calculateVimshottariDasha(halfway, new Date("2000-01-01T00:00:00Z"), 1);
    expect(first!.planet).toBe("Ketu");
    expect(first!.durationYears).toBeCloseTo(3.5, 6); // half of 7 years remaining
  });

  it("cycles through the fixed 9-planet sequence in order, wrapping around", () => {
    const periods = calculateVimshottariDasha(0, new Date("2000-01-01T00:00:00Z"), 10);
    const planets = periods.map((p) => p.planet);
    expect(planets).toEqual([
      "Ketu",
      "Venus",
      "Sun",
      "Moon",
      "Mars",
      "Rahu",
      "Jupiter",
      "Saturn",
      "Mercury",
      "Ketu", // wraps back around for the 10th period
    ]);
  });

  it("chains periods back to back with no gaps or overlaps", () => {
    const periods = calculateVimshottariDasha(0, new Date("2000-01-01T00:00:00Z"), 5);
    for (let i = 1; i < periods.length; i++) {
      expect(periods[i]!.startDate).toEqual(periods[i - 1]!.endDate);
    }
  });
});

describe("findMahadashaAt", () => {
  it("finds the period covering a given moment", () => {
    const periods = calculateVimshottariDasha(0, new Date("2000-01-01T00:00:00Z"), 3);
    const midwayThroughVenus = new Date("2005-01-01T00:00:00Z"); // Ketu 7yr ends 2007, so this is within Ketu
    const active = findMahadashaAt(periods, midwayThroughVenus);
    expect(active?.planet).toBe("Ketu");
  });

  it("returns undefined for a date outside every period", () => {
    const periods = calculateVimshottariDasha(0, new Date("2000-01-01T00:00:00Z"), 1);
    expect(findMahadashaAt(periods, new Date("2100-01-01T00:00:00Z"))).toBeUndefined();
  });
});
