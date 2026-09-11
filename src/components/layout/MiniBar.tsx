"use client";

import Link from "next/link";
import { motion } from "motion/react";
import React, { useState, useEffect } from "react";

export default function MiniBar() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide minibar when scrolling down past 100px, show when scrolling up or at top
      if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-0 left-0 w-full z-[100] pointer-events-none px-4 md:px-8 pb-4 md:pb-6"
    >
      <div className="backdrop-blur-md bg-white/80 border border-neutral-200/70 shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-black rounded-full px-6 py-3 md:py-3.5 flex items-center justify-between font-sans text-xs uppercase tracking-widest mx-auto max-w-5xl pointer-events-auto overflow-hidden relative">
        <div className="hidden md:flex items-center gap-4 text-neutral-500 font-mono text-[11px]">
          <span className="text-[#eb0028] font-bold">12th Edition</span>
          <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
          <span className="text-neutral-900 font-medium">Nov 2026</span>
          <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
          <span>BITS Pilani Hyd</span>
        </div>
        <div className="flex md:hidden items-center text-neutral-500 text-[10px] font-mono">
          <span className="text-[#eb0028] font-bold">12th Ed</span>
          <span className="mx-2 text-neutral-300">•</span>
          <span className="text-neutral-900 font-medium">Nov 2026</span>
          <span className="mx-2 text-neutral-300">•</span>
          <span>BITS Hyd</span>
        </div>
        <div className="flex items-center gap-6">
          <Link 
            href="/schedule" 
            className="hidden sm:flex text-xs font-mono tracking-wider text-neutral-600 hover:text-black transition-colors duration-200"
          >
            Schedule
          </Link>
          <Link 
            href="/passes" 
            className="text-neutral-900 font-mono text-xs tracking-wider uppercase font-semibold hover:text-[#eb0028] transition-colors duration-200 flex items-center gap-2.5 group relative"
          >
            <span>Get Tickets</span>
            <span className="w-6 h-6 rounded-full bg-[#eb0028] text-neutral-900 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
              <span className="text-xs leading-none -mt-0.5 ml-0.5">↗</span>
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
