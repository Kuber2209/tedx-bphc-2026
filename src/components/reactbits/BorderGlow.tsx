"use client";

import React, { useRef, useState, useCallback } from "react";

export interface BorderGlowProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: number;
  borderWidth?: number;
  borderRadius?: number | string;
  showOuterGlow?: boolean;
  intensity?: number;
  highlight?: boolean;
}

export default function BorderGlow({
  children,
  className = "",
  glowColor = "#eb0028",
  glowSize = 360,
  borderWidth = 1.5,
  borderRadius = "1rem",
  showOuterGlow = true,
  intensity = 0.5,
  highlight = false,
}: BorderGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const zoom =
      parseFloat(getComputedStyle(document.documentElement).zoom) ||
      parseFloat(getComputedStyle(document.body).zoom) ||
      1;
    setPosition({
      x: (e.clientX - rect.left) / zoom,
      y: (e.clientY - rect.top) / zoom,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const parsedRadius =
    typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative group ${className}`.trim()}
      style={{
        borderRadius: parsedRadius,
      }}
    >
      {/* Outer Atmospheric Glow Layer */}
      {showOuterGlow && (
        <div
          className="pointer-events-none absolute -inset-[2px] transition-opacity duration-500 ease-out"
          style={{
            borderRadius: parsedRadius,
            opacity: isHovered ? intensity : highlight ? 0.22 : 0,
            background: `radial-gradient(${glowSize}px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 70%)`,
            filter: "blur(14px)",
            zIndex: 0,
          }}
          aria-hidden="true"
        />
      )}

      {/* Crisp Masked Border Glow Ring */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
        style={{
          borderRadius: parsedRadius,
          padding: `${borderWidth}px`,
          opacity: isHovered ? 1 : highlight ? 0.45 : 0.12,
          background: `radial-gradient(${glowSize}px circle at ${position.x}px ${position.y}px, ${glowColor} 0%, transparent 70%)`,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Card Content Layer */}
      <div
        className="relative h-full w-full"
        style={{
          borderRadius: parsedRadius,
          zIndex: 2,
        }}
      >
        {children}
      </div>
    </div>
  );
}
