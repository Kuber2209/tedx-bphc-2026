"use client";

import React from "react";
import Image from "next/image";
import DomeGallery from "@/components/gallery/DomeGallery";

// 20 gallery images as in /public/gallery/
const images = [
  { src: "/gallery/image1.jpg", alt: "TEDx Gallery Image 1" },
  { src: "/gallery/image2.jpg", alt: "TEDx Gallery Image 2" },
  { src: "/gallery/image3.jpg", alt: "TEDx Gallery Image 3" },
  { src: "/gallery/image4.jpg", alt: "TEDx Gallery Image 4" },
  { src: "/gallery/image5.jpg", alt: "TEDx Gallery Image 5" },
  { src: "/gallery/image6.jpg", alt: "TEDx Gallery Image 6" },
  { src: "/gallery/image7.jpg", alt: "TEDx Gallery Image 7" },
  { src: "/gallery/image8.jpg", alt: "TEDx Gallery Image 8" },
  { src: "/gallery/image9.jpg", alt: "TEDx Gallery Image 9" },
  { src: "/gallery/image10.jpg", alt: "TEDx Gallery Image 10" },
  { src: "/gallery/image11.jpg", alt: "TEDx Gallery Image 11" },
  { src: "/gallery/image12.jpg", alt: "TEDx Gallery Image 12" },
  { src: "/gallery/image13.jpg", alt: "TEDx Gallery Image 13" },
  { src: "/gallery/image14.jpg", alt: "TEDx Gallery Image 14" },
  { src: "/gallery/image15.jpg", alt: "TEDx Gallery Image 15" },
  { src: "/gallery/image16.jpg", alt: "TEDx Gallery Image 16" },
  { src: "/gallery/image17.jpg", alt: "TEDx Gallery Image 17" },
  { src: "/gallery/image18.jpg", alt: "TEDx Gallery Image 18" },
  { src: "/gallery/image19.jpg", alt: "TEDx Gallery Image 19" },
  { src: "/gallery/image20.jpg", alt: "TEDx Gallery Image 20" },
];

export default function GalleryPage() {
  return (
    <div className="gallery-page">
      <section className="gallery-dome-hero" aria-labelledby="gallery-title">
        <div className="gallery-dome-copy"><span>TEDx BPHC / 2026</span><h1 id="gallery-title">The archive<br /><em>in motion.</em></h1><p>Moments, people, and ideas from the rooms we have built together.</p></div>
        <DomeGallery images={images} grayscale={false} />
        <a className="gallery-archive-cta" href="#gallery-archive">View all images <span>↓</span></a>
      </section>
      <section id="gallery-archive" className="gallery-archive"><div className="gallery-archive-head"><div><span>01 / EVENT ARCHIVE</span><h2>Gallery</h2></div><p>2026 moments from TEDx BITS Hyderabad.</p></div><div className="gallery-archive-grid">{images.map((image, index) => <a href={image.src} target="_blank" rel="noreferrer" className="gallery-archive-item" key={image.src}><Image src={image.src} alt={image.alt} width={900} height={1100} loading="lazy" /><span>{String(index + 1).padStart(2, "0")} / 2026</span></a>)}</div></section>
    </div>
  );
}
