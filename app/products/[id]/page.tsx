"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  Check,
  Sparkles,
  Share2,
  Clock,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const {
    addToCart,
    setIsCartOpen,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    addToast,
  } = useShop();

  // Find product by id or slug
  const product = PRODUCTS.find(
    (p) => p.id === unwrappedParams.id || p.slug === unwrappedParams.id
  );

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0]?.name || "Standard"
  );
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes ? product.sizes[0] : ""
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"features" | "specs" | "shipping">("features");

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
          <h1 className="text-3xl font-black uppercase font-mono mb-2">
            Object Not Found
          </h1>
          <p className="text-zinc-500 text-sm font-mono mb-6 max-w-md">
            The requested product identification could not be located in the 2026 registry.
          </p>
          <Link
            href="/products"
            className="px-6 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-mono text-xs font-bold uppercase tracking-wider"
          >
            Return to Catalog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const inWish = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setIsCartOpen(true);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      addToast("Link Copied", "Product URL copied to clipboard.", "info");
    }
  };

  // Related products from same category or random fallback
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-200">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-8 overflow-x-auto no-scrollbar">
            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-zinc-400 shrink-0" />
            <Link href="/products" className="hover:text-black dark:hover:text-white transition-colors">
              Catalog
            </Link>
            <ChevronRight className="w-3 h-3 text-zinc-400 shrink-0" />
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="hover:text-black dark:hover:text-white transition-colors shrink-0"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-3 h-3 text-zinc-400 shrink-0" />
            <span className="text-black dark:text-white font-bold truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </nav>

          {/* Product Primary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-zinc-200 dark:border-zinc-800">
            {/* Gallery Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Main Image Container */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 group">
                <Image
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                  {product.isNew && (
                    <span className="px-2.5 py-1 rounded-md bg-black dark:bg-white text-white dark:text-black text-[10px] font-mono font-black uppercase tracking-widest shadow-md">
                      NEW RELEASE
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="px-2.5 py-1 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black text-[10px] font-mono font-bold uppercase tracking-widest shadow-md">
                      BESTSELLER
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-white text-[10px] font-mono font-bold">
                      SAVE {discount}%
                    </span>
                  )}
                </div>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/80 dark:bg-black/80 backdrop-blur-md text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white border border-zinc-200 dark:border-zinc-800 transition-colors shadow-sm"
                  title="Copy link"
                  aria-label="Share product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnails Row */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 border-2 transition-all shrink-0 ${
                        selectedImageIndex === idx
                          ? "border-black dark:border-white ring-2 ring-black/10 dark:ring-white/10 scale-95"
                          : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Configuration Details (5 cols) */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Brand & Category pill */}
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-300 uppercase tracking-widest font-bold">
                    {product.brand}
                  </span>
                  <div className="flex items-center gap-1 text-black dark:text-white font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating}</span>
                    <span className="text-zinc-400 font-normal">
                      ({product.reviewsCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Product Title */}
                <h1 className="text-2xl sm:text-3xl font-black text-black dark:text-white tracking-tight uppercase leading-tight">
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 py-2 border-y border-zinc-100 dark:border-zinc-900">
                  <span className="text-3xl font-black text-black dark:text-white font-mono">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-zinc-400 line-through font-mono">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white text-xs font-mono font-bold">
                      -{discount}% OFF
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  {product.description}
                </p>

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="uppercase text-zinc-500">Color:</span>
                      <span className="font-bold text-black dark:text-white">
                        {selectedColor}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                            selectedColor === c.name
                              ? "border-black dark:border-white bg-zinc-100 dark:bg-zinc-900 font-bold"
                              : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400"
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20 dark:border-white/20 shrink-0"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span>{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="uppercase text-zinc-500">Size / Fit:</span>
                      <span className="font-bold text-black dark:text-white">
                        {selectedSize}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                            selectedSize === s
                              ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black font-bold"
                              : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 text-zinc-700 dark:text-zinc-300"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & Stock */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-900">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-zinc-500 hover:text-black dark:hover:text-white font-mono font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-xs font-mono font-bold text-black dark:text-white min-w-[36px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-zinc-500 hover:text-black dark:hover:text-white font-mono font-bold"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-zinc-500">
                      {product.inStock
                        ? `In Stock (${product.stockCount} units)`
                        : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      addToCart(product, quantity, selectedColor, selectedSize)
                    }
                    className="flex-1 py-3.5 rounded-xl bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3.5 rounded-xl border transition-all ${
                      inWish
                        ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                    }`}
                    aria-label="Save to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${inWish ? "fill-current" : ""}`} />
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-black dark:text-white border border-zinc-200 dark:border-zinc-800 font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Buy Now &bull; {formatPrice(product.price * quantity)}
                </button>
              </div>

              {/* Micro Trust Bullets */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-900 text-center font-mono text-[10px] text-zinc-500">
                <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
                  <Truck className="w-3.5 h-3.5 text-black dark:text-white" />
                  <span>Free 2-Day Air</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
                  <RotateCcw className="w-3.5 h-3.5 text-black dark:text-white" />
                  <span>30-Day Returns</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
                  <ShieldCheck className="w-3.5 h-3.5 text-black dark:text-white" />
                  <span>2-Yr Warranty</span>
                </div>
              </div>
            </div>
          </div>

          {/* Deep Specifications & Features Tabs */}
          <div className="py-14 border-b border-zinc-200 dark:border-zinc-800">
            {/* Tab Buttons */}
            <div className="flex items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-8 font-mono text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => setActiveTab("features")}
                className={`pb-2 transition-colors ${
                  activeTab === "features"
                    ? "text-black dark:text-white border-b-2 border-black dark:border-white -mb-[18px]"
                    : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                Key Features
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className={`pb-2 transition-colors ${
                  activeTab === "specs"
                    ? "text-black dark:text-white border-b-2 border-black dark:border-white -mb-[18px]"
                    : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                Technical Specs
              </button>
              <button
                onClick={() => setActiveTab("shipping")}
                className={`pb-2 transition-colors ${
                  activeTab === "shipping"
                    ? "text-black dark:text-white border-b-2 border-black dark:border-white -mb-[18px]"
                    : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                Delivery & Returns
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === "features" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features?.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-start gap-3"
                  >
                    <div className="p-1.5 rounded-md bg-black dark:bg-white text-white dark:text-black shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                        {feat}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "specs" && (
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden font-mono text-xs">
                {Object.entries(product.specs || {}).map(([key, val], idx) => (
                  <div
                    key={key}
                    className={`flex items-center justify-between p-4 ${
                      idx % 2 === 0
                        ? "bg-zinc-50 dark:bg-zinc-900/60"
                        : "bg-white dark:bg-zinc-900"
                    } border-b border-zinc-100 dark:border-zinc-800/60 last:border-0`}
                  >
                    <span className="text-zinc-500 uppercase">{key}</span>
                    <span className="font-bold text-black dark:text-white text-right">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 text-xs font-mono">
                <div className="space-y-1">
                  <h4 className="font-bold text-black dark:text-white uppercase">
                    Complimentary Express Delivery
                  </h4>
                  <p className="text-zinc-500">
                    Orders placed before 2:00 PM EST ship same-day via DHL / FedEx Express with carbon-neutral transit.
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-black dark:text-white uppercase">
                    30-Day Hassle-Free Return Policy
                  </h4>
                  <p className="text-zinc-500">
                    If you are not thoroughly satisfied with the acoustic fidelity or craft, initiate an instant return with pre-paid return labels.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Related Products Recommendation */}
          <div className="py-14">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  EXPLORE COMPLEMENTS
                </span>
                <h2 className="text-xl sm:text-2xl font-black uppercase text-black dark:text-white tracking-tight">
                  You Might Also Appreciate
                </h2>
              </div>
              <Link
                href="/products"
                className="text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-white hover:underline"
              >
                View Catalog &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
