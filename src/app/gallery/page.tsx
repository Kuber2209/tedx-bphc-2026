"use client";

import React from "react";
import DomeGallery from "@/components/gallery/DomeGallery";
import { photos } from "@/data/photos";

export default function GalleryPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-zinc-100 overflow-hidden">
      {/* Background Subtle Tiles */}
      <div
        className="pointer-events-none absolute inset-0 bg-tiles opacity-40"
        aria-hidden="true"
      />

      {/* Header Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 sm:px-6 md:pt-16 lg:px-8">
        <header className="flex flex-col justify-between gap-4 border-b border-zinc-800/80 pb-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#E62B1E]">
              TEDx BPHC 2026
            </span>
            <h1 className="mt-1 text-4xl font-black uppercase tracking-tight text-white sm:text-6xl md:text-7xl">
              GALLERY.
            </h1>
            <p className="mt-2 max-w-xl text-sm font-light text-zinc-400 sm:text-base">
              Glimpses of transformative ideas, inspiring speakers, and unforgettable campus moments.
            </p>
          </div>

          {/* Interactive Instructions & Metrics */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#E62B1E]" />
              <span>{photos.length} Moments</span>
            </span>

            <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 text-zinc-400 backdrop-blur-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 text-zinc-400"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span>Drag to rotate • Click to focus</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 text-zinc-400"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
          </div>
        </header>
      </div>

      {/* 3D Sphere Dome Gallery Stage */}
      <div className="relative h-[78vh] min-h-[640px] w-full">
        <DomeGallery
          images={photos}
          grayscale={false}
          imageBorderRadius="20px"
          openedImageBorderRadius="24px"
          fit={0.52}
          dragSensitivity={22}
          maxVerticalRotationDeg={10}
        />
      </div>
    </div>
  );
}
