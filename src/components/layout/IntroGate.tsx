"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import TedxLogo from "@/components/layout/TedxLogo";

export default function IntroGate({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 2000);

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
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black text-white select-none cursor-pointer px-4"
            aria-label="TEDx BITS Hyderabad - Click anywhere to enter"
          >
            <div className="relative z-10 flex flex-col items-center max-w-5xl text-center">
              {/* Top Subtitle / Disclaimer */}
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="flex items-center gap-2 mb-5 sm:mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#eb0028]" />
                <p className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-medium">
                  Independently Organized TED Event
                </p>
              </motion.div>

              {/* Exact Brand Scripting from Top Left Corner (TedxLogo) */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                className="flex items-center justify-center"
              >
                <TedxLogo
                  light={true}
                  style={{ fontSize: "clamp(22px, 2.5vw, 32px)" }}
                  className="tracking-tight"
                />
              </motion.div>

              {/* Architectural Red Divider Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
                className="w-10 sm:w-12 h-[1.5px] bg-[#eb0028] my-4 sm:my-5 origin-center"
              />

              {/* Clean Conference Metadata */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.42 }}
                className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 font-mono text-[10px] sm:text-xs tracking-[0.2em] text-neutral-300 uppercase font-normal"
              >
                <span className="text-[#eb0028] font-semibold">12th Edition</span>
                <span className="text-neutral-600">•</span>
                <span>BITS Pilani Hyderabad Campus</span>
                <span className="text-neutral-600">•</span>
                <span className="text-neutral-400">2026</span>
              </motion.div>
            </div>

            {/* Skip Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.55 }}
              className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase pointer-events-none"
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
