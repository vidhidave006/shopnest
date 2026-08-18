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
    <div className="group relative bg-white dark:bg-zinc-900 rounded-2xl p-3 sm:p-4 border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-zinc-500 transition-all duration-300 flex flex-col justify-between">
      {/* Product Image */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 mb-3.5">
        <Link href={`/products/${product.id}`} className="block relative w-full h-full">
          <Image
            src={displayImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Monochrome Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isNew && (
            <span className="px-2 py-0.5 rounded bg-black dark:bg-white text-white dark:text-black text-[9px] font-mono font-black uppercase tracking-widest">
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-100 text-[9px] font-mono font-bold uppercase tracking-widest">
              POPULAR
            </span>
          )}
          {discount > 0 && (
            <span className="px-2 py-0.5 rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black text-[9px] font-mono font-bold">
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
          className={`absolute top-2.5 right-2.5 p-2 rounded-lg backdrop-blur-md transition-all z-10 ${
            inWish
              ? "bg-black dark:bg-white text-white dark:text-black"
              : "bg-white/80 dark:bg-black/80 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white"
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${inWish ? "fill-current" : ""}`} />
        </button>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-x-2.5 bottom-2.5 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
          <button
            onClick={() => openQuickView(product)}
            className="w-full py-2 rounded-lg bg-black/90 dark:bg-white/90 hover:bg-black dark:hover:bg-white text-white dark:text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 backdrop-blur-md shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono text-[10px]">
            <span className="uppercase tracking-widest">{product.brand}</span>
            <div className="flex items-center gap-1 text-zinc-900 dark:text-zinc-100 font-bold">
              <Star className="w-3 h-3 fill-current" />
              <span>{product.rating}</span>
            </div>
          </div>

          <Link
            href={`/products/${product.id}`}
            className="block font-bold text-black dark:text-white text-sm leading-snug line-clamp-1 mt-1 hover:underline"
          >
            {product.name}
          </Link>

          {/* Color swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c.name);
                  }}
                  title={c.name}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColor === c.name
                      ? "ring-2 ring-black dark:ring-white ring-offset-1 scale-110 border-white dark:border-black"
                      : "border-zinc-300 dark:border-zinc-700"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Price & Add Button */}
        <div className="pt-2 flex items-center justify-between gap-2 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex flex-col">
            <span className="text-sm font-black text-black dark:text-white font-mono">
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
            className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
