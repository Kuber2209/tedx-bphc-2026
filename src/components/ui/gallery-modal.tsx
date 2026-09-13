"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: { src: string; title: string; subtitle: string }[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  setCurrentIndex,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
      }
      if (e.key === "ArrowRight") {
        setCurrentIndex((currentIndex + 1) % images.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, setCurrentIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || images.length === 0 || !mounted) return null;

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[250] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-300 select-none"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#EB0028]"
        aria-label="Close modal"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev Button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 sm:left-8 z-50 p-3 rounded-full bg-white/10 hover:bg-[#EB0028]/80 border border-white/20 text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#EB0028]"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Main Container */}
      <div
        className="relative max-w-5xl w-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-black/40 max-h-[75vh]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].title}
            className="w-full h-auto max-h-[75vh] object-contain transition-all duration-300"
          />
        </div>

        {/* Caption */}
        <div className="mt-5 text-center px-4 max-w-xl">
          <div className="inline-flex items-center justify-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EB0028]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#EB0028] font-mono font-medium">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-medium text-white tracking-wide">
            {images[currentIndex].title}
          </h3>
          <p className="text-sm text-zinc-300 font-light mt-1 leading-relaxed">
            {images[currentIndex].subtitle}
          </p>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-4 sm:right-8 z-50 p-3 rounded-full bg-white/10 hover:bg-[#EB0028]/80 border border-white/20 text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#EB0028]"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>,
    document.body
  );
};
