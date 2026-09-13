"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { GalleryModal } from "@/components/ui/gallery-modal";
import Dropdown, { type DropdownItem } from "@/components/ui/dropdown";
import TEDxWatermark from "@/components/layout/TEDxWatermark";
import "./gallery.css";

const DomeGallery = dynamic(() => import("@/components/gallery/DomeGallery"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-zinc-500 border-t-transparent animate-spin" />
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
          Weaving Visual Sphere...
        </span>
      </div>
    </div>
  ),
});

interface EditionData {
  value: string;
  editionNumber: string;
  editionTag: string;
  year: string;
  theme: string;
  folder: string;
  description: string;
}

const EDITIONS_DATA: EditionData[] = [
  {
    value: "12",
    editionNumber: "12th Edition",
    editionTag: "12TH EDITION",
    year: "2026–27",
    theme: "Invisible Threads",
    folder: "gallery26",
    description: "Echoes of connection, unseen threads shaping our shared humanity.",
  },
  {
    value: "11",
    editionNumber: "11th Edition",
    editionTag: "11TH EDITION",
    year: "2025–26",
    theme: "Evanescent Threads",
    folder: "gallery25",
    description: "Capturing fleeting sparks of wonder, ideas that leave an eternal mark.",
  },
  {
    value: "10",
    editionNumber: "10th Edition",
    editionTag: "10TH EDITION",
    year: "2024–25",
    theme: "Infinite Horizons",
    folder: "gallery24",
    description: "Venturing past boundaries, exploring limitless frontiers of thought.",
  },
];

const EDITIONS: DropdownItem[] = EDITIONS_DATA.map((ed) => ({
  value: ed.value,
  label: ed.editionTag,
  hint: ed.year,
}));

const getEditionImages = (edition: EditionData) => {
  return Array.from({ length: 32 }, (_, i) => ({
    src: `/${edition.folder}/image${(i % 20) + 1}.jpg`,
    title: `Moment ${String(i + 1).padStart(2, "0")}`,
    subtitle: `TEDx BITS Hyderabad · ${edition.theme} (${edition.editionNumber})`,
    alt: `TEDx BITS Hyderabad ${edition.editionNumber} - ${edition.theme} Moment ${i + 1}`,
  }));
};

