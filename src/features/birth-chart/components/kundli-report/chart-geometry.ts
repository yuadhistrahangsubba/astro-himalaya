import type { ChartResult } from "@/services/astrology";

export interface ChartPlacement {
  abbreviation: string;
  /** 0-11, Aries=0 ... Pisces=11 (i.e. `ZodiacPlacement.signIndex`). */
  signIndex: number;
}

const GRAHA_ABBR = {
  sun: "Su",
  moon: "Mo",
  mars: "Ma",
  mercury: "Me",
  jupiter: "Ju",
  venus: "Ve",
  saturn: "Sa",
  rahu: "Ra",
  ketu: "Ke",
  uranus: "Ur",
  neptune: "Ne",
  pluto: "Pl",
} as const;

const GRAHA_ORDER = Object.keys(GRAHA_ABBR) as (keyof typeof GRAHA_ABBR)[];

/**
 * Every classical graha plus the outer planets, abbreviated and placed by
 * rashi — shared by the Lagna chart and the PDF export. Retrograde bodies
 * get a trailing "R" (e.g. "Ma R"), the convention printed on ephemeris
 * tables elsewhere. Rahu/Ketu are deliberately excluded from the marker
 * even though `result.rahu.retrograde`/`result.ketu.retrograde` are
 * always `true` — the mean node always regresses, so the flag carries no
 * chart-specific information for them, and this diamond chart's boxes are
 * cramped enough already without a permanently-redundant "R". The Navamsa
 * chart below omits the marker entirely — retrograde describes real-time
 * motion, not something the D9 division itself carries.
 */
const RETROGRADE_ELIGIBLE = new Set<keyof typeof GRAHA_ABBR>(["mars", "mercury", "jupiter", "venus", "saturn", "uranus", "neptune", "pluto"]);

export function lagnaPlacements(result: ChartResult): ChartPlacement[] {
  return GRAHA_ORDER.map((body) => ({
    abbreviation: RETROGRADE_ELIGIBLE.has(body) && result[body].retrograde ? `${GRAHA_ABBR[body]} R` : GRAHA_ABBR[body],
    signIndex: result[body].rashi.signIndex,
  }));
}

export function navamsaPlacements(result: ChartResult): ChartPlacement[] {
  return GRAHA_ORDER.map((body) => ({ abbreviation: GRAHA_ABBR[body], signIndex: result.navamsa[body].signIndex }));
}

export type Point = readonly [number, number];

/**
 * The classical North Indian chart: an outer square, a diamond connecting
 * the midpoints of its sides, and both of the square's corner-to-corner
 * diagonals. That produces 12 fixed regions — 4 "kite" quadrilaterals
 * (touching the top/right/bottom/left edge midpoints) and 8 corner
 * triangles — and each region is a FIXED rashi (Aries=1 ... Pisces=12) in
 * every North Indian chart, regardless of the Ascendant; only which
 * grahas fall in which box changes.
 *
 * This exact box layout — which rashi number lands in which of the 12
 * regions — was reverse-engineered pixel-by-pixel from AstroSage's own
 * reference chart (real birth data, cross-checked against every
 * non-empty box: Scorpio->8, Sagittarius->9, Gemini->3, Aries->1,
 * Taurus->2, Capricorn->10, Aquarius->11 all matched), not assumed from
 * memory — North Indian house-drawing conventions vary enough between
 * software that this was worth verifying against a real fixture. Shared
 * by both the on-screen SVG chart and the PDF renderer so there's only
 * one place this geometry is defined.
 */
const TL: Point = [0, 0];
const TR: Point = [400, 0];
const BR: Point = [400, 400];
const BL: Point = [0, 400];
const TM: Point = [200, 0];
const RM: Point = [400, 200];
const BM: Point = [200, 400];
const LM: Point = [0, 200];
const O: Point = [200, 200];
const A: Point = [100, 100];
const B: Point = [300, 100];
const C: Point = [300, 300];
const D: Point = [100, 300];

interface BoxDef {
  points: readonly Point[];
  /** The vertex nearest the box's number label — the shared crossing point for corner triangles, the center for kites. */
  inner: Point;
}

/** Keyed by rashi number, 1 = Aries ... 12 = Pisces. */
const BOXES: Record<number, BoxDef> = {
  1: { points: [BR, BM, C], inner: C },
  2: { points: [RM, BR, C], inner: C },
  3: { points: [O, B, RM, C], inner: O },
  4: { points: [TR, RM, B], inner: B },
  5: { points: [TM, TR, B], inner: B },
  6: { points: [O, A, TM, B], inner: O },
  7: { points: [TL, TM, A], inner: A },
  8: { points: [TL, A, LM], inner: A },
  9: { points: [O, A, LM, D], inner: O },
  10: { points: [BL, LM, D], inner: D },
  11: { points: [BL, D, BM], inner: D },
  12: { points: [O, C, BM, D], inner: O },
};

/** The 4 diamond edges plus the 2 corner-to-corner diagonals — every internal line in the chart. */
export const NORTH_INDIAN_LINES: readonly [Point, Point][] = [
  [TM, LM],
  [TM, RM],
  [RM, BM],
  [BM, LM],
  [TL, BR],
  [TR, BL],
];

function centroid(points: readonly Point[]): Point {
  const [sx, sy] = points.reduce(([ax, ay], [x, y]) => [ax + x, ay + y], [0, 0]);
  return [sx / points.length, sy / points.length];
}

function lerp(from: Point, to: Point, t: number): Point {
  return [from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t];
}

export interface ChartBoxLayout {
  rashiNumber: number;
  points: readonly Point[];
  numberPos: Point;
  stackAnchor: Point;
  firstLineY: number;
  bodies: ChartPlacement[];
  isAscendant: boolean;
}

/** Lays out all 12 boxes for one chart, with each box's bodies already stacked and vertically centered. */
export function layoutNorthIndianChart(
  placements: readonly ChartPlacement[],
  ascendantSignIndex: number | undefined,
  lineHeight = 24,
): ChartBoxLayout[] {
  const byBox = new Map<number, ChartPlacement[]>();
  for (const placement of placements) {
    const rashiNumber = placement.signIndex + 1;
    const list = byBox.get(rashiNumber) ?? [];
    list.push(placement);
    byBox.set(rashiNumber, list);
  }
  const ascendantBox = ascendantSignIndex !== undefined ? ascendantSignIndex + 1 : undefined;

  return Array.from({ length: 12 }, (_, i) => i + 1).map((rashiNumber) => {
    const box = BOXES[rashiNumber]!;
    const boxCentroid = centroid(box.points);
    const numberPos = lerp(box.inner, boxCentroid, 0.3);
    const stackAnchor = lerp(box.inner, boxCentroid, 0.68);
    const bodies = byBox.get(rashiNumber) ?? [];
    const isAscendant = rashiNumber === ascendantBox;
    const firstLineY = stackAnchor[1] - ((bodies.length - 1) * lineHeight) / 2 + (isAscendant ? lineHeight * 0.6 : 0);

    return { rashiNumber, points: box.points, numberPos, stackAnchor, firstLineY, bodies, isAscendant };
  });
}
