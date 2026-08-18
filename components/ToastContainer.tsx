"use client";

import React from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { Check, Info, AlertCircle, X } from "lucide-react";

export function ToastContainer() {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl bg-black dark:bg-white text-white dark:text-black shadow-2xl border border-zinc-800 dark:border-zinc-200 transition-all duration-300 font-mono"
        >
          {toast.image ? (
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-zinc-900 dark:bg-zinc-100 border border-zinc-700 dark:border-zinc-300">
              <Image
                src={toast.image}
                alt=""
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
          ) : (
            <div className="p-1.5 rounded-md shrink-0 bg-zinc-800 dark:bg-zinc-200 text-white dark:text-black">
              {toast.type === "success" && <Check className="w-4 h-4" />}
              {toast.type === "info" && <Info className="w-4 h-4" />}
              {toast.type === "error" && <AlertCircle className="w-4 h-4" />}
            </div>
          )}

          <div className="flex-1 min-w-0 font-sans">
            <h4 className="text-xs font-bold leading-tight uppercase font-mono">
              {toast.title}
            </h4>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-600 mt-0.5 leading-snug line-clamp-2">
              {toast.message}
            </p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 text-zinc-500 hover:text-white dark:hover:text-black transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
