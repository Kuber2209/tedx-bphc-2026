"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  Mic,
  Music,
  Coffee,
  Sparkles,
  ArrowRight,
  Calendar as CalendarIcon,
  User,
} from "lucide-react";

// ============================================================================
// TypeScript Interfaces
// ============================================================================

export interface Speaker {
  id?: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  bio?: string;
  profileUrl?: string;
}

export type EventCategory =
  | "all"
  | "keynote"
  | "performance"
  | "networking"
  | "break"
  | "ceremony";

export interface ScheduleEvent {
  id: string;
  time: string; // e.g., "09:30 AM – 10:15 AM"
  startTime: string;
  endTime?: string;
  duration?: string;
  tag: string; // e.g., "Keynote", "Thread I", "Interactive Break", "Panel"
  category: "keynote" | "performance" | "networking" | "break" | "ceremony";
  sessionBlock?: string; // e.g. "Morning", "Midday", "Afternoon", "Evening"
  threadChapter?: string; // e.g. "Thread I · Personal Catalysts"
  title: string;
  talkTitle?: string;
  speaker?: Speaker;
  description: string; // 1-2 sentence overview explaining how this session connects to overarching theme
  abstract?: string; // Full abstract for expandable accordion
  location?: string;
  isExpandable?: boolean;
}

interface TimelineProps {
  events: ScheduleEvent[];
  className?: string;
  onEventClick?: (event: ScheduleEvent) => void;
}

