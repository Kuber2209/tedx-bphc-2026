"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import {
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import type { ScheduleItem, SessionBlockOverview } from "@/data/schedule";

export interface AnimatedTimelineProps {
  items: ScheduleItem[];
  sessionBlocks?: SessionBlockOverview[];
  expandedItems?: Record<string, boolean>;
  onToggleExpand?: (id: string) => void;
  getItemIcon?: (type: ScheduleItem["type"]) => React.ReactNode;
  className?: string;
}

const BLOCK_ROMAN = ["I", "II", "III", "IV", "V"];

export default function AnimatedTimeline({
  items,
  sessionBlocks,
  expandedItems = {},
  onToggleExpand = () => {},
  getItemIcon = () => <Clock className="h-4 w-4" />,
  className = "",
}: AnimatedTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setHeight(rect.height);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setHeight(containerRef.current.getBoundingClientRect().height);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [items, expandedItems]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
    >
      {/* =====================================================================
          VERTICAL ANIMATED PROGRESS BEAM
          Runs down the left column on mobile, center-left on desktop
          ===================================================================== */}
      <div
        style={{ height: `${height}px` }}
        className="pointer-events-none absolute left-4 sm:left-36 md:left-40 top-0 w-[2px] bg-gradient-to-b from-transparent via-zinc-800 to-transparent"
        aria-hidden="true"
      >
        <motion.div
          style={{
            height: heightTransform,
            opacity: opacityTransform,
          }}
          className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[#eb0028] via-[#ff4d6d] to-transparent shadow-[0_0_12px_#eb0028,0_0_24px_rgba(235,0,40,0.6)]"
        />
      </div>

      {/* =====================================================================
          TIMELINE ITEMS
          ===================================================================== */}
      <div className="flex flex-col gap-8 sm:gap-10">
        {items.map((item, index) => {
          const isExpanded = !!expandedItems[item.id];
          const isKeynote = item.isSpeakerTalk;

          // Check if this item starts a new session block
          const isBlockStart =
            index === 0 || items[index - 1].sessionBlock !== item.sessionBlock;
          const currentBlock = sessionBlocks?.find(
            (b) => b.id === item.sessionBlock
          );
          const blockIndex =
            sessionBlocks?.findIndex((b) => b.id === item.sessionBlock) ?? 0;
          const romanNumeral =
            BLOCK_ROMAN[blockIndex] || `${blockIndex + 1}`;

          return (
            <div key={item.id} className="relative flex flex-col">
              {/* Optional Session Block Act Divider */}
              {isBlockStart && currentBlock && (
                <div className="relative mb-6 flex items-center gap-3 pl-10 sm:pl-48">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#eb0028]/40 bg-[#eb0028]/10 font-mono text-[11px] font-black text-[#eb0028]">
                    {romanNumeral}
                  </span>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#eb0028] font-bold">
                      Act {romanNumeral} • {currentBlock.timeRange}
                    </span>
                    <h3 className="text-sm font-bold uppercase tracking-tight text-white sm:text-base">
                      {currentBlock.name}
                    </h3>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8">
                {/* Left Column: Time Stamp */}
                <div className="sm:w-32 shrink-0 sm:text-right pt-0.5 pl-10 sm:pl-0">
                  <span
                    className={`tedx-time-badge ${
                      isKeynote ? "" : "tedx-time-badge-subtle"
                    }`}
                  >
                    {item.time}
                  </span>
                  {item.endTime && (
                    <div className="mt-0.5 font-mono text-[10px] text-zinc-500">
                      until {item.endTime}
                    </div>
                  )}
                  {item.duration && (
                    <div className="font-mono text-[10px] text-zinc-400">
                      {item.duration}
                    </div>
                  )}
                </div>

                {/* Center Node Indicator on the Beam */}
                <div className="absolute left-[11px] sm:left-[139px] md:left-[155px] top-1.5 z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-zinc-800 bg-[#0a0a0a]">
                  <div
                    className={`h-1.5 w-1.5 rounded-full ${
                      isKeynote
                        ? "bg-[#eb0028] shadow-[0_0_8px_#eb0028]"
                        : "bg-zinc-500"
                    }`}
                  />
                </div>

                {/* Right Column: Event Card */}
                <div className="flex-1 w-full pl-10 sm:pl-0">
                  <div
                    className={`tedx-event-card w-full ${
                      isKeynote
                        ? "tedx-event-card-speaker"
                        : item.type === "lunch" || item.type === "break"
                        ? "tedx-event-card-break"
                        : ""
                    }`}
                  >
                    {/* Header Row: Session / Tag / Location */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex flex-wrap items-center gap-2 font-mono">
                        {isKeynote ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eb0028]/15 px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#eb0028] border border-[#eb0028]/30">
                            <Sparkles className="h-3 w-3" />
                            <span>
                              Speaker Talk #{String(item.speakerNumber).padStart(2, "0")}
                            </span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                            {getItemIcon(item.type)}
                            <span>{item.sessionLabel}</span>
                          </span>
                        )}

                        {item.topicTag && (
                          <span className="rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                            #{item.topicTag}
                          </span>
                        )}
                      </div>

                      {item.location && (
                        <div className="flex items-center gap-1 font-mono text-[11px] text-zinc-500">
                          <MapPin className="h-3 w-3" />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Title & Talk Info */}
                    <div className="mt-2.5">
                      {isKeynote ? (
                        <>
                          <h4 className="text-lg font-extrabold tracking-tight text-white sm:text-xl">
                            {item.talkTitle || item.title}
                          </h4>

                          <div className="mt-1.5 flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm text-zinc-300">
                            <span className="font-bold text-[#eb0028]">
                              {item.speakerName}
                            </span>
                            {item.speakerRole && (
                              <span className="text-zinc-500">
                                • {item.speakerRole}
                              </span>
                            )}
                          </div>
                        </>
                      ) : (
                        <h4 className="text-base font-bold text-white sm:text-lg">
                          {item.title}
                        </h4>
                      )}
                    </div>

                    {/* Description / Synopsis */}
                    {item.description && (
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-400">
                        {item.description}
                      </p>
                    )}

                    {/* Expandable Details Toggle */}
                    {isKeynote && (
                      <div className="mt-3.5 pt-2.5 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                        <button
                          type="button"
                          onClick={() => onToggleExpand(item.id)}
                          className="cursor-pointer inline-flex items-center gap-1 font-mono text-zinc-400 hover:text-white transition-colors"
                        >
                          <span>{isExpanded ? "Hide Details" : "Curator's Overview"}</span>
                          {isExpanded ? (
                            <ChevronUp className="h-3 w-3 text-[#eb0028]" />
                          ) : (
                            <ChevronDown className="h-3 w-3 text-[#eb0028]" />
                          )}
                        </button>

                        <Link
                          href="/speakers"
                          className="inline-flex items-center gap-1 font-mono text-[#eb0028] hover:underline"
                        >
                          <span>Speaker Bio</span>
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    )}

                    {isExpanded && isKeynote && (
                      <div className="mt-3 rounded-lg border border-zinc-800 bg-[#0d0d0d] p-3 text-xs font-mono text-zinc-400 space-y-1.5">
                        <div className="text-zinc-300 font-bold uppercase tracking-wider">
                          Session Block: {item.sessionLabel}
                        </div>
                        <div>
                          Allocated Duration: <span className="text-white font-bold">{item.duration}</span> (TED Standard)
                        </div>
                        <div>
                          Stage Location: <span className="text-white">{item.location}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
