"use client";

import React, { useState, useEffect } from "react";
import { useShop, Currency } from "@/context/ShopContext";
import { CustomSelect, CustomSelectOption } from "@/components/ui/CustomSelect";
import {
  Settings,
  RotateCcw,
  Sun,
  Moon,
  ShieldAlert,
  Check,
  Globe,
  Truck,
  Sparkles,
  Layers,
  Bell,
  DollarSign,
  ShieldCheck,
  LayoutTemplate,
  FileText,
  ShoppingBag,
  Loader2,
} from "lucide-react";

export function AdminSettings() {
  const {
    currency,
    setCurrency,
    theme,
    toggleTheme,
    resetToDefaultData,
    addToast,
  } = useShop();

  // Home Page Mode state (persisted in backend data/settings.json)
  const [homePageMode, setHomePageMode] = useState<"ecommerce" | "informational">("ecommerce");
  const [isUpdatingMode, setIsUpdatingMode] = useState(false);
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);

  // Load backend settings on mount
  useEffect(() => {
    let isMounted = true;
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.homePageMode) {
            setHomePageMode(data.homePageMode);
          }
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        if (isMounted) setIsLoadingSettings(false);
      }
    }
    loadSettings();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggleHomePageMode = async () => {
    const nextMode = homePageMode === "ecommerce" ? "informational" : "ecommerce";
    setHomePageMode(nextMode);
    setIsUpdatingMode(true);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ homePageMode: nextMode }),
      });

      if (res.ok) {
        if (nextMode === "informational") {
          addToast(
            "Home Page Mode: ON",
            "Informational Brand Manifesto Homepage is now live for all visitors.",
            "success"
          );
        } else {
          addToast(
            "Home Page Mode: OFF",
            "Existing E-commerce Storefront Homepage is now live for all visitors.",
            "success"
          );
        }
      } else {
        // Rollback on failure
        setHomePageMode(homePageMode);
        addToast("Error", "Failed to update homepage mode on server.", "error");
      }
    } catch (err) {
      setHomePageMode(homePageMode);
      addToast("Network Error", "Unable to communicate with server settings API.", "error");
    } finally {
      setIsUpdatingMode(false);
    }
  };

  const [storeName, setStoreName] = useState("ShopNest Monochrome Edition");
  const [supportEmail, setSupportEmail] = useState("concierge@shopnest.in");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(2999);
  const [taxRate, setTaxRate] = useState(18.0); // Standard GST in India
  const [shippingProvider, setShippingProvider] = useState("bluedart-carbon");
  const [storeMode, setStoreMode] = useState("live");
  const [lowStockThreshold, setLowStockThreshold] = useState(5);

  const storeModeOptions: CustomSelectOption[] = [
    { value: "live", label: "Live Storefront (Accepting Orders)", description: "Open for public global commerce", icon: <Globe className="w-3.5 h-3.5 text-emerald-500" />, badge: "Online" },
    { value: "vip", label: "Private VIP Concierge Portal", description: "Invite-only password protected", badge: "VIP" },
    { value: "preview", label: "Catalog Preview (Read-Only)", description: "Checkout drawer temporarily disabled" },
  ];

  const currencyOptions: CustomSelectOption[] = [
    { value: "INR", label: "INR (₹ - Indian Rupee - Base)", description: "Domestic base currency settlement", badge: "Base" },
    { value: "USD", label: "USD ($ - United States Dollar)", description: "Global US Dollar rate (0.012x)" },
    { value: "EUR", label: "EUR (€ - European Union Euro)", description: "Euro currency rate (0.011x)" },
    { value: "GBP", label: "GBP (£ - British Pound Sterling)", description: "British Pound rate (0.0095x)" },
  ];

  const courierOptions: CustomSelectOption[] = [
    { value: "bluedart-carbon", label: "Blue Dart Express Carbon-Neutral", description: "Domestic overnight courier priority", icon: <Truck className="w-3.5 h-3.5" />, badge: "Default" },
    { value: "delhivery-surface", label: "Delhivery Premium Air Cargo", description: "Pan-India fast logistics" },
    { value: "dhl-global", label: "DHL Express Worldwide", description: "International tracked express" },
    { value: "shadowfax-priority", label: "Shadowfax Same-Day Metro", description: "Immediate metro city courier" },
  ];

  const stockThresholdOptions: CustomSelectOption[] = [
    { value: 5, label: "5 Units or less remaining", description: "Standard luxury registry alert", icon: <Bell className="w-3.5 h-3.5 text-amber-500" />, badge: "Default" },
    { value: 10, label: "10 Units or less remaining", description: "High-velocity restock alert" },
    { value: 3, label: "3 Units or less remaining", description: "Strict limited edition drops" },
  ];

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    addToast("Settings Saved", "Store configuration parameters updated in INR (₹).", "success");
  };

  const handleResetData = () => {
    if (
      confirm(
        "Are you sure you want to reset all products, orders, promo codes, and reviews to factory default demo data in Indian Currency (₹)?"
      )
    ) {
      resetToDefaultData();
    }
  };

  return (
    <div className="space-y-8 max-w-4xl font-sans text-xs animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
          SYSTEM & STORE POLICIES
        </span>
        <h2 className="text-xl sm:text-2xl font-black uppercase text-black dark:text-white tracking-tight">
          Store Configuration
        </h2>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Home Page Mode Switcher */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold uppercase text-black dark:text-white flex items-center gap-2">
                  <LayoutTemplate className="w-4 h-4 text-zinc-400" />
                  Home Page Mode
                </span>
                <span
                  className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full transition-colors ${
                    homePageMode === "informational"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                  }`}
                >
                  {isLoadingSettings ? "Loading..." : homePageMode === "informational" ? "ON — Informational" : "OFF — E-Commerce"}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 max-w-xl leading-relaxed">
                Control which homepage visitors see across all devices. Turn ON to showcase the brand manifesto, craftsmanship, and materials science story, or turn OFF to display the full live catalog and product showcase.
              </p>
            </div>

            {/* Modern Black-and-White Rounded Toggle Switch */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right hidden sm:block">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider block text-black dark:text-white">
                  {homePageMode === "informational" ? "Informational" : "E-Commerce"}
                </span>
                <span className="text-[9px] font-mono text-zinc-400 uppercase">
                  {homePageMode === "informational" ? "Brand Story Mode" : "Catalog Storefront"}
                </span>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={homePageMode === "informational"}
                disabled={isLoadingSettings || isUpdatingMode}
                onClick={handleToggleHomePageMode}
                className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-black disabled:opacity-50 ${
                  homePageMode === "informational"
                    ? "bg-black dark:bg-white"
                    : "bg-zinc-200 dark:bg-zinc-800"
                }`}
                title={`Toggle Home Page Mode (Currently ${homePageMode === "informational" ? "ON" : "OFF"})`}
              >
                <span className="sr-only">Toggle Home Page Mode</span>
                <span
                  className={`pointer-events-none flex h-6 w-6 transform items-center justify-center rounded-full transition-transform duration-200 ease-in-out shadow-sm ${
                    homePageMode === "informational"
                      ? "translate-x-6 bg-white text-black dark:bg-black dark:text-white"
                      : "translate-x-0 bg-white text-zinc-400 dark:bg-zinc-400 dark:text-zinc-900"
                  }`}
                >
                  {isUpdatingMode ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : homePageMode === "informational" ? (
                    <FileText className="w-3 h-3" />
                  ) : (
                    <ShoppingBag className="w-3 h-3" />
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Mode Feature Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-900">
            <button
              type="button"
              onClick={() => {
                if (homePageMode !== "ecommerce") handleToggleHomePageMode();
              }}
              className={`p-3.5 rounded-xl border cursor-pointer text-left transition-all ${
                homePageMode === "ecommerce"
                  ? "bg-zinc-100 dark:bg-zinc-900 border-black dark:border-white shadow-2xs"
                  : "bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 opacity-60 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span className="font-bold uppercase text-[11px] text-black dark:text-white">
                    OFF: Existing E-Commerce
                  </span>
                </div>
                {homePageMode === "ecommerce" && (
                  <span className="w-2 h-2 rounded-full bg-black dark:bg-white animate-pulse"></span>
                )}
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                Hero showcase, value trust bar, curated categories grid, best seller product cards, customer reviews, and newsletter.
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                if (homePageMode !== "informational") handleToggleHomePageMode();
              }}
              className={`p-3.5 rounded-xl border cursor-pointer text-left transition-all ${
                homePageMode === "informational"
                  ? "bg-zinc-100 dark:bg-zinc-900 border-black dark:border-white shadow-2xs"
                  : "bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 opacity-60 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" />
                  <span className="font-bold uppercase text-[11px] text-black dark:text-white">
                    ON: Informational Home
                  </span>
                </div>
                {homePageMode === "informational" && (
                  <span className="w-2 h-2 rounded-full bg-black dark:bg-white animate-pulse"></span>
                )}
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                Brand design manifesto, aerospace titanium science, interactive materials deep dive, evolution chronology, and FAQ knowledge base.
              </p>
            </button>
          </div>
        </div>

        {/* General Store Profile */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-4">
          <h3 className="text-sm font-bold uppercase text-black dark:text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-zinc-400" />
            General Store Profile & Operations
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-400">
                Store Brand Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-400">
                Concierge Support Email
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white focus:outline-none"
              />
            </div>

            {/* Custom Storefront Mode Dropdown */}
            <div>
              <CustomSelect
                label="Storefront Mode"
                options={storeModeOptions}
                value={storeMode}
                onChange={(val) => setStoreMode(val)}
              />
            </div>
          </div>
        </div>

        {/* Currency & Financials */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-4">
          <h3 className="text-sm font-bold uppercase text-black dark:text-white flex items-center gap-2">
            <Truck className="w-4 h-4 text-zinc-400" />
            Pricing, Currency & Shipping Policies
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Custom Currency Dropdown */}
            <div>
              <CustomSelect
                label="Base Currency"
                options={currencyOptions}
                value={currency}
                onChange={(val) => setCurrency(val as Currency)}
              />
            </div>

            {/* Custom Courier Service Dropdown */}
            <div>
              <CustomSelect
                label="Default Courier"
                options={courierOptions}
                value={shippingProvider}
                onChange={(val) => setShippingProvider(val)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-400">
                Free Shipping Threshold (₹)
              </label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                className="w-full h-10 px-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white focus:outline-none font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase font-bold text-zinc-600 dark:text-zinc-400">
                Estimated GST Tax Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full h-10 px-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white focus:outline-none font-bold"
              />
            </div>
          </div>
        </div>

        {/* Custom Inventory Alert Dropdown */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-4">
          <h3 className="text-sm font-bold uppercase text-black dark:text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-zinc-400" />
            Inventory Alert Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <CustomSelect
                label="Low-Stock Trigger Threshold"
                options={stockThresholdOptions}
                value={lowStockThreshold}
                onChange={(val) => setLowStockThreshold(Number(val))}
              />
            </div>
          </div>
        </div>

        {/* Theme & Display Preferences */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-4">
          <h3 className="text-sm font-bold uppercase text-black dark:text-white flex items-center gap-2">
            <Sun className="w-4 h-4 text-zinc-400" />
            Visual Theme Mode
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-black dark:text-white">Active Appearance</p>
              <p className="text-[11px] text-zinc-500">Currently set to {theme.toUpperCase()} luxury monochrome theme.</p>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 font-bold uppercase flex items-center gap-2 transition-colors"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>Switch to {theme === "dark" ? "Light" : "Dark"} Mode</span>
            </button>
          </div>
        </div>

        {/* Action button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold uppercase text-xs shadow-md flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Check className="w-4 h-4" />
            <span>Save Store Settings</span>
          </button>
        </div>
      </form>

      {/* Danger Zone: Reset Data */}
      <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-4">
        <h3 className="text-sm font-bold uppercase text-red-600 dark:text-red-400 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" />
          Demo Data Management & Factory Reset
        </h3>
        <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Need to start fresh or restore initial showcase products and demo orders? This action will reset local storage back to the original curated objects in Indian Rupee (₹), demo orders, active promo codes, and initial customer reviews.
        </p>
        <button
          type="button"
          onClick={handleResetData}
          className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 font-bold uppercase text-xs transition-colors flex items-center gap-2 shadow-xs"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Data to Demo Defaults (INR ₹)</span>
        </button>
      </div>
    </div>
  );
}
