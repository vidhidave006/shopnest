"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/shop";
import { useShop } from "@/context/ShopContext";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const {
    addToCart,
    openQuickView,
    toggleWishlist,
    isInWishlist,
    formatPrice,
  } = useShop();

  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || ""
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const inWish = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const displayImage =
    product.images[currentImageIndex] || product.images[0];

  return (
    <div className="group relative bg-white dark:bg-zinc-950 rounded-3xl p-4 sm:p-5 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 flex flex-col justify-between shadow-xs luxury-card">
      {/* Product Image Frame */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-black mb-4">
        <Link href={`/products/${product.id}`} className="block relative w-full h-full">
          <Image
            src={displayImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isNew && (
            <span className="px-2.5 py-0.5 rounded-lg bg-black text-white border border-zinc-700 text-[9px] font-mono font-bold uppercase tracking-[0.16em] shadow-md">
              NEW DROP
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-0.5 rounded-lg bg-zinc-900 text-zinc-300 text-[9px] font-mono font-bold uppercase tracking-[0.16em] shadow-md border border-zinc-700">
              SIGNATURE
            </span>
          )}
          {discount > 0 && (
            <span className="px-2.5 py-0.5 rounded-lg bg-black text-white text-[9px] font-mono font-black tracking-wider shadow-md border border-zinc-700">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all z-10 cursor-pointer shadow-sm ${
            inWish
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "bg-white/80 dark:bg-black/80 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white"
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${inWish ? "fill-current" : ""}`} />
        </button>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={() => openQuickView(product)}
            className="w-full py-2.5 rounded-xl bg-black/90 dark:bg-white/95 text-white dark:text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 backdrop-blur-md shadow-xl cursor-pointer luxury-btn-shine"
          >
            <Eye className="w-3.5 h-3.5" /> Quick Preview
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-1">
            <span className="uppercase tracking-[0.16em] text-zinc-400 text-[10px] font-bold">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-black dark:text-white font-bold text-xs">
              <Star className="w-3 h-3 fill-black dark:fill-white text-black dark:text-white" />
              <span>{product.rating}</span>
            </div>
          </div>

          <Link
            href={`/products/${product.id}`}
            className="block font-bold text-black dark:text-white text-sm tracking-tight leading-snug line-clamp-1 hover:text-zinc-500 transition-colors"
          >
            {product.name}
          </Link>

          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c.name);
                  }}
                  title={c.name}
                  className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                    selectedColor === c.name
                      ? "ring-2 ring-black dark:ring-white scale-110 border-white dark:border-black"
                      : "border-zinc-300 dark:border-zinc-700 opacity-60 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Price & Add Button */}
        <div className="pt-3 flex items-center justify-between gap-2 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-black text-black dark:text-white font-mono">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-zinc-400 line-through font-mono">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() =>
              addToCart(
                product,
                1,
                selectedColor,
                product.sizes ? product.sizes[0] : undefined
              )
            }
            className="px-3.5 py-2 rounded-xl bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black text-xs font-bold font-mono uppercase tracking-[0.1em] flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95 luxury-btn-shine"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
