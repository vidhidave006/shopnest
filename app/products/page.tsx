"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { CATEGORIES } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import {
  ArrowDownUp,
  Search,
  X,
  SlidersHorizontal,
  LayoutGrid,
  Grid3X3,
  Check,
  ChevronRight,
  Layers,
} from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useShop();

  // URL query sync
  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) {
      setSelectedCategory(catParam);
    }
    const queryParam = searchParams.get("search");
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [searchParams, setSelectedCategory, setSearchQuery]);

  const [sortBy, setSortBy] = useState<
    "featured" | "price-asc" | "price-desc" | "rating" | "name"
  >("featured");

  const [priceRange, setPriceRange] = useState<"all" | "under-10k" | "10k-20k" | "above-20k">("all");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const allCategories = ["All", ...CATEGORIES.map((c) => c.name)];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }

      // Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matches) {
          return false;
        }
      }

      // In stock filter
      if (onlyInStock && !product.inStock) {
        return false;
      }

      // Price range filter (INR)
      if (priceRange === "under-10k" && product.price >= 10000) return false;
      if (priceRange === "10k-20k" && (product.price < 10000 || product.price > 20000)) return false;
      if (priceRange === "above-20k" && product.price <= 20000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [products, selectedCategory, searchQuery, sortBy, priceRange, onlyInStock]);

  const hasActiveFilters =
    selectedCategory !== "All" ||
    searchQuery.trim() !== "" ||
    priceRange !== "all" ||
    onlyInStock;

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setPriceRange("all");
    setOnlyInStock(false);
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50 dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Navbar />

      <main id="products-catalog" className="flex-1 py-8 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2.5 text-xs font-mono text-zinc-500 mb-8">
            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-zinc-400" />
            <span className="text-black dark:text-white font-bold">Vault Catalog</span>
            {selectedCategory !== "All" && (
              <>
                <ChevronRight className="w-3 h-3 text-zinc-400" />
                <span className="text-black dark:text-white font-bold">{selectedCategory}</span>
              </>
            )}
          </nav>

          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-zinc-200 dark:border-zinc-800 gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-200 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-[10.5px] font-mono font-bold uppercase tracking-[0.2em] mb-3 border border-zinc-300 dark:border-zinc-800">
                <Layers className="w-3 h-3" /> Complete Archive
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-black dark:text-white">
                {selectedCategory === "All" ? "The Atelier Vault" : selectedCategory}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2 font-mono">
                [ DISPLAYING {filteredProducts.length} OF {products.length} REGISTERED OBJECTS ]
              </p>
            </div>

            {/* Sort & Grid Layout Toggle */}
            <div className="flex flex-wrap items-center gap-3.5 font-mono">
              {/* Sort Selector */}
              <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs shadow-sm">
                <ArrowDownUp className="w-3.5 h-3.5" />
                <span className="uppercase text-[10px] text-zinc-500 font-bold">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-bold text-black dark:text-white focus:outline-none cursor-pointer"
                >
                  <option value="featured" className="bg-white dark:bg-zinc-900">Curated Picks</option>
                  <option value="price-asc" className="bg-white dark:bg-zinc-900">Price: Low to High</option>
                  <option value="price-desc" className="bg-white dark:bg-zinc-900">Price: High to Low</option>
                  <option value="rating" className="bg-white dark:bg-zinc-900">Top Rated (4.8+)</option>
                  <option value="name" className="bg-white dark:bg-zinc-900">Object Title (A-Z)</option>
                </select>
              </div>

              {/* Grid Layout Toggle */}
              <div className="hidden sm:flex items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-1 shadow-sm">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    gridCols === 3
                      ? "bg-black dark:bg-white text-white dark:text-black shadow-xs"
                      : "text-zinc-400 hover:text-black dark:hover:text-white"
                  }`}
                  title="3 Columns Grid"
                  aria-label="3 Column Grid"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    gridCols === 4
                      ? "bg-black dark:bg-white text-white dark:text-black shadow-xs"
                      : "text-zinc-400 hover:text-black dark:hover:text-white"
                  }`}
                  title="4 Columns Grid"
                  aria-label="4 Column Grid"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Bar Controls */}
          <div className="space-y-4 mb-10">
            {/* Category Pills */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-[0.1em] whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-black text-white dark:bg-white dark:text-black font-black shadow-sm"
                      : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Secondary Filter Row: Price Range & In-Stock */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                <span className="text-zinc-400 uppercase text-[10px] mr-1 flex items-center gap-1 font-bold">
                  <SlidersHorizontal className="w-3 h-3" /> Price Tier:
                </span>
                {[
                  { id: "all", label: "All Tiers" },
                  { id: "under-10k", label: "< ₹10,000" },
                  { id: "10k-20k", label: "₹10,000 - ₹20,000" },
                  { id: "above-20k", label: "> ₹20,000" },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setPriceRange(tier.id as any)}
                    className={`px-3 py-1.5 rounded-xl border text-xs transition-colors cursor-pointer ${
                      priceRange === tier.id
                        ? "bg-black dark:bg-white text-white dark:text-black border-transparent font-bold"
                        : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400"
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}

                {/* In Stock toggle */}
                <button
                  onClick={() => setOnlyInStock(!onlyInStock)}
                  className={`ml-2 px-3 py-1.5 rounded-xl border text-xs flex items-center gap-2 transition-colors cursor-pointer ${
                    onlyInStock
                      ? "bg-black dark:bg-white text-white dark:text-black border-transparent font-bold shadow-xs"
                      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400"
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      onlyInStock
                        ? "bg-white dark:bg-black border-white dark:border-black"
                        : "border-zinc-400"
                    }`}
                  >
                    {onlyInStock && (
                      <Check className="w-2 h-2 text-black dark:text-white stroke-[3]" />
                    )}
                  </div>
                  <span>Available in Vault</span>
                </button>
              </div>

              {/* Clear active filters */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-mono uppercase tracking-[0.12em] text-black dark:text-white hover:underline flex items-center gap-1 cursor-pointer font-bold"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Search Notification */}
          {searchQuery && (
            <div className="mb-8 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center justify-between text-xs text-black dark:text-white font-mono shadow-sm">
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4" />
                <span>
                  VAULT QUERY: <strong>&ldquo;{searchQuery}&rdquo;</strong>
                </span>
              </div>
              <button
                onClick={() => setSearchQuery("")}
                className="text-black dark:text-white hover:underline flex items-center gap-1 font-bold uppercase text-[11px] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
              } gap-6 sm:gap-8`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mx-auto text-zinc-400">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-black dark:text-white uppercase">
                  No Matching Objects In Vault
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-1 max-w-sm mx-auto">
                  Adjust your search terms, switch discipline categories, or reset price boundaries.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="px-7 py-3 rounded-xl bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black text-xs font-mono font-bold uppercase tracking-wider shadow-sm transition-opacity cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white font-mono text-sm">
          Accessing Vault...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
