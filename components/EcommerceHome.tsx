"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { FlashDeals } from "@/components/FlashDeals";
import { CategoryGrid } from "@/components/CategoryGrid";
import { HomeProductTabs } from "@/components/HomeProductTabs";
import { ShopTheLook } from "@/components/ShopTheLook";
import { BrandStory } from "@/components/BrandStory";
import { CustomerReviews } from "@/components/CustomerReviews";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

export function EcommerceHome() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-200">
      {/* Navigation Header with Announcement bar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Interactive Spotlight Hero */}
        <Hero />

        {/* Trust & Guarantee Bar */}
        <TrustBar />

        {/* Limited Release Flash Drops with Countdown Timer */}
        <FlashDeals />

        {/* Curated Categories Grid */}
        <CategoryGrid />

        {/* Interactive Product Showcase with Filter Tabs */}
        <HomeProductTabs />

        {/* Interactive Lookbook Room with Pulsating Hotspots */}
        <ShopTheLook />

        {/* Brand Craftsmanship & Material Standards */}
        <BrandStory />

        {/* Customer Reviews & Press Accolades */}
        <CustomerReviews />

        {/* VIP Communications / Newsletter */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
