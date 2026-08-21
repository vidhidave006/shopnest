"use client";

<<<<<<< HEAD
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useShop } from "@/context/ShopContext";
=======
import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useShop, CURRENCY_RATES, Currency } from "@/context/ShopContext";
>>>>>>> d3d3555ca4bf9ab32161337377cbdeb50c5209db
import {
  Search,
  ShoppingCart,
  Heart,
  X,
  Menu,
<<<<<<< HEAD
  LayoutDashboard,
  PackageCheck,
  ArrowRight,
  TrendingUp,
  Sparkles,
=======
  Sun,
  Moon,
  LayoutDashboard,
  PackageCheck,
  ArrowRight,
  ChevronDown,
  Check,
  Globe,
  Sparkles,
  Flame,
  TrendingUp,
  Headphones,
  Shirt,
  Sparkle,
  Tv,
  Gamepad2,
  Armchair,
  Compass,
>>>>>>> d3d3555ca4bf9ab32161337377cbdeb50c5209db
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
<<<<<<< HEAD
    setIsOrderTrackerOpen,
  } = useShop();
=======
    theme,
    toggleTheme,
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

  // Click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
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
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Category Icon Map helper
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
>>>>>>> d3d3555ca4bf9ab32161337377cbdeb50c5209db

  const primaryNavItems = [
    { name: "Fashion", label: "Fashion", category: "Fashion" },
    { name: "Electronic", label: "Electronic", category: "Electronic" },
    { name: "Beauty", label: "Beauty", category: "Beauty" },
    { name: "Home Appliances", label: "Home Appliances", category: "Home Appliances" },
    { name: "Kids & Toys", label: "Kids & Toys", category: "Kids & Toys" },
    { name: "Furniture", label: "Furniture", category: "Furniture" },
  ];

