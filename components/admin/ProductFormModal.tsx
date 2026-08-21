"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Product, ProductColor } from "@/types/shop";
import { CATEGORIES } from "@/data/products";
import { CustomSelect, CustomSelectOption } from "@/components/ui/CustomSelect";
import {
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
  Sparkles,
  Check,
  AlertCircle,
  Shield,
  Truck,
  Headphones,
  Watch,
  Shirt,
  Lamp,
  Compass,
  Briefcase,
  DollarSign,
  Tag,
  Percent,
  Eye,
  SlidersHorizontal,
  Package,
  CheckCircle2,
  Wand2,
} from "lucide-react";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: Partial<Product>) => void;
  initialProduct?: Product | null;
}

export function ProductFormModal({
  isOpen,
  onClose,
  onSave,
  initialProduct,
}: ProductFormModalProps) {
  const isEditing = !!initialProduct;

  const [activeTab, setActiveTab] = useState<"general" | "media" | "specs">("general");

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("ShopNest Studio");
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [price, setPrice] = useState<string>("");
  const [originalPrice, setOriginalPrice] = useState<string>("");
  const [stockCount, setStockCount] = useState<string>("20");
  const [inStock, setInStock] = useState(true);
  const [isNew, setIsNew] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isFlashDeal, setIsFlashDeal] = useState(false);
  const [flashDiscountPercent, setFlashDiscountPercent] = useState<string>("20");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");
  const [colorName, setColorName] = useState("Obsidian Black");
  const [colorHex, setColorHex] = useState("#111111");
  const [warrantyTier, setWarrantyTier] = useState("2-Year ShopNest Global Concierge");
  const [shippingTier, setShippingTier] = useState("Complimentary Carbon-Neutral Express");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const samplePresets = [
    {
      title: "Apex Wireless ANC Headphones",
      brand: "Aura Acoustic Labs",
      category: "Audio",
      price: "24999.00",
      originalPrice: "29999.00",
      stock: "15",
      colorName: "Obsidian Black",
      colorHex: "#111111",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      desc: "Custom 40mm titanium drivers deliver high-fidelity spatial acoustics with active adaptive noise cancellation.",
      features: "40mm Titanium Acoustic Drivers\nAdaptive Active Noise Cancellation\n45-Hour Battery with USB-C Fast Charging",
      tags: "audio, headphones, spatial, titanium, wireless",
    },
    {
      title: "Chronograph Titanium Smartwatch",
      brand: "Lumina Minimalist",
      category: "Wearables",
      price: "34999.00",
      originalPrice: "39999.00",
      stock: "10",
      colorName: "Matte Titanium",
      colorHex: "#52525b",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      desc: "Grade 5 titanium chassis with sapphire crystal AMOLED touch display and ECG health telemetry sensors.",
      features: "Grade 5 Titanium Enclosure\nSapphire Glass AMOLED Display\n7-Day Bio-Metric Battery Life",
      tags: "watch, smartwatch, titanium, luxury, fitness",
    },
    {
      title: "Handcrafted Artisan Leather Weekender",
      brand: "Heritage Leathercraft",
      category: "Fashion",
      price: "18999.00",
      originalPrice: "22499.00",
      stock: "8",
      colorName: "Cognac Amber",
      colorHex: "#78350f",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
      desc: "Full-grain vegetable-tanned Italian leather with hand-stitched reinforcements and antique brass hardware.",
      features: "100% Full-Grain Tuscan Leather\nSolid Brass YKK Japanese Zippers\nPadded 16-inch Laptop Compartment",
      tags: "leather, travel, weekender, artisan, luxury",
    },
  ];

  const quickColors = [
    { name: "Obsidian Black", hex: "#111111" },
    { name: "Matte Silver", hex: "#d4d4d8" },
    { name: "Pure White", hex: "#fafafa" },
    { name: "Slate Charcoal", hex: "#3f3f46" },
    { name: "Cognac Leather", hex: "#78350f" },
    { name: "Deep Emerald", hex: "#064e3b" },
  ];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "tech-audio":
        return <Headphones className="w-4 h-4" />;
      case "wearables":
        return <Watch className="w-4 h-4" />;
      case "apparel-footwear":
        return <Shirt className="w-4 h-4" />;
      case "home-living":
        return <Lamp className="w-4 h-4" />;
      case "skincare-wellness":
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Compass className="w-4 h-4" />;
    }
  };

  const categoryOptions: CustomSelectOption[] = useMemo(() => {
    return CATEGORIES.map((c) => ({
      value: c.name,
      label: c.name,
      description: c.description,
      icon: getCategoryIcon(c.id),
      badge: c.tag,
    }));
  }, []);

  const brandOptions: CustomSelectOption[] = [
    { value: "Cherry Studio", label: "Cherry Studio", description: "In-house minimalist flagship", icon: <Briefcase className="w-3.5 h-3.5" /> },
    { value: "Aura Acoustic Labs", label: "Aura Acoustic Labs", description: "High-fidelity audio & acoustics" },
    { value: "Lumina Minimalist", label: "Lumina Minimalist", description: "Smart precision wearables" },
    { value: "Heritage Leathercraft", label: "Heritage Leathercraft", description: "Handcrafted artisan leather" },
    { value: "Vance Monolith", label: "Vance Monolith", description: "Architectural lifestyle objects" },
    { value: "Botanical Care", label: "Botanical Care", description: "Organic skin & wellness formulas" },
    { value: "Keychron Precision", label: "Keychron Precision", description: "Mechanical productivity devices" },
  ];

  const warrantyOptions: CustomSelectOption[] = [
    { value: "2-Year Cherry Global Concierge", label: "2-Year Global Concierge Warranty", description: "Full accidental & hardware repair", icon: <Shield className="w-3.5 h-3.5" /> },
    { value: "3-Year Extended Luxury Care", label: "3-Year Extended Luxury Care", description: "VIP replacement guarantee", badge: "VIP" },
    { value: "1-Year Limited Craftsmanship Warranty", label: "1-Year Limited Craftsmanship Warranty", description: "Standard component protection" },
    { value: "Lifetime Leather Guarantee", label: "Lifetime Leather Guarantee", description: "Artisan repair for life" },
  ];

  const shippingOptions: CustomSelectOption[] = [
    { value: "Complimentary Carbon-Neutral Express", label: "Carbon-Neutral Express (Bluedart / Delhivery)", description: "2-3 business days delivery", icon: <Truck className="w-3.5 h-3.5" />, badge: "Free" },
    { value: "Priority White-Glove Same-Day Dispatch", label: "White-Glove Same-Day Courier", description: "Immediate local courier delivery", badge: "₹499.00" },
    { value: "Standard Tracked Ground Shipping", label: "Standard Tracked Ground", description: "5-7 business days", badge: "₹199.00" },
  ];

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setBrand(initialProduct.brand || "Cherry Studio");
      setCategory(initialProduct.category);
      setPrice(initialProduct.price != null ? Number(initialProduct.price).toFixed(2) : "");
      setOriginalPrice(
        initialProduct.originalPrice != null
          ? Number(initialProduct.originalPrice).toFixed(2)
          : ""
      );
      setStockCount(String(initialProduct.stockCount ?? 20));
      setInStock(initialProduct.inStock);
      setIsNew(!!initialProduct.isNew);
      setIsBestSeller(!!initialProduct.isBestSeller);
      setIsFlashDeal(!!initialProduct.isFlashDeal);
      setFlashDiscountPercent(String(initialProduct.flashDiscountPercent || 20));
      setImageUrl(initialProduct.images[0] || "");
      setDescription(initialProduct.description || "");
      setTagsInput((initialProduct.tags || []).join(", "));
      setFeaturesInput((initialProduct.features || []).join("\n"));
      setColorName(initialProduct.colors[0]?.name || "Obsidian Black");
      setColorHex(initialProduct.colors[0]?.hex || "#111111");
      setWarrantyTier(initialProduct.specs?.Warranty || "2-Year Cherry Global Concierge");
      setShippingTier(initialProduct.specs?.Shipping || "Complimentary Carbon-Neutral Express");
    } else {
      setName("");
      setBrand("Cherry Studio");
      setCategory(CATEGORIES[0].name);
      setPrice("23999.00");
      setOriginalPrice("");
      setStockCount("20");
      setInStock(true);
      setIsNew(true);
      setIsBestSeller(false);
      setIsFlashDeal(false);
      setFlashDiscountPercent("20");
      setImageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80");
      setDescription("Precision engineered minimalist spatial audio headphones featuring custom 40mm acoustic transducers.");
      setTagsInput("minimal, luxury, essentials, audio");
      setFeaturesInput("Precision CNC-machined enclosure\nHigh-fidelity acoustic tuning\nUSB-C Fast Charging");
      setColorName("Obsidian Black");
      setColorHex("#111111");
      setWarrantyTier("2-Year Cherry Global Concierge");
      setShippingTier("Complimentary Carbon-Neutral Express");
    }
  }, [initialProduct, isOpen]);

  const applyPreset = (preset: any) => {
    setName(preset.title);
    setBrand(preset.brand);
    setCategory(preset.category);
    setPrice(preset.price);
    setOriginalPrice(preset.originalPrice);
    setStockCount(preset.stock);
    setColorName(preset.colorName);
    setColorHex(preset.colorHex);
    setImageUrl(preset.image);
    setDescription(preset.desc);
    setFeaturesInput(preset.features);
    setTagsInput(preset.tags);
  };

  const formatDecimalOnBlur = (
    val: string,
    setter: (formatted: string) => void
  ) => {
    if (!val || val.trim() === "") return;
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setter(num.toFixed(2));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Product title is required";
    if (!price || parseFloat(price) <= 0) newErrors.price = "Enter valid price in ₹";
    if (originalPrice && parseFloat(originalPrice) < parseFloat(price)) {
      newErrors.originalPrice = "Original price should be >= price";
    }
    if (!stockCount || parseInt(stockCount, 10) < 0) {
      newErrors.stockCount = "Stock must be >= 0";
    }
    if (!imageUrl.trim()) newErrors.imageUrl = "Product image URL is required";
    if (!description.trim()) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const features = featuresInput
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const colors: ProductColor[] = [
      {
        name: colorName.trim() || "Standard",
        hex: colorHex,
      },
    ];

    const parsedPrice = parseFloat(parseFloat(price).toFixed(2));
    const parsedOriginalPrice = originalPrice.trim()
      ? parseFloat(parseFloat(originalPrice).toFixed(2))
      : undefined;
    const parsedStock = parseInt(stockCount, 10) || 0;

    onSave({
      name: name.trim(),
      brand: brand.trim(),
      category,
      price: parsedPrice,
      originalPrice: parsedOriginalPrice,
      stockCount: parsedStock,
      inStock: inStock && parsedStock > 0,
      isNew,
      isBestSeller,
      isFlashDeal,
      flashDiscountPercent: isFlashDeal ? parseInt(flashDiscountPercent, 10) || 20 : undefined,
      images: [imageUrl.trim()],
      description: description.trim(),
      tags,
      features,
      colors,
      specs: {
        Warranty: warrantyTier,
        Shipping: shippingTier,
        Status: inStock ? "In Stock" : "Backorder",
      },
    });

    onClose();
  };

  if (!isOpen) return null;

  const numPrice = parseFloat(price) || 0;
  const numOrigPrice = parseFloat(originalPrice) || 0;
  const discountSavings =
    numOrigPrice > numPrice && numPrice > 0
      ? {
          amount: (numOrigPrice - numPrice).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          percent: (((numOrigPrice - numPrice) / numOrigPrice) * 100).toFixed(1),
        }
      : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200 font-sans">
      <div className="bg-white border border-zinc-200 rounded-3xl w-full max-w-5xl shadow-[0_25px_70px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Studio Modal Header */}
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-bold text-xs font-mono shadow-xs">
              SN
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">
                  {isEditing ? "EDIT PRODUCT RECORD" : "NEW INVENTORY CREATION"}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-black text-white text-[9px] font-mono font-bold uppercase">
                  INR ₹ BASE
                </span>
              </div>
              <h2 className="text-lg font-bold tracking-tight text-black flex items-center gap-2">
                {isEditing ? `Edit: ${initialProduct?.name}` : "Create Catalog Product"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Fill Preset Dropdown / Button */}
            {!isEditing && (
              <div className="hidden sm:flex items-center gap-1.5 bg-white border border-zinc-200 rounded-xl p-1 shadow-2xs">
                <span className="text-[10px] font-mono text-zinc-400 px-2 font-bold flex items-center gap-1">
                  <Wand2 className="w-3 h-3 text-zinc-600" /> Presets:
                </span>
                {samplePresets.map((preset, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => applyPreset(preset)}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-black transition-colors"
                  >
                    {preset.category}
                  </button>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-black hover:bg-zinc-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Body - 2 Column Architecture */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto flex flex-col md:flex-row">
          {/* LEFT COLUMN: Input Fields & Configuration */}
          <div className="flex-1 p-6 md:p-8 space-y-6 border-b md:border-b-0 md:border-r border-zinc-100 text-xs">
            {/* Navigation Tabs */}
            <div className="flex gap-2 p-1 rounded-xl bg-zinc-100/80 border border-zinc-200/80 w-fit">
              <button
                type="button"
                onClick={() => setActiveTab("general")}
                className={`px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all ${
                  activeTab === "general"
                    ? "bg-white text-black shadow-xs"
                    : "text-zinc-500 hover:text-black"
                }`}
              >
                1. General & Pricing
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("media")}
                className={`px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all ${
                  activeTab === "media"
                    ? "bg-white text-black shadow-xs"
                    : "text-zinc-500 hover:text-black"
                }`}
              >
                2. Imagery & Style
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("specs")}
                className={`px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all ${
                  activeTab === "specs"
                    ? "bg-white text-black shadow-xs"
                    : "text-zinc-500 hover:text-black"
                }`}
              >
                3. Specifications
              </button>
            </div>

            {/* TAB 1: General & Pricing */}
            {activeTab === "general" && (
              <div className="space-y-5 animate-in fade-in duration-150">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-zinc-600 font-bold">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Titanium Wireless ANC Headphones"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full h-11 px-3.5 rounded-xl bg-zinc-50 border ${
                      errors.name ? "border-red-500" : "border-zinc-200"
                    } text-black font-semibold text-xs focus:outline-none focus:border-black transition-colors`}
                  />
                  {errors.name && <p className="text-[10px] text-red-500 font-semibold">{errors.name}</p>}
                </div>

                {/* Category & Studio Brand Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CustomSelect
                    label="Store Category *"
                    options={categoryOptions}
                    value={category}
                    onChange={(val) => setCategory(val)}
                  />
                  <CustomSelect
                    label="Studio Label *"
                    options={brandOptions}
                    value={brand}
                    onChange={(val) => setBrand(val)}
                  />
                </div>

                {/* Pricing & Stock Card */}
                <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-200 space-y-4">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold block">
                    Pricing & Inventory Status (INR ₹)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Selling Price */}
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase text-zinc-600 font-bold">
                        Price (₹) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 font-bold font-mono">
                          ₹
                        </span>
                        <input
                          type="text"
                          inputMode="decimal"
                          placeholder="23999.00"
                          value={price}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d*\.?\d{0,2}$/.test(val) || val === "") setPrice(val);
                          }}
                          onBlur={() => formatDecimalOnBlur(price, setPrice)}
                          className={`w-full h-10 pl-7 pr-3 rounded-xl bg-white border ${
                            errors.price ? "border-red-500" : "border-zinc-200"
                          } text-black font-bold font-mono focus:outline-none focus:border-black`}
                        />
                      </div>
                    </div>

                    {/* Original Compare-at Price */}
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase text-zinc-600 font-bold">
                        Original (₹)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 font-bold font-mono">
                          ₹
                        </span>
                        <input
                          type="text"
                          inputMode="decimal"
                          placeholder="28999.00"
                          value={originalPrice}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d*\.?\d{0,2}$/.test(val) || val === "") setOriginalPrice(val);
                          }}
                          onBlur={() => formatDecimalOnBlur(originalPrice, setOriginalPrice)}
                          className="w-full h-10 pl-7 pr-3 rounded-xl bg-white border border-zinc-200 text-black font-bold font-mono focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>

                    {/* Stock Units */}
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase text-zinc-600 font-bold">
                        Stock Units *
                      </label>
                      <input
                        type="number"
                        min="0"
                        placeholder="20"
                        value={stockCount}
                        onChange={(e) => {
                          setStockCount(e.target.value);
                          const parsed = parseInt(e.target.value, 10);
                          if (!isNaN(parsed)) setInStock(parsed > 0);
                        }}
                        className={`w-full h-10 px-3 rounded-xl bg-white border ${
                          errors.stockCount ? "border-red-500" : "border-zinc-200"
                        } text-black font-bold font-mono focus:outline-none focus:border-black`}
                      />
                    </div>
                  </div>

                  {discountSavings && (
                    <div className="flex items-center gap-2 text-emerald-600 font-mono text-[11px] font-bold">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 border border-emerald-200">
                        -{discountSavings.percent}% OFF
                      </span>
                      <span>Customer saves ₹{discountSavings.amount}</span>
                    </div>
                  )}
                </div>

                {/* Badges & Tags Checkboxes */}
                <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-200 space-y-2.5">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold block">
                    Product Badges & Visibility
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-semibold">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inStock}
                        onChange={(e) => setInStock(e.target.checked)}
                        className="rounded border-zinc-300 text-black focus:ring-0 w-4 h-4"
                      />
                      <span>In Stock</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isNew}
                        onChange={(e) => setIsNew(e.target.checked)}
                        className="rounded border-zinc-300 text-black focus:ring-0 w-4 h-4"
                      />
                      <span>New Drop</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isBestSeller}
                        onChange={(e) => setIsBestSeller(e.target.checked)}
                        className="rounded border-zinc-300 text-black focus:ring-0 w-4 h-4"
                      />
                      <span>Best Seller</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isFlashDeal}
                        onChange={(e) => setIsFlashDeal(e.target.checked)}
                        className="rounded border-zinc-300 text-black focus:ring-0 w-4 h-4"
                      />
                      <span>Flash Deal</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Imagery & Style */}
            {activeTab === "media" && (
              <div className="space-y-5 animate-in fade-in duration-150">
                {/* Image URL Input */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-zinc-600 font-bold">
                    High-Res Main Image URL *
                  </label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className={`w-full h-11 px-3.5 rounded-xl bg-zinc-50 border ${
                      errors.imageUrl ? "border-red-500" : "border-zinc-200"
                    } text-black text-xs font-mono focus:outline-none focus:border-black`}
                  />
                  {errors.imageUrl && (
                    <p className="text-[10px] text-red-500 font-semibold">{errors.imageUrl}</p>
                  )}
                </div>

                {/* Color Swatches & Custom Picker */}
                <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-200 space-y-3">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold block">
                    Product Colorway & Palette
                  </span>

                  <div className="flex flex-wrap gap-2 items-center">
                    {quickColors.map((qc, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => {
                          setColorName(qc.name);
                          setColorHex(qc.hex);
                        }}
                        className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-semibold transition-all ${
                          colorHex === qc.hex
                            ? "bg-black text-white border-black shadow-xs"
                            : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400"
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: qc.hex }}
                        />
                        <span>{qc.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-[10px] uppercase text-zinc-500 font-bold">Custom Name</label>
                      <input
                        type="text"
                        value={colorName}
                        onChange={(e) => setColorName(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl bg-white border border-zinc-200 text-black font-semibold text-xs mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-zinc-500 font-bold">Custom Hex</label>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="color"
                          value={colorHex}
                          onChange={(e) => setColorHex(e.target.value)}
                          className="w-10 h-10 p-0.5 rounded-xl border border-zinc-200 bg-white cursor-pointer"
                        />
                        <input
                          type="text"
                          value={colorHex}
                          onChange={(e) => setColorHex(e.target.value)}
                          className="flex-1 h-10 px-3 rounded-xl bg-white border border-zinc-200 text-black font-mono font-bold text-xs uppercase"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Specifications & Description */}
            {activeTab === "specs" && (
              <div className="space-y-5 animate-in fade-in duration-150">
                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-zinc-600 font-bold">
                    Editorial Description *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide clean, luxury copy describing the object..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`w-full p-3.5 rounded-xl bg-zinc-50 border ${
                      errors.description ? "border-red-500" : "border-zinc-200"
                    } text-black text-xs leading-relaxed focus:outline-none focus:border-black`}
                  />
                  {errors.description && (
                    <p className="text-[10px] text-red-500 font-semibold">{errors.description}</p>
                  )}
                </div>

                {/* Features & Tags */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-zinc-600 font-bold">
                      Key Highlights (1 per line)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Titanium Enclosure&#10;Spatial Audio&#10;Fast USB-C Charging"
                      value={featuresInput}
                      onChange={(e) => setFeaturesInput(e.target.value)}
                      className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-black text-xs focus:outline-none focus:border-black"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-zinc-600 font-bold">
                      Tags (Comma separated)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="audio, luxury, wireless, minimalist"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-black text-xs focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                {/* Warranty & Courier Class */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CustomSelect
                    label="Warranty Tier"
                    options={warrantyOptions}
                    value={warrantyTier}
                    onChange={(val) => setWarrantyTier(val)}
                  />
                  <CustomSelect
                    label="Shipping Service Tier"
                    options={shippingOptions}
                    value={shippingTier}
                    onChange={(val) => setShippingTier(val)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Live Interactive Storefront Preview Card */}
          <div className="w-full md:w-80 p-6 bg-zinc-50/50 flex flex-col justify-between shrink-0 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-zinc-600" /> Live Card Preview
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-200 text-zinc-700 font-bold">
                  Storefront
                </span>
              </div>

              {/* Mock Product Card */}
              <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm space-y-3 p-3">
                <div className="relative w-full h-44 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                  )}

                  {/* Top Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {isNew && (
                      <span className="px-2 py-0.5 rounded bg-black text-white text-[9px] font-mono font-bold uppercase">
                        New
                      </span>
                    )}
                    {isBestSeller && (
                      <span className="px-2 py-0.5 rounded bg-amber-500 text-black text-[9px] font-mono font-bold uppercase">
                        Best Seller
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                    {brand || "Brand"} • {category}
                  </span>
                  <h4 className="font-bold text-xs text-black line-clamp-1">
                    {name || "Untitled Product"}
                  </h4>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-zinc-100">
                  <div>
                    <div className="font-bold text-sm font-mono text-black">
                      ₹{numPrice > 0 ? numPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}
                    </div>
                    {numOrigPrice > numPrice && (
                      <div className="text-[10px] text-zinc-400 line-through font-mono">
                        ₹{numOrigPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-zinc-300"
                      style={{ backgroundColor: colorHex }}
                      title={colorName}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Summary Pill */}
            <div className="p-3 rounded-xl bg-white border border-zinc-200 text-[10px] font-mono text-zinc-500 space-y-1">
              <div className="flex justify-between">
                <span>Settlement:</span>
                <span className="font-bold text-black">Indian Rupee (₹)</span>
              </div>
              <div className="flex justify-between">
                <span>Stock Registry:</span>
                <span className="font-bold text-black">{stockCount || 0} Units</span>
              </div>
            </div>
          </div>
        </form>

        {/* Modal Action Bar */}
        <div className="p-5 border-t border-zinc-100 bg-zinc-50/80 flex items-center justify-between font-sans">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 font-bold uppercase text-xs tracking-wider transition-colors"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-black text-white hover:bg-zinc-800 font-bold uppercase text-xs tracking-wider transition-colors flex items-center gap-2 shadow-md"
          >
            <Check className="w-4 h-4" />
            <span>{isEditing ? "Save Product Changes" : "Publish to Storefront"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
