import React from "react";
import Link from "next/link";

interface TedxLogoProps {
  className?: string;
  href?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  light?: boolean;
}

export default function TedxLogo({
  className = "",
  href,
  width = 220,
  height = 28,
  priority = false,
  light = false,
}: TedxLogoProps) {
  void width;
  void height;
  void priority;

  const campusColorClass = light ? "text-white" : "text-black";

  const logoImage = (
    <span
      className={`inline-flex items-center select-none font-sans font-black tracking-tight leading-none ${className}`}
      aria-label="TEDx BITS Hyderabad"
    >
      <span className="text-[#eb0028] tracking-[-0.04em]">TED</span>
      <span className="text-[#eb0028] font-bold text-[0.72em] leading-none -translate-y-[0.24em] ml-[0.5px] mr-1.5">
        x
      </span>
      <span className={`font-semibold tracking-normal ${campusColorClass}`}>
        BITS Hyderabad
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center transition-opacity hover:opacity-90">
        {logoImage}
      </Link>
    );
  }

  return logoImage;
}
