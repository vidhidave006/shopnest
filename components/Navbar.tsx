"use client";

<<<<<<< HEAD
import React, { useState, useRef, useEffect, useMemo } from "react";
=======
import React, { useState, useEffect, useMemo } from "react";
>>>>>>> 113c4554795eef8ca5397910adfb72efd4561b0a
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useShop } from "@/context/ShopContext";
<<<<<<< HEAD
import { Product } from "@/types/shop";
=======
>>>>>>> 113c4554795eef8ca5397910adfb72efd4561b0a
import {
  Search,
  ShoppingBag,
  Heart,
  X,
  Menu,
<<<<<<< HEAD
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
=======
  PackageCheck,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { AnnouncementBar } from "./AnnouncementBar";
>>>>>>> 113c4554795eef8ca5397910adfb72efd4561b0a

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
<<<<<<< HEAD
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
=======
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
>>>>>>> 113c4554795eef8ca5397910adfb72efd4561b0a
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 113c4554795eef8ca5397910adfb72efd4561b0a

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
<<<<<<< HEAD
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
=======
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
>>>>>>> 113c4554795eef8ca5397910adfb72efd4561b0a
                  </span>
                  <span className="text-[8px] font-mono tracking-[0.24em] text-zinc-400 uppercase mt-0.5 font-bold">
                    ATELIER
                  </span>
                </div>
              </Link>
            </div>

<<<<<<< HEAD
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
=======
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
>>>>>>> 113c4554795eef8ca5397910adfb72efd4561b0a
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
<<<<<<< HEAD
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-1.5 font-bold text-black dark:text-white hover:underline transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </Link>
=======

              {/* Wishlist Button */}
>>>>>>> 113c4554795eef8ca5397910adfb72efd4561b0a
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
