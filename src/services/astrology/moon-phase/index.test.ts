import { describe, expect, it } from "vitest";

import { calculateMoonPhase } from "./index";

describe("calculateMoonPhase", () => {
  it("is a New Moon with 0 illumination when Sun and Moon are aligned", () => {
    const result = calculateMoonPhase(100, 100);
    expect(result.name).toBe("New Moon");
    expect(result.illuminatedFraction).toBeCloseTo(0, 6);
  });

  it("is a Full Moon with full illumination when Moon is opposite the Sun", () => {
    const result = calculateMoonPhase(280, 100);
    expect(result.name).toBe("Full Moon");
    expect(result.illuminatedFraction).toBeCloseTo(1, 6);
  });

  it("is First Quarter with half illumination 90 degrees ahead of the Sun", () => {
    const result = calculateMoonPhase(190, 100);
    expect(result.name).toBe("First Quarter");
    expect(result.illuminatedFraction).toBeCloseTo(0.5, 6);
  });

  it("is Last Quarter 90 degrees behind the Sun", () => {
    const result = calculateMoonPhase(10, 100);
    expect(result.name).toBe("Last Quarter");
    expect(result.illuminatedFraction).toBeCloseTo(0.5, 6);
  });
});
