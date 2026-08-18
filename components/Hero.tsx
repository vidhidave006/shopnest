"use client";

import React from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { PRODUCTS } from "@/data/products";
import { ArrowRight, ShoppingBag, Star, ShieldCheck } from "lucide-react";

export function Hero() {
  const { addToCart, formatPrice } = useShop();
  const featured = PRODUCTS[0]; // Studio Pro Wireless Headphones

  const scrollToProducts = () => {
    const el = document.getElementById("products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-black text-white py-14 sm:py-24 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Copy & Actions */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300 text-[11px] font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Collection 2026 / Edition 01
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.08] text-white">
              MONOCHROME <br />
              <span className="text-zinc-400 font-light">EXCELLENCE.</span>
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
              High-fidelity acoustics, titanium wearables, and minimal living essentials designed with pure restraint and exceptional craft.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={scrollToProducts}
                className="px-6 py-3.5 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => addToCart(featured, 1)}
                className="px-6 py-3.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buy Featured ({formatPrice(featured.price)})</span>
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs font-mono text-zinc-400 border-t border-zinc-800/80">
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-white fill-white" />
                <span>4.9 / 5.0 RATED</span>
              </div>
              <span className="text-zinc-600">|</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>GLOBAL FREE SHIPPING $75+</span>
              </div>
            </div>
          </div>

          {/* Right: Featured Hero Visual */}
          <div className="relative">
            <div className="relative aspect-square w-full max-w-md mx-auto rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group">
              <Image
                src={featured.images[0]}
                alt={featured.name}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 500px"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/90 backdrop-blur-md border border-zinc-800 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">
                    FLAGSHIP PICK
                  </span>
                  <h3 className="text-xs font-bold text-white truncate">
                    {featured.name}
                  </h3>
                  <p className="text-xs font-black text-white mt-0.5 font-mono">
                    {formatPrice(featured.price)}
                  </p>
                </div>

                <button
                  onClick={() => addToCart(featured, 1)}
                  className="px-3.5 py-2 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
