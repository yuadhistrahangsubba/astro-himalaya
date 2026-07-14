"use client";

import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import type { InfoPageKey } from "../types";
import { HamburgerMenu } from "./HamburgerMenu";

interface CalendarHeaderProps {
  onSelectHome?: () => void;
  onSelectInfoPage?: (key: InfoPageKey) => void;
}

export function CalendarHeader({ onSelectHome, onSelectInfoPage }: CalendarHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative z-[10000] border-b border-border/60 bg-primary/92 py-3 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(0,0,0,.35)]"
      >
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4">
          <motion.button
            whileTap={{ scale: 0.92 }}
            animate={{ rotate: menuOpen ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-primary-foreground/20"
          >
            {menuOpen ? <X className="size-4.5" aria-hidden="true" /> : <Menu className="size-4.5" aria-hidden="true" />}
          </motion.button>

          <div className="flex min-w-0 flex-col leading-tight">
            <span className="font-sans text-base font-bold tracking-wide text-primary-foreground sm:text-lg">
              Kirat Astro
            </span>
            <span
              className="truncate text-[11px] text-primary-foreground/70"
              style={{ fontFamily: "'XenoType LIF Ilam'" }}
            >
              ᤀᤥᤳ ᤋᤠᤃᤧᤖᤠ ᤏᤡᤱᤘᤠᤓᤢᤔᤠᤱᤅᤣ ᤛᤣᤘᤠᤖᤥ॥
            </span>
          </div>
        </div>
      </motion.header>

      {/* Rendered as a sibling, not a header child — motion.header carries an
          inline transform once animated, which would otherwise become the
          containing block for this drawer's `position: fixed` and clip it
          to the header's own height instead of the viewport. */}
      <HamburgerMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelectHome={onSelectHome}
        onSelectInfoPage={onSelectInfoPage}
      />
    </>
  );
}
