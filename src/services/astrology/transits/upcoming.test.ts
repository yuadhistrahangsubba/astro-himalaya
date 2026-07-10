import { describe, expect, it } from "vitest";

import { findUpcomingLunarEvents } from "./upcoming";

const DAY_MS = 24 * 60 * 60 * 1000;

describe("findUpcomingLunarEvents", () => {
  const from = new Date("2024-01-01T00:00:00Z");
  const events = findUpcomingLunarEvents(from, 40);

  it("finds the known new moon of 2024-01-11 (~11:57 UTC) within the Moon series' accuracy", () => {
    const newMoon = events.find((e) => e.name === "New Moon");
    expect(newMoon).toBeDefined();
    const reference = new Date("2024-01-11T11:57:00Z").getTime();
    expect(Math.abs(newMoon!.at.getTime() - reference)).toBeLessThan(0.15 * DAY_MS);
  });

  it("finds the known full moon of 2024-01-25 (~17:54 UTC) within the Moon series' accuracy", () => {
    const fullMoon = events.find((e) => e.name === "Full Moon");
    expect(fullMoon).toBeDefined();
    const reference = new Date("2024-01-25T17:54:00Z").getTime();
    expect(Math.abs(fullMoon!.at.getTime() - reference)).toBeLessThan(0.15 * DAY_MS);
  });

  it("returns events in strictly ascending time order", () => {
    for (let i = 1; i < events.length; i++) {
      expect(events[i]!.at.getTime()).toBeGreaterThan(events[i - 1]!.at.getTime());
    }
  });

  it("spaces consecutive new moons by one synodic month (~29.53 days)", () => {
    const newMoons = events.filter((e) => e.name === "New Moon");
    expect(newMoons.length).toBeGreaterThanOrEqual(2);
    const gapDays = (newMoons[1]!.at.getTime() - newMoons[0]!.at.getTime()) / DAY_MS;
    expect(gapDays).toBeGreaterThan(29.1);
    expect(gapDays).toBeLessThan(30);
  });

  it("covers the full 8-target cycle within 40 days", () => {
    const names = new Set(events.map((e) => e.name));
    expect(names.size).toBe(8);
  });
});
