"use client";

import React from "react";
import { Truck, RotateCcw, ShieldCheck } from "lucide-react";

export function TrustBar() {
  const items = [
    {
      icon: Truck,
      title: "FREE EXPRESS DELIVERY",
      description: "On all global orders over $75",
    },
    {
      icon: RotateCcw,
      title: "30-DAY RISK-FREE TRIAL",
      description: "Hassle-free money-back guarantee",
    },
    {
      icon: ShieldCheck,
      title: "256-BIT ENCRYPTED CHECKOUT",
      description: "Direct secure bank-grade payments",
    },
  ];

  return (
    <section className="bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 py-6 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center justify-center sm:justify-start gap-3">
                <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white border border-zinc-200 dark:border-zinc-800 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-black dark:text-white font-mono tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
