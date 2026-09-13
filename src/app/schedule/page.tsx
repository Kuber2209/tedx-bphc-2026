"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import BlurText from "@/components/reactbits/BlurText";
import FloatingLines from "@/components/reactbits/FloatingLines";

// ============================================================================
// Schedule Data: ONLY Speakers & Timings for Day 1 and Day 2
// ============================================================================

interface SpeakerItem {
  id: string;
  name: string;
  time: string;
  isBreak?: boolean;
}

interface ScheduleDay {
  id: string;
  dayNumber: string;
  date: string;
  dayOfWeek: string;
  speakers: SpeakerItem[];
}

const scheduleDays: ScheduleDay[] = [
  {
    id: "01",
    dayNumber: "Day 01",
    date: "13 Nov 2026",
    dayOfWeek: "Friday",
    speakers: [
      { id: "d1-s1", name: "Speaker 1 - Name 1", time: "10:00 AM – 11:00 AM" },
      { id: "d1-s2", name: "Speaker 2 - Name 2", time: "11:00 AM – 12:00 PM" },
      { id: "d1-s3", name: "Speaker 3 - Name 3", time: "12:00 PM – 01:00 PM" },
      { id: "d1-lunch", name: "Lunch Break", time: "01:00 PM – 02:00 PM", isBreak: true },
      { id: "d1-s4", name: "Speaker 4 - Name 4", time: "02:00 PM – 03:00 PM" },
      { id: "d1-s5", name: "Speaker 5 - Name 5", time: "03:00 PM – 04:00 PM" },
      { id: "d1-s6", name: "Speaker 6 - Name 6", time: "04:00 PM – 05:00 PM" },
    ],
  },
  {
    id: "02",
    dayNumber: "Day 02",
    date: "14 Nov 2026",
    dayOfWeek: "Saturday",
    speakers: [
      { id: "d2-s1", name: "Speaker 1 - Name 1", time: "10:00 AM – 11:00 AM" },
      { id: "d2-s2", name: "Speaker 2 - Name 2", time: "11:00 AM – 12:00 PM" },
      { id: "d2-s3", name: "Speaker 3 - Name 3", time: "12:00 PM – 01:00 PM" },
      { id: "d2-lunch", name: "Lunch Break", time: "01:00 PM – 02:00 PM", isBreak: true },
      { id: "d2-s4", name: "Speaker 4 - Name 4", time: "02:00 PM – 03:00 PM" },
      { id: "d2-s5", name: "Speaker 5 - Name 5", time: "03:00 PM – 04:00 PM" },
      { id: "d2-s6", name: "Speaker 6 - Name 6", time: "04:00 PM – 05:00 PM" },
    ],
  },
];

// ============================================================================
// Fixed Left-Side Vertical Scroll Indicator
// ============================================================================

const LeftScrollIndicator = ({
  progress,
  activeIndex,
  onSelectDay,
}: {
  progress: ReturnType<typeof useSpring>;
  activeIndex: number;
  onSelectDay: (index: number) => void;
}) => {
  const thumbTop = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="hidden md:flex fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2 select-none"
      aria-label="Schedule Scroll Indicator"
    >
      {/* Day 1 Mark */}
      <button
        type="button"
        onClick={() => onSelectDay(0)}
        className={`text-[10px] font-mono font-bold tracking-widest transition-colors cursor-pointer ${
          activeIndex === 0 ? "text-[#eb0028]" : "text-zinc-400 hover:text-black"
        }`}
        title="Jump to Day 1"
      >
        D1
      </button>

      {/* Progress Track & Thumb */}
      <div className="relative w-[3px] h-36 sm:h-44 lg:h-52 bg-black/10 rounded-full">
        <motion.div
          className="w-full bg-[#eb0028] origin-top rounded-full"
          style={{ height: "100%", scaleY: progress }}
        />
        <motion.div
          className="absolute -left-[4px] w-2.5 h-2.5 rounded-full bg-[#eb0028] shadow-sm border-2 border-white pointer-events-none"
          style={{
            top: thumbTop,
            transform: "translateY(-50%)",
          }}
        />
      </div>

      {/* Day 2 Mark */}
      <button
        type="button"
        onClick={() => onSelectDay(1)}
        className={`text-[10px] font-mono font-bold tracking-widest transition-colors cursor-pointer ${
          activeIndex === 1 ? "text-[#eb0028]" : "text-zinc-400 hover:text-black"
        }`}
        title="Jump to Day 2"
      >
        D2
      </button>
    </div>
  );
};

// ============================================================================
// Minimal Bottom Floating Controller
// ============================================================================

