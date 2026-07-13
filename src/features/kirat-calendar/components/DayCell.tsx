"use client";

import { motion } from "motion/react";

import styles from "../kirat-calendar.module.css";

interface DayCellProps {
  day: number;
  kiratDate: number | "";
  isToday: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export function DayCell({ day, kiratDate, isToday, isSelected, onClick }: DayCellProps) {
  const className = [styles.day, isToday && styles.today, isSelected && styles.selected]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div
      className={className}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
    >
      <div className={styles.adDate}>{day}</div>
      <div className={styles.kiratDate}>{kiratDate}</div>
    </motion.div>
  );
}
