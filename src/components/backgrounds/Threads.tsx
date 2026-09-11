"use client";

import { motion } from "motion/react";

interface ThreadsProps {
  color?: string;
  count?: number;
}

export default function Threads({ color = "#eb0028", count = 30 }: ThreadsProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[1px] h-[150vh] opacity-20"
          style={{
            backgroundColor: color,
            left: `${(i / count) * 100 + (Math.random() * 5 - 2.5)}%`,
            top: "-25vh",
            filter: "blur(1px)",
          }}
          animate={{
            y: ["-10%", "10%", "-10%"],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 8 + Math.random() * 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-[#050505]" />
    </div>
  );
}