export default function GalleryPage() {
  const [selectedEditionVal, setSelectedEditionVal] = useState("12");
  const [isAllViewed, setIsAllViewed] = useState(false);
  const [archiveModalIdx, setArchiveModalIdx] = useState<number | null>(null);

  const activeEdition = useMemo(
    () =>
      EDITIONS_DATA.find((e) => e.value === selectedEditionVal) ??
      EDITIONS_DATA[0],
    [selectedEditionVal],
  );

  const currentImages = useMemo(
    () => getEditionImages(activeEdition),
    [activeEdition],
  );

  return (
    <main className="min-h-screen bg-[#fafafa] text-[#0F172A] pt-20 pb-32 overflow-hidden relative">
      <TEDxWatermark />
      {/* 1. Dome Gallery Section with Pitch Black Background */}
      <section className="relative z-10 w-full min-h-[640px] md:min-h-[760px] flex items-center overflow-hidden bg-black">
        {/* 3D Dome Sphere with Smooth Blend - Shifted towards the right */}
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-auto [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_98%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_98%)] opacity-90 hover:opacity-100 transition-all duration-700 translate-x-0 sm:translate-x-6 md:translate-x-[15%] lg:translate-x-[20%]">
          <DomeGallery
            key={activeEdition.value}
            images={currentImages.slice(0, 20)}
            grayscale={false}
            overlayBlurColor="#000000"
            openedImageWidth="280px"
            openedImageHeight="380px"
          />
        </div>

        {/* Pitch Black Ambient Blend Overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/95 via-black/60 to-transparent pointer-events-none" />

        {/* Foreground Header Content - Shifted slightly to the left */}
        <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-20 pb-16 text-left pointer-events-none">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-6 -ml-1 md:-ml-2">
            <div className="h-[1px] w-8 bg-[#EB0028]" />
            <span className="text-zinc-300 font-sans text-[10px] md:text-xs uppercase tracking-[0.2em]">
              TEDx BITS Hyderabad • Invisible Threads
            </span>
          </div>

          {/* Headline - Two-tone White & TED Red like Image 2 */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-bold tracking-tighter leading-[0.88] text-white mb-6 -ml-1 md:-ml-2">
            The Archive<br />
            <span className="font-bold text-[#EB0028]"></span>
          </h1>

          {/* Tagline / Concept Narrative - Font and color matching Image 2 */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4 -ml-1 md:-ml-2">
            <p className="max-w-2xl text-zinc-300 text-lg md:text-xl font-light leading-relaxed">
            </p>
          </div>
        </header>
      </section>

      {/* 2. Complete Photographic Chronicle / Event Archive Grid */}
      <section className="relative z-10 w-full py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div>
            {/* Eyebrow Badge (matching reference: • 01 / 12TH EDITION (2026-27)) */}
            <div className="flex items-center gap-2.5 mb-3 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EB0028]" />
              <span>01 / {activeEdition.editionTag} ({activeEdition.year})</span>
            </div>

            {/* Headline matching reference: Event Archive — Invisible Threads with TED Red accent */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#0F172A] leading-[1.05]">
              Event Archive — <span className="font-bold text-[#EB0028]">{activeEdition.theme}</span>
            </h2>

            {/* Tagline matching reference: 12th Edition · Theme: Invisible Threads — Echoes of connection... */}
            <p className="max-w-3xl text-zinc-500 text-sm sm:text-base md:text-lg font-normal leading-relaxed mt-4">
              <span>{activeEdition.editionNumber} · Theme: </span>
              <span className="font-semibold text-[#0F172A]">{activeEdition.theme}</span>
              <span className="text-zinc-400"> — </span>
              <span className="font-light text-zinc-600">{activeEdition.description}</span>
            </p>
          </div>

          {/* Edition Selector Dropdown - Aligned Right */}
          <div className="flex items-center gap-3 self-start md:self-end z-20">
            <span className="text-xs font-mono uppercase tracking-wider text-[#64748B]">
              Edition:
            </span>
            <Dropdown
              label="Select Edition"
              items={EDITIONS}
              value={selectedEditionVal}
              align="right"
              onChange={(val) => {
                setSelectedEditionVal(val);
                setIsAllViewed(false);
                setArchiveModalIdx(null);
              }}
            />
          </div>
        </div>

        {/* Light theme Image Grid:
            - Items 0-11: visible on all screens (12 on mobile)
            - Items 12-19: hidden on mobile unless View All is clicked, visible on desktop (20 on desktop)
            - Items 20+: hidden on all screens unless View All is clicked
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {currentImages.map((image, index) => {
            const visibilityClass =
              index < 12
                ? "block"
                : index < 20
                  ? isAllViewed
                    ? "block"
                    : "hidden md:block"
                  : isAllViewed
                    ? "block"
                    : "hidden";

            return (
              <div
                key={`${activeEdition.value}-${image.src}-${index}`}
                onClick={() => setArchiveModalIdx(index)}
                className={`${visibilityClass} group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border border-black/[0.06] hover:border-zinc-400 transition-all duration-500 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] bg-[#F8F9FA]`}
              >
                {/* Image with fallback if folder files are pending upload */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to gallery demo images if user hasn't placed images in the edition folder yet
                    const target = e.currentTarget;
                    const fallbackSrc = `/gallery/image${(index % 20) + 1}.jpg`;
                    if (target.src !== fallbackSrc) {
                      target.src = fallbackSrc;
                    }
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Edge Gradient Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50 group-hover:opacity-85 transition-opacity duration-300" />

                {/* Card Badge */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono text-zinc-200 group-hover:text-white transition-colors duration-300">
                  <span className="text-zinc-300 group-hover:text-white font-medium transition-colors">
                    {String(index + 1).padStart(2, "0")} / {currentImages.length}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white font-semibold">
                    EXPAND ↗
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button with Animated .btn and .icon */}
        <div className="flex justify-center mt-12">
          <button
            type="button"
            onClick={() => setIsAllViewed((prev) => !prev)}
            className="btn"
          >
            <span>{isAllViewed ? "Show Less" : "View All"}</span>
            <svg
              className={`icon transition-transform duration-300 ${isAllViewed ? "-rotate-90" : ""
                }`}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </section>

      {/* Lightbox for Archive Grid */}
      <GalleryModal
        isOpen={archiveModalIdx !== null}
        onClose={() => setArchiveModalIdx(null)}
        images={currentImages}
        currentIndex={archiveModalIdx ?? 0}
        setCurrentIndex={(idx) => setArchiveModalIdx(idx)}
      />
    </main>
  );
}
