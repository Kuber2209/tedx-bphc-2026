"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { easeOut, motion, AnimatePresence } from "motion/react";
import { Speaker } from "@/data/speakers";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { X, Sparkles, ArrowRight, RotateCcw, ExternalLink } from "lucide-react";
import "./speaker-card.css";

interface SpeakerCardProps {
  speaker: Speaker;
  className?: string;
}

const cardVariants = {
  front: { rotateY: 0, transition: { duration: 0.5, ease: easeOut } },
  back: { rotateY: 180, transition: { duration: 0.5, ease: easeOut } },
};

export default function SpeakerCard({ speaker, className = "" }: SpeakerCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = () => setIsOpen(true);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleCloseModal]);

  // Topic tags fallback if not explicitly provided
  const topicTags =
    speaker.topicTags && speaker.topicTags.length > 0
      ? speaker.topicTags
      : [speaker.category, "TEDxBPHC2026", "Keynote"];

  // Bio fallback
  const bioText =
    speaker.bio ||
    `Pioneering innovator and distinguished voice in ${speaker.category}. Exploring groundbreaking perspectives and enduring ideas on the global stage.`;

  // Talk description fallback
  const talkDescription =
    speaker.talkDescription ||
    `A keynote presentation uncovering visionary ideas, strategic frameworks, and future-defining discoveries at TEDx BPHC 2026.`;

  return (
    <>
      {/* ================================================================== */}
      {/* ANIMATE-UI 3D FLIP CARD CONTAINER                                  */}
      {/* ================================================================== */}
      <div
        className={`speaker-card-flipper-perspective ${className}`}
        onClick={handleClick}
      >
        <div className="speaker-card-flipper">
          {/* -------------------------------------------------------------- */}
          {/* FRONT FACE: Photo, Identity & Clean Details                    */}
          {/* -------------------------------------------------------------- */}
          <motion.div
            className="speaker-card-face speaker-card-front"
            animate={isFlipped ? "back" : "front"}
            variants={cardVariants}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Background Image / Monogram Placeholder */}
            <div className="speaker-media-container">
              {speaker.imageUrl && !imageError ? (
                <Image
                  src={speaker.imageUrl}
                  alt={speaker.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
                  className="speaker-image"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="speaker-placeholder">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 shadow-inner transition-transform duration-300 group-hover:scale-105 group-hover:border-zinc-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-zinc-500 transition-colors duration-300 group-hover:text-zinc-300"
                      aria-hidden="true"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <span className="mt-3 font-mono text-[10px] uppercase tracking-widest text-zinc-600 transition-colors duration-300 group-hover:text-zinc-400">
                    Speaker Photo
                  </span>
                </div>
              )}

              {/* Gradient Vignette for Text Contrast */}
              <div className="speaker-overlay" />
            </div>

            {/* Top Row: Category Badge & Flip Hint */}
            <div className="speaker-card-header">
              <span className="speaker-category-badge">
                {speaker.category}
              </span>

              <span className="speaker-flip-hint">
                <RotateCcw className="h-2.5 w-2.5 text-[#E62B1E]" />
                <span>Open Profile</span>
              </span>
            </div>

            {/* Bottom Content Area */}
            <div className="speaker-card-body">
              <h3 className="speaker-name">
                {speaker.name}
              </h3>

              <p className="speaker-role">
                <span>{speaker.role}</span>
                {speaker.company && (
                  <span className="speaker-company">
                    {" "}• {speaker.company}
                  </span>
                )}
              </p>

              {/* Bottom Interactive Bar */}
              <div className="speaker-bottom-action-bar">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400">
                  <span>View profile</span>
                  <ArrowRight className="h-3 w-3 text-[#E62B1E]" />
                </div>

                <div className="speaker-socials">
                  {speaker.socials?.linkedin && (
                    <a
                      href={speaker.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${speaker.name} on LinkedIn`}
                      onClick={(e) => e.stopPropagation()}
                      className="speaker-social-btn"
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
                      onClick={(e) => e.stopPropagation()}
                      className="speaker-social-btn"
                    >
                      <FaInstagram className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* -------------------------------------------------------------- */}
          {/* BACK FACE: Dedicated Keynote Talk Topic, Bio & Socials         */}
          {/* -------------------------------------------------------------- */}
          <motion.div
            className="speaker-card-face speaker-card-back"
            initial={{ rotateY: 180 }}
            animate={isFlipped ? "front" : "back"}
            variants={cardVariants}
            style={{ transformStyle: "preserve-3d", rotateY: 180 }}
          >
            {/* Top Back Header */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#E62B1E] animate-pulse" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#E62B1E]">
                  TEDx 2026 Keynote
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                aria-label="Flip back to photo"
                className="flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800/90 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-zinc-300 transition-colors hover:border-[#E62B1E] hover:text-white cursor-pointer"
              >
                <RotateCcw className="h-3 w-3 text-[#E62B1E]" />
                <span>Photo</span>
              </button>
            </div>

            {/* Scrollable Content for Speaker Details */}
            <div className="custom-scrollbar flex-1 overflow-y-auto py-3 space-y-3.5 pr-1">
              <div>
                <h3 className="font-sans text-lg font-black uppercase tracking-tight text-white leading-tight">
                  {speaker.name}
                </h3>
                <p className="font-mono text-xs text-zinc-400 mt-0.5">
                  {speaker.role} {speaker.company ? `• ${speaker.company}` : ""}
                </p>
              </div>

              {/* Unique Keynote Talk Synopsis Card */}
              {speaker.talkTitle && (
                <div className="rounded-xl border border-[#E62B1E]/30 bg-gradient-to-br from-[#E62B1E]/10 to-zinc-900/60 p-3">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#E62B1E] mb-1">
                    <Sparkles className="h-2.5 w-2.5" />
                    <span>Talk Topic</span>
                  </div>
                  <h4 className="font-sans text-xs font-bold text-white leading-snug">
                    &ldquo;{speaker.talkTitle}&rdquo;
                  </h4>
                  <p className="mt-1.5 font-sans text-xs leading-relaxed text-zinc-300">
                    {talkDescription}
                  </p>
                </div>
              )}

              {/* Unique Speaker Bio */}
              <div>
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Speaker Background
                </span>
                <p className="font-sans text-xs leading-relaxed text-zinc-400">
                  {bioText}
                </p>
              </div>

              {/* Topic Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {topicTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded border border-zinc-800 bg-zinc-900/90 px-2 py-0.5 font-mono text-[9px] text-zinc-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Back Footer Bar */}
            <div className="flex items-center justify-between border-t border-zinc-800/80 pt-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
                className="font-mono text-[10px] text-zinc-400 hover:text-[#E62B1E] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Expand Fullscreen</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </button>

              <div className="speaker-socials">
                {speaker.socials?.linkedin && (
                  <a
                    href={speaker.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${speaker.name} on LinkedIn`}
                    onClick={(e) => e.stopPropagation()}
                    className="speaker-social-btn"
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
                    onClick={(e) => e.stopPropagation()}
                    className="speaker-social-btn"
                  >
                    <FaInstagram className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* OPTIONAL EXPANDED FULL PROFILE MODAL (When Requested)              */}
      {/* ================================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="speaker-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={handleCloseModal}
            className="speaker-modal-backdrop"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`modal-title-${speaker.id}`}
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="speaker-modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Accessible Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close speaker details"
                className="speaker-modal-close-btn"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="speaker-modal-layout">
                {/* Modal Media Side */}
                <div className="speaker-modal-media-wrap">
                  {speaker.imageUrl && !imageError ? (
                    <Image
                      src={speaker.imageUrl}
                      alt={speaker.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 450px"
                      className="speaker-modal-image"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="speaker-placeholder h-full w-full">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 shadow-inner">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-10 w-10 text-zinc-500"
                          aria-hidden="true"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <span className="mt-3 font-mono text-xs uppercase tracking-widest text-zinc-500">
                        {speaker.name}
                      </span>
                    </div>
                  )}

                  <div className="speaker-modal-media-overlay" />
                </div>

                {/* Modal Content Side */}
                <div className="speaker-modal-content">
                  <div className="speaker-modal-meta-row">
                    <span className="speaker-modal-category">
                      {speaker.category}
                    </span>
                    <span className="speaker-modal-edition">
                      TEDx BPHC 2026
                    </span>
                  </div>

                  <h2 id={`modal-title-${speaker.id}`} className="speaker-modal-name">
                    {speaker.name}
                  </h2>

                  <p className="speaker-modal-role">
                    <span>{speaker.role}</span>
                    {speaker.company && (
                      <span className="speaker-modal-company">
                        {" "}• {speaker.company}
                      </span>
                    )}
                  </p>

                  {/* Talk Synopsis */}
                  {speaker.talkTitle && (
                    <div className="speaker-modal-talk-card">
                      <span className="speaker-modal-talk-label flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3" />
                        Keynote Session
                      </span>
                      <h4 className="speaker-modal-talk-title">
                        {speaker.talkTitle}
                      </h4>
                      <p className="speaker-modal-talk-desc">
                        {talkDescription}
                      </p>
                    </div>
                  )}

                  {/* Bio */}
                  <div className="speaker-modal-bio-section">
                    <h4 className="speaker-modal-bio-heading">
                      Speaker Overview
                    </h4>
                    <p className="speaker-modal-bio-text">
                      {bioText}
                    </p>
                  </div>

                  {/* Topic Tags */}
                  <div className="speaker-modal-tags">
                    {topicTags.map((tag, idx) => (
                      <span key={idx} className="speaker-modal-tag">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  {(speaker.socials?.linkedin || speaker.socials?.instagram) && (
                    <div className="speaker-modal-actions">
                      {speaker.socials?.linkedin && (
                        <a
                          href={speaker.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="speaker-modal-action-btn speaker-modal-action-btn--primary"
                        >
                          <FaLinkedinIn className="h-3.5 w-3.5" />
                          <span>Connect on LinkedIn</span>
                        </a>
                      )}

                      {speaker.socials?.instagram && (
                        <a
                          href={speaker.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="speaker-modal-action-btn speaker-modal-action-btn--secondary"
                        >
                          <FaInstagram className="h-3.5 w-3.5" />
                          <span>Follow on Instagram</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