const FloatingDayNav = ({
  days,
  activeIndex,
  progress,
  onSelectDay,
}: {
  days: ScheduleDay[];
  activeIndex: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  onSelectDay: (index: number) => void;
}) => {
  const smoothProgress = useSpring(progress, { stiffness: 100, damping: 30 });
  const activeDay = days[activeIndex] || days[0];

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full bg-white/95 backdrop-blur-xl border border-black/15 p-1.5 pl-5 pr-1.5 text-black shadow-md"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-widest text-[#eb0028] font-mono font-bold">
          {activeDay.dayNumber}
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-xs font-bold text-neutral-900 min-w-[100px]"
          >
            {activeDay.dayOfWeek}, {activeDay.date}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="relative h-9 w-9 flex items-center justify-center">
        <svg className="h-full w-full -rotate-90 transform">
          <circle
            cx="18"
            cy="18"
            r="13"
            className="stroke-black/10"
            strokeWidth="2"
            fill="none"
          />
          <motion.circle
            cx="18"
            cy="18"
            r="13"
            className="stroke-[#eb0028]"
            strokeWidth="2"
            fill="none"
            strokeDasharray="81.6"
            style={{ pathLength: smoothProgress }}
          />
        </svg>
        <button
          type="button"
          onClick={() => onSelectDay((activeIndex + 1) % days.length)}
          className="absolute inset-0 flex items-center justify-center text-black hover:text-[#eb0028] transition-colors cursor-pointer"
          title="Switch Day"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </motion.div>
  );
};

// ============================================================================
// Schedule Page
// ============================================================================

