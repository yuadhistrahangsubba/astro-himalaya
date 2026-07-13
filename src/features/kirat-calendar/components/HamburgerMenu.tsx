"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

import styles from "../kirat-calendar.module.css";
import type { InfoPageKey } from "../types";

interface HamburgerMenuProps {
  open: boolean;
  onClose: () => void;
  onSelectHome: () => void;
  onSelectInfoPage: (key: InfoPageKey) => void;
}

const INFO_PAGES: { key: InfoPageKey; label: string }[] = [
  { key: "about", label: "👤 About Us" },
  { key: "yamdhangsang", label: "🕒 Yamdhangsang" },
  { key: "festivals", label: "🎉 Festivals" },
  { key: "planets", label: "🪐 Planets" },
];

export function HamburgerMenu({ open, onClose, onSelectHome, onSelectInfoPage }: HamburgerMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            aria-label="Close menu overlay"
            className="fixed inset-0 z-[99998] cursor-default bg-black/30 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            className={styles.dropdownMenu}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
          >
            <div className={styles.dropdownCloseRow}>
              <button className={styles.menuCloseBtn} onClick={onClose} aria-label="Close menu">
                ✕
              </button>
            </div>
            <button
              type="button"
              className={styles.menuLinkBtn}
              onClick={() => {
                onSelectHome();
                onClose();
              }}
            >
              🏠 Home
            </button>
            {INFO_PAGES.map((page) => (
              <button
                key={page.key}
                type="button"
                className={styles.menuLinkBtn}
                onClick={() => {
                  onSelectInfoPage(page.key);
                  onClose();
                }}
              >
                {page.label}
              </button>
            ))}
            <Link href="/astro" onClick={onClose}>
              🔭 Astro
            </Link>
            <Link href="/contact" onClick={onClose}>
              📞 Contact Us
            </Link>
            <Link href="/faq" onClick={onClose}>
              ❓ FAQ
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
