"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { PRODUCTS } from "@/data/products";
import {
  ArrowRight,
  Star,
  ShieldCheck,
  ShoppingBag,
  Eye,
  ChevronLeft,
  ChevronRight,
  Zap,
  Sparkles,
} from "lucide-react";

export function Hero() {
  const { addToCart, openQuickView, formatPrice } = useShop();

  const heroProducts = [
    PRODUCTS[0], // Aura Studio Pro Wireless ANC Headphones
    PRODUCTS[1], // Lumina Apex Smartwatch Ultra
    PRODUCTS[4] || PRODUCTS[2], // Minimalist Everyday Backpack
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    heroProducts[0]?.colors[0]?.name || "Standard"
  );
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentProduct = heroProducts[activeIndex] || PRODUCTS[0];

  useEffect(() => {
    setSelectedColor(currentProduct.colors[0]?.name || "Standard");
  }, [activeIndex, currentProduct]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroProducts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, heroProducts.length]);

  return (
    <section
      className="relative bg-black text-white overflow-hidden border-b border-zinc-900 transition-colors"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-24 lg:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            {/* Minimal Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/90 text-zinc-300 text-[11px] font-mono tracking-[0.2em] uppercase backdrop-blur-xl shadow-sm">
              <span>SERIES 01 ARCHIVE</span>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <span className="hidden sm:inline text-zinc-400">EDITION 2026</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-[0.26em] uppercase text-zinc-400 block font-bold">
                THE ART OF PURIFIED ACOUSTICS &amp; DESIGN
              </span>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.04] uppercase text-white">
                REFINED <br />
                <span className="platinum-gradient-text">
                  SOPHISTICATION.
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              High-fidelity acoustic monitors, aerospace titanium wearables, and minimalist living essentials crafted with uncompromised precision.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/products"
                className="px-8 py-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-mono font-black uppercase tracking-[0.16em] flex items-center gap-2.5 transition-all shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer luxury-btn-shine"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => openQuickView(currentProduct)}
                className="px-7 py-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 text-xs font-mono font-bold uppercase tracking-[0.14em] transition-all flex items-center gap-2 backdrop-blur-md cursor-pointer active:scale-95 shadow-sm hover:border-zinc-600"
              >
                <Eye className="w-4 h-4 text-zinc-400" />
                <span>Inspect Object</span>
              </button>
            </div>

            {/* Product Switcher Gallery Indicators */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-2.5">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mr-1">
                EXHIBIT:
              </span>
              {heroProducts.map((prod, idx) => (
                <button
                  key={prod.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-8 px-3.5 rounded-lg text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeIndex === idx
                      ? "bg-zinc-800 text-white border border-zinc-500 shadow-xs scale-105"
                      : "bg-zinc-950 text-zinc-500 hover:text-zinc-300 border border-zinc-900 hover:border-zinc-800"
                  }`}
                >
                  <span className="text-zinc-300">0{idx + 1}</span>
                  <span className="hidden sm:inline font-normal truncate max-w-[110px]">
                    {prod.brand}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Spotlight Product Glass Card */}
          <div className="lg:col-span-5 relative">
            {/* Ambient backlight glow */}
            <div className="absolute -inset-6 bg-gradient-to-tr from-white/15 via-zinc-400/10 to-transparent rounded-3xl blur-3xl animate-ambient-glow pointer-events-none" />

            <div className="relative bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 hover:border-zinc-700 rounded-3xl p-6 shadow-2xl transition-all duration-500 group animate-luxury-float">
              {/* Top Banner inside card */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-zinc-900 text-zinc-300 text-[10px] font-mono font-bold uppercase tracking-widest border border-zinc-800 flex items-center gap-1.5 animate-halo">
                  <Sparkles className="w-3 h-3 text-white" />
                  <span>Curated Highlight</span>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() =>
                      setActiveIndex(
                        (prev) => (prev - 1 + heroProducts.length) % heroProducts.length
                      )
                    }
                    className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors cursor-pointer border border-zinc-800 hover:border-zinc-700"
                    aria-label="Previous Spotlight"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveIndex((prev) => (prev + 1) % heroProducts.length)
                    }
                    className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors cursor-pointer border border-zinc-800 hover:border-zinc-700"
                    aria-label="Next Spotlight"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product Image Frame */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black border border-zinc-900 mb-5">
                <Link href={`/products/${currentProduct.id}`} className="block relative w-full h-full">
                  <Image
                    src={currentProduct.images[0]}
                    alt={currentProduct.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                    sizes="(max-width: 1024px) 100vw, 420px"
                  />
                </Link>

                {/* Rating Badge Overlay */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-xl bg-black/85 backdrop-blur-md border border-zinc-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg">
                  <Star className="w-3.5 h-3.5 fill-white text-white" />
                  <span>{currentProduct.rating}</span>
                </div>

                {/* In stock badge */}
                <div className="absolute bottom-3.5 left-3.5 px-3 py-1 rounded-xl bg-black/90 backdrop-blur-md border border-zinc-800 text-zinc-300 text-[10px] font-mono tracking-wider">
                  {currentProduct.stockCount} Pieces Available
                </div>
              </div>

              {/* Info & Price */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="uppercase tracking-[0.2em] text-zinc-400 text-[10px] font-bold">
                    {currentProduct.category}
                  </span>
                  <span className="text-zinc-500">
                    {currentProduct.brand}
                  </span>
                </div>

                <Link
                  href={`/products/${currentProduct.id}`}
                  className="block text-lg font-bold text-white leading-snug hover:text-zinc-300 transition-colors truncate tracking-tight"
                >
                  {currentProduct.name}
                </Link>

                {/* Color Swatches */}
                {currentProduct.colors && currentProduct.colors.length > 0 && (
                  <div className="flex items-center gap-2 pt-1 font-mono">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider">
                      Finish:
                    </span>
                    <div className="flex items-center gap-2">
                      {currentProduct.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          title={c.name}
                          className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                            selectedColor === c.name
                              ? "ring-2 ring-white scale-110 border-black"
                              : "border-zinc-700 opacity-60 hover:opacity-100"
                          }`}
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-zinc-300 ml-1">
                      {selectedColor}
                    </span>
                  </div>
                )}

                {/* Price & Add to Cart Button */}
                <div className="pt-3.5 border-t border-zinc-900 flex items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-white font-mono">
                      {formatPrice(currentProduct.price)}
                    </span>
                    {currentProduct.originalPrice && (
                      <span className="text-xs text-zinc-500 line-through font-mono">
                        {formatPrice(currentProduct.originalPrice)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      addToCart(
                        currentProduct,
                        1,
                        selectedColor,
                        currentProduct.sizes ? currentProduct.sizes[0] : undefined
                      )
                    }
                    className="flex-1 py-3 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-mono font-black uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer luxury-btn-shine"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rating & Trust Stats Bar */}
        <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-6 text-xs font-mono tracking-wider text-zinc-400">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-white fill-white" />
            <span className="text-white font-bold">4.92 / 5.0 RATED</span>
            <span className="text-zinc-500">OVER 3,800+ PATRONS</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-zinc-300" />
            <span>2-YEAR COMPREHENSIVE WARRANTY</span>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-zinc-300" />
            <span>CARBON-NEUTRAL DISPATCH</span>
          </div>
        </div>
      </div>
    </section>
  );
}
