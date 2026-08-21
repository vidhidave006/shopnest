"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import { Product } from "@/types/shop";
import {
  Search,
  ShoppingBag,
  Heart,
  X,
  Menu,
  Sun,
  Moon,
  LayoutDashboard,
  ChevronDown,
  Sparkles,
  Flame,
  TrendingUp,
  Camera,
  Layers,
  ArrowRight,
  ShieldCheck,
  Tag,
  Headphones,
  Watch,
  Shirt,
  Lamp,
  Compass,
  Check,
} from "lucide-react";
import { CATEGORIES } from "@/data/products";
import { matchProductSearch } from "@/lib/searchUtils";

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
    theme,
    toggleTheme,
    addToast,
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Semantic live search results for autocomplete dropdown
  const liveSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products
      .filter((p) => matchProductSearch(p, searchQuery))
      .slice(0, 5);
  }, [products, searchQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsSearchFocused(false);
  }, [pathname]);

  const handleCategorySelect = (catName: string) => {
    setSelectedCategory(catName);
    setIsDropdownOpen(false);
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
    setIsSearchFocused(false);
    if (pathname !== "/products") {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const copyPromo = (code: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(code);
      addToast("Promo Copied", `Code ${code} copied to clipboard!`, "success");
    }
  };

  // Category Icon Map
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "tech-audio":
        return <Headphones className="w-4 h-4" />;
      case "wearables":
        return <Watch className="w-4 h-4" />;
      case "apparel-footwear":
        return <Shirt className="w-4 h-4" />;
      case "home-living":
        return <Lamp className="w-4 h-4" />;
      case "skincare-wellness":
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Compass className="w-4 h-4" />;
    }
  };

  const spotlightProduct = products[0] || null;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3 lg:gap-4">
          {/* Left: Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 md:hidden transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>

            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-sm tracking-tighter transition-transform group-hover:scale-105">
                SN
              </div>
              <span className="text-lg sm:text-xl font-black text-black dark:text-white tracking-tight leading-none font-mono">
                SHOPNEST
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Bar with Rich Dropdown Menu */}
          <nav className="hidden md:flex items-center justify-center gap-1.5 flex-1 px-2 font-mono text-xs">
            {/* 1. All Products Link */}
            <button
              onClick={() => handleCategorySelect("All")}
              className={`h-8 px-3 inline-flex items-center justify-center rounded-lg font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                pathname === "/" && selectedCategory === "All"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
              }`}
            >
              All Catalog
            </button>

            {/* 2. Rich Collections & Categories Dropdown Menu Trigger */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`h-8 px-3 inline-flex items-center gap-1.5 rounded-lg font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  isDropdownOpen || (selectedCategory !== "All" && pathname.startsWith("/products"))
                    ? "bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
                }`}
                aria-expanded={isDropdownOpen}
              >
                <span>Collections</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180 text-black dark:text-white" : "text-zinc-400"
                  }`}
                />
              </button>

              {/* Mega Dropdown Menu Popover */}
              {isDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[720px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="grid grid-cols-12 gap-6">
                    {/* Col 1: All 6 Categories with Icons & Count (Span 7) */}
                    <div className="col-span-7 space-y-3">
                      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 pb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                          Browse Categories
                        </span>
                        <Link
                          href="/products"
                          onClick={() => setIsDropdownOpen(false)}
                          className="text-[10px] font-bold uppercase text-black dark:text-white hover:underline flex items-center gap-1"
                        >
                          <span>Full Registry</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {CATEGORIES.map((cat) => {
                          const isSelected = selectedCategory === cat.name;
                          return (
                            <button
                              key={cat.id}
                              onClick={() => handleCategorySelect(cat.name)}
                              className={`p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-all group ${
                                isSelected
                                  ? "bg-black text-white dark:bg-white dark:text-black border-transparent"
                                  : "bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200/80 dark:border-zinc-800/80 hover:border-black dark:hover:border-zinc-600"
                              }`}
                            >
                              <div
                                className={`p-1.5 rounded-lg shrink-0 ${
                                  isSelected
                                    ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black"
                                    : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white"
                                }`}
                              >
                                {getCategoryIcon(cat.id)}
                              </div>
                              <div className="min-w-0">
                                <div className="font-bold text-xs leading-tight line-clamp-1">
                                  {cat.name}
                                </div>
                                <div
                                  className={`text-[10px] truncate mt-0.5 ${
                                    isSelected
                                      ? "text-zinc-300 dark:text-zinc-700"
                                      : "text-zinc-400"
                                  }`}
                                >
                                  {cat.tag} &bull; {cat.itemCount} items
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Curated Badges Row */}
                      <div className="pt-2 flex items-center gap-2">
                        <Link
                          href="/products?search=flash"
                          onClick={() => setIsDropdownOpen(false)}
                          className="px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-[10px] font-bold uppercase flex items-center gap-1 hover:bg-orange-500/20 transition-colors"
                        >
                          <Flame className="w-3 h-3" /> Flash Deals
                        </Link>
                        <Link
                          href="/products?search=best"
                          onClick={() => setIsDropdownOpen(false)}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase flex items-center gap-1 hover:bg-amber-500/20 transition-colors"
                        >
                          <TrendingUp className="w-3 h-3" /> Best Sellers
                        </Link>
                        <Link
                          href="/products?search=new"
                          onClick={() => setIsDropdownOpen(false)}
                          className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 text-[10px] font-bold uppercase flex items-center gap-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                        >
                          <Sparkles className="w-3 h-3" /> New Drops
                        </Link>
                      </div>
                    </div>

                    {/* Col 2: Featured Spotlight Showcase Card (Span 5) */}
                    <div className="col-span-5 flex flex-col justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                            Curator Spotlight
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-black text-white dark:bg-white dark:text-black text-[9px] font-bold uppercase">
                            Trending
                          </span>
                        </div>

                        {spotlightProduct && (
                          <div className="space-y-2.5">
                            <div className="relative w-full h-32 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                              <Image
                                src={spotlightProduct.images[0]}
                                alt={spotlightProduct.name}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                            <div>
                              <h4 className="font-bold text-black dark:text-white text-xs leading-snug line-clamp-1">
                                {spotlightProduct.name}
                              </h4>
                              <div className="flex items-center justify-between mt-1">
                                <span className="font-black text-black dark:text-white">
                                  {formatPrice(spotlightProduct.price)}
                                </span>
                                <span className="text-[10px] text-zinc-400">
                                  {spotlightProduct.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="pt-3 mt-3 border-t border-zinc-200 dark:border-zinc-800">
                        {spotlightProduct && (
                          <Link
                            href={`/products/${spotlightProduct.id}`}
                            onClick={() => setIsDropdownOpen(false)}
                            className="w-full py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black text-[11px] font-bold uppercase flex items-center justify-center gap-1.5 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                          >
                            <span>Inspect Object</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Bottom Banner: Complimentary Shipping & Promo */}
                  <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between text-[10px] text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                      Complimentary carbon-neutral express shipping on orders over ₹2,999.
                    </span>
                    <button
                      onClick={() => copyPromo("NEST20")}
                      className="text-black dark:text-white font-bold hover:underline flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3" />
                      Use code <strong>NEST20</strong> for 20% off
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Direct Category Links */}
            <button
              onClick={() => handleCategorySelect("Audio & Tech")}
              className={`h-8 px-3 inline-flex items-center justify-center rounded-lg font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                pathname.startsWith("/products") && selectedCategory === "Audio & Tech"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
              }`}
            >
              Audio
            </button>

            <button
              onClick={() => handleCategorySelect("Smart Wearables")}
              className={`h-8 px-3 inline-flex items-center justify-center rounded-lg font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                pathname.startsWith("/products") && selectedCategory === "Smart Wearables"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
              }`}
            >
              Wearables
            </button>

            <button
              onClick={() => handleCategorySelect("Fashion & Footwear")}
              className={`h-8 px-3 inline-flex items-center justify-center rounded-lg font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                pathname.startsWith("/products") && selectedCategory === "Fashion & Footwear"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
              }`}
            >
              Fashion
            </button>
          </nav>

          {/* Right: Search, Admin, Theme Switcher & Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 font-mono">
            {/* Search Input Form with Live Autocomplete Dropdown */}
            <div ref={searchContainerRef} className="relative hidden sm:block">
              <form
                onSubmit={handleSearchSubmit}
                className="relative w-36 lg:w-48 h-9"
              >
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search shoes, tech..."
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  className="w-full h-9 pl-8 pr-7 bg-zinc-100 dark:bg-zinc-900 border border-transparent dark:border-zinc-800 rounded-lg text-xs text-black dark:text-white placeholder:text-zinc-400 focus:bg-white dark:focus:bg-black focus:border-zinc-400 dark:focus:border-zinc-700 focus:outline-none transition-all"
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

              {/* Desktop Live Autocomplete Dropdown */}
              {isSearchFocused && searchQuery.trim().length > 0 && (
                <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in duration-150 font-sans">
                  <div className="px-2 py-1.5 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 text-[10px] uppercase font-mono tracking-widest text-zinc-400 font-bold">
                    <span>Matching Products ({liveSearchResults.length})</span>
                    <span className="text-zinc-500 font-normal">Related match</span>
                  </div>

                  {liveSearchResults.length > 0 ? (
                    <div className="py-1 space-y-1 max-h-72 overflow-y-auto">
                      {liveSearchResults.map((prod: Product) => (
                        <Link
                          key={prod.id}
                          href={`/products/${prod.id}`}
                          onClick={() => setIsSearchFocused(false)}
                          className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors group"
                        >
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200 dark:border-zinc-800">
                            {prod.images?.[0] && (
                              <Image
                                src={prod.images[0]}
                                alt={prod.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                                unoptimized
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-black dark:text-white truncate">
                              {prod.name}
                            </p>
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                              {prod.brand} • {prod.category}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-mono text-xs font-bold text-black dark:text-white">
                              {formatPrice(prod.price)}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-zinc-400">
                      No matching products found for &ldquo;{searchQuery}&rdquo;.
                    </div>
                  )}

                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchFocused(false);
                        router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
                      }}
                      className="w-full py-1.5 px-3 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-[11px] font-bold uppercase text-black dark:text-white flex items-center justify-between transition-colors"
                    >
                      <span>View all catalog results</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Panel Link */}
            <Link
              href="/admin"
              className="h-9 px-2.5 sm:px-3 inline-flex items-center gap-1.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-xs font-bold uppercase"
              title="Open Admin Operations"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin</span>
            </Link>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="h-9 w-9 inline-flex items-center justify-center relative rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-black dark:bg-white text-white dark:text-black text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-black leading-none">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="h-9 inline-flex items-center gap-2 px-3 sm:px-3.5 rounded-lg bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black text-xs font-bold transition-colors shrink-0 shadow-xs"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Bag</span>
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 dark:bg-zinc-200 text-white dark:text-black font-bold">
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

        {/* Mobile Rich Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4 animate-in fade-in duration-150 font-mono text-xs">
            {/* Mobile Search Form with Live Results */}
            <div className="relative w-full">
              <form onSubmit={handleSearchSubmit} className="relative w-full h-10">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search shoes, tech, audio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-9 pr-9 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white rounded-lg text-xs placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-700"
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

              {/* Mobile Live Results */}
              {searchQuery.trim().length > 0 && liveSearchResults.length > 0 && (
                <div className="mt-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-2 shadow-lg space-y-1 font-sans">
                  <div className="px-2 py-1 text-[10px] uppercase font-mono tracking-widest text-zinc-400 font-bold border-b border-zinc-100 dark:border-zinc-800">
                    Live Matches ({liveSearchResults.length})
                  </div>
                  {liveSearchResults.map((prod: Product) => (
                    <Link
                      key={prod.id}
                      href={`/products/${prod.id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    >
                      <div className="relative w-8 h-8 rounded overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                        {prod.images?.[0] && (
                          <Image src={prod.images[0]} alt={prod.name} fill className="object-cover" unoptimized />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-black dark:text-white truncate">{prod.name}</p>
                        <p className="text-[10px] text-zinc-400 font-mono">{formatPrice(prod.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Categories Accordion/List */}
            <div className="space-y-1">
              <div className="text-[10px] uppercase tracking-widest text-zinc-400 px-3 py-1">
                Shop By Category
              </div>
              <button
                onClick={() => handleCategorySelect("All")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl uppercase tracking-wider transition-colors ${
                  selectedCategory === "All"
                    ? "bg-black text-white dark:bg-white dark:text-black font-bold"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>All Products Catalog</span>
                </div>
                <span className="text-[10px] opacity-70">{products.length} items</span>
              </button>

              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl uppercase tracking-wider transition-colors ${
                    selectedCategory === cat.name
                      ? "bg-black text-white dark:bg-white dark:text-black font-bold"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(cat.id)}
                    <span>{cat.name}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {cat.itemCount}
                  </span>
                </button>
              ))}
            </div>

            {/* Mobile Curated Highlights */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900 space-y-1">
              <div className="text-[10px] uppercase tracking-widest text-zinc-400 px-3 py-1">
                Curated Collections
              </div>
              <div className="grid grid-cols-2 gap-2 px-1">
                <Link
                  href="/products?search=flash"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-[11px] font-bold uppercase flex items-center gap-2"
                >
                  <Flame className="w-3.5 h-3.5" /> Flash Deals
                </Link>
                <Link
                  href="/products?search=best"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[11px] font-bold uppercase flex items-center gap-2"
                >
                  <TrendingUp className="w-3.5 h-3.5" /> Best Sellers
                </Link>
              </div>
            </div>

            {/* Promo Code Banner */}
            <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-zinc-400 block">Member Offer</span>
                <span className="font-bold text-black dark:text-white">Use code NEST20 for 20% off</span>
              </div>
              <button
                onClick={() => copyPromo("NEST20")}
                className="px-2.5 py-1 rounded bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold uppercase"
              >
                Copy
              </button>
            </div>

            {/* Mobile Footer Links */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between text-zinc-500 px-1">
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
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-1.5 font-bold text-black dark:text-white hover:underline transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </Link>
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
