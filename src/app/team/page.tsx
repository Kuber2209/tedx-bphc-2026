"use client";


import { TEAM_SECTIONS } from "@/data/team";
import { motion } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import TeamMemberCard from "@/components/team/TeamMemberCard";
import AeroShards from "@/components/reactbits/AeroShards";
export default function TeamPage() {
  const containerRef = useRef(null);

  return (
    <div className="min-h-screen bg-transparent text-neutral-900 selection:bg-[#E62B1E] selection:text-neutral-900 pb-32 relative overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-25">
        <AeroShards
          backgroundColor="#ffffff"
          shardColor="#eb0028"
          accentColor="#ffffff"
          density={0.05}
          speed={0.03}
          turbulence={0.01}
          shardSize={1.0}
        />
      </div>
      {/* Cinematic Credits Roll */}
      <main className="max-w-[1600px] mx-auto mt-32 md:mt-48 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 px-6 md:px-12">
          
          {/* Left Column: Quick Navigation / Index */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-40">
              <span className="text-zinc-600 font-sans text-[10px] uppercase tracking-[0.3em] mb-8 block font-bold">
                Departments
              </span>
              <ul className="flex flex-col gap-6 border-l border-black/5 pl-6">
                {TEAM_SECTIONS.map(section => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="text-zinc-500 hover:text-black hover:pl-2 transition-all duration-300 text-xs uppercase tracking-[0.2em]">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: The Credits */}
          <div className="lg:col-span-9">
            {TEAM_SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="mb-48 scroll-mt-40">
                <div
                  className="mb-16 border-b border-black/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                  <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
                    {section.title}
                  </h2>
                  <p className="text-zinc-500 text-lg md:text-xl font-medium tracking-tight">
                    {section.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                  {section.members.map((member, idx) => (
                    <div key={member.id}>
                      <TeamMemberCard member={member} />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
