"use client";

import React, { useState, useMemo, useCallback } from "react";
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

const IMAGES_PER_PAGE = 20;

const getEditionImages = (edition: EditionData) => {
  // Generate a large gallery (121 images) to simulate real-world volume
  return Array.from({ length: 121 }, (_, i) => ({
    src: `/${edition.folder}/image${(i % 20) + 1}.jpg`,
    title: `Moment ${String(i + 1).padStart(3, "0")}`,
    subtitle: `TEDx BITS Hyderabad · ${edition.theme} (${edition.editionNumber})`,
    alt: `TEDx BITS Hyderabad ${edition.editionNumber} - ${edition.theme} Moment ${i + 1}`,
  }));
};

/* ─── Pagination Helpers ─── */
function getPaginationRange(current: number, total: number): (number | "ellipsis")[] {
  // Always show first, last, current, and neighbors
  const delta = 1;
  const range: (number | "ellipsis")[] = [];
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  // Always show page 1
  range.push(1);

  // Left ellipsis
  if (left > 2) {
    range.push("ellipsis");
  }

  // Middle pages
  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  // Right ellipsis
  if (right < total - 1) {
    range.push("ellipsis");
  }

  // Always show last page (if more than 1 page)
  if (total > 1) {
    range.push(total);
  }

  return range;
}

export default function GalleryPage() {
  const [selectedEditionVal, setSelectedEditionVal] = useState("12");
  const [currentPage, setCurrentPage] = useState(1);
  const [archiveModalIdx, setArchiveModalIdx] = useState<number | null>(null);

  const activeEdition = useMemo(
    () =>
      EDITIONS_DATA.find((e) => e.value === selectedEditionVal) ??
      EDITIONS_DATA[0],
    [selectedEditionVal],
  );

  const allImages = useMemo(
    () => getEditionImages(activeEdition),
    [activeEdition],
  );

  const totalPages = Math.ceil(allImages.length / IMAGES_PER_PAGE);

  const currentImages = useMemo(() => {
    const start = (currentPage - 1) * IMAGES_PER_PAGE;
    return allImages.slice(start, start + IMAGES_PER_PAGE);
  }, [allImages, currentPage]);

  const goToPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
      // Scroll to grid section
      const gridEl = document.getElementById("gallery-grid-section");
      if (gridEl) gridEl.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [totalPages],
  );

  const paginationRange = useMemo(
    () => getPaginationRange(currentPage, totalPages),
    [currentPage, totalPages],
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
            images={allImages.slice(0, 20)}
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
      <section
        id="gallery-grid-section"
        className="relative z-10 w-full py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-black/[0.06] scroll-mt-24"
      >
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
              <span className="text-zinc-400 ml-2">·</span>
              <span className="ml-2 font-medium text-[#0F172A]">{allImages.length} Photos</span>
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
                setCurrentPage(1);
                setArchiveModalIdx(null);
              }}
            />
          </div>
        </div>

        {/* Image Grid - 3 column layout with large cards & uniform gaps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentImages.map((image, index) => {
            const globalIndex = (currentPage - 1) * IMAGES_PER_PAGE + index;

            return (
              <div
                key={`${activeEdition.value}-${currentPage}-${index}`}
                onClick={() => setArchiveModalIdx(globalIndex)}
                className="group relative aspect-[4/3] overflow-hidden cursor-pointer bg-[#F8F9FA] transition-all duration-300 hover:brightness-90"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const fallbackSrc = `/gallery/image${(globalIndex % 20) + 1}.jpg`;
                    if (target.src !== fallbackSrc) {
                      target.src = fallbackSrc;
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* ─── Pagination ─── */}
        {totalPages > 1 && (
          <nav
            aria-label="Gallery pagination"
            className="flex items-center justify-center gap-2 mt-14"
          >
            {/* Previous Button */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn pagination-nav disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              ←Prev
            </button>

            {/* Page Numbers */}
            {paginationRange.map((item, idx) =>
              item === "ellipsis" ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="pagination-ellipsis"
                >
                  …
                </span>
              ) : (
                <button
                  key={item}
                  onClick={() => goToPage(item)}
                  className={`pagination-btn ${
                    currentPage === item ? "pagination-active" : ""
                  }`}
                  aria-label={`Page ${item}`}
                  aria-current={currentPage === item ? "page" : undefined}
                >
                  {item}
                </button>
              ),
            )}

            {/* Next Button */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn pagination-nav disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              Next→
            </button>
          </nav>
        )}

        {/* Page info text */}
        {totalPages > 1 && (
          <p className="text-center text-xs font-mono text-zinc-400 mt-4 uppercase tracking-wider">
            Page {currentPage} of {totalPages} · Showing {(currentPage - 1) * IMAGES_PER_PAGE + 1}–
            {Math.min(currentPage * IMAGES_PER_PAGE, allImages.length)} of {allImages.length}
          </p>
        )}
      </section>

      {/* Lightbox for Archive Grid */}
      <GalleryModal
        isOpen={archiveModalIdx !== null}
        onClose={() => setArchiveModalIdx(null)}
        images={allImages}
        currentIndex={archiveModalIdx ?? 0}
        setCurrentIndex={(idx) => setArchiveModalIdx(idx)}
      />
    </main>
  );
}
