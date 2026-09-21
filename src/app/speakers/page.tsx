"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { currentSpeakers, pastSpeakers } from "@/data/speakers";
import AcademicYearDropdown, { EditionOption } from "@/components/speakers/AcademicYearDropdown";
import SpeakerCard from "@/components/speakers/SpeakerCard";
import TEDxWatermark from "@/components/layout/TEDxWatermark";

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
    <div className="min-h-screen bg-[#fafafa] text-[#494949] selection:bg-[#eb0028] selection:text-white relative">
      {/* 
        HERO SECTION (Matching TEDx MIT .rl_section_hero.speakers)
        Header: "Inspiring Innovators Unleashed"
        Subtitle & Action Buttons identical to https://tedx.mit.edu/allspeakers
        Background: Stage speaker photo with TEDx BITSHyderabad backdrop
      */}
      <header className="relative z-10 w-full bg-[#0a0a0c] overflow-hidden min-h-[55vh] md:min-h-[65vh] flex items-center">
        {/* Background banner image with authentic stage speaker */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/speakers-banner.jpg"
            alt="TEDx BPHC Speakers Stage"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Left-side cinematic shadow: protects text contrast on the left while keeping center & right speaker photo crystal clear */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.62) 28%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0) 75%)",
            }}
          />
          {/* Subtle mobile bottom gradient for compact screens */}
          <div
            className="absolute inset-0 pointer-events-none md:hidden"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0) 70%)",
            }}
          />
          {/* Soft grounding bottom fade */}
          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#0a0a0c] to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="max-w-[34rem] text-left">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white tracking-tight leading-[1.15] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
              Inspiring Innovators Unleashed
            </h1>

            {/* Spacing block 1 */}
            <div className="h-4 w-full" aria-hidden="true" />

            {/* Subtitle */}
            <p className="text-white/90 text-base md:text-lg font-normal leading-relaxed drop-shadow-[0_1px_5px_rgba(0,0,0,0.6)]">
              Discover the thought leaders and innovators who have shared their transformative
              ideas on our stage. Explore their inspiring talks and learn more about their
              groundbreaking work.
            </p>

            {/* Spacing block 2 */}
            <div className="h-6 w-full" aria-hidden="true" />

            {/* CTA Button Group */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#archive"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("archive");
                  const el = document.getElementById("archive");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-[4px] border border-white hover:bg-white hover:text-black text-white font-semibold text-sm sm:text-base transition-all duration-200"
              >
                Previous Talks
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 
        SPEAKERS GRID SECTION
        Off-white background (#fafafa), clear crisp #494949 typography, clean 3-column collection grid.
      */}
      <section className="bg-transparent py-16 md:py-24 relative z-10 overflow-hidden">
        <TEDxWatermark className="top-4 sm:top-8" />
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 relative z-10">
          {/* Filter Navigation */}
          <div className="mb-14 pb-4 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-200 ${
                  activeTab === "all"
                    ? "bg-[#494949] text-white shadow-sm font-semibold"
                    : "bg-white text-[#494949] border border-neutral-200 hover:bg-neutral-100 hover:text-black shadow-2xs"
                }`}
              >
                All Speakers ({allSpeakersCount})
              </button>
              <button
                onClick={() => setActiveTab("current")}
                className={`px-4 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-200 ${
                  activeTab === "current"
                    ? "bg-[#494949] text-white shadow-sm font-semibold"
                    : "bg-white text-[#494949] border border-neutral-200 hover:bg-neutral-100 hover:text-black shadow-2xs"
                }`}
              >
                2026 Lineup ({currentSpeakers.length})
              </button>
              {pastYears.length > 0 && (
                <button
                  onClick={() => setActiveTab("archive")}
                  className={`px-4 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-200 ${
                    activeTab === "archive"
                      ? "bg-[#494949] text-white shadow-sm font-semibold"
                      : "bg-white text-[#494949] border border-neutral-200 hover:bg-neutral-100 hover:text-black shadow-2xs"
                  }`}
                >
                  Previous Editions ({pastSpeakers.length})
                </button>
              )}
            </div>

            {activeTab === "archive" && pastYears.length > 0 && (
              <div className="flex items-center gap-3 border border-neutral-200 px-3.5 py-1.5 rounded-full bg-white shadow-2xs">
                <span className="text-xs uppercase tracking-wider text-[#494949] font-medium">
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
                <div className="mb-10 flex flex-col md:flex-row md:items-baseline justify-between gap-3 border-b border-neutral-200/80 pb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#494949] tracking-tight">
                      2026 The Speakers
                    </h2>
                    <p className="text-[#494949] text-base md:text-lg mt-1 font-normal leading-relaxed opacity-90">
                      Thought leaders and visionaries presenting on the TEDx stage this year.
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[#eb0028] font-bold">
                    {currentSpeakers.length} Speakers
                  </span>
                </div>

                {/* 3-Column Collection Grid (Matching Teams) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-10 lg:gap-y-14">
                  {currentSpeakers.map((speaker, idx) => (
                    <SpeakerCard key={speaker.id} speaker={speaker} index={idx} />
                  ))}
                </div>
              </div>
            )}

            {/* PREVIOUS EDITIONS ARCHIVE */}
            {(activeTab === "all" || activeTab === "archive") && (
              <div id="archive" className="scroll-mt-32">
                <div className="mb-10 flex flex-col md:flex-row md:items-baseline justify-between gap-3 border-b border-neutral-200/80 pb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#494949] tracking-tight">
                      {activeTab === "all" ? "Previous Editions" : `Archive ${selectedYear}`}
                    </h2>
                    <p className="text-[#494949] text-base md:text-lg mt-1 font-normal leading-relaxed opacity-90">
                      {activeTab === "all"
                        ? "Inspiring talks from past TEDx conferences."
                        : `Speakers and transformative ideas from the ${selectedYear} edition.`}
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[#eb0028] font-bold">
                    {activeTab === "all" ? pastSpeakers.length : selectedPastSpeakers.length} Speakers
                  </span>
                </div>

                {/* 3-Column Collection Grid (Matching Teams) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-10 lg:gap-y-14">
                  {(activeTab === "all" ? pastSpeakers : selectedPastSpeakers).map(
                    (speaker, idx) => (
                      <SpeakerCard key={speaker.id} speaker={speaker} index={idx} />
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
