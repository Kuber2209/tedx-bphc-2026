import React from "react";
import { Speaker } from "@/data/speakers";
import SpeakerCard from "./SpeakerCard";


interface SpeakerGridProps {
  speakers: Speaker[];
}

export default function SpeakerGrid({ speakers }: SpeakerGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-x-12 md:gap-y-24">
      {speakers.map((speaker, index) => (
        <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
      ))}
    </div>
  );
}
