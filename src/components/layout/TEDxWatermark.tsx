import React from "react";

interface TEDxWatermarkProps {
  className?: string;
  opacity?: string;
}

export default function TEDxWatermark({
  className = "",
  opacity = "text-[#eb0028]/[0.045]",
}: TEDxWatermarkProps) {
  return (
    <div
      className={`absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 w-full max-w-5xl pointer-events-none z-0 flex items-center justify-center overflow-hidden select-none px-6 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_82%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_82%)] ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="10.499 10.296 362.15 105.02"
        className={`w-[85vw] max-w-4xl h-auto ${opacity} transition-opacity duration-300`}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Official TED Vectors */}
        <g>
          {/* T */}
          <polygon points="40.153,115.316 40.153,36.621 10.499,36.621 10.499,10.5 101.378,10.5 101.378,36.621 71.734,36.621 71.734,115.316" />
          {/* E */}
          <polygon points="107.442,115.318 107.442,10.5 195.634,10.5 195.634,36.621 139.044,36.621 139.044,50.808 195.634,50.808 195.634,75.01 139.044,75.01 139.044,89.198 195.649,89.198 195.649,115.318" />
          {/* D */}
          <path d="M202.12,115.316L202.121,10.5h53c16.15,0,28.495,5.443,36.691,16.179 c8.709,11.406,10.537,25.913,10.537,36.074c0,33.896-19.034,52.563-53.596,52.563H202.12z M233.721,89.196h13.25 c20.689,0,23.778-16.852,23.778-26.896c0-23.827-20.017-25.679-26.152-25.679h-10.876V89.196z" />
        </g>
        {/* Official x Vector */}
        <polygon points="307.111,74.539 329.448,41.692 307.955,10.296 330.61,10.296 339.746,26.575 349.144,10.296 371.796,10.296 350.31,41.691 372.647,74.538 349.979,74.539 339.746,57.57 329.767,74.539" />
      </svg>
    </div>
  );
}
