"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ThreadNode {
  anchorX: number; // 0 to 1 relative
  anchorY: number; // 0 to 1 relative
  driftRadiusX: number;
  driftRadiusY: number;
  speedX: number;
  speedY: number;
  phaseX: number;
  phaseY: number;
  radius: number;
  isFocal?: boolean;
}

export default function InvisibleThreadsCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const { scrollY } = useScroll();
  // Fades out cleanly as the user scrolls down, ensuring all content below is crystal clear
  const opacity = useTransform(scrollY, [0, 220], [1, 0]);
  const translateY = useTransform(scrollY, [0, 220], [0, -20]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Mouse tracking within container bounds
    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      if (mx >= -40 && mx <= rect.width + 40 && my >= -40 && my <= rect.height + 40) {
        mouseRef.current = { x: mx, y: my, active: true };
      } else {
        mouseRef.current.active = false;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Deterministic constellation: 7 nodes behind text, 5 in transition, 10 in wide right space
    const nodes: ThreadNode[] = [
      // Left Cluster (behind / wrapping "Invisible threads." headline)
      { anchorX: 0.06, anchorY: 0.28, driftRadiusX: 18, driftRadiusY: 14, speedX: 0.0011, speedY: 0.0009, phaseX: 0.4, phaseY: 1.2, radius: 2.5 },
      { anchorX: 0.14, anchorY: 0.65, driftRadiusX: 22, driftRadiusY: 16, speedX: 0.0008, speedY: 0.0012, phaseX: 1.8, phaseY: 2.5, radius: 3.0 },
      { anchorX: 0.22, anchorY: 0.22, driftRadiusX: 16, driftRadiusY: 20, speedX: 0.0013, speedY: 0.0008, phaseX: 3.1, phaseY: 0.6, radius: 2.5 },
      { anchorX: 0.28, anchorY: 0.72, driftRadiusX: 24, driftRadiusY: 18, speedX: 0.0009, speedY: 0.0011, phaseX: 0.9, phaseY: 3.8, radius: 3.2 },
      { anchorX: 0.35, anchorY: 0.35, driftRadiusX: 20, driftRadiusY: 22, speedX: 0.0012, speedY: 0.0010, phaseX: 2.2, phaseY: 1.9, radius: 2.8 },
      { anchorX: 0.18, anchorY: 0.88, driftRadiusX: 15, driftRadiusY: 12, speedX: 0.0010, speedY: 0.0014, phaseX: 4.0, phaseY: 2.1, radius: 2.2 },
      { anchorX: 0.32, anchorY: 0.15, driftRadiusX: 20, driftRadiusY: 15, speedX: 0.0007, speedY: 0.0011, phaseX: 1.5, phaseY: 4.4, radius: 2.6 },

      // Middle Transition Bridge
      { anchorX: 0.44, anchorY: 0.52, driftRadiusX: 25, driftRadiusY: 20, speedX: 0.0010, speedY: 0.0009, phaseX: 2.8, phaseY: 0.3, radius: 3.5, isFocal: true },
      { anchorX: 0.48, anchorY: 0.25, driftRadiusX: 22, driftRadiusY: 18, speedX: 0.0012, speedY: 0.0013, phaseX: 0.6, phaseY: 2.9, radius: 2.8 },
      { anchorX: 0.52, anchorY: 0.78, driftRadiusX: 18, driftRadiusY: 22, speedX: 0.0009, speedY: 0.0008, phaseX: 3.4, phaseY: 1.7, radius: 2.6 },
      { anchorX: 0.56, anchorY: 0.40, driftRadiusX: 26, driftRadiusY: 16, speedX: 0.0011, speedY: 0.0012, phaseX: 1.9, phaseY: 3.5, radius: 3.0 },
      { anchorX: 0.60, anchorY: 0.68, driftRadiusX: 20, driftRadiusY: 24, speedX: 0.0008, speedY: 0.0010, phaseX: 4.2, phaseY: 0.8, radius: 2.5 },

      // Prominent Right Open Space Constellation
      { anchorX: 0.68, anchorY: 0.28, driftRadiusX: 28, driftRadiusY: 20, speedX: 0.0010, speedY: 0.0012, phaseX: 0.7, phaseY: 2.4, radius: 3.8, isFocal: true },
      { anchorX: 0.72, anchorY: 0.60, driftRadiusX: 24, driftRadiusY: 22, speedX: 0.0012, speedY: 0.0009, phaseX: 2.5, phaseY: 1.1, radius: 3.2 },
      { anchorX: 0.78, anchorY: 0.38, driftRadiusX: 30, driftRadiusY: 25, speedX: 0.0009, speedY: 0.0011, phaseX: 3.8, phaseY: 4.1, radius: 4.0, isFocal: true },
      { anchorX: 0.82, anchorY: 0.75, driftRadiusX: 22, driftRadiusY: 18, speedX: 0.0011, speedY: 0.0013, phaseX: 1.2, phaseY: 0.5, radius: 2.8 },
      { anchorX: 0.86, anchorY: 0.22, driftRadiusX: 20, driftRadiusY: 20, speedX: 0.0008, speedY: 0.0010, phaseX: 4.5, phaseY: 2.8, radius: 3.0 },
      { anchorX: 0.89, anchorY: 0.52, driftRadiusX: 26, driftRadiusY: 22, speedX: 0.0013, speedY: 0.0008, phaseX: 0.3, phaseY: 3.3, radius: 3.4 },
      { anchorX: 0.93, anchorY: 0.34, driftRadiusX: 18, driftRadiusY: 16, speedX: 0.0010, speedY: 0.0012, phaseX: 2.1, phaseY: 1.4, radius: 2.6 },
      { anchorX: 0.95, anchorY: 0.68, driftRadiusX: 20, driftRadiusY: 18, speedX: 0.0009, speedY: 0.0011, phaseX: 3.6, phaseY: 4.7, radius: 2.4 },
    ];

    const startTime = performance.now();

    const render = (currentTime: number) => {
      // Pause updates when scrolled past hero threshold for 0 CPU overhead
      if (window.scrollY > 250) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const elapsed = currentTime - startTime;
      ctx.clearRect(0, 0, width, height);

      const m = mouseRef.current;

      // Compute current animated positions for all nodes
      const computedPositions = nodes.map((node) => {
        let x = width * node.anchorX + Math.sin(elapsed * node.speedX + node.phaseX) * node.driftRadiusX;
        let y = height * node.anchorY + Math.cos(elapsed * node.speedY + node.phaseY) * node.driftRadiusY;

        // Interactive elastic mouse pull
        if (m.active) {
          const mdx = m.x - x;
          const mdy = m.y - y;
          const mdist = Math.hypot(mdx, mdy);
          if (mdist < 190 && mdist > 10) {
            const force = ((190 - mdist) / 190) * 22;
            x += (mdx / mdist) * force;
            y += (mdy / mdist) * force;
          }
        }

        return { x, y, radius: node.radius, isFocal: node.isFocal };
      });

      // 1. TRIANGULAR MESH FILLS BETWEEN CLOSEST NODES (Subtle crimson depth)
      const maxMeshDist = Math.min(width * 0.16, 170);
      for (let i = 0; i < computedPositions.length; i++) {
        for (let j = i + 1; j < computedPositions.length; j++) {
          const d1 = Math.hypot(computedPositions[i].x - computedPositions[j].x, computedPositions[i].y - computedPositions[j].y);
          if (d1 < maxMeshDist) {
            for (let k = j + 1; k < computedPositions.length; k++) {
              const d2 = Math.hypot(computedPositions[j].x - computedPositions[k].x, computedPositions[j].y - computedPositions[k].y);
              const d3 = Math.hypot(computedPositions[i].x - computedPositions[k].x, computedPositions[i].y - computedPositions[k].y);

              if (d2 < maxMeshDist && d3 < maxMeshDist) {
                ctx.beginPath();
                ctx.moveTo(computedPositions[i].x, computedPositions[i].y);
                ctx.lineTo(computedPositions[j].x, computedPositions[j].y);
                ctx.lineTo(computedPositions[k].x, computedPositions[k].y);
                ctx.closePath();
                ctx.fillStyle = "rgba(235, 0, 40, 0.035)";
                ctx.fill();
              }
            }
          }
        }
      }

      // 2. CONNECTING THREAD FILAMENTS BETWEEN NODES
      const maxLineDist = Math.min(width * 0.19, 190);
      for (let i = 0; i < computedPositions.length; i++) {
        for (let j = i + 1; j < computedPositions.length; j++) {
          const dist = Math.hypot(computedPositions[i].x - computedPositions[j].x, computedPositions[i].y - computedPositions[j].y);

          if (dist < maxLineDist) {
            const alpha = (1 - dist / maxLineDist) * 0.55;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(235, 0, 40, ${alpha})`;
            ctx.lineWidth = 1.1;
            ctx.setLineDash([4, 5]);
            ctx.moveTo(computedPositions[i].x, computedPositions[i].y);
            ctx.lineTo(computedPositions[j].x, computedPositions[j].y);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }

      // 3. INTERACTIVE CURSOR CONNECTION THREADS
      if (m.active) {
        let cursorConnections = 0;
        for (let i = 0; i < computedPositions.length && cursorConnections < 5; i++) {
          const dist = Math.hypot(m.x - computedPositions[i].x, m.y - computedPositions[i].y);
          if (dist < 210) {
            const alpha = (1 - dist / 210) * 0.7;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(235, 0, 40, ${alpha})`;
            ctx.lineWidth = 1.4;
            ctx.setLineDash([3, 4]);
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(computedPositions[i].x, computedPositions[i].y);
            ctx.stroke();
            ctx.setLineDash([]);
            cursorConnections++;
          }
        }
      }

      // 4. FLOWING 7-STRAND HARMONIC WAVE RIBBON (Flows from behind text across the full right space)
      const RIBBON_STRANDS = 7;
      for (let s = 0; s < RIBBON_STRANDS; s++) {
        const strandOffset = (s - 3) * 8;
        const phaseShift = s * 0.25;

        const startX = 0;
        const startY = height * 0.45 + strandOffset;
        const endX = width;
        const endY = height * 0.48 - strandOffset;

        // Fluid undulating control points
        const cp1X = width * 0.32;
        let cp1Y =
          height * 0.18 +
          Math.sin(elapsed * 0.0013 + phaseShift) * 35 +
          strandOffset;

        const cp2X = width * 0.72;
        let cp2Y =
          height * 0.82 +
          Math.cos(elapsed * 0.0015 + phaseShift) * 38 -
          strandOffset;

        // Interactive mouse deflection on wave ribbon
        if (m.active) {
          const d1 = Math.hypot(m.x - cp1X, m.y - cp1Y);
          if (d1 < 220) {
            const factor = (1 - d1 / 220) * 32;
            cp1Y += m.y < cp1Y ? factor : -factor;
          }
          const d2 = Math.hypot(m.x - cp2X, m.y - cp2Y);
          if (d2 < 220) {
            const factor = (1 - d2 / 220) * 36;
            cp2Y += m.y < cp2Y ? factor : -factor;
          }
        }

        ctx.beginPath();
        // Central strand is bold and crisp; flanking strands create depth
        ctx.lineWidth = s === 3 ? 2.4 : 1.3;

        const ribbonGrad = ctx.createLinearGradient(startX, startY, endX, endY);
        ribbonGrad.addColorStop(0, "rgba(235, 0, 40, 0)");
        ribbonGrad.addColorStop(0.12, "rgba(235, 0, 40, 0.35)");
        ribbonGrad.addColorStop(0.48, "rgba(235, 0, 40, 0.8)"); // Vibrant behind & transitioning text
        ribbonGrad.addColorStop(0.78, "rgba(235, 0, 40, 0.85)"); // Peak visibility in right open space
        ribbonGrad.addColorStop(0.95, "rgba(235, 0, 40, 0.3)");
        ribbonGrad.addColorStop(1, "rgba(235, 0, 40, 0)");

        ctx.strokeStyle = ribbonGrad;
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
        ctx.stroke();
      }

      // Secondary counter-harmonic dashed filament
      const cCp1X = width * 0.38;
      const cCp1Y = height * 0.84 + Math.cos(elapsed * 0.0011) * 28;
      const cCp2X = width * 0.65;
      const cCp2Y = height * 0.16 + Math.sin(elapsed * 0.0014) * 30;

      ctx.beginPath();
      ctx.setLineDash([7, 6]);
      ctx.lineWidth = 1.3;
      const counterGrad = ctx.createLinearGradient(0, height * 0.7, width, height * 0.3);
      counterGrad.addColorStop(0, "rgba(113, 113, 122, 0)");
      counterGrad.addColorStop(0.25, "rgba(113, 113, 122, 0.3)");
      counterGrad.addColorStop(0.65, "rgba(235, 0, 40, 0.6)");
      counterGrad.addColorStop(1, "rgba(235, 0, 40, 0)");
      ctx.strokeStyle = counterGrad;
      ctx.moveTo(0, height * 0.7);
      ctx.bezierCurveTo(cCp1X, cCp1Y, cCp2X, cCp2Y, width, height * 0.3);
      ctx.stroke();
      ctx.setLineDash([]);

      // 5. DRAW GLOWING NODES (Crisp, luminescent, with distinct TED Red & white core)
      computedPositions.forEach((pos, idx) => {
        const pulse = 1 + Math.sin(elapsed * 0.0025 + idx * 0.5) * 0.35;
        const currentR = pos.radius * pulse;

        // Outer atmospheric pulse ring
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, currentR * 3.4, 0, Math.PI * 2);
        ctx.fillStyle = pos.isFocal ? "rgba(235, 0, 40, 0.14)" : "rgba(235, 0, 40, 0.07)";
        ctx.fill();

        // Secondary luminous corona
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, currentR * 1.9, 0, Math.PI * 2);
        ctx.fillStyle = pos.isFocal ? "rgba(235, 0, 40, 0.32)" : "rgba(235, 0, 40, 0.2)";
        ctx.fill();

        // Focal nodes have a subtle rotating orbit ring in the right space
        if (pos.isFocal) {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, currentR * 4.6, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(235, 0, 40, 0.28)";
          ctx.lineWidth = 0.9;
          ctx.setLineDash([3, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Solid TED Red core
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, currentR, 0, Math.PI * 2);
        ctx.fillStyle = "#eb0028";
        ctx.fill();

        // Specular white pinpoint highlight
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, currentR * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, y: translateY }}
      className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* The Interactive Threads Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />
    </motion.div>
  );
}

