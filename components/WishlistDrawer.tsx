"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

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

  // Close on Escape key & lock body scroll
  useEffect(() => {
    if (!isWishlistOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsWishlistOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isWishlistOpen, setIsWishlistOpen]);

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1);
    toggleWishlist(product);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Centered Modal Card - Larger max-w-4xl */}
      <div className="relative bg-white dark:bg-zinc-950 text-black dark:text-white rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-4xl w-full overflow-hidden z-10 my-auto flex flex-col max-h-[88vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-7 py-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center border border-zinc-200 dark:border-zinc-800 shadow-xs">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-base font-bold uppercase tracking-[0.14em]">
                  Private Wishlist
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono font-bold">
                  {wishlist.length} {wishlist.length === 1 ? "PIECE" : "PIECES"}
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                {wishlist.length === 1
                  ? "1 CURATED PIECE IN YOUR PRIVATE VAULT"
                  : `${wishlist.length} CURATED PIECES IN YOUR PRIVATE VAULT`}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 rounded-xl text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List / Grid */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-7 max-h-[60vh]">
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wishlist.map((product) => (
                <div
                  key={product.id}
                  className="p-4 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all flex gap-4 items-center group"
                >
                  <div
                    onClick={() => {
                      openQuickView(product);
                      setIsWishlistOpen(false);
                    }}
                    className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-zinc-100 dark:bg-black border border-zinc-200 dark:border-zinc-800 cursor-pointer"
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="96px"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between gap-1.5">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            openQuickView(product);
                            setIsWishlistOpen(false);
                          }}
                          className="text-sm font-bold leading-tight line-clamp-1 cursor-pointer hover:text-zinc-500 transition-colors"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="text-zinc-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-[10.5px] font-mono text-zinc-400 uppercase tracking-wider">
                        {product.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-base font-black font-mono text-black dark:text-white">
                        {formatPrice(product.price)}
                      </span>

                      <button
                        onClick={() => handleMoveToCart(product)}
                        className="px-3.5 py-2 rounded-xl bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 px-6 text-center space-y-5 font-mono">
              <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mx-auto text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                <Heart className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold uppercase text-black dark:text-white">
                  Wishlist Is Empty
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto">
                  Save pieces while exploring our vaults to review and add to cart later.
                </p>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-7 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-mono text-xs font-bold uppercase tracking-wider transition-all hover:opacity-90 cursor-pointer shadow-md"
              >
                Discover Collection
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="px-7 py-4.5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs font-mono text-zinc-400 hidden sm:block">
              {wishlist.length} {wishlist.length === 1 ? "piece" : "pieces"} curated in your private collection
            </div>
            <button
              onClick={() => {
                wishlist.forEach((p) => addToCart(p, 1));
                setIsWishlistOpen(false);
              }}
              className="px-8 py-3.5 rounded-2xl bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-mono font-black text-xs uppercase tracking-[0.14em] flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-95 transition-all sm:w-auto w-full"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Move All to Cart ({wishlist.length})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
