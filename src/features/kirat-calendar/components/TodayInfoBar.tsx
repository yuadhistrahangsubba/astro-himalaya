"use client";

import { useEffect, useState } from "react";

import { PANCHANGA_DATA } from "../data/panchanga-data";
import styles from "../kirat-calendar.module.css";

export function TodayInfoBar({ selectedDate }: { selectedDate: Date }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const key = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(
    selectedDate.getDate(),
  ).padStart(2, "0")}`;
  const p = PANCHANGA_DATA[key];

  return (
    <div className={styles.todayInfo}>
      <div>
        {selectedDate.toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}{" "}
        (Surise Time)
      </div>

      <div style={{ marginTop: 5, fontSize: 14, color: "inherit" }}>
        <b>{p?.KiratDate || "-"}</b>
      </div>

      <div style={{ marginTop: 3, fontSize: 14, color: "inherit" }}>
        <b>{p?.tLamikkhok || "-"}</b>
      </div>

      <div style={{ marginTop: 3, fontSize: 14, color: "inherit" }}>
        <b>{now ? now.toLocaleTimeString() : ""}</b>
      </div>

      <div className={styles.todayLocation}>Thimphu, Bhutan</div>
    </div>
  );
}
