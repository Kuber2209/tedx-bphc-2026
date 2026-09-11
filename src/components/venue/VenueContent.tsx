"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const TRANSIT_TABS = [
  {
    id: "road",
    label: "BY ROAD & PARKING",
    time: "45 MINS",
    origin: "SECUNDERABAD STATION",
    details:
      "45 minutes from Secunderabad Station via Rajiv Rahadari (SH-1). Recommended route via Outer Ring Road (ORR) Exit 7 towards Shamirpet. Dedicated visitor parking available inside Gate 1.",
    notes: "Visitor vehicles must register at Gate 1 security checkpoint for campus parking decal.",
  },
  {
    id: "bus",
    label: "PUBLIC BUS (TSRTC)",
    time: "60 MINS",
    origin: "JUBILEE BUS STATION (JBS)",
    details:
      "Direct TSRTC buses (212 & 211 series) run frequently from Secunderabad Railway Station / Jubilee Bus Station directly to the BITS Pilani Main Gate.",
    notes: "Alight at BPHC Main Gate bus stop; golf-cart transit shuttles run continuously to the auditorium.",
  },
  {
    id: "airport",
    label: "AIRPORT (RGIA)",
    time: "~75 MINS",
    origin: "HYDERABAD AIRPORT (RGIA)",
    details:
      "~1 hr 15 mins via Nehru Outer Ring Road (ORR Exit 7). Note: We recommend pre-scheduling return cabs in advance for evening travel from Shamirpet.",
    notes: "Pre-paid airport taxis and Ola/Uber ride-hailing services have direct entry access via Gate 1.",
  },
];

const PROTOCOLS = [
  {
    num: "01",
    title: "IDENTIFICATION",
    description:
      "Campus security requires any government photo ID alongside your digital TEDx pass QR code.",
  },
  {
    num: "02",
    title: "SCHEDULE TIMING",
    description:
      "Campus gates open at 08:30 IST. Auditorium doors close promptly for opening remarks at 09:45 IST.",
  },
  {
    num: "03",
    title: "ACCESSIBILITY",
    description:
      "Step-free ramp access and dedicated seating available at all auditorium entrances.",
  },
];

