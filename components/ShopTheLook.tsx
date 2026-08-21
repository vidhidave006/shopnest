"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LOOKBOOK_HOTSPOTS, PRODUCTS } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { ShoppingBag, Eye, Plus, X, Layers } from "lucide-react";

export function ShopTheLook() {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(
    LOOKBOOK_HOTSPOTS[0]?.id || null
  );
  const { addToCart, openQuickView, formatPrice } = useShop();

  return (
    <section id="shop-the-look" className="py-16 sm:py-24 bg-black text-white relative overflow-hidden border-b border-zinc-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 text-zinc-300 text-[10.5px] font-mono font-bold uppercase tracking-[0.2em] mb-3 border border-zinc-800">
              <Layers className="w-3 h-3" /> Spatial Showcase
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase">
              Curated Spaces // Shop The Scene
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl">
              Interact with the markers in our architectural suite to inspect and add individual interior pieces to your cart.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2.5 text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-2xl">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white font-bold">3 SPATIAL OBJECTS READY TO EXPLORE</span>
          </div>
        </div>

        {/* Interactive Scene Container */}
        <div className="relative w-full h-[420px] sm:h-[580px] rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-950">
          <Image
            src="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1600&auto=format&fit=crop&q=85"
            alt="Curated Minimal Workspace Lookbook"
            fill
            className="object-cover opacity-85"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/50 pointer-events-none" />

          {/* Hotspots */}
          {LOOKBOOK_HOTSPOTS.map((hotspot) => {
            const isActive = activeHotspotId === hotspot.id;
            const fullProduct = PRODUCTS.find((p) => p.id === hotspot.productId) || PRODUCTS[0];

            return (
              <div
                key={hotspot.id}
                style={{ top: `${hotspot.y}%`, left: `${hotspot.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                {/* Clean Trigger Button */}
                <button
                  onClick={() =>
                    setActiveHotspotId(isActive ? null : hotspot.id)
                  }
                  className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer ${
                    isActive
                      ? "bg-white text-black scale-110 ring-4 ring-white/30"
                      : "bg-black/90 text-white hover:scale-110 border border-zinc-700"
                  }`}
                  aria-label={`View ${hotspot.title}`}
                >
                  <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-25 pointer-events-none" />
                  {isActive ? (
                    <X className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <Plus className="w-4 h-4 stroke-[3]" />
                  )}
                </button>

                {/* Floating Hotspot Card */}
                {isActive && (
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 w-72 sm:w-80 bg-zinc-950/95 backdrop-blur-2xl text-white p-5 rounded-3xl shadow-2xl border border-zinc-700 z-30 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-black border border-zinc-800">
                        <Image
                          src={hotspot.image}
                          alt={hotspot.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9.5px] font-mono uppercase tracking-[0.2em] text-zinc-400 block">
                          {fullProduct.category}
                        </span>
                        <h4 className="text-xs font-bold text-white tracking-tight leading-snug truncate mt-0.5">
                          {hotspot.title}
                        </h4>
                        <p className="text-base font-black text-white font-mono mt-1">
                          {formatPrice(hotspot.price)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2.5 font-mono">
                      <button
                        onClick={() => {
                          if (fullProduct) addToCart(fullProduct, 1);
                        }}
                        className="py-2.5 px-3 rounded-xl bg-white hover:bg-zinc-200 text-black text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer active:scale-95"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add to Cart</span>
                      </button>
                      <button
                        onClick={() => {
                          if (fullProduct) openQuickView(fullProduct);
                        }}
                        className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-colors cursor-pointer active:scale-95"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Preview</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Bottom Scene Caption */}
          <div className="absolute bottom-6 left-6 right-6 hidden sm:flex items-center justify-between pointer-events-none">
            <div className="px-4 py-2.5 rounded-2xl bg-black/85 backdrop-blur-xl border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-2">
              <span>📍</span>
              <em>Sanctuary Series: Architectural Living &amp; Acoustic Suite</em>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white text-black text-xs font-mono font-black tracking-[0.16em] uppercase shadow-xl">
              SHOP THE ATELIER
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
