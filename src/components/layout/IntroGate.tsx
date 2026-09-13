"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function IntroGate({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1800);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        setVisible(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key="intro-gate"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
            }}
            onClick={() => setVisible(false)}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black text-white select-none cursor-pointer"
            aria-label="TEDx BITS Hyderabad — Click anywhere to enter"
          >
            <div className="relative z-10 flex flex-col items-center max-w-4xl px-6 text-center">
              {/* Top Subtitle / Disclaimer */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-2.5 mb-6 sm:mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#eb0028]" />
                <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-medium">
                  Independently Organized TED Event
                </p>
              </motion.div>

              {/* Main Brand Lockup: Whole TEDx in Crisp Flat Red */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                className="flex flex-wrap items-baseline justify-center tracking-tight leading-none"
              >
                {/* Whole TEDx in Solid Flat Red */}
                <span className="font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#eb0028] tracking-[-0.04em]">
                  TED
                </span>
                <span className="font-sans font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#eb0028] -translate-y-2 sm:-translate-y-4 md:-translate-y-5 ml-0.5 mr-3 sm:mr-4">
                  x
                </span>
                {/* Pure Crisp White BITS Hyderabad */}
                <span className="font-sans font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight whitespace-nowrap">
                  BITS Hyderabad
                </span>
              </motion.div>

              {/* Sharp Solid Red Architectural Accent Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="w-16 sm:w-24 h-[2px] bg-[#eb0028] my-6 sm:my-8 origin-center"
              />

              {/* Professional Sub-line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-3 font-mono text-xs sm:text-sm tracking-[0.2em] text-neutral-300 uppercase font-normal"
              >
                <span className="text-[#eb0028] font-semibold">12th Edition</span>
                <span className="text-neutral-600">•</span>
                <span>BITS Pilani Hyderabad Campus</span>
                <span className="text-neutral-600">•</span>
                <span className="text-neutral-400">2026</span>
              </motion.div>
            </div>

            {/* Faint Bottom Skip Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.2em] text-neutral-600 uppercase"
            >
              Click anywhere or press Esc to enter
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={visible ? "site-underlay is-held" : "site-underlay"}>
        {children}
      </div>
    </>
  );
}
