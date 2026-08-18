"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Star, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-black text-white py-20 sm:py-32 border-b border-zinc-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-700 bg-zinc-900/90 text-zinc-300 text-xs font-mono tracking-wider uppercase backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>Collection 2026 / Edition 01</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.06] text-white uppercase">
          MONOCHROME <br />
          <span className="text-zinc-400 font-light">EXCELLENCE.</span>
        </h1>

        {/* Hero Description */}
        <p className="text-zinc-400 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
          High-fidelity acoustics, titanium wearables, and minimal living essentials designed with pure restraint and exceptional craft.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/products"
            className="px-8 py-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-mono font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg hover:shadow-2xl hover:scale-[1.02]"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/products?category=Audio%20%26%20Tech"
            className="px-8 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-zinc-400" />
            <span>Discover Series</span>
          </Link>
        </div>

        {/* Rating & Trust Stats */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-6 text-xs font-mono text-zinc-400 border-t border-zinc-800/80 max-w-xl mx-auto">
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-white fill-white" />
            <span>4.9 / 5.0 RATED</span>
          </div>
          <span className="text-zinc-700 hidden sm:inline">&bull;</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>GLOBAL FREE SHIPPING $75+</span>
          </div>
          <span className="text-zinc-700 hidden sm:inline">&bull;</span>
          <div className="flex items-center gap-1.5">
            <span className="text-white font-bold">2-YEAR</span>
            <span>WARRANTY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
