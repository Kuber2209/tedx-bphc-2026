import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Passes | TEDx BITS Hyderabad",
  description: "Secure your seat for TEDx BITS Hyderabad 2026.",
};

const passes = [
  {
    id: "student",
    name: "Student Pass",
    description: "For current students with valid institutional ID.",
    price: "TBA",
    benefits: [
      "Access to all talks and performances",
      "Event kit and merchandise",
      "Networking breaks and refreshments",
    ],
    available: false,
  },
  {
    id: "standard",
    name: "Standard Pass",
    description: "For professionals and general attendees.",
    price: "TBA",
    benefits: [
      "Access to all talks and performances",
      "Premium event kit and merchandise",
      "Networking breaks and catered lunch",
      "Exclusive access to post-event mixer",
    ],
    available: false,
    highlight: true,
  },
];

export default function PassesPage() {
  return (
    <div className="bg-white text-black min-h-screen font-sans selection:bg-[#eb0028] selection:text-white pb-32">
      <section className="relative pt-48 pb-24 px-6 md:px-12 border-b border-black/5">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-[#eb0028] font-sans text-[10px] tracking-[0.2em] uppercase mb-6 font-bold">Registration</p>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
            Join the <span className="font-serif italic font-light text-zinc-500">room.</span>
          </h1>
          <p className="text-xl font-light text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            Passes will be released in phases. Select the tier that best describes you to learn more about the inclusions.
          </p>
        </div>
      </section>

      <section className="relative py-24 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {passes.map((pass) => (
              <div 
                key={pass.id} 
                className={`group relative overflow-hidden flex flex-col justify-between p-10 md:p-14 ${
                  pass.highlight 
                    ? "bg-zinc-50 border border-black/10 shadow-sm" 
                    : "bg-white border border-black/5"
                }`}
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#eb0028] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="mb-16">
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-black">{pass.name}</h3>
                  <p className="text-zinc-500 text-sm md:text-base mb-12">{pass.description}</p>
                  
                  <div className="space-y-4">
                    <p className="text-[#eb0028] font-mono text-[10px] tracking-[0.2em] uppercase">Inclusions</p>
                    <ul className="space-y-4 text-sm text-zinc-600 font-light">
                      {pass.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <span className="text-[#eb0028] mt-1">—</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-baseline sm:items-center justify-between gap-8 pt-10 border-t border-black/10 mt-auto">
                  <div>
                    <p className="text-zinc-500 font-mono text-[10px] tracking-[0.2em] uppercase mb-2">Price</p>
                    <p className="text-3xl font-serif italic text-black">{pass.price}</p>
                  </div>
                  
                  <Link 
                    href={pass.available ? "/schedule" : "#"} 
                    className={`inline-flex items-center justify-center px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
                      pass.available 
                        ? "bg-black text-white hover:bg-[#eb0028] hover:text-white" 
                        : "bg-transparent text-zinc-500 border border-zinc-200 cursor-not-allowed"
                    }`}
                  >
                    {pass.available ? "Select Pass" : "Coming Soon"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-24 text-center max-w-2xl mx-auto text-black">
            <h4 className="text-xl font-serif italic mb-4">Need help?</h4>
            <p className="text-sm text-zinc-600 font-light mb-8 leading-relaxed">
              For bulk bookings, institutional partnerships, or ticketing issues, please reach out to our team.
            </p>
            <Link href="/faq" className="inline-flex text-xs font-bold uppercase tracking-[0.2em] border-b border-zinc-300 pb-2 hover:text-[#eb0028] hover:border-[#eb0028] transition-all text-zinc-600">
              Read FAQs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
