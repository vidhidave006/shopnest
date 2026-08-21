"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { matchProductSearch } from "@/lib/searchUtils";
import {
  ArrowDownUp,
  Search,
  X,
  SlidersHorizontal,
  LayoutGrid,
  Grid3X3,
  Check,
  ChevronRight,
  Sparkles,
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

      // Semantic & Synonym-Aware Search Query Filter
      if (searchQuery.trim()) {
        if (!matchProductSearch(product, searchQuery)) {
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
  }, [selectedCategory, searchQuery, sortBy, priceRange, onlyInStock]);

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
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black text-black dark:text-white transition-colors duration-200">
      <Navbar />

      <main id="products-catalog" className="flex-1 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-6">
            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-zinc-400" />
            <span className="text-black dark:text-white font-bold">Catalog</span>
            {selectedCategory !== "All" && (
              <>
                <ChevronRight className="w-3 h-3 text-zinc-400" />
                <span className="text-zinc-600 dark:text-zinc-300">{selectedCategory}</span>
              </>
            )}
          </nav>

          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-zinc-200 dark:border-zinc-800 gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[10px] font-mono font-bold uppercase tracking-widest mb-2">
                <Sparkles className="w-3 h-3" /> ShopNest Catalog
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-black dark:text-white">
                {selectedCategory === "All" ? "All Products" : selectedCategory}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-mono">
                [ SHOWING {filteredProducts.length} OF {PRODUCTS.length} REGISTERED OBJECTS ]
              </p>
            </div>

            {/* Sort & Grid Layout Toggle */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Custom Sort Selector */}
              <div className="w-52">
                <CustomSelect
                  size="sm"
                  options={[
                    { value: "featured", label: "Featured Picks", description: "Editor curated selection", icon: <Sparkles className="w-3.5 h-3.5" />, badge: "Popular" },
                    { value: "price-asc", label: "Price: Low to High", description: "Ascending price order" },
                    { value: "price-desc", label: "Price: High to Low", description: "Luxury flagship first" },
                    { value: "rating", label: "Top Rated (4.8+)", description: "Client verified favorites" },
                    { value: "name", label: "Product Name (A-Z)", description: "Alphabetical directory" },
                  ]}
                  value={sortBy}
                  onChange={(val) => setSortBy(val)}
                  menuClassName="w-60"
                />
              </div>

              {/* Grid Layout Toggle */}
              <div className="hidden sm:flex items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-1 h-8">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-1.5 rounded transition-colors ${
                    gridCols === 3
                      ? "bg-black dark:bg-white text-white dark:text-black"
                      : "text-zinc-400 hover:text-black dark:hover:text-white"
                  }`}
                  title="3 Columns"
                  aria-label="3 Column Grid"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-1.5 rounded transition-colors ${
                    gridCols === 4
                      ? "bg-black dark:bg-white text-white dark:text-black"
                      : "text-zinc-400 hover:text-black dark:hover:text-white"
                  }`}
                  title="4 Columns"
                  aria-label="4 Column Grid"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Bar Controls */}
          <div className="space-y-4 mb-8">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-black dark:bg-white text-white dark:text-black shadow-sm"
                      : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-zinc-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Secondary Filter Row: Price Range & In-Stock */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="text-zinc-400 uppercase text-[10px] mr-1 flex items-center gap-1">
                  <SlidersHorizontal className="w-3 h-3" /> Price:
                </span>
                {[
                  { id: "all", label: "All" },
                  { id: "under-10k", label: "< ₹10k" },
                  { id: "10k-20k", label: "₹10k - ₹20k" },
                  { id: "above-20k", label: "> ₹20k" },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setPriceRange(tier.id as any)}
                    className={`px-2.5 py-1 rounded-lg border text-xs transition-colors ${
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
                  className={`ml-2 px-2.5 py-1 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                    onlyInStock
                      ? "bg-black dark:bg-white text-white dark:text-black border-transparent font-bold"
                      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                      onlyInStock
                        ? "bg-white dark:bg-black border-white dark:border-black"
                        : "border-zinc-400"
                    }`}
                  >
                    {onlyInStock && (
                      <Check className="w-2 h-2 text-black dark:text-white stroke-[3]" />
                    )}
                  </div>
                  <span>In Stock Only</span>
                </button>
              </div>

              {/* Clear active filters button */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-black dark:hover:text-white flex items-center gap-1 underline underline-offset-4"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Search Notification */}
          {searchQuery && (
            <div className="mb-6 p-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-between text-xs text-black dark:text-white font-mono">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-zinc-400" />
                <span>
                  FILTER QUERY: <strong>&ldquo;{searchQuery}&rdquo;</strong>
                </span>
              </div>
              <button
                onClick={() => setSearchQuery("")}
                className="text-zinc-400 hover:text-black dark:hover:text-white flex items-center gap-1 font-bold uppercase text-[11px]"
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
              } gap-6`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-4">
              <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-black dark:text-white uppercase font-mono">
                  No matching objects found
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-1 max-w-sm mx-auto">
                  Try adjusting your search query, switching categories, or resetting price filters.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-mono font-bold uppercase tracking-wider shadow-sm hover:opacity-90 transition-opacity"
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
          Loading Catalog...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