export default function SchedulePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Overall page scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Schedule content scroll progress for left indicator
  const { scrollYProgress: scheduleProgress } = useScroll({
    target: mainRef,
    offset: ["start 65%", "end 75%"],
  });

  const smoothScheduleProgress = useSpring(scheduleProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const newIndex = Math.min(
        Math.floor(latest * scheduleDays.length),
        scheduleDays.length - 1
      );
      setActiveIndex(newIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToDay = (index: number) => {
    const targetDay = scheduleDays[index];
    if (!targetDay) return;
    const element = document.getElementById(`day-${targetDay.id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scheduleThumbTop = useTransform(smoothScheduleProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#fafafa] text-neutral-900 selection:bg-[#eb0028] selection:text-white pb-32 font-sans relative"
    >
      {/* Floating lines background matching Passes template */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none opacity-20">
        <FloatingLines color="#eb0028" />
      </div>

      {/* Fixed Left-Side Scroll Indicator */}
      <LeftScrollIndicator
        progress={smoothScheduleProgress}
        activeIndex={activeIndex}
        onSelectDay={scrollToDay}
      />

      <div className="relative z-10">
        {/* =========================================================================
            1. HEADER SECTION (MATCHING PASSES PAGE TEMPLATE)
            ========================================================================= */}
        <section className="relative pt-36 sm:pt-40 pb-12 px-6 md:px-12 overflow-hidden">
          <div className="max-w-[1000px] mx-auto text-center relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white border border-neutral-200 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E62B1E] animate-pulse" />
              <p className="text-[#E62B1E] font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-center">
                Conference Schedule · 2026
              </p>
            </div>

            <BlurText
              text="The schedule."
              as="h1"
              delay={140}
              animateBy="words"
              direction="top"
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[96px] font-bold tracking-tight mb-6 text-neutral-900 leading-[0.95] text-center"
              highlightWords={{
                schedule: "font-sans font-light text-zinc-400",
                "schedule.": "font-sans font-light text-zinc-400",
              }}
            />

            <BlurText
              text="Explore the curated sequence of keynote talks, sessions, and networking intervals across Day 1 and Day 2 at the BITS Pilani Hyderabad Campus Auditorium."
              as="p"
              delay={25}
              animateBy="words"
              direction="bottom"
              className="text-lg md:text-xl font-light text-neutral-500 max-w-2xl mx-auto leading-relaxed text-center mb-6"
            />
          </div>
        </section>

        {/* =========================================================================
            STAGE SHOWCASE CENTERPIECE
            ========================================================================= */}
        <section className="relative px-6 md:px-12 max-w-5xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-md border border-neutral-200/90 group bg-black"
          >
            {/* Red accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#eb0028] via-[#eb0028]/60 to-transparent z-20" />
            
            <Image
              src="/schedule-stage.png"
              alt="TEDx BITS Hyderabad Auditorium Stage"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none z-10" />

            {/* Stage Info Badge */}
            <div className="absolute bottom-4 left-5 sm:bottom-6 sm:left-8 z-20 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] uppercase tracking-widest font-semibold shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#eb0028] animate-pulse" />
                Main Auditorium Stage
              </span>
              <span className="text-white/80 font-mono text-xs hidden sm:inline-block">
                BITS Pilani Hyderabad Campus · 13–14 Nov 2026
              </span>
            </div>
          </motion.div>
        </section>

        {/* =========================================================================
            2. STICKY DAY TABS
            ========================================================================= */}
        <nav className="sticky top-0 z-40 bg-[#fafafa]/90 backdrop-blur-md border-b border-black/10 py-3.5 max-w-5xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3">
            {scheduleDays.map((day, idx) => (
              <button
                key={day.id}
                type="button"
                onClick={() => scrollToDay(idx)}
                className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeIndex === idx
                    ? "bg-[#eb0028] text-white font-bold shadow-xs"
                    : "bg-black/5 text-zinc-700 hover:bg-black/10 font-semibold"
                }`}
              >
                {day.dayNumber} · {day.date}
              </button>
            ))}
          </div>
        </nav>

        {/* =========================================================================
            3. SCHEDULE TIMELINE WITH LEFT-SIDE SCROLL RAIL
            ========================================================================= */}
        <main ref={mainRef} className="max-w-5xl mx-auto px-6 md:px-12 py-12">
          <div className="relative pl-6 sm:pl-10">
            {/* Continuous Left-Side Scroll Rail Indicator */}
            <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-black/10 pointer-events-none" />
            <motion.div
              className="absolute left-0 top-3 bottom-3 w-[2px] bg-[#eb0028] origin-top pointer-events-none"
              style={{ scaleY: smoothScheduleProgress }}
            />
            <motion.div
              className="absolute -left-[4px] w-2.5 h-2.5 rounded-full bg-[#eb0028] border-2 border-white shadow-sm pointer-events-none z-10"
              style={{
                top: scheduleThumbTop,
                transform: "translateY(-50%)",
              }}
            />

            {/* Introductory One-Liner above Day 1 */}
            <div className="mb-12 pb-6 border-b border-black/5">
              <ScrollReveal
                as="p"
                containerClassName="!my-0 max-w-2xl"
                textClassName="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed"
                blurStrength={4}
                baseOpacity={0.2}
                baseRotation={0}
                start="top 92%"
                end="top 65%"
              >
                Two days of multidisciplinary talks exploring the ideas and unseen connections shaping what comes next.
              </ScrollReveal>
            </div>

            {/* Schedule Days */}
            <div className="space-y-20">
              {scheduleDays.map((day) => (
                <section
                  key={day.id}
                  id={`day-${day.id}`}
                  className="scroll-mt-24 space-y-6"
                >
                  {/* Day Header */}
                  <div className="border-b border-black/15 pb-4">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="h-2 w-2 rounded-full bg-[#eb0028]" />
                      <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#eb0028]">
                        {day.dayOfWeek} · {day.date}
                      </span>
                    </div>

                    <ScrollReveal
                      as="h2"
                      containerClassName="!my-0"
                      textClassName="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 leading-tight"
                      blurStrength={5}
                      baseOpacity={0.15}
                      baseRotation={0}
                      start="top 90%"
                      end="top 55%"
                    >
                      {day.dayNumber}
                    </ScrollReveal>
                  </div>

                  {/* Speakers List */}
                  <div className="divide-y divide-black/10">
                    {day.speakers.map((speaker) => (
                      <article
                        key={speaker.id}
                        className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-start gap-4 sm:gap-10 md:gap-14 group hover:bg-black/[0.02] px-3 -mx-3 rounded-xl transition-colors"
                      >
                        {/* Left: Timing (Replacing the old serial number) */}
                        <div className="shrink-0 sm:w-48 md:w-56">
                          <ScrollReveal
                            as="div"
                            containerClassName="!my-0"
                            textClassName="font-mono text-xs sm:text-sm font-semibold tracking-wider text-zinc-500 group-hover:text-[#eb0028] transition-colors"
                            blurStrength={4}
                            baseOpacity={0.2}
                            baseRotation={0}
                            start="top 90%"
                            end="top 50%"
                          >
                            {speaker.time}
                          </ScrollReveal>
                        </div>

                        {/* Right: Speaker 1 - Name 1 or Lunch Break */}
                        <div className="flex-1 flex items-center gap-3">
                          <ScrollReveal
                            as="h3"
                            containerClassName="!my-0"
                            textClassName={`text-lg sm:text-xl md:text-2xl tracking-tight transition-colors leading-snug ${
                              speaker.isBreak
                                ? "font-medium text-zinc-500 italic group-hover:text-black"
                                : "font-semibold text-neutral-900 group-hover:text-[#eb0028]"
                            }`}
                            blurStrength={5}
                            baseOpacity={0.15}
                            baseRotation={0}
                            start="top 90%"
                            end="top 50%"
                          >
                            {speaker.name}
                          </ScrollReveal>

                          {speaker.isBreak && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
                              Break
                            </span>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {/* Terminal Line */}
          <div className="mt-20 pt-6 border-t border-black/10 flex items-center justify-between font-mono text-xs text-zinc-500">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#eb0028]" />
              <span>TEDx BITS Hyderabad 2026</span>
            </div>
            <span>Day 01 & Day 02</span>
          </div>
        </main>

        {/* Dynamic Floating Controller */}
        <FloatingDayNav
          days={scheduleDays}
          activeIndex={activeIndex}
          progress={scrollYProgress}
          onSelectDay={scrollToDay}
        />
      </div>
    </div>
  );
}
