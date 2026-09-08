import React from "react";
import Image from "next/image";
import Link from "next/link";

interface TedxLogoProps {
  className?: string;
  href?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function TedxLogo({
  className = "h-7 w-auto",
  href,
  width = 220,
  height = 28,
  priority = false,
}: TedxLogoProps) {
  const logoImage = (
    <Image
      src="/tedx-logo.png"
      alt="TEDx BITSHyderabad"
      width={width}
      height={height}
      priority={priority}
      className={`object-contain ${className}`}
    />
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
