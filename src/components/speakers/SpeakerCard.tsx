"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Speaker } from "@/data/speakers";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { X, Sparkles } from "lucide-react";
import "./speaker-card.css";

interface SpeakerCardProps {
  speaker: Speaker;
  className?: string;
}

export default function SpeakerCard({ speaker, className = "" }: SpeakerCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Unique motion layout IDs for shared spring transitions
  const layoutId = `speaker-card-${speaker.id}`;
  const imageLayoutId = `speaker-image-${speaker.id}`;
  const titleLayoutId = `speaker-title-${speaker.id}`;
  const categoryLayoutId = `speaker-category-${speaker.id}`;

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Close on Escape key press & prevent background scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  // Topic tags fallback if not explicitly provided
  const topicTags = speaker.topicTags && speaker.topicTags.length > 0
    ? speaker.topicTags
    : [speaker.category, "TEDxBPHC2026", "Keynote"];

  // Default bio fallback
  const bioText = speaker.bio ||
    `A distinguished innovator and thought leader in ${speaker.category}. Through actionable insights and pioneering experience, ${speaker.name} explores what it means to challenge convention and spark enduring impact on the global stage.`;

  // Default talk description fallback
  const talkDescription = speaker.talkDescription ||
    `An illuminating talk exploring the intersection of ideas, strategy, and execution, tailored for delegates and change-makers at TEDx BPHC 2026.`;

  // Fast, responsive spring config that settles in ~250ms with zero delay or freeze
  const springConfig = {
    type: "spring",
    stiffness: 420,
    damping: 32,
    mass: 0.8,
  } as const;

  return (
    <>
      {/* ================================================================== */}
      {/* 1. COLLAPSED VERTICAL CARD (Matches existing 4:5 vertical ratio)     */}
      {/* ================================================================== */}
      <motion.article
        layoutId={layoutId}
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
        tabIndex={0}
        role="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={`View profile for ${speaker.name}`}
        className={`speaker-card group ${className}`}
        whileHover={{ y: -4 }}
        transition={springConfig}
      >
        {/* Background Image / Stylized Placeholder */}
        <motion.div layoutId={imageLayoutId} className="speaker-media-container">
          {speaker.imageUrl && !imageError ? (
            <Image
              src={speaker.imageUrl}
              alt={speaker.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

          {/* Readability Vignette Gradient */}
          <div className="speaker-overlay" />
        </motion.div>

        {/* Top Header: Category Badge */}
        <div className="speaker-card-header">
          <motion.span
            layoutId={categoryLayoutId}
            className="speaker-category-badge"
          >
            {speaker.category}
          </motion.span>
        </div>

        {/* Bottom Content Area */}
        <div className="speaker-card-body">
          {speaker.talkTitle && (
            <span className="speaker-talk-badge">
              {speaker.talkTitle}
            </span>
          )}

          <motion.h3
            layoutId={titleLayoutId}
            className="speaker-name"
          >
            {speaker.name}
          </motion.h3>

          <p className="speaker-role">
            <span>{speaker.role}</span>
            {speaker.company && (
              <span className="speaker-company">
                {" "}• {speaker.company}
              </span>
            )}
          </p>
        </div>
      </motion.article>

      {/* ================================================================== */}
      {/* 2. EXPANDED MODAL VIEW (Shared Layout Transition, Fast & Fluid)     */}
      {/* ================================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="speaker-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={handleClose}
            className="speaker-modal-backdrop"
          >
            {/* Modal Dialog Card Container with Shared Layout Transition */}
            <motion.div
              layoutId={layoutId}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`modal-title-${speaker.id}`}
              className="speaker-modal-container"
              onClick={(e) => e.stopPropagation()}
              transition={springConfig}
            >
              {/* Accessible Close Button */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close speaker details"
                className="speaker-modal-close-btn"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="speaker-modal-layout">
                {/* Modal Media Side (Desktop Left 42% / Mobile Top Banner) */}
                <motion.div
                  layoutId={imageLayoutId}
                  className="speaker-modal-media-wrap"
                >
                  {speaker.imageUrl && !imageError ? (
                    <Image
                      src={speaker.imageUrl}
                      alt={speaker.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="speaker-modal-image"
                      onError={() => setImageError(true)}
                      priority
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

                  {/* Gradient Fade Overlay */}
                  <div className="speaker-modal-media-overlay" />
                </motion.div>

                {/* Modal Content Side */}
                <div className="speaker-modal-content">
                  {/* Category & Edition Row */}
                  <div className="speaker-modal-meta-row">
                    <motion.span
                      layoutId={categoryLayoutId}
                      className="speaker-modal-category"
                    >
                      {speaker.category}
                    </motion.span>
                    <span className="speaker-modal-edition">
                      TEDx BPHC 2026
                    </span>
                  </div>

                  {/* Speaker Name */}
                  <motion.h2
                    id={`modal-title-${speaker.id}`}
                    layoutId={titleLayoutId}
                    className="speaker-modal-name"
                  >
                    {speaker.name}
                  </motion.h2>

                  {/* Role & Company */}
                  <p className="speaker-modal-role">
                    <span>{speaker.role}</span>
                    {speaker.company && (
                      <span className="speaker-modal-company">
                        {" "}• {speaker.company}
                      </span>
                    )}
                  </p>

                  {/* Talk Section (if talk title is available) */}
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

                  {/* Speaker Bio */}
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

                  {/* Action Buttons (Social Links) */}
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
