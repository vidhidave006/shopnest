"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LOOKBOOK_HOTSPOTS, PRODUCTS } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { ShoppingBag, Eye, Plus, Sparkles, X } from "lucide-react";

export function ShopTheLook() {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(
    LOOKBOOK_HOTSPOTS[0].id
  );
  const { addToCart, openQuickView, formatPrice } = useShop();

  return (
    <section id="shop-the-look" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Lookbook
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Curated Spaces: Shop The Scene
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Click on any pulsating hotspot on the lifestyle scene below to instantly inspect and shop individual pieces.
          </p>
        </div>

        {/* Interactive Scene Container */}
        <div className="relative w-full h-[450px] sm:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950">
          <Image
            src="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1600&auto=format&fit=crop&q=85"
            alt="Curated Minimal Workspace Lookbook"
            fill
            className="object-cover opacity-90"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

          {/* Hotspots */}
          {LOOKBOOK_HOTSPOTS.map((hotspot) => {
            const isActive = activeHotspotId === hotspot.id;
            const fullProduct = PRODUCTS.find((p) => p.id === hotspot.productId);

            return (
              <div
                key={hotspot.id}
                style={{ top: `${hotspot.y}%`, left: `${hotspot.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                {/* Pulsating Trigger Button */}
                <button
                  onClick={() =>
                    setActiveHotspotId(isActive ? null : hotspot.id)
                  }
                  className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
                    isActive
                      ? "bg-orange-500 text-white scale-110 ring-4 ring-orange-500/30"
                      : "bg-white/95 text-slate-900 hover:scale-110"
                  }`}
                  aria-label={`View ${hotspot.title}`}
                >
                  <span className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-40" />
                  {isActive ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4 font-black stroke-[3]" />
                  )}
                </button>

                {/* Floating Hotspot Product Preview Card */}
                {isActive && (
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 w-64 sm:w-72 bg-white/95 backdrop-blur-xl text-slate-900 p-4 rounded-2xl shadow-2xl border border-slate-200 z-30 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-100">
                        <Image
                          src={hotspot.image}
                          alt={hotspot.title}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 leading-snug truncate">
                          {hotspot.title}
                        </h4>
                        <p className="text-sm font-black text-orange-600 mt-0.5">
                          {formatPrice(hotspot.price)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          if (fullProduct) addToCart(fullProduct, 1);
                        }}
                        className="py-2 px-3 rounded-xl bg-slate-950 hover:bg-orange-600 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add to Bag</span>
                      </button>
                      <button
                        onClick={() => {
                          if (fullProduct) openQuickView(fullProduct);
                        }}
                        className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Details</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Bottom scene caption */}
          <div className="absolute bottom-6 left-6 right-6 hidden sm:flex items-center justify-between pointer-events-none">
            <div className="px-4 py-2 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs text-slate-300">
              📍 <em>Aura Living Series: Modern Architectural Desk & Audio Suite</em>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-orange-500/90 text-white text-xs font-bold shadow-lg">
              3 Items Tagged in Scene
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
