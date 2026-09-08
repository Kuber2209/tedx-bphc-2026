"use client";

import React from "react";
import { PartnershipTier } from "@/data/sponsors";
import { Check, ArrowRight } from "lucide-react";

interface TierCardProps {
  tier: PartnershipTier;
  className?: string;
}

export default function TierCard({ tier, className = "" }: TierCardProps) {
  const mailSubject = encodeURIComponent(`Partnership Inquiry - ${tier.name} (TEDx BITS Hyderabad 2026)`);
  const mailBody = encodeURIComponent(
    `Hello TEDx BITS Hyderabad Partnership Team,\n\nWe are interested in exploring partnership opportunities under the ${tier.name} tier for TEDx BPHC 2026.\n\nOrganization Name:\nContact Person:\nPhone Number:\n\nThank you!`
  );
  const inquiryMailto = `mailto:tedx@hyderabad.bits-pilani.ac.in?subject=${mailSubject}&body=${mailBody}`;

  return (
    <div
      className={`tier-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-2 ${
        tier.highlighted
          ? "border-[#E62B1E]/60 bg-gradient-to-b from-[#181212] via-[#121212] to-[#0d0d0d] shadow-2xl shadow-[#E62B1E]/15"
          : "border-zinc-800/80 bg-[#121212] hover:border-zinc-600 hover:shadow-xl hover:shadow-black/60"
      } p-6 sm:p-8 ${className}`}
    >
      {/* Top Header */}
      <div className="tier-card-header">
        <div className="flex items-center justify-between gap-2">
          {tier.badge && (
            <span
              className={`tier-card-badge inline-block rounded-full px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider ${
                tier.highlighted
                  ? "border border-[#E62B1E]/40 bg-[#E62B1E]/15 text-[#E62B1E]"
                  : "border border-zinc-800 bg-zinc-900 text-zinc-400"
              }`}
            >
              {tier.badge}
            </span>
          )}

          <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
            2026 Edition
          </span>
        </div>

        <h3 className="tier-card-title mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl">
          {tier.name}
        </h3>

        <p className="tier-card-tagline mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">
          {tier.tagline}
        </p>
      </div>

      {/* Deliverables / Benefits List */}
      <div className="tier-card-benefits my-8 border-t border-zinc-800/80 pt-6">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-4">
          Key Deliverables & Exposure:
        </span>
        <ul className="tier-benefits-list space-y-3.5">
          {tier.benefits.map((benefit, index) => (
            <li
              key={index}
              className="tier-benefit-item flex items-start gap-3 text-xs leading-relaxed text-zinc-300"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E62B1E]/15 text-[#E62B1E]">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Inquiry Action */}
      <div className="tier-card-footer pt-4 border-t border-zinc-800/80">
        <a
          href={inquiryMailto}
          className={`tier-cta-button group/btn flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-300 ${
            tier.highlighted
              ? "bg-[#E62B1E] text-white shadow-lg shadow-[#E62B1E]/20 hover:bg-[#c92418] hover:shadow-xl hover:shadow-[#E62B1E]/30"
              : "border border-zinc-700/80 bg-zinc-900/90 text-zinc-200 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
          }`}
        >
          <span>{tier.ctaText || "Inquire for Tier"}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
