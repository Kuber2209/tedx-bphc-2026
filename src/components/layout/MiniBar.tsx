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
      <div className="bg-white/90 backdrop-blur-lg border border-black/10 text-black rounded-none md:rounded-sm shadow-2xl px-6 py-3 md:py-4 flex items-center justify-between font-sans text-xs uppercase tracking-widest mx-auto max-w-7xl pointer-events-auto overflow-hidden relative">
        {/* Subtle top highlight */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-black/5 to-transparent"></div>
        
        <div className="hidden md:flex items-center gap-6 text-zinc-500">
          <span className="text-[#eb0028] font-bold">12th Edition</span>
          <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
          <span className="text-black">Nov 2026</span>
          <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
          <span>BITS Pilani Hyd</span>
        </div>
        <div className="flex md:hidden items-center text-zinc-500 text-[10px]">
          <span className="text-black">Nov 2026</span>
          <span className="mx-2">•</span>
          <span>BITS Pilani</span>
        </div>
        <div className="flex items-center gap-6">
          <Link 
            href="/schedule" 
            className="hidden sm:flex text-sm text-zinc-600 font-medium hover:text-black transition-colors duration-300"
          >
            Schedule
          </Link>
          <Link 
            href="/passes" 
            className="text-black font-medium hover:text-[#eb0028] transition-colors duration-300 flex items-center gap-3 group relative"
          >
            <span>Get Tickets</span>
            <span className="w-6 h-6 rounded-full bg-[#eb0028] text-white flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-xs leading-none -mt-0.5 ml-0.5">↗</span>
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
