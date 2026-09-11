import React from "react";
import { Speaker } from "@/data/speakers";
import SpeakerCard from "./SpeakerCard";
import { motion } from "motion/react";

interface SpeakerGridProps {
  speakers: Speaker[];
}

export default function SpeakerGrid({ speakers }: SpeakerGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-x-12 md:gap-y-24">
      {speakers.map((speaker, index) => (
        <motion.div
          key={speaker.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.1 }}
        >
          <SpeakerCard speaker={speaker} />
        </motion.div>
      ))}
    </div>
  );
}
