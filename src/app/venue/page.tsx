import React from "react";
import Image from "next/image";
import ViewOnMap from "@/components/venue/ViewOnMap";

export const metadata = {
  title: "Venue | TEDx BITS Hyderabad",
  description: "Join us at the Auditorium, BITS Pilani Hyderabad Campus.",
};

export default function VenuePage() {
  return (
    <div className="bg-white text-black min-h-screen font-sans">
      <section className="relative pt-48 pb-24 px-6 md:px-12 border-b border-black/5">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[#eb0028] font-sans text-[10px] tracking-[0.2em] uppercase mb-8 font-bold">The Location</p>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-12">
            The room where <br />
            <span className="font-serif italic font-light text-zinc-500">it happens.</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-zinc-600 max-w-2xl leading-relaxed">
            Every great idea needs a place to land. Join us at the BITS Pilani Hyderabad Campus Auditorium, a space designed for focus, connection, and paradigm-shifting conversations.
          </p>
        </div>
      </section>

      <section className="relative py-24 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="order-2 md:order-1 relative h-[50vh] md:h-[70vh] w-full">
            <Image 
              src="/gallery/image8.jpg" 
              alt="Auditorium View" 
              fill 
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          </div>
          
          <div className="order-1 md:order-2 flex flex-col items-start">
            <h2 className="text-3xl md:text-5xl font-serif italic mb-8">Auditorium,<br/> BITS Pilani Hyderabad.</h2>
            <div className="space-y-6 text-zinc-600 text-sm md:text-base leading-relaxed mb-12 font-light">
              <p>
                <strong className="text-black font-medium">Address:</strong><br />
                Jawahar Nagar, Shamirpet,<br />
                Hyderabad, Telangana 500078
              </p>
              <p>
                Located approx 45 minutes from Secunderabad Railway Station and 1 hour from Rajiv Gandhi International Airport. Follow signs for &quot;TEDx BPHC&quot; upon entering the main gate.
              </p>
            </div>
            
            <ViewOnMap 
              locationName="Auditorium, BITS Pilani Hyderabad Campus" 
              mapImageUrl="/gallery/image4.jpg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
