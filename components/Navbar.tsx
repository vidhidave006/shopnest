"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useShop, CURRENCY_RATES } from "@/context/ShopContext";
import { Currency } from "@/types/shop";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  ShieldCheck,
  Zap,
  Tag,
  ArrowRight,
  PackageCheck,
  Compass,
  Check,
  Sparkles,
  TrendingUp,
  Headphones,
  Shirt,
  Sparkle,
  Tv,
  Gamepad2,
  Armchair,
  Globe,
} from "lucide-react";

interface NavbarProps {
  mode?: "ecommerce" | "informational";
}

export function Navbar({ mode = "ecommerce" }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    cartCount,
    cartSubtotal,
    wishlist,
    currency,
    setCurrency,
    formatPrice,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsOrderTrackerOpen,
    selectedCategory,
    setSelectedCategory,
    products,
  } = useShop();

  const isInformational = mode === "informational";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const categoriesDropdownRef = useRef<HTMLDivElement>(null);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);

  // Auto-focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  // Handle outside clicks to close dropdowns
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

  const getCategoryIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "fashion":
        return <Shirt className="w-4 h-4" />;
      case "electronic":
        return <Headphones className="w-4 h-4" />;
      case "beauty":
        return <Sparkle className="w-4 h-4" />;
      case "home appliances":
        return <Tv className="w-4 h-4" />;
      case "kids & toys":
        return <Gamepad2 className="w-4 h-4" />;
      case "furniture":
        return <Armchair className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const primaryNavItems = [
    { name: "Fashion", label: "Fashion", category: "Fashion" },
    { name: "Electronic", label: "Electronic", category: "Electronic" },
    { name: "Beauty", label: "Beauty", category: "Beauty" },
    { name: "Home Appliances", label: "Home Appliances", category: "Home Appliances" },
    { name: "Kids & Toys", label: "Kids & Toys", category: "Kids & Toys" },
    { name: "Furniture", label: "Furniture", category: "Furniture" },
  ];

  const [activeSection, setActiveSection] = useState<string>("manifesto");

  // Track active section for informational navbar
  useEffect(() => {
    if (!isInformational || pathname !== "/") return;

    const sectionIds = ["manifesto", "pillars", "spec-archive", "workflow", "materials", "timeline", "faq"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isInformational, pathname]);

  const informationalNavItems = [
    { label: "Manifesto", targetId: "manifesto", href: "/#manifesto" },
    { label: "6 Categories", targetId: "pillars", href: "/#pillars" },
    { label: "Product Exhibits", targetId: "spec-archive", href: "/#spec-archive" },
    { label: "Store Workflow", targetId: "workflow", href: "/#workflow" },
    { label: "Material Science", targetId: "materials", href: "/#materials" },
    { label: "Timeline", targetId: "timeline", href: "/#timeline" },
    { label: "FAQ", targetId: "faq", href: "/#faq" },
  ];

  const handleInformationalNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
    href: string
  ) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(targetId);
        window.history.pushState(null, "", `#${targetId}`);
      }
    } else {
      router.push(href);
    }
    setIsMobileMenuOpen(false);
  };

  const handleSelectCategory = (catName: string) => {
    setSelectedCategory(catName);
    setIsCategoriesDropdownOpen(false);
    setIsMobileMenuOpen(false);
    if (pathname !== "/products") {
      router.push(`/products?category=${encodeURIComponent(catName)}`);
    } else {
      const el = document.getElementById("products-catalog") || document.getElementById("products");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCurrencySelect = (c: Currency) => {
    setCurrency(c);
    setIsCurrencyDropdownOpen(false);
  };

  const handleTrendingClick = (queryText: string) => {
    setSearchQuery(queryText);
    setIsSearchOpen(false);
    router.push(`/products?search=${encodeURIComponent(queryText)}`);
  };

  const trendingSearches = [
    { label: "Studio ANC Headphones", query: "headphones" },
    { label: "Titanium Smartwatch", query: "smartwatch" },
    { label: "Everyday Backpack", query: "backpack" },
    { label: "Mechanical Keyboard", query: "keyboard" },
    { label: "Nordic Diffuser", query: "diffuser" },
    { label: "Minimalist Sneakers", query: "sneakers" },
  ];

  const liveSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    const source = products && products.length > 0 ? products : PRODUCTS;
    return source
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 4);
  }, [products, searchQuery]);

  const currencyOptions: { code: Currency; symbol: string; label: string; subLabel: string }[] = [
    { code: "INR", symbol: "₹", label: "INR (₹)", subLabel: "Indian Rupee" },
    { code: "USD", symbol: "$", label: "USD ($)", subLabel: "US Dollar" },
    { code: "EUR", symbol: "€", label: "EUR (€)", subLabel: "Euro" },
    { code: "GBP", symbol: "£", label: "GBP (£)", subLabel: "British Pound" },
  ];

  return (
    <>
      <AnnouncementBar />

      <header className="sticky top-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-3 lg:gap-4">
            {/* Left: Logo & Mobile Toggle */}
            <div className="flex items-center gap-3 shrink-0">
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

              <Link href="/" className="inline-flex items-center gap-2.5 group select-none">
                <div className="w-8 h-8 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-extrabold text-xs shadow-sm transition-transform group-hover:scale-105 font-mono">
                  CH
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-black tracking-tight text-black dark:text-white leading-none">
                    CHERRY
                  </span>
                  <span className="text-[8px] font-mono tracking-[0.24em] text-zinc-400 uppercase mt-0.5 font-bold">
                    {isInformational ? "MANIFESTO" : "ATELIER"}
                  </span>
                </div>
              </Link>
            </div>

            {/* Center Navigation */}
            {isInformational ? (
              /* Informational Navigation Links */
              <nav className="hidden md:flex items-center justify-center gap-4 lg:gap-6 font-mono">
                {informationalNavItems.map((item) => {
                  const isActive = activeSection === item.targetId && pathname === "/";
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleInformationalNavClick(e, item.targetId, item.href)}
                      className={`relative py-2 text-[10.5px] lg:text-[11px] font-bold uppercase tracking-[0.14em] lg:tracking-[0.18em] transition-colors group cursor-pointer ${
                        isActive
                          ? "text-black dark:text-white"
                          : "text-zinc-400 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-black dark:bg-white rounded-full transition-all duration-300 ${
                          isActive ? "w-full opacity-100" : "w-0 group-hover:w-full opacity-30"
                        }`}
                      />
                    </a>
                  );
                })}
                <Link
                  href="/products"
                  className={`relative py-2 text-[10.5px] lg:text-[11px] font-bold uppercase tracking-[0.14em] lg:tracking-[0.18em] transition-colors group ${
                    pathname === "/products"
                      ? "text-black dark:text-white"
                      : "text-zinc-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  <span>Catalog</span>
                </Link>
              </nav>
            ) : (
              /* E-Commerce Navigation Links */
              <nav className="hidden md:flex items-center justify-center gap-1 lg:gap-2">
                <Link
                  href="/products"
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                    pathname === "/products" && (!selectedCategory || selectedCategory === "All")
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  All
                </Link>

                {/* Categories Dropdown */}
                <div className="relative" ref={categoriesDropdownRef}>
                  <button
                    onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                  >
                    <span>Categories</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isCategoriesDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isCategoriesDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-3 py-1.5 text-[9.5px] font-mono uppercase tracking-widest text-zinc-400 font-bold border-b border-zinc-100 dark:border-zinc-900 mb-1">
                        Departments
                      </div>
                      {primaryNavItems.map((cat) => (
                        <button
                          key={cat.name}
                          onClick={() => handleSelectCategory(cat.category)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                            selectedCategory === cat.category && pathname === "/products"
                              ? "bg-black text-white dark:bg-white dark:text-black font-bold"
                              : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(cat.name)}
                            <span>{cat.label}</span>
                          </div>
                          <ArrowRight className="w-3 h-3 opacity-40" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/products?filter=deals"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Deals</span>
                </Link>
              </nav>
            )}

            {/* Right Action Icons */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="h-9 w-9 inline-flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                aria-label="Search catalog"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Currency Dropdown Selector */}
              <div className="relative" ref={currencyDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
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
                    {currencyOptions.map((opt) => {
                      const isSelected = currency === opt.code;
                      return (
                        <button
                          key={opt.code}
                          type="button"
                          onClick={() => handleCurrencySelect(opt.code)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-black text-white dark:bg-white dark:text-black font-bold"
                              : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{opt.code}</span>
                            <span className="opacity-60 text-[11px]">({opt.symbol})</span>
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
                className="relative h-9 w-9 inline-flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                aria-label={`Wishlist (${wishlist.length} saved)`}
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-black dark:bg-white text-white dark:text-black text-[9px] font-mono font-bold flex items-center justify-center shadow-xs">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Order Tracker Button */}
              <button
                type="button"
                onClick={() => setIsOrderTrackerOpen(true)}
                className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                title="Track Live Shipment"
                aria-label="Track Shipment"
              >
                <PackageCheck className="w-4 h-4" />
              </button>

              {/* Admin Portal Button */}
              <Link
                href="/admin"
                className="hidden sm:inline-flex h-9 items-center gap-1.5 px-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-xs font-mono font-bold uppercase tracking-wider"
                title="Admin Console"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>

              {/* Cart Drawer Trigger (Right side of Admin) */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative inline-flex items-center gap-2 px-3.5 h-9 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all font-mono text-xs font-bold shadow-sm hover:shadow-md cursor-pointer"
                aria-label={`Shopping cart with ${cartCount} items`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                <span className="w-5 h-5 rounded-full bg-white dark:bg-black text-black dark:text-white text-[10px] font-bold flex items-center justify-center">
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
                  placeholder="Search by keywords, titanium, acoustic, wireless, apparel..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-20 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white placeholder-zinc-400 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-black dark:focus:ring-white transition-all shadow-inner"
                />
                <div className="absolute right-3 flex items-center gap-1.5">
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="p-1 text-zinc-400 hover:text-black dark:hover:text-white text-xs cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      if (searchQuery.trim()) {
                        setIsSearchOpen(false);
                        router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-black text-white dark:bg-white dark:text-black text-[10px] font-mono font-bold uppercase cursor-pointer"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Trending Searches */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-wider">
                  Trending:
                </span>
                {trendingSearches.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTrendingClick(item.query)}
                    className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-zinc-600 dark:text-zinc-400 text-[10px] font-mono transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Live Search Autocomplete Results */}
              {liveSearchResults.length > 0 && (
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900 space-y-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-wider">
                    Instant Matches ({liveSearchResults.length}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {liveSearchResults.map((prod) => (
                      <Link
                        key={prod.id}
                        href={`/products/${prod.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors group border border-transparent hover:border-zinc-200 dark:border-zinc-800"
                      >
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-zinc-200 dark:bg-zinc-800">
                          <Image src={prod.images[0]} alt={prod.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-black dark:text-white truncate group-hover:underline">
                            {prod.name}
                          </div>
                          <div className="text-[10px] font-mono text-zinc-500">
                            {prod.category} • {formatPrice(prod.price)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black px-4 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            {/* Currency selector inside mobile drawer */}
            <div className="pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <span className="text-[10px] font-mono uppercase text-zinc-400 px-1 tracking-widest font-bold block mb-2">
                Select Currency
              </span>
              <div className="grid grid-cols-2 gap-2">
                {currencyOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => setCurrency(opt.code)}
                    className={`p-2.5 rounded-xl border text-xs font-mono font-bold flex items-center justify-between transition-colors ${
                      currency === opt.code
                        ? "bg-black text-white dark:bg-white dark:text-black border-transparent"
                        : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    <span>{opt.code} ({opt.symbol})</span>
                    {currency === opt.code && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1">
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold uppercase text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <span>Catalog Portal</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </Link>

              <button
                onClick={() => {
                  setIsOrderTrackerOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono font-bold uppercase text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <PackageCheck className="w-4 h-4" />
                  <span>Track Live Dispatch</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono font-bold uppercase text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Admin</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </Link>
            </div>

            {/* Categories */}
            <div className="space-y-1 pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <span className="text-[10px] font-mono uppercase text-zinc-400 px-3 tracking-widest font-bold block mb-1">
                Categories
              </span>
              {primaryNavItems.map((item) => {
                const isSelected = selectedCategory === item.category && pathname === "/products";
                return (
                  <button
                    key={item.name}
                    onClick={() => handleSelectCategory(item.category)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold uppercase text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-black text-white dark:bg-white dark:text-black font-extrabold"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {getCategoryIcon(item.name)}
                      <span>{item.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                );
              })}
            </div>

            {/* Cart Button */}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Cart ({cartCount})</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
