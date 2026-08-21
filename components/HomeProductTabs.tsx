"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { ArrowRight, Sparkles, TrendingUp, Star, Zap } from "lucide-react";

export function HomeProductTabs() {
  const [activeTab, setActiveTab] = useState<"trending" | "bestsellers" | "new" | "value">("trending");

  const tabs = [
    { id: "trending", label: "Curated Picks", icon: TrendingUp },
    { id: "bestsellers", label: "Signatures", icon: Star },
    { id: "new", label: "New Releases", icon: Sparkles },
    { id: "value", label: "Under ₹15,000", icon: Zap },
  ];

  const displayedProducts = useMemo(() => {
    switch (activeTab) {
      case "trending":
        return PRODUCTS.filter((p) => p.isFlashDeal || p.rating >= 4.8).slice(0, 4);
      case "bestsellers":
        return PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
      case "new":
        return PRODUCTS.filter((p) => p.isNew).slice(0, 4);
      case "value":
        return PRODUCTS.filter((p) => p.price <= 175).slice(0, 4);
      default:
        return PRODUCTS.slice(0, 4);
    }
  }, [activeTab]);

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-[10.5px] font-mono font-bold uppercase tracking-[0.2em] mb-3 border border-zinc-200 dark:border-zinc-800">
              <Sparkles className="w-3 h-3" /> Featured Highlights
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-black dark:text-white tracking-tight uppercase">
              Curated Acquisitions
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xl">
              Switch across curated collections to inspect our highest-rated acoustic and lifestyle instruments.
            </p>
          </div>

          {/* Interactive Tab Controls */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 self-start md:self-auto overflow-x-auto max-w-full shadow-inner">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-[0.12em] flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-800"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA to Products Page */}
        <div className="mt-14 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black text-xs font-mono font-black uppercase tracking-[0.16em] transition-all shadow-md active:scale-95"
          >
            <span>Explore Full Vault ({PRODUCTS.length} Objects)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
