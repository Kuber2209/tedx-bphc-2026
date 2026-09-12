"use client";

import React from "react";
import { motion } from "motion/react";
import { History } from "lucide-react";

export interface EditionOption {
  value: string;
  label: string;
  editionName?: string;
  description?: string;
  current?: boolean;
  speakerCount?: number;
}

interface AcademicYearDropdownProps {
  options: EditionOption[];
  selectedYear: string;
  onSelectYear: (year: string) => void;
  className?: string;
}

export default function AcademicYearDropdown({
  options,
  selectedYear,
  onSelectYear,
  className = "",
}: AcademicYearDropdownProps) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {options.map((option) => {
        const isSelected = option.value === selectedYear;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelectYear(option.value)}
            className={`group relative flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-mono tracking-wide transition-all duration-300 cursor-pointer ${
              isSelected
                ? "text-white"
                : "bg-white/80 text-neutral-600 border border-neutral-200/80 hover:bg-white hover:border-neutral-300 hover:text-black shadow-sm"
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId="active-year-pill"
                className="absolute inset-0 rounded-full bg-black shadow-lg"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            
            <span className="relative z-10 flex items-center gap-2.5">
              {option.current ? (
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${isSelected ? "bg-white/60" : "bg-[#eb0028]"}`} />
                  <span className={`relative inline-flex h-2 w-2 rounded-full ${isSelected ? "bg-white" : "bg-[#eb0028]"}`} />
                </span>
              ) : (
                <History className={`h-3.5 w-3.5 ${isSelected ? "text-neutral-300" : "text-neutral-400 group-hover:text-neutral-600"}`} />
              )}
              
              <span className="font-semibold uppercase">{option.label}</span>
              
              {option.current && !isSelected && (
                <span className="rounded-full bg-[#eb0028]/10 px-2 py-0.5 text-[9px] font-bold text-[#eb0028]">
                  LIVE
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
