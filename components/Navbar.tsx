"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import { Currency } from "@/types/shop";
import { PRODUCTS } from "@/data/products";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  Sun,
  Moon,
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
  Layers,
  Shirt,
  Headphones,
  Sparkle,
  Tv,
  Gamepad2,
  Armchair,
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
    theme,
    toggleTheme,
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
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const categoriesDropdownRef = useRef<HTMLDivElement>(null);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus search input when overlay opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
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

  const handleCategorySelect = (catName: string) => {
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
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="h-9 w-9 inline-flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 md:hidden transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>

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

                  {/* Luxury Mega Dropdown Menu */}
                  {isCategoriesDropdownOpen && (
                    <div
                      onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-5 z-50 animate-in fade-in zoom-in-95 duration-200"
                    >
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100 dark:border-zinc-900">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-bold">
                          The ShopNest Directory
                        </span>
                        <Link
                          href="/products"
                          onClick={() => setIsCategoriesDropdownOpen(false)}
                          className="text-[10px] font-mono text-zinc-500 hover:text-black dark:hover:text-white flex items-center gap-1 font-bold uppercase tracking-wider"
                        >
                          <span>Full Archive</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {primaryNavItems.map((item) => {
                          const isSelected = selectedCategory === item.category && pathname === "/products";
                          return (
                            <button
                              key={item.name}
                              onClick={() => handleCategorySelect(item.category)}
                              className={`p-3 rounded-2xl flex items-start gap-3 transition-all text-left cursor-pointer border ${
                                isSelected
                                  ? "bg-black text-white dark:bg-white dark:text-black border-transparent shadow-xs"
                                  : "bg-zinc-50/70 dark:bg-zinc-900/60 border-zinc-100 dark:border-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-200"
                              }`}
                            >
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black"
                                    : "bg-white dark:bg-black text-black dark:text-white border border-zinc-200 dark:border-zinc-800"
                                }`}
                              >
                                {getCategoryIcon(item.name)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-xs font-bold font-mono uppercase tracking-wide truncate">
                                  {item.label}
                                </div>
                                <div
                                  className={`text-[10px] truncate mt-0.5 ${
                                    isSelected ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-400"
                                  }`}
                                >
                                  {item.category === "Electronic" && "ANC Audio & Watches"}
                                  {item.category === "Fashion" && "Apparel & Sneakers"}
                                  {item.category === "Beauty" && "Botanicals & Aromatics"}
                                  {item.category === "Home Appliances" && "Espresso & Air Pure"}
                                  {item.category === "Kids & Toys" && "Montessori & Robots"}
                                  {item.category === "Furniture" && "Desks & Lounge Chairs"}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Bottom Flash Drops Highlights */}
                      <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between text-[10px] font-mono text-zinc-400 px-1">
                        <span className="flex items-center gap-1.5 text-black dark:text-white font-bold">
                          <Zap className="w-3 h-3 text-amber-500" />
                          <span>Private Allocation Drops</span>
                        </span>
                        <a
                          href="/#flash-deals"
                          onClick={() => setIsCategoriesDropdownOpen(false)}
                          className="hover:underline text-zinc-500 dark:text-zinc-400"
                        >
                          View Deals &rarr;
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct High-Value Category Nav Links */}
                {primaryNavItems.slice(0, 4).map((item) => {
                  const isSelected = selectedCategory === item.category && pathname === "/products";
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleCategorySelect(item.category)}
                      className={`relative py-2 text-[11px] font-mono font-bold uppercase tracking-[0.2em] transition-colors group cursor-pointer ${
                        isSelected
                          ? "text-black dark:text-white"
                          : "text-zinc-400 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-black dark:bg-white rounded-full transition-all duration-300 ${
                          isSelected ? "w-full" : "w-0 group-hover:w-full opacity-30"
                        }`}
                      />
                    </button>
                  );
                })}

                {/* Link to all products */}
                <Link
                  href="/products"
                  className={`relative py-2 text-[11px] font-mono font-bold uppercase tracking-[0.2em] transition-colors group ${
                    pathname === "/products" && !selectedCategory
                      ? "text-black dark:text-white"
                      : "text-zinc-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  <span>Catalog</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-black dark:bg-white rounded-full transition-all duration-300 ${
                      pathname === "/products" && !selectedCategory
                        ? "w-full"
                        : "w-0 group-hover:w-full opacity-30"
                    }`}
                  />
                </Link>
              </nav>
            )}

            {/* Right: Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* E-Commerce ONLY: Currency Selector Dropdown */}
              {!isInformational && (
                <div className="relative font-mono" ref={currencyDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                    className="h-9 px-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Change Currency"
                    aria-label="Select Currency"
                  >
                    <span>{currency}</span>
                    <ChevronDown
                      className={`w-3 h-3 text-zinc-400 transition-transform ${
                        isCurrencyDropdownOpen ? "rotate-180 text-black dark:text-white" : ""
                      }`}
                    />
                  </button>

                  {isCurrencyDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white/98 dark:bg-zinc-950/98 backdrop-blur-2xl rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-2.5 py-1.5 text-[9px] uppercase font-bold text-zinc-400 tracking-wider">
                        Settlement Currency
                      </div>
                      <div className="space-y-1 mt-1">
                        {currencyOptions.map((opt) => {
                          const isSelected = currency === opt.code;
                          return (
                            <button
                              key={opt.code}
                              onClick={() => {
                                setCurrency(opt.code);
                                setIsCurrencyDropdownOpen(false);
                              }}
                              className={`w-full px-2.5 py-2 rounded-xl flex items-center justify-between text-xs transition-colors cursor-pointer ${
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
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-black text-white dark:bg-white dark:text-black text-[10px] font-mono font-bold uppercase cursor-pointer"
                  >
                    Search
                  </button>
                </div>
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

                {/* Categories */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 px-3 tracking-widest font-bold">
                    Categories
                  </span>
                  {primaryNavItems.map((item) => {
                    const isSelected = selectedCategory === item.category && pathname === "/products";
                    return (
                      <button
                        key={item.name}
                        onClick={() => handleCategorySelect(item.category)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold uppercase text-xs transition-colors cursor-pointer ${
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

                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-1">
                  <button
                    onClick={() => {
                      setIsOrderTrackerOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono font-bold uppercase text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <PackageCheck className="w-4 h-4" />
                      <span>Track Shipment</span>
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
                      <span>Admin Portal</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
}
