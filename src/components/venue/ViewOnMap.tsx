"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Loader2, ExternalLink, Sun, Moon } from "lucide-react";
import { FaMap } from "react-icons/fa6";

export interface ViewOnMapProps {
  locationName?: string;
  address?: string;
  mapImageUrl?: string;
  mapsUrl?: string;
  className?: string;
  initialOpen?: boolean;
  layoutIdPrefix?: string;
}

const DEFAULT_MAPS_URL =
  "https://www.google.com/maps/place/Birla+Institute+of+Technology+%26+Science+Pilani,+Hyderabad+Campus/data=!4m2!3m1!1s0x0:0xc3e06e9e76cebf3d?sa=X&ved=1t:2428&ictx=111";

const DEFAULT_ADDRESS =
  "Auditorium, Birla Institute of Technology & Science Pilani, Hyderabad Campus, Jawahar Nagar, Shamirpet, Hyderabad, Telangana 500078";

export const ViewOnMap: React.FC<ViewOnMapProps> = ({
  locationName = "Auditorium, BITS Pilani Hyderabad Campus",
  address = DEFAULT_ADDRESS,
  mapsUrl = DEFAULT_MAPS_URL,
  mapImageUrl = "https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=2000&auto=format&fit=crop",
  className = "",
  initialOpen = false,
  layoutIdPrefix = "map",
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (isOpen) setIsMapLoaded(false);
  };

  const springConfig = {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
    mass: 0.8,
  };

  const publicMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    address
  )}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="w-full transition-colors duration-500">
      <div className="flex min-h-full w-full flex-col items-center justify-center bg-transparent">
        <div
          className={`relative flex w-full items-center justify-center ${className}`}
        >
          <AnimatePresence mode="popLayout">
            {!isOpen ? (
              /* --- PILL BUTTON --- */
              <motion.div
                key="button"
                layoutId={`${layoutIdPrefix}-container`}
                onClick={toggleOpen}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleOpen();
                  }
                }}
                className="group relative flex cursor-pointer items-center justify-center overflow-hidden border border-zinc-700/80 bg-[#E5E4EE] shadow-lg transition-all duration-300 hover:border-zinc-500 hover:shadow-xl dark:bg-[#1C1C1E]"
                style={{ width: 190, height: 52, borderRadius: 26 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={springConfig}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.div
                  layoutId={`${layoutIdPrefix}-bg`}
                  className="absolute inset-0 opacity-20 brightness-110 grayscale transition-opacity group-hover:opacity-30 dark:opacity-15 dark:brightness-50"
                  style={{
                    backgroundImage: `url(${mapImageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <motion.div className="relative z-10 flex items-center space-x-3 px-4 py-4">
                  <FaMap className="h-5 w-5 text-[#6A6973] transition-colors dark:text-[#E62B1E]" />
                  <span className="text-[17px] font-semibold tracking-tight text-[#3D3C43] transition-colors dark:text-white">
                    View on Map
                  </span>
                </motion.div>
              </motion.div>
            ) : (
              /* --- EXPANDED MAP --- */
              <motion.div
                key="map"
                layoutId={`${layoutIdPrefix}-container`}
                className="relative aspect-square w-[calc(100vw-64px)] max-w-[560px] overflow-hidden border border-zinc-200 bg-[#DEDEDE] shadow-2xl transition-colors duration-300 sm:aspect-[4/3] sm:w-full dark:bg-[#141414]"
                style={{ borderRadius: 28 }}
                transition={springConfig}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="absolute inset-0 h-full w-full"
                >
                  <iframe
                    title={locationName}
                    width="100%"
                    height="100%"
                    style={{
                      border: 0,
                      filter: isDark
                        ? "invert(90%) hue-rotate(180deg) contrast(1.1)"
                        : "none",
                    }}
                    src={publicMapUrl}
                    allowFullScreen
                    loading="lazy"
                    onLoad={() => setIsMapLoaded(true)}
                    className={`transition-opacity duration-700 ${
                      isMapLoaded ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </motion.div>

                {!isMapLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#E5E5E7] transition-colors dark:bg-[#1C1C1E]">
                    <Loader2 className="h-8 w-8 animate-spin text-[#E62B1E]" />
                    <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      Loading BITS Pilani Map...
                    </span>
                  </div>
                )}

                {/* TOP LEFT: OPEN IN MAPS BUTTON (Matching screenshot) */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="absolute left-3 top-3 z-50 sm:left-4 sm:top-4"
                >
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-zinc-700/80 bg-white/90 px-3 py-1.5 font-mono text-xs font-semibold text-zinc-800 shadow-md backdrop-blur-md transition-all hover:bg-white hover:text-black dark:border-zinc-700 dark:bg-black/85 dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-white"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </motion.div>

                {/* TOP RIGHT CONTROLS: THEME TOGGLE & CLOSE BUTTON */}
                <div className="absolute right-3 top-3 z-50 flex items-center gap-2 sm:right-4 sm:top-4">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setIsDark(!isDark)}
                    title={isDark ? "Switch to Light Map" : "Switch to Dark Map"}
                    aria-label="Toggle map theme"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700/80 bg-white/90 text-zinc-700 shadow-lg backdrop-blur-md transition-all hover:bg-gray-100 active:scale-95 sm:h-10 sm:w-10 dark:bg-black/80 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  >
                    {isDark ? (
                      <Sun className="h-4 w-4 text-amber-400" />
                    ) : (
                      <Moon className="h-4 w-4 text-indigo-500" />
                    )}
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={toggleOpen}
                    title="Close Map"
                    aria-label="Close Map"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700/80 bg-white/90 text-[#85848B] shadow-lg backdrop-blur-md transition-all hover:bg-gray-50 active:scale-90 sm:h-10 sm:w-10 dark:bg-[#2A2A2D] dark:text-white dark:hover:bg-[#3A3A3D]"
                  >
                    <X className="h-5 w-5" strokeWidth={2.5} />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ViewOnMap;
