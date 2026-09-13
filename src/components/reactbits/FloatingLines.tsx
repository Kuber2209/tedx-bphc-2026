"use client";

import React, { useEffect, useRef } from "react";

interface FloatingLinesProps {
  color?: string;
}

export default function FloatingLines({ color = "#eb0028" }: FloatingLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lines: Line[] = [];

    const resize = () => {
      canvas.width = canvas.parentElement?.offsetWidth || canvas.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || canvas.offsetHeight || window.innerHeight;
      initLines();
    };

    class Line {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      width: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.length = Math.random() * 150 + 50;
        this.speed = Math.random() * 0.5 + 0.2;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.width = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.y -= this.speed;
        if (this.y + this.length < 0) {
          this.y = canvas!.height + this.length;
          this.x = Math.random() * canvas!.width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        
        const hex = color.replace('#', '');
        const r = parseInt(hex.length === 3 ? hex.substring(0, 1).repeat(2) : hex.substring(0, 2), 16) || 235;
        const g = parseInt(hex.length === 3 ? hex.substring(1, 2).repeat(2) : hex.substring(2, 4), 16) || 0;
        const b = parseInt(hex.length === 3 ? hex.substring(2, 3).repeat(2) : hex.substring(4, 6), 16) || 40;
        
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
        ctx.lineWidth = this.width;
        ctx.stroke();
      }
    }

    const initLines = () => {
      lines = [];
      const numLines = Math.floor(window.innerWidth / 15);
      for (let i = 0; i < numLines; i++) {
        lines.push(new Line());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      lines.forEach((line) => {
        line.update();
        line.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none w-full h-full"
      style={{ opacity: 0.8 }}
    />
  );
}
