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
} from "lucide-react";

export function QuickViewModal() {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    setIsCheckoutOpen,
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
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={closeQuickView}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative bg-white dark:bg-zinc-950 text-black dark:text-white rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-3xl w-full overflow-hidden z-10 my-8">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer border border-zinc-200 dark:border-zinc-800"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Gallery */}
          <div className="p-6 bg-zinc-100/60 dark:bg-black/60 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black/40 border border-zinc-200 dark:border-zinc-800">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />

              {discount > 0 && (
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-xl bg-black text-white border border-zinc-700 font-mono text-[10px] font-bold uppercase tracking-wider shadow-lg">
                  -{discount}% CONCESSION
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-black dark:border-white ring-2 ring-zinc-400"
                        : "border-zinc-300 dark:border-zinc-700 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Config */}
          <div className="p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                <span className="uppercase tracking-[0.2em] text-zinc-400 text-[10px] font-bold">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-black dark:text-white font-bold">
                  <Star className="w-3.5 h-3.5 fill-black dark:fill-white text-black dark:text-white" />
                  <span>{product.rating}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                  {product.brand}
                </span>
                <h2 className="text-xl font-black text-black dark:text-white tracking-tight leading-tight mt-0.5">
                  {product.name}
                </h2>
              </div>

              <div className="flex items-baseline gap-2.5 font-mono">
                <span className="text-2xl font-black text-black dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-zinc-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-1.5 font-mono">
                  <span className="text-[11px] font-bold uppercase text-zinc-500">
                    Finish: <strong className="text-black dark:text-white font-normal">{selectedColor}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs transition-all cursor-pointer ${
                          selectedColor === c.name
                            ? "border-black dark:border-white bg-zinc-100 dark:bg-zinc-900 font-bold"
                            : "border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-zinc-400"
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/20"
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
                <div className="space-y-1.5 font-mono">
                  <span className="text-[11px] font-bold uppercase text-zinc-500">
                    Scale / Size: <strong className="text-black dark:text-white font-normal">{selectedSize}</strong>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                          selectedSize === sz
                            ? "bg-black text-white dark:bg-white dark:text-black border-transparent shadow-xs"
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
            <div className="space-y-2.5 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-xl p-0.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-mono font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 rounded-xl bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-mono font-black text-xs uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    inWish
                      ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-black dark:hover:text-white"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWish ? "fill-current" : ""}`} />
                </button>
              </div>

              <button
                onClick={handleInstantBuy}
                className="w-full py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-black dark:text-white font-mono font-bold text-xs uppercase tracking-[0.14em] transition-colors cursor-pointer border border-zinc-200 dark:border-zinc-800"
              >
                Direct Concierge Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
