"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { currentSpeakers, Speaker } from "@/data/speakers";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollPortraitWall() {
  const containerRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  // Fallback images matching the old home page logic
  const fallbackImages = [
    "/gallery/image4.jpg",
    "/gallery/image8.jpg",
    "/gallery/image14.jpg",
    "/gallery/image1.jpg",
    "/gallery/image2.jpg",
    "/gallery/image3.jpg",
    "/gallery/image5.jpg",
    "/gallery/image6.jpg",
    "/gallery/image7.jpg",
  ];

  // Distribute speakers into 3 columns
  const col1: Speaker[] = [];
  const col2: Speaker[] = [];
  const col3: Speaker[] = [];

  // Duplicate speakers to create a longer, infinite-feeling wall
  const repeatedSpeakers = [...currentSpeakers, ...currentSpeakers, ...currentSpeakers, ...currentSpeakers];

  repeatedSpeakers.forEach((speaker, index) => {
    // We add a unique suffix to the ID so React doesn't complain about duplicate keys
    const speakerWithUniqueId = { ...speaker, id: `${speaker.id}-${index}` };
    if (index % 3 === 0) col1.push(speakerWithUniqueId);
    else if (index % 3 === 1) col2.push(speakerWithUniqueId);
    else col3.push(speakerWithUniqueId);
  });

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrubbing
        },
      });

      // Move columns up at different speeds/offsets
      if (col1Ref.current) {
        tl.fromTo(
          col1Ref.current,
          { y: "20vh" },
          { y: "-150vh", ease: "none" },
          0
        );
      }
      if (col2Ref.current) {
        tl.fromTo(
          col2Ref.current,
          { y: "40vh" },
          { y: "-180vh", ease: "none" },
          0
        );
      }
      if (col3Ref.current) {
        tl.fromTo(
          col3Ref.current,
          { y: "10vh" },
          { y: "-120vh", ease: "none" },
          0
        );
      }
    },
    { scope: containerRef }
  );

  const SpeakerCard = ({ speaker, index }: { speaker: Speaker; index: number }) => {
    const imageSrc = speaker.imageUrl || fallbackImages[index % fallbackImages.length];

    return (
      <Link href="/speakers" className="block w-full group overflow-hidden mb-6 md:mb-8">
        <div className="relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-zinc-100">
          <Image
            src={imageSrc}
            alt={speaker.name}
            fill
            className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 group-hover:text-[#eb0028] transition-colors">
            {speaker.name}
          </h3>
          <p className="text-xs md:text-sm font-sans tracking-widest uppercase text-zinc-500 mt-1">
            {speaker.role}
          </p>
        </div>
      </Link>
    );
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-transparent text-neutral-900 h-[250vh] md:h-[300vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* The Wall */}
        <div className="absolute left-0 right-0 top-0 z-10 flex gap-4 md:gap-8 px-4 md:px-12 w-full pt-[10vh] pointer-events-none">
          {/* Column 1 */}
          <div ref={col1Ref} className="w-1/2 md:w-1/3 flex flex-col pointer-events-auto">
            {col1.map((speaker, idx) => (
              <SpeakerCard key={speaker.id} speaker={speaker} index={idx} />
            ))}
          </div>
          
          {/* Column 2 */}
          <div ref={col2Ref} className="hidden md:flex w-1/3 flex-col pointer-events-auto">
            {col2.map((speaker, idx) => (
              <SpeakerCard key={speaker.id} speaker={speaker} index={idx + col1.length} />
            ))}
          </div>
          
          {/* Column 3 (Acts as column 2 on mobile) */}
          <div ref={col3Ref} className="w-1/2 md:w-1/3 flex flex-col pointer-events-auto mt-[10vh] md:mt-0">
            {/* On mobile, merge col2 and col3 to ensure all speakers are shown */}
            <div className="md:hidden flex flex-col">
              {col2.map((speaker, idx) => (
                <SpeakerCard key={speaker.id} speaker={speaker} index={idx + col1.length} />
              ))}
            </div>
            {col3.map((speaker, idx) => (
              <SpeakerCard key={speaker.id} speaker={speaker} index={idx + col1.length + col2.length} />
            ))}
          </div>
        </div>

        {/* Title / Sticky overlay Removed */}

      </div>
    </section>
  );
}
