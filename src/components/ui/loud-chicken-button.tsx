"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LoudChickenButtonProps {
  href?: string;
  onClick?: () => void;
  text?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export function LoudChickenButton({
  href,
  onClick,
  text = "Contact Delegation Desk",
  children,
  icon,
  className = "",
  target,
  rel,
}: LoudChickenButtonProps) {
  const content = (
    <>
      {/* Left Arrow (arr-2) - enters from left on hover */}
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute z-[9] w-3.5 h-3.5 fill-white left-[-25%] group-hover:left-5 transition-all duration-[650ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </svg>

      {/* Button Text & Icon */}
      <span className="relative z-[1] inline-flex items-center gap-2.5 -translate-x-2.5 group-hover:translate-x-2.5 text-white transition-all duration-[650ms] ease-[cubic-bezier(0.23,1,0.32,1)] select-none">
        {icon && <span className="inline-flex shrink-0">{icon}</span>}
        <span className="font-semibold text-xs uppercase tracking-[0.18em]">
          {children || text}
        </span>
      </span>

      {/* Expanding Ripple Circle (Signature TEDx Red) */}
      <span
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#eb0028] opacity-0 group-hover:w-[450px] group-hover:h-[450px] group-hover:opacity-100 transition-all duration-[700ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
        aria-hidden="true"
      />

      {/* Right Arrow (arr-1) - exits to right on hover */}
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute z-[9] w-3.5 h-3.5 fill-neutral-400 right-5 group-hover:right-[-25%] group-hover:fill-white transition-all duration-[650ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </svg>
    </>
  );

  const baseClasses = cn(
    "group relative inline-flex items-center justify-center overflow-hidden cursor-pointer select-none",
    "px-8 py-4 bg-neutral-900 text-white rounded-[4px]",
    "border border-neutral-900 hover:border-[#eb0028]",
    "shadow-xs hover:shadow-md hover:shadow-[#eb0028]/20",
    "active:scale-[0.98]",
    "transition-all duration-300 ease-out",
    className
  );

  if (href) {
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          className={baseClasses}
          onClick={onClick}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={baseClasses} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
}

export default LoudChickenButton;
