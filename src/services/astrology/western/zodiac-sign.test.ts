import { describe, expect, it } from "vitest";

import { tropicalZodiacSign } from "./zodiac-sign";

describe("tropicalZodiacSign", () => {
  it("places 0 degrees tropical longitude in Aries", () => {
    expect(tropicalZodiacSign(0).signName).toBe("Aries");
  });

  it("places 200 degrees tropical longitude in Libra, 20 degrees in", () => {
    // Libra spans 180-210 degrees; Scorpio would be 210-240.
    const result = tropicalZodiacSign(200);
    expect(result.signName).toBe("Libra");
    expect(result.degreesInSign).toBeCloseTo(20, 10);
  });
});
