"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Product } from "@/types/shop";
import { CATEGORIES } from "@/data/products";
import {
  UploadCloud,
  X,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Table,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  Check,
  ChevronDown,
  Eye,
  Edit3,
} from "lucide-react";

interface AdminAddProductFormProps {
  initialProduct?: Product | null;
  onSave: (productData: Partial<Product>) => void;
  onCancel: () => void;
}

export function AdminAddProductForm({
  initialProduct,
  onSave,
  onCancel,
}: AdminAddProductFormProps) {
  const isEditing = !!initialProduct;

  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]?.name || "Audio");
  const [brand, setBrand] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("0");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paragraphFormat, setParagraphFormat] = useState("Paragraph");
  const [isParagraphOpen, setIsParagraphOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<"write" | "preview">("write");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fullDescRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name || "");
      setCategory(initialProduct.category || CATEGORIES[0]?.name || "Audio");
      setBrand(initialProduct.brand || "");
      setShortDesc(
        initialProduct.description
          ? initialProduct.description.slice(0, 150)
          : ""
      );
      setFullDesc(initialProduct.description || "");
      setSellingPrice(
        initialProduct.price != null ? Number(initialProduct.price).toFixed(2) : ""
      );
      setOriginalPrice(
        initialProduct.originalPrice != null
          ? Number(initialProduct.originalPrice).toFixed(2)
          : ""
      );
      setStockQuantity(String(initialProduct.stockCount ?? 0));
      setImageUrl(initialProduct.images?.[0] || "");
    } else {
      setName("");
      setCategory(CATEGORIES[0]?.name || "Audio");
      setBrand("");
      setShortDesc("");
      setFullDesc("");
      setSellingPrice("");
      setOriginalPrice("");
      setStockQuantity("0");
      setImageUrl("");
    }
  }, [initialProduct]);

  // Handle local image upload preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormatPrice = (val: string, setter: (v: string) => void) => {
    if (!val || val.trim() === "") return;
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setter(num.toFixed(2));
    }
  };

  // Rich text formatting engine
  const applyFormat = (
    type:
      | "bold"
      | "italic"
      | "underline"
      | "bullet"
      | "number"
      | "table"
      | "link"
      | "code"
      | "h1"
      | "h2"
      | "paragraph"
  ) => {
    const textarea = fullDescRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = fullDesc.substring(start, end);
    const before = fullDesc.substring(0, start);
    const after = fullDesc.substring(end);

    let formatted = "";
    let newCursorPos = start;

    switch (type) {
      case "bold":
        formatted = selectedText ? `**${selectedText}**` : "**bold text**";
        newCursorPos = selectedText ? start + formatted.length : start + 2;
        break;
      case "italic":
        formatted = selectedText ? `*${selectedText}*` : "*italic text*";
        newCursorPos = selectedText ? start + formatted.length : start + 1;
        break;
      case "underline":
        formatted = selectedText ? `<u>${selectedText}</u>` : "<u>underlined text</u>";
        newCursorPos = selectedText ? start + formatted.length : start + 3;
        break;
      case "bullet":
        if (selectedText) {
          formatted = selectedText
            .split("\n")
            .map((line) => (line.startsWith("• ") ? line : `• ${line}`))
            .join("\n");
        } else {
          formatted = "• Feature 1\n• Feature 2\n• Feature 3";
        }
        newCursorPos = start + formatted.length;
        break;
      case "number":
        if (selectedText) {
          formatted = selectedText
            .split("\n")
            .map((line, idx) => `${idx + 1}. ${line}`)
            .join("\n");
        } else {
          formatted = "1. First specification\n2. Second specification\n3. Third specification";
        }
        newCursorPos = start + formatted.length;
        break;
      case "table":
        formatted = "\n| Attribute | Specification |\n| --- | --- |\n| Material | Aerospace Grade Titanium |\n| Battery | 45 Hours with Fast Charge |\n| Audio | High-Fidelity Spatial Acoustics |\n";
        newCursorPos = start + formatted.length;
        break;
      case "link":
        formatted = selectedText ? `[${selectedText}](https://example.com)` : "[Link Title](https://example.com)";
        newCursorPos = start + formatted.length;
        break;
      case "code":
        formatted = selectedText ? `\`${selectedText}\`` : "`code_snippet`";
        newCursorPos = start + formatted.length;
        break;
      case "h1":
        formatted = selectedText ? `\n# ${selectedText}\n` : "\n# Major Heading\n";
        newCursorPos = start + formatted.length;
        setParagraphFormat("Heading 1");
        break;
      case "h2":
        formatted = selectedText ? `\n## ${selectedText}\n` : "\n## Sub Heading\n";
        newCursorPos = start + formatted.length;
        setParagraphFormat("Heading 2");
        break;
      case "paragraph":
        formatted = selectedText ? `\n${selectedText}\n` : "\nStandard body paragraph.\n";
        newCursorPos = start + formatted.length;
        setParagraphFormat("Paragraph");
        break;
      default:
        break;
    }

    const updated = before + formatted + after;
    setFullDesc(updated);

    // Re-focus and update cursor selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 15);
  };

  // Convert markdown to clean HTML for the live preview tab
  const renderFormattedPreview = (text: string) => {
    if (!text.trim()) {
      return (
        <p className="text-zinc-400 italic">No description written yet. Type in the editor above to preview formatted text.</p>
      );
    }

    // Process basic markdown tags
    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      // restore <u> tags
      .replace(/&lt;u&gt;/g, "<u>")
      .replace(/&lt;\/u&gt;/g, "</u>")
      // Headings
      .replace(/^# (.*$)/gim, '<h1 class="text-base font-black text-black uppercase mt-3 mb-1.5">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-sm font-bold text-black uppercase mt-2.5 mb-1">$1</h2>')
      // Bold & Italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-black">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Code
      .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-zinc-100 font-mono text-[11px] text-black border border-zinc-200">$1</code>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-blue-600 underline font-semibold">$1</a>')
      // Bullets
      .replace(/^[•\-] (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
      // Line breaks
      .replace(/\n/g, "<br />");

    return (
      <div
        className="prose prose-sm max-w-none text-xs text-zinc-800 leading-relaxed space-y-2"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Product name is required";
    if (!category.trim()) errs.category = "Category is required";
    if (!sellingPrice || parseFloat(sellingPrice) <= 0) {
      errs.sellingPrice = "Valid selling price is required";
    }
    if (!stockQuantity || parseInt(stockQuantity, 10) < 0) {
      errs.stockQuantity = "Stock quantity must be 0 or more";
    }
    if (!fullDesc.trim() && !shortDesc.trim()) {
      errs.fullDesc = "Full description is required";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const parsedPrice = parseFloat(parseFloat(sellingPrice).toFixed(2));
    const parsedOrigPrice = originalPrice.trim()
      ? parseFloat(parseFloat(originalPrice).toFixed(2))
      : undefined;
    const parsedStock = parseInt(stockQuantity, 10) || 0;

    const finalImage =
      imageUrl.trim() ||
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80";

    onSave({
      name: name.trim(),
      brand: brand.trim() || "ShopNest Studio",
      category,
      price: parsedPrice,
      originalPrice: parsedOrigPrice,
      stockCount: parsedStock,
      inStock: parsedStock > 0,
      description: fullDesc.trim() || shortDesc.trim(),
      images: [finalImage],
      features: [
        "Premium Craftsmanship",
        "Official Brand Warranty",
        "Complimentary Insured Shipping",
      ],
      colors: [
        { name: "Obsidian Black", hex: "#111111" },
        { name: "Matte Silver", hex: "#d4d4d8" },
      ],
      specs: {
        Status: parsedStock > 0 ? "In Stock" : "Out of Stock",
        Warranty: "1-Year Official Brand Warranty",
        Shipping: "Express 2-3 Days Delivery",
      },
    });
  };

  const sampleImages = [
    { label: "Headphones", url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80" },
    { label: "Smartwatch", url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80" },
    { label: "Sneaker", url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80" },
    { label: "Desk Lamp", url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80" },
    { label: "Leather Bag", url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80" },
  ];

  return (
    <form onSubmit={handleSave} className="space-y-6 font-sans text-xs pb-12 animate-in fade-in duration-150">
      {/* Top Header Row with Breadcrumbs, Title and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold uppercase tracking-wider mb-2">
            <button
              type="button"
              onClick={onCancel}
              className="hover:text-black transition-colors"
            >
              PRODUCTS
            </button>
            <span>/</span>
            <span className="text-black font-bold">
              {isEditing ? "EDIT ITEM" : "ADD NEW ITEM"}
            </span>
          </div>

          {/* Large Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-black">
            {isEditing ? "EDIT ITEM" : "ADD NEW ITEM"}
          </h1>
        </div>

        {/* Top Right Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50 font-bold uppercase text-xs tracking-wider transition-colors shadow-2xs"
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="px-7 py-2.5 rounded-xl bg-black text-white hover:bg-zinc-800 font-bold uppercase text-xs tracking-wider transition-colors shadow-md flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>SAVE ITEM</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 2 Columns on Top */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ========================================================= */}
        {/* CARD 1: BASIC INFORMATION (Span 7) */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-5">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-black">
            BASIC INFORMATION
          </h3>

          {/* Product Name */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-zinc-800">
              Product Name *
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full h-11 px-3.5 rounded-xl bg-white border ${
                errors.name ? "border-red-500" : "border-zinc-200"
              } text-black placeholder:text-zinc-400 text-xs font-medium focus:outline-none focus:border-black selection:bg-black selection:text-white transition-colors`}
            />
            {errors.name && (
              <p className="text-[10px] text-red-500 font-semibold">{errors.name}</p>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="space-y-1.5 relative">
            <label className="text-[11px] font-bold text-zinc-800">
              Category *
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="w-full h-11 px-3.5 rounded-xl bg-white border border-zinc-200 text-left flex items-center justify-between text-black text-xs font-medium focus:outline-none focus:border-black transition-colors"
              >
                <span>{category || "Select category"}</span>
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-white border border-zinc-200 rounded-xl shadow-lg p-1 max-h-56 overflow-y-auto animate-in fade-in duration-100">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setCategory(cat.name);
                        setIsCategoryOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                        category === cat.name
                          ? "bg-black text-white"
                          : "text-zinc-700 hover:bg-zinc-100"
                      }`}
                    >
                      <span>{cat.name}</span>
                      {category === cat.name && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.category && (
              <p className="text-[10px] text-red-500 font-semibold">{errors.category}</p>
            )}
          </div>

          {/* Brand */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-zinc-800">
              Brand
            </label>
            <input
              type="text"
              placeholder="Enter brand name"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white border border-zinc-200 text-black placeholder:text-zinc-400 text-xs font-medium focus:outline-none focus:border-black selection:bg-black selection:text-white transition-colors"
            />
          </div>

          {/* Short Description with Character Counter */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-zinc-800">
              Short Description
            </label>
            <div className="relative">
              <textarea
                rows={3}
                maxLength={150}
                placeholder="Enter short description about product"
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                className="w-full p-3.5 pb-7 rounded-xl bg-white border border-zinc-200 text-black placeholder:text-zinc-400 text-xs font-medium leading-relaxed focus:outline-none focus:border-black selection:bg-black selection:text-white transition-colors resize-none"
              />
              <span className="absolute right-3 bottom-2 text-[10px] text-zinc-400 font-mono font-medium select-none pointer-events-none">
                {shortDesc.length}/150
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: PRODUCT IMAGES + PRICE & STOCK (Span 5) */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          {/* CARD 2: PRODUCT IMAGES */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-black">
                PRODUCT IMAGES
              </h3>
              {imageUrl && (
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="text-[10px] text-red-600 hover:underline font-bold"
                >
                  Clear Image
                </button>
              )}
            </div>

            {/* Hidden native file input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Upload Area / Image Preview */}
            {imageUrl ? (
              <div className="relative w-full h-40 rounded-xl border border-zinc-200 overflow-hidden bg-zinc-50 group">
                <Image
                  src={imageUrl}
                  alt="Product Image Preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-white text-black font-bold text-xs shadow-md"
                  >
                    Change
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-zinc-200 hover:border-zinc-400 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-zinc-50/50 hover:bg-zinc-50 group min-h-[140px]"
              >
                <div className="w-10 h-10 rounded-xl border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 group-hover:scale-105 transition-transform mb-2 shadow-2xs">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs text-black">Upload Images</span>
                <span className="text-[10px] text-zinc-400 mt-0.5">
                  Drag & drop or click to browse
                </span>
              </div>
            )}

            {/* Direct Image URL fallback & Quick presets */}
            <div className="space-y-1.5 pt-1">
              <input
                type="text"
                placeholder="Or paste image URL (https://...)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-zinc-50 border border-zinc-200 text-black text-[11px] placeholder:text-zinc-400 font-mono focus:outline-none focus:border-black selection:bg-black selection:text-white"
              />

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-zinc-400 font-semibold mr-1">Presets:</span>
                {sampleImages.map((samp, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImageUrl(samp.url)}
                    className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 hover:bg-zinc-200 text-[10px] font-semibold transition-colors"
                  >
                    {samp.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CARD 3: PRICE & STOCK */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-black">
              PRICE & STOCK
            </h3>

            {/* Row: Selling Price & Original Price */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-800">
                  Selling Price (₹) *
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={sellingPrice}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*\.?\d{0,2}$/.test(val) || val === "") setSellingPrice(val);
                  }}
                  onBlur={() => handleFormatPrice(sellingPrice, setSellingPrice)}
                  className={`w-full h-11 px-3.5 rounded-xl bg-white border ${
                    errors.sellingPrice ? "border-red-500" : "border-zinc-200"
                  } text-black font-bold font-mono text-xs placeholder:text-zinc-400 focus:outline-none focus:border-black selection:bg-black selection:text-white transition-colors`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-800">
                  Original Price (₹)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={originalPrice}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*\.?\d{0,2}$/.test(val) || val === "") setOriginalPrice(val);
                  }}
                  onBlur={() => handleFormatPrice(originalPrice, setOriginalPrice)}
                  className="w-full h-11 px-3.5 rounded-xl bg-white border border-zinc-200 text-black font-bold font-mono text-xs placeholder:text-zinc-400 focus:outline-none focus:border-black selection:bg-black selection:text-white transition-colors"
                />
              </div>
            </div>

            {/* Stock Quantity */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-800">
                Stock Quantity *
              </label>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                className={`w-full h-11 px-3.5 rounded-xl bg-white border ${
                  errors.stockQuantity ? "border-red-500" : "border-zinc-200"
                } text-black font-bold font-mono text-xs placeholder:text-zinc-400 focus:outline-none focus:border-black selection:bg-black selection:text-white transition-colors`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* CARD 4: PRODUCT DETAILS (Full Width Bottom Card) */}
      {/* ========================================================= */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-black">
            PRODUCT DETAILS
          </h3>

          {/* Write / Live Preview Mode Switcher */}
          <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl border border-zinc-200">
            <button
              type="button"
              onClick={() => setEditorMode("write")}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                editorMode === "write"
                  ? "bg-white text-black shadow-xs"
                  : "text-zinc-500 hover:text-black"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Write</span>
            </button>
            <button
              type="button"
              onClick={() => setEditorMode("preview")}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                editorMode === "preview"
                  ? "bg-white text-black shadow-xs"
                  : "text-zinc-500 hover:text-black"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-zinc-800">
            Full Description *
          </label>

          {/* Rich Editor Container */}
          <div className="border border-zinc-200 rounded-2xl overflow-hidden bg-white focus-within:border-black transition-colors">
            {/* Functional Rich Text Toolbar */}
            <div className="p-2 border-b border-zinc-200 bg-zinc-50/90 flex flex-wrap items-center gap-1 text-zinc-700 select-none">
              {/* Bold */}
              <button
                type="button"
                onClick={() => applyFormat("bold")}
                className="p-1.5 rounded-lg hover:bg-zinc-200 hover:text-black text-zinc-700 font-bold transition-colors"
                title="Bold (Wrap with **text**)"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>

              {/* Italic */}
              <button
                type="button"
                onClick={() => applyFormat("italic")}
                className="p-1.5 rounded-lg hover:bg-zinc-200 hover:text-black text-zinc-700 transition-colors"
                title="Italic (Wrap with *text*)"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>

              {/* Underline */}
              <button
                type="button"
                onClick={() => applyFormat("underline")}
                className="p-1.5 rounded-lg hover:bg-zinc-200 hover:text-black text-zinc-700 transition-colors"
                title="Underline (<u>text</u>)"
              >
                <Underline className="w-3.5 h-3.5" />
              </button>

              <div className="w-[1px] h-4 bg-zinc-300 mx-1" />

              {/* Bullet List */}
              <button
                type="button"
                onClick={() => applyFormat("bullet")}
                className="p-1.5 rounded-lg hover:bg-zinc-200 hover:text-black text-zinc-700 transition-colors"
                title="Bullet List (• Item)"
              >
                <List className="w-3.5 h-3.5" />
              </button>

              {/* Numbered List */}
              <button
                type="button"
                onClick={() => applyFormat("number")}
                className="p-1.5 rounded-lg hover:bg-zinc-200 hover:text-black text-zinc-700 transition-colors"
                title="Numbered List (1. Item)"
              >
                <ListOrdered className="w-3.5 h-3.5" />
              </button>

              {/* Table */}
              <button
                type="button"
                onClick={() => applyFormat("table")}
                className="p-1.5 rounded-lg hover:bg-zinc-200 hover:text-black text-zinc-700 transition-colors"
                title="Insert Feature Table"
              >
                <Table className="w-3.5 h-3.5" />
              </button>

              {/* Link */}
              <button
                type="button"
                onClick={() => applyFormat("link")}
                className="p-1.5 rounded-lg hover:bg-zinc-200 hover:text-black text-zinc-700 transition-colors"
                title="Insert Link [Title](URL)"
              >
                <LinkIcon className="w-3.5 h-3.5" />
              </button>

              <div className="w-[1px] h-4 bg-zinc-300 mx-1" />

              {/* Paragraph format dropdown */}
              <div className="relative inline-block">
                <button
                  type="button"
                  onClick={() => setIsParagraphOpen(!isParagraphOpen)}
                  className="px-2.5 py-1 rounded-lg hover:bg-zinc-200 text-xs font-semibold text-zinc-800 flex items-center gap-1.5 transition-colors"
                >
                  <span>{paragraphFormat}</span>
                  <ChevronDown className="w-3 h-3 text-zinc-500" />
                </button>

                {isParagraphOpen && (
                  <div className="absolute left-0 top-full mt-1 z-30 bg-white border border-zinc-200 rounded-xl shadow-lg p-1 w-36 space-y-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        applyFormat("h1");
                        setIsParagraphOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold hover:bg-zinc-100 text-black block"
                    >
                      Heading 1
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        applyFormat("h2");
                        setIsParagraphOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold hover:bg-zinc-100 text-black block"
                    >
                      Heading 2
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        applyFormat("paragraph");
                        setIsParagraphOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium hover:bg-zinc-100 text-zinc-800 block"
                    >
                      Paragraph
                    </button>
                  </div>
                )}
              </div>

              <div className="w-[1px] h-4 bg-zinc-300 mx-1" />

              {/* Code */}
              <button
                type="button"
                onClick={() => applyFormat("code")}
                className="p-1.5 rounded-lg hover:bg-zinc-200 hover:text-black text-zinc-700 transition-colors"
                title="Code Block"
              >
                <Code className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Description Textarea vs Live Preview */}
            {editorMode === "write" ? (
              <textarea
                ref={fullDescRef}
                rows={6}
                placeholder="Enter full description about the product... Select text and click B / I / U to format."
                value={fullDesc}
                onChange={(e) => setFullDesc(e.target.value)}
                className="w-full p-4 text-xs text-black placeholder:text-zinc-400 leading-relaxed focus:outline-none resize-y min-h-[150px] selection:bg-zinc-900 selection:text-white font-sans"
              />
            ) : (
              <div className="p-4 min-h-[150px] bg-zinc-50/50">
                {renderFormattedPreview(fullDesc)}
              </div>
            )}
          </div>

          {errors.fullDesc && (
            <p className="text-[10px] text-red-500 font-semibold">{errors.fullDesc}</p>
          )}
        </div>
      </div>
    </form>
  );
}
