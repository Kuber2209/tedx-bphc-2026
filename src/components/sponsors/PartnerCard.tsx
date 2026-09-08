"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Partner } from "@/data/sponsors";
import { ExternalLink } from "lucide-react";

interface PartnerCardProps {
  partner: Partner;
  className?: string;
}

export default function PartnerCard({ partner, className = "" }: PartnerCardProps) {
  const [imageError, setImageError] = useState(false);

  const CardWrapper = partner.website ? "a" : "div";
  const wrapperProps = partner.website
    ? {
        href: partner.website,
        target: "_blank",
        rel: "noopener noreferrer",
        title: `Visit ${partner.name}`,
      }
    : {};

  return (
    <div
      className={`partner-card group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#121212] transition-all duration-300 hover:-translate-y-1.5 hover:border-zinc-600 hover:shadow-xl hover:shadow-[#E62B1E]/10 ${className}`}
    >
      {/* Top Media / Logo Area */}
      <CardWrapper
        {...wrapperProps}
        className="partner-card-media relative flex h-40 w-full items-center justify-center overflow-hidden bg-white px-6 py-4 transition-colors duration-300 sm:h-44"
      >
        {/* Top-Left Red Corner Notch matching design specification */}
        <div
          className="partner-card-notch absolute -left-6 -top-6 h-12 w-12 rotate-45 bg-[#E62B1E] shadow-sm transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        />

        {/* Hover External Link Indicator if website is provided */}
        {partner.website && (
          <div
            className="absolute right-3 top-3 z-10 rounded-full bg-black/10 p-1.5 text-zinc-600 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-black"
            aria-hidden="true"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </div>
        )}

        {/* Partner Logo or Stylized Name Placeholder */}
        {partner.logoUrl && !imageError ? (
          <div className="relative h-full w-full">
            <Image
              src={partner.logoUrl}
              alt={partner.name}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-sans text-2xl font-black tracking-tight text-zinc-900 transition-colors duration-300 group-hover:text-[#E62B1E] sm:text-3xl">
              {partner.name}
            </span>
            <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
              Partner Brand
            </span>
          </div>
        )}
      </CardWrapper>

      {/* Bottom Category Label Bar */}
      <div className="partner-card-footer flex items-center justify-between border-t border-zinc-800 bg-[#0d0d0d] px-4 py-3">
        <span className="partner-card-category font-mono text-[11px] font-bold uppercase tracking-wider text-[#E62B1E]">
          {partner.category}
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-700 transition-colors group-hover:bg-[#E62B1E]" />
      </div>
    </div>
  );
}