export default function Timeline({ events, className = "", onEventClick }: TimelineProps) {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getCategoryIcon = (category: ScheduleEvent["category"]) => {
    switch (category) {
      case "keynote":
        return <Mic className="h-3 w-3 text-[#eb0028]" />;
      case "performance":
        return <Music className="h-3 w-3 text-purple-600" />;
      case "networking":
      case "break":
        return <Coffee className="h-3 w-3 text-amber-600" />;
      case "ceremony":
      default:
        return <Sparkles className="h-3 w-3 text-[#eb0028]" />;
    }
  };

  const getCategoryBadgeClass = (category: ScheduleEvent["category"]) => {
    switch (category) {
      case "keynote":
        return "bg-red-50 text-red-600 border border-red-200/50";
      case "performance":
        return "bg-purple-50 text-purple-600 border border-purple-200/50";
      case "networking":
      case "break":
        return "bg-amber-50 text-amber-700 border border-amber-200/50";
      case "ceremony":
      default:
        return "bg-zinc-100 text-zinc-700 border border-zinc-200/60";
    }
  };

  const generateGoogleCalendarUrl = (event: ScheduleEvent) => {
    const title = encodeURIComponent(`TEDx BPHC: ${event.title}`);
    const details = encodeURIComponent(
      `${event.description}\n\nTheme: Invisible Threads\nSpeaker: ${event.speaker?.name || "TEDx BPHC"}\nDuration: ${event.time}`
    );
    const location = encodeURIComponent(event.location || "Auditorium, BITS Pilani Hyderabad Campus, Hyderabad, India");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  if (events.length === 0) {
    return (
      <div className="py-20 text-center text-zinc-500 font-sans">
        <p className="text-lg">No sessions match the selected filter.</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* =========================================================================
          UNBROKEN VERTICAL "INVISIBLE THREAD" TIMELINE LINE
          A subtle red/crimson stroke running down the schedule with glowing nodes
          ========================================================================= */}
      <div
        className="absolute top-6 bottom-10 left-3 sm:left-4 md:left-6 w-[2px] bg-gradient-to-b from-red-500 via-rose-400 to-slate-200 pointer-events-none"
        aria-hidden="true"
      />

      {/* =========================================================================
          EVENT ITEMS FLOATING NATURALLY ALONGSIDE THE THREAD
          ========================================================================= */}
      <div className="space-y-4">
        {events.map((event) => {
          const isExpanded = expandedIds[event.id] || false;
          const hasAccordion = Boolean(event.abstract || (event.speaker && event.speaker.bio) || event.isExpandable);

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative group flex items-start"
              onClick={() => onEventClick?.(event)}
            >
              {/* Circular Node sitting on the Invisible Thread */}
              <div className="absolute left-3 sm:left-4 md:left-6 top-6 -translate-x-1/2 flex items-center justify-center pointer-events-none z-10">
                <span className="relative w-3 h-3 rounded-full border-2 border-white bg-[#eb0028] group-hover:scale-125 transition-transform duration-300" />
              </div>

              {/* Event Content Container */}
              <div className="w-full pl-9 sm:pl-12 md:pl-16">
                <div className="border-b border-black/5 pb-8 pt-4 transition-colors duration-300 group-hover:border-red-200">
                  {/* Metadata Row: Time, Tag Badge, Location */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      {/* Time */}
                      <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-neutral-900 group-hover:text-[#eb0028] transition-colors flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[#eb0028]" />
                        <span>{event.time}</span>
                      </span>

                      {/* Tag Badge */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold ${getCategoryBadgeClass(
                          event.category
                        )}`}
                      >
                        {getCategoryIcon(event.category)}
                        <span>{event.tag}</span>
                      </span>

                      {/* Thread Chapter Indicator */}
                      {event.threadChapter && (
                        <span className="hidden sm:inline-block font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                          • {event.threadChapter}
                        </span>
                      )}
                    </div>

                    {/* Location */}
                    {event.location && (
                      <span className="flex items-center gap-1.5 font-mono text-xs text-zinc-500">
                        <MapPin className="h-3 w-3 text-[#eb0028]" />
                        <span className="truncate max-w-[200px] sm:max-w-none">{event.location}</span>
                      </span>
                    )}
                  </div>

                  {/* Session Title */}
                  <h3 className="font-sans font-bold tracking-tight text-xl sm:text-2xl text-neutral-900 group-hover:text-[#eb0028] transition-colors leading-snug">
                    {event.title}
                  </h3>

                  {/* Dedicated talk subtitle if present */}
                  {event.talkTitle && event.talkTitle !== event.title && (
                    <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mt-1">
                      &ldquo;{event.talkTitle}&rdquo;
                    </p>
                  )}

                  {/* Speaker Information with optional avatar */}
                  {event.speaker && (
                    <div className="flex items-center gap-3 mt-3 py-1">
                      {event.speaker.avatar ? (
                        <Image
                          src={event.speaker.avatar}
                          alt={event.speaker.name}
                          width={28}
                          height={28}
                          className="w-7 h-7 rounded-full object-cover border border-black/10"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-red-50 border border-red-200/60 flex items-center justify-center text-[#eb0028] font-bold text-xs">
                          {event.speaker.name.charAt(0) || <User className="h-3.5 w-3.5" />}
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-x-2 text-sm">
                        <span className="font-bold text-neutral-900">{event.speaker.name}</span>
                        {(event.speaker.role || event.speaker.company) && (
                          <span className="text-zinc-500 text-xs sm:text-sm font-light">
                            {event.speaker.role}
                            {event.speaker.company ? ` · ${event.speaker.company}` : ""}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Description: 1-2 sentence overview explaining connection to theme */}
                  <p className="text-sm font-light text-zinc-600 leading-relaxed mt-2.5 max-w-3xl">
                    {event.description}
                  </p>

                  {/* Accordion Expand Toggle */}
                  {hasAccordion && (
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(event.id);
                        }}
                        className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold font-sans uppercase tracking-wider text-[#eb0028] hover:text-black transition-colors"
                      >
                        <span>{isExpanded ? "Collapse Abstract" : "Session Abstract & Bio"}</span>
                        {isExpanded ? (
                          <ChevronUp className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5" />
                        )}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden mt-3"
                          >
                            <div className="py-4 pl-6 border-l-2 border-[#eb0028]/40 space-y-4 text-sm mt-3 bg-zinc-50/50 rounded-r-xl pr-4">
                              {/* Abstract */}
                              {event.abstract && (
                                <div>
                                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-[#eb0028] block mb-1.5">
                                    Curatorial Deep Dive
                                  </span>
                                  <p className="text-zinc-700 font-light leading-relaxed">
                                    {event.abstract}
                                  </p>
                                </div>
                              )}

                              {/* Speaker Bio */}
                              {event.speaker?.bio && (
                                <div>
                                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-[#eb0028] block mb-1.5">
                                    About {event.speaker.name}
                                  </span>
                                  <p className="text-zinc-700 font-light leading-relaxed">
                                    {event.speaker.bio}
                                  </p>
                                </div>
                              )}

                              {/* Action Footer */}
                              <div className="pt-3 border-t border-red-100 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                                <span className="text-zinc-500">
                                  Duration: {event.duration || "20 mins"} • 14 Nov 2026
                                </span>

                                <div className="flex items-center gap-4">
                                  <a
                                    href={generateGoogleCalendarUrl(event)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-[#eb0028] transition-colors"
                                  >
                                    <CalendarIcon className="h-3.5 w-3.5 text-[#eb0028]" />
                                    <span>Google Cal</span>
                                  </a>

                                  {event.category === "keynote" && (
                                    <Link
                                      href="/speakers"
                                      onClick={(e) => e.stopPropagation()}
                                      className="inline-flex items-center gap-1 font-bold text-black hover:text-[#eb0028] transition-colors"
                                    >
                                      <span>Full Profile</span>
                                      <ArrowRight className="h-3 w-3" />
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
