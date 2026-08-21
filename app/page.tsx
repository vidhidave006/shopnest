import { getAppSettings } from "@/lib/settings";
import { EcommerceHome } from "@/components/EcommerceHome";
import { InformationalHome } from "@/components/InformationalHome";

<<<<<<< HEAD
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const settings = await getAppSettings();
  const isInformational = settings.homePageMode === "informational";

  if (isInformational) {
    return <InformationalHome />;
  }

  return <EcommerceHome />;
=======
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

export default function Home() {
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
>>>>>>> 113c4554795eef8ca5397910adfb72efd4561b0a
}
