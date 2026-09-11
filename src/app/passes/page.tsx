import React from "react";
import Link from "next/link";
import { passTiers, passGuidelines } from "@/data/passes";
import BlurText from "@/components/reactbits/BlurText";
import BorderGlow from "@/components/reactbits/BorderGlow";
import FaultyTerminal from "@/components/reactbits/FaultyTerminal";
import {
  GraduationCap,
  Building2,
  Globe,
  ShieldCheck,
  Check,
  ArrowUpRight,
  HelpCircle,
  Users,
} from "lucide-react";

export const metadata = {
  title: "Passes | TEDx BITS Hyderabad",
  description:
    "Explore registration passes for school students, the in-house BITS community, and outside guests for TEDx BITS Hyderabad 2026.",
};

const getPassIcon = (id: string) => {
  switch (id) {
    case "school-student":
      return <GraduationCap className="h-5 w-5 text-[#eb0028]" />;
    case "bits-internal":
      return <Building2 className="h-5 w-5 text-[#eb0028]" />;
    case "external-guest":
      return <Globe className="h-5 w-5 text-[#eb0028]" />;
    default:
      return <Check className="h-5 w-5 text-[#eb0028]" />;
  }
};

export default function PassesPage() {
  return (
    <div className="bg-transparent text-black min-h-screen font-sans selection:bg-[#E62B1E] selection:text-neutral-900 pb-32 relative">
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none">
         <FaultyTerminal
           lightMode={true}
           tint="#eb0028"
           brightness={1.2}
           mouseReact={false}
         />
      </div>

      <div className="relative z-10">
      {/* 1. Header Section */}
      <section className="relative pt-48 pb-24 px-6 md:px-12 border-b border-black/5 overflow-hidden">
        <div className="max-w-[1200px] mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1 rounded-full bg-red-50 border border-red-200/60 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E62B1E] animate-pulse"></span>
            <p className="text-[#E62B1E] font-sans text-[11px] tracking-[0.2em] uppercase font-bold text-center">
              Conference Registration · 2026
            </p>
          </div>

          {/* BlurText on 'Join the room.' */}
          <BlurText
            text="Join the room."
            as="h1"
            delay={140}
            animateBy="words"
            direction="top"
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[96px] font-bold tracking-tighter mb-8 text-black leading-[0.9] text-center"
            highlightWords={{
              room: "font-serif italic font-light text-[#eb0028] drop-shadow-[0_0_20px_rgba(235,0,40,0.8)]",
              "room.": "font-serif italic font-light text-[#eb0028] drop-shadow-[0_0_20px_rgba(235,0,40,0.8)]",
            }}
          />

          {/* BlurText on series of texts just below it */}
          <BlurText
            text="Seating in the Main Auditorium is curated across three designated categories: school students, the in-house BITS Pilani community, and external guests."
            as="p"
            delay={25}
            animateBy="words"
            direction="bottom"
            className="text-lg md:text-xl font-light text-zinc-600 max-w-2xl mx-auto leading-relaxed text-center mb-4"
          />

          <div className="mt-8 inline-flex items-center gap-2 text-zinc-500 font-mono text-xs">
            <span className="h-2 w-2 rounded-full bg-[#eb0028]" />
            <BlurText
              text="Auditorium, BITS Pilani Hyderabad Campus"
              as="span"
              delay={35}
              animateBy="words"
              direction="bottom"
              className="text-zinc-500 font-mono text-xs"
            />
          </div>
        </div>
      </section>

      {/* 2. Three Pass Tiers Grid (Kept Clean, Crisp & Static) */}
      <section className="relative py-24 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {passTiers.map((pass) => (
              <BorderGlow
                key={pass.id}
                borderRadius="1rem"
                borderWidth={1.5}
                glowColor={pass.highlight ? "#eb0028" : "rgba(235, 0, 40, 0.75)"}
                glowSize={380}
                intensity={0.55}
                highlight={pass.highlight}
                className="h-full flex"
              >
                <div
                  className={`group relative overflow-hidden flex flex-col justify-between p-8 sm:p-10 rounded-2xl transition-all duration-500 w-full h-full ${
                    pass.highlight
                      ? "bg-black border border-white/15 shadow-xl"
                      : "bg-black border border-white/10 hover:shadow-lg hover:shadow-white/5"
                  }`}
                >
                  {/* Accent top line */}
                  <div
                    className={`absolute top-0 left-0 w-full h-[3px] transition-opacity duration-500 ${
                      pass.highlight
                        ? "bg-gradient-to-r from-[#eb0028] via-[#eb0028] to-black opacity-100"
                        : "bg-gradient-to-r from-[#eb0028] to-transparent opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  {/* Top Section */}
                  <div>
                    {/* Category Pill & Highlight Indicator */}
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-300">
                        {getPassIcon(pass.id)}
                        <span>{pass.badge}</span>
                      </span>

                      {pass.highlight && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eb0028] px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-900 shadow-xs">
                          Campus Exclusive
                        </span>
                      )}
                    </div>

                    {/* Pass Name & Target Audience (Clean Static) */}
                    <div className="mb-6">
                      <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#eb0028] mb-2 transition-colors">
                        {pass.name}
                      </h3>
                      <p className="font-serif italic text-base text-zinc-400">
                        {pass.targetAudience}
                      </p>
                    </div>

                    {/* Description (Clean Static) */}
                    <p className="text-sm font-light text-zinc-300 leading-relaxed mb-8">
                      {pass.description}
                    </p>

                    {/* Eligibility Verification Callout */}
                    <div className="rounded-xl bg-zinc-900/80 border border-white/5 p-4 mb-8">
                      <div className="flex items-center gap-2 mb-1.5">
                        <ShieldCheck className="h-4 w-4 text-[#eb0028] shrink-0" />
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                          Verification Required
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        {pass.eligibility}
                      </p>
                    </div>

                    {/* Inclusions List */}
                    <div className="space-y-4 mb-10">
                      <p className="text-[#eb0028] font-mono text-[10px] tracking-[0.2em] uppercase font-bold">
                        Inclusions & Privileges
                      </p>
                      <ul className="space-y-3.5 text-sm text-zinc-300 font-light">
                        {pass.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-[#eb0028] font-bold mt-0.5 shrink-0">—</span>
                            <span className="leading-snug">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Price & CTA Area */}
                  <div className="pt-8 border-t border-white/10 mt-auto">
                    <div className="flex items-baseline justify-between gap-4 mb-6">
                      <div>
                        <p className="text-zinc-500 font-mono text-[10px] tracking-[0.2em] uppercase mb-1">
                          Delegate Fee
                        </p>
                        <p className="text-3xl font-serif italic text-white font-light">
                          {pass.price}
                        </p>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500">
                        Phase 1 Opening Soon
                      </span>
                    </div>

                    <Link
                      href={pass.available ? pass.registrationUrl || "/schedule" : "#"}
                      className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-300 ${
                        pass.available
                          ? "bg-white text-neutral-900 hover:bg-[#eb0028] hover:text-white hover:shadow-lg"
                          : "bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed hover:bg-zinc-800"
                      }`}
                    >
                      <span>{pass.available ? "Register Pass" : "Coming Soon"}</span>
                      {pass.available && <ArrowUpRight className="h-4 w-4" />}
                    </Link>
                  </div>
                </div>
              </BorderGlow>
            ))}
          </div>

          {/* 3. Pass Policies & Important Guidelines (Clean Static) */}
          <div className="mt-28 pt-16 border-t border-black/10">
            <div className="max-w-3xl mb-12">
              <span className="text-[#eb0028] font-mono text-[10px] uppercase tracking-[0.2em] font-bold block mb-2">
                Registration Standards
              </span>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-black">
                Important details before you register.
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {passGuidelines.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-black border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs text-[#eb0028] font-bold block mb-3">
                      0{idx + 1}
                    </span>
                    <h4 className="text-lg font-bold text-[#eb0028] mb-2">{item.title}</h4>
                    <p className="text-sm font-light text-zinc-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Delegation & School Bookings Callout Banner (Clean Static) */}
          <div className="mt-16 p-8 md:p-12 rounded-2xl border border-white/10 bg-black flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-[#eb0028] mb-3">
                <Users className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                  Delegation Desk
                </span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#eb0028] mb-3">
                School Contingents & Institutional Delegations
              </h4>
              <p className="text-sm md:text-base font-light text-zinc-300 leading-relaxed">
                If you represent a high school, junior college, or academic organization bringing
                a group of 10 or more delegates, our team facilitates coordinated ticketing, seating,
                and bus transit clearance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
              <a
                href="mailto:tedx@hyderabad.bits-pilani.ac.in?subject=School%20or%20Group%20Delegation%20Inquiry%20-%20TEDx%20BITS%20Hyderabad%202026"
                className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 rounded-full bg-[#eb0028] text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-colors duration-300"
              >
                <span>Request Delegation Access</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* 5. FAQs Link (Clean Static) */}
          <div className="mt-20 text-center max-w-xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-zinc-100 mb-4 text-[#eb0028]">
              <HelpCircle className="h-5 w-5" />
            </div>
            <h4 className="text-2xl font-serif italic text-black mb-3 text-center">
              Questions about passes?
            </h4>
            <p className="text-sm text-zinc-600 font-light mb-6 leading-relaxed">
              Check out our FAQs regarding entry verification, ticket transfers, accessibility,
              and event schedule logistics.
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] border-b border-black pb-1.5 hover:text-[#eb0028] hover:border-[#eb0028] transition-colors"
            >
              <span>Explore Ticketing FAQs</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
