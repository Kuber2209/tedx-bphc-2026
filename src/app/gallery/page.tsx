"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import InteractiveExpandingGallery from "@/components/ui/image-gallery";
import { GalleryModal } from "@/components/ui/gallery-modal";
import FluidParticlesBackground from "@/components/ui/fluid-particles-background";

const DomeGallery = dynamic(() => import("@/components/gallery/DomeGallery"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#EB0028] border-t-transparent animate-spin" />
        <span className="text-xs font-mono text-[#64748B] uppercase tracking-widest">
          Weaving Visual Sphere...
        </span>
      </div>
    </div>
  ),
});

// All 20 curated event images from public/gallery/
const archiveImages = Array.from({ length: 20 }, (_, i) => ({
  src: `/gallery/image${i + 1}.jpg`,
  title: `Moment ${String(i + 1).padStart(2, "0")}`,
  subtitle: "TEDx BITS Hyderabad · Invisible Threads",
  alt: `TEDx BITS Hyderabad Moment ${i + 1}`,
}));

export default function GalleryPage() {
  const [archiveModalIdx, setArchiveModalIdx] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white text-[#0F172A] selection:bg-[#EB0028] selection:text-white pt-20 pb-32 overflow-hidden">
      {/* Unified Hero + Dome Experience with Fluid Particles Background */}
      <FluidParticlesBackground className="w-full pt-10 pb-28">
        {/* 1. Page Header & Theme Introduction (Hero) - Left Aligned */}
        <header className="relative pt-16 pb-12 px-6 md:px-12 max-w-7xl mx-auto text-left">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-[#EB0028]" />
            <span className="text-[#64748B] font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold">
              TEDx BITS Hyderabad · Invisible Threads
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-[#0F172A] mb-8 leading-[0.95]">
            Woven in Plain Sight: <br />
            <span className="bg-gradient-to-r from-[#EB0028] via-rose-600 to-amber-600 bg-clip-text text-transparent">
              The Threads That Shape Us
            </span>
          </h1>

          {/* Concept narrative */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8">
            <p className="max-w-2xl text-base sm:text-lg md:text-xl text-[#64748B] font-light leading-relaxed">
              Every talk sparked a ripple; every glance quietly wove a thread. Step
              into the visual chronicle of conversations, ideas, and unseen connections
              that endure long after the stage falls silent.
            </p>
            <div className="flex items-center gap-3 self-start md:self-end">
              <span className="text-xs text-zinc-400 font-mono tracking-wider">
                DRAG TO ROTATE 360° · CLICK TILE TO FOCUS
              </span>
            </div>
          </div>
        </header>

        {/* 2. Section 1: Dome Gallery 360° Centerpiece */}
        <section className="relative w-full flex flex-col items-center">
          {/* Tagline over Background - Left Aligned */}
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-6 z-10 text-left">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#EB0028] animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#EB0028] font-mono font-semibold">
                Interactive 360° Sphere
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A]">
              Glimpses of the Unseen Connections
            </h2>
          </div>

          {/* Dome Gallery Container with Radial Blend Mask */}
          <div className="relative w-full max-w-7xl h-[620px] md:h-[680px] flex items-center justify-center overflow-hidden rounded-3xl [mask-image:radial-gradient(ellipse_at_center,black_65%,transparent_98%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_65%,transparent_98%)] border border-black/[0.05] bg-white/40 backdrop-blur-[2px]">
            <DomeGallery
              images={archiveImages}
              grayscale={false}
              overlayBlurColor="#ffffff"
              openedImageWidth="280px"
              openedImageHeight="380px"
            />
          </div>
        </section>
      </FluidParticlesBackground>

      {/* 3. Section 2: 3-Tile Interactive Expanding Cards (Echoes in the Fabric) */}
      <InteractiveExpandingGallery />

      {/* 4. Complete Photographic Chronicle / Event Archive Grid */}
      <section className="relative w-full py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 text-left">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#EB0028] uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EB0028]" />
              <span>01 / EVENT ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#0F172A] tracking-tight">
              The Complete Chronicle
            </h2>
            <p className="text-sm text-[#64748B] mt-1 font-light">
              20 curated moments captured in motion from TEDx BITS Hyderabad.
            </p>
          </div>
          <p className="text-xs text-[#64748B] font-mono tracking-wider">
            CLICK ANY FRAME TO EXPAND IN HIGH-RES
          </p>
        </div>

        {/* Light theme Image Grid with hairline borders and soft shadow */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {archiveImages.map((image, index) => (
            <div
              key={image.src}
              onClick={() => setArchiveModalIdx(index)}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border border-black/[0.06] hover:border-[#EB0028]/40 transition-all duration-500 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(235,0,40,0.12)] bg-[#F8F9FA]"
            >
              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Edge Gradient Mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50 group-hover:opacity-85 transition-opacity duration-300" />

              {/* Card Badge */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono text-zinc-200 group-hover:text-white transition-colors duration-300">
                <span className="text-zinc-300 group-hover:text-[#EB0028] font-medium transition-colors">
                  {String(index + 1).padStart(2, "0")} / 20
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#EB0028] font-semibold">
                  EXPAND ↗
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox for Archive Grid */}
      <GalleryModal
        isOpen={archiveModalIdx !== null}
        onClose={() => setArchiveModalIdx(null)}
        images={archiveImages}
        currentIndex={archiveModalIdx ?? 0}
        setCurrentIndex={(idx) => setArchiveModalIdx(idx)}
      />
    </main>
  );
}
