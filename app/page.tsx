import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { ProductSection } from "@/components/ProductSection";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Clean Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Simple Hero */}
        <Hero />

        {/* 3-Item Trust Bar */}
        <TrustBar />

        {/* Filterable Products Grid */}
        <ProductSection />

        {/* Simple Newsletter */}
        <Newsletter />
      </main>

      {/* Clean Footer */}
      <Footer />
    </div>
  );
}
