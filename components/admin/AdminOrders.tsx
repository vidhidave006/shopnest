"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Order, OrderStatus } from "@/types/shop";
import { useShop } from "@/context/ShopContext";
import { CustomSelect, CustomSelectOption } from "@/components/ui/CustomSelect";
import {
  Search,
  CheckCircle2,
  Truck,
  Clock,
  Package,
  AlertOctagon,
  Eye,
  Trash2,
  X,
  CreditCard,
  ArrowUpDown,
  Smartphone,
} from "lucide-react";

interface AdminOrdersProps {
  onSelectOrder: (order: Order) => void;
}

export function AdminOrders({ onSelectOrder }: AdminOrdersProps) {
  const { orders, updateOrderStatus, deleteOrder, formatPrice } = useShop();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "highest" | "status">("newest");

  // Payment Options
  const paymentOptions: CustomSelectOption[] = [
    { value: "all", label: "All Payment Gateways", icon: <CreditCard className="w-3.5 h-3.5" /> },
    { value: "Apple Pay", label: "Apple Pay Express", description: "One-touch biometric settlement", icon: <Smartphone className="w-3.5 h-3.5" />, badge: "Fast" },
    { value: "Visa", label: "Visa Verified", description: "Credit / Debit checkout" },
    { value: "Mastercard", label: "Mastercard Secure", description: "Identity check verified" },
    { value: "PayPal", label: "PayPal Protection", description: "Buyer protection guarantee" },
  ];

  // Sort Options
  const sortOptions: CustomSelectOption[] = [
    { value: "newest", label: "Latest Dispatches First", description: "Reverse chronological order", icon: <ArrowUpDown className="w-3.5 h-3.5" /> },
    { value: "highest", label: "Highest Order Value (₹)", description: "Top luxury checkouts" },
    { value: "status", label: "Fulfillment Stage", description: "Group by lifecycle progress" },
  ];

  // Lifecycle Options for Rows
  const statusOptions: CustomSelectOption[] = [
    { value: "pending", label: "Pending Dispatch", description: "Awaiting sorting & packing", icon: <Package className="w-3.5 h-3.5" /> },
    { value: "processing", label: "Processing in Warehouse", description: "Parcel packed & labeled", icon: <Clock className="w-3.5 h-3.5 text-amber-500" /> },
    { value: "shipped", label: "In Transit (Express Courier)", description: "Dispatched with carrier", icon: <Truck className="w-3.5 h-3.5 text-blue-500" /> },
    { value: "delivered", label: "Delivered to Client", description: "Signed & confirmed", icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> },
    { value: "cancelled", label: "Cancelled / Refunded", description: "Order voided", icon: <AlertOctagon className="w-3.5 h-3.5 text-red-500" /> },
  ];

  const filteredOrders = useMemo(() => {
    return orders
      .filter((ord) => {
        if (statusFilter !== "all" && ord.status !== statusFilter) {
          return false;
        }
        if (paymentFilter !== "all") {
          if (!ord.paymentMethod.toLowerCase().includes(paymentFilter.toLowerCase())) {
            return false;
          }
        }
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchNum = ord.orderNumber.toLowerCase().includes(q);
          const matchName = ord.customerName.toLowerCase().includes(q);
          const matchEmail = ord.customerEmail.toLowerCase().includes(q);
          if (!matchNum && !matchName && !matchEmail) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "highest") return b.total - a.total;
        if (sortBy === "status") return a.status.localeCompare(b.status);
        return 0;
      });
  }, [orders, statusFilter, paymentFilter, sortBy, search]);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "delivered":
        return {
          bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
          icon: <CheckCircle2 className="w-3 h-3" />,
          label: "Delivered",
        };
      case "shipped":
        return {
          bg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
          icon: <Truck className="w-3 h-3" />,
          label: "In Transit",
        };
      case "processing":
        return {
          bg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
          icon: <Clock className="w-3 h-3" />,
          label: "Processing",
        };
      case "cancelled":
        return {
          bg: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
          icon: <AlertOctagon className="w-3 h-3" />,
          label: "Cancelled",
        };
      default:
        return {
          bg: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
          icon: <Package className="w-3 h-3" />,
          label: "Pending",
        };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 font-sans text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-zinc-400">
            TRANSACTIONS & FULFILLMENT REGISTRY
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-black dark:text-white">
            Customer Orders ({orders.length})
          </h2>
        </div>
      </div>

      {/* Website-Related Custom Dropdown Filters Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Search Input (Span 5) */}
          <div className="relative lg:col-span-5 w-full">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by order #, client name, or email..."
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

          {/* 1. Custom Payment Method Dropdown (Span 4) */}
          <div className="lg:col-span-4">
            <CustomSelect
              options={paymentOptions}
              value={paymentFilter}
              onChange={(val) => setPaymentFilter(val)}
              menuClassName="w-72"
            />
          </div>

          {/* 2. Custom Sort Dropdown (Span 3) */}
          <div className="lg:col-span-3">
            <CustomSelect
              options={sortOptions}
              value={sortBy}
              onChange={(val) => setSortBy(val)}
              menuClassName="w-64"
            />
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-900 text-[11px]">
          <span className="text-zinc-400 uppercase text-[10px]">Fulfillment Status:</span>
          {[
            { id: "all", label: `All Orders (${orders.length})` },
            { id: "pending", label: `Pending (${orders.filter((o) => o.status === "pending").length})` },
            { id: "processing", label: `Processing (${orders.filter((o) => o.status === "processing").length})` },
            { id: "shipped", label: `Shipped (${orders.filter((o) => o.status === "shipped").length})` },
            { id: "delivered", label: `Delivered (${orders.filter((o) => o.status === "delivered").length})` },
            { id: "cancelled", label: `Cancelled (${orders.filter((o) => o.status === "cancelled").length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                statusFilter === tab.id
                  ? "bg-black dark:bg-white text-white dark:text-black font-bold shadow-xs"
                  : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      {filteredOrders.length > 0 ? (
        <div className="rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-500 text-[10px] uppercase">
                  <th className="py-3.5 px-4 font-bold">Order #</th>
                  <th className="py-3.5 px-4 font-bold">Client Identity</th>
                  <th className="py-3.5 px-4 font-bold">Dispatched Items</th>
                  <th className="py-3.5 px-4 font-bold">Timestamp</th>
                  <th className="py-3.5 px-4 font-bold">Total Amount</th>
                  <th className="py-3.5 px-4 font-bold">Lifecycle Stage</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                {filteredOrders.map((ord) => {
                  const badge = getStatusBadge(ord.status);
                  return (
                    <tr
                      key={ord.id}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
                    >
                      {/* Order Number */}
                      <td className="py-3 px-4 font-bold text-black dark:text-white">
                        <button
                          onClick={() => onSelectOrder(ord)}
                          className="hover:underline text-left"
                        >
                          {ord.orderNumber}
                        </button>
                        <div className="text-[10px] text-zinc-400 font-normal">
                          {ord.paymentMethod}
                        </div>
                      </td>

                      {/* Customer Info */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-black dark:text-white">
                          {ord.customerName}
                        </div>
                        <div className="text-[10px] text-zinc-400">
                          {ord.customerEmail}
                        </div>
                      </td>

                      {/* Items Thumbnails & Count */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <div className="flex -space-x-2 overflow-hidden">
                            {ord.items.slice(0, 3).map((item, i) => (
                              <div
                                key={i}
                                className="relative w-8 h-8 rounded-lg overflow-hidden border border-white dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-800"
                              >
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>
                            ))}
                          </div>
                          <span className="text-[11px] text-zinc-500 font-semibold pl-1">
                            {ord.items.reduce((s, it) => s + it.quantity, 0)} items
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-3 px-4 text-zinc-500 text-[11px]">
                        {ord.date}
                      </td>

                      {/* Total */}
                      <td className="py-3 px-4">
                        <div className="font-black text-black dark:text-white">
                          {formatPrice(ord.total)}
                        </div>
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                          {ord.paymentStatus}
                        </div>
                      </td>

                      {/* Status Dropdown Menu with Custom Select */}
                      <td className="py-3 px-4 w-48">
                        <CustomSelect
                          size="sm"
                          options={statusOptions}
                          value={ord.status}
                          onChange={(val) => updateOrderStatus(ord.id, val as OrderStatus)}
                          menuClassName="w-56"
                        />
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onSelectOrder(ord)}
                            className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold uppercase text-[10px] transition-colors flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" /> View
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remove order #${ord.orderNumber}?`)) {
                                deleteOrder(ord.id);
                              }
                            }}
                            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-500 transition-colors"
                            title="Delete Order"
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
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
          <p className="text-zinc-400 text-xs uppercase">No matching orders found</p>
          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
              setPaymentFilter("all");
              setSortBy("newest");
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
