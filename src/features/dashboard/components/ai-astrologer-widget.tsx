"use client";

import { Sparkles } from "lucide-react";

import { WidgetCard } from "./widget-card";

const SUGGESTED = [
  "What does my current dasha mean?",
  "Explain my Moon nakshatra",
  "Is this week good for new beginnings?",
] as const;

/**
 * Coming-soon state, deliberately not a working input — a chat box that
 * swallows questions silently would be worse than none. The layout is
 * final so wiring a model in later changes logic, not design.
 */
export function AiAstrologerWidget({ className }: { className?: string }) {
  return (
    <WidgetCard label="AI Astrologer" className={className}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/8">
            <Sparkles className="size-4 text-gold" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-medium">
              Ask the sky anything{" "}
              <span className="ml-1 rounded bg-gold/15 px-1.5 py-0.5 font-dense text-[9px] tracking-[0.15em] text-gold uppercase">
                Coming soon
              </span>
            </p>
            <p className="mt-1 max-w-md text-xs leading-relaxed text-muted-foreground">
              Conversational readings grounded in your real chart data — in review before launch so
              answers cite the computed sky, not vibes.
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 sm:max-w-md">
          <div
            aria-disabled="true"
            className="flex h-10 items-center rounded-lg border border-input bg-secondary/30 px-3 text-sm text-muted-foreground/50 select-none"
          >
            Ask about your chart…
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED.map((question) => (
              <span
                key={question}
                className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-muted-foreground/60 select-none"
              >
                {question}
              </span>
            ))}
          </div>
        </div>
      </div>
    </WidgetCard>
  );
}