<<<<<<< HEAD
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
=======
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

  const handleCategorySelect = (catName: string) => {
    setSelectedCategory(catName);
    setIsCategoriesDropdownOpen(false);
    setIsMobileMenuOpen(false);
>>>>>>> d3d3555ca4bf9ab32161337377cbdeb50c5209db
    if (pathname !== "/products") {
      router.push(`/products?category=${encodeURIComponent(category)}`);
    } else {
<<<<<<< HEAD
      const el = document.getElementById("products-catalog");
=======
      const el = document.getElementById("products-catalog") || document.getElementById("products");
>>>>>>> d3d3555ca4bf9ab32161337377cbdeb50c5209db
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

<<<<<<< HEAD
  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-3 lg:gap-4">
            {/* Left: Logo & Mobile Menu Toggle */}
            <div className="flex items-center gap-2.5 shrink-0">
=======
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
>>>>>>> d3d3555ca4bf9ab32161337377cbdeb50c5209db
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="h-9 w-9 inline-flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 md:hidden transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>

<<<<<<< HEAD
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
=======
              <Link href="/" className="inline-flex items-center gap-2.5 group select-none">
                <div className="w-8 h-8 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-extrabold text-xs shadow-sm transition-transform group-hover:scale-105">
                  SN
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-black tracking-tight text-black dark:text-white leading-none">
                    SHOPNEST
                  </span>
                  <span className="text-[8px] font-mono tracking-[0.24em] text-zinc-400 uppercase mt-0.5 font-bold">
                    {isInformational ? "MANIFESTO" : "ATELIER"}
>>>>>>> d3d3555ca4bf9ab32161337377cbdeb50c5209db
                  </span>
                </div>
              </Link>
            </div>

<<<<<<< HEAD
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
=======
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
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-black dark:bg-white rounded-full transition-all duration-300 ${
                      pathname === "/products" ? "w-full opacity-100" : "w-0 group-hover:w-full opacity-30"
                    }`}
                  />
                </Link>
              </nav>
            ) : (
              /* E-Commerce Categories Mega-Dropdown & Direct Links */
              <nav className="hidden md:flex items-center justify-center gap-5 lg:gap-7">
                {/* Vault / Categories Dropdown Trigger */}
                <div className="relative font-mono" ref={categoriesDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                    onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
                    className={`inline-flex items-center gap-1.5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all cursor-pointer ${
                      isCategoriesDropdownOpen
                        ? "text-black dark:text-white"
                        : "text-zinc-400 hover:text-black dark:hover:text-white"
                    }`}
                    aria-expanded={isCategoriesDropdownOpen}
                  >
                    <span>Collections</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isCategoriesDropdownOpen ? "rotate-180 text-black dark:text-white" : ""
                      }`}
                    />
                  </button>

                  {/* Luxury Categories Dropdown Menu */}
                  {isCategoriesDropdownOpen && (
                    <div
                      onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl p-4 animate-in fade-in zoom-in-95 duration-150 z-50 text-left"
                    >
                      <div className="flex items-center justify-between px-2 pb-3 border-b border-zinc-100 dark:border-zinc-900">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-bold">
                          Archive Categories
                        </span>
                        <Link
                          href="/products"
                          onClick={() => setIsCategoriesDropdownOpen(false)}
                          className="text-[10px] font-mono uppercase tracking-wider text-black dark:text-white hover:underline flex items-center gap-1 font-bold"
                        >
                          <span>View All ({PRODUCTS.length})</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      {/* 2-Column Categories Grid */}
                      <div className="grid grid-cols-2 gap-2 pt-3">
                        {CATEGORIES.map((cat) => {
                          const isSelected = selectedCategory === cat.name;
                          return (
                            <button
                              key={cat.id}
                              onClick={() => handleCategorySelect(cat.name)}
                              className={`p-3 rounded-2xl flex items-center gap-3 transition-all text-left group cursor-pointer ${
                                isSelected
                                  ? "bg-black text-white dark:bg-white dark:text-black shadow-xs"
                                  : "hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
                              }`}
                            >
                              <div
                                className={`p-2 rounded-xl shrink-0 transition-colors ${
                                  isSelected
                                    ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black"
                                    : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white"
                                }`}
                              >
                                {getCategoryIcon(cat.name)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-xs font-bold truncate leading-tight">
                                  {cat.name}
                                </div>
                                <div
                                  className={`text-[10px] font-mono mt-0.5 truncate ${
                                    isSelected
                                      ? "text-zinc-300 dark:text-zinc-600"
                                      : "text-zinc-400"
                                  }`}
                                >
                                  {cat.tag}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Dropdown Highlights Footer */}
                      <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-900 grid grid-cols-2 gap-2">
                        <Link
                          href="/products?search=flash"
                          onClick={() => setIsCategoriesDropdownOpen(false)}
                          className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] font-mono font-bold uppercase transition-colors"
                        >
                          <span className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400">
                            <Flame className="w-3.5 h-3.5" /> Flash Drops
                          </span>
                          <ArrowRight className="w-3 h-3 text-zinc-400" />
                        </Link>
                        <Link
                          href="/products?search=best"
                          onClick={() => setIsCategoriesDropdownOpen(false)}
                          className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] font-mono font-bold uppercase transition-colors"
                        >
                          <span className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200">
                            <TrendingUp className="w-3.5 h-3.5" /> Signatures
                          </span>
                          <ArrowRight className="w-3 h-3 text-zinc-400" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct Category Links */}
                {primaryNavItems.slice(0, 5).map((item) => {
                  const isActive = selectedCategory === item.category;

                  return (
                    <button
                      key={item.name}
                      onClick={() => handleCategorySelect(item.category)}
                      className={`relative py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all cursor-pointer group ${
                        isActive
                          ? "text-black dark:text-white font-extrabold"
                          : "text-zinc-400 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-black dark:bg-white rounded-full transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full opacity-30"
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>
            )}

            {/* Right: Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* E-Commerce ONLY: Luxury Currency Selector Dropdown */}
              {!isInformational && (
                <div className="relative font-mono hidden sm:block" ref={currencyDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                    className={`h-9 px-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer select-none ${
                      isCurrencyDropdownOpen
                        ? "border-black dark:border-white bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white ring-1 ring-black dark:ring-white"
                        : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400"
>>>>>>> d3d3555ca4bf9ab32161337377cbdeb50c5209db
                    }`}
                    title="Change Currency"
                    aria-expanded={isCurrencyDropdownOpen}
                  >
<<<<<<< HEAD
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-black dark:bg-white rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-full"
                          : "w-0 group-hover:w-full opacity-30"
=======
                    <Globe className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span className="tracking-wider">{currency} ({CURRENCY_RATES[currency]?.symbol})</span>
                    <ChevronDown
                      className={`w-3 h-3 text-zinc-400 transition-transform duration-200 ${
                        isCurrencyDropdownOpen ? "rotate-180 text-black dark:text-white" : ""
>>>>>>> d3d3555ca4bf9ab32161337377cbdeb50c5209db
                      }`}
                    />
                  </button>

<<<<<<< HEAD
            {/* Right: Icon Utility Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Search Toggle Button */}
=======
                  {/* Currency Dropdown Popup */}
                  {isCurrencyDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-1.5 animate-in fade-in zoom-in-95 duration-150 z-50">
                      <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-900 text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                        Settlement Currency
                      </div>
                      <div className="space-y-0.5 pt-1">
                        {currencyOptions.map((opt) => {
                          const isSelected = currency === opt.code;
                          return (
                            <button
                              key={opt.code}
                              type="button"
                              onClick={() => {
                                setCurrency(opt.code);
                                setIsCurrencyDropdownOpen(false);
                              }}
                              className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left transition-colors group cursor-pointer ${
                                isSelected
                                  ? "bg-black text-white dark:bg-white dark:text-black font-bold shadow-xs"
                                  : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span
                                  className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${
                                    isSelected
                                      ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black"
                                      : "bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white border border-zinc-200 dark:border-zinc-800"
                                  }`}
                                >
                                  {opt.symbol}
                                </span>
                                <div className="min-w-0">
                                  <div className="text-xs leading-none font-bold">{opt.code}</div>
                                  <div
                                    className={`text-[10px] mt-0.5 truncate ${
                                      isSelected ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-400"
                                    }`}
                                  >
                                    {opt.subLabel}
                                  </div>
                                </div>
                              </div>
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Search Toggle */}
>>>>>>> d3d3555ca4bf9ab32161337377cbdeb50c5209db
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`h-9 w-9 inline-flex items-center justify-center rounded-xl transition-colors cursor-pointer ${
                  isSearchOpen
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
                }`}
                title="Search Objects"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

<<<<<<< HEAD
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
=======
              {/* E-Commerce ONLY: Wishlist Button */}
              {!isInformational && (
                <button
                  onClick={() => setIsWishlistOpen(true)}
                  className="h-9 w-9 inline-flex items-center justify-center relative rounded-xl text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                  aria-label="Wishlist"
                  title="Wishlist"
                >
                  <Heart className="w-4 h-4" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-black text-white dark:bg-white dark:text-black text-[9px] font-mono font-bold flex items-center justify-center shadow-xs">
                      {wishlist.length}
                    </span>
                  )}
                </button>
              )}

              {/* E-Commerce ONLY: Order Tracker Modal Trigger */}
              {!isInformational && (
                <button
                  onClick={() => setIsOrderTrackerOpen(true)}
                  className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-xl text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                  title="Track Live Shipment"
                  aria-label="Track Shipment"
                >
                  <PackageCheck className="w-4 h-4" />
                </button>
              )}

              {/* E-Commerce ONLY: Cart Drawer Trigger */}
              {!isInformational && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="h-9 inline-flex items-center gap-2 px-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors font-mono font-bold text-xs cursor-pointer shadow-2xs border border-zinc-200 dark:border-zinc-800"
                  title="View Bag"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{cartCount}</span>
                  {cartSubtotal > 0 && (
                    <span className="hidden lg:inline text-[10px] text-zinc-400 font-normal border-l border-zinc-300 dark:border-zinc-700 pl-2">
                      {formatPrice(cartSubtotal)}
                    </span>
                  )}
                </button>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="h-9 w-9 inline-flex items-center justify-center rounded-xl text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                title="Toggle Appearance Mode"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Admin Portal Link */}
              <Link
                href="/admin"
                className="hidden sm:inline-flex h-9 items-center gap-1.5 px-3 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition-opacity text-xs font-mono font-bold uppercase tracking-wider"
                title="Admin Console"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
>>>>>>> d3d3555ca4bf9ab32161337377cbdeb50c5209db
            </div>
          </div>
        </div>

        {/* Search Overlay Container */}
        {isSearchOpen && (
          <div className="border-t border-zinc-200 dark:border-zinc-800 bg-white/98 dark:bg-black/98 backdrop-blur-2xl py-6 px-4 animate-in slide-in-from-top-2 duration-200 shadow-xl">
            <div className="max-w-3xl mx-auto space-y-4">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="absolute left-4 w-4 h-4 text-zinc-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products by title, material, category, or specs..."
                  className="w-full h-12 pl-11 pr-24 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white placeholder:text-zinc-400 text-xs font-mono focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                />
<<<<<<< HEAD
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
=======
                <div className="absolute right-3 flex items-center gap-1.5">
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="p-1 text-zinc-400 hover:text-black dark:hover:text-white text-xs cursor-pointer"
                    >
                      Clear
                    </button>
>>>>>>> d3d3555ca4bf9ab32161337377cbdeb50c5209db
                  )}
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-black text-white dark:bg-white dark:text-black text-[10px] font-mono font-bold uppercase cursor-pointer"
                  >
                    Search
                  </button>
                </div>
<<<<<<< HEAD
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
=======
              </form>

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
>>>>>>> d3d3555ca4bf9ab32161337377cbdeb50c5209db
                  >
                    {item.label}
                  </button>
                ))}
              </div>
<<<<<<< HEAD
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
=======

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
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors group border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
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
          <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black px-4 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            {/* Informational Mobile Menu */}
            {isInformational ? (
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-400 px-3 tracking-widest font-bold block mb-1">
                  Brand Navigation
                </span>
                {informationalNavItems.map((item) => {
                  const isActive = activeSection === item.targetId && pathname === "/";
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleInformationalNavClick(e, item.targetId, item.href)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold uppercase text-xs transition-colors cursor-pointer ${
                        isActive
                          ? "bg-black text-white dark:bg-white dark:text-black font-extrabold"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                    </a>
                  );
                })}
                <Link
                  href="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold uppercase text-xs transition-colors cursor-pointer ${
                    pathname === "/products"
                      ? "bg-black text-white dark:bg-white dark:text-black font-extrabold"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  <span>Full Catalog Portal</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </div>
            ) : (
              /* E-Commerce Mobile Menu */
              <>
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

                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 px-3 tracking-widest font-bold">
                    Categories
                  </span>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.name)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold uppercase text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        {getCategoryIcon(cat.name)}
                        <span>{cat.name}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsOrderTrackerOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold uppercase text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
                  >
                    <PackageCheck className="w-4 h-4" />
                    <span>Track Live Order</span>
                  </button>
                </div>
              </>
            )}

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold uppercase text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Admin Console</span>
>>>>>>> d3d3555ca4bf9ab32161337377cbdeb50c5209db
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
