"use client";

import React from "react";

const loopItems = [
  "TEDx BITS Hyderabad",
  "Ideas worth spreading",
  "One stage · many perspectives",
  "Independently organized TED event",
];

// Duplicate items enough times so each track segment exceeds ultra-wide screen widths
const repeatedItems = [...loopItems, ...loopItems, ...loopItems, ...loopItems];

export default function LogoLoop() {
  return (
    <div
      className="logo-loop-container relative w-full overflow-hidden select-none py-2"
      aria-label="TEDx BITS Hyderabad highlights"
    >
      {/* Subtle edge fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-r from-zinc-50 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-l from-zinc-50 to-transparent" />

      {/* Dual track for seamless, infinite looping animation */}
      <div className="flex w-max">
        <div className="flex shrink-0 items-center animate-marquee">
          {repeatedItems.map((item, index) => (
            <span
              key={`track-1-${item}-${index}`}
              className="inline-flex items-center whitespace-nowrap"
            >
              <span className="font-sans font-black tracking-tight text-zinc-950 text-sm md:text-base">
                TED
              </span>
              <span className="font-sans font-bold text-[#eb0028] text-sm md:text-base -ml-px">
                x
              </span>
              <span className="ml-2.5 font-mono text-[11px] md:text-xs tracking-[0.2em] uppercase text-zinc-700 font-medium">
                {item.replace("TEDx ", "")}
              </span>
              <span
                className="text-[#eb0028] text-xs opacity-70 mx-8 md:mx-12 select-none"
                aria-hidden="true"
              >
                ✦
              </span>
            </span>
          ))}
        </div>

        <div
          className="flex shrink-0 items-center animate-marquee"
          aria-hidden="true"
        >
          {repeatedItems.map((item, index) => (
            <span
              key={`track-2-${item}-${index}`}
              className="inline-flex items-center whitespace-nowrap"
            >
              <span className="font-sans font-black tracking-tight text-zinc-950 text-sm md:text-base">
                TED
              </span>
              <span className="font-sans font-bold text-[#eb0028] text-sm md:text-base -ml-px">
                x
              </span>
              <span className="ml-2.5 font-mono text-[11px] md:text-xs tracking-[0.2em] uppercase text-zinc-700 font-medium">
                {item.replace("TEDx ", "")}
              </span>
              <span
                className="text-[#eb0028] text-xs opacity-70 mx-8 md:mx-12 select-none"
                aria-hidden="true"
              >
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

