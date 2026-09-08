"use client";

import ViewOnMap from "@/components/venue/ViewOnMap";
import { MapPin, Compass } from "lucide-react";

const BITS_HYDERABAD_MAPS_URL =
  "https://www.google.com/maps/place/Birla+Institute+of+Technology+%26+Science+Pilani,+Hyderabad+Campus/data=!4m2!3m1!1s0x0:0xc3e06e9e76cebf3d?sa=X&ved=1t:2428&ictx=111";

const VENUE_ADDRESS =
  "Auditorium, Birla Institute of Technology & Science Pilani, Hyderabad Campus, Jawahar Nagar, Shamirpet, Hyderabad, Telangana 500078";

export default function VenuePage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-zinc-100">
      {/* Background Subtle Tiles */}
      <div
        className="pointer-events-none absolute inset-0 bg-tiles opacity-40"
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
          {/* Left Column: Venue Information Card */}
          <div className="flex flex-col justify-between rounded-3xl border border-zinc-800/80 bg-[#121212] p-6 shadow-2xl sm:p-8 md:p-10 lg:col-span-5">
            <div>
              {/* Venue Sub-tag */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/90 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-zinc-300">
                <span className="h-2 w-2 rounded-full bg-[#E62B1E]" />
                <span>VENUE AUDITORIUM</span>
              </div>

              {/* Venue Title & Address */}
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                BITS Pilani, Hyderabad Campus
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-400">
                Jawahar Nagar, Shamirpet,
                <br />
                Hyderabad, Telangana 500078
              </p>

              {/* Key Details List */}
              <div className="mt-8 space-y-4 border-t border-zinc-800/80 pt-6 font-mono text-xs text-zinc-300">
                <div className="flex items-start gap-3">
                  <span className="text-[#E62B1E] font-bold">▸</span>
                  <div>
                    <strong className="text-white">Hall:</strong> University Auditorium (Central Stage)
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
            <div className="mt-8 border-t border-zinc-800/80 pt-6">
              <a
                href={BITS_HYDERABAD_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border border-zinc-700/80 bg-zinc-900/80 px-5 py-3.5 text-xs font-mono font-medium text-zinc-200 transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:text-white sm:w-auto"
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

          {/* Right Column: Interactive ViewOnMap Showcase Card */}
          <div className="relative flex min-h-[440px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-zinc-800/80 bg-[#121212] p-4 shadow-2xl sm:p-6 lg:col-span-7">
            {/* Background Map Graphic Preview */}
            <div
              className="pointer-events-none absolute inset-0 opacity-10 bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=2000&auto=format&fit=crop')",
              }}
              aria-hidden="true"
            />

            {/* Coordinates Badge */}
            <div className="pointer-events-none absolute bottom-4 left-6 hidden items-center gap-2 font-mono text-[11px] text-zinc-500 sm:flex">
              <Compass className="h-3.5 w-3.5 text-[#E62B1E]" />
              <span>17.5449° N, 78.5718° E • BITS Pilani Hyderabad</span>
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
