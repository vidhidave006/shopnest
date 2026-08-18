"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { ArrowRight, Sparkles } from "lucide-react";

export function CategoryGrid() {
  const { setSelectedCategory } = useShop();
  const router = useRouter();

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    router.push(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="py-14 sm:py-20 bg-zinc-50 dark:bg-black border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[10px] font-mono font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-3 h-3" /> Curated Collections
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-black dark:text-white tracking-tight uppercase">
              Explore by Category
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-xl">
              Hand-selected lifestyle objects designed to elevate your everyday routines.
            </p>
          </div>

          <Link
            href="/products"
            onClick={() => setSelectedCategory("All")}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-white hover:underline group self-start sm:self-auto"
          >
            <span>View All ({CATEGORIES.length})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 border border-zinc-200 dark:border-zinc-800 bg-zinc-900"
            >
              {/* Background Image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Dynamic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              {/* Category Tag Badge */}
              <div className="absolute top-3.5 right-3.5">
                <span className="px-2.5 py-1 rounded-lg bg-black/80 dark:bg-white/90 backdrop-blur-md text-white dark:text-black text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                  {cat.tag}
                </span>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
                  {cat.itemCount} Objects Cataloged
                </span>
                <h3 className="text-xl font-bold text-white group-hover:underline transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-300 mt-1 line-clamp-1 opacity-90 group-hover:opacity-100 font-normal">
                  {cat.description}
                </p>

                {/* Explore pill on hover */}
                <div className="mt-3 flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-white">
                  <span>Explore Series</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

