"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";

const Ballpit = dynamic(() => import("./Ballpit"), { ssr: false });
const Hyperspeed = dynamic(() => import("./Hyperspeed"), { ssr: false });
const Aurora = dynamic(() => import("./Aurora"), { ssr: false });
const DotGrid = dynamic(() => import("./DotGrid"), { ssr: false });
const Grid = dynamic(() => import("./Grid"), { ssr: false });

export default function GlobalBackground() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const renderEffect = () => {
    switch (pathname) {
      case "/":
        return (
          <div className="absolute inset-0 opacity-80 transition-opacity duration-1000">
            <Ballpit count={40} color="#E62B1E" opacity={0.6} />
          </div>
        );
      case "/speakers":
        return (
          <div className="absolute inset-0 opacity-80 transition-opacity duration-1000">
            <Ballpit count={40} color="#E62B1E" opacity={0.6} />
          </div>
        );
      case "/team":
        return null;
      case "/sponsors":
        return (
          <div className="absolute inset-0 opacity-30 transition-opacity duration-1000">
            <DotGrid color="#E62B1E" />
          </div>
        );
      case "/venue":
        return null;
      case "/faq":
        return (
          <div className="absolute inset-0 opacity-50 transition-opacity duration-1000">
            <Aurora color1="#eb0028" color2="#fcfcfc" color3="#eb0028" />
          </div>
        );
      case "/passes":
        return (
          <div className="absolute inset-0 opacity-30 transition-opacity duration-1000">
            <Hyperspeed count={150} color="#eb0028" />
          </div>
        );
      case "/schedule":
        return (
          <div className="absolute inset-0 opacity-60 transition-opacity duration-1000">
            <Grid color="#eb0028" size={50} />
          </div>
        );
      default:
        return null;
    }
  };

  const getBaseColor = () => {
    switch (pathname) {
      case "/": return "bg-[#fcfcfc]"; 
      case "/speakers": return "bg-[#fcfcfc]";
      case "/team": return "bg-[#fcfcfc]";
      case "/sponsors": return "bg-[#fcfcfc]";
      case "/venue": return "bg-[#fcfcfc]";
      case "/faq": return "bg-[#fcfcfc]";
      case "/passes": return "bg-[#fcfcfc]";
      case "/schedule": return "bg-[#fcfcfc]";
      case "/gallery": return "bg-[#fcfcfc]";
      default: return "bg-[#fcfcfc]";
    }
  };

  return (
    <div className={`fixed inset-0 z-[-1] pointer-events-none transition-colors duration-1000 ${getBaseColor()}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {renderEffect()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
