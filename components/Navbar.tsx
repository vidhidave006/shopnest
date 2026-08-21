"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import {
  Search,
  ShoppingBag,
  Heart,
  X,
  Menu,
  PackageCheck,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { AnnouncementBar } from "./AnnouncementBar";

export function Navbar() {
  const {
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    formatPrice,
    theme,
    toggleTheme,
    setIsOrderTrackerOpen,
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Close menus on route navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  const handleCategorySelect = (catName: string) => {
    setSelectedCategory(catName);
    setIsMobileMenuOpen(false);
    if (pathname !== "/products") {
      router.push(`/products?category=${encodeURIComponent(catName)}`);
    } else {
      const el =
        document.getElementById("products-catalog") ||
        document.getElementById("products");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleTrendingClick = (queryText: string) => {
    setSearchQuery(queryText);
    setIsSearchOpen(false);
    router.push(`/products?search=${encodeURIComponent(queryText)}`);
  };

  const primaryNavItems = [
    { name: "Fashion", label: "Fashion", category: "Fashion" },
    { name: "Electronic", label: "Electronic", category: "Electronic" },
    { name: "Beauty", label: "Beauty", category: "Beauty" },
    { name: "Home Appliances", label: "Home Appliances", category: "Home Appliances" },
    { name: "Kids & Toys", label: "Kids & Toys", category: "Kids & Toys" },
    { name: "Furniture", label: "Furniture", category: "Furniture" },
  ];

  // Trending search terms
  const trendingSearches = [
    { label: "Studio ANC Headphones", query: "headphones" },
    { label: "Titanium Smartwatch", query: "smartwatch" },
    { label: "Everyday Backpack", query: "backpack" },
    { label: "Mechanical Keyboard", query: "keyboard" },
    { label: "Nordic Diffuser", query: "diffuser" },
    { label: "Minimalist Sneakers", query: "sneakers" },
  ];

  // Instant live matched search results
  const liveSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 4);
  }, [searchQuery]);

  // Featured highlights when search query is empty
  const searchHighlights = useMemo(() => {
    return PRODUCTS.slice(0, 3);
  }, []);

  return (
    <div className="sticky top-0 z-40">
      <AnnouncementBar />

      {/* Main Clean Header */}
      <header className="bg-white/95 dark:bg-black/95 backdrop-blur-2xl border-b border-zinc-200/90 dark:border-zinc-800 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-18">
            
            {/* Left: Mobile Toggle & Brand Monogram */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="h-9 w-9 inline-flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white md:hidden transition-colors cursor-pointer"
                aria-label="Open Navigation Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>

              <Link
                href="/"
                className="inline-flex items-center gap-2.5 group select-none"
              >
                <div className="w-8 h-8 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-extrabold text-xs shadow-sm transition-transform group-hover:scale-105">
                  SN
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-black tracking-tight text-black dark:text-white leading-none">
                    SHOPNEST
                  </span>
                  <span className="text-[8px] font-mono tracking-[0.24em] text-zinc-400 uppercase mt-0.5 font-bold">
                    ATELIER
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Minimalist Micro-Caps in Titanium Gray & Pure White */}
            <nav className="hidden md:flex items-center justify-center gap-7 lg:gap-9">
              {primaryNavItems.map((item) => {
                const isActive = selectedCategory === item.category;

                return (
                  <button
                    key={item.name}
                    onClick={() => handleCategorySelect(item.category)}
                    className={`relative py-2 text-[11px] font-bold uppercase tracking-[0.22em] transition-all cursor-pointer group ${
                      isActive
                        ? "text-black dark:text-white font-extrabold"
                        : "text-zinc-400 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    {/* Clean Active Line */}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-black dark:bg-white rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-full"
                          : "w-0 group-hover:w-full opacity-30"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            {/* Right: Icon Utility Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`h-9 w-9 inline-flex items-center justify-center rounded-xl transition-colors cursor-pointer ${
                  isSearchOpen
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
                }`}
                title="Search Objects"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="h-9 w-9 inline-flex items-center justify-center relative rounded-xl text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-black dark:bg-white rounded-full ring-2 ring-white dark:ring-black" />
                )}
              </button>

              {/* Divider */}
              <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-1 hidden sm:block" />

              {/* Shopping Bag Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="h-9 inline-flex items-center gap-2 px-3.5 rounded-xl bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black text-xs font-mono font-bold tracking-wider transition-all shadow-sm cursor-pointer active:scale-95"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-xs uppercase text-[10.5px]">Bag</span>
                <span className="text-[10.5px] font-mono font-bold bg-white/20 dark:bg-black/15 px-1.5 py-0.5 rounded-md">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          {/* Expandable Search Input & Trending Searches Overlay */}
          {isSearchOpen && (
            <div className="py-5 border-t border-zinc-200 dark:border-zinc-800 animate-in fade-in slide-in-from-top-2 duration-200 space-y-5">
              <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
                <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search acoustics, timepieces, apparel, living..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-11 pr-12 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-2xl text-xs font-mono text-black dark:text-white placeholder:text-zinc-500 focus:outline-none focus:border-black dark:focus:border-white shadow-inner"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black dark:hover:text-white p-1"
                    aria-label="Clear Search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black dark:hover:text-white p-1 text-[10px] font-mono uppercase tracking-wider"
                  >
                    ESC
                  </button>
                )}
              </form>

              {/* Trending Searches Section (When query is empty) */}
              {!searchQuery.trim() ? (
                <div className="max-w-2xl mx-auto space-y-4 animate-in fade-in duration-200">
                  {/* Trending Keywords Pills */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-bold">
                      <TrendingUp className="w-3.5 h-3.5 text-black dark:text-white" />
                      <span>Trending Searches</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 font-mono">
                      {trendingSearches.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleTrendingClick(item.query)}
                          className="px-3.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 text-xs transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Search className="w-3 h-3 opacity-50" />
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Curated Vault Highlights Quick Jump */}
                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-900 space-y-2.5">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-bold">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-black dark:text-white" />
                        <span>Curated Highlights</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleTrendingClick("")}
                        className="hover:text-black dark:hover:text-white cursor-pointer"
                      >
                        View Vault &rarr;
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {searchHighlights.map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/products/${prod.id}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 flex items-center gap-3 transition-colors group"
                        >
                          <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800">
                            <Image
                              src={prod.images[0]}
                              alt={prod.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                              sizes="44px"
                            />
                          </div>
                          <div className="flex-1 min-w-0 font-mono text-xs">
                            <p className="font-bold text-black dark:text-white truncate">
                              {prod.name}
                            </p>
                            <span className="text-[10px] text-zinc-500">
                              {formatPrice(prod.price)}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Instant Matched Live Search Results */
                <div className="max-w-2xl mx-auto space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-bold">
                    <span>Direct Matches ({liveSearchResults.length})</span>
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="text-black dark:text-white hover:underline cursor-pointer"
                    >
                      See All Results &rarr;
                    </button>
                  </div>

                  {liveSearchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {liveSearchResults.map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/products/${prod.id}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 flex items-center gap-3.5 transition-colors group"
                        >
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800">
                            <Image
                              src={prod.images[0]}
                              alt={prod.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                              sizes="48px"
                            />
                          </div>
                          <div className="flex-1 min-w-0 font-mono text-xs">
                            <span className="text-[9px] uppercase tracking-wider text-zinc-400 block">
                              {prod.category}
                            </span>
                            <p className="font-bold text-black dark:text-white truncate mt-0.5">
                              {prod.name}
                            </p>
                            <span className="text-[11px] font-bold text-black dark:text-white">
                              {formatPrice(prod.price)}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-xs font-mono text-zinc-400 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                      No direct objects found for &ldquo;{searchQuery}&rdquo;. Press Enter to search all archives.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Full-Width Mobile Navigation Drawer */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-6 border-t border-zinc-200 dark:border-zinc-800 space-y-6 animate-in fade-in slide-in-from-top-3 duration-300">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="SEARCH VAULT..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-10 pr-9 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white rounded-xl text-xs font-mono placeholder:text-zinc-500 focus:outline-none focus:border-black dark:focus:border-white"
                />
              </form>

              {/* Mobile Trending Pills */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-400 font-bold px-2 block">
                  Trending Searches
                </span>
                <div className="flex flex-wrap gap-1.5 px-2">
                  {trendingSearches.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleTrendingClick(item.query)}
                      className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-[11px] font-mono"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.26em] text-zinc-400 font-bold px-2 block mb-2">
                  DISCIPLINES &amp; VAULTS
                </span>
                <button
                  onClick={() => handleCategorySelect("All")}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
                    selectedCategory === "All"
                      ? "bg-black text-white dark:bg-white dark:text-black font-extrabold"
                      : "text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  <span>Complete Vault</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-70" />
                </button>

                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.name)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
                      selectedCategory === cat.name
                        ? "bg-black text-white dark:bg-white dark:text-black font-extrabold"
                        : "text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {cat.itemCount} Objects
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-2 gap-3 font-mono text-xs">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsWishlistOpen(true);
                  }}
                  className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center gap-2 text-zinc-400 hover:text-black dark:hover:text-white"
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>Wishlist ({wishlist.length})</span>
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsOrderTrackerOpen(true);
                  }}
                  className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center gap-2 text-zinc-400 hover:text-black dark:hover:text-white"
                >
                  <PackageCheck className="w-3.5 h-3.5" />
                  <span>Track Order</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
