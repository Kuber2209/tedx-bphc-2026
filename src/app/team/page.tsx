import { Metadata } from "next";
import { TEAM_SECTIONS } from "@/data/team";
import TeamCard from "@/components/team/TeamCard";

export const metadata: Metadata = {
  title: "Our Team — TEDx BPHC 2026",
  description:
    "Meet the team behind TEDx BPHC 2026: fueled by passion and united by purpose, making a difference.",
};

export default function TeamPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-zinc-100">
      {/* Background Tiles & Ambient Accent Glow (Easy to restyle or toggle) */}
      <div
        className="pointer-events-none absolute inset-0 bg-tiles opacity-60"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        {/* 1. Page Header (Reference: Left bold 'Our Team', Right quote) */}
        <header className="flex flex-col justify-between gap-6 border-b border-zinc-800/60 pb-12 md:flex-row md:items-end">
          <div>
            <span className="mb-2 inline-block text-xs font-mono font-semibold uppercase tracking-widest text-[#E62B1E]">
              TEDx BPHC 2026
            </span>
            <h1 className="text-6xl font-black uppercase tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-9xl leading-[0.88]">
              Our <br />
              Team
            </h1>
          </div>

          <div className="max-w-md md:pb-2">
            <p className="text-base font-light leading-relaxed text-zinc-400 sm:text-lg">
              Fueled by passion and united by purpose, we&apos;re here to make
              a difference.
            </p>
          </div>
        </header>

        {/* 2. Team Sections (Supports multiple categories e.g. Executives, Curators, Tech, etc.) */}
        <div className="mt-14 space-y-16">
          {TEAM_SECTIONS.map((section) => (
            <section key={section.id} aria-labelledby={`heading-${section.id}`}>
              {/* Section Subheading (Clean dot accent matching speaker page) */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400">
                  <span className="h-2 w-2 rounded-full bg-[#E62B1E]" />
                  <h2
                    id={`heading-${section.id}`}
                    className="text-lg font-bold tracking-tight text-white uppercase sm:text-xl"
                  >
                    {section.title}
                  </h2>
                </div>
                {section.description && (
                  <span className="text-xs font-mono text-zinc-500">
                    {section.description}
                  </span>
                )}
              </div>

              {/* Showcase Frame / Card Grid Container */}
              <div className="rounded-3xl border border-zinc-800/80 bg-zinc-950/70 p-5 backdrop-blur-md shadow-2xl sm:p-7 md:p-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {section.members.map((member) => (
                    <TeamCard key={member.id} member={member} />
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
