"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import FAQ3, { FAQItem } from "@/components/faq/FAQ3";
import { faqData } from "@/data/faq";
import { Mail, MessageCircleQuestion, Calendar, MapPin } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";

export default function FaqPage() {
  // Flatten all categories into a single unified curated list with category tags
  const allCuratedItems: FAQItem[] = useMemo(() => {
    return faqData.flatMap((category) =>
      category.items.map((item) => ({
        ...item,
        category: category.categoryName,
      }))
    );
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-zinc-100">
      {/* Background Subtle Tiles */}
      <div
        className="pointer-events-none absolute inset-0 bg-tiles opacity-35"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        {/* ================= PAGE HERO HEADER ================= */}
        <header className="mb-10 border-b border-zinc-800/80 pb-10 text-center sm:text-left">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#EB0028]">
                <span className="h-2 w-2 rounded-full bg-[#EB0028] shadow-[0_0_8px_#EB0028]" />
                <span>TEDx BPHC 2026 HELP CENTER</span>
              </div>
              <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-white sm:text-6xl md:text-7xl">
                Frequently Asked Questions
              </h1>
              <p className="mt-3 max-w-2xl text-sm font-light text-zinc-400 sm:text-base">
                Everything you need to know about registration, schedule, auditorium check-in, and venue policies in one curated section.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex shrink-0 flex-wrap items-center gap-2.5">
              <Link
                href="/schedule"
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-[#121212] px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
              >
                <Calendar className="h-3.5 w-3.5 text-[#EB0028]" />
                <span>Schedule</span>
              </Link>
              <Link
                href="/venue"
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-[#121212] px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
              >
                <MapPin className="h-3.5 w-3.5 text-[#EB0028]" />
                <span>Venue</span>
              </Link>
            </div>
          </div>
        </header>

        {/* ================= SINGLE CURATED FAQ LIST ================= */}
        <FAQ3
          badge="Curated Guide"
          heading="Essential Queries"
          subheading="Clear answers regarding delegate registration, security check-in, parking, and conference guidelines."
          items={allCuratedItems}
          className="px-0 py-2"
        />

        {/* ================= STILL HAVE QUESTIONS CTA ================= */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-[#141414] to-[#0d0d0d] p-8 text-center sm:p-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#EB0028]/30 bg-[#EB0028]/10 text-[#EB0028]">
            <MessageCircleQuestion className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
            Still Have Questions?
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400 sm:text-base">
            Can&apos;t find what you are looking for? Our organizing committee is happy to help you with any queries.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:tedx@hyderabad.bits-pilani.ac.in?subject=FAQ%20Inquiry%20-%20TEDx%20BPHC%202026"
              className="inline-flex items-center gap-2 rounded-xl bg-[#EB0028] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#EB0028]/20 transition-colors hover:bg-[#cf2418]"
            >
              <Mail className="h-4 w-4" />
              <span>Email Desk</span>
            </a>

            <a
              href="https://www.instagram.com/tedxbitshyderabad/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
            >
              <FaInstagram className="h-4 w-4 text-[#EB0028]" />
              <span>Instagram DM</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
