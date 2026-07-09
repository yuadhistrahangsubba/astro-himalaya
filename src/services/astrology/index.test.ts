import { describe, expect, it } from "vitest";

import { computeChart } from "./index";

describe("computeChart", () => {
  const withTime = {
    birthDate: "1998-04-12",
    birthTime: "06:15",
    timezone: "Asia/Thimphu",
    latitude: 27.4712,
    longitude: 89.6339,
  };

  it("places Sun and Moon with real sidereal and tropical signs", () => {
    const chart = computeChart(withTime);
    expect(chart.sun.rashi.signName).toBeTruthy();
    expect(chart.sun.westernSign.signName).toBeTruthy();
    expect(chart.moon.nakshatra.name).toBeTruthy();
    expect(chart.timeConfidence).toBe("exact");
  });

  it("computes an ascendant and both house systems when birth time is known", () => {
    const chart = computeChart(withTime);
    expect(chart.ascendant).toBeDefined();
    expect(chart.ascendant!.tropicalLongitude).toBeGreaterThanOrEqual(0);
    expect(chart.ascendant!.tropicalLongitude).toBeLessThan(360);
    expect(chart.houses?.western.cusps).toHaveLength(12);
    expect(chart.houses?.vedic.cusps).toHaveLength(12);
  });

  it("omits ascendant and houses entirely when birth time is unknown, rather than guessing", () => {
    const chart = computeChart({ ...withTime, birthTime: undefined });
    expect(chart.timeConfidence).toBe("date-only");
    expect(chart.ascendant).toBeUndefined();
    expect(chart.houses).toBeUndefined();
  });

  it("still computes Sun/Moon/Panchang/Dasha even without an exact time", () => {
    const chart = computeChart({ ...withTime, birthTime: undefined });
    expect(chart.sun.rashi.signName).toBeTruthy();
    expect(chart.panchang.tithi.name).toBeTruthy();
    expect(chart.vimshottariDasha.length).toBeGreaterThan(0);
  });

  it("lists every planet beyond Sun/Moon as unavailable rather than fabricating a position", () => {
    const chart = computeChart(withTime);
    expect(chart.unavailableBodies).toEqual(
      expect.arrayContaining(["mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"]),
    );
    expect(chart.unavailableBodies).toHaveLength(8);
  });

  it("produces a sensible Julian day and ayanamsa for a known date", () => {
    const chart = computeChart(withTime);
    expect(chart.julianDayUtc).toBeGreaterThan(2450000); // sometime after 1995
    expect(chart.ayanamsaDegrees).toBeGreaterThan(23);
    expect(chart.ayanamsaDegrees).toBeLessThan(25);
  });
});
