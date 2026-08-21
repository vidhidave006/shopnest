"use client";

import React, { useEffect, useRef } from "react";

export function AdminAnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createNoisePattern();
    };

    window.addEventListener("resize", handleResize);

    // 1. Generate High-Fashion Micro Film Grain Pattern Canvas (Tileable)
    const patternSize = 180;
    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    const pCtx = patternCanvas.getContext("2d");

    const createNoisePattern = () => {
      if (!pCtx) return;
      const imgData = pCtx.createImageData(patternSize, patternSize);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        // High-precision monochromatic noise distribution
        const rand = Math.random();
        if (rand > 0.65) {
          // Subtle black/dark gray grain
          const shade = Math.floor(Math.random() * 40); // 0 to 40 (black / dark gray)
          const alpha = Math.floor((Math.random() * 0.08 + 0.02) * 255); // 2% to 10% opacity
          data[i] = shade;
          data[i + 1] = shade;
          data[i + 2] = shade;
          data[i + 3] = alpha;
        } else if (rand > 0.4) {
          // Very light gray grain
          const shade = Math.floor(Math.random() * 80 + 120);
          const alpha = Math.floor((Math.random() * 0.04 + 0.01) * 255);
          data[i] = shade;
          data[i + 1] = shade;
          data[i + 2] = shade;
          data[i + 3] = alpha;
        } else {
          // Transparent
          data[i + 3] = 0;
        }
      }
      pCtx.putImageData(imgData, 0, 0);
    };

    createNoisePattern();

    // 2. Tiny Floating Black/Gray Luxury Dust Particles
    const particleCount = 40;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 1.5 + 0.6, // 0.6px to 2.1px tiny specks
      alpha: Math.random() * 0.35 + 0.15, // 15% to 50% opacity
    }));

    let grainX = 0;
    let grainY = 0;
    let frameTick = 0;

    const render = () => {
      // 1. Crisp White Base with Subtle Light Gray Radial Vignette
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      // Soft light-gray luxury editorial aura (white → light gray → white)
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        width * 0.1,
        width * 0.5,
        height * 0.4,
        width * 0.75
      );
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.5, "rgba(244, 244, 246, 0.7)");
      grad.addColorStop(1, "rgba(255, 255, 255, 1)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      frameTick++;

      // 2. Slow Moving Film Grain Shift
      // Jitter grain slowly every 2-3 frames for authentic premium editorial film texture
      if (frameTick % 2 === 0) {
        grainX = (Math.random() - 0.5) * patternSize;
        grainY = (Math.random() - 0.5) * patternSize;
      }

      ctx.save();
      ctx.translate(grainX, grainY);
      const pattern = ctx.createPattern(patternCanvas, "repeat");
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(-patternSize, -patternSize, width + patternSize * 2, height + patternSize * 2);
      }
      ctx.restore();

      // 3. Tiny Black/Gray Micro Particles slowly drifting
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;
        if (p.y < -5) p.y = height + 5;
        if (p.y > height + 5) p.y = -5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(24, 24, 27, ${p.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-white"
    >
      {/* Moving Grain Canvas Engine */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Very Subtle Ambient Lighting Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/40" />
    </div>
  );
}
