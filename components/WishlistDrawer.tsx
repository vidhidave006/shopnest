"use client";

import React from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";

export function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    formatPrice,
    openQuickView,
  } = useShop();

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1);
    toggleWishlist(product);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-zinc-950 text-black dark:text-white border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider">
                Wishlist ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length > 0 ? (
              <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
                {wishlist.map((product) => (
                  <div key={product.id} className="py-4 first:pt-0 flex gap-4">
                    <div
                      onClick={() => {
                        openQuickView(product);
                        setIsWishlistOpen(false);
                      }}
                      className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 cursor-pointer"
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4
                            onClick={() => {
                              openQuickView(product);
                              setIsWishlistOpen(false);
                            }}
                            className="text-xs font-bold leading-tight line-clamp-1 cursor-pointer hover:underline"
                          >
                            {product.name}
                          </h4>
                          <button
                            onClick={() => toggleWishlist(product)}
                            className="text-zinc-400 hover:text-black dark:hover:text-white p-1"
                            aria-label="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[11px] font-mono text-zinc-500">
                          {product.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-mono font-black">
                          {formatPrice(product.price)}
                        </span>

                        <button
                          onClick={() => handleMoveToCart(product)}
                          className="px-2.5 py-1 rounded-lg bg-black dark:bg-white text-white dark:text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center space-y-3 font-mono">
                <Heart className="w-8 h-8 mx-auto text-zinc-400" />
                <p className="text-xs text-zinc-500">YOUR WISHLIST IS EMPTY</p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-wider"
                >
                  EXPLORE ITEMS
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-5 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="w-full py-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-black dark:text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
