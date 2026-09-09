"use client";

import { useMemo, useState } from "react";
import { currentSpeakers, pastSpeakers } from "@/data/speakers";
import AcademicYearDropdown, { EditionOption } from "@/components/speakers/AcademicYearDropdown";
import SpeakerIdeasMosaic from "@/components/speakers/SpeakerIdeasMosaic";

const editionOptions: EditionOption[] = [
  { value: "2026", label: "AY 26–27", editionName: "Current edition", description: "The next TEDx BITS Hyderabad programme.", current: true },
  ...Array.from(new Set(pastSpeakers.map((speaker) => speaker.year).filter(Boolean))).map((year) => ({ value: year as string, label: `AY ${String(year).slice(-2)}–${String(Number(year) + 1).slice(-2)}`, editionName: `Archive ${year}`, description: `Speakers and ideas from the ${year} edition.`, current: false })),
];

export default function SpeakersPage() {
  const [selectedYear, setSelectedYear] = useState("2026");
  const speakers = useMemo(() => selectedYear === "2026" ? currentSpeakers : pastSpeakers.filter((speaker) => speaker.year === selectedYear), [selectedYear]);
  const selectedEdition = editionOptions.find((edition) => edition.value === selectedYear);

  return <div className="speakers-editorial-page"><header className="speakers-editorial-hero"><div><span className="studio-kicker">TEDx BITS Hyderabad / voices</span><h1>Ideas to<br /><em>carry with you.</em></h1></div><p>Explore the conversations, questions, and perspectives from every TEDx BITS Hyderabad edition.</p></header><div className="speakers-editorial-filter"><span>{selectedEdition?.editionName}</span><AcademicYearDropdown options={editionOptions} selectedYear={selectedYear} onSelectYear={setSelectedYear} /></div><main className="editorial-speaker-list"><div className="editorial-speaker-list-head"><span>{selectedYear === "2026" ? "Current edition" : "From the archive"}</span><strong>{speakers.length} voices / {selectedYear}</strong></div><SpeakerIdeasMosaic edition={selectedYear} speakers={speakers} /></main></div>;
}
