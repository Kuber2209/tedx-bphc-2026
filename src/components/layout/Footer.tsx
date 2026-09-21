"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import ViewOnMap from "@/components/venue/ViewOnMap";
import { FaLinkedinIn, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { Mail, Phone, MapPin } from "lucide-react";

const Aurora = dynamic(() => import("@/components/backgrounds/Aurora"), { ssr: false });

const TEDX_LINKEDIN = "https://www.linkedin.com/company/tedxbitshyderabad/";
const TEDX_INSTAGRAM = "https://www.instagram.com/tedxbitshyderabad/";
const TEDX_EMAIL = "tedx@hyderabad.bits-pilani.ac.in";
const TEDX_PHONE = "+91 98765 43210";
const TEDX_PHONE_TEL = "+919876543210";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black text-white overflow-hidden">
      {/* Aurora Borealis Background Effect on Black - TED Signature Palette */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {/* CSS Ambient Aurora Glow Mesh (fallback & rich glow enhancer) */}
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_80%_50%_at_25%_35%,rgba(235,0,40,0.28),transparent_65%),radial-gradient(ellipse_60%_50%_at_75%_35%,rgba(255,255,255,0.09),transparent_60%),radial-gradient(ellipse_75%_65%_at_50%_80%,rgba(140,0,24,0.32),transparent_70%)]" />

        {/* Live WebGL Aurora Shader in TED Red, Pearlescent White, and Deep Crimson */}
        <div className="absolute inset-0 opacity-65 mix-blend-screen">
          <Aurora
            colorStops={["#eb0028", "#f4f4f5", "#800010"]}
            amplitude={1.15}
            blend={0.65}
            speed={0.55}
            lightMode={false}
          />
        </div>

        {/* Cinematic dark top and bottom gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/75 pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {/* 1. TOP BRAND SHOWCASE - Generous, prestigious architectural header */}
        <div className="pb-10 md:pb-12 border-b border-white/[0.08]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <Link href="/" className="inline-block transition-transform duration-300 hover:scale-[1.01]">
                <Image
                  src="/tedx-logo-transparent.png"
                  alt="TEDx BITS Hyderabad"
                  width={377}
                  height={46}
                  className="h-10 sm:h-12 w-auto object-contain"
                  priority
                />
              </Link>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                An independently organized TED event dedicated to ideas that challenge the ordinary. Fostering multidisciplinary dialogues across science, technology, and culture at BITS Pilani Hyderabad Campus.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2.5 font-mono text-xs text-zinc-400">
              <div className="inline-flex items-center gap-2 text-[#eb0028] tracking-widest uppercase font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-[#eb0028]" />
                12th Annual Assembly • 2026
              </div>
              <p className="text-zinc-400">
                BITS Pilani, Hyderabad Campus
              </p>
              <p className="text-[11px] text-zinc-500">
                17.5449° N, 78.5718° E
              </p>
            </div>
          </div>
        </div>

        {/* 2. LOWER COLUMNS */}
        <div className="pt-10 md:pt-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Social Networks & Licensing (lg:col-span-4) */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-4">
            <div>
              <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#E62B1E] mb-3">
                CONNECT & COMMUNITY
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Stay updated on speaker announcements, registrations, and behind-the-scenes insights.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={TEDX_LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TEDx BITS Hyderabad LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/90 text-zinc-400 shadow-sm transition-all hover:border-[#eb0028]/50 hover:bg-zinc-800 hover:text-white hover:scale-105"
                >
                  <FaLinkedinIn className="h-4 w-4" />
                </a>

                <a
                  href={TEDX_INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TEDx BITS Hyderabad Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/90 text-zinc-400 shadow-sm transition-all hover:border-[#eb0028]/50 hover:bg-zinc-800 hover:text-[#E4405F] hover:scale-105"
                >
                  <FaInstagram className="h-4 w-4" />
                </a>

                <a
                  href="https://twitter.com/tedx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TEDx Twitter / X"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/90 text-zinc-400 shadow-sm transition-all hover:border-[#eb0028]/50 hover:bg-zinc-800 hover:text-white hover:scale-105"
                >
                  <FaXTwitter className="h-4 w-4" />
                </a>

                <a
                  href="https://www.youtube.com/@TEDx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TEDx YouTube"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/90 text-zinc-400 shadow-sm transition-all hover:border-[#eb0028]/50 hover:bg-zinc-800 hover:text-[#FF0000] hover:scale-105"
                >
                  <FaYoutube className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/60">
              <p className="text-[11px] text-zinc-500 leading-normal">
                <span className="text-[#eb0028] font-bold">TEDx</span> is a program of local, self-organized events that bring people together to share a TED-like experience.
              </p>
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

        {/* Bottom Bar: Copyright & License */}
        <div className="mt-14 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
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
