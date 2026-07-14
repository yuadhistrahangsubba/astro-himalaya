"use client";

import { Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { PrayerFlagAccent } from "@/components/marketing/prayer-flag-accent";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { InfoPageKey } from "../types";
import { NAV_SECTIONS, type NavItem } from "./nav-items";

interface HamburgerMenuProps {
  open: boolean;
  onClose: () => void;
  /** Omit on pages outside the calendar — Home/info items then navigate via real links instead of switching local view state. */
  onSelectHome?: () => void;
  onSelectInfoPage?: (key: InfoPageKey) => void;
}

const BANNER_IMAGE =
  "https://images.unsplash.com/photo-1690122644787-d20b6c6b51b9?auto=format&fit=crop&w=800&q=80";

const LIST_STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const ITEM_RISE = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 260, damping: 24 } },
};

export function HamburgerMenu({ open, onClose, onSelectHome, onSelectInfoPage }: HamburgerMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            aria-label="Close menu overlay"
            className="fixed inset-0 z-[99998] cursor-default bg-black/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className="fixed inset-y-0 left-0 z-[99999] flex w-[85vw] max-w-[320px] flex-col overflow-y-auto border-r border-border/60 bg-card/95 backdrop-blur-2xl shadow-[12px_0_50px_-12px_rgba(0,0,0,.45)]"
          >
            <div className="relative h-32 w-full shrink-0 overflow-hidden">
              <Image src={BANNER_IMAGE} alt="" fill sizes="320px" className="object-cover" priority />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-black/10"
              />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-md transition-colors hover:bg-black/45"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div className="px-5 pt-3 pb-1">
              <div className="flex items-center justify-between">
                <span className="font-sans text-lg font-bold tracking-wide">Kirat Astro</span>
                <span lang="dz" className="font-dzongkha text-sm text-gold/70">
                  སྐར་རྩིས
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">Vedic Astrology &amp; Kirat Calendar</p>
              <PrayerFlagAccent className="mt-3 opacity-70" />
            </div>

            <motion.nav
              initial="hidden"
              animate="visible"
              variants={LIST_STAGGER}
              className="flex-1 px-3 py-3"
            >
              {NAV_SECTIONS.map((section, i) => (
                <div key={section.label ?? `section-${i}`} className={cn(i > 0 && "mt-4")}>
                  {section.label && (
                    <p className="px-3 pb-1.5 font-dense text-[10px] tracking-[0.18em] text-muted-foreground/70 uppercase">
                      {section.label}
                    </p>
                  )}
                  <div className="flex flex-col gap-0.5">
                    {section.items.map((item) => (
                      <NavRow
                        key={item.label}
                        item={item}
                        onClose={onClose}
                        onSelectHome={onSelectHome}
                        onSelectInfoPage={onSelectInfoPage}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </motion.nav>

            <div className="border-t border-border/60 p-4">
              <Button asChild breathing className="w-full">
                <Link href="/astro" onClick={onClose}>
                  <Sparkles className="size-4" aria-hidden="true" />
                  Get your Kundli
                </Link>
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function NavRow({
  item,
  onClose,
  onSelectHome,
  onSelectInfoPage,
}: {
  item: NavItem;
  onClose: () => void;
  onSelectHome?: () => void;
  onSelectInfoPage?: (key: InfoPageKey) => void;
}) {
  const Icon = item.icon;
  const rowClassName =
    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/90 transition-colors hover:bg-gold/10 hover:text-foreground";
  const iconWrapClassName =
    "flex size-8 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted/40 text-muted-foreground transition-colors group-hover:border-gold/40 group-hover:text-gold";

  const content = (
    <>
      <span className={iconWrapClassName}>
        <Icon className="size-4" aria-hidden="true" />
      </span>
      {item.label}
    </>
  );

  if (item.kind === "home") {
    return (
      <motion.div variants={ITEM_RISE}>
        {onSelectHome ? (
          <button
            type="button"
            className={cn(rowClassName, "w-full")}
            onClick={() => {
              onSelectHome();
              onClose();
            }}
          >
            {content}
          </button>
        ) : (
          <Link href="/" className={rowClassName} onClick={onClose}>
            {content}
          </Link>
        )}
      </motion.div>
    );
  }

  if (item.kind === "info") {
    return (
      <motion.div variants={ITEM_RISE}>
        {onSelectInfoPage ? (
          <button
            type="button"
            className={cn(rowClassName, "w-full")}
            onClick={() => {
              onSelectInfoPage(item.key);
              onClose();
            }}
          >
            {content}
          </button>
        ) : (
          <Link href={`/?panel=${item.key}`} className={rowClassName} onClick={onClose}>
            {content}
          </Link>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div variants={ITEM_RISE}>
      <Link href={item.href} className={rowClassName} onClick={onClose}>
        {content}
      </Link>
    </motion.div>
  );
}
