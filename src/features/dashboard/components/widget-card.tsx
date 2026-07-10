"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const widgetVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 110, damping: 18 },
  },
};

interface WidgetCardProps {
  label: string;
  live?: boolean;
  footnote?: string;
  className?: string;
  children: ReactNode;
}

/**
 * The one panel every dashboard widget lives in — glass, soft depth, a
 * quiet 2px hover lift, and an optional LIVE tick for widgets whose
 * data actually recomputes. Terminal density comes from the widgets'
 * contents; the frame stays calm.
 */
export function WidgetCard({ label, live = false, footnote, className, children }: WidgetCardProps) {
  return (
    <motion.section
      variants={widgetVariants}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "relative flex h-full flex-col rounded-xl border border-white/10 bg-card/70 p-5 shadow-xl shadow-black/30 backdrop-blur-md",
        className,
      )}
    >
      <header className="flex items-center justify-between gap-3">
        <h2 className="font-dense text-[10px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
          {label}
        </h2>
        {live && <LiveTick />}
      </header>
      <div className="mt-3 flex-1">{children}</div>
      {footnote && <p className="mt-3 text-[11px] leading-snug text-muted-foreground/60">{footnote}</p>}
    </motion.section>
  );
}

function LiveTick() {
  return (
    <span className="flex items-center gap-1.5 font-dense text-[9px] tracking-[0.18em] text-gold/80 uppercase">
      <motion.span
        className="size-1.5 rounded-full bg-gold"
        animate={{ opacity: [0.3, 1] }}
        transition={{ type: "spring", stiffness: 15, damping: 8, repeat: Infinity, repeatType: "mirror" }}
      />
      Live
    </span>
  );
}

/** Loading shimmer — widths vary so the skeleton doesn't look like a barcode. */
export function SkeletonLines({ count = 3 }: { count?: number }) {
  const widths = ["82%", "64%", "74%", "55%", "70%"];
  return (
    <div className="grid gap-2.5" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          className="h-3.5 rounded bg-white/8"
          style={{ width: widths[i % widths.length] }}
          animate={{ opacity: [0.35, 0.7] }}
          transition={{
            type: "spring",
            stiffness: 20,
            damping: 10,
            repeat: Infinity,
            repeatType: "mirror",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}
