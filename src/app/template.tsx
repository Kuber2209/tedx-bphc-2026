"use client";

import { motion } from "motion/react";

export default function PageTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="page-transition"
    >
      {children}
    </motion.div>
  );
}
