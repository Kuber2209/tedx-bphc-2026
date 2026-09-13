"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export interface SectionItem {
  id: string;
  label: string; // e.g. "01", "02", "D1", "D2"
  title?: string;
}

interface SectionScrollNavigatorProps {
  sections: SectionItem[];
  className?: string;
}

export default function SectionScrollNavigator({
  sections,
  className = "",
}: SectionScrollNavigatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const rawProgress = useMotionValue(0);

  const smoothProgress = useSpring(rawProgress, {
    stiffness: 160,
    damping: 24,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const viewportMid = window.scrollY + window.innerHeight * 0.35;
      
      let foundIdx = 0;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= viewportMid) {
          foundIdx = i;
          break;
        }
      }
      setActiveIndex(foundIdx);

      // Section-level progress: from current section top to next section top
      const curEl = document.getElementById(sections[foundIdx].id);
      const nextEl = sections[foundIdx + 1] ? document.getElementById(sections[foundIdx + 1].id) : null;

      if (curEl) {
        const startY = curEl.offsetTop;
        const endY = nextEl ? nextEl.offsetTop : document.documentElement.scrollHeight - window.innerHeight;
        const range = Math.max(endY - startY, 1);
        const scrolled = window.scrollY - startY;
        const p = Math.min(Math.max(scrolled / range, 0), 1);
        rawProgress.set(p);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, rawProgress]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nextIndex = Math.min(activeIndex + 1, sections.length - 1);
  const currentLabel = sections[activeIndex]?.label || "01";
  const nextLabel = activeIndex === sections.length - 1 ? "END" : sections[nextIndex]?.label || "02";

  // Height percentage between 0 and 100
  const heightPercent = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const endLabelColor = useTransform(
    smoothProgress,
    [0.75, 0.98],
    ["#9ca3af", "#eb0028"]
  );

  return (
    <aside
      className={`fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none font-mono ${className}`}
      aria-label="Section Scroll Indicator"
    >
      {/* Current Active Section Label (in TEDx Red) */}
      <button
        type="button"
        onClick={() => scrollToSection(sections[activeIndex].id)}
        className="text-[11px] font-bold text-[#eb0028] tracking-widest leading-none mb-2 cursor-pointer hover:scale-110 transition-transform"
        title={sections[activeIndex]?.title || `Section ${currentLabel}`}
      >
        {currentLabel}
      </button>

      {/* Vertical Track Line matching screenshot */}
      <div className="relative w-[2.5px] h-32 lg:h-44 bg-neutral-200/90 rounded-full flex justify-center">
        {/* Animated Red Fill Bar */}
        <motion.div
          className="absolute top-0 w-full bg-[#eb0028] rounded-full origin-top"
          style={{ height: heightPercent }}
        />

        {/* Traveling Red Dot with White Halo Ring */}
        <motion.div
          className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#eb0028] ring-2 ring-white shadow-xs z-10"
          style={{ top: heightPercent }}
        />
      </div>

      {/* Target Next Section Label */}
      <motion.button
        type="button"
        onClick={() => scrollToSection(sections[nextIndex].id)}
        className="text-[11px] font-bold tracking-widest leading-none mt-2 cursor-pointer transition-colors"
        style={{ color: endLabelColor }}
        title={sections[nextIndex]?.title || `Section ${nextLabel}`}
      >
        {nextLabel}
      </motion.button>
    </aside>
  );
}
