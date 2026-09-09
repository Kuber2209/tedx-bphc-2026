"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Sparkles, History, Check, Calendar } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const activeOption = options.find((opt) => opt.value === selectedYear) || options[0];

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* Pill Trigger Button (ToDesktop Inspired) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select academic year edition"
        className={`group flex items-center gap-2.5 rounded-full border px-4 py-2 text-xs font-mono tracking-wide transition-all duration-200 cursor-pointer ${
          isOpen
            ? "border-[#E62B1E] bg-zinc-900/95 text-white shadow-[0_0_20px_rgba(230,43,30,0.25)]"
            : "border-zinc-800 bg-[#121316]/90 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/80 hover:text-white"
        }`}
      >
        <span className="flex items-center gap-2">
          {activeOption?.current ? (
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E62B1E] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E62B1E]" />
            </span>
          ) : (
            <span className="h-2 w-2 rounded-full bg-zinc-600" />
          )}
          <span className="font-semibold text-white">{activeOption?.label || selectedYear}</span>
          {activeOption?.current && (
            <span className="rounded bg-[#E62B1E]/15 px-1.5 py-0.2 font-mono text-[9px] font-bold text-[#E62B1E]">
              CURRENT
            </span>
          )}
        </span>

        <ChevronDown
          className={`h-3.5 w-3.5 text-zinc-400 transition-transform duration-300 group-hover:text-zinc-200 ${
            isOpen ? "rotate-180 text-[#E62B1E]" : ""
          }`}
        />
      </button>

      {/* Floating Glassmorphism Popover Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            role="listbox"
            className="absolute right-0 left-auto top-full mt-2.5 z-50 w-[320px] sm:w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-zinc-800/90 bg-[#0d0e12]/95 p-2 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(230,43,30,0.15)] backdrop-blur-2xl"
          >
            {/* Ambient Red Glow in Menu Corner */}
            <div
              className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[#E62B1E]/15 blur-2xl"
              aria-hidden="true"
            />

            {/* Menu Header */}
            <div className="relative z-10 flex items-center justify-between px-3 py-2 border-b border-zinc-800/80 mb-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400 font-semibold">
                TEDx BPHC Academic Years
              </span>
              <span className="font-mono text-[10px] text-zinc-400">
                {options.length} Editions
              </span>
            </div>

            {/* Options List */}
            <div className="relative z-10 max-h-[340px] space-y-1 overflow-y-auto pr-0.5 custom-scrollbar">
              {options.map((option) => {
                const isSelected = option.value === selectedYear;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onSelectYear(option.value);
                      setIsOpen(false);
                    }}
                    className={`group/item flex w-full items-start gap-3 rounded-xl p-3 text-left transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-zinc-800/70 border border-[#E62B1E]/40 shadow-sm"
                        : "border border-transparent hover:bg-zinc-800/40 hover:border-zinc-800"
                    }`}
                  >
                    {/* Left Icon Badge */}
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                        option.current
                          ? isSelected
                            ? "border-[#E62B1E] bg-[#E62B1E]/20 text-[#E62B1E]"
                            : "border-[#E62B1E]/30 bg-[#E62B1E]/10 text-[#E62B1E] group-hover/item:border-[#E62B1E]/60"
                          : isSelected
                          ? "border-zinc-700 bg-zinc-800 text-white"
                          : "border-zinc-800 bg-zinc-900/90 text-zinc-400 group-hover/item:border-zinc-700 group-hover/item:text-zinc-300"
                      }`}
                    >
                      {option.current ? (
                        <Sparkles className="h-4 w-4" />
                      ) : (
                        <History className="h-4 w-4" />
                      )}
                    </div>

                    {/* Content Column */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5">
                        <span
                          className={`font-mono text-xs font-bold uppercase tracking-tight transition-colors ${
                            isSelected ? "text-white" : "text-zinc-200 group-hover/item:text-white"
                          }`}
                        >
                          {option.label}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {option.current ? (
                            <span className="rounded-full bg-[#E62B1E]/20 border border-[#E62B1E]/40 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#E62B1E]">
                              Live Edition
                            </span>
                          ) : (
                            <span className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-[9px] text-zinc-400">
                              Archive
                            </span>
                          )}

                          {isSelected && (
                            <Check className="h-3.5 w-3.5 text-[#E62B1E]" />
                          )}
                        </div>
                      </div>

                      {/* Description / Subtitle */}
                      <p className="mt-1 font-sans text-[11px] leading-relaxed text-zinc-400 line-clamp-2 group-hover/item:text-zinc-300">
                        {option.description ||
                          (option.current
                            ? "Current flagship edition · Ideas worth spreading, live keynote sessions & 9 visionary speakers."
                            : `Archive edition · Preserved alumni talks, deep-dives & breakthrough moments from ${option.value}.`)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Subtle Footer */}
            <div className="relative z-10 mt-1 border-t border-zinc-800/80 px-3 pt-2 pb-1 flex items-center justify-between">
              <span className="font-mono text-[10px] text-zinc-400 flex items-center gap-1.5">
                <Calendar className="h-3 w-3 text-zinc-400" />
                <span>Switch edition to explore talks</span>
              </span>
              <span className="font-mono text-[10px] text-[#E62B1E]">
                TEDx BPHC
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
