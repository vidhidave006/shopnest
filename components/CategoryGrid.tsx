"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { ArrowRight, Layers } from "lucide-react";

export function CategoryGrid() {
  const { setSelectedCategory } = useShop();
  const router = useRouter();

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    router.push(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="py-16 sm:py-24 bg-zinc-50/50 dark:bg-black border-b border-zinc-200 dark:border-zinc-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-200 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-[10.5px] font-mono font-bold uppercase tracking-[0.2em] mb-3 border border-zinc-300 dark:border-zinc-800">
              <Layers className="w-3 h-3" /> Curated Disciplines
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-black dark:text-white tracking-tight uppercase">
              Explore by Collection
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xl">
              Hand-selected objects engineered for discerning environments and sensory elevation.
            </p>
          </div>

          <Link
            href="/products"
            onClick={() => setSelectedCategory("All")}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.14em] text-black dark:text-white hover:text-zinc-500 transition-colors group self-start sm:self-auto"
          >
            <span>Complete Archive ({CATEGORIES.length})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-zinc-200 dark:border-zinc-800 bg-zinc-900"
            >
              {/* Background Image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-300" />

              {/* Category Tag Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-xl bg-black/80 dark:bg-zinc-900/90 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase tracking-[0.16em] border border-zinc-700 shadow-sm">
                  {cat.tag}
                </span>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-400 mb-1 font-bold">
                  {cat.itemCount} Objects Cataloged
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-zinc-300 transition-colors leading-tight tracking-tight">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-300 mt-1.5 line-clamp-1 opacity-90 group-hover:opacity-100 font-normal">
                  {cat.description}
                </p>

                {/* Explore pill on hover */}
                <div className="mt-4 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.16em] text-white group-hover:text-zinc-300 transition-colors">
                  <span>Enter Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
