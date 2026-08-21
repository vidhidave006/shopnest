"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, REVIEWS } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Check,
  Share2,
  Plus,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const {
    products,
    addToCart,
    setIsCartOpen,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    addToast,
    setIsCheckoutOpen,
  } = useShop();

<<<<<<< HEAD
  // Find product by id or slug
  const product = products.find(
=======
  const allProducts = products && products.length > 0 ? products : PRODUCTS;
  const product = allProducts.find(
>>>>>>> d3d3555ca4bf9ab32161337377cbdeb50c5209db
    (p) => p.id === unwrappedParams.id || p.slug === unwrappedParams.id
  ) || PRODUCTS.find((p) => p.id === unwrappedParams.id || p.slug === unwrappedParams.id);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0]?.name || "Standard"
  );
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes ? product.sizes[0] : ""
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"features" | "specs" | "shipping" | "reviews">("features");

  const bundleCompanion = PRODUCTS.find((p) => p.id !== product?.id) || PRODUCTS[1];

  const [userReviews, setUserReviews] = useState(REVIEWS.slice(0, 3));
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newComment, setNewComment] = useState("");

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
          <h1 className="text-3xl font-black uppercase mb-2 tracking-tight">
            Object Not Located
          </h1>
          <p className="text-zinc-500 text-sm font-mono mb-6 max-w-md">
            The requested atelier record could not be found in the 2026 vault registry.
          </p>
          <Link
            href="/products"
            className="px-8 py-3.5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-mono text-xs font-bold uppercase tracking-wider shadow-sm"
          >
            Return to Vault
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
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      addToast("Dossier Link Copied", "Direct link copied to clipboard.", "info");
    }
  };

  const handleAddBundle = () => {
    addToCart(product, 1, selectedColor, selectedSize);
    if (bundleCompanion) {
      addToCart(bundleCompanion, 1);
    }
    addToast(
      "Bundle Added to Cart",
      `Added ${product.name} and ${bundleCompanion.name} (15% savings).`,
      "success"
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      location: "Verified Connoisseur",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      rating: newRating,
      date: "Just now",
      title: newTitle || "Exceptional acoustic purity and craft",
      comment: newComment,
      verified: true,
      productName: product.name,
      productImage: product.images[0],
      helpfulCount: 1,
    };

    setUserReviews([newRev, ...userReviews]);
    setNewAuthor("");
    setNewTitle("");
    setNewComment("");
    addToast("Critique Published", "Thank you for contributing to the archive.", "success");
  };

  const relatedProducts = (products.filter((p) => p.id !== product.id).length > 0
    ? products.filter((p) => p.id !== product.id)
    : PRODUCTS.filter((p) => p.id !== product.id)
  ).slice(0, 4);
  const bundleOriginalTotal = product.price + bundleCompanion.price;
  const bundleDiscountedTotal = Math.round(bundleOriginalTotal * 0.85);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-1 py-8 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2.5 text-xs font-mono text-zinc-500 mb-10 overflow-x-auto no-scrollbar">
            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-zinc-400 shrink-0" />
            <Link href="/products" className="hover:text-black dark:hover:text-white transition-colors">
              Vault
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 pb-16 border-b border-zinc-200 dark:border-zinc-800">
            {/* Gallery Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-black/60 border border-zinc-200 dark:border-zinc-800 group shadow-xl">
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
                    <span className="px-3 py-1 rounded-xl bg-black text-white border border-zinc-700 text-[10px] font-mono font-bold uppercase tracking-[0.16em] shadow-md">
                      NEW RELEASE
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="px-3 py-1 rounded-xl bg-zinc-900 text-zinc-300 text-[10px] font-mono font-bold uppercase tracking-[0.16em] shadow-md border border-zinc-700">
                      SIGNATURE
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="px-3 py-1 rounded-xl bg-black text-white text-[10px] font-mono font-bold shadow-md border border-zinc-700">
                      SAVE {discount}%
                    </span>
                  )}
                </div>

                <button
                  onClick={handleShare}
                  className="absolute top-4 right-4 p-3 rounded-2xl bg-white/80 dark:bg-black/85 backdrop-blur-md text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white border border-zinc-200 dark:border-zinc-800 transition-colors shadow-md cursor-pointer"
                  title="Share Dossier"
                  aria-label="Share product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnails Row */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3.5 overflow-x-auto pb-2 no-scrollbar">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-black border-2 transition-all shrink-0 cursor-pointer ${
                        selectedImageIndex === idx
                          ? "border-black dark:border-white ring-2 ring-zinc-400 scale-95"
                          : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 opacity-60 hover:opacity-100"
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

            {/* Product Configuration Details */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 uppercase tracking-[0.2em] font-bold text-[10px] border border-zinc-200 dark:border-zinc-800">
                    {product.brand}
                  </span>
                  <div className="flex items-center gap-1.5 text-black dark:text-white font-bold">
                    <Star className="w-4 h-4 fill-black dark:fill-white text-black dark:text-white" />
                    <span>{product.rating}</span>
                    <span className="text-zinc-400 font-normal">
                      ({product.reviewsCount} critiques)
                    </span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-black dark:text-white tracking-tight uppercase leading-tight">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-3 py-3 border-y border-zinc-100 dark:border-zinc-800">
                  <span className="text-3xl sm:text-4xl font-black text-black dark:text-white font-mono">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-zinc-400 line-through font-mono">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-xs font-mono font-bold border border-zinc-300 dark:border-zinc-700">
                      -{discount}% CONCESSION
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  {product.description}
                </p>

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-2 pt-2 font-mono">
                    <div className="flex items-center justify-between text-xs">
                      <span className="uppercase text-zinc-500 tracking-wider">Finish:</span>
                      <span className="font-bold text-black dark:text-white">
                        {selectedColor}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs transition-all cursor-pointer ${
                            selectedColor === c.name
                              ? "border-black dark:border-white bg-zinc-100 dark:bg-zinc-900 font-bold"
                              : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400"
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20"
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
                  <div className="space-y-2 pt-2 font-mono">
                    <div className="flex items-center justify-between text-xs">
                      <span className="uppercase text-zinc-500 tracking-wider">Scale / Size:</span>
                      <span className="font-bold text-black dark:text-white">
                        {selectedSize}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3.5 py-2 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                            selectedSize === s
                              ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-xs"
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
                  <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-black">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2 text-zinc-500 hover:text-black dark:hover:text-white font-mono font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-xs font-mono font-bold text-black dark:text-white min-w-[36px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2 text-zinc-500 hover:text-black dark:hover:text-white font-mono font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-black dark:bg-white" />
                    <span className="text-zinc-500">
                      {product.inStock
                        ? `Available in Vault (${product.stockCount} pieces)`
                        : "Vault Depleted"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3.5 pt-5 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      addToCart(product, quantity, selectedColor, selectedSize)
                    }
                    className="flex-1 py-4 rounded-2xl bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-mono text-xs font-black uppercase tracking-[0.14em] flex items-center justify-center gap-2.5 transition-all shadow-sm cursor-pointer active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      inWish
                        ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                    }`}
                    aria-label="Save to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${inWish ? "fill-current" : ""}`} />
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 rounded-2xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-black dark:text-white font-mono text-xs font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer border border-zinc-200 dark:border-zinc-800"
                >
                  Direct Concierge Checkout &bull; {formatPrice(product.price * quantity)}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-5 border-t border-zinc-100 dark:border-zinc-800 text-center font-mono text-[10px] text-zinc-500">
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <Truck className="w-4 h-4 text-zinc-400" />
                  <span>Free Express Air</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <RotateCcw className="w-4 h-4 text-zinc-400" />
                  <span>30-Day Trial</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <ShieldCheck className="w-4 h-4 text-zinc-400" />
                  <span>2-Yr Warranty</span>
                </div>
              </div>
            </div>
          </div>

          {/* Frequently Bought Together Bundle */}
          {bundleCompanion && (
            <div className="py-12 border-b border-zinc-200 dark:border-zinc-800">
              <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-400 font-bold block">
                      COMPLIMENTARY SUITE BUNDLE
                    </span>
                    <h3 className="text-lg sm:text-2xl font-black uppercase text-black dark:text-white mt-1 tracking-tight">
                      Frequently Bought Together
                    </h3>
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-mono font-bold uppercase tracking-wider self-start sm:self-auto">
                    Concession: 15% Savings
                  </span>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex flex-wrap items-center gap-5">
                    {/* Item 1 */}
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-18 h-18 rounded-2xl overflow-hidden bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="72px"
                        />
                      </div>
                      <div className="font-mono text-xs">
                        <p className="font-bold text-black dark:text-white truncate max-w-[180px]">
                          {product.name}
                        </p>
                        <span className="font-bold text-black dark:text-white">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>

                    <Plus className="w-5 h-5 text-zinc-400 stroke-[3]" />

                    {/* Item 2 */}
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-18 h-18 rounded-2xl overflow-hidden bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shrink-0">
                        <Image
                          src={bundleCompanion.images[0]}
                          alt={bundleCompanion.name}
                          fill
                          className="object-cover"
                          sizes="72px"
                        />
                      </div>
                      <div className="font-mono text-xs">
                        <p className="font-bold text-black dark:text-white truncate max-w-[180px]">
                          {bundleCompanion.name}
                        </p>
                        <span className="font-bold text-black dark:text-white">
                          {formatPrice(bundleCompanion.price)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bundle CTA */}
                  <div className="flex items-center gap-5 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-5 md:pt-0 border-zinc-200 dark:border-zinc-800 font-mono">
                    <div className="text-right">
                      <span className="text-[10px] text-zinc-400 block line-through">
                        {formatPrice(bundleOriginalTotal)}
                      </span>
                      <span className="text-xl font-black text-black dark:text-white">
                        {formatPrice(bundleDiscountedTotal)}
                      </span>
                    </div>

                    <button
                      onClick={handleAddBundle}
                      className="px-7 py-3.5 rounded-2xl bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black text-xs font-black uppercase tracking-[0.14em] flex items-center gap-2 shadow-sm cursor-pointer shrink-0 active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Both to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Deep Specifications & Features Tabs */}
          <div className="py-14 border-b border-zinc-200 dark:border-zinc-800">
            {/* Tab Buttons */}
            <div className="flex items-center gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-8 font-mono text-xs font-bold uppercase tracking-wider overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab("features")}
                className={`pb-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === "features"
                    ? "text-black dark:text-white border-b-2 border-black dark:border-white -mb-[18px]"
                    : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                Key Architecture
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className={`pb-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === "specs"
                    ? "text-black dark:text-white border-b-2 border-black dark:border-white -mb-[18px]"
                    : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab("shipping")}
                className={`pb-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === "shipping"
                    ? "text-black dark:text-white border-b-2 border-black dark:border-white -mb-[18px]"
                    : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                Courier &amp; Warranty
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "reviews"
                    ? "text-black dark:text-white border-b-2 border-black dark:border-white -mb-[18px]"
                    : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Critiques ({userReviews.length})</span>
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === "features" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {product.features?.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-start gap-3.5"
                  >
                    <div className="p-1.5 rounded-lg bg-black text-white dark:bg-zinc-800 dark:text-white shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
                        {feat}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "specs" && (
              <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden font-mono text-xs">
                {Object.entries(product.specs || {}).map(([key, val], idx) => (
                  <div
                    key={key}
                    className={`flex items-center justify-between p-5 ${
                      idx % 2 === 0
                        ? "bg-zinc-50 dark:bg-zinc-950"
                        : "bg-white dark:bg-black"
                    } border-b border-zinc-100 dark:border-zinc-800 last:border-0`}
                  >
                    <span className="text-zinc-500 uppercase tracking-wider">{key}</span>
                    <span className="font-bold text-black dark:text-white text-right">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="p-7 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-5 text-xs font-mono">
                <div className="space-y-1.5">
                  <h4 className="font-bold text-black dark:text-white uppercase text-sm">
                    Complimentary Express Air Dispatch
                  </h4>
                  <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Acquisitions placed before 2:00 PM ship same-day via BlueDart Air Express with carbon-neutral transit protocol.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-black dark:text-white uppercase text-sm">
                    30-Day Sanctuary In-Home Trial
                  </h4>
                  <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    If you are not thoroughly satisfied with the acoustic fidelity or craft, initiate an instant return with pre-paid return labels.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-8">
                {/* Submit Review Box */}
                <form
                  onSubmit={handleSubmitReview}
                  className="p-7 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-4 font-mono text-xs shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm uppercase text-black dark:text-white">
                      Submit Patron Appraisal
                    </h4>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 cursor-pointer"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              star <= newRating
                                ? "fill-black dark:fill-white text-black dark:text-white"
                                : "text-zinc-300 dark:text-zinc-700"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name..."
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                    />
                    <input
                      type="text"
                      placeholder="Critique Headline..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                    />
                  </div>

                  <textarea
                    required
                    rows={3}
                    placeholder="Share your detailed impressions on acoustic signature, titanium tactile qualities, or packaging..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                  />

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-7 py-3 rounded-xl bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-bold uppercase tracking-wider text-xs shadow-sm cursor-pointer active:scale-95"
                    >
                      Publish to Archive
                    </button>
                  </div>
                </form>

                {/* Reviews List */}
                <div className="space-y-4">
                  {userReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-6 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3 font-mono"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-black dark:text-white">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-black dark:fill-white" />
                          ))}
                        </div>
                        <span className="text-[10px] text-zinc-400">{rev.date}</span>
                      </div>

                      <h5 className="font-bold text-xs text-black dark:text-white">
                        {rev.title}
                      </h5>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
                        &ldquo;{rev.comment}&rdquo;
                      </p>

                      <div className="pt-2.5 flex items-center justify-between text-[10px] text-zinc-500 border-t border-zinc-100 dark:border-zinc-800">
                        <span className="font-bold text-black dark:text-white flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {rev.author} &bull; Verified Patron
                        </span>
                        <span>Helpful ({rev.helpfulCount})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Recommendations */}
          <div className="py-16">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-400 font-bold">
                  RECOMMENDED OBJECTS
                </span>
                <h2 className="text-xl sm:text-3xl font-black uppercase text-black dark:text-white tracking-tight mt-1">
                  You Might Also Appreciate
                </h2>
              </div>
              <Link
                href="/products"
                className="text-xs font-mono font-bold uppercase tracking-[0.14em] text-black dark:text-white hover:text-zinc-500 transition-colors"
              >
                View Full Vault &rarr;
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
