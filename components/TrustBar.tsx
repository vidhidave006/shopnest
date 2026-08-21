"use client";

import React from "react";
import { Truck, RotateCcw, ShieldCheck } from "lucide-react";

export function TrustBar() {
  const items = [
    {
      icon: Truck,
      title: "COMPLIMENTARY AIR COURIER",
      description: "Priority expedited dispatch on orders over ₹4,999",
    },
    {
      icon: RotateCcw,
      title: "30-DAY SANCTUARY TRIAL",
      description: "Experience the acoustic clarity in your private sanctuary",
    },
    {
      icon: ShieldCheck,
      title: "2-YEAR COMPREHENSIVE WARRANTY",
      description: "Direct concierge repair and component replacement",
    },
  ];

  return (
    <section className="bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-900 py-8 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center justify-center sm:justify-start gap-4">
                <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white border border-zinc-200 dark:border-zinc-800 shrink-0 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-black dark:text-white font-mono tracking-[0.1em] uppercase">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal leading-snug">
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
