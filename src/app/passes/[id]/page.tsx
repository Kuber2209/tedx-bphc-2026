import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { passTiers } from "@/data/passes";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  HelpCircle,
  Users,
  Sparkles,
  School,
  GraduationCap,
  Briefcase,
} from "lucide-react";

interface PassDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return passTiers.map((pass) => ({
    id: pass.id,
  }));
}

export async function generateMetadata({ params }: PassDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const pass = passTiers.find((p) => p.id === id);

  if (!pass) {
    return {
      title: "Pass Not Found | TEDx BPHC 2026",
    };
  }

  return {
    title: `${pass.name} | TEDx BPHC 2026`,
    description: pass.description,
  };
}

export default async function PassDetailPage({ params }: PassDetailPageProps) {
  const { id } = await params;
  const pass = passTiers.find((p) => p.id === id);

  if (!pass) {
    notFound();
  }

  const details = pass.details;

  const getPassIcon = (passId: string) => {
    switch (passId) {
      case "school-student":
        return <School className="h-5 w-5 text-[#eb0028]" />;
      case "bits-internal":
        return <GraduationCap className="h-5 w-5 text-[#eb0028]" />;
      case "external-guest":
        return <Briefcase className="h-5 w-5 text-[#eb0028]" />;
      default:
        return <Sparkles className="h-5 w-5 text-[#eb0028]" />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-32">
      {/* Top Header / Breadcrumb Bar */}
      <div className="pt-32 pb-8 px-6 md:px-12 border-b border-neutral-100 max-w-[1400px] mx-auto">
        <Link
          href="/passes"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 hover:text-[#eb0028] transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to All Passes</span>
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-neutral-700">
                {getPassIcon(pass.id)}
                <span>{pass.badge}</span>
              </span>

              {pass.highlight && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eb0028]/10 border border-[#eb0028]/20 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#eb0028]">
                  Campus Flagship
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-neutral-900 leading-[0.95] mb-4">
              {pass.name}
            </h1>

            <p className="text-lg md:text-xl font-light text-neutral-600 leading-relaxed max-w-2xl">
              {pass.description}
            </p>
          </div>

          {/* Pricing Box & Registration Button */}
          <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200 shrink-0 w-full lg:w-80 shadow-xs">
            <div className="flex items-baseline justify-between gap-4 mb-4">
              <div>
                <p className="text-neutral-400 font-mono text-[10px] tracking-[0.2em] uppercase mb-1">
                  Delegate Fee
                </p>
                <p className="text-4xl font-bold tracking-tight text-neutral-900">{pass.price}</p>
              </div>
              <span className="text-[10px] font-mono text-[#eb0028] uppercase tracking-wider font-bold bg-[#eb0028]/10 px-2.5 py-1 rounded">
                Phase 1
              </span>
            </div>

            <p className="text-xs text-neutral-500 font-light mb-6">
              Includes full-day auditorium pass, official delegate kit, lunch, and high-tea.
            </p>

            <Link
              href={pass.available ? pass.registrationUrl || "#" : "#"}
              className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-bold tracking-[0.15em] uppercase rounded-full transition-all duration-300 ${
                pass.available
                  ? "bg-[#eb0028] text-white hover:bg-[#c20021] hover:shadow-lg shadow-sm"
                  : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
              }`}
            >
              <span>{pass.available ? "Complete Registration" : "Registrations Opening Soon"}</span>
              {pass.available && <ArrowUpRight className="h-4 w-4" />}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left / Main Column */}
          <div className="lg:col-span-8 space-y-16">
            {/* 1. Overview Section */}
            {details?.overview && (
              <section>
                <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#eb0028] mb-4">
                  Overview
                </h2>
                <p className="text-xl md:text-2xl font-light text-neutral-800 leading-relaxed">
                  {details.overview}
                </p>
              </section>
            )}

            {/* 2. Inclusions & Privileges Section */}
            <section className="p-8 sm:p-10 rounded-3xl bg-neutral-50 border border-neutral-200">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="h-5 w-5 text-[#eb0028]" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Full Inclusions & Delegate Privileges
                </h2>
              </div>
              <p className="text-sm font-light text-neutral-600 mb-8 leading-relaxed">
                Every delegate registered under this tier is entitled to the following comprehensive privileges:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pass.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-white border border-neutral-200/80 flex items-start gap-3.5 shadow-2xs"
                  >
                    <span className="text-[#eb0028] font-bold text-base mt-0.5 shrink-0">✓</span>
                    <span className="text-sm font-light text-neutral-800 leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Who Should Attend */}
            {details?.whoShouldAttend && (
              <section>
                <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#eb0028] mb-4">
                  Target Audience
                </h2>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-6">
                  Who is this pass curated for?
                </h3>
                <div className="space-y-3">
                  {details.whoShouldAttend.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-neutral-100 bg-neutral-50/60 flex items-center gap-3 text-sm text-neutral-700"
                    >
                      <span className="h-2 w-2 rounded-full bg-[#eb0028] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 4. Event Day Itinerary Highlights */}
            {details?.scheduleHighlights && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-5 w-5 text-[#eb0028]" />
                  <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#eb0028]">
                    Event Day Schedule Highlights
                  </h2>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-8">
                  Your journey through the day.
                </h3>

                <div className="space-y-6 relative border-l-2 border-neutral-200 ml-4 pl-8">
                  {details.scheduleHighlights.map((item, idx) => (
                    <div key={idx} className="relative">
                      {/* Timeline Node Point */}
                      <span className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-[#eb0028] shadow-xs" />
                      <span className="font-mono text-xs font-bold text-[#eb0028] mb-1 block">
                        {item.time}
                      </span>
                      <h4 className="text-lg font-bold text-neutral-900 mb-1">{item.title}</h4>
                      <p className="text-sm font-light text-neutral-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 5. Delegate Kit Contents */}
            {details?.kitContents && (
              <section className="p-8 sm:p-10 rounded-3xl bg-neutral-900 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="h-5 w-5 text-[#eb0028]" />
                  <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#eb0028]">
                    Official Delegate Pack
                  </h2>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
                  What is inside your kit?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {details.kitContents.map((kitItem, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-start gap-3"
                    >
                      <Sparkles className="h-4 w-4 text-[#eb0028] mt-0.5 shrink-0" />
                      <span className="text-sm font-light text-neutral-200">{kitItem}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 6. Frequently Asked Questions */}
            {details?.faqs && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <HelpCircle className="h-5 w-5 text-[#eb0028]" />
                  <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#eb0028]">
                    Common Inquiries
                  </h2>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-8">
                  Frequently Asked Questions
                </h3>

                <div className="space-y-4">
                  {details.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl border border-neutral-200 bg-white shadow-2xs"
                    >
                      <h4 className="text-base font-bold text-neutral-900 mb-2">{faq.question}</h4>
                      <p className="text-sm font-light text-neutral-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Smooth Check-In Guide */}
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200 shadow-xs">
              <div className="flex items-center gap-2 text-[#eb0028] mb-4">
                <Sparkles className="h-5 w-5" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em]">
                  Smooth Check-In
                </h3>
              </div>
              <p className="text-xs text-neutral-500 font-light mb-6 leading-relaxed">
                Everything you need for an effortless, enjoyable arrival on event day:
              </p>

              <div className="space-y-3">
                {(details?.checkInGuide || [
                  "Digital pass confirmation on your phone",
                  "Auditorium registration desk opens at 08:30 AM",
                  "Official delegate credentials and welcome pack issued at reception",
                ]).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white border border-neutral-200 flex items-start gap-3"
                  >
                    <span className="text-[#eb0028] font-bold text-xs mt-0.5 shrink-0">✓</span>
                    <span className="text-xs font-medium text-neutral-800 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Seating Zone Card */}
            <div className="p-8 rounded-3xl bg-white border border-neutral-200 shadow-xs">
              <div className="flex items-center gap-2 text-neutral-900 mb-4">
                <MapPin className="h-5 w-5 text-[#eb0028]" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em]">
                  Auditorium Seating
                </h3>
              </div>
              <p className="text-lg font-bold text-neutral-900 mb-2">
                {details?.seatingZone || "General Auditorium Seating"}
              </p>
              <p className="text-xs text-neutral-500 font-light leading-relaxed">
                Seating is allocated on a first-come, first-seated basis within the designated zone.
                Auditorium doors open at 08:30 AM.
              </p>
            </div>

            {/* Delegation Inquiries */}
            <div className="p-8 rounded-3xl bg-neutral-950 text-white shadow-xs">
              <div className="flex items-center gap-2 text-[#eb0028] mb-3">
                <Users className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                  Group Bookings
                </span>
              </div>
              <h4 className="text-lg font-bold mb-3">Bringing a Delegation?</h4>
              <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                For groups of 10 or more delegates, our hospitality desk facilitates block
                ticketing, unified billing, and campus bus entry.
              </p>
              <a
                href="mailto:tedx@hyderabad.bits-pilani.ac.in?subject=Group%20Pass%20Inquiry"
                className="w-full text-center inline-flex items-center justify-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-neutral-800 hover:border-neutral-500 transition-colors"
              >
                <span>Contact Delegation Desk</span>
              </a>
            </div>

            {/* Other Pass Tiers Quick Links */}
            <div className="p-6 rounded-3xl border border-neutral-200 bg-white">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 mb-4">
                Explore Other Tiers
              </p>
              <div className="space-y-2">
                {passTiers
                  .filter((p) => p.id !== pass.id)
                  .map((other) => (
                    <Link
                      key={other.id}
                      href={`/passes/${other.id}`}
                      className="p-3 rounded-xl hover:bg-neutral-50 transition-colors flex items-center justify-between group border border-transparent hover:border-neutral-100"
                    >
                      <div>
                        <p className="text-xs font-bold text-neutral-900 group-hover:text-[#eb0028] transition-colors">
                          {other.name}
                        </p>
                        <p className="text-[10px] text-neutral-500">{other.targetAudience}</p>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-[#eb0028] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
