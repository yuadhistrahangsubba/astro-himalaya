"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { StarlitBackground } from "@/components/marketing/starlit-background";
import { SunlitBackground } from "@/components/marketing/sunlit-background";
import { PANCHANGA_DATA } from "../data/panchanga-data";
import styles from "../kirat-calendar.module.css";
import { saveCalendarPdf, saveYearPdf } from "../lib/pdf-export";
import type { CalendarTheme, InfoPageKey, ViewMode } from "../types";
import { ActionBar } from "./ActionBar";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarHeader } from "./CalendarHeader";
import { DayDetailsPanel } from "./DayDetailsPanel";
import { InfoPage } from "./InfoPage";
import { MonthYearControls } from "./MonthYearControls";
import { PageTopicHeader } from "./PageTopicHeader";
import { TodayInfoBar } from "./TodayInfoBar";
import { YearGrid } from "./YearGrid";
import { YearView } from "./YearView";

// Approximate flat fills for PDF export only — html2canvas rasterizes
// against these since the real backdrop is a fixed, blurred ambient layer
// that sits outside the captured node. Matches this app's --background
// token for each theme closely enough for a paper export.
const NIGHT_BG = "#232326";
const DAY_BG = "#f7f4ee";

const INFO_PAGE_KEYS: InfoPageKey[] = ["about", "yamdhangsang", "festivals", "planets"];

