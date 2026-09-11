"use client";

import { useMemo, useState } from "react";
import { currentSpeakers, pastSpeakers } from "@/data/speakers";
import { motion } from "motion/react";
import AcademicYearDropdown, { EditionOption } from "@/components/speakers/AcademicYearDropdown";
import SpeakerGrid from "@/components/speakers/SpeakerGrid";

// Generate options only for past years
const pastYears = Array.from(new Set(pastSpeakers.map((speaker) => speaker.year).filter(Boolean))) as string[];
const defaultPastYear = pastYears.length > 0 ? pastYears[0] : "";

const editionOptions: EditionOption[] = pastYears.map((year) => ({ 
  value: year, 
  label: `AY ${String(year).slice(-2)}–${String(Number(year) + 1).slice(-2)}`, 
  editionName: `Archive ${year}`, 
  description: `Speakers and ideas from the ${year} edition.`, 
  current: false 
}));

export default function SpeakersPage() {
  const [selectedYear, setSelectedYear] = useState(defaultPastYear);
  const selectedPastSpeakers = useMemo(() => pastSpeakers.filter((speaker) => speaker.year === selectedYear), [selectedYear]);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-[#eb0028] selection:text-white pb-32">
      {/* Editorial Header */}
      <header className="pt-40 pb-20 px-6 md:px-12 border-b border-black/5 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-8 bg-[#eb0028]"></div>
            <span className="text-zinc-500 font-sans text-[10px] md:text-xs uppercase tracking-[0.2em]">
              Speakers
            </span>
          </div>
          <h1 className="text-7xl md:text-[130px] font-bold tracking-tighter leading-[0.85] mb-12">
            Ideas don&apos;t<br />
            <span className="italic text-zinc-500 font-serif font-light pr-4">spread themselves.</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <p className="max-w-md text-zinc-600 text-lg md:text-xl font-light">
              Explore the lineup of visionaries, creators, and thinkers for this edition.
            </p>
          </div>
        </motion.div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 md:px-12 mt-24">
        {/* CURRENT YEAR */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/5 pb-6 mb-16">
            <div>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#eb0028] block mb-2">
                12th Edition
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                2026–27<br />
                <span className="text-zinc-400 font-light">THE SPEAKERS</span>
              </h2>
            </div>
            <strong className="font-serif italic text-xl text-zinc-500 mt-6 md:mt-0">
              {currentSpeakers.length} Voices
            </strong>
          </div>

          <SpeakerGrid speakers={currentSpeakers} />
        </section>

        {/* PAST YEARS */}
        {pastYears.length > 0 && (
          <section className="mt-32 pt-16 border-t border-black/5">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 md:mb-0">
                  Previous Editions
                </h2>
              </div>
              <div className="flex items-center gap-4 border border-black/10 p-3 rounded-sm">
                <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-zinc-500">
                  Year:
                </span>
                <AcademicYearDropdown 
                  options={editionOptions} 
                  selectedYear={selectedYear} 
                  onSelectYear={setSelectedYear} 
                />
              </div>
            </div>

            <div className="mb-12">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                Archive {selectedYear} • {selectedPastSpeakers.length} Voices
              </span>
            </div>

            <SpeakerGrid speakers={selectedPastSpeakers} />
          </section>
        )}
      </main>
    </div>
  );
}
