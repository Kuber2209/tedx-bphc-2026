"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import FerrofluidBackdrop from "./FerrofluidBackdrop";
import LogoLoop from "@/components/layout/LogoLoop";

const highlights = [
  { image: "/gallery/image1.jpg", label: "THE STAGE", title: "Ideas worth the room." },
  { image: "/gallery/image8.jpg", label: "THE VOICES", title: "Listen a little closer." },
  { image: "/gallery/image14.jpg", label: "THE COMMUNITY", title: "Make room for wonder." },
];

const socials = [
  ["Instagram", "https://www.instagram.com/tedxbitshyderabad/"],
  ["LinkedIn", "https://www.linkedin.com/company/tedxbitshyderabad/"],
  ["YouTube", "https://www.youtube.com/@TEDx"],
];

export default function HomeExperience() {
  const [active, setActive] = useState(0);
  const [dragX, setDragX] = useState(0);
  const dragStart = useRef<number | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % highlights.length), 5200);
    return () => window.clearInterval(timer);
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStart.current = event.clientX;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStart.current !== null) setDragX(event.clientX - dragStart.current);
  };

  const finishDrag = () => {
    if (Math.abs(dragX) > 62) setActive((current) => (current + (dragX < 0 ? 1 : -1) + highlights.length) % highlights.length);
    dragStart.current = null;
    setDragX(0);
  };

  return (
    <div className="home-experience"><FerrofluidBackdrop />
      <section className="home-hero home-hero-editorial" aria-labelledby="home-title">
        <div className="home-hero-copy home-reveal home-reveal-delay-1"><p className="home-eyebrow">TEDx BITS Hyderabad <span>/</span> 2026</p><h1 id="home-title">Ideas<br /><em>take</em> stage.</h1><p className="home-lede">A room for new questions, bold perspectives, and stories that deserve to travel further.</p><div className="home-actions"><Link className="home-button home-button-red" href="/faq">Register interest <span>↗</span></Link><Link className="home-text-link" href="/speakers">Meet the speakers <span>↗</span></Link></div></div>
        <div className="home-hero-frame home-reveal home-reveal-delay-2"><div className="home-hero-image"><Image src="/gallery/image1.jpg" alt="TEDx event stage atmosphere" fill priority sizes="(max-width: 850px) 100vw, 55vw" /><div className="home-image-caption"><span>01 — 03</span><span>THE NEXT EDITION</span></div></div><div className="home-hero-rail"><span>EST. BITS PILANI / HYDERABAD</span><span>SCROLL TO EXPLORE ↓</span></div></div>
      </section>

      <section className="home-statement home-reveal"><div className="home-section-label"><span>01</span><span>About the event</span></div><div><h2>Ideas<br /><strong>worth</strong><br />spreading.</h2><p>TEDx BITS Hyderabad is an independently organized TED event built around the power of shared ideas. This is a stage for voices that make us look again.</p><Link className="home-text-link" href="/speakers">Explore the programme <span>↗</span></Link></div></section>

      <section className="home-highlights"><div className="home-section-head"><div className="home-section-label"><span>02</span><span>Inside the room</span></div><p>Stories begin before the lights go on.</p></div><div className="home-highlight-stage" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={finishDrag} onPointerCancel={finishDrag} style={{ "--home-drag-x": `${dragX}px` } as React.CSSProperties}>{highlights.map((item, index) => <button key={item.label} className={`home-highlight ${index === active ? "is-active" : index === (active + 1) % highlights.length ? "is-next" : "is-prev"}`} onClick={() => setActive(index)} aria-label={`Show ${item.label}`}><Image src={item.image} alt="" fill sizes="(max-width: 850px) 100vw, 80vw" /><span className="home-highlight-index">0{index + 1}</span><div><small>{item.label}</small><h3>{item.title}</h3></div></button>)}</div><div className="home-highlight-controls">{highlights.map((item, index) => <button key={item.label} className={index === active ? "is-active" : ""} onClick={() => setActive(index)} aria-label={`Select highlight ${index + 1}`} />)}</div></section>

      <LogoLoop />

      <LogoLoop />

      <section className="home-details"><div className="home-section-label"><span>03</span><span>Keep in touch</span></div><div className="home-details-grid"><div><p className="home-eyebrow">THE CONVERSATION CONTINUES</p><h2>Stay close<br />to the <em>ideas.</em></h2><p>Speaker announcements, registration updates, and stories from the BITS Hyderabad community.</p></div><div className="home-socials">{socials.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label}<span>↗</span></a>)}</div></div></section>

      <section className="home-final"><p className="home-eyebrow">THE FINAL WORD</p><h2>The stage<br /><em>is waiting.</em></h2><Link className="home-button home-button-outline" href="/faq">Register interest <span>↗</span></Link></section>
    </div>
  );
}

