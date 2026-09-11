"use client";

import { motion } from "motion/react";

interface AuroraProps {
  color1?: string;
  color2?: string;
  color3?: string;
}

export default function Aurora({ 
  color1 = "#eb0028", 
  color2 = "#7a0015", 
  color3 = "#2b0007" 
}: AuroraProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-transparent">
      <div className="absolute inset-0 opacity-40 blur-[100px]">
        <motion.div 
          animate={{ 
            x: ["0%", "20%", "-20%", "0%"],
            y: ["0%", "-20%", "20%", "0%"],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] left-[20%] w-[50%] h-[50%] rounded-full mix-blend-screen"
          style={{ backgroundColor: color1 }}
        />
        <motion.div 
          animate={{ 
            x: ["0%", "-30%", "10%", "0%"],
            y: ["0%", "20%", "-10%", "0%"],
            scale: [1, 0.9, 1.3, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] right-[10%] w-[40%] h-[40%] rounded-full mix-blend-screen"
          style={{ backgroundColor: color2 }}
        />
        <motion.div 
          animate={{ 
            x: ["0%", "10%", "-30%", "0%"],
            y: ["0%", "-10%", "-30%", "0%"],
            scale: [1, 1.5, 0.9, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] left-[30%] w-[60%] h-[40%] rounded-full mix-blend-screen"
          style={{ backgroundColor: color3 }}
        />
      </div>
    </div>
  );
}
