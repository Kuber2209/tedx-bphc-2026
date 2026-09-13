"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      {/* CARD */}
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
        {/* Image wrapper: Golden ratio portrait aspect-ratio */}
        <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-white rounded-xl shadow-xs group-hover:shadow-xl transition-all duration-300 border border-neutral-200/90 group-hover:border-neutral-300">
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          )}

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Floating interactive hover pill */}
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-[#494949] text-xs font-semibold shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <span>View Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#eb0028]" />
          </div>
        </div>

        {/* Spacing block */}
        <div className="h-4 sm:h-5 w-full" aria-hidden="true" />

        {/* Role Pill */}
        <span className="inline-block text-xs uppercase tracking-[0.25em] font-bold text-[#eb0028] mb-1">
          {member.role}
        </span>

        {/* Name */}
        <h3 className="text-xl sm:text-2xl font-bold text-[#494949] tracking-tight leading-snug group-hover:text-[#eb0028] transition-colors duration-200">
          {member.name}
        </h3>

        {/* Handle */}
        {member.handle && (
          <div className="text-sm font-medium text-[#494949] uppercase tracking-wider mt-1 opacity-70">
            {member.handle}
          </div>
        )}

        {/* Animated accent line */}
        <div className="h-[2px] w-0 bg-[#eb0028] group-hover:w-8 transition-all duration-300 mt-2.5" />
      </motion.div>

      {/* PORTALED MODAL */}
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[250] flex justify-center items-center overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8 bg-black/70 backdrop-blur-md"
              onClick={handleClose}
            >
              <motion.div
                initial={{ y: 24, opacity: 0, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 16, opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-4xl lg:max-w-5xl bg-white shadow-2xl flex flex-col md:flex-row border border-neutral-200/90 rounded-2xl overflow-hidden my-auto max-h-[90vh] md:max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-3.5 right-3.5 z-30 p-2 text-neutral-600 hover:text-[#eb0028] bg-white/90 hover:bg-white border border-neutral-200/90 shadow-sm rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#eb0028]"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Image Side */}
                <div className="w-full md:w-5/12 lg:w-1/2 relative bg-neutral-100 shrink-0 h-60 sm:h-72 md:h-auto min-h-[220px] md:min-h-full overflow-hidden flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full h-full relative"
                  >
                    {member.imageUrl && !imageError ? (
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center transition-all duration-500"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-neutral-100 via-neutral-200/60 to-neutral-100 text-neutral-400 p-6 select-none">
                        <div className="w-20 h-20 rounded-full bg-white/90 shadow-xs border border-neutral-200/80 flex items-center justify-center mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10 text-neutral-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        </div>
                        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold">
                          TEDx Team
                        </span>
                      </div>
                    )}
                    <div className="hidden md:block absolute inset-y-0 right-0 w-6 bg-gradient-to-r from-transparent to-black/5 pointer-events-none" />
                  </motion.div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-7/12 lg:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col overflow-y-auto max-h-[calc(90vh-15rem)] sm:max-h-[calc(90vh-18rem)] md:max-h-[85vh] custom-scrollbar">
                  <div className="mb-6 pr-10">
                    <motion.span 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08, duration: 0.35 }}
                      className="text-[#eb0028] font-sans text-[11px] uppercase tracking-[0.25em] font-bold block mb-2"
                    >
                      {member.role}
                    </motion.span>
                    <motion.h2 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.35 }}
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 mb-1.5 leading-tight"
                    >
                      {member.name}
                    </motion.h2>
                    {member.handle && (
                      <motion.p 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.22, duration: 0.35 }}
                        className="text-xs sm:text-sm font-medium text-neutral-500 uppercase tracking-wider mt-1"
                      >
                        {member.handle}
                      </motion.p>
                    )}
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.35 }}
                    className="mb-6 flex-grow"
                  >
                    <div className="h-[1px] w-12 bg-neutral-200 mb-5"></div>
                    <p className="text-sm text-neutral-600 leading-relaxed font-normal whitespace-pre-wrap">
                      {bioText}
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.38, duration: 0.35 }}
                    className="mt-auto pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3"
                  >
                    <div className="flex flex-col gap-1">
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="text-xs tracking-wider text-neutral-500 hover:text-black transition-colors font-medium">
                          {member.email}
                        </a>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-[#eb0028] transition-colors p-2 bg-neutral-50 hover:bg-red-50 rounded-full border border-neutral-200/60" aria-label={`${member.name} LinkedIn`}>
                          <FaLinkedinIn className="w-4 h-4" />
                        </a>
                      )}
                      {member.instagram && (
                        <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-[#eb0028] transition-colors p-2 bg-neutral-50 hover:bg-red-50 rounded-full border border-neutral-200/60" aria-label={`${member.name} Instagram`}>
                          <FaInstagram className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
