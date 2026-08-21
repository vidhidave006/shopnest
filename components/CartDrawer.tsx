"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import {
  X,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  Truck,
  Trash2,
  Tag,
} from "lucide-react";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    cartCount,
    formatPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    addToast,
    addOrder,
    setIsCheckoutOpen,
    openQuickView,
  } = useShop();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  // Close on Escape key & manage body scroll
  useEffect(() => {
    if (!isCartOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 50;
  const freeShippingUnlocked =
    cartSubtotal >= FREE_SHIPPING_THRESHOLD || appliedCoupon?.isFreeShipping;
  const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const shippingPercent = Math.min(
    100,
    (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100
  );

  const discountAmount = appliedCoupon
    ? (cartSubtotal * appliedCoupon.discountPercent) / 100
    : 0;
  const shippingCost = freeShippingUnlocked || cart.length === 0 ? 0 : 5.88;
  const estimatedTax = (cartSubtotal - discountAmount) * 0.18;
  const finalTotal = cartSubtotal - discountAmount + shippingCost + estimatedTax;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError("");
      setCouponInput("");
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    if (setIsCheckoutOpen) {
      setIsCheckoutOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Centered Modal Card - Spacious max-w-4xl */}
      <div className="relative bg-white dark:bg-zinc-950 text-black dark:text-white rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-4xl w-full overflow-hidden z-10 my-auto flex flex-col max-h-[88vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-7 py-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center border border-zinc-200 dark:border-zinc-800 shadow-xs">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-base font-bold uppercase tracking-[0.14em]">
                  Shopping Cart
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono font-bold">
                  {cartCount} {cartCount === 1 ? "ITEM" : "ITEMS"}
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                {cartCount === 1 ? "1 OBJECT IN CART" : `${cartCount} OBJECTS IN CART`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs font-mono text-zinc-400 hover:text-rose-500 px-2.5 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
                title="Empty entire cart"
              >
                Clear Cart
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {cart.length === 0 ? (
          /* Empty State */
          <div className="py-20 px-6 text-center space-y-5 font-mono">
            <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mx-auto text-zinc-400 border border-zinc-200 dark:border-zinc-800">
              <ShoppingCart className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold uppercase text-black dark:text-white">
                Your Cart Is Empty
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto">
                Discover our titanium timepieces, spatial audio, and minimalist apparel in the vault.
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="px-7 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-mono text-xs font-bold uppercase tracking-wider transition-all hover:opacity-90 cursor-pointer shadow-md"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          /* Two Column Layout on Desktop */
          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800 flex-1 overflow-hidden">
            {/* Left Column: Items List */}
            <div className="md:col-span-7 flex flex-col overflow-hidden">
              <div className="px-6 py-3 bg-zinc-50/70 dark:bg-zinc-900/30 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>ITEMS IN CART ({cart.length})</span>
                <span>UNIT / QTY</span>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[46vh] md:max-h-[56vh]">
                <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
                  {cart.map((item) => (
                    <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center">
                      {/* Item Image */}
                      <div
                        onClick={() => {
                          openQuickView(item.product);
                          setIsCartOpen(false);
                        }}
                        className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-zinc-100 dark:bg-black border border-zinc-200 dark:border-zinc-800 cursor-pointer group"
                      >
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="96px"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between gap-1.5">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4
                              onClick={() => {
                                openQuickView(item.product);
                                setIsCartOpen(false);
                              }}
                              className="text-sm font-bold text-black dark:text-white leading-tight line-clamp-1 tracking-tight cursor-pointer hover:text-zinc-500 transition-colors"
                            >
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-zinc-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-1">
                            {item.selectedColor && (
                              <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10.5px]">
                                {item.selectedColor}
                              </span>
                            )}
                            {item.selectedSize && (
                              <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10.5px]">
                                Size {item.selectedSize}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Stepper & Price */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-900">
                            <button
                              onClick={() =>
                                updateCartQuantity(item.id, item.quantity - 1)
                              }
                              className="p-2 text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer transition-colors"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-mono font-bold min-w-[24px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartQuantity(item.id, item.quantity + 1)
                              }
                              className="p-2 text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer transition-colors"
                              aria-label="Increase"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-base font-black font-mono text-black dark:text-white">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                            {item.quantity > 1 && (
                              <div className="text-[10.5px] font-mono text-zinc-400">
                                {formatPrice(item.product.price)} each
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Free Shipping & Summary & Checkout */}
            <div className="md:col-span-5 bg-zinc-50/70 dark:bg-zinc-950/70 p-6 flex flex-col justify-between space-y-4 overflow-y-auto max-h-[56vh]">
              <div className="space-y-4">
                {/* Free Shipping Progress Meter */}
                <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2.5 shadow-xs">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300">
                      <Truck className="w-4 h-4 text-zinc-400" />
                      {freeShippingUnlocked ? (
                        <span className="text-black dark:text-white font-bold">
                          • Air Dispatch Unlocked
                        </span>
                      ) : (
                        <span>
                          Add <strong>{formatPrice(shippingRemaining)}</strong> for Free Courier
                        </span>
                      )}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 font-bold">
                      {Math.round(shippingPercent)}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-black dark:bg-white rounded-full transition-all duration-500"
                      style={{ width: `${shippingPercent}%` }}
                    />
                  </div>
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="PROMO CODE (e.g. NEST20)"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError("");
                      }}
                      className="flex-1 px-3.5 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-mono uppercase text-black dark:text-white placeholder:text-zinc-500 focus:outline-none focus:border-black dark:focus:border-white"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-black text-white dark:bg-zinc-800 dark:text-white hover:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[10px] text-rose-500 font-mono">{couponError}</p>
                  )}
                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-xs font-mono border border-zinc-700 bg-zinc-900 text-zinc-300 px-3 py-1.5 rounded-xl">
                      <span className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-emerald-400" />
                        <span>CODE {appliedCoupon.code} (-{appliedCoupon.discountPercent}%)</span>
                      </span>
                      <button onClick={removeCoupon} className="text-zinc-400 hover:text-white cursor-pointer p-0.5">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </form>

                {/* Price Breakdown */}
                <div className="space-y-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 pt-3.5">
                  <div className="flex justify-between">
                    <span>SUBTOTAL</span>
                    <span className="font-bold text-black dark:text-white">
                      {formatPrice(cartSubtotal)}
                    </span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>DISCOUNT ({appliedCoupon.code})</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>AIR DISPATCH</span>
                    <span className="font-bold text-black dark:text-white">
                      {shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-black text-black dark:text-white pt-2.5 border-t border-zinc-200 dark:border-zinc-800">
                    <span>TOTAL</span>
                    <span>{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-4 rounded-2xl bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-mono font-black text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95"
                >
                  <span>PROCEED TO SECURE CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10.5px] text-zinc-400 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>256-BIT ENCRYPTED PROTOCOL</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
