import React from "react";

export default function TEDxWatermark() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden select-none"
      aria-hidden="true"
    >
      <span className="font-sans font-black text-[32vw] md:text-[26vw] tracking-tighter text-black/[0.038] select-none leading-none">
        TED<span className="text-[#eb0028]/[0.048]">x</span>
      </span>
    </div>
  );
}
