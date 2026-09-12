"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Speaker } from "@/data/speakers";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa6";

interface SpeakerCardProps {
  speaker: Speaker;
  index?: number;
}

export default function SpeakerCard({ speaker, index = 0 }: SpeakerCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleOpen = () => setIsOpen(true);
  
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Close on Escape key press
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

  // Fallbacks
  const topicTags = speaker.topicTags && speaker.topicTags.length > 0
    ? speaker.topicTags
    : [speaker.category || "Keynote"];
    
  const bioText = speaker.bio || "Speaker details will be updated soon.";

  return (
    <>
      {/* CARD (Matching TEDx MIT rl_team8_item) */}
      <motion.div 
        className="group relative flex flex-col cursor-pointer text-left"
        onClick={handleOpen}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10px" }}
        transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
      >
        {/* Image wrapper: Enlarged portrait aspect-ratio */}
        <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] min-h-[360px] sm:min-h-[440px] md:min-h-[500px] overflow-hidden bg-zinc-100 rounded-lg shadow-xs">
          {speaker.imageUrl && !imageError ? (
            <Image
              src={speaker.imageUrl}
              alt={speaker.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200/80 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-20 h-20 text-zinc-300 group-hover:text-zinc-400 transition-colors">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          )}
        </div>

        {/* Spacing block */}
        <div className="h-6 sm:h-8 w-full" aria-hidden="true" />

        {/* Category Pill */}
        <span className="inline-block text-xs uppercase tracking-[0.25em] font-bold text-[#eb0028] mb-1">
          {speaker.category || "Speaker"}
        </span>

        {/* Name: Enlarged font-bold 3xl-4xl #181830 */}
        <h3 className="text-3xl sm:text-4xl md:text-[2.5rem] font-bold text-[#181830] tracking-tight leading-[1.15] group-hover:text-[#eb0028] transition-colors duration-200">
          {speaker.name}
        </h3>

        {/* Role & Company: Enlarged font-normal lg-xl #494949 */}
        <div className="text-lg sm:text-xl font-normal text-[#494949] leading-normal mt-2">
          {speaker.role} {speaker.company ? `· ${speaker.company}` : ""}
        </div>

        {/* Talk title: Enlarged text */}
        {speaker.talkTitle && (
          <div className="text-base sm:text-lg text-zinc-600 font-normal mt-2.5 leading-relaxed">
            &ldquo;{speaker.talkTitle}&rdquo;
          </div>
        )}
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-white/95 backdrop-blur-sm overflow-y-auto"
            onClick={handleClose}
          >
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl bg-white shadow-2xl flex flex-col md:flex-row border border-zinc-200 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 text-zinc-500 hover:text-[#DD183B] transition-colors bg-white/60 backdrop-blur-md rounded-full"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-1/2 aspect-[4/5] md:aspect-auto relative bg-zinc-100 overflow-hidden">
                <motion.div
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full h-full relative"
                >
                  {speaker.imageUrl && !imageError ? (
                    <Image
                      src={speaker.imageUrl}
                      alt={speaker.name}
                      fill
                      className="object-cover transition-all duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-600 bg-zinc-100">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-16 h-16"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col max-h-[80vh] md:max-h-none overflow-y-auto custom-scrollbar">
                <div className="mb-8">
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="text-[#DD183B] font-sans text-[10px] uppercase tracking-[0.2em] font-bold block mb-4"
                  >
                    {speaker.category || "Speaker"}
                  </motion.span>
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="text-4xl md:text-5xl font-bold tracking-tighter text-black mb-2 leading-none"
                  >
                    {speaker.name}
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="text-sm md:text-base font-medium text-zinc-500 uppercase tracking-widest"
                  >
                    {speaker.role} {speaker.company ? `· ${speaker.company}` : ""}
                  </motion.p>
                </div>

                {speaker.talkTitle && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="mb-8 pb-8 border-b border-zinc-100"
                  >
                    <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-3">The Talk</h3>
                    <h4 className="text-xl md:text-2xl font-medium text-black leading-tight mb-3">
                      &ldquo;{speaker.talkTitle}&rdquo;
                    </h4>
                    {speaker.talkDescription && (
                      <p className="text-zinc-600 leading-relaxed font-light">
                        {speaker.talkDescription}
                      </p>
                    )}
                  </motion.div>
                )}

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="mb-8 flex-grow"
                >
                  <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-3">About</h3>
                  <p className="text-zinc-600 leading-relaxed font-light whitespace-pre-wrap">
                    {bioText}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="mt-auto pt-8 border-t border-zinc-100 flex items-center justify-between"
                >
                  <div className="flex flex-wrap gap-2">
                    {topicTags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] uppercase tracking-wider text-zinc-500 bg-zinc-50 px-2 py-1 rounded-sm border border-zinc-100">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {(speaker.socials?.linkedin || speaker.socials?.instagram) && (
                    <div className="flex gap-4">
                      {speaker.socials?.linkedin && (
                        <a href={speaker.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#DD183B] transition-colors p-2 bg-zinc-50 rounded-full hover:bg-red-50">
                          <FaLinkedinIn className="w-5 h-5" />
                        </a>
                      )}
                      {speaker.socials?.instagram && (
                        <a href={speaker.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#DD183B] transition-colors p-2 bg-zinc-50 rounded-full hover:bg-red-50">
                          <FaInstagram className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
