"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Order, Product } from "@/types/shop";
import { useShop } from "@/context/ShopContext";
import { CustomSelect, CustomSelectOption } from "@/components/ui/CustomSelect";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Package,
  AlertTriangle,
  ArrowUpRight,
  ArrowRight,
  Plus,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  Sparkles,
  Calendar,
} from "lucide-react";

interface AdminDashboardProps {
  onNavigateTab: (tab: string) => void;
  onOpenAddProduct: () => void;
  onSelectOrder: (order: Order) => void;
}

export function AdminDashboard({
  onNavigateTab,
  onOpenAddProduct,
  onSelectOrder,
}: AdminDashboardProps) {
  const { products, orders, formatPrice } = useShop();
  const [timeframe, setTimeframe] = useState("7d");

  const timeframeOptions: CustomSelectOption[] = [
    { value: "24h", label: "Last 24 Hours", description: "Real-time today's checkouts", icon: <Clock className="w-3.5 h-3.5" /> },
    { value: "7d", label: "Last 7 Days (Live)", description: "Weekly operational performance", icon: <Calendar className="w-3.5 h-3.5 text-emerald-500" />, badge: "Active" },
    { value: "30d", label: "This Month (August)", description: "Monthly consolidated sales" },
    { value: "all", label: "All-Time Operations", description: "Lifetime store registry" },
  ];

  // Metrics calculations
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalOrders = orders.length;
  const activeProducts = products.length;
  const lowStockProducts = products.filter((p) => (p.stockCount ?? 0) <= 5);
  const outOfStockProducts = products.filter((p) => !p.inStock || (p.stockCount ?? 0) === 0);

  // Status counts
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const processingOrders = orders.filter((o) => o.status === "processing").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;

  const recentOrders = orders.slice(0, 5);
  const topProducts = [...products]
    .sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0))
    .slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in duration-200 font-sans text-xs">
      {/* Dashboard Title & Timeframe Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
            STORE OVERVIEW & METRICS
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-black dark:text-white tracking-tight">
            Executive Summary
          </h2>
        </div>

        {/* Custom Timeframe Dropdown */}
        <div className="w-56">
          <CustomSelect
            size="sm"
            options={timeframeOptions}
            value={timeframe}
            onChange={(val) => setTimeframe(val)}
          />
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Gross Revenue */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 text-xs">
            <span className="uppercase font-bold tracking-wider">Gross Volume</span>
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-black dark:text-white">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-black dark:text-white">
              {formatPrice(totalRevenue)}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% vs last period</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Total Orders */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 text-xs">
            <span className="uppercase font-bold tracking-wider">Total Orders</span>
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-black dark:text-white">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-black dark:text-white">
              {totalOrders}
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              {pendingOrders} pending &bull; {processingOrders} processing
            </div>
          </div>
        </div>

        {/* Metric 3: Active Catalog Items */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 text-xs">
            <span className="uppercase font-bold tracking-wider">Catalog Objects</span>
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-black dark:text-white">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-black dark:text-white">
              {activeProducts}
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Across 6 luxury categories
            </div>
          </div>
        </div>

        {/* Metric 4: Low / Out of Stock Alert */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 text-xs">
            <span className="uppercase font-bold tracking-wider">Stock Alerts</span>
            <div className={`w-8 h-8 rounded-lg ${
              lowStockProducts.length > 0
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            } flex items-center justify-center`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-black dark:text-white">
              {lowStockProducts.length}
            </div>
            <div className="text-[11px] text-amber-600 dark:text-amber-400 mt-1">
              {outOfStockProducts.length > 0 ? `${outOfStockProducts.length} out of stock` : "Items with ≤ 5 units"}
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Warning Banner if any */}
      {lowStockProducts.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              <strong>Attention Required:</strong> {lowStockProducts.length} products are running critically low on inventory.
            </span>
          </div>
          <button
            onClick={() => onNavigateTab("products")}
            className="px-3 py-1.5 rounded-lg bg-amber-600 text-white hover:bg-amber-700 font-bold uppercase text-[10px] self-start sm:self-auto transition-colors"
          >
            Review Inventory
          </button>
        </div>
      )}

      {/* Main Row: Recent Orders & Top Selling Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Orders Table */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-zinc-400">
                DISPATCH QUEUE
              </span>
              <h3 className="text-base font-black uppercase text-black dark:text-white">
                Recent Orders
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab("orders")}
              className="text-xs font-bold uppercase text-black dark:text-white hover:underline flex items-center gap-1"
            >
              <span>View All ({orders.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 text-[10px] uppercase">
                  <th className="pb-3 font-bold">Order #</th>
                  <th className="pb-3 font-bold">Customer</th>
                  <th className="pb-3 font-bold">Date</th>
                  <th className="pb-3 font-bold">Total</th>
                  <th className="pb-3 font-bold">Status</th>
                  <th className="pb-3 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                {recentOrders.map((ord) => (
                  <tr
                    key={ord.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                  >
                    <td className="py-3 font-bold text-black dark:text-white">
                      {ord.orderNumber}
                    </td>
                    <td className="py-3 text-zinc-700 dark:text-zinc-300">
                      <div className="font-semibold">{ord.customerName}</div>
                      <div className="text-[10px] text-zinc-400">{ord.items.length} items</div>
                    </td>
                    <td className="py-3 text-zinc-500 text-[11px]">
                      {ord.date.split(" ")[0]}
                    </td>
                    <td className="py-3 font-bold text-black dark:text-white">
                      {formatPrice(ord.total)}
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border ${
                          ord.status === "delivered"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : ord.status === "shipped"
                            ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                            : ord.status === "processing"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                            : ord.status === "cancelled"
                            ? "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                            : "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20"
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => onSelectOrder(ord)}
                        className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors text-[10px] font-bold uppercase"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Top Performing Objects */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-zinc-400">
                CLIENT FAVORITES
              </span>
              <h3 className="text-base font-black uppercase text-black dark:text-white">
                Featured Highlights
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab("products")}
              className="text-xs font-bold uppercase text-black dark:text-white hover:underline"
            >
              Manage &rarr;
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {topProducts.map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-black dark:text-white text-xs line-clamp-1">
                      {p.name}
                    </h4>
                    <div className="text-[10px] text-zinc-400 mt-0.5">
                      {p.category} &bull; Stock: <strong>{p.stockCount}</strong>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-bold text-black dark:text-white">{formatPrice(p.price)}</div>
                  <div className="text-[9px] text-zinc-400 uppercase">{p.rating} ★ ({p.reviewsCount})</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
