"use client";

import Image from "next/image";
import ViewOnMap from "@/components/venue/ViewOnMap";
import { MapPin, Compass, Building2, Users } from "lucide-react";

const BITS_HYDERABAD_MAPS_URL =
  "https://www.google.com/maps/place/Birla+Institute+of+Technology+%26+Science+Pilani,+Hyderabad+Campus/data=!4m2!3m1!1s0x0:0xc3e06e9e76cebf3d?sa=X&ved=1t:2428&ictx=111";

const VENUE_ADDRESS =
  "Auditorium, Birla Institute of Technology & Science Pilani, Hyderabad Campus, Jawahar Nagar, Shamirpet, Hyderabad, Telangana 500078";

export default function VenuePage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-zinc-100 overflow-x-hidden">
      {/* Background Subtle Tiles */}
      <div
        className="pointer-events-none absolute inset-0 bg-tiles opacity-40"
        aria-hidden="true"
      />

      {/* Subtle Ambient Red Glow Accent */}
      <div
        className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-[#E62B1E]/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        {/* Header Section */}
        <header className="mb-10 sm:mb-12">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#E62B1E]">
              LOCATION
            </span>
            <h1 className="text-5xl font-black uppercase tracking-tight text-white sm:text-7xl md:text-8xl">
              VENUE
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-light text-zinc-400 sm:text-base">
              Auditorium, BITS Pilani Hyderabad Campus — Where transformative ideas ignite change.
            </p>
          </div>
        </header>

        {/* Venue Showcase Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column: Venue Information Card with Enhanced BITS Auditorium Photo Background */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-800/80 bg-[#0d0e12] p-6 shadow-2xl sm:p-8 md:p-10 lg:col-span-5">
            {/* Enhanced BITS Auditorium Background with TEDx Theme & Dark Blending */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
              <Image
                src="/venue/bits-auditorium.jpg"
                alt="BITS Pilani Hyderabad Campus Auditorium Hall"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-center opacity-30 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-40 filter contrast-125 brightness-90"
                priority
              />
              {/* Seamless Dark Vignette & Gradient Overlays for Maximum Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-[#0d0e12]/85 to-[#0d0e12]/65" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d0e12]/95 via-[#0d0e12]/75 to-[#0d0e12]/90" />
              {/* Subtle TEDx Red Ambient Stage Glow */}
              <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#E62B1E]/15 blur-3xl" />
              <div className="absolute top-1/3 -right-12 h-44 w-44 rounded-full bg-[#E62B1E]/10 blur-3xl" />
            </div>

            {/* Content Layer (Positioned Above Background) */}
            <div className="relative z-10">
              {/* Venue Sub-tag */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-800/90 bg-zinc-900/90 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-zinc-300 backdrop-blur-md shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E62B1E] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E62B1E]" />
                </span>
                <span>VENUE AUDITORIUM</span>
              </div>

              {/* Venue Title & Address */}
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                BITS Pilani, Hyderabad Campus
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-300">
                Jawahar Nagar, Shamirpet,
                <br />
                Hyderabad, Telangana 500078
              </p>

              {/* Capacity & Acoustic Pill Badges */}
              <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[10px]">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800/90 bg-zinc-900/80 px-3 py-1 text-zinc-300 backdrop-blur-sm">
                  <Users className="h-3 w-3 text-[#E62B1E]" />
                  <span>Capacity: 2,500+ Seats</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800/90 bg-zinc-900/80 px-3 py-1 text-zinc-300 backdrop-blur-sm">
                  <Building2 className="h-3 w-3 text-[#E62B1E]" />
                  <span>Tiered Auditorium</span>
                </span>
              </div>

              {/* Key Details List */}
              <div className="mt-8 space-y-3.5 border-t border-zinc-800/80 pt-6 font-mono text-xs text-zinc-300">
                <div className="flex items-start gap-3">
                  <span className="text-[#E62B1E] font-bold">▸</span>
                  <div>
                    <strong className="text-white">Hall:</strong> University Auditorium (Central Stage)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#E62B1E] font-bold">▸</span>
                  <div>
                    <strong className="text-white">Acoustics:</strong> Diamond-coffered acoustic ceiling & pro stage lighting
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#E62B1E] font-bold">▸</span>
                  <div>
                    <strong className="text-white">Entry Gate:</strong> Gate 2 (Attendee & Guest Parking)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#E62B1E] font-bold">▸</span>
                  <div>
                    <strong className="text-white">Highway:</strong> Outer Ring Road (ORR) Exit 7
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Google Maps Action Button */}
            <div className="relative z-10 mt-8 border-t border-zinc-800/80 pt-6">
              <a
                href={BITS_HYDERABAD_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border border-zinc-700/80 bg-zinc-900/90 px-5 py-3.5 text-xs font-mono font-medium text-zinc-200 backdrop-blur-sm transition-all hover:border-[#E62B1E] hover:bg-zinc-800 hover:text-white sm:w-auto shadow-md"
              >
                <MapPin className="h-4 w-4 text-[#E62B1E] transition-transform group-hover:scale-110" />
                <span>Open in Google Maps</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 text-zinc-400 group-hover:text-white"
                  aria-hidden="true"
                >
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive ViewOnMap Showcase Card with Ambient Blend */}
          <div className="relative flex min-h-[440px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-zinc-800/80 bg-[#0d0e12] p-4 shadow-2xl sm:p-6 lg:col-span-7 group">
            {/* Background BITS Audi Ambient Texture Overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-15 bg-center bg-cover transition-transform duration-700 group-hover:scale-105 filter contrast-125 brightness-90"
              style={{
                backgroundImage: "url('/venue/bits-auditorium.jpg')",
              }}
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0d0e12]/85 via-[#0d0e12]/60 to-[#0d0e12]/95" />

            {/* Coordinates & Venue Badge */}
            <div className="pointer-events-none absolute bottom-4 left-6 hidden items-center gap-2 font-mono text-[11px] text-zinc-400 sm:flex z-10">
              <Compass className="h-3.5 w-3.5 text-[#E62B1E]" />
              <span>17.5449° N, 78.5718° E • BITS Pilani Hyderabad Central Stage</span>
            </div>

            {/* Interactive ViewOnMap Morphing Component */}
            <div className="relative z-10 flex w-full items-center justify-center">
              <ViewOnMap
                locationName="Auditorium, BITS Pilani Hyderabad Campus"
                address={VENUE_ADDRESS}
                mapsUrl={BITS_HYDERABAD_MAPS_URL}
                layoutIdPrefix="venue-map"
              />
            </div>
          </div>
        </div>

        {/* Transportation & Logistics Section */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800/80 bg-[#121212] p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-sm">
                ✈️
              </span>
              <h3 className="text-base font-bold text-white">From Airport (RGIA)</h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-zinc-400">
              Take the PVNR Expressway onto the Nehru Outer Ring Road (ORR) towards Shamirpet. Take Exit 7 to reach the campus (approx. 70 mins).
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800/80 bg-[#121212] p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-sm">
                🚆
              </span>
              <h3 className="text-base font-bold text-white">From Railway Station</h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-zinc-400">
              Secunderabad Railway Station is approx. 22 km from the campus. Direct TSRTC buses (Route 212) and cab services run regularly to the BITS gate.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800/80 bg-[#121212] p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-sm">
                🛡️
              </span>
              <h3 className="text-base font-bold text-white">Security & Check-In</h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-zinc-400">
              Visitor entry is through Gate 2. Please have your TEDx ticket QR code and valid photo ID ready for verification at the security desk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
