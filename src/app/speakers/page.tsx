"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { currentSpeakers, pastSpeakers } from "@/data/speakers";
import AcademicYearDropdown, { EditionOption } from "@/components/speakers/AcademicYearDropdown";
import SpeakerCard from "@/components/speakers/SpeakerCard";

// Generate options for past years
const pastYears = Array.from(
  new Set(pastSpeakers.map((speaker) => speaker.year).filter(Boolean))
) as string[];
const defaultPastYear = pastYears.length > 0 ? pastYears[0] : "";

const editionOptions: EditionOption[] = pastYears.map((year) => ({
  value: year,
  label: `AY ${String(year).slice(-2)}–${String(Number(year) + 1).slice(-2)}`,
  editionName: `Archive ${year}`,
  description: `Speakers and ideas from the ${year} edition.`,
  current: false,
}));

export default function SpeakersPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState(defaultPastYear);

  const selectedPastSpeakers = useMemo(
    () => pastSpeakers.filter((speaker) => speaker.year === selectedYear),
    [selectedYear]
  );

  const allSpeakersCount = currentSpeakers.length + pastSpeakers.length;

  return (
    <div className="min-h-screen bg-white text-[#181830] selection:bg-[#eb0028] selection:text-white">
      {/* 
        HERO SECTION (Matching TEDx MIT .rl_section_hero.speakers)
        Header: "Inspiring Innovators Unleashed"
        Subtitle & Action Buttons identical to https://tedx.mit.edu/allspeakers
        Zero background animations.
      */}
      <header className="relative w-full bg-[#0a0a0c] overflow-hidden">
        {/* Subtle radial depth overlay for TEDx contrast */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_top_right,rgba(235,0,40,0.25),transparent_60%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-70 bg-gradient-to-b from-black/80 via-black/60 to-[#0a0a0c]"
          aria-hidden="true"
        />

        <div className="relative max-w-[80rem] mx-auto px-6 md:px-12 pt-36 pb-20 md:pt-44 md:pb-28">
          <div className="max-w-[42rem]">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.2]">
              Inspiring Innovators Unleashed
            </h1>

            {/* Spacing block 1 (1.5rem / 24px) */}
            <div className="h-6 w-full" aria-hidden="true" />

            {/* Subtitle */}
            <p className="text-white/90 text-lg md:text-[1.125rem] font-normal leading-relaxed">
              Discover the thought leaders and innovators who have shared their transformative
              ideas on our stage. Explore their inspiring talks and learn more about their
              groundbreaking work.
            </p>

            {/* Spacing block 2 (2rem / 32px) */}
            <div className="h-8 w-full" aria-hidden="true" />

            {/* CTA Button Group */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/passes"
                className="inline-flex items-center justify-center px-6 py-3 rounded-[4px] bg-[#eb0028] hover:bg-[#960800] text-white font-semibold text-base transition-colors duration-200 shadow-sm"
              >
                Register for 2026
              </Link>
              <a
                href="#archive"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("archive");
                  const el = document.getElementById("archive");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-[4px] border border-white hover:bg-white hover:text-black text-white font-semibold text-base transition-all duration-200"
              >
                Previous Talks
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 
        SPEAKERS GRID SECTION (Matching TEDx MIT .rl_section_speakers & .collection-list-4)
        Pure white background, clean 3-column collection grid, completely static without animations.
      */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12">
          {/* Filter Navigation */}
          <div className="mb-14 pb-4 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-200 ${
                  activeTab === "all"
                    ? "bg-[#181830] text-white"
                    : "bg-zinc-100 text-[#494949] hover:bg-zinc-200 hover:text-black"
                }`}
              >
                All Speakers ({allSpeakersCount})
              </button>
              <button
                onClick={() => setActiveTab("current")}
                className={`px-4 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-200 ${
                  activeTab === "current"
                    ? "bg-[#181830] text-white"
                    : "bg-zinc-100 text-[#494949] hover:bg-zinc-200 hover:text-black"
                }`}
              >
                2026 Lineup ({currentSpeakers.length})
              </button>
              {pastYears.length > 0 && (
                <button
                  onClick={() => setActiveTab("archive")}
                  className={`px-4 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-200 ${
                    activeTab === "archive"
                      ? "bg-[#181830] text-white"
                      : "bg-zinc-100 text-[#494949] hover:bg-zinc-200 hover:text-black"
                  }`}
                >
                  Previous Editions ({pastSpeakers.length})
                </button>
              )}
            </div>

            {activeTab === "archive" && pastYears.length > 0 && (
              <div className="flex items-center gap-3 border border-zinc-200 px-3 py-1.5 rounded-sm bg-white shadow-xs">
                <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
                  Year:
                </span>
                <AcademicYearDropdown
                  options={editionOptions}
                  selectedYear={selectedYear}
                  onSelectYear={setSelectedYear}
                />
              </div>
            )}
          </div>

          <div className="space-y-20 md:space-y-28">
            {/* CURRENT 2026 LINEUP */}
            {(activeTab === "all" || activeTab === "current") && (
              <div>
                <div className="mb-10 flex flex-col md:flex-row md:items-baseline justify-between gap-3 border-b border-zinc-100 pb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#181830] tracking-tight">
                      2026 The Speakers
                    </h2>
                    <p className="text-[#494949] text-base md:text-lg mt-1 font-normal">
                      Thought leaders and visionaries presenting on the TEDx stage this year.
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[#eb0028] font-semibold">
                    {currentSpeakers.length} Speakers
                  </span>
                </div>

                {/* 2-Column High-Impact Collection Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 lg:gap-x-16 lg:gap-y-24">
                  {currentSpeakers.map((speaker, idx) => (
                    <div key={speaker.id}>
                      <SpeakerCard speaker={speaker} index={idx} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PREVIOUS EDITIONS ARCHIVE */}
            {(activeTab === "all" || activeTab === "archive") && (
              <div id="archive" className="scroll-mt-32">
                <div className="mb-10 flex flex-col md:flex-row md:items-baseline justify-between gap-3 border-b border-zinc-100 pb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#181830] tracking-tight">
                      {activeTab === "all" ? "Previous Editions" : `Archive ${selectedYear}`}
                    </h2>
                    <p className="text-[#494949] text-base md:text-lg mt-1 font-normal">
                      {activeTab === "all"
                        ? "Inspiring talks from past TEDx conferences."
                        : `Speakers and transformative ideas from the ${selectedYear} edition.`}
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[#eb0028] font-semibold">
                    {activeTab === "all" ? pastSpeakers.length : selectedPastSpeakers.length} Speakers
                  </span>
                </div>

                {/* 2-Column High-Impact Collection Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 lg:gap-x-16 lg:gap-y-24">
                  {(activeTab === "all" ? pastSpeakers : selectedPastSpeakers).map(
                    (speaker, idx) => (
                      <div key={speaker.id}>
                        <SpeakerCard speaker={speaker} index={idx} />
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
