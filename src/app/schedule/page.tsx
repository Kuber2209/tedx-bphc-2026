"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  scheduleMeta,
  scheduleTimeline,
  sessionBlocks,
  themeStory,
  ScheduleItem,
} from "@/data/schedule";
import InvisibleThreadsCanvas from "@/components/schedule/InvisibleThreadsCanvas";
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
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function SchedulePage() {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTabBlock, setActiveTabBlock] = useState<string>("all");

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const handleDownloadCalendar = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//TEDx BPHC//Schedule 2026//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${scheduleMeta.eventName} 2026 — ${scheduleMeta.theme}`,
      `DESCRIPTION:${scheduleMeta.subtitle}\n\nTheme Concept: ${themeStory.concept}`,
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
    link.setAttribute("download", "TEDxBPHC_2026_Invisible_Threads_Schedule.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredItems = useMemo(() => {
    return scheduleTimeline.filter((item) => {
      if (activeTabBlock !== "all" && item.sessionBlock !== activeTabBlock) {
        return false;
      }
      return true;
    });
  }, [activeTabBlock]);

  const getItemBadge = (item: ScheduleItem) => {
    if (item.isSpeakerTalk) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eb0028]/10 px-2.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-[#eb0028]">
          <Mic className="h-3 w-3" />
          <span>Talk {String(item.speakerNumber).padStart(2, "0")} · Keynote</span>
        </span>
      );
    }
    if (item.type === "performance") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-2.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-purple-600 border border-purple-200">
          <Music className="h-3 w-3" />
          <span>Interlude</span>
        </span>
      );
    }
    if (item.type === "lunch") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-amber-700 border border-amber-200">
          <Utensils className="h-3 w-3" />
          <span>Networking Luncheon</span>
        </span>
      );
    }
    if (item.type === "break" || item.type === "networking") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-zinc-600">
          <Coffee className="h-3 w-3" />
          <span>Social Intermission</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-zinc-600">
        <Sparkles className="h-3 w-3 text-[#eb0028]" />
        <span>Curatorial</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-transparent text-black selection:bg-[#E62B1E] selection:text-neutral-900 pb-32 font-sans relative overflow-hidden">
      <div className="relative z-10">
      {/* =========================================================================
          1. HERO — EDITORIAL THEME INAUGURATION
          ========================================================================= */}
      <header className="pt-40 pb-20 px-6 md:px-12 border-b border-black/5 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-8 bg-[#eb0028]"></div>
            <span className="text-zinc-500 font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">
              Conference Programme · {scheduleMeta.edition}
            </span>
          </div>

          {/* Headline with localized Invisible Threads animation flowing into the right space */}
          <div className="relative mb-8 w-full min-h-[220px] sm:min-h-[260px] md:min-h-[320px] flex items-center">
            <InvisibleThreadsCanvas />
            <h1 className="relative z-10 text-6xl sm:text-7xl md:text-[130px] font-bold tracking-tighter leading-[0.85] pointer-events-auto select-none">
              Invisible <br />
              <span className="font-bold text-[#eb0028]">threads.</span>
            </h1>
          </div>

          {/* Subtitle & Actions Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mt-12">
            <div className="max-w-2xl">
              <p className="text-zinc-600 text-xl md:text-2xl font-light leading-relaxed mb-6">
                The unseen connections that quietly shape our lives. A single-day journey tracing personal catalysts, societal fabrics, and the ripples we cast into tomorrow.
              </p>
              
              {/* Event Metadata Chips */}
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-600">
                <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-zinc-50 px-3.5 py-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#eb0028]" />
                  <span className="font-semibold text-black">{scheduleMeta.date}</span>
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-zinc-50 px-3.5 py-1.5">
                  <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                  <span>{scheduleMeta.venueName}, BPHC</span>
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-[#eb0028]/10 border border-[#eb0028]/20 px-3.5 py-1.5 text-[11px] font-bold text-[#eb0028]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#eb0028] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#eb0028]" />
                  </span>
                  <span>1-Day Flagship Pass</span>
                </span>
              </div>
            </div>

            {/* Quick Utility Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleDownloadCalendar}
                className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-800 transition-all hover:border-black/30 hover:bg-zinc-50 hover:shadow-xs"
              >
                <Calendar className="h-3.5 w-3.5 text-[#eb0028]" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-800 transition-all hover:border-black/30 hover:bg-zinc-50 hover:shadow-xs"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied Link!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5 text-zinc-500" />
                    <span>Share</span>
                  </>
                )}
              </button>

              <Link
                href="/speakers"
                className="inline-flex items-center gap-2 rounded-full bg-white text-neutral-900 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] transition-all hover:bg-[#eb0028]"
              >
                <span>View Speakers</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </header>

      {/* =========================================================================
          2. THEME MANIFESTO: INVISIBLE THREADS
          ========================================================================= */}
      <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto border-b border-black/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left: Theme Statement */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-2 w-2 rounded-full bg-[#eb0028]" />
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-[#eb0028]">
                  The Curatorial Thesis
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 leading-tight mb-8">
                &ldquo;These connections may be invisible, but their effects are not.&rdquo;
              </h2>
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed font-light mb-8">
                {themeStory.narrative}
              </p>
              <div className="border-l-2 border-[#eb0028] pl-4 py-1">
                <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
                  TEDx BITS Hyderabad 2026 · Theme Manifesto
                </p>
              </div>
            </div>
          </div>

          {/* Right: 4 Thematic Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {themeStory.pillars.map((pillar, i) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col justify-between p-8 rounded-2xl bg-zinc-50/80 border border-black/5 hover:border-black/15 hover:bg-white hover:shadow-lg transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#eb0028] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div>
                  <span className="font-mono text-xs font-bold text-[#eb0028] mb-4 block">
                    {pillar.number} · THREAD
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-black mb-2 group-hover:text-[#eb0028] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">
                    {pillar.tagline}
                  </p>
                  <p className="text-sm font-light text-zinc-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SESSION CHAPTER TABS (Acts of the Day)
          ========================================================================= */}
      <section className="pt-20 pb-10 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="mb-12">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-[#eb0028] mb-2">
            Chronology & Chapters
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black">
            The Day’s Journey.
          </h2>
        </div>

        {/* Acts Banner Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {sessionBlocks.map((block, idx) => {
            const isSelected = activeTabBlock === block.id;
            return (
              <button
                key={block.id}
                type="button"
                onClick={() => setActiveTabBlock(isSelected ? "all" : block.id)}
                className={`cursor-pointer text-left p-5 rounded-xl border transition-all duration-300 ${
                  isSelected
                    ? "bg-white border-[#eb0028] shadow-md ring-1 ring-[#eb0028]/30"
                    : "bg-zinc-50 border-black/5 hover:border-black/15 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#eb0028]">
                    Act 0{idx + 1}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500">
                    {block.timeRange.split("–")[0].trim()}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-black line-clamp-1 mb-1">
                  {block.name.replace(/Session \d+: /, "")}
                </h4>
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest line-clamp-1">
                  {block.threadChapter}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          4. THE CONNECTED THREAD: VERTICAL EDITORIAL TIMELINE
          ========================================================================= */}
      <main className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="relative border-l-2 border-zinc-200 pl-6 sm:pl-10 md:pl-12 space-y-12 ml-3 sm:ml-6">
          {/* Subtle pulsating top anchor node */}
          <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-[#eb0028] ring-4 ring-white shadow-sm" />

          {filteredItems.map((item, index) => {
            const isExpanded = !!expandedItems[item.id];
            const isKeynote = item.isSpeakerTalk;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 1.0, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Node indicator along the thread */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] md:-left-[55px] top-7 flex items-center justify-center h-5 w-5 rounded-full ring-4 ring-white transition-all duration-500 ${
                    isKeynote
                      ? "bg-[#eb0028] shadow-[0_0_10px_rgba(235,0,40,0.4)] group-hover:scale-125"
                      : "bg-zinc-400 group-hover:bg-black"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </div>

                {/* Event Card Container */}
                <div
                  className={`rounded-2xl p-6 sm:p-8 transition-all duration-500 ${
                    isKeynote
                      ? "bg-white border-2 border-black/10 hover:border-black/30 hover:shadow-xl"
                      : "bg-zinc-50/70 border border-black/5 hover:bg-white hover:border-black/15 hover:shadow-md"
                  }`}
                >
                  {/* Top Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      {getItemBadge(item)}
                      {item.topicTag && (
                        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                          / {item.topicTag}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 font-mono text-xs">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 px-2.5 py-1 text-zinc-700 font-semibold">
                        <Clock className="h-3 w-3 text-[#eb0028]" />
                        <span>{item.time}{item.endTime ? ` – ${item.endTime}` : ""}</span>
                      </span>
                      {item.duration && (
                        <span className="hidden sm:inline text-zinc-500 text-[11px]">
                          {item.duration}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Main Event Title */}
                  <div className="mb-3">
                    <h3
                      className={`${
                        isKeynote ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
                      } font-bold tracking-tight text-black group-hover:text-[#eb0028] transition-colors`}
                    >
                      {item.title}
                    </h3>

                    {/* Dedicated talk title / sub-headline if present */}
                    {item.talkTitle && item.talkTitle !== item.title && (
                      <p className="text-sm sm:text-base font-medium text-zinc-500 uppercase tracking-widest mt-2">
                        &ldquo;{item.talkTitle}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Speaker Details (if Keynote) */}
                  {item.speakerName && (
                    <div className="flex flex-wrap items-center gap-3 py-2 text-sm text-zinc-600">
                      <span className="font-semibold text-black">
                        {item.speakerName}
                      </span>
                      {item.speakerRole && (
                        <>
                          <span className="text-zinc-600">•</span>
                          <span className="text-sm font-medium text-zinc-500 uppercase tracking-widest">
                            {item.speakerRole}
                          </span>
                        </>
                      )}
                    </div>
                  )}

                  {/* Short Description */}
                  {item.description && (
                    <p className="text-sm font-light text-zinc-600 leading-relaxed mt-2 line-clamp-2 group-hover:line-clamp-none transition-all">
                      {item.description}
                    </p>
                  )}

                  {/* Bottom Location & Expand Bar */}
                  <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs text-zinc-500 font-mono">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-zinc-500" />
                      <span>{item.location || "Auditorium, BPHC"}</span>
                    </span>

                    {/* Expand synopsis button if talk has description */}
                    {isKeynote && (
                      <button
                        type="button"
                        onClick={() => toggleExpand(item.id)}
                        className="cursor-pointer inline-flex items-center gap-1 text-[#eb0028] font-bold hover:underline"
                      >
                        <span>{isExpanded ? "Hide Synopsis" : "Talk Synopsis"}</span>
                        {isExpanded ? (
                          <ChevronUp className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Collapsible Talk Synopsis Drawer */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-dashed border-black/10 bg-zinc-50/80 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 sm:p-8 rounded-b-2xl">
                          <p className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-[#eb0028] mb-2">
                            Curatorial Deep-Dive
                          </p>
                          <p className="text-sm font-light text-zinc-700 leading-relaxed mb-4">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs font-mono">
                            <span className="text-zinc-500">Scheduled: 18 min talk + 2 min transition</span>
                            <Link href="/speakers" className="text-black font-bold hover:text-[#eb0028] inline-flex items-center gap-1">
                              <span>Speaker Profile</span>
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}

          {/* Thread Terminal Node */}
          <div className="pt-4 flex items-center gap-3 font-mono text-xs text-zinc-500">
            <span className="h-2 w-2 rounded-full bg-[#eb0028]" />
            <span>End of Official Programme · Sundowner continues on Guest House Lawn</span>
          </div>
        </div>
      </main>

      {/* =========================================================================
          5. BOTTOM BANNER & CTAS
          ========================================================================= */}
      <section className="mt-32 max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="border border-black/10 bg-zinc-50 p-8 md:p-14 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#eb0028] font-bold block mb-2">
              Join The Ripple
            </span>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-black mb-3">
              Be there when the threads connect.
            </h3>
            <p className="text-zinc-600 text-base md:text-lg font-light max-w-xl">
              Seating in the main auditorium is strictly limited to ensure an intimate, focused atmosphere for meaningful dialogue.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link
              href="/passes"
              className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-3 rounded-full bg-[#eb0028] text-neutral-900 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-black hover:shadow-lg"
            >
              <span>Explore Passes</span>
              <span>↗</span>
            </Link>
            <Link
              href="/venue"
              className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 rounded-full border border-black/20 bg-white text-black px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] transition-all hover:border-black"
            >
              <span>Venue Guide</span>
            </Link>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
