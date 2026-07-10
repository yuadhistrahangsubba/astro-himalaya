/** Default observer until user accounts carry a saved location. */
export const OBSERVER = {
  place: "Thimphu",
  latitude: 27.4712,
  longitude: 89.6339,
  timezone: "Asia/Thimphu",
} as const;

/**
 * Traditional colors of each weekday's ruling planet (Navagraha
 * association — the weekday/planet pairing is literally what the days
 * are named for, in both the Vedic and Western calendars). Indexed by
 * vara (0 = Sunday). Presentation content, not calculation.
 */
export const VARA_COLORS: readonly {
  planet: string;
  colors: readonly { name: string; swatch: string }[];
}[] = [
  { planet: "Sun", colors: [{ name: "Copper red", swatch: "#B87333" }, { name: "Gold", swatch: "#D4A843" }] },
  { planet: "Moon", colors: [{ name: "White", swatch: "#F5F2EA" }, { name: "Pearl", swatch: "#EAE0D5" }] },
  { planet: "Mars", colors: [{ name: "Red", swatch: "#C0392B" }, { name: "Coral", swatch: "#E8735C" }] },
  { planet: "Mercury", colors: [{ name: "Green", swatch: "#3E8E5A" }, { name: "Emerald", swatch: "#2ECC71" }] },
  { planet: "Jupiter", colors: [{ name: "Yellow", swatch: "#E9C46A" }, { name: "Saffron", swatch: "#E76F1B" }] },
  { planet: "Venus", colors: [{ name: "White", swatch: "#F5F2EA" }, { name: "Rose", swatch: "#E8A0BF" }] },
  { planet: "Saturn", colors: [{ name: "Deep blue", swatch: "#2C3E6B" }, { name: "Iron grey", swatch: "#4A4E58" }] },
] as const;
