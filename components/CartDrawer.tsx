"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Truck,
  Tag,
  ShieldCheck,
  Check,
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
  } = useShop();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 2999;
  const freeShippingUnlocked = cartSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const shippingPercent = Math.min(
    100,
    (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100
  );

  const discountAmount = appliedCoupon
    ? (cartSubtotal * appliedCoupon.discountPercent) / 100
    : 0;
  const shippingCost = freeShippingUnlocked || cart.length === 0 ? 0 : 199.00;
  const estimatedTax = cartSubtotal * 0.18;
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

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);

    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.images[0] || "",
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize,
    }));

    setTimeout(() => {
      const createdOrder = addOrder({
        customerName: "Guest VIP Customer",
        customerEmail: "guest.customer@shopnest.io",
        customerPhone: "+1 (555) 019-2834",
        shippingAddress: "900 Market Street, Suite 400, San Francisco, CA 94102",
        items: orderItems,
        subtotal: Number(cartSubtotal.toFixed(2)),
        discount: Number(discountAmount.toFixed(2)),
        tax: Number(estimatedTax.toFixed(2)),
        shipping: shippingCost,
        total: Number(finalTotal.toFixed(2)),
        status: "pending",
        paymentMethod: "Apple Pay (Express)",
        paymentStatus: "paid",
      });

      setIsCheckingOut(false);
      clearCart();
      setIsCartOpen(false);
      addToast(
        "Order Confirmed!",
        `Order #${createdOrder.orderNumber} placed successfully. Track in Admin.`,
        "success"
      );
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-zinc-950 text-black dark:text-white border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider">
                Shopping Bag ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-xs font-mono">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              {freeShippingUnlocked ? (
                <span className="font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> FREE EXPRESS SHIPPING UNLOCKED
                </span>
              ) : (
                <span>
                  ADD <strong>{formatPrice(shippingRemaining)}</strong> FOR FREE SHIPPING
                </span>
              )}
              <Truck className="w-3.5 h-3.5 text-zinc-400" />
            </div>
            <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-black dark:bg-white transition-all duration-300"
                style={{ width: `${shippingPercent}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length > 0 ? (
              <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 flex gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h4 className="text-xs font-bold leading-tight line-clamp-1">
                            {item.product.name}
                          </h4>
                          <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
                            {item.selectedColor}
                            {item.selectedSize && ` / ${item.selectedSize}`}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-zinc-400 hover:text-black dark:hover:text-white p-1"
                          aria-label="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-lg">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 text-zinc-400 hover:text-black dark:hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 text-zinc-400 hover:text-black dark:hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-mono font-black">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center space-y-3 font-mono">
                <ShoppingBag className="w-8 h-8 mx-auto text-zinc-400" />
                <p className="text-xs text-zinc-500">YOUR BAG IS EMPTY</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-wider"
                >
                  START BROWSING
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-4">
              {/* Promo input */}
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="PROMO CODE (NEST20)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-mono text-black dark:text-white focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded-lg text-xs font-mono font-bold uppercase"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[10px] text-zinc-400 font-mono">{couponError}</p>
                )}
                {appliedCoupon && (
                  <div className="flex items-center justify-between text-[11px] font-mono border border-zinc-300 dark:border-zinc-700 px-2 py-1 rounded-lg">
                    <span>COUPON {appliedCoupon.code} (-{appliedCoupon.discountPercent}%)</span>
                    <button onClick={removeCoupon} className="text-zinc-400">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1 text-xs font-mono text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-900 pt-3">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="font-bold text-black dark:text-white">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between">
                    <span>DISCOUNT</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>SHIPPING</span>
                  <span>
                    {shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-black dark:text-white pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <span>TOTAL</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3 rounded-lg bg-black dark:bg-white text-white dark:text-black font-mono font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span>PROCESSING...</span>
                ) : (
                  <>
                    <span>CHECKOUT &bull; {formatPrice(finalTotal)}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500 font-mono">
                <ShieldCheck className="w-3 h-3" />
                <span>256-BIT ENCRYPTED CHECKOUT</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
