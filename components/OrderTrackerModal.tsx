"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import {
  X,
  Search,
  Truck,
  CheckCircle2,
  MapPin,
  Package,
  ArrowRight,
} from "lucide-react";

export function OrderTrackerModal() {
  const {
    isOrderTrackerOpen,
    setIsOrderTrackerOpen,
    activeTrackingOrder,
    setActiveTrackingOrder,
    placedOrders,
    trackOrderByNumber,
    formatPrice,
    addToast,
  } = useShop();

  const [inputQuery, setInputQuery] = useState(
    activeTrackingOrder?.id || "SN-982410"
  );
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOrderTrackerOpen) return null;

  const currentOrder = activeTrackingOrder || (placedOrders.length > 0 ? placedOrders[0] : null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    const result = trackOrderByNumber(inputQuery);
    setHasSearched(true);
    if (!result) {
      addToast(
        "Order Not Located",
        "Could not find an order matching that ID. Loaded default sample order.",
        "info"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={() => setIsOrderTrackerOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative bg-white dark:bg-zinc-950 text-black dark:text-white rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-3xl w-full overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="px-7 py-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.14em]">
                Live Dispatch Telemetry
              </h2>
              <span className="text-[10px] font-mono text-zinc-400">
                AIR CARGO MONITOR
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsOrderTrackerOpen(false)}
            className="p-2 rounded-xl text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
            aria-label="Close Tracker"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar Input */}
        <div className="p-7 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
          <form onSubmit={handleSearch} className="flex gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ENTER ORDER ID (e.g. SN-982410) OR TRACKING CODE..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="w-full h-12 pl-10 pr-3.5 rounded-xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-black dark:text-white uppercase placeholder:text-zinc-500 focus:outline-none focus:border-black dark:focus:border-white"
              />
            </div>
            <button
              type="submit"
              className="px-7 h-12 rounded-xl bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-mono font-black text-xs uppercase tracking-[0.14em] transition-all shrink-0 flex items-center gap-2 shadow-sm cursor-pointer active:scale-95"
            >
              <span>Track</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Select Buttons */}
          {placedOrders.length > 0 && (
            <div className="mt-3.5 flex items-center gap-2 overflow-x-auto text-[11px] font-mono">
              <span className="text-zinc-500 uppercase text-[10px] shrink-0 font-bold">
                Archived Orders:
              </span>
              {placedOrders.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => {
                    setInputQuery(o.id);
                    setActiveTrackingOrder(o);
                  }}
                  className={`px-3 py-1 rounded-xl border text-xs whitespace-nowrap transition-colors cursor-pointer ${
                    currentOrder?.id === o.id
                      ? "bg-black text-white dark:bg-white dark:text-black border-transparent font-bold"
                      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {o.id}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Order Details & Progress Timeline */}
        {currentOrder ? (
          <div className="p-7 space-y-6">
            {/* Status Summary Banner */}
            <div className="p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-lg bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold uppercase tracking-wider">
                    {currentOrder.status.replace("_", " ")}
                  </span>
                  <span className="text-xs font-bold text-black dark:text-white">
                    Acquisition {currentOrder.id}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Air Cargo Code: <strong>{currentOrder.trackingNumber}</strong>
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] text-zinc-400 uppercase block tracking-wider">
                  Estimated Arrival
                </span>
                <span className="text-sm font-black text-black dark:text-white">
                  {currentOrder.estimatedDelivery}
                </span>
              </div>
            </div>

            {/* Visual Multi-Step Timeline */}
            <div className="space-y-4 font-mono">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                Milestone Telemetry
              </h3>

              <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
                {(currentOrder.timeline || []).map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    {/* Circle Indicator */}
                    <div
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        step.completed
                          ? "bg-black dark:bg-white border-black dark:border-white text-white dark:text-black shadow-xs"
                          : step.current
                          ? "bg-white dark:bg-black border-black dark:border-white ring-4 ring-zinc-400/20 text-black dark:text-white"
                          : "bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700"
                      }`}
                    >
                      {step.completed && (
                        <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span
                          className={`text-xs font-bold ${
                            step.completed || step.current
                              ? "text-black dark:text-white"
                              : "text-zinc-400"
                          }`}
                        >
                          {step.label}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-normal">
                          {step.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination & Package Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <span className="text-[10px] uppercase text-zinc-400 flex items-center gap-1 font-bold">
                  <MapPin className="w-3 h-3" /> Shipping Destination
                </span>
                <p className="font-bold text-black dark:text-white">
                  {currentOrder.customer?.fullName || currentOrder.customerName || "Valued Client"}
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 text-[11px]">
                  {currentOrder.customer?.address || currentOrder.shippingAddress || "Registered Destination"}
                  {currentOrder.customer?.city ? `, ${currentOrder.customer.city}` : ""}
                  {currentOrder.customer?.postalCode ? ` ${currentOrder.customer.postalCode}` : ""}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <span className="text-[10px] uppercase text-zinc-400 flex items-center gap-1 font-bold">
                  <Package className="w-3 h-3" /> Carrier Service
                </span>
                <p className="font-bold text-black dark:text-white">
                  {currentOrder.shippingMethod}
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 text-[11px]">
                  Settlement: {currentOrder.paymentMethod} &bull; Total:{" "}
                  {formatPrice(currentOrder.total)}
                </p>
              </div>
            </div>

            {/* Package Contents */}
            <div className="space-y-2.5 font-mono">
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                Package Contents ({currentOrder.items.length} items)
              </span>
              <div className="space-y-2">
                {currentOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="44px"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-black dark:text-white block truncate max-w-[200px] sm:max-w-md">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-zinc-400">
                          Qty: {item.quantity}{" "}
                          {item.selectedColor && `• ${item.selectedColor}`}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-black dark:text-white">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center space-y-3 font-mono">
            <Package className="w-10 h-10 text-zinc-400 mx-auto" />
            <h3 className="text-sm font-bold uppercase text-black dark:text-white">
              No Record Selected
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Please enter an acquisition identification or tracking code above to monitor live transit.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
