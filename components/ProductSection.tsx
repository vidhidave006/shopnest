"use client";

import React, { useState, useMemo } from "react";
import { CATEGORIES } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useShop } from "@/context/ShopContext";
import { matchProductSearch } from "@/lib/searchUtils";
import { ArrowDownUp, Search, X } from "lucide-react";

export function ProductSection() {
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useShop();

  const [sortBy, setSortBy] = useState<
    "featured" | "price-asc" | "price-desc" | "rating"
  >("featured");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }

      // Semantic Search Query filter
      if (searchQuery.trim()) {
        if (!matchProductSearch(product, searchQuery)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const allCategories = ["All", ...CATEGORIES.map((c) => c.name)];

  return (
    <section id="products" className="py-12 md:py-16 bg-zinc-50 dark:bg-black transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              CATALOG 2026
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-black dark:text-white tracking-tight uppercase">
              Curated Catalog
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-mono">
              [ {filteredProducts.length} OBJECTS REGISTERED ]
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="h-9 inline-flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 text-xs text-zinc-700 dark:text-zinc-300 self-start sm:self-auto font-mono">
            <ArrowDownUp className="w-3.5 h-3.5 text-zinc-400" />
            <span className="uppercase text-[10px] text-zinc-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-bold text-black dark:text-white focus:outline-none cursor-pointer text-xs"
            >
              <option value="featured" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Featured Picks</option>
              <option value="price-asc" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Price: Low to High</option>
              <option value="price-desc" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Price: High to Low</option>
              <option value="rating" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar mb-8">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`h-9 px-3.5 inline-flex items-center justify-center rounded-lg text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-zinc-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Active Filter Banner */}
        {searchQuery && (
          <div className="mb-6 p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg flex items-center justify-between text-xs text-black dark:text-white font-mono">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-zinc-400" />
              <span>
                FILTER QUERY: <strong>&ldquo;{searchQuery}&rdquo;</strong>
              </span>
            </div>
            <button
              onClick={() => setSearchQuery("")}
              className="text-zinc-400 hover:text-black dark:hover:text-white flex items-center gap-1 font-bold uppercase"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3">
            <p className="text-sm font-mono text-zinc-400">
              No matching products found.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black text-xs font-mono font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
