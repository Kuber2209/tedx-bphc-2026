"use client";


interface SectionBackgroundProps {
  children: React.ReactNode;
  /** Opacity of the background effect itself */
  effectOpacity?: number;
  /** Opacity of the solid color mask placed OVER the effect but UNDER the content, to ensure readability */
  maskOpacity?: number;
  /** Color of the mask */
  maskColor?: string;
  /** Whether the background is fixed to the screen or scrolls with the section */
  type?: "fixed" | "absolute" | "sticky";
  /** Add a gradient mask at the top/bottom edges to fade out the background smoothly */
  edgeFade?: boolean;
}

export default function SectionBackground({
  children,
  effectOpacity = 1,
  maskOpacity = 0.6,
  maskColor = "#000000",
  type = "absolute",
  edgeFade = false,
}: SectionBackgroundProps) {
  
  const containerClasses = {
    fixed: "fixed inset-0 pointer-events-none z-0",
    absolute: "absolute inset-0 pointer-events-none z-0 overflow-hidden",
    sticky: "absolute inset-0 pointer-events-none z-0 overflow-hidden", // The inner div will be sticky
  };

  return (
    <div className={containerClasses[type]}>
      <div 
        className={type === "sticky" ? "sticky top-0 h-screen w-full" : "absolute inset-0 w-full h-full"}
        style={{ opacity: effectOpacity }}
      >
        <div className="absolute inset-0 z-0">
          {children}
        </div>
        
        {/* Protection Mask */}
        {maskOpacity > 0 && (
          <div 
            className="absolute inset-0 z-10 transition-opacity duration-1000" 
            style={{ backgroundColor: maskColor, opacity: maskOpacity }} 
          />
        )}
        
        {/* Edge fade gradient mask (e.g., to blend with adjacent black sections) */}
        {edgeFade && (
          <div className="absolute inset-0 z-20 bg-gradient-to-b from-white via-transparent to-[#050505] opacity-90" />
        )}
      </div>
    </div>
  );
}
