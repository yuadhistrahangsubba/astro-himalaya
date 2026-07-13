"use client";

import { motion } from "motion/react";
import { useState } from "react";

import styles from "../kirat-calendar.module.css";
import type { InfoPageKey } from "../types";
import { HamburgerMenu } from "./HamburgerMenu";

interface CalendarHeaderProps {
  onSelectHome: () => void;
  onSelectInfoPage: (key: InfoPageKey) => void;
}

export function CalendarHeader({ onSelectHome, onSelectInfoPage }: CalendarHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className={styles.menuContainer}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: menuOpen ? 90 : 0 }}
          className={styles.menuBtn}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "✕" : "☰"}
        </motion.button>

        <HamburgerMenu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          onSelectHome={onSelectHome}
          onSelectInfoPage={onSelectInfoPage}
        />
      </div>

      <div className={styles.headerTitle}>
        <h1 style={{ fontSize: 20, color: "var(--primary-foreground)", fontFamily: "'XenoType LIF Ilam'" }}>
          ᤀᤥᤳ ᤋᤠᤃᤧᤖᤠ ᤏᤡᤱᤘᤠᤓᤢᤔᤠᤱᤅᤣ ᤛᤣᤘᤠᤖᤥ॥
        </h1>
        KIRAT KHAIK MUNDHUM CALENDAR
      </div>
    </motion.header>
  );
}
