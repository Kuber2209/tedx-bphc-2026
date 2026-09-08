"use client";

import { useState, useMemo } from "react";
import { currentSpeakers, pastSpeakers } from "@/data/speakers";
import SpeakerCard from "@/components/speakers/SpeakerCard";
import PastSpeakerItem from "@/components/speakers/PastSpeakerItem";

const editionOptions = [
  { value: "2026", label: "AY 26-27", current: true },
  ...Array.from(new Set(pastSpeakers.map((speaker) => speaker.year).filter(Boolean))).map((year) => ({
    value: year as string,
    label: `AY ${String(year).slice(-2)}-${String(Number(year) + 1).slice(-2)}`,
    current: false,
  })),
];

export default function SpeakersPage() {
  const [expandedSpeakerId, setExpandedSpeakerId] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("2026");

  // Filter past speakers by selected edition year
  const filteredPastSpeakers = useMemo(() => {
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

          <div className="edition-filter-row mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">Explore TEDx BITS Hyderabad editions</p>
            <label className="edition-filter">
              <span>Academic year</span>
              <select value={selectedYear} onChange={(event) => { setSelectedYear(event.target.value); setExpandedSpeakerId(null); }}>
                {editionOptions.map((option) => <option key={option.value} value={option.value}>{option.label}{option.current ? " · Current" : ""}</option>)}
              </select>
            </label>
          </div>
        </header>

        {/* Current Speakers View (3x3 Grid) */}
        {selectedYear === "2026" && (
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
              {currentSpeakers.map((speaker, index) => (
                <div key={speaker.id} className="speaker-entrance" style={{ "--speaker-delay": `${index * 90}ms` } as React.CSSProperties}>
                  <SpeakerCard speaker={speaker} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Past Speakers View (List Only with Expandable Photo & Details) */}
        {selectedYear !== "2026" && (
          <section aria-label="Past Speakers" className="past-speakers-section">
            <div className="past-speakers-header mb-8 flex flex-col gap-4 border-b border-zinc-800/80 pb-6 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400">
                  <span className="h-2 w-2 rounded-full bg-[#E62B1E]" />
                  <span>
                    Voices that shaped us (
                    {filteredPastSpeakers.length}
                    {` • AY ${String(selectedYear).slice(-2)}-${String(Number(selectedYear) + 1).slice(-2)}`}
                    )
                  </span>
                </div>
                <p className="text-xs font-mono text-zinc-500">
                  Filter by edition year on the right • Click any speaker to view photo & talk
                </p>
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
                  onClick={() => setSelectedYear("2026")}
                  className="mt-3 font-mono text-xs text-[#E62B1E] hover:underline"
                >
                  Return to the current edition
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
