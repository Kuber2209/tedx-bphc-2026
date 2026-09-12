"use client";

import React, { useState } from "react";
import { GalleryModal } from "./gallery-modal";

interface GalleryItem {
  src: string;
  title: string;
  subtitle: string;
}

const defaultImages: GalleryItem[] = [
  {
    src: "/gallery/image1.jpg",
    title: "Silent Ripples",
    subtitle: "The quiet sparks that ignite lasting dialogue across our campus and beyond.",
  },
  {
    src: "/gallery/image2.jpg",
    title: "Convergences",
    subtitle: "Where cutting-edge technology, culture, and human empathy intersect.",
  },
  {
    src: "/gallery/image3.jpg",
    title: "The Tapestry",
    subtitle: "Every listener is an indispensable thread in our shared collective story.",
  },
];

export default function InteractiveExpandingGallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <section className="w-full relative py-20 px-4 max-w-7xl mx-auto">
      {/* Soft ambient red thread glow for light canvas */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[320px] bg-[#EB0028]/[0.035] blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="w-full mb-12 relative z-10 text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-red-500/20 bg-[#EB0028]/[0.04] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EB0028] animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#EB0028] font-mono font-semibold">
            Threads in Focus
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0F172A] tracking-tight">
          Echoes in the Fabric
        </h2>
        <p className="text-sm sm:text-base text-[#64748B] mt-3 max-w-2xl font-light leading-relaxed">
          Hover to expand the stillness; click to immerse yourself in the
          unseen connections that quietly shape our collective reality.
        </p>
      </div>

      {/* 3-Tile Expanding Strip */}
      <div className="flex flex-col md:flex-row items-center gap-5 h-[540px] w-full relative z-10">
        {defaultImages.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedIdx(idx)}
            className="relative group flex-grow transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] w-full md:w-48 rounded-2xl overflow-hidden h-full cursor-pointer md:hover:flex-grow-[2.5] border border-black/[0.08] hover:border-[#EB0028]/40 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(235,0,40,0.12)] bg-[#F8F9FA]"
          >
            {/* Image with zoom on hover */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              src={item.src}
              alt={item.title}
            />

            {/* Gradient Overlay for high-contrast legible typography */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

            {/* Crimson top accent line indicator on hover */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#EB0028] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Text & Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col justify-end transform transition-transform duration-500">
              {/* Crimson Accent Thread Indicator */}
              <div className="w-8 h-[2px] bg-[#EB0028] mb-3.5 transition-all duration-500 group-hover:w-16" />

              <h3 className="text-xl sm:text-2xl font-medium text-white tracking-wide drop-shadow-sm">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-200 mt-2 opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2 font-light leading-relaxed">
                {item.subtitle}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-[#EB0028] mt-3.5 font-mono tracking-wider opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-semibold">CLICK TO EXPAND</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Expanded Modal */}
      <GalleryModal
        isOpen={selectedIdx !== null}
        onClose={() => setSelectedIdx(null)}
        images={defaultImages}
        currentIndex={selectedIdx ?? 0}
        setCurrentIndex={(idx) => setSelectedIdx(idx)}
      />
    </section>
  );
}