export default function VenueContent() {
  const [copied, setCopied] = useState(false);
  const [activeTransit, setActiveTransit] = useState("road");

  const handleCopyCoordinates = () => {
    navigator.clipboard.writeText("17.5449° N, 78.5718° E");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const currentTransit = TRANSIT_TABS.find((t) => t.id === activeTransit) || TRANSIT_TABS[0];

  return (
    <main className="bg-white text-neutral-900 min-h-screen font-sans selection:bg-[#eb0028] selection:text-white pt-32 pb-36">
      {/* 1. HERO SECTION (Balanced 2-Column Editorial Layout) */}
      <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto mb-20 md:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Eyebrow + Typographic Tension Headline + Subtext */}
          <div className="lg:col-span-8">
            <p className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] text-[#eb0028] uppercase font-bold mb-6">
              THE LOCATION
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 leading-[0.95] mb-8">
              The room where <br />
              <span className="font-serif italic font-normal text-neutral-400">it happens.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-light text-neutral-600 max-w-2xl leading-relaxed">
              Every great idea needs a place to land. Join us at the BITS Pilani Hyderabad Campus
              Auditorium, a space designed for focus, connection, and paradigm-shifting
              conversations.
            </p>
          </div>

          {/* Right Column: Architectural Monograph Sidebar (Eliminates dead whitespace) */}
          <div className="lg:col-span-4 pt-2 lg:pt-14">
            <div className="border-t border-neutral-200 divide-y divide-neutral-200/80 font-mono text-[11px] text-neutral-600">
              <div className="py-3 flex items-baseline justify-between">
                <span className="text-neutral-400 uppercase tracking-widest">EDITION</span>
                <span className="text-neutral-900 font-semibold tracking-wider">12TH ANNUAL ASSEMBLY</span>
              </div>
              <div className="py-3 flex items-baseline justify-between">
                <span className="text-neutral-400 uppercase tracking-widest">CAPACITY</span>
                <span className="text-neutral-900 font-semibold tracking-wider">2,500 SEATS</span>
              </div>
              <div className="py-3 flex items-baseline justify-between">
                <span className="text-neutral-400 uppercase tracking-widest">ACOUSTICS</span>
                <span className="text-neutral-900 font-semibold tracking-wider">PROSCENIUM ARCH</span>
              </div>
              <div className="py-3 flex items-baseline justify-between">
                <span className="text-neutral-400 uppercase tracking-widest">CAMPUS</span>
                <span className="text-neutral-900 font-semibold tracking-wider">200 ACRES • SHAMIRPET</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VENUE DETAILS & ARCHITECTURAL FRAMING */}
      <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto mb-24 md:mb-32">
        <div className="border-t border-neutral-200 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Crisp Architectural Crop of BPHC Auditorium Stage */}
            <div className="lg:col-span-7">
              <div className="border border-neutral-200 bg-neutral-100 overflow-hidden relative">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full">
                  <Image
                    src="/gallery/image1.jpg"
                    alt="Auditorium Atrium & Stage, BITS Pilani Hyderabad"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700 ease-out"
                  />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  [FIG. 01 — AUDITORIUM ATRIUM & STAGE]
                </p>
                <p className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  BITS PILANI HYDERABAD CAMPUS
                </p>
              </div>
            </div>

            {/* Right: Venue Metadata Column (Cardless) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full pt-2">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic font-normal text-neutral-900 leading-tight mb-8">
                  Auditorium, <br />
                  BITS Pilani Hyderabad.
                </h2>

                {/* Monospace Coordinate Tag & Micro-interaction */}
                <div className="mb-8">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                    GEOGRAPHIC COORDINATES
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCoordinates}
                    className="group inline-flex items-center gap-3 font-mono text-xs text-neutral-700 bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200/80 px-3 py-1.5 transition-colors duration-200 focus:outline-none"
                    title="Click to copy coordinates"
                  >
                    <span className="text-[#eb0028] text-[9px] font-bold">●</span>
                    <span className="tracking-wider">17.5449° N, 78.5718° E</span>
                    <span className="text-[10px] uppercase font-bold text-neutral-500 group-hover:text-neutral-900 transition-colors">
                      {copied ? (
                        <span className="text-[#eb0028] font-bold tracking-widest">[ COPIED ]</span>
                      ) : (
                        <span className="text-neutral-400 tracking-wider">[ COPY ]</span>
                      )}
                    </span>
                  </button>
                </div>

                {/* Cardless Address Block */}
                <div className="border-t border-neutral-200/80 pt-6 mb-8">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-3">
                    POSTAL ADDRESS
                  </span>
                  <address className="not-italic text-base md:text-lg text-neutral-800 font-light leading-relaxed">
                    Jawahar Nagar, Shamirpet, <br />
                    Hyderabad, Telangana 500078
                  </address>
                </div>
              </div>

              {/* Minimal Action Link (Subtle Hover Arrow Glyph) */}
              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=BITS+Pilani+Hyderabad+Campus+Auditorium"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-neutral-900 hover:text-[#eb0028] transition-colors duration-200"
                >
                  <span className="font-semibold underline underline-offset-4 decoration-neutral-300 group-hover:decoration-[#eb0028] transition-colors">
                    Open in Google Maps
                  </span>
                  <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* 3. MONOCHROME RADAR / MINIMAL MAP CONTAINER */}
          <div className="mt-16 md:mt-20">
            <div className="border border-neutral-200 bg-neutral-50 relative overflow-hidden">
              {/* Monospace Header Bar */}
              <div className="border-b border-neutral-200/80 px-4 py-2.5 flex items-center justify-between font-mono text-[10px] tracking-wider text-neutral-500 uppercase bg-white">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#eb0028] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#eb0028]"></span>
                  </span>
                  <span className="font-semibold text-neutral-900">RADAR BEACON // LIVE FREQUENCY</span>
                </div>
                <div className="hidden sm:flex items-center gap-4">
                  <span>LAT 17.5449° N</span>
                  <span>LNG 78.5718° E</span>
                  <span className="text-neutral-400">[FIG. 02 — GEOLOCATION]</span>
                </div>
              </div>

              {/* Radar View Container */}
              <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-neutral-950 overflow-hidden flex items-center justify-center">
                {/* Embedded desaturated grayscale map iframe */}
                <iframe
                  title="BITS Pilani Hyderabad Campus Map"
                  src="https://maps.google.com/maps?q=BITS+Pilani+Hyderabad+Campus+Auditorium&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
                  style={{
                    filter: "grayscale(100%) invert(95%) contrast(140%) brightness(85%)",
                  }}
                  loading="lazy"
                />

                {/* Architectural Grid Lines Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-25"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                  }}
                />

                {/* Radar Concentric Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Outer ring */}
                  <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-white/10" />
                  {/* Mid ring */}
                  <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-white/15 absolute" />
                  {/* Inner ring */}
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-white/25 absolute" />
                  {/* Radar Scanning Line */}
                  <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full absolute border-t border-r border-[#eb0028]/40 animate-[spin_8s_linear_infinite]" />
                </div>

                {/* Radar Beacon Pin (TED Red Pulsing Beacon) */}
                <div className="relative z-10 flex flex-col items-center pointer-events-none">
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-[#eb0028] opacity-60" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#eb0028] shadow-[0_0_16px_#eb0028]" />
                  </div>
                  <div className="mt-3 px-2 py-1 bg-black/90 backdrop-blur-sm border border-neutral-700 text-[10px] font-mono tracking-widest text-white uppercase text-center shadow-lg">
                    TARGET: BPHC AUDITORIUM
                  </div>
                </div>

                {/* Monospace bottom coordinate indicators */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[9px] font-mono tracking-widest text-neutral-400 pointer-events-none">
                  <span>ELEVATION // 590M AMSL</span>
                  <span className="hidden sm:inline">CAMPUS ZONE // AUDITORIUM QUADRANT</span>
                  <a
                    href="https://maps.google.com/?q=BITS+Pilani+Hyderabad+Campus+Auditorium"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto text-white hover:text-[#eb0028] transition-colors underline underline-offset-2 uppercase"
                  >
                    Direct Navigate ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRANSIT & WAYFINDING (Cardless "Field Notes" Format) */}
      <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto mb-24 md:mb-32">
        <div className="border-t border-neutral-200 pt-16">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 mb-10">
            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-[#eb0028] uppercase font-bold mb-2">
                WAYFINDING
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                Transit & Route Protocols
              </h2>
            </div>

            {/* 21st.dev Style Sliding Pill Tab Switcher */}
            <div className="inline-flex p-1 bg-neutral-100 rounded-full border border-neutral-200/80 self-start md:self-auto">
              {TRANSIT_TABS.map((tab) => {
                const isSelected = activeTransit === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTransit(tab.id)}
                    className={`relative px-4 py-2 text-[11px] font-mono tracking-wider uppercase transition-colors duration-200 focus:outline-none select-none ${
                      isSelected
                        ? "text-neutral-900 font-semibold"
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="active-transit-pill"
                        className="absolute inset-0 bg-white rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-neutral-200/50"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cardless Field Notes Content Panel */}
          <div className="border-t border-neutral-200/80 pt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTransit.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-baseline"
              >
                {/* Monospace Metadata Column */}
                <div className="md:col-span-4 space-y-4">
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                      ESTIMATED COMMUTE
                    </span>
                    <span className="font-mono text-xl font-bold text-neutral-900 tracking-tight">
                      {currentTransit.time}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                      PRIMARY TERMINUS
                    </span>
                    <span className="font-mono text-xs text-neutral-700 tracking-wide">
                      {currentTransit.origin}
                    </span>
                  </div>
                </div>

                {/* Editorial Body Text */}
                <div className="md:col-span-8 space-y-4">
                  <p className="text-base sm:text-lg text-neutral-800 font-light leading-relaxed">
                    {currentTransit.details}
                  </p>
                  <p className="font-mono text-xs text-neutral-500 tracking-wide border-l-2 border-[#eb0028] pl-3 py-0.5">
                    {currentTransit.notes}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 5. CAMPUS PROTOCOL & DAY-OF INDEX (Watermelon UI Pattern) */}
      <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="border-t border-neutral-200 pt-16">
          <div className="mb-10">
            <p className="font-mono text-[10px] tracking-[0.25em] text-[#eb0028] uppercase font-bold mb-2">
              FIELD REGULATIONS
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
              Campus Protocol & Day-of Index
            </h2>
          </div>

          {/* Cardless Flat Horizontal Hairline List */}
          <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
            {PROTOCOLS.map((protocol) => (
              <div
                key={protocol.num}
                className="py-6 md:py-8 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-baseline"
              >
                <div className="md:col-span-4 font-mono text-xs tracking-wider text-neutral-900 flex items-baseline gap-2">
                  <span className="text-[#eb0028] font-bold">{protocol.num} /</span>
                  <span className="font-semibold uppercase tracking-wider">{protocol.title}</span>
                </div>
                <div className="md:col-span-8 text-sm md:text-base text-neutral-600 font-light leading-relaxed">
                  {protocol.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
