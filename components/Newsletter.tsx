"use client";

import React, { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { Mail, ArrowRight, Check, Zap } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isDone, setIsDone] = useState(false);
  const { addToast } = useShop();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsDone(true);
    addToast(
      "Atelier Invitation Granted",
      "Welcome. Apply promo code NEST20 for 20% concession on your inaugural acquisition.",
      "success"
    );
  };

  return (
    <section className="bg-black text-white py-20 border-t border-zinc-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-5 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 text-zinc-300 text-[10px] font-mono font-bold tracking-[0.24em] uppercase border border-zinc-800">
          <Zap className="w-3 h-3" /> Private Communications
        </div>

        <h3 className="text-2xl sm:text-4xl font-black tracking-tight uppercase text-white">
          Join The Atelier Directory
        </h3>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
          Receive priority drop notifications, private archival codes, and architectural design journals.
        </p>

        {!isDone ? (
          <form
            onSubmit={handleSubscribe}
            className="max-w-md mx-auto flex gap-2 pt-3"
          >
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="ENTER RECIPIENT EMAIL..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono text-white placeholder:text-zinc-500 focus:outline-none focus:border-white transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-mono font-black uppercase tracking-[0.14em] transition-all shrink-0 flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95"
            >
              <span>Enroll</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <div className="p-4 bg-zinc-900 border border-zinc-700 rounded-2xl max-w-md mx-auto text-xs text-white font-mono flex items-center justify-center gap-2.5 shadow-lg">
            <Check className="w-4 h-4" />
            <span>Enrolled! Your 20% privilege code: <strong className="text-white font-black">NEST20</strong></span>
          </div>
        )}
      </div>
    </section>
  );
}
