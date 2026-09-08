"use client";

import { useState, useRef, useEffect, type FC } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
} from "motion/react";
import { FaTasks } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";
import { RiBubbleChartFill } from "react-icons/ri";
import { PiFunnelSimpleBold } from "react-icons/pi";
import type { IconType } from "react-icons";

export interface FilterItem {
  id: string;
  label: string;
  icon: IconType;
}

interface FilterDisclosureProps {
  items?: FilterItem[];
  defaultActiveId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

const SPRING = {
  type: "spring",
  stiffness: 400,
  damping: 28,
  mass: 0.8,
} as const;

export const DEFAULT_YEAR_ITEMS: FilterItem[] = [
  { id: "all", label: "All Years", icon: RiBubbleChartFill },
  { id: "2024", label: "2024 Edition", icon: IoCalendar },
  { id: "2023", label: "2023 Edition", icon: IoCalendar },
  { id: "2022", label: "2022 Edition", icon: IoCalendar },
  { id: "2021", label: "2021 Edition", icon: IoCalendar },
];

export const FilterDisclosure: FC<FilterDisclosureProps> = ({
  items = DEFAULT_YEAR_ITEMS,
  defaultActiveId = "all",
  onChange,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(defaultActiveId);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActive(defaultActiveId);
  }, [defaultActiveId]);

  const activeItem = items.find((i) => i.id === active);
  const ActiveIcon = activeItem ? activeItem.icon : FaTasks;

  const handleSelect = (id: string) => {
    setActive(id);
    onChange?.(id);
    setOpen(false);
  };

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className={`relative flex h-[48px] items-center justify-end ${className}`}
    >
      <MotionConfig
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
          mass: 0.8,
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {open ? (
            <motion.div
              key="open"
              layoutId="filter-disclosure"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              style={{ transformOrigin: "100% 0%", borderRadius: 20 }}
              className="absolute right-0 top-0 z-50 flex w-[220px] sm:w-[240px] flex-col gap-[3px] overflow-hidden rounded-2xl border-[1.4px] border-[#E5E5E9] bg-[#FEFEFE] p-[6px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] will-change-transform dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
              {/* Header inside popover */}
              <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-zinc-200 dark:border-neutral-800/80 mb-0.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                  Filter by Year
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="font-mono text-[10px] text-zinc-400 hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>

              {items.map((item, index) => {
                const Icon = item.icon;
                const selected = active === item.id;

                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    initial={{ opacity: 0, scale: 1.05, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    onClick={() => handleSelect(item.id)}
                    whileTap={{ scale: 0.98 }}
                    transition={{ ...SPRING, delay: (1 + index) * 0.03 }}
                    className="flex w-full cursor-pointer items-center justify-between rounded-[12px] px-[10px] py-[7px] transition-colors hover:bg-[#F6F5FA] dark:hover:bg-neutral-800/60 text-left"
                  >
                    <div className="flex items-center gap-[12px]">
                      <Icon className="h-[16px] w-[16px] text-[#AFAEB9] dark:text-neutral-400" />
                      <span className="text-[13px] sm:text-[14px] font-semibold tracking-tight text-[#535257] dark:text-neutral-200">
                        {item.label}
                      </span>
                    </div>

                    <motion.div
                      animate={{
                        backgroundColor: selected ? "#eb0028" : "rgba(0,0,0,0)",
                      }}
                      className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[2px] ${
                        selected
                          ? "border-[#eb0028]"
                          : "border-[#ADADB2] dark:border-neutral-700"
                      }`}
                    >
                      <motion.div
                        animate={{
                          scale: selected ? 1 : 0,
                          opacity: selected ? 1 : 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 520,
                          damping: 30,
                        }}
                      >
                        <BsCheckLg className="h-[10px] w-[10px] text-white" />
                      </motion.div>
                    </motion.div>
                  </motion.button>
                );
              })}
            </motion.div>
          ) : (
            <div key="close" className="flex items-center">
              <motion.button
                type="button"
                layoutId="filter-disclosure"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                onClick={() => setOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  borderRadius: 24,
                }}
                className="z-30 flex h-[38px] w-[38px] sm:h-[40px] sm:w-[40px] cursor-pointer items-center justify-center rounded-full border-[1.5px] border-[#E5E5E9] bg-[#FEFEFE] shadow-xs will-change-transform dark:border-neutral-800 dark:bg-neutral-900 transition-colors hover:border-[#eb0028]"
                title="Filter past speakers by edition year"
              >
                <PiFunnelSimpleBold className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px] text-[#272729] dark:text-neutral-100" />
              </motion.button>

              <motion.div
                initial={{ x: -16, opacity: 0 }}
                animate={{ x: 0, opacity: 0.85 }}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 26,
                }}
                className="z-10 -ml-[10px] flex h-[38px] w-[38px] sm:h-[40px] sm:w-[40px] items-center justify-center rounded-full border-[1.5px] border-[#E5E5E9] bg-[#FEFEFE] shadow-xs dark:border-neutral-800 dark:bg-neutral-900"
                title={`Active filter: ${activeItem?.label || "All"}`}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                  >
                    <ActiveIcon className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px] text-[#AFAEB9] dark:text-neutral-400" />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
};

export default FilterDisclosure;
