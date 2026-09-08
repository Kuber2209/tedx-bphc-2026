"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "motion/react";

interface ScrollVelocityContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollVelocityContainer({
  children,
  className = "",
}: ScrollVelocityContainerProps) {
  return (
    <div className={`relative flex w-full flex-col overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

interface ScrollVelocityRowProps {
  children: React.ReactNode;
  baseVelocity?: number;
  direction?: 1 | -1;
  className?: string;
  numCopies?: number;
}

// Wrap helper function
function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export function ScrollVelocityRow({
  children,
  baseVelocity = 5,
  direction = 1,
  className = "",
  numCopies = 4,
}: ScrollVelocityRowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // Transform baseX percentage with wrapping
  const x = useTransform(baseX, (v) => `${wrap(-100 / numCopies, 0, v)}%`);

  const directionFactor = useRef<number>(direction);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Speed up dynamically with page scroll
    if (velocityFactor.get() !== 0) {
      moveBy += directionFactor.current * moveBy * Math.abs(velocityFactor.get());
    }

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex flex-nowrap will-change-transform"
        style={{ x }}
      >
        {Array.from({ length: numCopies }).map((_, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default ScrollVelocityContainer;
