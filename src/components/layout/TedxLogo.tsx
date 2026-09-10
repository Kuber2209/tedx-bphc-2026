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
  className = "h-7 w-auto",
  href,
  width = 220,
  height = 28,
  priority = false,
  light = false,
}: TedxLogoProps) {
  void width;
  void height;
  void priority;
  
  const textColorClass = light ? "text-white" : "text-black";
  
  const logoImage = (
    <span className={`tedx-wordmark ${className} ${textColorClass}`} aria-label="TEDx BITS Hyderabad" style={{ color: light ? 'white' : 'inherit' }}>
      <strong>TEDx</strong><span>BITS Hyderabad</span>
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
