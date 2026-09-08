"use client";

import React from "react";
import PartnerCard from "@/components/sponsors/PartnerCard";
import TierCard from "@/components/sponsors/TierCard";
import { currentPartners, partnershipTiers, pastSponsors } from "@/data/sponsors";
import { ArrowRight, Mail } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";

export default function SponsorsPage() {
  const contactEmail = "tedx@hyderabad.bits-pilani.ac.in";
  const instagramUrl = "https://www.instagram.com/tedxbitshyderabad/";
  const emailMailto = `mailto:${contactEmail}?subject=Partnership%20Inquiry%20-%20TEDx%20BITS%20Hyderabad%202026`;

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-zinc-100">
      {/* Background Subtle Tiles */}
      <div
        className="pointer-events-none absolute inset-0 bg-tiles opacity-40"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        {/* ================= HERO HEADER ================= */}
        <section className="mb-20">
          <div className="flex flex-col justify-between gap-6 border-b border-zinc-800/80 pb-12 md:flex-row md:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E62B1E]">
                <span className="h-2 w-2 rounded-full bg-[#E62B1E]" />
                <span>PARTNERS & COLLABORATORS</span>
              </div>
              <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl md:text-8xl">
                Our Sponsors
              </h1>
            </div>

            <div className="max-w-md text-zinc-400">
              <p className="text-base font-light sm:text-lg">
                Sharing our vision, supporting our mission.
              </p>
              <p className="mt-2 text-xs font-mono tracking-wide text-zinc-500">
                TEDx BPHC 2026-27 • 12th Edition
              </p>
            </div>
          </div>
        </section>

        {/* ================= SECTION 1: THIS YEAR'S PARTNERS ================= */}
        <section className="mb-24 sm:mb-28">
          <div className="mb-10">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E62B1E]">
              <span className="h-2 w-2 rounded-full bg-[#E62B1E] animate-pulse" />
              <span>OFFICIAL PARTNERS 2026 EDITION</span>
            </div>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
              THIS YEAR&apos;S PARTNERS
            </h2>
            <p className="mt-3 max-w-2xl text-sm font-light text-zinc-400">
              Visionary organizations powering student innovation, culture, and disruptive discourse at BITS Pilani Hyderabad Campus.
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {currentPartners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        </section>

        {/* ================= SECTION 2: PARTNERSHIP TIERS ================= */}
        <section className="mb-24 sm:mb-28">
          <div className="mb-10">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E62B1E]">
              <span className="h-2 w-2 rounded-full bg-[#E62B1E]" />
              <span>PARTNERSHIP TIERS</span>
            </div>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
              BECOME A PARTNER
            </h2>
            <p className="mt-3 max-w-2xl text-sm font-light text-zinc-400">
              Align your brand with India&apos;s most vibrant student TED event. Explore customized avenues to connect with tomorrow&apos;s innovators.
            </p>
          </div>

          {/* Tiers Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {partnershipTiers.map((tier) => (
              <TierCard key={tier.id} tier={tier} />
            ))}
          </div>
        </section>

        {/* ================= SECTION 3: PAST SPONSORS ================= */}
        <section className="mb-24 sm:mb-28">
          <div className="mb-10">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-zinc-600" />
              <span>EDITIONS ARCHIVE</span>
            </div>
            <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
              PAST SPONSORS
            </h2>
            <p className="mt-2 max-w-2xl text-xs font-light text-zinc-400 sm:text-sm">
              Honoring organizations that have sparked curiosity and supported change across previous TEDx editions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {pastSponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="group relative flex flex-col items-center justify-center rounded-2xl border border-zinc-850 bg-zinc-900/60 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-black text-xs font-black text-zinc-300 group-hover:border-[#E62B1E]/40 group-hover:text-white">
                  {sponsor.name.charAt(0)}
                </div>
                <h4 className="mt-3 text-xs font-bold text-zinc-200 group-hover:text-white">
                  {sponsor.name}
                </h4>
                <span className="mt-1 font-mono text-[10px] text-zinc-400">
                  {sponsor.category}
                </span>
                {sponsor.year && (
                  <span className="mt-1 font-mono text-[9px] text-zinc-400">
                    {sponsor.year}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ================= SECTION 4: LET'S BUILD SOMETHING TOGETHER ================= */}
        <section className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-[#121212] via-[#0d0d0d] to-black px-6 py-16 text-center shadow-2xl sm:px-12 md:py-24">
          {/* Subtle Radial Glow */}
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#E62B1E]/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E62B1E]">
              <span className="h-2 w-2 rounded-full bg-[#E62B1E]" />
              <span>GET IN TOUCH</span>
            </div>

            <h2 className="text-4xl font-black uppercase tracking-tight text-white sm:text-6xl md:text-7xl">
              LET&apos;S BUILD SOMETHING{" "}
              <span className="block text-[#E62B1E]">TOGETHER</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Partner with TEDx BITS Hyderabad to reach thousands of students, faculty, and professionals at one of India&apos;s premier student conferences.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={emailMailto}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#E62B1E] px-8 py-4 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-[#E62B1E]/20 transition-all hover:bg-[#cf2418] hover:shadow-2xl hover:shadow-[#E62B1E]/30 sm:w-auto"
              >
                <Mail className="h-4 w-4" />
                <span>Email Us</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900/90 px-8 py-4 font-mono text-xs font-bold uppercase tracking-wider text-zinc-200 transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:text-white sm:w-auto"
              >
                <FaInstagram className="h-4 w-4" />
                <span>Instagram DM</span>
              </a>
            </div>

            {/* Subtitle email */}
            <p className="mt-6 font-mono text-xs text-zinc-400">
              <a
                href={emailMailto}
                className="transition-colors hover:text-zinc-200"
              >
                {contactEmail}
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
