"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  scheduleMeta,
  scheduleTimeline,
  sessionBlocks,
  ScheduleItem,
} from "@/data/schedule";
import {
  Clock,
  Calendar,
  ArrowRight,
  Share2,
  Check,
  Sparkles,
  Mic,
  Coffee,
  Utensils,
  Music,
  Layers,
} from "lucide-react";
import StackedScheduleSections from "@/components/schedule/StackedScheduleSections";
import AnimatedTimeline from "@/components/schedule/AnimatedTimeline";
import "./schedule.css";

export default function SchedulePage() {
  const [viewMode, setViewMode] = useState<"stacked" | "timeline">("stacked");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  // Toggle item synopsis expansion
  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Copy schedule page link
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  // Download simple .ics calendar file for the event
  const handleDownloadCalendar = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//TEDx BPHC//Schedule 2026//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${scheduleMeta.eventName} 2026 - ${scheduleMeta.theme}`,
      `DESCRIPTION:${scheduleMeta.subtitle}`,
      `LOCATION:${scheduleMeta.venueName}, ${scheduleMeta.venueLocation}, ${scheduleMeta.city}`,
      "DTSTART:20261114T033000Z",
      "DTEND:20261114T120000Z",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "TEDxBPHC_2026_Schedule.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getItemIcon = (type: ScheduleItem["type"]) => {
    switch (type) {
      case "talk":
        return <Mic className="h-4 w-4 text-[#eb0028]" />;
      case "break":
        return <Coffee className="h-4 w-4 text-zinc-400" />;
      case "lunch":
        return <Utensils className="h-4 w-4 text-zinc-400" />;
      case "performance":
        return <Music className="h-4 w-4 text-[#eb0028]" />;
      case "ceremony":
        return <Sparkles className="h-4 w-4 text-[#eb0028]" />;
      default:
        return <Clock className="h-4 w-4 text-zinc-400" />;
    }
  };

  return (
    <div className="editorial-page relative min-h-screen bg-[#0a0a0a] text-zinc-100">
      {/* Subtle Background Tiles */}
      <div
        className="pointer-events-none absolute inset-0 bg-tiles opacity-30"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        {/* =========================================================================
            HEADER: AUTHENTIC TEDx CONFERENCE BRANDING
            ========================================================================= */}
        <header className="mb-12 border-b border-zinc-800/80 pb-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              {/* Event Badge */}
              <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#eb0028]">
                <span className="h-2 w-2 rounded-full bg-[#eb0028] shadow-[0_0_8px_#eb0028]" />
                <span>{scheduleMeta.eventName} • {scheduleMeta.dayScheduleType}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-6xl md:text-7xl">
                Conference Schedule
              </h1>

              {/* Subtitle & Event Context */}
              <p className="mt-3 max-w-2xl text-sm font-normal text-zinc-400 sm:text-base">
                {scheduleMeta.subtitle}
              </p>

              {/* Event Date & Status Chips */}
              <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-300">
                {/* Date Display Pill */}
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-[#141414] px-3 py-1.5 font-bold text-white">
                  <Calendar className="h-3.5 w-3.5 text-[#eb0028]" />
                  <span>{scheduleMeta.date}</span>
                </span>

                {/* Date Note Pill */}
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#eb0028]/30 bg-[#eb0028]/10 px-3 py-1.5 text-[11px] font-semibold text-[#eb0028]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#eb0028] animate-pulse" />
                  <span>{scheduleMeta.dateStatus}</span>
                </span>
              </div>
            </div>

            {/* Quick Action Buttons & View Mode Switcher */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Stacked Deck vs Flat Timeline Switcher */}
              <div className="inline-flex items-center rounded-xl border border-zinc-800 bg-[#121212] p-1 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode("stacked")}
                  className={`cursor-pointer inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-bold transition-all ${
                    viewMode === "stacked"
                      ? "bg-[#eb0028] text-white shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  title="3D tactile card deck that pins as you scroll"
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>Stacked Deck</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("timeline")}
                  className={`cursor-pointer inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-bold transition-all ${
                    viewMode === "timeline"
                      ? "bg-[#eb0028] text-white shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  title="Animated vertical timeline with glowing progress beam"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Animated Timeline</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleDownloadCalendar}
                className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#121212] px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
                title="Add event placeholder to your calendar"
              >
                <Calendar className="h-3.5 w-3.5 text-[#eb0028]" />
                <span>Add to Calendar</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#121212] px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
                title="Copy schedule link"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>

              <Link
                href="/speakers"
                className="inline-flex items-center gap-2 rounded-xl border border-[#eb0028]/40 bg-[#eb0028]/10 px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#eb0028] transition-colors hover:bg-[#eb0028] hover:text-white"
              >
                <span>Speakers</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SCHEDULE PRESENTATION (Zero-Lag Stacked 3D Deck OR Flat Timeline)
            ========================================================================= */}
        {viewMode === "stacked" ? (
          <StackedScheduleSections
            sessionBlocks={sessionBlocks}
            items={scheduleTimeline}
            expandedItems={expandedItems}
            onToggleExpand={toggleExpand}
            getItemIcon={getItemIcon}
          />
        ) : (
          <AnimatedTimeline
            items={scheduleTimeline}
            sessionBlocks={sessionBlocks}
            expandedItems={expandedItems}
            onToggleExpand={toggleExpand}
            getItemIcon={getItemIcon}
          />
        )}

        {/* =========================================================================
            BOTTOM BANNER: WELLINGTON FLYER FOOTER STRIP
            ========================================================================= */}
        <div className="mt-20">
          <div className="tedx-wellington-banner">
            <div>
              <div className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white">
                {scheduleMeta.theme}
              </div>
              <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider mt-0.5">
                {scheduleMeta.eventName} • {scheduleMeta.edition}
              </div>
            </div>

            <div className="text-center sm:text-right font-mono text-xs text-zinc-300">
              <div className="font-bold text-white uppercase tracking-wider text-sm">
                {scheduleMeta.date}
              </div>
              <div className="text-zinc-400">
                {scheduleMeta.venueName}
              </div>
              <div className="text-[11px] text-zinc-500">
                {scheduleMeta.venueLocation}, {scheduleMeta.city}
              </div>
            </div>
          </div>

          {/* Quick Links / CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-800/80 bg-[#121212] p-4 sm:px-6">
            <div className="text-xs text-zinc-400 font-mono">
              <span className="text-[#eb0028] font-bold">NOTE:</span> Timings and speaker slots are subject to minor curatorial adjustments.
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/venue"
                className="font-mono text-xs text-zinc-300 hover:text-white transition-colors"
              >
                Directions & Venue →
              </Link>
              <Link
                href="/faq"
                className="font-mono text-xs text-zinc-300 hover:text-white transition-colors"
              >
                Event FAQ →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
