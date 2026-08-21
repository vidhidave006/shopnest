"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import {
  Search,
  ShoppingCart,
  Heart,
  X,
  Menu,
  LayoutDashboard,
  PackageCheck,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { CATEGORIES } from "@/data/products";
import { AnnouncementBar } from "./AnnouncementBar";

export function Navbar() {
  const {
    products,
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
    setIsOrderTrackerOpen,
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Primary categories from CATEGORIES dataset
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
    { label: "Weekender Leather Bag", query: "bag" },
    { label: "Mechanical Keyboard", query: "keyboard" },
    { label: "Ceramic Aroma Diffuser", query: "diffuser" },
    { label: "Running Sneakers", query: "sneakers" },
  ];

  // Instant live matched search results
  const liveSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 4);
  }, [searchQuery, products]);

  // Featured highlights when search query is empty
  const searchHighlights = useMemo(() => {
    return products.slice(0, 3);
  }, [products]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (pathname !== "/products") {
      router.push(`/products?category=${encodeURIComponent(category)}`);
    } else {
      const el = document.getElementById("products-catalog");
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

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-3 lg:gap-4">
            {/* Left: Logo & Mobile Menu Toggle */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="h-9 w-9 inline-flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 md:hidden transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>

              <Link
                href="/"
                className="inline-flex items-center gap-2.5 group select-none"
              >
                <div className="w-8 h-8 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-extrabold text-xs shadow-sm transition-transform group-hover:scale-105 font-mono">
                  CH
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-black tracking-tight text-black dark:text-white leading-none">
                    CHERRY
                  </span>
                  <span className="text-[8px] font-mono tracking-[0.24em] text-zinc-400 uppercase mt-0.5 font-bold">
                    ATELIER
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Primary Category Navigation */}
            <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8">
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
              {/* Search Toggle Button */}
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

              {/* Order Tracker Modal Button */}
              <button
                onClick={() => setIsOrderTrackerOpen(true)}
                className="h-9 w-9 inline-flex items-center justify-center relative rounded-xl text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                aria-label="Track Order"
                title="Track Live Dispatch"
              >
                <PackageCheck className="w-4 h-4" />
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

              {/* Admin Button in Menu */}
              <Link
                href="/admin"
                className="h-9 inline-flex items-center gap-2 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-xs font-mono font-bold tracking-wider transition-colors cursor-pointer"
                title="Admin Portal"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="text-xs uppercase text-[10.5px]">Admin</span>
              </Link>

              {/* Shopping Cart Button (Right side of Admin) */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="h-9 inline-flex items-center gap-2 px-3.5 rounded-xl bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black text-xs font-mono font-bold tracking-wider transition-all shadow-sm cursor-pointer active:scale-95"
                aria-label="Shopping Cart"
                title="Shopping Cart"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-xs uppercase text-[10.5px]">Cart</span>
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
                  <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-zinc-500 bg-zinc-200 dark:bg-zinc-800 rounded border border-zinc-300 dark:border-zinc-700">
                    ESC
                  </kbd>
                )}
              </form>

              {/* Instant Search Suggestions Box */}
              {searchQuery.trim().length > 0 ? (
                <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xl space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 uppercase tracking-wider pb-2 border-b border-zinc-100 dark:border-zinc-900">
                    <span>Direct Matches ({liveSearchResults.length})</span>
                    <button
                      onClick={handleSearchSubmit}
                      className="text-black dark:text-white hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>View All in Catalog</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {liveSearchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {liveSearchResults.map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/products/${prod.id}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors group"
                        >
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0 border border-zinc-300 dark:border-zinc-700">
                            <Image
                              src={prod.images[0]}
                              alt={prod.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                              sizes="48px"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold text-black dark:text-white truncate">
                              {prod.name}
                            </h4>
                            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mt-0.5">
                              <span className="uppercase">{prod.category}</span>
                              <span className="text-black dark:text-white font-bold">
                                {formatPrice(prod.price)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="py-6 text-center text-xs font-mono text-zinc-400">
                      No exact pieces found matching &ldquo;{searchQuery}&rdquo;. Try browsing categories below.
                    </div>
                  )}
                </div>
              ) : (
                <div className="max-w-2xl mx-auto space-y-4">
                  {/* Trending Search Chips */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                      <TrendingUp className="w-3 h-3" />
                      <span>Trending Vault Queries</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {trendingSearches.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => handleTrendingClick(item.query)}
                          className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-mono transition-colors cursor-pointer border border-zinc-200 dark:border-zinc-800"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Curated Recommendations */}
                  <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
                      <Sparkles className="w-3 h-3" />
                      <span>Curated Signatures</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {searchHighlights.map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/products/${prod.id}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-2.5 transition-colors group"
                        >
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                            <Image
                              src={prod.images[0]}
                              alt={prod.name}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[11px] font-bold text-black dark:text-white truncate">
                              {prod.name}
                            </p>
                            <p className="text-[10px] font-mono text-zinc-400 font-bold">
                              {formatPrice(prod.price)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Slide-Down Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black px-6 py-6 space-y-6 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
            {/* Category Nav Links */}
            <div className="space-y-1">
              <div className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 px-3 py-1 font-bold">
                Categories
              </div>
              <div className="grid grid-cols-1 gap-1">
                {primaryNavItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      handleCategorySelect(item.category);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      selectedCategory === item.category
                        ? "bg-black text-white dark:bg-white dark:text-black font-extrabold"
                        : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white text-xs font-mono font-bold"
              >
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Admin</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
