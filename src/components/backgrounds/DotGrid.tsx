"use client";

interface DotGridProps {
  color?: string;
  size?: number;
  spacing?: number;
}

export default function DotGrid({ color = "#eb0028", size = 2, spacing = 30 }: DotGridProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `radial-gradient(${color} ${size}px, transparent ${size}px)`,
          backgroundSize: `${spacing}px ${spacing}px`,
          backgroundPosition: "0 0"
        }}
      />
      {/* Mask to fade edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#000000_80%)]" />
    </div>
  );
}
