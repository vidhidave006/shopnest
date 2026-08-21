"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Shield, Cpu, Leaf, ArrowRight, Layers } from "lucide-react";

export function BrandStory() {
  const pillars = [
    {
      icon: Cpu,
      title: "Aerospace Metallurgy",
      desc: "Grade-5 titanium chassis CNC-milled with microscopic tolerances for timeless resilience.",
    },
    {
      icon: Layers,
      title: "Acoustic Fidelity",
      desc: "Custom beryllium dynamic drivers calibrated for distortion-free, lossless sound reproduction.",
    },
    {
      icon: Leaf,
      title: "Zero Waste Crating",
      desc: "100% biodegradable unbleached molded pulp cases, soybean inks, and recycled foam.",
    },
    {
      icon: Shield,
      title: "Concierge Stewardship",
      desc: "2-year comprehensive global coverage with direct atelier repair and component exchange.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-zinc-50/50 dark:bg-black border-b border-zinc-200 dark:border-zinc-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          {/* Left Column: Image Framing */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900">
              <Image
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1000&auto=format&fit=crop&q=80"
                alt="ShopNest Craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              
              {/* Bottom Seal */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9.5px] font-mono uppercase tracking-[0.24em] text-zinc-400 font-bold">
                    ATELIER REGISTRY NO. 028
                  </span>
                  <span className="text-white text-xs">•</span>
                </div>
                <p className="text-xs font-bold text-black dark:text-white tracking-tight">
                  Individually calibrated in small studio batches with laser-engraved serials.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Story Manifesto & 4 Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-200 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-[10.5px] font-mono font-bold uppercase tracking-[0.2em] mb-3 border border-zinc-300 dark:border-zinc-800">
                <Layers className="w-3 h-3" /> The Design Manifesto
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-black dark:text-white leading-tight">
                Reduction to the <br />
                <span className="platinum-gradient-text">Essential Truth.</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed">
                We design with an uncompromising philosophy: that everyday instruments must be stripped of superfluous visual noise, built from tactile industrial materials, and crafted to outlive transient trends.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2 transition-all duration-300 shadow-xs"
                  >
                    <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-black dark:text-white border border-zinc-200 dark:border-zinc-800">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider">
                      {p.title}
                    </h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-[0.16em] text-black dark:text-white hover:text-zinc-500 transition-colors"
              >
                <span>Examine Complete Design Manifesto</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
