"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import { Search, ShoppingBag, Heart, X, Menu, Sun, Moon } from "lucide-react";
import { CATEGORIES } from "@/data/products";

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
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleCategorySelect = (catName: string) => {
    setSelectedCategory(catName);
    setIsMobileMenuOpen(false);
    if (pathname !== "/products") {
      router.push(`/products?category=${encodeURIComponent(catName)}`);
    } else {
      const el = document.getElementById("products-catalog") || document.getElementById("products");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pathname !== "/products") {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navCategories = [
    { id: "all", name: "All", shortLabel: "All", fullLabel: "All Products" },
    { id: "audio", name: "Audio & Tech", shortLabel: "Audio", fullLabel: "Audio & Tech" },
    { id: "wearables", name: "Smart Wearables", shortLabel: "Wearables", fullLabel: "Wearables" },
    { id: "fashion", name: "Fashion & Footwear", shortLabel: "Fashion", fullLabel: "Fashion" },
    { id: "home", name: "Home & Ambient", shortLabel: "Home", fullLabel: "Home" },
    { id: "beauty", name: "Beauty & Wellness", shortLabel: "Beauty", fullLabel: "Beauty" },
    { id: "travel", name: "Travel & Everyday", shortLabel: "Travel", fullLabel: "Travel" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3 lg:gap-4">
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 md:hidden transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-sm tracking-tighter transition-transform group-hover:scale-105">
                SN
              </div>
              <span className="text-lg sm:text-xl font-black text-black dark:text-white tracking-tight leading-none">
                SHOPNEST
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links - Centered & Aligned */}
          <nav className="hidden md:flex items-center justify-center gap-1 lg:gap-1.5 flex-1 px-2">
            {navCategories.map((cat) => {
              const isActive =
                (cat.name === "All" && pathname === "/" && selectedCategory === "All") ||
                (pathname.startsWith("/products") && selectedCategory === cat.name) ||
                (selectedCategory === cat.name);
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`h-8 px-2.5 lg:px-3 inline-flex items-center justify-center rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-black dark:bg-white text-white dark:text-black shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  <span className="hidden xl:inline">{cat.fullLabel}</span>
                  <span className="xl:hidden">{cat.shortLabel}</span>
                </button>
              );
            })}
          </nav>

          {/* Search, Theme Switcher & Actions - Perfectly Height-Aligned */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Search Input Form */}
            <form onSubmit={handleSearchSubmit} className="relative hidden sm:block w-36 lg:w-44 h-9">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-8 pr-7 bg-zinc-100 dark:bg-zinc-900 border border-transparent dark:border-zinc-800 rounded-lg text-xs font-mono text-black dark:text-white placeholder:text-zinc-400 focus:bg-white dark:focus:bg-black focus:border-zinc-400 dark:focus:border-zinc-700 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-zinc-100" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-900" />
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="h-9 w-9 inline-flex items-center justify-center relative rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-black dark:bg-white text-white dark:text-black text-[9px] font-mono font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-black leading-none">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="h-9 inline-flex items-center gap-2 px-3 sm:px-3.5 rounded-lg bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black text-xs font-mono font-bold transition-colors shrink-0 shadow-xs"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Bag</span>
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 dark:bg-zinc-200 text-white dark:text-black font-mono font-bold">
                {cartCount}
              </span>
              {cartCount > 0 && (
                <span className="hidden lg:inline text-zinc-400 dark:text-zinc-600 font-normal">
                  &bull; {formatPrice(cartSubtotal)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4 animate-in fade-in duration-150">
            {/* Mobile Search Form */}
            <form onSubmit={handleSearchSubmit} className="relative w-full h-10">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-9 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white rounded-lg text-xs font-mono placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-700"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black dark:hover:text-white p-1"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Mobile Category Navigation */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 px-3 py-1">
                Browse Categories
              </div>
              <button
                onClick={() => handleCategorySelect("All")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-colors ${
                  selectedCategory === "All"
                    ? "bg-black text-white dark:bg-white dark:text-black font-bold"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                }`}
              >
                <span>All Products</span>
                <span className="text-[10px] opacity-70">Catalog</span>
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-colors ${
                    selectedCategory === cat.name
                      ? "bg-black text-white dark:bg-white dark:text-black font-bold"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {cat.itemCount}
                  </span>
                </button>
              ))}
            </div>

            {/* Mobile Footer Links */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-500 px-1">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsWishlistOpen(true);
                }}
                className="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Wishlist ({wishlist.length})</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Bag ({cartCount})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
