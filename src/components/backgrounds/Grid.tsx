"use client";


interface GridProps {
  color?: string;
  size?: number;
}

export default function Grid({ color = "#eb0028", size = 40 }: GridProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden perspective-[1000px]">
      <div 
        className="absolute w-[200%] h-[200%] -left-[50%] -top-[50%] origin-center"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${color}33 1px, transparent 1px),
            linear-gradient(to bottom, ${color}33 1px, transparent 1px)
          `,
          backgroundSize: `${size}px ${size}px`,
          transform: "rotateX(60deg) translateY(-100px)",
          animation: "grid-scroll 10s linear infinite"
        }}
      />
      {/* Radial mask to fade out edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#000000_80%)]" />
    </div>
  );
}