export function KiratCalendar() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [today, setToday] = useState(new Date());
  const [theme, setTheme] = useState<CalendarTheme>("day");
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(2000);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingYearPdf, setIsExportingYearPdf] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  // An always-mounted (but off-screen) export node — a static branded
  // banner + the year grid, no interactive nav controls (they mean
  // nothing inside an exported PDF). Both the Year View's own "Save as
  // PDF" and the month view's "Save Year PDF" target this same node, so
  // every year export looks identical regardless of which button
  // triggered it.
  const yearExportRef = useRef<HTMLDivElement>(null);

  // Defer "current time"-dependent rendering to the client only, avoiding
  // any risk of a server/client hydration mismatch across a day boundary.
  useEffect(() => {
    function init() {
      const now = new Date();
      setToday(now);
      setCurrentMonth(now.getMonth());
      setCurrentYear(now.getFullYear());
      setSelectedDate(now);
      setMounted(true);

      // Deep link from another page's menu, e.g. /?panel=planets.
      const panel = searchParams.get("panel");
      if (INFO_PAGE_KEYS.includes(panel as InfoPageKey)) {
        setViewMode(panel as InfoPageKey);
      }
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return null;

  function goToMonth(month: number, year: number) {
    setCurrentMonth(month);
    setCurrentYear(year);
  }

  function handlePrevMonth() {
    if (currentMonth === 0) goToMonth(11, currentYear - 1);
    else goToMonth(currentMonth - 1, currentYear);
  }

  function handleNextMonth() {
    if (currentMonth === 11) goToMonth(0, currentYear + 1);
    else goToMonth(currentMonth + 1, currentYear);
  }

  function handleDayClick(day: number) {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  }

  function handleGoToday() {
    goToMonth(today.getMonth(), today.getFullYear());
    setSelectedDate(today);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleJumpToDate(year: number, month: number, day: number) {
    goToMonth(month, year);
    setSelectedDate(new Date(year, month, day));
    setViewMode("calendar");
  }

  async function handleSavePdf() {
    if (!containerRef.current) return;
    setIsExportingPdf(true);
    try {
      const filename = `Kirat-Calendar-${currentMonth}-${currentYear}.pdf`;
      await saveCalendarPdf(containerRef.current, theme === "night" ? NIGHT_BG : DAY_BG, filename);
    } catch (err) {
      console.error("PDF export failed:", err);
      alert("Sorry, the PDF could not be generated. Please check your internet connection and try again.");
    } finally {
      setIsExportingPdf(false);
    }
  }

  async function handleSaveYearPdf() {
    if (!yearExportRef.current) return;
    setIsExportingYearPdf(true);
    try {
      await saveYearPdf(
        yearExportRef.current,
        theme === "night" ? NIGHT_BG : DAY_BG,
        `Kirat-Calendar-Year-${currentYear}.pdf`,
      );
    } catch (err) {
      console.error("Year PDF export failed:", err);
      alert("Sorry, the PDF could not be generated. Please check your internet connection and try again.");
    } finally {
      setIsExportingYearPdf(false);
    }
  }

  function handleSelectInfoPage(key: InfoPageKey) {
    setViewMode(key);
  }

  const selectedKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(
    selectedDate.getDate(),
  ).padStart(2, "0")}`;
  const selectedPanchanga = PANCHANGA_DATA[selectedKey];

  const rootClassName = `${styles.calendarRoot} ${theme === "day" ? "light" : "night"}`;
  const viewTransition = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.25, ease: "easeOut" as const },
  };

  return (
    <div className={rootClassName}>
      {theme === "day" ? <SunlitBackground /> : <StarlitBackground />}

      <CalendarHeader onSelectHome={() => setViewMode("calendar")} onSelectInfoPage={handleSelectInfoPage} />
      <PageTopicHeader />

      <AnimatePresence mode="wait">
        {viewMode === "calendar" && (
          <motion.div key="calendar" {...viewTransition} className={styles.container} ref={containerRef}>
            <TodayInfoBar selectedDate={selectedDate} />

            <MonthYearControls
              month={currentMonth}
              year={currentYear}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onSelectMonth={(m) => goToMonth(m, currentYear)}
              onSelectYear={(y) => goToMonth(currentMonth, y)}
            />

            <ActionBar
              theme={theme}
              onToggleTheme={() => setTheme((t) => (t === "day" ? "night" : "day"))}
              onGoToday={handleGoToday}
              onToggleYearView={() => setViewMode("year")}
              onSavePdf={handleSavePdf}
              isExportingPdf={isExportingPdf}
              onSaveYearPdf={handleSaveYearPdf}
              isExportingYearPdf={isExportingYearPdf}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentYear}-${currentMonth}`}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <CalendarGrid
                  month={currentMonth}
                  year={currentYear}
                  today={today}
                  selectedDate={selectedDate}
                  onDayClick={handleDayClick}
                  onPrevMonth={handlePrevMonth}
                  onNextMonth={handleNextMonth}
                />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedKey}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <DayDetailsPanel
                  p={selectedPanchanga}
                  year={selectedDate.getFullYear()}
                  month={selectedDate.getMonth()}
                  day={selectedDate.getDate()}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {viewMode === "year" && (
          <motion.div key="year" {...viewTransition}>
            <YearView
              year={currentYear}
              today={today}
              onPrevYear={() => setCurrentYear((y) => y - 1)}
              onNextYear={() => setCurrentYear((y) => y + 1)}
              onBack={() => setViewMode("calendar")}
              onJumpToDate={handleJumpToDate}
              onSaveYearPdf={handleSaveYearPdf}
              isExportingYearPdf={isExportingYearPdf}
            />
          </motion.div>
        )}

        {(viewMode === "about" ||
          viewMode === "yamdhangsang" ||
          viewMode === "festivals" ||
          viewMode === "planets") && (
          <motion.div key={viewMode} {...viewTransition}>
            <InfoPage pageKey={viewMode} onBack={() => setViewMode("calendar")} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Off-screen, always-mounted export target for every "Save Year
          PDF" trigger (the Year View's own button and the month view's
          button both use it) — a static branded banner instead of the
          interactive nav row (prev/next year, back, save), none of which
          mean anything inside an exported document. Needs an explicit
          width: `.yearView` is `width:92%`, and without a definite width
          on this fixed-position wrapper that percentage resolves against
          an auto/shrink-to-fit box instead of a real viewport-like
          width, collapsing the grid to far fewer columns than it
          actually renders with. */}
      <div
        aria-hidden="true"
        style={{ position: "fixed", top: 0, left: "-9999px", width: 1400, pointerEvents: "none" }}
      >
        <div ref={yearExportRef} className={styles.yearView}>
          <PageTopicHeader />
          <p className="py-3 text-center font-sans text-2xl font-bold text-primary">{currentYear}</p>
          <YearGrid year={currentYear} today={today} animate={false} />
        </div>
      </div>

      <footer className={styles.footer}>Kirat Calendar © {today.getFullYear()}</footer>
    </div>
  );
}
