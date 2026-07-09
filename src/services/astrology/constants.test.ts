import { describe, expect, it } from "vitest";

import { namedSignFromLongitude, ZODIAC_SIGNS } from "./constants";

describe("namedSignFromLongitude", () => {
  it("attaches the correct name for the first degree of each sign", () => {
    for (let i = 0; i < 12; i++) {
      const result = namedSignFromLongitude(i * 30);
      expect(result.signIndex).toBe(i);
      expect(result.signName).toBe(ZODIAC_SIGNS[i]);
      expect(result.degreesInSign).toBe(0);
    }
  });

  it("has exactly 12 sign names", () => {
    expect(ZODIAC_SIGNS).toHaveLength(12);
  });
});
