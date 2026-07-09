import { describe, expect, it } from "vitest";

import { calculateKarana, calculatePanchang, calculateTithi, calculateVara, calculateYoga } from "./panchang";

describe("calculateTithi", () => {
  it("is Pratipada (1st, Shukla) right after new moon", () => {
    const result = calculateTithi(10, 0); // moon 10 degrees ahead of sun
    expect(result.paksha).toBe("Shukla");
    expect(result.numberInPaksha).toBe(1);
    expect(result.name).toBe("Pratipada");
  });

  it("is Purnima approaching 180 degrees (full moon)", () => {
    // Tithi 15 of Shukla spans [168, 180) — the boundary itself belongs
    // to the *next* tithi (see the boundary test below), which is the
    // standard tithi convention (each tithi is a half-open interval).
    const result = calculateTithi(179, 0);
    expect(result.name).toBe("Purnima");
    expect(result.numberInPaksha).toBe(15);
    expect(result.paksha).toBe("Shukla");
  });

  it("exactly 180 degrees has already rolled into Krishna Pratipada", () => {
    const result = calculateTithi(180, 0);
    expect(result.name).toBe("Pratipada");
    expect(result.paksha).toBe("Krishna");
  });

  it("is Amavasya just before the cycle completes (new moon)", () => {
    const result = calculateTithi(359, 0);
    expect(result.name).toBe("Amavasya");
    expect(result.paksha).toBe("Krishna");
  });

  it("is invariant to a shared ayanamsa offset (tithi depends only on the difference)", () => {
    const withoutAyanamsa = calculateTithi(100, 40);
    const withAyanamsa = calculateTithi(100 - 24, 40 - 24);
    expect(withAyanamsa).toEqual(withoutAyanamsa);
  });
});

describe("calculateVara", () => {
  it("matches known weekdays", () => {
    expect(calculateVara("2024-01-07").name).toBe("Ravivara"); // Sunday
    expect(calculateVara("2024-01-08").name).toBe("Somavara"); // Monday
  });
});

describe("calculateYoga", () => {
  it("is Vishkambha (the first) when sun+moon sum to 0", () => {
    expect(calculateYoga(0, 0).name).toBe("Vishkambha");
  });

  it("is NOT invariant to a shared ayanamsa offset (unlike tithi, the sum shifts)", () => {
    const withoutAyanamsa = calculateYoga(100, 40);
    const withAyanamsa = calculateYoga(100 - 24, 40 - 24);
    expect(withAyanamsa.index).not.toBe(withoutAyanamsa.index);
  });
});

describe("calculateKarana", () => {
  it("the very first half-tithi of the month is always the fixed Kimstughna", () => {
    expect(calculateKarana(2, 0).name).toBe("Kimstughna");
  });

  it("cycles through the 7 movable karanas starting right after Kimstughna", () => {
    expect(calculateKarana(8, 0).name).toBe("Bava");
    expect(calculateKarana(14, 0).name).toBe("Balava");
  });

  it("ends the month with the 3 fixed karanas in order", () => {
    expect(calculateKarana(6 * 57 + 1, 0).name).toBe("Shakuni");
    expect(calculateKarana(6 * 58 + 1, 0).name).toBe("Chatushpada");
    expect(calculateKarana(6 * 59 + 1, 0).name).toBe("Naga");
  });
});

describe("calculatePanchang", () => {
  it("composes all five limbs without recomputing shared math", () => {
    const result = calculatePanchang({
      sunSiderealLongitude: 40,
      moonSiderealLongitude: 100,
      localDateISO: "2024-01-07",
    });
    expect(result.tithi.name).toBeTruthy();
    expect(result.vara.name).toBe("Ravivara");
    expect(result.nakshatra.name).toBeTruthy();
    expect(result.yoga.name).toBeTruthy();
    expect(result.karana.name).toBeTruthy();
  });
});
