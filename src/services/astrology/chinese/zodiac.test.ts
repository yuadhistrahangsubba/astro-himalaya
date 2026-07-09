import { describe, expect, it } from "vitest";

import { chineseZodiacForYear } from "./zodiac";

describe("chineseZodiacForYear", () => {
  it("matches the reference anchor year exactly (1984 = Wood Rat)", () => {
    expect(chineseZodiacForYear(1984)).toEqual({ animal: "Rat", element: "Wood" });
  });

  it("matches a well-known later year (2000 = Metal Dragon)", () => {
    expect(chineseZodiacForYear(2000)).toEqual({ animal: "Dragon", element: "Metal" });
  });

  it("repeats the animal cycle every 12 years", () => {
    expect(chineseZodiacForYear(1984 + 12).animal).toBe("Rat");
    expect(chineseZodiacForYear(1984 - 12).animal).toBe("Rat");
  });

  it("repeats the full 60-year sexagenary cycle exactly", () => {
    expect(chineseZodiacForYear(1984 + 60)).toEqual(chineseZodiacForYear(1984));
  });

  it("handles years before the reference year correctly", () => {
    expect(chineseZodiacForYear(1900)).toEqual({ animal: "Rat", element: "Metal" });
  });
});
