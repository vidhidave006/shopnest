"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import { CATEGORIES } from "@/data/products";

export function Footer() {
  const { setSelectedCategory } = useShop();
  const router = useRouter();
  const pathname = usePathname();

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    if (pathname !== "/products") {
      router.push(`/products?category=${encodeURIComponent(cat)}`);
    } else {
      const el = document.getElementById("products-catalog") || document.getElementById("products");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black text-zinc-400 border-t border-zinc-800 py-12 text-xs font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-800/80">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center font-black text-xs">
              SN
            </div>
            <span className="text-base font-black text-white tracking-tight">
              SHOPNEST
            </span>
          </Link>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-semibold uppercase text-[11px] text-zinc-400">
            <Link
              href="/"
              className="hover:text-white transition-colors"
            >
              Home
            </Link>
            <button
              onClick={() => handleCategoryClick("All")}
              className="hover:text-white transition-colors"
            >
              All Products
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className="hover:text-white transition-colors"
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

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-[11px] text-zinc-600">
          <p>&copy; {new Date().getFullYear()} SHOPNEST CORP. MONOCHROME EDITION.</p>
          <div className="flex items-center gap-2 text-zinc-500 font-mono">
            <span>VISA</span>
            <span>&bull;</span>
            <span>MASTERCARD</span>
            <span>&bull;</span>
            <span>APPLE PAY</span>
            <span>&bull;</span>
            <span>PAYPAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
