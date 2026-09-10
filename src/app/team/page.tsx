"use client";


import { TEAM_SECTIONS } from "@/data/team";
import { motion } from "motion/react";
import Image from "next/image";

export default function TeamPage() {

  return (
    <div className="min-h-screen bg-white text-black selection:bg-[#eb0028] selection:text-white pb-32">
      {/* Cinematic Header */}
      <header className="relative pt-48 pb-32 px-6 md:px-12 border-b border-black/5 max-w-[1600px] mx-auto overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#eb0028]/5 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-8 bg-[#eb0028]"></div>
            <span className="text-zinc-500 font-sans text-[10px] md:text-xs uppercase tracking-[0.2em]">
              Behind the curtain
            </span>
          </div>
          
          <h1 className="text-7xl md:text-[160px] font-bold tracking-tighter leading-[0.8] mb-12">
            The<br />
            <span className="italic text-zinc-500 font-serif font-light md:pl-24">makers.</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-5 md:col-start-8">
              <p className="text-zinc-600 text-xl font-light leading-relaxed">
                TEDx BITS Hyderabad is engineered by a student-led collective of designers, curators, producers, and technologists. 
              </p>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Behind the scenes collage / vibe */}
      <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="aspect-square relative overflow-hidden bg-zinc-100 md:mt-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image src="/gallery/image1.jpg" alt="Team behind the scenes" fill className="object-cover filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-1000" />
          </motion.div>
          <motion.div 
            className="aspect-[3/4] relative overflow-hidden bg-zinc-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image src="/gallery/image8.jpg" alt="Team behind the scenes" fill className="object-cover filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-1000" />
          </motion.div>
          <motion.div 
            className="aspect-square relative overflow-hidden bg-zinc-100 md:mt-48"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image src="/gallery/image14.jpg" alt="Team behind the scenes" fill className="object-cover filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-1000" />
          </motion.div>
        </div>
      </section>

      {/* Cinematic Credits Roll */}
      <main className="max-w-[1600px] mx-auto mt-20 relative">
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
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="mb-16 border-b border-black/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                  <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
                    {section.title}
                  </h2>
                  <p className="text-zinc-500 font-serif italic text-xl">
                    {section.description}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                  {section.members.map((member, idx) => (
                    <motion.div 
                      key={member.id}
                      className="group relative flex flex-col"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (idx % 10) * 0.05 }}
                    >
                      {/* Sub-department grouping feeling via typography */}
                      <span className="text-[#eb0028] font-sans text-[9px] uppercase tracking-[0.2em] mb-3">
                        {member.role}
                      </span>
                      <h3 className="text-3xl font-bold tracking-tight text-black group-hover:text-zinc-600 transition-colors duration-300 mb-2">
                        {member.name}
                      </h3>
                      
                      {/* Subtle hover line */}
                      <div className="w-0 group-hover:w-full h-[1px] bg-black/20 transition-all duration-500 mt-4"></div>
                    </motion.div>
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
