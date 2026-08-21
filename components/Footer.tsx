"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import { CATEGORIES } from "@/data/products";
import { MapPin } from "lucide-react";

export function Footer() {
  const { setSelectedCategory, setIsOrderTrackerOpen } = useShop();
  const router = useRouter();
  const pathname = usePathname();

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    if (pathname !== "/products") {
      router.push(`/products?category=${encodeURIComponent(cat)}`);
    } else {
      const el =
        document.getElementById("products-catalog") ||
        document.getElementById("products");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const flagships = [
    { city: "Mumbai", address: "Altamount Road, Cumballa Hill" },
    { city: "New Delhi", address: "Chanakyapuri, Diplomatic Enclave" },
    { city: "Bengaluru", address: "Lavelle Road, Level 02" },
    { city: "Hyderabad", address: "Jubilee Hills, Road No. 36" },
  ];

  return (
    <footer className="bg-black text-zinc-400 border-t border-zinc-900 py-16 text-xs font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Top Flagship Boutiques Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-12 border-b border-zinc-900">
          {flagships.map((f, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-[0.2em] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-zinc-400" /> {f.city}
              </span>
              <p className="text-[11px] text-zinc-500">{f.address}</p>
            </div>
          ))}
        </div>

        {/* Middle Navigation & Logo */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-zinc-900">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-black text-xs font-mono shadow-sm">
              CH
            </div>
            <div>
              <span className="text-lg font-black text-white tracking-tight">
                CHERRY
              </span>
              <span className="text-[9px] text-zinc-500 block tracking-[0.2em] uppercase font-bold">
                ATELIER
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 font-bold uppercase text-[10.5px] tracking-[0.14em] text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <button
              onClick={() => handleCategoryClick("All")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Vault
            </button>
            <button
              onClick={() => setIsOrderTrackerOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Track Order
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {cat.name}
              </button>
            ))}
            <Link
              href="/admin"
              className="text-white hover:underline transition-colors font-bold"
            >
              Admin Portal
            </Link>
          </div>
        </div>

        {/* Bottom Legal & Payment Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10.5px] text-zinc-500 font-mono tracking-wider">
          <p>&copy; {new Date().getFullYear()} CHERRY ATELIER. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-3 text-zinc-400">
            <span>256-BIT ENCRYPTED</span>
            <span>•</span>
            <span>UPI INSTANT</span>
            <span>•</span>
            <span>RUPAY</span>
            <span>•</span>
            <span>VISA &amp; MC</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
