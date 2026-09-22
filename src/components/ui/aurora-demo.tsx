"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ArrowRight, Sparkles } from "lucide-react";

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
          <Sparkles className="h-3.5 w-3.5 text-blue-500" />
          <span>Interactive Aurora Effect</span>
        </div>
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center tracking-tight">
          Background lights are cool you know.
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4 text-center">
          And this, is chemical burn.
        </div>
        <button className="inline-flex items-center gap-2 bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-6 py-2.5 text-sm font-semibold transition-transform hover:scale-105 active:scale-95 shadow-md">
          <span>Debug now</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>
    </AuroraBackground>
  );
}

export default AuroraBackgroundDemo;
