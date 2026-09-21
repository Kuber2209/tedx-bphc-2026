"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AnimatedUnderlineLinkProps {
  href: string;
  text?: string;
  children?: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export function AnimatedUnderlineLink({
  href,
  text = "tedx@hyderabad.bits-pilani.ac.in",
  children,
  className = "",
  target,
  rel,
}: AnimatedUnderlineLinkProps) {
  const content = (
    <>
      {/* Animated Underline Text */}
      <span
        className={cn(
          "relative font-bold text-xs sm:text-sm uppercase tracking-[0.2em] text-[#eb0028] pb-1.5 pr-2.5",
          "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#eb0028]",
          "after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out",
          "group-hover:after:scale-x-100 group-hover:after:origin-bottom-left"
        )}
      >
        {children || text}
      </span>

      {/* Animated Horizontal Arrow SVG from empty-moose-12 */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 46 16"
        className="w-7 h-2.5 fill-[#eb0028] -translate-x-2 group-hover:translate-x-0 active:scale-90 transition-transform duration-300 ease-out shrink-0"
        aria-hidden="true"
      >
        <path
          d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
          transform="translate(30)"
        />
      </svg>
    </>
  );

  const baseClasses = cn(
    "group inline-flex items-center cursor-pointer select-none bg-transparent border-none p-0",
    className
  );

  if (href.startsWith("mailto:") || href.startsWith("http") || href.startsWith("tel:")) {
    return (
      <a href={href} className={baseClasses} target={target} rel={rel}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={baseClasses}>
      {content}
    </Link>
  );
}

export default AnimatedUnderlineLink;
