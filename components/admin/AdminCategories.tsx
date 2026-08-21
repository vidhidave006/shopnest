"use client";

import React from "react";
import Image from "next/image";
import { CATEGORIES } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { Layers, ArrowRight, Package } from "lucide-react";

interface AdminCategoriesProps {
  onSelectCategory: (categoryName: string) => void;
}

export function AdminCategories({ onSelectCategory }: AdminCategoriesProps) {
  const { products } = useShop();

  return (
    <div className="space-y-6 animate-in fade-in duration-200 font-sans text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
            TAXONOMY & ARCHITECTURE
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-black dark:text-white tracking-tight">
            Product Categories ({CATEGORIES.length})
          </h2>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => {
          const liveCount = products.filter((p) => p.category === cat.name).length;

          return (
            <div
              key={cat.id}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-zinc-600 transition-all flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div className="space-y-3">
                {/* Category Image */}
                <div className="relative w-full h-36 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-white text-[9px] font-bold uppercase">
                      {cat.tag}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <h3 className="font-bold text-black dark:text-white text-sm uppercase">
                    {cat.name}
                  </h3>
                  <p className="text-zinc-500 text-[11px] mt-1 leading-snug">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Footer row */}
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 font-bold">
                  <Package className="w-3.5 h-3.5" />
                  <span>{liveCount} Active Products</span>
                </span>

                <button
                  onClick={() => onSelectCategory(cat.name)}
                  className="text-[10px] font-bold uppercase text-black dark:text-white hover:underline flex items-center gap-1"
                >
                  <span>Filter Products</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
