import { cn } from "@/lib/utils";

import { layoutNorthIndianChart, NORTH_INDIAN_LINES, type ChartPlacement } from "./chart-geometry";

export type { ChartPlacement };

interface NorthIndianChartProps {
  title: string;
  placements: readonly ChartPlacement[];
  /** 0-11 — the box housing this sign gets a small "Asc" marker. */
  ascendantSignIndex?: number;
  className?: string;
}

const LINE_HEIGHT = 24;

export function NorthIndianChart({ title, placements, ascendantSignIndex, className }: NorthIndianChartProps) {
  const boxes = layoutNorthIndianChart(placements, ascendantSignIndex, LINE_HEIGHT);

  return (
    <figure className={cn("flex flex-col items-center", className)}>
      <svg viewBox="0 0 400 400" className="w-full max-w-[22rem]" role="img" aria-label={title}>
        <rect x="1" y="1" width="398" height="398" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />
        {NORTH_INDIAN_LINES.map(([[x1, y1], [x2, y2]], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.5" className="text-border" />
        ))}

        {boxes.map(({ rashiNumber, numberPos, stackAnchor, firstLineY, bodies, isAscendant }) => (
          <g key={rashiNumber}>
            <text
              x={numberPos[0]}
              y={numberPos[1]}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground/60 font-dense"
              fontSize="13"
            >
              {rashiNumber}
            </text>
            {isAscendant && (
              <text
                x={stackAnchor[0]}
                y={firstLineY - LINE_HEIGHT * 0.9}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-gold font-dense font-bold uppercase"
                fontSize="11"
                letterSpacing="1.5"
              >
                Asc
              </text>
            )}
            {bodies.map((body, i) => (
              <text
                key={body.abbreviation + i}
                x={stackAnchor[0]}
                y={firstLineY + i * LINE_HEIGHT}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground font-sans font-semibold"
                fontSize="17"
              >
                {body.abbreviation}
              </text>
            ))}
          </g>
        ))}
      </svg>
      <figcaption className="mt-3 font-dense text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
        {title}
      </figcaption>
    </figure>
  );
}
