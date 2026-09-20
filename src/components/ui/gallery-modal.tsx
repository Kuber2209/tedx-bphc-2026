"use client";

import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Info,
  Download,
} from "lucide-react";

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
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    },
    [currentIndex, images.length, setCurrentIndex],
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurrentIndex((currentIndex + 1) % images.length);
    },
    [currentIndex, images.length, setCurrentIndex],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

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

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Open image in new tab at full resolution
    window.open(images[currentIndex].src, "_blank");
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = images[currentIndex].src;
    link.download = `tedx-bphc-${currentIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen || images.length === 0 || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[250] bg-black/95 select-none"
      onClick={onClose}
    >
      {/* ─── Left Utility Bar (fullscreen, info, download) ─── */}
      <div
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleFullscreen}
          className="gallery-modal-icon-btn"
          aria-label="Fullscreen"
          title="View full size"
        >
          <Maximize2 className="w-[18px] h-[18px]" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowInfo((prev) => !prev);
          }}
          className={`gallery-modal-icon-btn ${showInfo ? "!bg-white/25" : ""}`}
          aria-label="Image info"
          title="Image info"
        >
          <Info className="w-[18px] h-[18px]" />
        </button>
        <button
          onClick={handleDownload}
          className="gallery-modal-icon-btn"
          aria-label="Download"
          title="Download image"
        >
          <Download className="w-[18px] h-[18px]" />
        </button>
      </div>

      {/* ─── Close Button (top-right) ─── */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-5 sm:right-5 z-50 p-2.5 text-white/70 hover:text-white transition-colors cursor-pointer focus:outline-none"
        aria-label="Close"
      >
        <X className="w-7 h-7" strokeWidth={1.5} />
      </button>

      {/* ─── Previous Arrow (left side, vertically centered) ─── */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-12 sm:left-16 top-1/2 -translate-y-1/2 z-50 gallery-modal-nav-btn"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-8 h-8" strokeWidth={1.5} />
      </button>

      {/* ─── Next Arrow (right side, vertically centered) ─── */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 gallery-modal-nav-btn"
        aria-label="Next image"
      >
        <ChevronRight className="w-8 h-8" strokeWidth={1.5} />
      </button>

      {/* ─── Centered Image ─── */}
      <div
        className="absolute inset-0 flex items-center justify-center px-20 sm:px-28 py-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative max-w-full max-h-full flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].title}
            className="max-w-full max-h-[85vh] object-contain shadow-[0_8px_60px_rgba(0,0,0,0.6)]"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Info overlay - slides in from bottom of image */}
          {showInfo && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 pt-16">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EB0028]" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#EB0028] font-mono font-medium">
                  {currentIndex + 1} / {images.length}
                </span>
              </div>
              <h3 className="text-lg font-medium text-white tracking-wide">
                {images[currentIndex].title}
              </h3>
              <p className="text-sm text-zinc-400 font-light mt-1">
                {images[currentIndex].subtitle}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};
