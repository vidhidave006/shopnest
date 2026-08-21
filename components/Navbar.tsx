"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useShop, CURRENCY_RATES, Currency } from "@/context/ShopContext";
import {
  Search,
  ShoppingCart,
  Heart,
  X,
  Menu,
  LayoutDashboard,
  PackageCheck,
  ArrowRight,
  ChevronDown,
  Check,
  Globe,
  Sparkles,
  TrendingUp,
  Headphones,
  Shirt,
  Sparkle,
  Tv,
  Gamepad2,
  Armchair,
  Compass,
} from "lucide-react";
import { CATEGORIES } from "@/data/products";
import { AnnouncementBar } from "./AnnouncementBar";

interface NavbarProps {
  mode?: "ecommerce" | "informational";
}

export function Navbar({ mode = "ecommerce" }: NavbarProps) {
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
    currency,
    setCurrency,
    formatPrice,
    setIsOrderTrackerOpen,
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const categoriesDropdownRef = useRef<HTMLDivElement>(null);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  const router = useRouter();

  const isInformational = mode === "informational";

  // Focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoriesDropdownRef.current &&
        !categoriesDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoriesDropdownOpen(false);
      }
      if (
        currencyDropdownRef.current &&
        !currencyDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCurrencyDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter products for quick search modal
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      )
      .slice(0, 6);
  }, [products, searchQuery]);

  const categoryIcons: Record<string, any> = {
    Electronic: Headphones,
    Fashion: Shirt,
    Beauty: Sparkle,
    "Home Appliances": Tv,
    "Kids & Toys": Gamepad2,
    Furniture: Armchair,
  };

  const handleSelectCategory = (catName: string) => {
    setSelectedCategory(catName);
    setIsCategoriesDropdownOpen(false);
    setIsMobileMenuOpen(false);
    if (pathname !== "/products") {
      router.push("/products");
    }
  };

  const handleCurrencySelect = (c: Currency) => {
    setCurrency(c);
    setIsCurrencyDropdownOpen(false);
  };

  return (
    <>
      <AnnouncementBar />

      <header className="sticky top-0 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Left: Mobile Menu Toggle & Brand Logo */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

              {/* Brand Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm tracking-tighter transition-transform group-hover:scale-105 shadow-xs font-mono">
                  CH
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-black dark:text-white uppercase leading-none">
                    CHERRY
                  </span>
                  <span className="text-[9.5px] font-mono tracking-[0.2em] text-zinc-500 uppercase">
                    ATELIER
                  </span>
                </div>
              </Link>
            </div>

            {/* Middle: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <Link
                href="/products"
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                  pathname === "/products" && selectedCategory === "All"
                    ? "bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                }`}
              >
                Catalog
              </Link>

              {/* Categories Mega Dropdown */}
              <div className="relative" ref={categoriesDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                    isCategoriesDropdownOpen
                      ? "bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                  }`}
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isCategoriesDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCategoriesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-3 grid gap-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold border-b border-zinc-100 dark:border-zinc-900 mb-1">
                      Curated Departments
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSelectCategory("All")}
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-colors ${
                        selectedCategory === "All"
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-zinc-400" />
                        <span className="uppercase">All Essentials</span>
                      </div>
                      <span className="text-[10px] font-mono opacity-60">
                        {products.length}
                      </span>
                    </button>

                    {CATEGORIES.map((cat) => {
                      const Icon = categoryIcons[cat.name] || Sparkles;
                      const isSelected = selectedCategory === cat.name;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleSelectCategory(cat.name)}
                          className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-colors ${
                            isSelected
                              ? "bg-black text-white dark:bg-white dark:text-black"
                              : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4 text-zinc-400" />
                            <span className="uppercase">{cat.name}</span>
                          </div>
                          <span className="text-[10px] font-mono opacity-60">
                            {cat.itemCount}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Track Dispatch Modal Trigger */}
              <button
                type="button"
                onClick={() => setIsOrderTrackerOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                title="Track Live Dispatch"
              >
                <PackageCheck className="w-3.5 h-3.5 text-zinc-400" />
                <span>Track Dispatch</span>
              </button>

              {/* Admin Button */}
              <Link
                href="/admin"
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                  pathname === "/admin"
                    ? "bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white"
                    : "text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                }`}
                title="Admin"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-zinc-500" />
                <span>Admin</span>
              </Link>
            </nav>

            {/* Right: Actions (Search, Currency, Wishlist, Cart) */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Search Toggle Button */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors relative"
                aria-label="Search catalog"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Currency Dropdown Selector */}
              <div className="relative" ref={currencyDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  aria-label="Select Currency"
                >
                  <Globe className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{currency}</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>

                {isCurrencyDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="px-3 py-1.5 text-[9.5px] font-mono uppercase tracking-widest text-zinc-400 font-bold border-b border-zinc-100 dark:border-zinc-900 mb-1">
                      Select Currency
                    </div>
                    {(Object.keys(CURRENCY_RATES) as Currency[]).map((cur) => {
                      const isSelected = currency === cur;
                      return (
                        <button
                          key={cur}
                          type="button"
                          onClick={() => handleCurrencySelect(cur)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-colors ${
                            isSelected
                              ? "bg-black text-white dark:bg-white dark:text-black font-bold"
                              : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{cur}</span>
                            <span className="opacity-60 text-[11px]">
                              ({CURRENCY_RATES[cur].symbol})
                            </span>
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                aria-label={`Wishlist (${wishlist.length} saved)`}
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-black dark:bg-white text-white dark:text-black text-[10px] font-mono font-bold flex items-center justify-center border-2 border-white dark:border-black shadow-xs">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Drawer Trigger Button (Right side of Admin) */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all font-mono text-xs font-bold shadow-sm hover:shadow-md"
                aria-label={`Shopping cart with ${cartCount} items`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                <span className="w-5 h-5 rounded-full bg-white dark:bg-black text-black dark:text-white text-[10.5px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Global Expandable Search Overlay */}
        {isSearchOpen && (
          <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/95 dark:bg-zinc-950/95 backdrop-blur-2xl px-4 py-6 animate-in fade-in slide-in-from-top-4 duration-200 shadow-2xl">
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-zinc-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search by keywords, titanium, beryllium, wireless, apparel..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white placeholder-zinc-400 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-black dark:focus:ring-white transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 p-1 rounded-lg text-zinc-400 hover:text-black dark:hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Instant Search Results Preview */}
              {searchQuery.trim() && (
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-xl space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                    <span>
                      MATCHING ATELIER OBJECTS ({searchResults.length})
                    </span>
                    <Link
                      href="/products"
                      onClick={() => setIsSearchOpen(false)}
                      className="text-black dark:text-white font-bold hover:underline"
                    >
                      View All Results &rarr;
                    </Link>
                  </div>

                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors group"
                        >
                          <div className="relative w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-black dark:text-white truncate uppercase">
                              {product.name}
                            </h4>
                            <p className="text-[11px] font-mono text-zinc-500 font-semibold mt-0.5">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-xs text-zinc-500">
                      No matching objects found for &ldquo;{searchQuery}&rdquo;.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-4/5 max-w-sm h-full bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xs font-mono">
                    CH
                  </div>
                  <span className="font-extrabold text-sm tracking-tight text-black dark:text-white uppercase">
                    CHERRY
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-zinc-400 hover:text-black dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                <Link
                  href="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  <span>Catalog Portal</span>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsOrderTrackerOpen(true);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  <span>Track Live Dispatch</span>
                  <PackageCheck className="w-4 h-4 text-zinc-400" />
                </button>

                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  <span>Admin Console</span>
                  <LayoutDashboard className="w-4 h-4 text-zinc-400" />
                </Link>
              </div>

              {/* Categories Section */}
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold mb-2 px-3">
                  Departments
                </p>
                <div className="grid gap-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleSelectCategory(cat.name)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 text-left uppercase"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] font-mono opacity-50">
                        {cat.itemCount}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>View Cart ({cartCount})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
