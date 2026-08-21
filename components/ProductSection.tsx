"use client";

import React, { useState, useMemo } from "react";
import { CATEGORIES } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useShop } from "@/context/ShopContext";
import { matchProductSearch } from "@/lib/searchUtils";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { ArrowDownUp, Search, X, Sparkles, TrendingUp, Star, DollarSign } from "lucide-react";

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
  }, [products, selectedCategory, searchQuery, sortBy]);

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

          {/* Luxury Custom Sort Dropdown */}
          <div className="w-56 self-start sm:self-auto">
            <CustomSelect
              size="sm"
              icon={<ArrowDownUp className="w-3.5 h-3.5" />}
              options={[
                {
                  value: "featured",
                  label: "Featured Picks",
                  description: "Editor curated selection",
                  icon: <Sparkles className="w-3.5 h-3.5" />,
                  badge: "Curated",
                },
                {
                  value: "price-asc",
                  label: "Price: Low to High",
                  description: "Ascending price order",
                  icon: <DollarSign className="w-3.5 h-3.5" />,
                },
                {
                  value: "price-desc",
                  label: "Price: High to Low",
                  description: "Luxury flagship first",
                  icon: <TrendingUp className="w-3.5 h-3.5" />,
                },
                {
                  value: "rating",
                  label: "Top Rated (4.8+)",
                  description: "Patron verified ratings",
                  icon: <Star className="w-3.5 h-3.5" />,
                  badge: "★ 4.9",
                },
              ]}
              value={sortBy}
              onChange={(val) => setSortBy(val)}
              menuClassName="w-64"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar mb-8">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`h-9 px-3.5 inline-flex items-center justify-center rounded-lg text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
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
              className="text-zinc-400 hover:text-black dark:hover:text-white flex items-center gap-1 font-bold uppercase cursor-pointer"
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
          <div className="text-center py-16 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8">
            <p className="text-sm font-mono text-zinc-500 uppercase">
              No matching objects registered in this tier.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-mono font-bold uppercase"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
