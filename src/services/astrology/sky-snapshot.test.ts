import { describe, expect, it } from "vitest";

import { normalizeDegrees } from "./astronomy/angles";
import { computeSkySnapshot } from "./sky-snapshot";

describe("computeSkySnapshot", () => {
  const at = new Date("2024-01-07T06:00:00Z");
  const snapshot = computeSkySnapshot(at, "2024-01-07");

  it("places both luminaries with all three tradition views", () => {
    for (const body of [snapshot.sun, snapshot.moon]) {
      expect(body.rashi.signName).toBeTruthy();
      expect(body.nakshatra.name).toBeTruthy();
      expect(body.westernSign.signName).toBeTruthy();
    }
  });

  it("moon phase angle equals the tropical elongation of Moon from Sun", () => {
    const elongation = normalizeDegrees(
      snapshot.moon.tropicalLongitude - snapshot.sun.tropicalLongitude,
    );
    expect(snapshot.moonPhase.phaseAngle).toBeCloseTo(elongation, 10);
  });

  it("panchang tithi is consistent with the same sidereal longitudes", () => {
    // Tithi index must equal floor(sidereal elongation / 12) for the
    // exact longitudes the snapshot placed — proves the snapshot feeds
    // one set of positions to every limb instead of recomputing.
    const siderealElongation = normalizeDegrees(
      snapshot.moon.siderealLongitude - snapshot.sun.siderealLongitude,
    );
    expect(snapshot.panchang.tithi.index).toBe(Math.floor(siderealElongation / 12));
  });

  it("uses the provided local date for the vara", () => {
    expect(computeSkySnapshot(at, "2024-01-07").panchang.vara.name).toBe("Ravivara"); // Sunday
    expect(computeSkySnapshot(at, "2024-01-08").panchang.vara.name).toBe("Somavara"); // Monday
  });
});
