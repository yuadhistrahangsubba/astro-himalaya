import { motion } from "motion/react";

import { getKiratDate } from "../data/kirat-rules";
import { MONTHS } from "../data/months";
import { PANCHANGA_DATA } from "../data/panchanga-data";
import styles from "../kirat-calendar.module.css";

const WEEKDAYS = [
  { kirat: "ᤋᤧᤏᤧ", en: "Sun" },
  { kirat: "ᤑᤥᤖᤠ", en: "Mon" },
  { kirat: "ᤔᤡᤰ", en: "Tue" },
  { kirat: "ᤂᤧᤰ", en: "Wed" },
  { kirat: "ᤁᤢᤖᤢ", en: "Thu" },
  { kirat: "ᤑᤛᤢᤵ", en: "Fri" },
  { kirat: "ᤛᤧᤴ", en: "Sat" },
];

interface YearViewProps {
  year: number;
  today: Date;
  onPrevYear: () => void;
  onNextYear: () => void;
  onBack: () => void;
  onJumpToDate: (year: number, month: number, day: number) => void;
  onSaveYearPdf: () => void;
  isExportingYearPdf: boolean;
  yearViewRef: React.RefObject<HTMLDivElement | null>;
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
  yearViewRef,
}: YearViewProps) {
  return (
    <div className={styles.yearView} ref={yearViewRef}>
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

      <div className={styles.yearGrid}>
        {MONTHS.map((monthName, m) => (
          <motion.div
            key={monthName}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: m * 0.03, ease: "easeOut" }}
          >
            <YearMonthCard monthName={monthName} month={m} year={year} today={today} onJumpToDate={onJumpToDate} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function YearMonthCard({
  monthName,
  month,
  year,
  today,
  onJumpToDate,
}: {
  monthName: string;
  month: number;
  year: number;
  today: Date;
  onJumpToDate: (year: number, month: number, day: number) => void;
}) {
  const firstWeekday = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const firstDayKey = `${year}-${String(month + 1).padStart(2, "0")}-01`;
  const kiratMonth = PANCHANGA_DATA[firstDayKey]?.KiratMonthYear || "";

  return (
    <div className={styles.yearMonthCard}>
      <div className={styles.yearMonthTitle}>
        {monthName}
        <br />
        <small>{kiratMonth}</small>
      </div>
      <div className={styles.yearMonthWeekdays}>
        {WEEKDAYS.map((wd) => (
          <span key={wd.en}>
            <p style={{ fontFamily: "'XenoType LIF Ilam'" }}>{wd.kirat}</p>
            {wd.en}
          </span>
        ))}
      </div>
      <div className={styles.yearMonthDays}>
        {Array.from({ length: firstWeekday }, (_, i) => (
          <span key={`empty-${i}`} className={styles.yvEmpty} />
        ))}
        {Array.from({ length: totalDays }, (_, i) => {
          const day = i + 1;
          const kiratDate = getKiratDate(year, month + 1, day);
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const dayKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const dp = PANCHANGA_DATA[dayKey];
          const className = [styles.yvDay, isToday && styles.yvToday].filter(Boolean).join(" ");
          return (
            <motion.span
              key={day}
              className={className}
              whileTap={{ scale: 0.88 }}
              onClick={() => onJumpToDate(year, month, day)}
            >
              <span className={styles.yvMangyuk}>{dp?.nextM || ""}</span>
              <span className={styles.yvAd}>{day}</span>
              <span className={styles.yvKirat}>{kiratDate}</span>
              <span className={styles.yvLamikkhok}>{dp?.nextL || ""}</span>
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
