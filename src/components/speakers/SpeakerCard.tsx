"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Speaker } from "@/data/speakers";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import TiltedCard from "@/components/reactbits/TiltedCard";

interface SpeakerCardProps {
  speaker: Speaker;
}

export default function SpeakerCard({ speaker }: SpeakerCardProps) {
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
      {/* CARD */}
      <TiltedCard rotateAmplitude={8} scaleOnHover={1.03}>
        <div 
          className="group relative flex flex-col cursor-pointer h-full"
          onClick={handleOpen}
        >
          <div className="relative w-full aspect-[3/4] mb-6 overflow-hidden bg-zinc-100 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
          {speaker.imageUrl && !imageError ? (
            <Image
              src={speaker.imageUrl}
              alt={speaker.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-100 text-zinc-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-2">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-grow">
          <span className="text-[#eb0028] font-sans text-[9px] uppercase tracking-[0.2em] mb-3 group-hover:translate-x-1 transition-transform duration-300">
            {speaker.category || "Speaker"}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 mb-1 group-hover:text-zinc-600 transition-colors duration-300">
            {speaker.name}
          </h3>
          <p className="text-sm md:text-base font-serif italic text-zinc-500 mb-3">
            {speaker.role} {speaker.company ? `· ${speaker.company}` : ""}
          </p>
          {speaker.talkTitle && (
            <p className="text-sm text-zinc-800 font-medium leading-snug line-clamp-2 mt-auto">
              {speaker.talkTitle}
            </p>
          )}
        </div>
        
        {/* Subtle hover line */}
        <div className="w-0 group-hover:w-full h-[1px] bg-[#E62B1E] transition-all duration-500 mt-4 origin-left"></div>
        </div>
      </TiltedCard>

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
              className="relative w-full max-w-5xl bg-white shadow-2xl flex flex-col md:flex-row border border-zinc-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 text-zinc-500 hover:text-[#eb0028] transition-colors bg-white/50 backdrop-blur-md rounded-full"
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
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
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
                    className="text-[#eb0028] font-sans text-[10px] uppercase tracking-[0.2em] font-bold block mb-4"
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
                    className="text-lg md:text-xl font-serif italic text-zinc-500"
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
                        <a href={speaker.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#eb0028] transition-colors p-2 bg-zinc-50 rounded-full hover:bg-red-50">
                          <FaLinkedinIn className="w-5 h-5" />
                        </a>
                      )}
                      {speaker.socials?.instagram && (
                        <a href={speaker.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#eb0028] transition-colors p-2 bg-zinc-50 rounded-full hover:bg-red-50">
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
