"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollReveal.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollRevealProps {
  children: string;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";
}

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.15,
  baseRotation = 1,
  blurStrength = 5,
  containerClassName = "",
  textClassName = "",
  start = "top 88%",
  end = "top 55%",
  scrub = 0.5,
  as: Component = "div",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const ctx = gsap.context(() => {
      if (baseRotation !== 0) {
        gsap.fromTo(
          el,
          { transformOrigin: "0% 50%", rotate: baseRotation },
          {
            ease: "none",
            rotate: 0,
            scrollTrigger: {
              trigger: el,
              scroller,
              start,
              end,
              scrub,
            },
          }
        );
      }

      const wordElements = el.querySelectorAll(".word");

      gsap.fromTo(
        wordElements,
        {
          opacity: baseOpacity,
          y: 6,
          willChange: "opacity, transform, filter",
        },
        {
          ease: "none",
          opacity: 1,
          y: 0,
          stagger: 0.03,
          scrollTrigger: {
            trigger: el,
            scroller,
            start,
            end,
            scrub,
          },
        }
      );

      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: "none",
            filter: "blur(0px)",
            stagger: 0.03,
            scrollTrigger: {
              trigger: el,
              scroller,
              start,
              end,
              scrub,
            },
          }
        );
      }
    }, el);

    return () => {
      ctx.revert();
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    blurStrength,
    start,
    end,
    scrub,
  ]);

  return (
    <Component
      ref={containerRef as unknown as React.RefObject<HTMLHeadingElement>}
      className={`scroll-reveal ${containerClassName}`}
    >
      <span className={`scroll-reveal-text ${textClassName}`}>{splitText}</span>
    </Component>
  );
}
