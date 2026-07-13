"use client";

import { motion } from "motion/react";

import { MONTHS } from "../data/months";
import styles from "../kirat-calendar.module.css";

const YEAR_RANGE = Array.from({ length: 2050 - 2000 + 1 }, (_, i) => 2000 + i);

interface MonthYearControlsProps {
  month: number;
  year: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelectMonth: (month: number) => void;
  onSelectYear: (year: number) => void;
}

export function MonthYearControls({
  month,
  year,
  onPrevMonth,
  onNextMonth,
  onSelectMonth,
  onSelectYear,
}: MonthYearControlsProps) {
  return (
    <div className={styles.controls}>
      <motion.button whileTap={{ scale: 0.9 }} onClick={onPrevMonth} aria-label="Previous month">
        ◀
      </motion.button>
      <select value={month} onChange={(e) => onSelectMonth(Number(e.target.value))}>
        {MONTHS.map((m, i) => (
          <option key={m} value={i}>
            {m}
          </option>
        ))}
      </select>
      <select value={year} onChange={(e) => onSelectYear(Number(e.target.value))}>
        {YEAR_RANGE.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
      <motion.button whileTap={{ scale: 0.9 }} onClick={onNextMonth} aria-label="Next month">
        ▶
      </motion.button>
    </div>
  );
}
