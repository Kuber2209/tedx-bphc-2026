"use client";

import { useState, useMemo } from "react";
import { currentSpeakers, pastSpeakers } from "@/data/speakers";
import SpeakerCard from "@/components/speakers/SpeakerCard";
import PastSpeakerItem from "@/components/speakers/PastSpeakerItem";
import FilterDisclosure, {
  DEFAULT_YEAR_ITEMS,
} from "@/components/speakers/FilterDisclosure";

export default function SpeakersPage() {
  const [activeTab, setActiveTab] = useState<"current" | "past">("current");
  const [expandedSpeakerId, setExpandedSpeakerId] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("all");

  // Filter past speakers by selected edition year
  const filteredPastSpeakers = useMemo(() => {
    if (selectedYear === "all") {
      return pastSpeakers;
    }
    return pastSpeakers.filter((speaker) => speaker.year === selectedYear);
  }, [selectedYear]);

  return (
    <div className="speakers-page relative min-h-screen bg-[#0a0a0a] text-zinc-100">
      {/* Background Subtle Tiles Grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-tiles opacity-40"
        aria-hidden="true"
      />

      {/* Subtle Ambient Red Glow Accent */}
      <div
        className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-[#E62B1E]/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="speakers-container relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        {/* Header Section */}
        <header className="speakers-header mb-10">
          <div className="flex flex-col gap-2">
            <span className="speakers-tag text-xs font-mono font-semibold uppercase tracking-widest text-[#E62B1E]">
              TEDx BPHC 2026
            </span>
            <h1 className="speakers-title text-4xl font-black uppercase tracking-tight text-white sm:text-6xl md:text-7xl">
              TEDx 2026 SPEAKERS.
            </h1>
            <p className="speakers-subtitle max-w-2xl text-sm font-light text-zinc-400 sm:text-base">
              Igniting conversations, sparking change. Ideas that challenge boundaries and inspire action.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="speakers-tabs mt-10 flex items-center gap-8 border-b border-zinc-800 text-xs sm:text-sm font-semibold tracking-wider uppercase">
            <button
              type="button"
              onClick={() => setActiveTab("current")}
              className={`speakers-tab-button relative pb-3 transition-colors ${
                activeTab === "current"
                  ? "text-white font-bold"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className="flex items-center gap-2">
                2026-27{" "}
                <span className="rounded bg-[#E62B1E]/15 px-1.5 py-0.5 font-mono text-[10px] text-[#E62B1E]">
                  CURRENT
                </span>
              </span>
              {activeTab === "current" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E62B1E]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("past")}
              className={`speakers-tab-button relative pb-3 transition-colors ${
                activeTab === "past"
                  ? "text-white font-bold"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span>PAST SPEAKERS</span>
              {activeTab === "past" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E62B1E]" />
              )}
            </button>
          </div>
        </header>

        {/* Current Speakers View (3x3 Grid) */}
        {activeTab === "current" && (
          <section aria-label="Current Speakers" className="current-speakers-section">
            <div className="speakers-theme-banner mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400">
                <span className="h-2 w-2 rounded-full bg-[#E62B1E] animate-pulse" />
                <span>Theme 2026-27: Ideas worth spreading — coming 2026</span>
              </div>
              <div className="flex items-center gap-6 text-xs font-mono uppercase text-zinc-500">
                <span>
                  Edition <strong className="text-zinc-300">12th</strong>
                </span>
              </div>
            </div>

            <div className="speakers-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentSpeakers.map((speaker) => (
                <SpeakerCard key={speaker.id} speaker={speaker} />
              ))}
            </div>
          </section>
        )}

        {/* Past Speakers View (List Only with Expandable Photo & Details) */}
        {activeTab === "past" && (
          <section aria-label="Past Speakers" className="past-speakers-section">
            <div className="past-speakers-header mb-8 flex flex-col gap-4 border-b border-zinc-800/80 pb-6 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400">
                  <span className="h-2 w-2 rounded-full bg-[#E62B1E]" />
                  <span>
                    Past Speakers: Voices That Shaped Us (
                    {filteredPastSpeakers.length}
                    {selectedYear !== "all" ? ` • ${selectedYear} Edition` : ""}
                    )
                  </span>
                </div>
                <p className="text-xs font-mono text-zinc-500">
                  Filter by edition year on the right • Click any speaker to view photo & talk
                </p>
              </div>

              {/* Year Filter Component - FilterDisclosure */}
              <div className="flex items-center justify-start md:justify-end">
                <FilterDisclosure
                  items={DEFAULT_YEAR_ITEMS}
                  defaultActiveId={selectedYear}
                  onChange={(yearId) => {
                    setSelectedYear(yearId);
                    setExpandedSpeakerId(null);
                  }}
                />
              </div>
            </div>

            {/* Past Speakers List or Clean Empty State */}
            {filteredPastSpeakers.length > 0 ? (
              <div className="past-speakers-list space-y-3">
                {filteredPastSpeakers.map((speaker, index) => (
                  <PastSpeakerItem
                    key={speaker.id}
                    speaker={speaker}
                    index={index}
                    isExpanded={expandedSpeakerId === speaker.id}
                    onToggle={() =>
                      setExpandedSpeakerId(
                        expandedSpeakerId === speaker.id ? null : speaker.id
                      )
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/20 p-12 text-center">
                <p className="font-mono text-sm text-zinc-400">
                  No past speakers found for the {selectedYear} edition.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedYear("all")}
                  className="mt-3 font-mono text-xs text-[#E62B1E] hover:underline"
                >
                  Reset filter to show all editions
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
