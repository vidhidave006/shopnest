"use client";

import React, { useEffect, useRef } from "react";
import { useShop } from "@/context/ShopContext";

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  density: number;
  speedY: number;
  speedX: number;
  opacity: number;
  wind: number;
  swaySpeed: number;
  swayOffset: number;
}

export function SnowfallBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useShop();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive flake count
    const flakeCount = Math.min(80, Math.floor((width * height) / 18000));
    const flakes: Snowflake[] = [];

    const createFlake = (initialY = false): Snowflake => {
      const radius = Math.random() * 2.2 + 0.8;
      return {
        x: Math.random() * width,
        y: initialY ? Math.random() * height : -10,
        radius,
        density: Math.random() * flakeCount,
        speedY: Math.random() * 1.2 + 0.5 + radius * 0.25,
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.55 + 0.25,
        wind: 0,
        swaySpeed: Math.random() * 0.02 + 0.008,
        swayOffset: Math.random() * Math.PI * 2,
      };
    };

    for (let i = 0; i < flakeCount; i++) {
      flakes.push(createFlake(true));
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.01;

      const isDark =
        theme === "dark" ||
        document.documentElement.classList.contains("dark") ||
        true;

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];

        // Update sway & vertical fall
        f.swayOffset += f.swaySpeed;
        f.x += Math.sin(f.swayOffset) * 0.6 + f.speedX;
        f.y += f.speedY;

        // Draw soft snowflake with radial blur / glow
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2, false);

        if (isDark) {
          ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
          ctx.shadowBlur = f.radius > 1.8 ? 6 : 2;
          ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
        } else {
          ctx.fillStyle = `rgba(100, 116, 139, ${f.opacity * 0.6})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();

        // Recycle flake when off-screen
        if (f.y > height + 10 || f.x < -20 || f.x > width + 20) {
          flakes[i] = createFlake(false);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] opacity-75 dark:opacity-85 mix-blend-screen transition-opacity duration-500"
    />
  );
}
