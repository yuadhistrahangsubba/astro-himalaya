import { motion } from "motion/react";

import styles from "../kirat-calendar.module.css";
import { YearGrid } from "./YearGrid";

interface YearViewProps {
  year: number;
  today: Date;
  onPrevYear: () => void;
  onNextYear: () => void;
  onBack: () => void;
  onJumpToDate: (year: number, month: number, day: number) => void;
  onSaveYearPdf: () => void;
  isExportingYearPdf: boolean;
}

export function YearView({
  year,
  today,
  onPrevYear,
  onNextYear,
  onBack,
  onJumpToDate,
  onSaveYearPdf,
  isExportingYearPdf,
}: YearViewProps) {
  return (
    <div className={styles.yearView}>
      <div className={styles.yearViewHeader}>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onPrevYear} aria-label="Previous year">
          ◀
        </motion.button>
        <h2>{year}</h2>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onNextYear} aria-label="Next year">
          ▶
        </motion.button>
        <motion.button whileTap={{ scale: 0.96 }} className={styles.backBtn} onClick={onBack}>
          ◀ Back to Calendar
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.96 }}
          className={`${styles.actionBtn} ${styles.desktopOnly}`}
          onClick={onSaveYearPdf}
          disabled={isExportingYearPdf}
        >
          {isExportingYearPdf ? "Preparing..." : "⬇️ Save as PDF"}
        </motion.button>
      </div>

      <YearGrid year={year} today={today} onJumpToDate={onJumpToDate} />
    </div>
  );
}
