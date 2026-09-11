"use client";

import React from "react";
import {
  ScheduleItem,
  SessionBlockOverview,
} from "@/data/schedule";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  MapPin,
} from "lucide-react";
import Link from "next/link";

interface StackedScheduleSectionsProps {
  sessionBlocks: SessionBlockOverview[];
  items: ScheduleItem[];
  expandedItems: Record<string, boolean>;
  onToggleExpand: (id: string) => void;
  getItemIcon: (type: ScheduleItem["type"]) => React.ReactNode;
}

const BLOCK_ROMAN = ["I", "II", "III", "IV", "V"];

export default function StackedScheduleSections({
  sessionBlocks,
  items,
  expandedItems,
  onToggleExpand,
  getItemIcon,
}: StackedScheduleSectionsProps) {
  // Smoothly scroll to a specific block when its pinned tab is clicked
  const handleTabClick = (blockId: string) => {
    const el = document.getElementById(`session-block-${blockId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className="stacked-schedule-deck relative flex w-full flex-col pb-32 [--stack-base-top:10px] [--stack-offset:56px] sm:[--stack-base-top:14px] sm:[--stack-offset:66px]"
      style={{
        paddingBottom: `calc(${sessionBlocks.length} * var(--stack-offset) + 2rem)`,
      }}
    >
      {sessionBlocks.map((block, blockIndex) => {
        const blockItems = items.filter((item) => item.sessionBlock === block.id);
        const keynoteCount = blockItems.filter((item) => item.isSpeakerTalk).length;
        const romanNumeral = BLOCK_ROMAN[blockIndex] || `${blockIndex + 1}`;
        const cardIndex = blockIndex + 1;

        return (
          <section
            key={block.id}
            id={`session-block-${block.id}`}
            data-block-id={block.id}
            className="stacked-act-section relative w-full pb-14 sm:pb-20"
          >
            {/* ============================================================= */}
            {/* PINNED ACT HEADER TAB                                         */}
            {/* Stays pinned to the top as a deck of indexed tabs, while the */}
            {/* card body below scrolls naturally without any truncation.    */}
            {/* ============================================================= */}
            <div
              className="sticky z-20 w-full"
              style={{
                zIndex: cardIndex * 10,
                top: `calc(var(--stack-base-top) + ${blockIndex} * var(--stack-offset))`,
              }}
            >
              <div
                onClick={() => handleTabClick(block.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleTabClick(block.id);
                  }
                }}
                className="group relative h-[52px] sm:h-[62px] w-full cursor-pointer flex items-center justify-between px-4 sm:px-6 rounded-2xl border border-zinc-800/90 bg-[#121214]/98 shadow-[0_10px_30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-2xl transition-colors hover:border-zinc-700 select-none overflow-hidden"
                title="Click to jump to this session act"
              >
                {/* Glowing red accent strip at the top edge */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#eb0028]/80 to-transparent" />

                {/* Left: Act Roman Badge & Name */}
                <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                  <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg border border-[#eb0028]/40 bg-[#eb0028]/10 font-mono text-xs font-black text-[#eb0028] shadow-[0_0_10px_rgba(235,0,40,0.15)]">
                    {romanNumeral}
                  </span>

                  <div className="min-w-0 truncate">
                    <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#eb0028] mr-2">
                      Act {romanNumeral}
                    </span>
                    <span className="text-xs sm:text-sm font-black uppercase tracking-tight text-neutral-900 group-hover:text-zinc-100">
                      {block.name}
                    </span>
                  </div>
                </div>

                {/* Right: Time Pill & Stats */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0 font-mono text-xs">
                  <span className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-zinc-800/90 bg-zinc-900/80 px-2.5 py-1 text-[11px] font-bold text-zinc-700">
                    <Clock className="h-3 w-3 text-[#eb0028]" />
                    <span>{block.timeRange}</span>
                  </span>

                  <span className="sm:hidden text-[11px] font-bold text-zinc-600">
                    {block.timeRange}
                  </span>

                  <span className="hidden md:inline-block rounded-lg border border-zinc-800/60 bg-zinc-900/40 px-2 py-0.5 text-[10px] text-zinc-500">
                    {blockItems.length} events{keynoteCount > 0 ? ` • ${keynoteCount} talks` : ""}
                  </span>
                </div>
              </div>
            </div>

            {/* ============================================================= */}
            {/* FULL EVENT CARD BODY (In-Flow, 100% Scrollable, Never Cut Off)*/}
            {/* Attendees can read every single event, keynote, and synopsis   */}
            {/* with full comfortable scrolling room.                         */}
            {/* ============================================================= */}
            <div className="mt-3.5 rounded-2xl border border-zinc-800/80 bg-[#121214]/85 p-4 sm:p-7 shadow-xl backdrop-blur-xl flex flex-col gap-4">
              {/* Block Tagline Subtitle */}
              {block.tagline && (
                <div className="mb-2 font-mono text-xs text-zinc-500 border-l-2 border-[#eb0028]/40 pl-3">
                  {block.tagline}
                </div>
              )}

              {blockItems.map((item) => {
                const isExpanded = !!expandedItems[item.id];
                const isKeynote = item.isSpeakerTalk;

                return (
                  <div
                    key={item.id}
                    className="relative flex flex-col gap-2 sm:flex-row sm:gap-5 items-start"
                  >
                    {/* Left: Time Column */}
                    <div className="sm:w-32 shrink-0 sm:text-right pt-1">
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
                        <div className="font-mono text-[10px] text-zinc-500">
                          {item.duration}
                        </div>
                      )}
                    </div>

                    {/* Right: Event Card */}
                    <div
                      className={`tedx-event-card flex-1 w-full ${
                        isKeynote
                          ? "tedx-event-card-speaker"
                          : item.type === "lunch" || item.type === "break"
                          ? "tedx-event-card-break"
                          : ""
                      }`}
                    >
                      {/* Mobile Time Sub-Row */}
                      <div className="sm:hidden mb-2 flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-[#eb0028]">
                          {item.time} {item.endTime ? `— ${item.endTime}` : ""}
                        </span>
                        {item.duration && (
                          <span className="font-mono text-[11px] text-zinc-500">
                            {item.duration}
                          </span>
                        )}
                      </div>

                      {/* Top Meta: Label / Location / Topic */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex flex-wrap items-center gap-2 font-mono">
                          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-zinc-500">
                            {getItemIcon(item.type)}
                            <span>{item.sessionLabel}</span>
                          </span>

                          {item.location && (
                            <span className="flex items-center gap-1 text-zinc-500">
                              • <MapPin className="h-3 w-3 text-zinc-500" /> {item.location}
                            </span>
                          )}
                        </div>

                        {item.topicTag && (
                          <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 font-mono text-[10px] text-zinc-500">
                            #{item.topicTag}
                          </span>
                        )}
                      </div>

                      {/* Title & Talk Info */}
                      <div className="mt-2.5">
                        <h3 className="text-base font-bold text-neutral-900 sm:text-lg">
                          {item.talkTitle || item.title}
                        </h3>

                        {/* Keynote Speaker Block */}
                        {item.isSpeakerTalk && (
                          <div className="mt-2.5 rounded-lg border border-zinc-800/80 bg-zinc-950/60 p-3">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                              <div>
                                <div className="font-bold text-[#eb0028]">
                                  {item.speakerName}
                                </div>
                                <div className="font-mono text-xs text-zinc-500">
                                  {item.speakerRole}
                                </div>
                              </div>

                              {item.speakerName && (
                                <Link
                                  href="/speakers"
                                  className="mt-1 sm:mt-0 inline-flex items-center gap-1 font-mono text-xs text-zinc-500 hover:text-white transition-colors"
                                >
                                  <span>Speaker Bio</span>
                                  <ExternalLink className="h-3 w-3 text-[#eb0028]" />
                                </Link>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Expandable Synopsis Toggle */}
                      {item.description && (
                        <div className="mt-3">
                          <button
                            type="button"
                            onClick={() => onToggleExpand(item.id)}
                            className="cursor-pointer inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-zinc-500 transition-colors hover:text-white"
                          >
                            <span>{isExpanded ? "Hide synopsis" : "View synopsis"}</span>
                            {isExpanded ? (
                              <ChevronUp className="h-3 w-3 text-[#eb0028]" />
                            ) : (
                              <ChevronDown className="h-3 w-3" />
                            )}
                          </button>

                          {isExpanded && (
                            <div className="mt-2 text-xs leading-relaxed text-zinc-600 border-l border-zinc-200 pl-3">
                              {item.description}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
