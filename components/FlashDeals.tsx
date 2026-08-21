"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { PRODUCTS } from "@/data/products";
import {
  Clock,
  ShoppingBag,
  Eye,
  Heart,
  Star,
  Zap,
} from "lucide-react";

export function FlashDeals() {
  const {
    products,
    addToCart,
    openQuickView,
    toggleWishlist,
    isInWishlist,
    formatPrice,
  } = useShop();

  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 19,
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
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

<<<<<<< HEAD
  const flashProducts = products.filter((p) => p.isFlashDeal);
=======
  const flashProducts = PRODUCTS.filter((p) => p.isFlashDeal).slice(0, 3);
>>>>>>> 113c4554795eef8ca5397910adfb72efd4561b0a

  return (
    <section id="flash-deals" className="py-16 sm:py-24 bg-zinc-50 dark:bg-black border-b border-zinc-200 dark:border-zinc-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Flash Sale Banner Header */}
        <div className="p-6 sm:p-10 rounded-3xl bg-zinc-900 dark:bg-zinc-950 text-white border border-zinc-800 shadow-xl mb-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-3 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black text-zinc-300 text-[10.5px] font-mono font-bold uppercase tracking-[0.2em] border border-zinc-800">
              <Zap className="w-3 h-3" />
              The Private Archive // Limited Drop
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight uppercase text-white">
              Limited Allocation Drops
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-lg">
              Priority concessions on bespoke titanium timepieces, spatial acoustic monitors, and artisan living objects.
            </p>
          </div>

          {/* Countdown Clock Box */}
          <div className="z-10 flex flex-col items-center md:items-end gap-2.5 shrink-0">
            <span className="text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-zinc-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Window Closes In:
            </span>
            <div className="flex items-center gap-2 font-mono">
              <div className="flex flex-col items-center bg-black border border-zinc-800 px-4 py-2.5 rounded-2xl min-w-[62px] shadow-inner">
                <span className="text-2xl sm:text-3xl font-black text-white">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-[9px] text-zinc-400 uppercase tracking-wider font-bold">Hours</span>
              </div>
              <span className="text-2xl font-bold text-zinc-600">:</span>
              <div className="flex flex-col items-center bg-black border border-zinc-800 px-4 py-2.5 rounded-2xl min-w-[62px] shadow-inner">
                <span className="text-2xl sm:text-3xl font-black text-white">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-[9px] text-zinc-400 uppercase tracking-wider font-bold">Mins</span>
              </div>
              <span className="text-2xl font-bold text-zinc-600">:</span>
              <div className="flex flex-col items-center bg-black border border-zinc-800 px-4 py-2.5 rounded-2xl min-w-[62px] shadow-inner">
                <span className="text-2xl sm:text-3xl font-black text-white">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="text-[9px] text-zinc-400 uppercase tracking-wider">Secs</span>
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

            const claimedPct = Math.min(
              94,
              Math.max(68, 100 - product.stockCount * 3)
            );

            return (
              <div
                key={product.id}
                className="group relative bg-white dark:bg-zinc-950 rounded-3xl p-5 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Frame */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-black mb-4">
                  <Link href={`/products/${product.id}`} className="block relative w-full h-full">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </Link>

                  {/* Discount Badge */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-xl bg-black/90 text-white border border-zinc-800 text-[10px] font-mono font-bold tracking-wider uppercase shadow-md">
                      -{discount}% CONCESSION
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all shadow-sm z-10 cursor-pointer ${
                      inWish
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-white/80 dark:bg-black/80 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                    }`}
                    aria-label="Toggle Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${inWish ? "fill-current" : ""}`}
                    />
                  </button>

                  {/* Quick Action Overlay */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <button
                      onClick={() => openQuickView(product)}
                      className="w-full py-2.5 rounded-xl bg-black/90 dark:bg-white/95 text-white dark:text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 backdrop-blur-md shadow-xl cursor-pointer"
                    >
                      <Eye className="w-4 h-4" /> Quick Preview
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-1.5">
                      <span className="uppercase tracking-[0.18em] text-zinc-400 text-[10px] font-bold">
                        {product.brand}
                      </span>
                      <div className="flex items-center gap-1 text-black dark:text-white font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-black dark:fill-white text-black dark:text-white" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <Link
                      href={`/products/${product.id}`}
                      className="font-bold text-black dark:text-white text-base tracking-tight leading-snug line-clamp-1 hover:text-zinc-500 transition-colors"
                    >
                      {product.name}
                    </Link>
                  </div>

                  {/* Stock Claimed Progress Meter */}
                  <div className="space-y-1.5 pt-1 font-mono text-xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-zinc-500">Claimed: {claimedPct}%</span>
                      <span className="text-black dark:text-white font-bold">
                        Only {product.stockCount} Left in Vault
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-black dark:bg-white rounded-full transition-all duration-500"
                        style={{ width: `${claimedPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Price & Add to Cart Button */}
                  <div className="pt-3 flex items-center justify-between gap-2 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex flex-col font-mono">
                      <span className="text-lg font-black text-black dark:text-white">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-zinc-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-4 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-bold font-mono text-xs uppercase tracking-[0.12em] flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
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
