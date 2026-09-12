import React from "react";
import { Speaker } from "@/data/speakers";
import SpeakerCard from "./SpeakerCard";


interface SpeakerGridProps {
  speakers: Speaker[];
}

export default function SpeakerGrid({ speakers }: SpeakerGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 lg:gap-x-16 lg:gap-y-24">
      {speakers.map((speaker, index) => (
        <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
      ))}
    </div>
  );
}
