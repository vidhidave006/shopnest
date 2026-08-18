"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductCard } from "@/components/ProductCard";
import { CustomerReviews } from "@/components/CustomerReviews";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { PRODUCTS } from "@/data/products";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";

export default function Home() {
  // Best sellers for home showcase
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-200">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Showcase */}
        <Hero />

        {/* Value / Trust Bar */}
        <TrustBar />

        {/* Curated Categories Grid */}
        <CategoryGrid />

        {/* Featured Best Sellers Preview */}
        <section className="py-14 sm:py-20 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[10px] font-mono font-bold uppercase tracking-widest mb-2">
                  <TrendingUp className="w-3 h-3" /> Best Sellers
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-black dark:text-white tracking-tight uppercase">
                  Featured Highlights
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-xl">
                  Our most requested monochrome electronics and minimalist lifestyle essentials.
                </p>
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-white hover:underline group self-start sm:self-auto"
              >
                <span>View Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Bottom CTA to Products Page */}
            <div className="mt-12 text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-xl"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explore All Products ({PRODUCTS.length})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Customer Social Proof */}
        <CustomerReviews />

        {/* Newsletter Signup */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
