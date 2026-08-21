"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/shop";
import { CATEGORIES } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { CustomSelect, CustomSelectOption } from "@/components/ui/CustomSelect";
import { matchProductSearch } from "@/lib/searchUtils";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  SlidersHorizontal,
  LayoutGrid,
  List,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Flame,
  X,
  ArrowUpDown,
  Tag,
  Briefcase,
  Headphones,
  Watch,
  Shirt,
  Lamp,
  Compass,
  Layers,
} from "lucide-react";

interface AdminProductsProps {
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
}

export function AdminProducts({
  onAddProduct,
  onEditProduct,
}: AdminProductsProps) {
  const { products, deleteProduct, updateStock, formatPrice } = useShop();

  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "stock-asc" | "rating">("default");
  const [stockFilter, setStockFilter] = useState<"all" | "in-stock" | "low-stock" | "out-of-stock">("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Get distinct brands from current products
  const brands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.brand) set.add(p.brand);
    });
    return Array.from(set);
  }, [products]);

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

  // Custom Category Dropdown Options
  const categoryOptions: CustomSelectOption[] = useMemo(() => {
    const allOpt: CustomSelectOption = {
      value: "All",
      label: "All Categories",
      description: "Full store catalog registry",
      icon: <Layers className="w-4 h-4" />,
      badge: `${products.length}`,
    };
    const catOpts = CATEGORIES.map((c) => {
      const count = products.filter((p) => p.category === c.name).length;
      return {
        value: c.name,
        label: c.name,
        description: c.description,
        icon: getCategoryIcon(c.id),
        badge: `${count} items`,
        badgeColor: c.tag === "Trending" ? "bg-orange-500/20 text-orange-500" : undefined,
      };
    });
    return [allOpt, ...catOpts];
  }, [products]);

  // Custom Brand Dropdown Options
  const brandOptions: CustomSelectOption[] = useMemo(() => {
    const allOpt: CustomSelectOption = {
      value: "All",
      label: "All Studio Labels",
      icon: <Briefcase className="w-4 h-4" />,
    };
    const bOpts = brands.map((b) => ({
      value: b,
      label: b,
      badge: "Brand",
    }));
    return [allOpt, ...bOpts];
  }, [brands]);

  // Custom Sort Dropdown Options
  const sortOptions: CustomSelectOption[] = [
    {
      value: "default",
      label: "Catalog Default Order",
      description: "Standard registry order",
      icon: <ArrowUpDown className="w-4 h-4" />,
    },
    {
      value: "price-asc",
      label: "Price: Low to High",
      description: "Ascending price order",
    },
    {
      value: "price-desc",
      label: "Price: High to Low",
      description: "Luxury flagship items first",
    },
    {
      value: "stock-asc",
      label: "Stock: Low Stock Warning",
      description: "Items needing urgent restock",
      badge: "Alerts",
      badgeColor: "bg-amber-500/20 text-amber-500",
    },
    {
      value: "rating",
      label: "Rating & Customer Reviews",
      description: "Highest rated client favorites",
    },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCat !== "All" && p.category !== selectedCat) return false;
        if (selectedBrand !== "All" && p.brand !== selectedBrand) return false;

        if (stockFilter === "in-stock" && (!p.inStock || (p.stockCount ?? 0) === 0)) return false;
        if (stockFilter === "low-stock" && ((p.stockCount ?? 0) > 5 || (p.stockCount ?? 0) === 0)) return false;
        if (stockFilter === "out-of-stock" && (p.inStock && (p.stockCount ?? 0) > 0)) return false;

        if (search.trim()) {
          if (!matchProductSearch(p, search)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "stock-asc") return (a.stockCount ?? 0) - (b.stockCount ?? 0);
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        return 0;
      });
  }, [products, selectedCat, selectedBrand, sortBy, stockFilter, search]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 font-sans text-xs">
      {/* Top Header & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-zinc-400">
            INVENTORY & CATALOG REGISTRY
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-black dark:text-white">
            Products Registry ({products.length})
          </h2>
        </div>

        <button
          onClick={onAddProduct}
          className="px-5 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Website-Related Custom Dropdown Filters Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Search Input (Span 4) */}
          <div className="relative lg:col-span-4 w-full">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title, brand, or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-black dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 1. Custom Category Dropdown (Span 3) */}
          <div className="lg:col-span-3">
            <CustomSelect
              options={categoryOptions}
              value={selectedCat}
              onChange={(val) => setSelectedCat(val)}
              menuClassName="w-72"
            />
          </div>

          {/* 2. Custom Brand Dropdown (Span 2) */}
          <div className="lg:col-span-2">
            <CustomSelect
              options={brandOptions}
              value={selectedBrand}
              onChange={(val) => setSelectedBrand(val)}
            />
          </div>

          {/* 3. Custom Sort Dropdown (Span 2) */}
          <div className="lg:col-span-2">
            <CustomSelect
              options={sortOptions}
              value={sortBy}
              onChange={(val) => setSortBy(val)}
              menuClassName="w-64"
            />
          </div>

          {/* 4. Table / Grid Switcher (Span 1) */}
          <div className="lg:col-span-1 flex items-center justify-end">
            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "table"
                    ? "bg-white dark:bg-black text-black dark:text-white shadow-xs"
                    : "text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-black text-black dark:text-white shadow-xs"
                    : "text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Stock Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-900 text-[11px]">
          <span className="text-zinc-400 uppercase text-[10px]">Stock Status:</span>
          {[
            { id: "all", label: `All Products (${products.length})` },
            { id: "in-stock", label: `In Stock (${products.filter((p) => p.inStock && (p.stockCount ?? 0) > 0).length})` },
            { id: "low-stock", label: `Low Stock ≤5 (${products.filter((p) => (p.stockCount ?? 0) > 0 && (p.stockCount ?? 0) <= 5).length})` },
            { id: "out-of-stock", label: `Out of Stock (${products.filter((p) => !p.inStock || (p.stockCount ?? 0) === 0).length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStockFilter(tab.id as any)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                stockFilter === tab.id
                  ? "bg-black dark:bg-white text-white dark:text-black font-bold shadow-xs"
                  : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      {filteredProducts.length > 0 ? (
        viewMode === "table" ? (
          /* Table View */
          <div className="rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-500 text-[10px] uppercase">
                    <th className="py-3.5 px-4 font-bold">Product</th>
                    <th className="py-3.5 px-4 font-bold">Category</th>
                    <th className="py-3.5 px-4 font-bold">Price</th>
                    <th className="py-3.5 px-4 font-bold">Stock</th>
                    <th className="py-3.5 px-4 font-bold">Badges</th>
                    <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                  {filteredProducts.map((prod) => {
                    const isLow = (prod.stockCount ?? 0) > 0 && (prod.stockCount ?? 0) <= 5;
                    const isOut = !prod.inStock || (prod.stockCount ?? 0) === 0;

                    return (
                      <tr
                        key={prod.id}
                        className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
                      >
                        {/* Product info */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                              <Image
                                src={prod.images[0]}
                                alt={prod.name}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                            <div>
                              <div className="font-bold text-black dark:text-white line-clamp-1 text-xs">
                                {prod.name}
                              </div>
                              <div className="text-[10px] text-zinc-400 mt-0.5">
                                Brand: <strong>{prod.brand || "ShopNest"}</strong> &bull; ID: {prod.id}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                          <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px]">
                            {prod.category}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-3 px-4">
                          <div className="font-black text-black dark:text-white">
                            {formatPrice(prod.price)}
                          </div>
                          {prod.originalPrice && (
                            <div className="text-[10px] text-zinc-400 line-through">
                              {formatPrice(prod.originalPrice)}
                            </div>
                          )}
                        </td>

                        {/* Stock Management */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="0"
                              value={prod.stockCount}
                              onChange={(e) => updateStock(prod.id, Number(e.target.value))}
                              className="w-16 h-7 px-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-center font-bold text-black dark:text-white focus:outline-none"
                            />
                            {isOut ? (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-red-500/10 text-red-600 border border-red-500/20">
                                Out
                              </span>
                            ) : isLow ? (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-500/10 text-amber-600 border border-amber-500/20">
                                Low ({prod.stockCount})
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                                OK
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Badges */}
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap items-center gap-1 text-[9px] font-bold">
                            {prod.isNew && (
                              <span className="px-1.5 py-0.5 rounded bg-black text-white dark:bg-white dark:text-black">
                                NEW
                              </span>
                            )}
                            {prod.isBestSeller && (
                              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                                TOP
                              </span>
                            )}
                            {prod.isFlashDeal && (
                              <span className="px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30">
                                FLASH
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              href={`/products/${prod.id}`}
                              target="_blank"
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                              title="View in Live Shop"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              onClick={() => onEditProduct(prod)}
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                              title="Edit Details"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Remove "${prod.name}" from inventory?`)) {
                                  deleteProduct(prod.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-4 hover:border-black dark:hover:border-zinc-600 transition-all shadow-xs"
              >
                <div className="space-y-3">
                  {/* Thumbnail Image */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <Image
                      src={prod.images[0]}
                      alt={prod.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {prod.isNew && (
                        <span className="px-2 py-0.5 rounded bg-black text-white dark:bg-white dark:text-black text-[9px] font-bold uppercase">
                          New Drop
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Category */}
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase">{prod.category}</span>
                    <h3 className="font-bold text-black dark:text-white text-xs leading-snug line-clamp-1 mt-0.5">
                      {prod.name}
                    </h3>
                  </div>

                  {/* Price & Stock */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-900">
                    <div>
                      <div className="font-black text-black dark:text-white">{formatPrice(prod.price)}</div>
                      {prod.originalPrice && (
                        <div className="text-[10px] text-zinc-400 line-through">
                          {formatPrice(prod.originalPrice)}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-zinc-400 block">Stock:</span>
                      <span className={`font-bold ${prod.stockCount <= 5 ? "text-amber-500" : "text-black dark:text-white"}`}>
                        {prod.stockCount} units
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-900">
                  <button
                    onClick={() => onEditProduct(prod)}
                    className="flex-1 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold uppercase text-[10px] transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  <Link
                    href={`/products/${prod.id}`}
                    target="_blank"
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    title="View in Store"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${prod.name}"?`)) {
                        deleteProduct(prod.id);
                      }
                    }}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-500"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
          <p className="text-zinc-400 text-xs uppercase">No matching products found</p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCat("All");
              setSelectedBrand("All");
              setStockFilter("all");
              setSortBy("default");
            }}
            className="px-4 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
