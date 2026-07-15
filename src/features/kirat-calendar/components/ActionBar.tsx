"use client";

import { motion } from "motion/react";

import type { CalendarTheme } from "../types";
import styles from "../kirat-calendar.module.css";

interface ActionBarProps {
  theme: CalendarTheme;
  onToggleTheme: () => void;
  onGoToday: () => void;
  onToggleYearView: () => void;
  onSavePdf: () => void;
  isExportingPdf: boolean;
  onSaveYearPdf: () => void;
  isExportingYearPdf: boolean;
}

export function ActionBar({
  theme,
  onToggleTheme,
  onGoToday,
  onToggleYearView,
  onSavePdf,
  isExportingPdf,
  onSaveYearPdf,
  isExportingYearPdf,
}: ActionBarProps) {
  return (
    <div className={styles.actionBar}>
      <motion.button whileTap={{ scale: 0.94 }} className={styles.actionBtn} onClick={onToggleTheme}>
        {theme === "night" ? "☀️ Day" : "🌙 Night"}
      </motion.button>
      <motion.button whileTap={{ scale: 0.94 }} className={styles.actionBtn} onClick={onGoToday}>
        📅 Today
      </motion.button>
      <motion.button whileTap={{ scale: 0.94 }} className={styles.actionBtn} onClick={onToggleYearView}>
        🗓️ Year
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.94 }}
        className={styles.actionBtn}
        onClick={onSavePdf}
        disabled={isExportingPdf}
      >
        {isExportingPdf ? "Preparing..." : "⬇️ Save PDF"}
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.94 }}
        className={styles.actionBtn}
        onClick={onSaveYearPdf}
        disabled={isExportingYearPdf}
      >
        {isExportingYearPdf ? "Preparing..." : "⬇️ Save Year PDF"}
      </motion.button>
    </div>
  );
}
