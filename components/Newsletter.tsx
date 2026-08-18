"use client";

import React, { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { Mail, ArrowRight, Check } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isDone, setIsDone] = useState(false);
  const { addToast } = useShop();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsDone(true);
    addToast(
      "Subscribed",
      "Thank you. Use promo code NEST20 for 20% off.",
      "success"
    );
  };

  return (
    <section className="bg-black text-white py-16 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
          COMMUNICATIONS
        </span>
        <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
          Join the Directory
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto font-mono">
          Receive release announcements, private discount codes, and design journals.
        </p>

        {!isDone ? (
          <form
            onSubmit={handleSubscribe}
            className="max-w-md mx-auto flex gap-2 pt-2"
          >
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="ENTER EMAIL ADDRESS..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1.5"
            >
              <span>Join</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg max-w-md mx-auto text-xs text-white font-mono flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-white" />
            <span>Subscribed! Use code: <strong>NEST20</strong></span>
          </div>
        )}
      </div>
    </section>
  );
}
