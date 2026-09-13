"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

export interface ScrollProgressLineProps {
  startLabel?: string;
  endLabel?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  heightClass?: string; // e.g. "h-36", "h-44", "h-56"
}

export default function ScrollProgressLine({
  startLabel = "D1",
  endLabel = "D2",
  containerRef,
  className = "",
  heightClass = "h-40 sm:h-48 lg:h-56",
}: ScrollProgressLineProps) {
  const localRef = useRef<HTMLDivElement>(null);
  const target = containerRef || localRef;

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 75%", "end 25%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
    restDelta: 0.001,
  });

  const heightPercent = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const endLabelColor = useTransform(
    smoothProgress,
    [0.8, 0.98],
    ["#9ca3af", "#eb0028"]
  );

  return (
    <div
      ref={localRef}
      className={`inline-flex flex-col items-center select-none font-mono text-xs ${className}`}
      aria-hidden="true"
    >
      {/* Top Label (e.g. D1, 01) in TEDx Red */}
      <span className="font-bold text-[#eb0028] tracking-widest leading-none mb-2 text-[11px] sm:text-xs">
        {startLabel}
      </span>

      {/* Vertical Track Line */}
      <div className={`relative w-[2.5px] ${heightClass} bg-neutral-200/90 rounded-full flex justify-center`}>
        {/* Animated Progress Fill (Red) */}
        <motion.div
          className="absolute top-0 w-full bg-[#eb0028] rounded-full origin-top"
          style={{ height: heightPercent }}
        />

        {/* Traveling Red Dot with White Halo Ring matching screenshot */}
        <motion.div
          className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#eb0028] ring-2 ring-white shadow-xs z-10"
          style={{ top: heightPercent }}
        />
      </div>

      {/* Bottom Label (e.g. D2, 02) */}
      <motion.span
        className="font-bold tracking-widest leading-none mt-2 transition-colors duration-200 text-[11px] sm:text-xs"
        style={{ color: endLabelColor }}
      >
        {endLabel}
      </motion.span>
    </div>
  );
}

export interface SectionProgressBlockProps {
  startLabel: string;
  endLabel: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
  heightClass?: string;
  stickyTopClass?: string;
}

export function SectionProgressBlock({
  startLabel,
  endLabel,
  children,
  id,
  className = "",
  heightClass = "h-40 sm:h-48 lg:h-56",
  stickyTopClass = "top-28 md:top-36",
}: SectionProgressBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative flex items-start gap-6 lg:gap-12 ${className}`}
    >
      {/* Pinned Vertical Animated Scroll Line on Left */}
      <div className={`hidden md:flex pt-2 sticky ${stickyTopClass} shrink-0 z-20`}>
        <ScrollProgressLine
          containerRef={containerRef}
          startLabel={startLabel}
          endLabel={endLabel}
          heightClass={heightClass}
        />
      </div>

      {/* Main Section Content */}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

