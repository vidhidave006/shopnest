"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { PRODUCTS } from "@/data/products";
import {
  Flame,
  Clock,
  ShoppingBag,
  Eye,
  Heart,
  Star,
  Sparkles,
} from "lucide-react";

export function FlashDeals() {
  const {
    addToCart,
    openQuickView,
    toggleWishlist,
    isInWishlist,
    formatPrice,
  } = useShop();

  // 14 hours countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 }; // Reset loop
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashProducts = PRODUCTS.filter((p) => p.isFlashDeal);

  return (
    <section id="flash-deals" className="py-16 sm:py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flash Sale Banner Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-orange-950 text-white shadow-xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400 animate-pulse" />
              Limited-Time Flash Drop
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Summer Mid-Season Flash Sale
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              Get up to 25% extra savings on top-tier audio, titanium timepieces, and artisan mechanical gear before stock runs dry.
            </p>
          </div>

          {/* Countdown Clock Box */}
          <div className="z-10 flex flex-col items-center md:items-end gap-2 shrink-0">
            <span className="text-xs uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-orange-400" /> Ends In:
            </span>
            <div className="flex items-center gap-2 sm:gap-3 font-mono">
              <div className="flex flex-col items-center bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-2xl min-w-[58px]">
                <span className="text-xl sm:text-2xl font-black text-white">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-sans">Hrs</span>
              </div>
              <span className="text-2xl font-black text-orange-500">:</span>
              <div className="flex flex-col items-center bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-2xl min-w-[58px]">
                <span className="text-xl sm:text-2xl font-black text-white">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-sans">Min</span>
              </div>
              <span className="text-2xl font-black text-orange-500">:</span>
              <div className="flex flex-col items-center bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-2xl min-w-[58px]">
                <span className="text-xl sm:text-2xl font-black text-orange-400">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-sans">Sec</span>
              </div>
            </div>
          </div>
        </div>

        {/* Flash Deal Products Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {flashProducts.map((product) => {
            const inWish = isInWishlist(product.id);
            const discount = product.originalPrice
              ? Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )
              : product.flashDiscountPercent || 15;

            // Claimed percentage calculation for urgency
            const claimedPct = Math.min(
              95,
              Math.max(65, 100 - product.stockCount * 3)
            );

            return (
              <div
                key={product.id}
                className="group relative bg-slate-50 rounded-3xl p-4 border border-slate-200 hover:border-orange-300 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top badges */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white mb-4">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Discount Badge */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <span className="px-2.5 py-1 rounded-xl bg-orange-600 text-white text-xs font-black shadow-md flex items-center gap-1">
                      <Flame className="w-3 h-3 fill-white" /> -{discount}% OFF
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all shadow-sm ${
                      inWish
                        ? "bg-rose-500 text-white"
                        : "bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500"
                    }`}
                    aria-label="Toggle Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${inWish ? "fill-white" : ""}`}
                    />
                  </button>

                  {/* Quick Action Overlay on Image */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => openQuickView(product)}
                      className="w-full py-2.5 rounded-xl bg-slate-950/90 hover:bg-slate-950 text-white text-xs font-bold flex items-center justify-center gap-2 backdrop-blur-md shadow-lg transition-all hover:scale-[1.02]"
                    >
                      <Eye className="w-4 h-4" /> Quick Preview
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span className="font-semibold text-slate-600">
                        {product.brand}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-1 group-hover:text-orange-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {/* Stock Claimed Progress Meter */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-500">Claimed: {claimedPct}%</span>
                      <span className="text-orange-600 font-bold">
                        Only {product.stockCount} left
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${claimedPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Price & Add to Cart Button */}
                  <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-200/80">
                    <div className="flex flex-col">
                      <span className="text-lg font-black text-slate-950">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
