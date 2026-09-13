"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Radar from "@/components/reactbits/Radar";

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
    <main className="bg-[#fcfcfc] text-neutral-900 min-h-screen font-sans selection:bg-[#eb0028] selection:text-white pt-32 pb-36 relative overflow-hidden">


      <div className="relative z-10">
        {/* 1. HERO SECTION */}
        <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto mb-16 md:mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="font-mono text-[10px] md:text-[12px] tracking-[0.3em] text-[#eb0028] uppercase font-bold mb-6">
              TEDx BPHC / VENUE
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 leading-[1.1] mb-8">
              Where ideas <span className="italic font-serif font-light text-zinc-400">meet.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-light text-neutral-500 max-w-2xl mx-auto leading-relaxed">
              Every great idea needs a place to land. Join us at the BITS Pilani Hyderabad Campus Auditorium, a space designed for focus, connection, and paradigm-shifting conversations.
            </p>
          </motion.div>
        </section>

        {/* 2. VISUAL CENTERPIECE & INFO */}
        <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto mb-24 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Image Centerpiece */}
            <div className="lg:col-span-8 relative">
              <motion.div
                className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-neutral-200/50 group bg-neutral-100"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
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
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
                  Auditorium
                </h2>

                <div className="space-y-6 mb-10 text-neutral-600 font-light">
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Campus</span>
                    <p className="text-lg text-neutral-800 font-medium">BITS Pilani Hyderabad Campus</p>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Location</span>
                    <p className="text-base">Jawahar Nagar, Shamirpet,<br />Hyderabad, Telangana 500078</p>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Edition</span>
                    <p className="text-base">12th Annual Assembly — 2,500 Seats</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://maps.google.com/?q=BITS+Pilani+Hyderabad+Campus+Auditorium"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#eb0028] text-white px-6 py-3.5 rounded-full font-mono text-xs uppercase tracking-wider hover:bg-[#c20021] transition-all hover:shadow-lg hover:shadow-[#eb0028]/20 duration-200"
                  >
                    Open Map
                    <span className="text-[10px]">↗</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyCoordinates}
                    className="inline-flex items-center justify-center gap-2 bg-white border border-neutral-200 text-neutral-900 px-6 py-3.5 rounded-full font-mono text-xs uppercase tracking-wider hover:bg-neutral-50 hover:border-neutral-300 transition-colors duration-200"
                  >
                    {copied ? "Copied" : "Copy Coordinates"}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. TRANSIT & WAYFINDING */}
        <section className="px-6 md:px-12 lg:px-16 max-w-6xl mx-auto mb-24 md:mb-32">
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
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
                className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow text-left flex flex-col h-full"
              >
                <div className="mb-6">
                  <h3 className="font-mono text-xs tracking-wider text-[#eb0028] font-bold mb-2">{tab.label}</h3>
                  <p className="font-bold text-2xl text-neutral-900 mb-1">{tab.time}</p>
                  <p className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">{tab.origin}</p>
                </div>
                <p className="text-sm text-neutral-600 font-light leading-relaxed mb-6 flex-grow">{tab.details}</p>
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
            className="bg-white rounded-3xl p-8 md:p-12 border border-neutral-200 shadow-sm"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">Day-of Protocols</h2>
            </div>

            <div className="space-y-8">
              {PROTOCOLS.map((protocol) => (
                <div key={protocol.num} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start pb-8 border-b border-neutral-100 last:border-0 last:pb-0">
                  <span className="font-mono text-[#eb0028] font-bold text-lg sm:text-xl mt-0.5">{protocol.num}</span>
                  <div>
                    <h3 className="font-mono text-xs sm:text-sm tracking-widest text-neutral-900 font-bold mb-2 uppercase">{protocol.title}</h3>
                    <p className="text-neutral-600 font-light leading-relaxed text-sm sm:text-base">{protocol.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
