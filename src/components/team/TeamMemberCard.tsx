"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { TeamMember } from "@/data/types";
import { AnimatePresence, motion } from "motion/react";
import { X, ArrowUpRight } from "lucide-react";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa6";

interface TeamMemberCardProps {
  member: TeamMember;
  index?: number;
}

export default function TeamMemberCard({ member, index = 0 }: TeamMemberCardProps) {
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

  const bioText = member.bio || "Team member details will be updated soon.";

  return (
    <>
      {/* CARD (Matching TEDx MIT .rl_team8_item with animated flashcard effects) */}
      <motion.div 
        className="group relative flex flex-col cursor-pointer text-left"
        onClick={handleOpen}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{
          duration: 0.55,
          delay: (index % 3) * 0.1,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Image wrapper: Square aspect-ratio with rounded-xl and elevation */}
        <div className="relative w-full aspect-square overflow-hidden bg-white rounded-xl shadow-xs group-hover:shadow-xl transition-all duration-300 border border-neutral-200/90 group-hover:border-neutral-300">
          {member.imageUrl && !imageError ? (
            <Image
              src={member.imageUrl}
              alt={member.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200/80 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-zinc-300 group-hover:text-zinc-400 transition-colors">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          )}

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Floating interactive hover pill */}
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-[#494949] text-xs font-semibold shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <span>View Bio</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#eb0028]" />
          </div>
        </div>

        {/* Spacing block */}
        <div className="h-4 sm:h-5 w-full" aria-hidden="true" />

        {/* Name */}
        <h3 className="text-xl sm:text-[1.25rem] font-bold text-[#494949] tracking-tight leading-snug group-hover:text-[#eb0028] transition-colors duration-200">
          {member.name}
        </h3>

        {/* Role */}
        <div className="text-sm sm:text-base font-normal text-[#494949] leading-normal mt-1 opacity-90">
          {member.role}
        </div>

        {/* Animated accent line */}
        <div className="h-[2px] w-0 bg-[#eb0028] group-hover:w-8 transition-all duration-300 mt-2.5" />
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
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative bg-zinc-100 overflow-hidden">
                <motion.div
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full h-full relative"
                >
                  {member.imageUrl && !imageError ? (
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover transition-all duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-300 bg-zinc-100">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-24 h-24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
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
                    {member.role}
                  </motion.span>
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="text-4xl md:text-5xl font-bold tracking-tighter text-black mb-2 leading-none"
                  >
                    {member.name}
                  </motion.h2>
                  {member.handle && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="text-sm font-medium text-zinc-500 uppercase tracking-widest mt-1"
                    >
                      {member.handle}
                    </motion.p>
                  )}
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="mb-8 flex-grow"
                >
                  <div className="h-[1px] w-12 bg-black/10 mb-6"></div>
                  <p className="text-zinc-600 leading-relaxed font-light whitespace-pre-wrap text-lg">
                    {bioText}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="mt-auto pt-8 border-t border-zinc-100 flex items-center justify-between"
                >
                  <div className="flex flex-col gap-1">
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-xs uppercase tracking-wider text-zinc-500 hover:text-black transition-colors">
                        {member.email}
                      </a>
                    )}
                  </div>

                  <div className="flex gap-4">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#eb0028] transition-colors p-2 bg-zinc-50 rounded-full hover:bg-red-50">
                        <FaLinkedinIn className="w-5 h-5" />
                      </a>
                    )}
                    {member.instagram && (
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#eb0028] transition-colors p-2 bg-zinc-50 rounded-full hover:bg-red-50">
                        <FaInstagram className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
