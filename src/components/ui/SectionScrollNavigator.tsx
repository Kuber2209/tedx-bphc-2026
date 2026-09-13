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
  targetContainerId?: string;
}

export default function SectionScrollNavigator({
  sections,
  className = "",
  targetContainerId,
}: SectionScrollNavigatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const rawProgress = useMotionValue(0);

  const smoothProgress = useSpring(rawProgress, {
    stiffness: 150,
    damping: 25,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (sections.length === 0) return;

    const handleScroll = () => {
      // Check visibility relative to target container if provided
      if (targetContainerId) {
        const container = document.getElementById(targetContainerId);
        if (container) {
          const rect = container.getBoundingClientRect();
          // Visible when container is somewhat in viewport
          const inView = rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25;
          setIsVisible(inView);
          if (!inView) return;
        }
      }

      const viewportMid = window.scrollY + window.innerHeight * 0.38;

      let foundIdx = 0;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= viewportMid) {
          foundIdx = i;
          break;
        }
      }
      setActiveIndex(foundIdx);

      // Overall progress across all sections
      const firstEl = document.getElementById(sections[0].id);
      const lastEl = document.getElementById(sections[sections.length - 1].id);

      if (firstEl && lastEl) {
        const startY = firstEl.offsetTop - window.innerHeight * 0.25;
        const endY = lastEl.offsetTop + lastEl.offsetHeight - window.innerHeight * 0.65;
        const totalDistance = Math.max(endY - startY, 1);
        const scrolled = window.scrollY - startY;
        const p = Math.min(Math.max(scrolled / totalDistance, 0), 1);
        rawProgress.set(p);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, rawProgress, targetContainerId]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentSection = sections[activeIndex] || sections[0];
  const lastSection = sections[sections.length - 1];

  const thumbTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <aside
      className={`fixed left-3 sm:left-5 lg:left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none font-mono transition-all duration-300 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
      } ${className}`}
      aria-label="Section Scroll Indicator"
    >
      {/* Current Active Section Label */}
      <button
        type="button"
        onClick={() => scrollToSection(currentSection.id)}
        className="text-[11px] font-bold text-[#eb0028] tracking-widest leading-none mb-3 cursor-pointer hover:scale-110 transition-transform flex flex-col items-center gap-1 group"
        title={currentSection.title || `Section ${currentSection.label}`}
      >
        <span>{currentSection.label}</span>
        {currentSection.title && (
          <span className="hidden group-hover:block absolute left-8 bg-black text-white text-[10px] font-sans px-2 py-0.5 rounded-[3px] whitespace-nowrap shadow-md pointer-events-none z-50">
            {currentSection.title}
          </span>
        )}
      </button>

      {/* Vertical Track Line */}
      <div className="relative w-[3px] h-36 lg:h-48 bg-zinc-200 rounded-full flex justify-center">
        {/* Animated Red Fill Bar */}
        <motion.div
          className="absolute top-0 w-full bg-[#eb0028] rounded-full origin-top"
          style={{ height: thumbTop }}
        />

        {/* Intermediate Section Step Dots for each section */}
        {sections.length > 2 &&
          sections.map((section, idx) => {
            const stepPercent = `${(idx / (sections.length - 1)) * 100}%`;
            const isPassedOrActive = idx <= activeIndex;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                className={`group absolute -translate-x-1/2 left-1/2 -translate-y-1/2 w-2 h-2 rounded-full cursor-pointer transition-all duration-200 z-10 ${
                  isPassedOrActive
                    ? "bg-[#eb0028] scale-110 ring-2 ring-white"
                    : "bg-zinc-300 hover:bg-zinc-500 hover:scale-125"
                }`}
                style={{ top: stepPercent }}
                title={section.title || `Section ${section.label}`}
              >
                {section.title && (
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute left-5 top-1/2 -translate-y-1/2 bg-black text-white text-[10px] font-sans font-medium px-2 py-0.5 rounded-[3px] whitespace-nowrap shadow-md pointer-events-none z-50">
                    {section.label} • {section.title}
                  </span>
                )}
              </button>
            );
          })}

        {/* Traveling Red Thumb Dot with White Ring */}
        <motion.div
          className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#eb0028] ring-2 ring-white shadow-sm pointer-events-none z-20"
          style={{ top: thumbTop }}
        />
      </div>

      {/* Bottom Section Label */}
      <button
        type="button"
        onClick={() => scrollToSection(lastSection.id)}
        className={`text-[11px] font-bold tracking-widest leading-none mt-3 cursor-pointer transition-colors duration-200 group flex flex-col items-center ${
          activeIndex === sections.length - 1 ? "text-[#eb0028]" : "text-zinc-400 hover:text-black"
        }`}
        title={lastSection.title || `Section ${lastSection.label}`}
      >
        <span>{lastSection.label}</span>
        {lastSection.title && (
          <span className="hidden group-hover:block absolute left-8 bg-black text-white text-[10px] font-sans px-2 py-0.5 rounded-[3px] whitespace-nowrap shadow-md pointer-events-none z-50">
            {lastSection.title}
          </span>
        )}
      </button>
    </aside>
  );
}
