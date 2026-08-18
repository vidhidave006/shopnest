"use client";

import React from "react";
import Image from "next/image";
import { CATEGORIES } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { ArrowRight, Sparkles } from "lucide-react";

export function CategoryGrid() {
  const { setSelectedCategory } = useShop();

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    const el = document.getElementById("featured-products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/70 text-orange-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Curated Collections
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Explore by Category
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-1 max-w-xl">
              Hand-selected lifestyle objects designed to elevate your everyday routines.
            </p>
          </div>

          <button
            onClick={() => handleCategoryClick("All")}
            className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 group self-start sm:self-auto"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-200/80 bg-slate-900"
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
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

              {/* Category Tag Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-xl bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold shadow-md">
                  {cat.tag}
                </span>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-1">
                  {cat.itemCount} Items Available
                </span>
                <h3 className="text-2xl font-bold text-white group-hover:text-orange-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-1 opacity-90 group-hover:opacity-100">
                  {cat.description}
                </p>

                {/* Explore pill on hover */}
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
                  <span className="underline underline-offset-4 decoration-orange-500">
                    Explore Collection
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
