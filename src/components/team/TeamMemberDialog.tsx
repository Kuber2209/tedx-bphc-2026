"use client";

import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { TeamMember } from "@/data/types";
import TeamMemberSmallCard from "./TeamMemberSmallCard";

interface TeamMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  teamTitle?: string;
  members: TeamMember[];
  currentMemberName?: string;
}

export default function TeamMemberDialog({
  isOpen,
  onClose,
  teamTitle = "TEDX EXECUTIVE",
  members,
  currentMemberName,
}: TeamMemberDialogProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ESC key listener & body scroll lock
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="team-member-dialog-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={onClose}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="team-dialog-title"
        >
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 30,
              mass: 0.8,
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col max-h-[86vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-zinc-800 bg-[#0d0d10] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(230,43,30,0.2)] my-auto"
          >
            {/* Header Ambient Glow */}
            <div
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-[#e62b1e]/20 blur-3xl"
              aria-hidden="true"
            />

            {/* Modal Header */}
            <div className="relative z-10 flex items-start justify-between border-b border-zinc-800/80 px-6 py-4 sm:px-8 sm:py-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#e62b1e] animate-pulse" />
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e62b1e]">
                    TEDx BPHC 2026 · Team Directory
                  </span>
                </div>
                <h2
                  id="team-dialog-title"
                  className="mt-1 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl"
                >
                  {teamTitle} Members
                </h2>
                <p className="mt-0.5 text-xs sm:text-sm text-zinc-400">
                  {currentMemberName
                    ? `Other team members working alongside ${currentMemberName}`
                    : "Executive team members spearheading curation, logistics, and strategy"}
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="group -mr-2 -mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Body / Member Cards Grid with Custom Sleek Scrollbar */}
            <div className="custom-scrollbar relative z-10 overflow-y-auto px-4 py-5 sm:px-8 sm:py-6">
              {members.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 justify-items-center">
                  {members.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.04 * index,
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                    >
                      <TeamMemberSmallCard member={member} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                    No other team members found.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer Bar */}
            <div className="relative z-10 flex flex-wrap items-center justify-between border-t border-zinc-800/80 px-6 py-3.5 sm:px-8 bg-zinc-950/60">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                Displaying {members.length} team {members.length === 1 ? "member" : "members"}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1 text-xs font-mono uppercase tracking-wider text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

