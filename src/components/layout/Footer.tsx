"use client";

import React from "react";
import Link from "next/link";
import ViewOnMap from "@/components/venue/ViewOnMap";
import TedxLogo from "@/components/layout/TedxLogo";
import { FaLinkedinIn, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { Mail, Phone, MapPin } from "lucide-react";

const TEDX_LINKEDIN = "https://www.linkedin.com/company/tedxbitshyderabad/";
const TEDX_INSTAGRAM = "https://www.instagram.com/tedxbitshyderabad/";
const TEDX_EMAIL = "tedx@hyderabad.bits-pilani.ac.in";
const TEDX_PHONE = "+91 98765 43210";
const TEDX_PHONE_TEL = "+919876543210";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black text-white">
      {/* Background Grid Accent */}
      <div
        className="pointer-events-none absolute inset-0 bg-tiles opacity-20"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: TEDx Branding & Social Networks (lg:col-span-4) */}
          <div className="flex flex-col space-y-6 lg:col-span-4">
            <div className="space-y-3">
              {/* Event Badge & Campus Indicator */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider bg-[#eb0028]/10 text-[#eb0028] border border-[#eb0028]/25">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#eb0028] animate-pulse" />
                  2026 ASSEMBLY
                </span>
                <span className="text-[11px] font-mono tracking-wider text-zinc-500 uppercase">
                  Hyderabad, IN
                </span>
              </div>

              {/* Bespoke Brand Header */}
              <Link href="/" className="group inline-block focus:outline-none">
                <div className="flex items-baseline gap-1 select-none font-sans font-black tracking-tight leading-none text-3xl sm:text-[34px]">
                  <span className="text-[#eb0028] tracking-[-0.04em] transition-transform duration-300 group-hover:scale-105">
                    TED
                  </span>
                  <span className="text-[#eb0028] font-bold text-[0.7em] leading-none -translate-y-[0.28em] ml-[0.05em] mr-[0.22em]">
                    x
                  </span>
                  <span className="font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-white/90">
                    BITS Hyderabad
                  </span>
                </div>
              </Link>

              {/* Sub-brand Campus & Official TED Tagline */}
              <div className="flex flex-col gap-1 border-l-2 border-[#eb0028]/80 pl-3 py-0.5">
                <p className="text-xs font-mono font-medium tracking-wide text-zinc-300">
                  BITS Pilani Hyderabad Campus
                </p>
                <p className="text-[11px] tracking-wide text-zinc-400 font-normal">
                  <span className="text-[#eb0028] font-bold">x</span> = independently organized TED event
                </p>
              </div>
            </div>

            <p className="max-w-sm text-xs leading-relaxed text-zinc-400">
              Ideas worth spreading. Fostering multidisciplinary dialogue, scientific innovation, and impactful storytelling across India and beyond.
            </p>

            <div>
              <p className="text-xs font-medium text-zinc-400">
                Get connected with us on social networks:
              </p>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href={TEDX_LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TEDx BITS Hyderabad LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900/90 text-zinc-400 shadow-sm transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:text-[#0A66C2] hover:scale-105"
                >
                  <FaLinkedinIn className="h-4 w-4" />
                </a>

                <a
                  href={TEDX_INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TEDx BITS Hyderabad Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900/90 text-zinc-400 shadow-sm transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:text-[#E4405F] hover:scale-105"
                >
                  <FaInstagram className="h-4 w-4" />
                </a>

                <a
                  href="https://twitter.com/tedx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TEDx Twitter / X"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900/90 text-zinc-400 shadow-sm transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:text-white hover:scale-105"
                >
                  <FaXTwitter className="h-4 w-4" />
                </a>

                <a
                  href="https://www.youtube.com/@TEDx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TEDx YouTube"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900/90 text-zinc-400 shadow-sm transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:text-[#FF0000] hover:scale-105"
                >
                  <FaYoutube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Useful Links (lg:col-span-2) */}
          <div className="flex flex-col space-y-4 lg:col-span-2">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#E62B1E]">
              USEFUL LINKS
            </h3>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/speakers"
                  className="transition-colors hover:text-white"
                >
                  Speakers
                </Link>
              </li>
              <li>
                <Link
                  href="/passes"
                  className="transition-colors text-zinc-300 hover:text-white font-medium"
                >
                  Register & Passes
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="transition-colors hover:text-white"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="transition-colors hover:text-white"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/sponsors"
                  className="transition-colors hover:text-white"
                >
                  Sponsors
                </Link>
              </li>
              <li>
                <Link
                  href="/venue"
                  className="transition-colors hover:text-white"
                >
                  Venue
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details (lg:col-span-3) */}
          <div className="flex flex-col space-y-4 lg:col-span-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#E62B1E]">
              CONTACT
            </h3>
            <div className="space-y-3.5 text-xs leading-relaxed text-zinc-400">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E62B1E]" />
                <span>
                  BITS Pilani, Hyderabad Campus,
                  <br />
                  Jawahar Nagar, Shamirpet,
                  <br />
                  Hyderabad, Telangana 500078
                </span>
              </div>

              {/* Email Link */}
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[#E62B1E]" />
                <a
                  href={`mailto:${TEDX_EMAIL}`}
                  className="break-all text-white underline-offset-4 transition-colors hover:text-[#E62B1E] hover:underline"
                  title="Send an email to TEDx BITS Hyderabad"
                >
                  {TEDX_EMAIL}
                </a>
              </div>

              {/* Executive Phone Link */}
              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="h-4 w-4 shrink-0 text-[#E62B1E]" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono uppercase text-zinc-400">
                    Tedx Executive
                  </span>
                  <a
                    href={`tel:${TEDX_PHONE_TEL}`}
                    className="font-mono text-xs font-medium text-white transition-colors hover:text-[#E62B1E] hover:underline"
                    title="Call TEDx Executive"
                  >
                    {TEDX_PHONE}
                  </a>
                </div>
              </div>

              {/* Community Link */}
              <div className="pt-2 border-t border-zinc-800/80">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                  JOIN OUR COMMUNITY
                </span>
                <a
                  href={TEDX_LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-[#E62B1E] transition-colors hover:underline hover:text-red-400"
                >
                  <span>Connect on LinkedIn</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Find Us - View On Map (lg:col-span-3) */}
          <div className="flex flex-col space-y-4 lg:col-span-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#E62B1E]">
              FIND US
            </h3>
            <p className="text-xs text-zinc-400">
              Interactive map of BITS Pilani Hyderabad Campus Auditorium:
            </p>

            <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 backdrop-blur-sm">
              <ViewOnMap
                layoutIdPrefix="footer-map"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Architectural Statement Watermark */}
        <div className="relative mt-16 pt-8 pb-3 overflow-hidden select-none pointer-events-none border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
            <span className="font-black text-[clamp(2.25rem,7vw,5.5rem)] tracking-tighter leading-none text-white/[0.06] uppercase">
              TED<span className="text-[#eb0028]/[0.22]">x</span>BITS<span className="text-white/[0.035]">Hyderabad</span>
            </span>
            <span className="font-mono text-[11px] text-zinc-600 tracking-[0.25em] uppercase">
              Ideas That Challenge The Ordinary • 2026
            </span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & License */}
        <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-center text-xs text-zinc-500 sm:flex-row sm:text-left">
          <p>
            © 2026 <strong className="text-zinc-300 font-semibold">TEDx BITS Hyderabad</strong>. All rights reserved.
          </p>
          <p className="text-[11px] text-zinc-500">
            This independent TEDx event is operated under license from TED.
          </p>
        </div>
      </div>
    </footer>
  );
}
