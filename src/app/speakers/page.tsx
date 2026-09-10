"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { currentSpeakers, pastSpeakers } from "@/data/speakers";
import { motion } from "motion/react";
import AcademicYearDropdown, { EditionOption } from "@/components/speakers/AcademicYearDropdown";

const editionOptions: EditionOption[] = [
  { value: "2026", label: "AY 26–27", editionName: "Current edition", description: "The next TEDx BITS Hyderabad programme.", current: true },
  ...Array.from(new Set(pastSpeakers.map((speaker) => speaker.year).filter(Boolean))).map((year) => ({ value: year as string, label: `AY ${String(year).slice(-2)}–${String(Number(year) + 1).slice(-2)}`, editionName: `Archive ${year}`, description: `Speakers and ideas from the ${year} edition.`, current: false })),
];

export default function SpeakersPage() {
  const [selectedYear, setSelectedYear] = useState("2026");
  const speakers = useMemo(() => selectedYear === "2026" ? currentSpeakers : pastSpeakers.filter((speaker) => speaker.year === selectedYear), [selectedYear]);

  // Editorial fallback images
  const fallbackImages = ["/gallery/image4.jpg", "/gallery/image8.jpg", "/gallery/image14.jpg", "/gallery/image1.jpg", "/gallery/image3.jpg"];

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
              The Voices
            </span>
          </div>
          <h1 className="text-7xl md:text-[130px] font-bold tracking-tighter leading-[0.85] mb-12">
            Ideas to<br />
            <span className="italic text-zinc-500 font-serif font-light pr-4">carry with you.</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <p className="max-w-md text-zinc-600 text-lg md:text-xl font-light">
              Explore the conversations, questions, and perspectives from every TEDx BITS Hyderabad edition.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 border border-black/10 p-4 rounded-sm">
              <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-zinc-500">Edition:</span>
              <AcademicYearDropdown options={editionOptions} selectedYear={selectedYear} onSelectYear={setSelectedYear} />
            </div>
          </div>
        </motion.div>
      </header>

      {/* Asymmetric Speaker Layout */}
      <main className="max-w-[1600px] mx-auto px-6 md:px-12 mt-32">
        <div className="flex justify-between items-center border-b border-black/5 pb-4 mb-24 md:mb-32">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#eb0028]">
            {selectedYear === "2026" ? "12th Edition Speakers" : `Archive ${selectedYear}`}
          </span>
          <strong className="font-serif italic text-xl text-zinc-500">
            {speakers.length} Voices
          </strong>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-32 md:gap-x-12 lg:gap-x-24">
          {speakers.map((speaker, index) => {
            // Highly asymmetric layout logic
            const isFeatured = index === 0;
            const isWide = index % 4 === 3;
            const isSmall = index % 4 === 1 || index % 4 === 2;
            
            let colSpan = "md:col-span-12";
            let imgAspect = "aspect-[16/9] md:aspect-[21/9]";
            let textLayout = "flex-col md:flex-row items-end gap-12";
            let textWidth = "md:w-1/2";
            
            if (isFeatured) {
              colSpan = "md:col-span-12";
              imgAspect = "h-[60vh] md:h-[85vh]";
              textLayout = "flex-col gap-6 relative md:-mt-32 md:ml-12 z-10 bg-white p-6 md:p-12 md:max-w-2xl border border-black/5";
              textWidth = "w-full";
            } else if (isWide) {
              colSpan = "md:col-span-12";
              imgAspect = "aspect-[16/9] md:aspect-[2.5/1]";
              textLayout = "flex-col md:flex-row-reverse items-center justify-between gap-12 mt-12";
              textWidth = "md:w-1/2";
            } else if (isSmall) {
              colSpan = index % 4 === 1 ? "md:col-span-5 md:mt-32" : "md:col-span-7 md:-mt-16";
              imgAspect = "aspect-[3/4]";
              textLayout = "flex-col gap-6 mt-8";
              textWidth = "w-full";
            }

            return (
              <motion.div 
                key={speaker.id}
                className={`relative group ${colSpan}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={`relative w-full overflow-hidden bg-zinc-100 ${imgAspect}`}>
                  <Image 
                    src={speaker.imageUrl || fallbackImages[index % fallbackImages.length]}
                    alt={speaker.name}
                    fill
                    className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-[2s] ease-out scale-100 group-hover:scale-105"
                  />
                  {/* Subtle overlay for text readability if needed */}
                  <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors duration-1000"></div>
                </div>

                <div className={`flex ${textLayout}`}>
                  <div className={textWidth}>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-[#eb0028] font-sans text-[10px] uppercase tracking-[0.2em] font-bold">
                        {speaker.category || "Speaker"}
                      </span>
                      <div className="h-[1px] flex-grow bg-black/10 hidden md:block"></div>
                    </div>
                    <h2 className={`${isFeatured ? 'text-6xl md:text-8xl' : 'text-4xl md:text-6xl'} font-bold tracking-tighter leading-[0.9] mb-4 group-hover:text-[#eb0028] transition-colors duration-500`}>
                      {speaker.name}
                    </h2>
                    <p className="text-zinc-500 font-serif italic text-xl mb-6">
                      {speaker.role} · {speaker.company}
                    </p>
                  </div>
                  
                  <div className={textWidth}>
                    <h3 className="text-2xl text-zinc-800 font-medium tracking-tight leading-snug mb-4">
                      {speaker.talkTitle || "Talk title to be announced"}
                    </h3>
                    <p className="text-zinc-600 text-base md:text-lg leading-relaxed font-light">
                      {speaker.talkDescription || speaker.bio || "Speaker details will be updated soon. Stay tuned for an incredible talk."}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </main>
    </div>
  );
}
