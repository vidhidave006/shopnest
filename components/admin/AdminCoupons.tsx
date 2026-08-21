"use client";

import React, { useState } from "react";
import { PromoCode } from "@/types/shop";
import { useShop } from "@/context/ShopContext";
import {
  Tag,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Copy,
  Sparkles,
  Percent,
} from "lucide-react";

export function AdminCoupons() {
  const { promoCodes, addPromoCode, togglePromoCode, deletePromoCode, addToast, formatPrice } =
    useShop();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState<number | "">(20);
  const [minSpend, setMinSpend] = useState<number | "">(50);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError("Promo code string is required.");
      return;
    }
    if (discountPercent === "" || Number(discountPercent) <= 0 || Number(discountPercent) > 90) {
      setError("Discount percent must be between 1% and 90%.");
      return;
    }

    addPromoCode({
      code: code.trim().toUpperCase(),
      discountPercent: Number(discountPercent),
      isActive: true,
      minSpend: minSpend !== "" ? Number(minSpend) : undefined,
      description: description.trim() || `Special ${discountPercent}% discount coupon`,
    });

    setCode("");
    setDiscountPercent(20);
    setMinSpend(50);
    setDescription("");
    setError("");
    setIsAddModalOpen(false);
  };

  const copyCode = (c: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(c);
      addToast("Code Copied", `Promo code ${c} copied to clipboard.`, "info");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 font-sans text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
            MARKETING & PROMOTIONS
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-black dark:text-white tracking-tight">
            Discounts & Coupons ({promoCodes.length})
          </h2>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 font-semibold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Promo Code</span>
        </button>
      </div>

      {/* Coupon Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promoCodes.map((promo) => (
          <div
            key={promo.id}
            className={`p-5 rounded-2xl border transition-all ${
              promo.isActive
                ? "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-zinc-600"
                : "bg-zinc-100 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800/60 opacity-60"
            } flex flex-col justify-between space-y-4`}
          >
            <div className="space-y-3">
              {/* Top Row: Code Badge & Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-black text-sm text-black dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    {promo.code}
                  </span>
                  <button
                    onClick={() => copyCode(promo.code)}
                    className="p-1 rounded text-zinc-400 hover:text-black dark:hover:text-white"
                    title="Copy code"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => togglePromoCode(promo.id)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border transition-colors ${
                    promo.isActive
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                      : "bg-zinc-500/10 text-zinc-500 border-zinc-500/20"
                  }`}
                >
                  {promo.isActive ? "Active" : "Disabled"}
                </button>
              </div>

              {/* Discount Details */}
              <div>
                <div className="text-2xl font-black text-black dark:text-white flex items-center gap-1">
                  <span>{promo.discountPercent}% OFF</span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-1 leading-snug">
                  {promo.description || "Applicable to all qualifying cart orders."}
                </p>
              </div>

              {/* Usage & Min spend metadata */}
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between text-[10px] text-zinc-400">
                <span>Used: <strong>{promo.usageCount} times</strong></span>
                {promo.minSpend ? (
                  <span>Min order: <strong>{formatPrice(promo.minSpend)}</strong></span>
                ) : (
                  <span>No min spend</span>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
              <button
                onClick={() => togglePromoCode(promo.id)}
                className="text-[10px] uppercase font-bold text-zinc-500 hover:text-black dark:hover:text-white"
              >
                {promo.isActive ? "Deactivate" : "Activate"}
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete promo code "${promo.code}"?`)) {
                    deletePromoCode(promo.id);
                  }
                }}
                className="p-1 text-zinc-400 hover:text-red-500 transition-colors"
                title="Delete Promo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Promo Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl p-6 font-mono text-xs space-y-5 animate-in fade-in duration-150">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-zinc-400">
                PROMOTION BUILDER
              </span>
              <h3 className="text-base font-black uppercase text-black dark:text-white">
                Create New Promo Code
              </h3>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-400">
                  Coupon Code (e.g. FLASH30, VIP50) *
                </label>
                <input
                  type="text"
                  placeholder="SAVE25"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full h-10 px-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white uppercase font-bold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-400">
                    Discount (%) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    placeholder="25"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white font-bold focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-400">
                    Min Order Spend (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="2999"
                    value={minSpend}
                    onChange={(e) => setMinSpend(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-400">
                  Description / Note
                </label>
                <input
                  type="text"
                  placeholder="e.g. Exclusive 25% discount for spring launch"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white focus:outline-none"
                />
              </div>

              {error && <p className="text-[10px] text-red-500">{error}</p>}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-bold uppercase text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold uppercase text-xs shadow-md"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
