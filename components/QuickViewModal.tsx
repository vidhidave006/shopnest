"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import {
  X,
  Star,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  Check,
} from "lucide-react";

export function QuickViewModal() {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    setIsCartOpen,
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setActiveImageIndex(0);
      setSelectedColor(quickViewProduct.colors[0]?.name || "");
      setSelectedSize(
        quickViewProduct.sizes ? quickViewProduct.sizes[0] : ""
      );
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const inWish = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleInstantBuy = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    closeQuickView();
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={closeQuickView}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative bg-white dark:bg-zinc-950 text-black dark:text-white rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-3xl w-full overflow-hidden z-10">
        {/* Close */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Gallery */}
          <div className="p-6 bg-zinc-100 dark:bg-zinc-900 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-950">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />

              {discount > 0 && (
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black dark:bg-white text-white dark:text-black font-mono text-[10px] font-bold">
                  -{discount}% OFF
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border transition-all ${
                      activeImageIndex === idx
                        ? "border-black dark:border-white ring-1 ring-black dark:ring-white"
                        : "border-zinc-300 dark:border-zinc-700 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Config */}
          <div className="p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                <span className="uppercase tracking-widest">{product.category}</span>
                <div className="flex items-center gap-1 text-black dark:text-white font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{product.rating}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-400">
                  {product.brand}
                </span>
                <h2 className="text-xl font-black text-black dark:text-white leading-tight mt-0.5">
                  {product.name}
                </h2>
              </div>

              <div className="flex items-baseline gap-2 font-mono">
                <span className="text-2xl font-black text-black dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-zinc-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {product.description}
              </p>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase">
                    Color: <strong className="text-black dark:text-white">{selectedColor}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono transition-all ${
                          selectedColor === c.name
                            ? "border-black dark:border-white bg-zinc-100 dark:bg-zinc-900 font-bold"
                            : "border-zinc-200 dark:border-zinc-800 text-zinc-500"
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-zinc-400"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase">
                    Size: <strong className="text-black dark:text-white">{selectedSize}</strong>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-bold transition-all ${
                          selectedSize === sz
                            ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                            : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-lg p-0.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-zinc-400 hover:text-black dark:hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2.5 text-xs font-mono font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-zinc-400 hover:text-black dark:hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2.5 rounded-lg border transition-all ${
                    inWish
                      ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-black dark:hover:text-white"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWish ? "fill-current" : ""}`} />
                </button>
              </div>

              <button
                onClick={handleInstantBuy}
                className="w-full py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-black font-mono font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Instant Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
