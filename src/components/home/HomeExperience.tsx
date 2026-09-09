"use client";

import Image from "next/image";
import Link from "next/link";
import { currentSpeakers } from "@/data/speakers";
import LogoLoop from "@/components/layout/LogoLoop";

const speakerImages = ["/gallery/image4.jpg", "/gallery/image8.jpg", "/gallery/image14.jpg"];

export default function HomeExperience() {
  return (
    <div className="studio-home">
      <section className="studio-hero">
        <div className="studio-hero-meta"><span>TEDx BITS Hyderabad</span><span>2026–27 / Hyderabad, India</span></div>
        <div className="studio-hero-grid">
          <div className="studio-hero-copy"><p className="studio-kicker">An independently organised TEDx event</p><h1>Every idea<br /><em>starts somewhere.</em></h1><p className="studio-intro">Curious minds, unexpected perspectives, and conversations worth carrying beyond the stage.</p><Link className="studio-link studio-link-light" href="/speakers">Meet the voices <span>↗</span></Link></div>
          <div className="studio-hero-visual"><Image src="/gallery/image1.jpg" alt="TEDx BITS Hyderabad stage" fill priority sizes="(max-width: 800px) 100vw, 52vw" /><div className="studio-hero-visual-label"><span>01</span><span>Ideas in motion</span></div></div>
        </div>
        <div className="studio-scroll-note">Scroll to explore <span>↓</span></div>
      </section>

      <section className="studio-story">
        <div className="studio-section-index">01 / THE EVENT</div>
        <div className="studio-story-content"><h2>A room for ideas<br /><em>to become real.</em></h2><p>TEDx BITS Hyderabad brings the spirit of TED to the BITS Pilani Hyderabad Campus — a community of students, researchers, makers, artists, and people with something worth sharing.</p><Link className="studio-link" href="/faq">Discover the event <span>↗</span></Link></div>
        <div className="studio-story-image"><Image src="/gallery/image8.jpg" alt="Audience and speaker at TEDx BITS Hyderabad" fill sizes="(max-width: 800px) 100vw, 42vw" /></div>
      </section>

      <section className="studio-event-band"><div className="studio-section-index">02 / THE NEXT EDITION</div><div><p className="studio-kicker">Take the leap</p><h2>TEDx BITS Hyderabad<br /><span>2026–27</span></h2><div className="studio-event-details"><span>1X November 2026</span><span>BITS Pilani Hyderabad Campus</span><span>Hyderabad, India</span></div><Link className="studio-link studio-link-light" href="/schedule">See the programme <span>↗</span></Link></div></section>

      <section className="studio-speakers"><div className="studio-section-index">03 / THE VOICES</div><div className="studio-speakers-head"><h2>Meet the people<br /><em>behind the ideas.</em></h2><Link className="studio-link" href="/speakers">View all speakers <span>↗</span></Link></div><div className="studio-speaker-list">{currentSpeakers.slice(0, 3).map((speaker, index) => <Link href="/speakers" className="studio-speaker-row" key={speaker.id}><span className="studio-speaker-number">0{index + 1}</span><div><h3>{speaker.name}</h3><p>{speaker.role} · {speaker.company}</p></div><div className="studio-speaker-thumb"><Image src={speakerImages[index]} alt="" fill sizes="180px" /></div><span className="studio-speaker-arrow">↗</span></Link>)}</div></section>

      <LogoLoop />

      <section className="studio-archive"><div className="studio-section-index">04 / FROM THE ARCHIVE</div><div><h2>Ideas do not<br /><em>end at the event.</em></h2><p>Explore photographs, previous speakers, and the moments that continue to shape the TEDx BITS Hyderabad story.</p><div className="studio-archive-links"><Link className="studio-link studio-link-light" href="/gallery">View the gallery <span>↗</span></Link><Link className="studio-link studio-link-light" href="/speakers">Explore previous years <span>↗</span></Link></div></div></section>
    </div>
  );
}
