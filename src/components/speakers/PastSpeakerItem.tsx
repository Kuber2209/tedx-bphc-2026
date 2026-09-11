"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Speaker } from "@/data/speakers";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { ChevronDown, ChevronUp, User, Sparkles } from "lucide-react";

interface PastSpeakerItemProps {
  speaker: Speaker;
  index: number;
  isExpanded?: boolean;
  onToggle?: () => void;
}

/**
 * ============================================================================
 * PastSpeakerItem Component
 * ============================================================================
 * Displays a sleek list row for past speakers with an expandable detail panel
 * showing a small photo and summary info upon click.
 * Designed to be modular so the team can easily customize it later.
 * ============================================================================
 */
export default function PastSpeakerItem({
  speaker,
  index,
  isExpanded = false,
  onToggle,
}: PastSpeakerItemProps) {
  const [imageError, setImageError] = useState(false);

  // Fallback avatar with initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const hasValidPhoto = Boolean(speaker.imageUrl && !imageError);

  return (
    <div className="past-speaker-item-wrapper rounded-xl border border-transparent transition-all hover:border-zinc-800">
      {/* Clickable Row Header */}
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle?.();
          }
        }}
        className={`past-speaker-row group flex cursor-pointer flex-col justify-between gap-4 rounded-xl px-4 py-5 transition-all sm:flex-row sm:items-center ${
          isExpanded
            ? "bg-zinc-900/60 border-b border-zinc-800/80 rounded-b-none"
            : "hover:bg-zinc-900/40"
        }`}
        aria-expanded={isExpanded}
      >
        {/* Index and Basic Info */}
        <div className="past-speaker-info flex items-baseline gap-4 sm:gap-6">
          <span className="past-speaker-index font-mono text-xs font-semibold text-zinc-600 transition-colors group-hover:text-[#E62B1E]">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div>
            <div className="flex items-center gap-3">
              <h3 className="past-speaker-name text-xl font-black uppercase tracking-tight text-neutral-900 transition-colors group-hover:text-[#E62B1E] sm:text-2xl">
                {speaker.name}
              </h3>
              <span className="inline-flex sm:hidden font-mono text-[10px] text-zinc-500">
                {isExpanded ? <ChevronUp className="h-3.5 w-3.5 text-[#E62B1E]" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </span>
            </div>

            <p className="past-speaker-role mt-1 font-mono text-xs text-zinc-500">
              {speaker.role}
              {speaker.company ? ` • ${speaker.company}` : ""}
            </p>
          </div>
        </div>

        {/* Right-Side Meta & Controls */}
        <div className="past-speaker-actions flex items-center justify-between gap-3 sm:justify-end">
          {speaker.year && (
            <span className="rounded border border-zinc-200 bg-zinc-950/80 px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-zinc-600 transition-colors group-hover:border-zinc-700">
              {speaker.year}
            </span>
          )}
          <span className="past-speaker-category rounded border border-zinc-200 bg-zinc-100 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[#E62B1E]">
            {speaker.category}
          </span>

          {/* Social Links */}
          <div
            className="past-speaker-socials flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()} // Prevent row toggle when clicking socials
          >
            {speaker.socials?.linkedin && (
              <a
                href={speaker.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${speaker.name} on LinkedIn`}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 text-zinc-500 transition-all hover:border-zinc-600 hover:text-white"
              >
                <FaLinkedinIn className="h-3 w-3" />
              </a>
            )}
            {speaker.socials?.instagram && (
              <a
                href={speaker.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${speaker.name} on Instagram`}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 text-zinc-500 transition-all hover:border-zinc-600 hover:text-white"
              >
                <FaInstagram className="h-3 w-3" />
              </a>
            )}
          </div>

          {/* Expand Toggle Chevron */}
          <div className="hidden sm:flex items-center gap-1 font-mono text-xs text-zinc-500 transition-colors group-hover:text-zinc-300">
            <span>{isExpanded ? "Close" : "View"}</span>
            {isExpanded ? (
              <ChevronUp className="h-3.5 w-3.5 text-[#E62B1E]" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          EXPANDED CARD: SMALL PHOTO & LITTLE INFO ABOUT THEM
          ========================================================================= */}
      {isExpanded && (
        <div className="past-speaker-expanded-panel rounded-b-xl border border-t-0 border-zinc-800/80 bg-gradient-to-b from-zinc-900/70 to-zinc-950 p-4 sm:p-6 transition-all">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            {/* Small Photo Container */}
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-xl border border-zinc-700/80 bg-zinc-100 shadow-md">
              {hasValidPhoto ? (
                <Image
                  src={speaker.imageUrl}
                  alt={speaker.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-zinc-100 text-zinc-500">
                  <User className="h-7 w-7 text-zinc-600 mb-1" />
                  <span className="font-mono text-xs font-bold text-zinc-500">
                    {getInitials(speaker.name) || "TEDx"}
                  </span>
                </div>
              )}
            </div>

            {/* Little Info Details */}
            <div className="flex-1 space-y-2.5">
              {/* Talk Title */}
              {speaker.talkTitle && (
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#E62B1E]">
                    TEDx Talk Delivered
                  </span>
                  <h4 className="text-base font-bold text-neutral-900 sm:text-lg">
                    &ldquo;{speaker.talkTitle}&rdquo;
                  </h4>
                </div>
              )}

              {/* Bio / Talk Description */}
              <p className="text-xs leading-relaxed text-zinc-600 sm:text-sm">
                {speaker.talkDescription ||
                  speaker.bio ||
                  "Alumni speaker from past editions of TEDx BPHC. Shared groundbreaking insights and ideas worth spreading on our university stage."}
              </p>

              {/* Topic Tags / Meta Row */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {speaker.year && (
                  <span className="rounded border border-zinc-300 bg-zinc-100 px-2 py-0.5 font-mono text-[10px] font-bold text-neutral-900">
                    Edition {speaker.year}
                  </span>
                )}
                {speaker.topicTags && speaker.topicTags.length > 0 ? (
                  speaker.topicTags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 font-mono text-[10px] text-zinc-500"
                    >
                      #{tag}
                    </span>
                  ))
                ) : (
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] text-zinc-500">
                    <Sparkles className="h-2.5 w-2.5 text-[#E62B1E]" />
                    <span>TEDx BPHC Alumni</span>
                  </span>
                )}

                {speaker.company && (
                  <span className="font-mono text-[11px] text-zinc-500">
                    Affiliation: <strong className="text-zinc-700">{speaker.company}</strong>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
