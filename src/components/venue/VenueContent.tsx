"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import TEDxWatermark from "@/components/layout/TEDxWatermark";

const TRANSIT_TABS = [
  {
    id: "road",
    label: "BY ROAD & PARKING",
    time: "45 MINS",
    origin: "SECUNDERABAD STATION",
    details:
      "45 minutes from Secunderabad Station via Rajiv Rahadari (SH-1). Recommended route via Outer Ring Road (ORR) Exit 7 towards Shamirpet.",
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

  const handleCopyCoordinates = () => {
    navigator.clipboard.writeText("17.5449° N, 78.5718° E");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#494949] selection:bg-[#eb0028] selection:text-white relative">
      <TEDxWatermark />
      {/* 
        HERO SECTION (Matching TEDx MIT & Speakers Page Hero)
        Dark background (#0a0a0c) with zero background animations
      */}
      <header className="relative z-10 w-full bg-[#0a0a0c] overflow-hidden">
        {/* Subtle radial depth overlay for TEDx contrast */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_top_right,rgba(235,0,40,0.25),transparent_60%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-70 bg-gradient-to-b from-black/80 via-black/60 to-[#0a0a0c]"
          aria-hidden="true"
        />

        <div className="relative max-w-[80rem] mx-auto px-6 md:px-12 pt-36 pb-20 md:pt-44 md:pb-28">
          <div className="max-w-[42rem]">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.2]">
              Where Ideas Meet
            </h1>

            {/* Spacing block 1 (1.5rem / 24px) */}
            <div className="h-6 w-full" aria-hidden="true" />

            {/* Subtitle */}
            <p className="text-white/90 text-lg md:text-[1.125rem] font-normal leading-relaxed">
              Every great idea needs a place to land. Join us at the BITS Pilani Hyderabad
              Campus Auditorium, an iconic space designed for focus, connection, and
              paradigm-shifting conversations.
            </p>

            {/* Spacing block 2 (2rem / 32px) */}
            <div className="h-8 w-full" aria-hidden="true" />

            {/* CTA Button Group */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/passes"
                className="inline-flex items-center justify-center px-6 py-3 rounded-[4px] bg-[#eb0028] hover:bg-[#960800] text-white font-semibold text-base transition-colors duration-200 shadow-sm"
              >
                Register for 2026
              </Link>
              <a
                href="#getting-here"
                className="inline-flex items-center justify-center px-6 py-3 rounded-[4px] border border-white hover:bg-white hover:text-black text-white font-semibold text-base transition-all duration-200"
              >
                Campus Directions
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* LOWER VENUE CONTENT */}
      <main className="bg-transparent text-[#494949] py-16 md:py-24 relative z-10">
        {/* 2. VISUAL CENTERPIECE & INFO */}
        <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto mb-24 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Image Centerpiece */}
            <div className="lg:col-span-8 relative">
              <motion.div 
                className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-xs border border-neutral-200/90 group bg-white"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Red subtle accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#eb0028] via-[#eb0028]/60 to-transparent z-20" />
                
                <Image
                  src="/gallery/image1.jpg"
                  alt="Auditorium Atrium & Stage, BITS Pilani Hyderabad"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                />
                
                {/* Subtle overlay gradient for elegance */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-10" />
              </motion.div>
            </div>

            {/* Venue Info */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-[#494949] mb-8">
                  Auditorium
                </h2>
                
                <div className="space-y-6 mb-10 text-[#494949] font-normal">
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Campus</span>
                    <p className="text-lg text-[#494949] font-semibold">BITS Pilani Hyderabad Campus</p>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Location</span>
                    <p className="text-base text-[#494949]">Jawahar Nagar, Shamirpet,<br/>Hyderabad, Telangana 500078</p>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Edition</span>
                    <p className="text-base text-[#494949]">12th Annual Assembly — 2,500 Seats</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://maps.google.com/?q=BITS+Pilani+Hyderabad+Campus+Auditorium"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#eb0028] text-white px-6 py-3.5 rounded-[4px] font-semibold text-sm hover:bg-[#c20021] transition-all hover:shadow-md duration-200"
                  >
                    Open Map
                    <span className="text-[12px]">↗</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyCoordinates}
                    className="inline-flex items-center justify-center gap-2 bg-white border border-neutral-200 text-[#494949] px-6 py-3.5 rounded-[4px] font-semibold text-sm hover:bg-neutral-50 hover:border-neutral-300 transition-colors duration-200 shadow-2xs"
                  >
                    {copied ? "Copied" : "Copy Coordinates"}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. TRANSIT & WAYFINDING */}
        <section id="getting-here" className="scroll-mt-28 px-6 md:px-12 lg:px-16 max-w-6xl mx-auto mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <p className="font-mono text-[10px] tracking-[0.25em] text-[#eb0028] uppercase font-bold mb-3">
              WAYFINDING
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#494949]">
              Getting Here
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TRANSIT_TABS.map((tab, idx) => (
              <motion.div 
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-neutral-200/90 shadow-xs hover:shadow-md transition-shadow text-left flex flex-col h-full"
              >
                <div className="mb-6">
                  <h3 className="font-mono text-xs tracking-wider text-[#eb0028] font-bold mb-2">{tab.label}</h3>
                  <p className="font-bold text-2xl text-[#494949] mb-1">{tab.time}</p>
                  <p className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">{tab.origin}</p>
                </div>
                <p className="text-sm text-[#494949] font-normal leading-relaxed mb-6 flex-grow opacity-90">{tab.details}</p>
                <div className="pt-4 border-t border-neutral-100 mt-auto">
                  <p className="text-xs text-neutral-500 italic leading-relaxed">{tab.notes}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. PROTOCOLS */}
        <section className="px-6 md:px-12 lg:px-16 max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white rounded-3xl p-8 md:p-12 border border-neutral-200/90 shadow-xs"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#494949]">Day-of Protocols</h2>
            </div>
            
            <div className="space-y-8">
              {PROTOCOLS.map((protocol) => (
                <div key={protocol.num} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start pb-8 border-b border-neutral-100 last:border-0 last:pb-0">
                  <span className="font-mono text-[#eb0028] font-bold text-lg sm:text-xl mt-0.5">{protocol.num}</span>
                  <div>
                    <h3 className="font-mono text-xs sm:text-sm tracking-widest text-[#494949] font-bold mb-2 uppercase">{protocol.title}</h3>
                    <p className="text-[#494949] font-normal leading-relaxed text-sm sm:text-base opacity-90">{protocol.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
