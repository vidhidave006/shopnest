"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";
import { useShop } from "@/context/ShopContext";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import {
  Compass,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Globe,
  Award,
  Clock,
  Feather,
  Zap,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Star,
  Shirt,
  Headphones,
  Sparkle,
  Tv,
  Gamepad2,
  Armchair,
  SlidersHorizontal,
  Info,
  Package,
  Truck,
  RotateCcw,
  CreditCard,
  Check,
} from "lucide-react";

export function InformationalHome() {
  const { products, formatPrice } = useShop();
  const [activeMaterialTab, setActiveMaterialTab] = useState<number>(0);
  const [selectedSpecCategory, setSelectedSpecCategory] = useState<string>("All");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>("Electronic");

  const storeProducts = products && products.length > 0 ? products : PRODUCTS;

  // Filter products for the informational dossier showcase
  const dossierProducts = useMemo(() => {
    if (selectedSpecCategory === "All") {
      return storeProducts;
    }
    return storeProducts.filter(
      (p) => p.category.toLowerCase() === selectedSpecCategory.toLowerCase()
    );
  }, [storeProducts, selectedSpecCategory]);

  const categoryDetails: Record<
    string,
    {
      title: string;
      tagline: string;
      description: string;
      icon: any;
      designStandard: string;
      materialsUsed: string[];
      certifications: string[];
      featuredProducts: string[];
      itemCount: number;
    }
  > = {
    Electronic: {
      title: "Spatial Acoustics, Wearables & Haptic Peripherals",
      tagline: "Ultra-low harmonic distortion (<0.08% THD) and aerospace titanium housings",
      description:
        "ShopNest's Electronic vertical features audiophile-grade ANC wireless headphones, sapphire-crystal GPS titanium smartwatches, and CNC-machined gasket-mounted mechanical keyboards. Every circuit board is calibrated for minimal acoustic resonance and rapid wireless pairing.",
      icon: Headphones,
      designStandard: "0.02mm CNC Tolerance • Studio Master Frequency Range 10Hz–40kHz • 2000 Nits AMOLED",
      materialsUsed: ["Grade-5 Aerospace Titanium", "Bio-Cellulose Acoustic Diaphragms", "Anodized 6063 Aluminum", "Sapphire Crystal Glass"],
      certifications: ["Hi-Res Audio Certified", "CE / RoHS / FCC Compliant", "MIL-STD-810H Military Standard"],
      featuredProducts: ["Aura Studio Pro Wireless ANC Headphones", "Lumina Apex Smartwatch Ultra", "Keychron Aerofit Custom Keyboard"],
      itemCount: 56,
    },
    Fashion: {
      title: "Technical Weatherproof Apparel & Tuscan Leather Goods",
      tagline: "20,000mm waterproof ratings, nitrogen-infused carbon runners, and full-grain Tuscan leather",
      description:
        "Engineered for urban mobility and all-weather resilience. Includes supercritical nitrogen-cushioned running sneakers, French flax organic raw linen shirts, and vegetable-tanned Italian leather weekender luggage that develops a rich natural patina over years of use.",
      icon: Shirt,
      designStandard: "20,000mm Hydrostatic Waterproof Rating • Carbon Fiber SpeedPlates • 100% French Flax",
      materialsUsed: ["Triple-Layer Taped Waterproof TechFabric", "Vegetable-Tanned Italian Cowhide", "French Normandy Flax Linen", "Supercritical Nitrogen Foam"],
      certifications: ["OEKO-TEX Standard 100", "Bluesign Certified Fabric", "Zero Fluorocarbon DWR Coating"],
      featuredProducts: ["CloudStride Neo Pulse Running Sneakers", "Heritage Full-Grain Leather Weekender Bag", "Atelier Organic Raw Linen Shirt"],
      itemCount: 48,
    },
    Beauty: {
      title: "Bio-Active Botanical Skincare & Ceramic Aromatics",
      tagline: "Stabilized 15% THD Ascorbate vitamin C elixirs and 2.4MHz ultrasonic porcelain diffusers",
      description:
        "Clean, undiluted self-care formulations developed without synthetic fragrances, parabens, or mineral oils. Packaged in biophotonic ultraviolet glass to preserve bioactive antioxidants, accompanied by whisper-quiet handmade ceramic aroma diffusers.",
      icon: Sparkle,
      designStandard: "15% Stabilized THD Ascorbate • 2.4MHz Ultrasonic Cold-Atomization • <19dB Acoustic Level",
      materialsUsed: ["Pure Squalane & Micro-Hyaluronic Acid", "Matte Hand-Turned Porcelain Ceramic", "Photonic Biophotonic Glass"],
      certifications: ["100% Cruelty-Free & Vegan", "ECOCERT Organic Certified", "Dermatologically Safety Tested"],
      featuredProducts: ["Botanica Bio-Active Vitamin C Hydrating Elixir", "Aetheria Ultrasonic Ceramic Aroma Diffuser"],
      itemCount: 34,
    },
    "Home Appliances": {
      title: "Artisan Dual-Boiler Espresso & Medical-Grade Air Purification",
      tagline: "PID ±0.5°C thermal precision, 15-Bar Italian ULKA pumps, and True H13 HEPA 0.1-micron capture",
      description:
        "Elevating everyday domestic rituals through commercial culinary engineering. Featuring rapid-heat dual thermoblock espresso machines with 360-degree commercial steam wands and whisper-quiet laser-guided air purification systems.",
      icon: Tv,
      designStandard: "PID Digital Temperature Stability • 99.97% Particulate Capture at 0.1 Micron • 320 m³/h CADR",
      materialsUsed: ["Food-Grade 304 Austenitic Stainless Steel", "True HEPA H13 Multi-Stage Core", "Solid Brass Commercial Boilers"],
      certifications: ["Energy Star Level 6", "CARB Air Quality Approved", "FDA & LFGB Food Contact Safe"],
      featuredProducts: ["Barista Master Precision Espresso Machine", "AeroPure HEPA Silent Smart Air Purifier"],
      itemCount: 29,
    },
    "Kids & Toys": {
      title: "Montessori Solid Wood Architecture & Modular STEM Robotics",
      tagline: "FSC-certified European beechwood building blocks and graphical AI drag-and-drop robot kits",
      description:
        "Stimulates spatial intuition, fine motor coordination, and algorithmic logic in developing minds. Hand-crafted from sustainable solid beechwood finished with organic saliva-resistant beeswax, alongside modular 14-sensor AI robotics sets.",
      icon: Gamepad2,
      designStandard: "Smooth Chamfered Safe Edges • Bluetooth 5.0 Sensor Telemetry • Scratch & Python Support",
      materialsUsed: ["FSC-Certified Solid European Beechwood", "Natural Organic Beeswax & Mineral Dyes", "BPA-Free Recycled Polycarbonate"],
      certifications: ["EN71 European Toy Safety Standard", "ASTM F963 Certified", "100% Non-Toxic Child Safe"],
      featuredProducts: ["RoboCraft AI Programmable Robot Kit", "Nordic Montessori Solid Beech Wooden Castle Set"],
      itemCount: 22,
    },
    Furniture: {
      title: "Solid European Oak Desks & Ergonomic Workspace Seating",
      tagline: "Traditional mortise-and-tenon interlocking joinery and BIFMA-certified load distribution",
      description:
        "Designed to anchor creative sanctuaries and productive workspaces. Built from sustainably harvested European white oak with organic matte hardwax oil finishes, paired with breathable high-resilience task seating engineered for 12+ hour posture support.",
      icon: Armchair,
      designStandard: "Interlocking Mortise & Tenon Joinery • 150kg BIFMA Structural Test Certified • Zero VOC",
      materialsUsed: ["Sustainable Solid European White Oak", "High-Tensile Powdercoated Carbon Steel", "Recycled High-Resilience Wool Mesh"],
      certifications: ["FSC 100% Chain-of-Custody Certified", "BIFMA X5.1 Durability Standard", "Zero VOC Natural Hardwax"],
      featuredProducts: ["Solid Oak Architectural Floating Desk", "Minimalist Ergonomic Task Chair"],
      itemCount: 38,
    },
  };

  const materials = [
    {
      id: "titanium",
      title: "Grade-5 Aerospace Titanium (Ti-6Al-4V)",
      usedIn: "ShopNest Electronics (Aura Headphones, Lumina Watch, Eyewear)",
      subtitle: "Uncompromising strength-to-weight ratio with instant thermal neutrality",
      description:
        "Every metallic enclosure in ShopNest electronics starts as a solid aerospace titanium billet, CNC-milled to 0.02mm tolerances and micro-bead blasted to create a scratch-resistant, velvety matte surface that adapts immediately to skin temperature.",
      specs: [
        { label: "Tensile Strength", value: "895 MPa" },
        { label: "Surface Finish", value: "Ceramic Micro-Bead" },
        { label: "Corrosion Class", value: "Class 1 Marine ASTM" },
      ],
      tag: "Metallurgy",
    },
    {
      id: "oak",
      title: "Solid European Oak & FSC Beechwood",
      usedIn: "ShopNest Furniture (Desks, Seating) & Kids Montessori Toys",
      subtitle: "Zero-VOC hardwax oil finish with traditional precision joinery",
      description:
        "Harvested exclusively from regenerative European forests. Kiln-dried slowly to eliminate internal tension before being precision-shaped using traditional interlocking mortise-and-tenon joinery for generational durability.",
      specs: [
        { label: "Moisture Content", value: "8% Controlled" },
        { label: "Coating", value: "Natural Organic Hardwax" },
        { label: "Certification", value: "FSC 100% Chain-of-Custody" },
      ],
      tag: "Sustainable Wood",
    },
    {
      id: "textiles",
      title: "Triple-Layer Waterproof TechFabric & Tuscan Leather",
      usedIn: "ShopNest Fashion (Outerwear, Weekender Bags, Runners)",
      subtitle: "20,000mm waterproof column with microporous breathability",
      description:
        "A composite three-layer textile system that bonds a dense recycled nylon face to a microporous membrane and an ultra-soft inner lining. Completely blocks rain while allowing perspiration vapor to vent freely.",
      specs: [
        { label: "Waterproof Column", value: "20,000mm H2O" },
        { label: "Breathability", value: "18,000 g/m²/24h" },
        { label: "Seam Construction", value: "Ultrasonic Laser Welded" },
      ],
      tag: "Technical Textiles",
    },
    {
      id: "botanicals",
      title: "Bio-Active Cold-Pressed Botanical Concentrates",
      usedIn: "ShopNest Beauty (Botanica Vitamin C Serum, Aromatic Oils)",
      subtitle: "Undiluted supercritical CO2 botanical extraction",
      description:
        "Formulated without water fillers or synthetic emulsifiers. Each active batch is pressed at sub-40°C to preserve bioactive antioxidants, essential fatty acids, and delicate aromatic terpenes.",
      specs: [
        { label: "Purity Index", value: "100% Active Concentrate" },
        { label: "Preservation", value: "Biophotonic Miron Glass" },
        { label: "Skin Absorption", value: "Sub-Cellular Lipid Soluble" },
      ],
      tag: "Clean Bio-Actives",
    },
    {
      id: "steel",
      title: "Food-Grade 304 Stainless Steel & Solid Brass Boilers",
      usedIn: "ShopNest Home Appliances (Barista Master Espresso, AeroPure)",
      subtitle: "Heavyweight thermal mass and zero-leach hygiene",
      description:
        "Utilized in our culinary and air appliances to guarantee non-reactive food safety and maximum thermal inertia. Brushed with a non-directional grain that resists fingerprint oils and calcification.",
      specs: [
        { label: "Alloy Composition", value: "18% Cr / 8% Ni Austenitic" },
        { label: "Pressure Rating", value: "Up to 16 Bar Peak" },
        { label: "Food Safety", value: "FDA / LFGB Certified" },
      ],
      tag: "Culinary Metallurgy",
    },
  ];

  const storeGuarantees = [
    {
      icon: Truck,
      title: "Complimentary Air Courier",
      description: "Fast expedited dispatch across India via Blue Dart priority air cargo network.",
    },
    {
      icon: ShieldCheck,
      title: "2-Year Concierge Warranty",
      description: "Direct repair, genuine modular component replacement, and doorstep pickup.",
    },
    {
      icon: RotateCcw,
      title: "30-Day Sanctuary Trial",
      description: "Experience the acoustic clarity, comfort, and materials in your private space.",
    },
    {
      icon: Package,
      title: "100% Plastic-Free Packaging",
      description: "Crafted from compostable sugarcane fiber and soy-based monochrome inks.",
    },
  ];

  const storeWorkflowSteps = [
    {
      step: "01",
      title: "Curated Catalog Exploration",
      description: "Browse strictly vetted hardware across 6 categories with transparent specs and verified reviews.",
    },
    {
      step: "02",
      title: "Finish & Specification Selection",
      description: "Select custom colorways, sizes, and hardware configurations tailored to your space.",
    },
    {
      step: "03",
      title: "Frictionless Secure Checkout",
      description: "256-bit encrypted transactions supporting instant UPI, RuPay, Visa, MC, and NetBanking in INR (₹).",
    },
    {
      step: "04",
      title: "White-Glove Delivery & Warranty Care",
      description: "Carbon-neutral doorstep delivery backed by our 2-Year dedicated concierge guarantee.",
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: "Genesis of ShopNest Atelier",
      description:
        "Founded in Bengaluru with a singular mandate: eliminate visual distraction and build an uncompromising e-commerce ecosystem spanning spatial audio, technical apparel, and living design.",
    },
    {
      year: "2024",
      title: "The Titanium Series & Category Expansion",
      description:
        "Launched the flagship Studio ANC headphones and Titanium Chronograph, rapidly expanding to organic skincare and architectural solid oak workspace furniture.",
    },
    {
      year: "2025",
      title: "Pan-India Logistics & Zero-Plastic Packaging",
      description:
        "Introduced 100% unbleached sugarcane fiber packaging with soy-based monochrome inks and partnered with Blue Dart Carbon-Neutral priority air transit.",
    },
    {
      year: "2026",
      title: "The Unified 6-Discipline Ecosystem",
      description:
        "Consolidating 6 distinct disciplines (Electronic, Fashion, Beauty, Home Appliances, Kids & Toys, Furniture) under one harmonious architectural design language.",
    },
  ];

  const faqs = [
    {
      question: "Why does Cherry focus exclusively on monochrome design?",
      answer:
        "Cherry is a curated design atelier rather than an open marketplace. Every single item across our 6 categories (Electronics, Fashion, Beauty, Home Appliances, Kids & Toys, Furniture) is directly verified for structural purity, certified materials, zero-plastic packaging, and enduring performance.",
    },
    {
      question: "Where are Cherry products designed and manufactured?",
      answer:
        "Each product card in our catalog includes a technical specification summary table. You can click on 'Read Technical Dossier' or view any product's page to inspect dimensions, weight, battery capacity, material grades, and certified standards.",
    },
    {
      question: "What is the Cherry Concierge Warranty policy?",
      answer:
        "All hardware essentials (Electronics, Home Appliances, and Furniture) include our 2-Year Direct Concierge Warranty with doorstep pickup across India, genuine modular component servicing, and priority technical support.",
    },
    {
      question: "Which payment methods and currencies are supported for orders?",
      answer:
        "ShopNest supports instant settlement in Indian Rupees (₹) via UPI (Google Pay, PhonePe, Paytm), RuPay, Visa, MasterCard, and NetBanking with 256-bit SSL banking encryption.",
    },
    {
      question: "How are products packaged and shipped across India?",
      answer:
        "All orders are dispatched in 100% compostable sugarcane molded fiber packaging with organic cotton sleeves. Shipments are handled via Blue Dart priority carbon-neutral air courier with real-time milestone tracking.",
    },
    {
      question: "How do I transition to placing an order from the Informational view?",
      answer:
        "You can explore the full active catalog at any time via the Products Catalog portal or by clicking 'Read Technical Dossier' on any item to configure finishes, sizes, and complete your acquisition.",
    },
  ];

  const currentCategoryInfo = categoryDetails[activeCategoryTab] || categoryDetails.Electronic;
  const CategoryIcon = currentCategoryInfo.icon;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-200 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* Navigation Header */}
      <Navbar mode="informational" />

      <main className="flex-1">
        {/* Hero Editorial Section */}
        <section id="manifesto" className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden">
          {/* Subtle Geometric Background Elements */}
          <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-dashed border-zinc-300 dark:border-zinc-700"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] rounded-full border border-zinc-200 dark:border-zinc-800"></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-300 mb-6">
              <Compass className="w-3.5 h-3.5" />
              <span>ShopNest Atelier // Curated E-Commerce Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-black dark:text-white leading-[1.05] max-w-4xl">
              Precision In <span className="underline decoration-zinc-400 dark:decoration-zinc-600 underline-offset-8">Monochrome</span>. The ShopNest Ecosystem.
            </h1>

            {/* Subtext */}
            <p className="mt-6 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal leading-relaxed">
              Cherry is an independent design laboratory exploring the convergence of aerospace metallurgy, acoustic fidelity, and radical minimalism. Built for those who find clarity in black and white.
            </p>

            {/* Fast Anchor Navigation */}
            <div className="mt-10 flex flex-wrap items-center gap-3 font-mono text-xs font-bold uppercase">
              <a
                href="#pillars"
                className="px-4 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm"
              >
                <span>6 Store Disciplines</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </a>

              <a
                href="#spec-archive"
                className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white hover:border-black dark:hover:border-white transition-colors flex items-center gap-1.5"
              >
                <span>Product Exhibits ({storeProducts.length})</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </a>

              <a
                href="#workflow"
                className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white hover:border-black dark:hover:border-white transition-colors flex items-center gap-1.5"
              >
                <span>Store Experience</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </a>

              <a
                href="#materials"
                className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white hover:border-black dark:hover:border-white transition-colors flex items-center gap-1.5"
              >
                <span>Material Science</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </a>

              <a
                href="#faq"
                className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white hover:border-black dark:hover:border-white transition-colors flex items-center gap-1.5"
              >
                <span>FAQ</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Metrics Bar */}
            <div className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-zinc-200 dark:border-zinc-800">
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-black font-mono text-black dark:text-white tracking-tight">
                  6<span className="text-xs text-zinc-400 ml-1">Disciplines</span>
                </span>
                <p className="text-[11px] font-mono uppercase text-zinc-500 font-semibold tracking-wider">
                  Harmonized Catalog
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-black font-mono text-black dark:text-white tracking-tight">
                  {storeProducts.length}<span className="text-xs text-zinc-400 ml-1">Objects</span>
                </span>
                <p className="text-[11px] font-mono uppercase text-zinc-500 font-semibold tracking-wider">
                  Active Verified Items
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-black font-mono text-black dark:text-white tracking-tight">
                  100<span className="text-xs text-zinc-400 ml-1">%</span>
                </span>
                <p className="text-[11px] font-mono uppercase text-zinc-500 font-semibold tracking-wider">
                  Zero-Plastic Packaging
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-black font-mono text-black dark:text-white tracking-tight">
                  2<span className="text-xs text-zinc-400 ml-1">Years</span>
                </span>
                <p className="text-[11px] font-mono uppercase text-zinc-500 font-semibold tracking-wider">
                  Concierge Guarantee
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: The 6 Disciplines of Cherry (Interactive Taxonomy) */}
        <section id="pillars" className="py-20 bg-zinc-50/70 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                CURATORIAL TAXONOMY
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-black dark:text-white tracking-tight mt-1">
                The 6 Cherry Categories
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                Click across our 6 core store categories to inspect their engineering specifications, material makeup, and curation standards.
              </p>
            </div>

            {/* Category Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
              {Object.keys(categoryDetails).map((catName) => {
                const isSelected = activeCategoryTab === catName;
                const info = categoryDetails[catName];
                const Icon = info.icon;
                return (
                  <button
                    key={catName}
                    onClick={() => setActiveCategoryTab(catName)}
                    className={`p-3.5 rounded-2xl flex flex-col items-center text-center gap-2 border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-md scale-[1.02]"
                        : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">{catName}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Category Feature Card */}
            <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-xs shrink-0">
                    <CategoryIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-bold block">
                      ShopNest Category // {activeCategoryTab} ({currentCategoryInfo.itemCount} Items Registered)
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black uppercase text-black dark:text-white tracking-tight mt-0.5">
                      {currentCategoryInfo.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold">
                    ShopNest Certified
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    {currentCategoryInfo.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {currentCategoryInfo.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                      Core Engineering Metric &amp; Tolerance
                    </span>
                    <p className="text-xs font-mono font-bold text-black dark:text-white">
                      {currentCategoryInfo.designStandard}
                    </p>
                  </div>

                  {/* Featured Catalog Items in this category */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block mb-2">
                      Key Items in ShopNest {activeCategoryTab} Collection:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentCategoryInfo.featuredProducts.map((pName, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono font-semibold text-black dark:text-white"
                        >
                          {pName}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4 font-mono text-xs">
                  {/* Materials list */}
                  <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                    <span className="text-[10px] uppercase text-zinc-400 font-bold flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" /> Primary Material Compositions
                    </span>
                    <ul className="space-y-1.5 pt-1">
                      {currentCategoryInfo.materialsUsed.map((m, i) => (
                        <li key={i} className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white shrink-0" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Certifications list */}
                  <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                    <span className="text-[10px] uppercase text-zinc-400 font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified Certifications &amp; Standards
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {currentCategoryInfo.certifications.map((c, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] text-black dark:text-white font-bold"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Product Spec Dossiers Showcase (Informational Catalog) */}
        <section id="spec-archive" className="py-20 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-[10.5px] font-mono font-bold uppercase tracking-[0.2em] mb-3 border border-zinc-200 dark:border-zinc-800">
                  <Info className="w-3 h-3" /> ShopNest Catalog Exhibits
                </div>
                <h2 className="text-3xl sm:text-4xl font-black uppercase text-black dark:text-white tracking-tight">
                  Product Engineering Exhibits
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xl">
                  Inspect the technical breakdowns, specifications, materials, and verified ratings for products available on ShopNest.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar font-mono text-xs">
                {["All", "Electronic", "Fashion", "Beauty", "Home Appliances", "Kids & Toys", "Furniture"].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedSpecCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl border font-bold uppercase whitespace-nowrap transition-all cursor-pointer ${
                        selectedSpecCategory === cat
                          ? "bg-black text-white dark:bg-white dark:text-black border-transparent shadow-xs"
                          : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400"
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Informational Product Dossiers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
              {dossierProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-600 transition-all shadow-xs group"
                >
                  {/* Image & Header */}
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-200 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                      <Image
                        src={prod.images[0]}
                        alt={prod.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-black/85 backdrop-blur-md text-white border border-zinc-700 font-mono text-[9.5px] font-bold uppercase tracking-wider">
                        {prod.category}
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-white/90 dark:bg-black/90 backdrop-blur-md text-black dark:text-white font-mono text-[10px] font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current text-black dark:text-white" />
                        <span>{prod.rating} ({prod.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                            {prod.brand} // {prod.id.toUpperCase()}
                          </span>
                          <h3 className="text-base font-bold text-black dark:text-white uppercase tracking-tight mt-0.5 leading-snug">
                            {prod.name}
                          </h3>
                        </div>
                        <span className="text-xs font-mono font-black text-black dark:text-white shrink-0">
                          {formatPrice(prod.price)}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        {prod.description}
                      </p>

                      {/* Technical Specs Table */}
                      <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-mono text-[10.5px] space-y-1.5">
                        <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block pb-1 border-b border-zinc-100 dark:border-zinc-800">
                          Technical Specifications
                        </span>
                        {Object.entries(prod.specs || {})
                          .slice(0, 3)
                          .map(([k, v], idx) => (
                            <div key={idx} className="flex justify-between items-center text-zinc-600 dark:text-zinc-400">
                              <span className="truncate max-w-[130px]">{k}:</span>
                              <strong className="text-black dark:text-white font-normal truncate max-w-[140px]">
                                {v}
                              </strong>
                            </div>
                          ))}
                      </div>

                      {/* Key Engineering Highlights */}
                      <div className="space-y-1 pt-1">
                        {prod.features.slice(0, 2).map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-[11px] text-zinc-600 dark:text-zinc-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-black dark:text-white shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Link to Full Dossier */}
                  <div className="p-5 pt-0">
                    <Link
                      href={`/products/${prod.id}`}
                      className="w-full py-3 rounded-2xl bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black text-xs font-mono font-bold uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <span>Read Technical Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: The ShopNest Store Experience & Workflow */}
        <section id="workflow" className="py-20 bg-zinc-50/70 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                STORE ARCHITECTURE &amp; WORKFLOW
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-black dark:text-white tracking-tight mt-1">
                How ShopNest Operates
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                From curated sourcing and finish selection to 256-bit encrypted settlement and concierge warranty care.
              </p>
            </div>

            {/* 4 Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {storeWorkflowSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-xs"
                >
                  <div className="w-10 h-10 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-mono font-black text-xs flex items-center justify-center">
                    {step.step}
                  </div>
                  <h3 className="text-sm font-bold uppercase text-black dark:text-white tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Store Guarantees Bar */}
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 border-t border-zinc-200 dark:border-zinc-800">
              {storeGuarantees.map((g, idx) => {
                const Icon = g.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5"
                  >
                    <div className="flex items-center gap-2 text-black dark:text-white">
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider">{g.title}</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {g.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 4: Material Science & Sustainable Metallurgy */}
        <section id="materials" className="py-20 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                  METALLURGY &amp; RAW MATERIALS
                </span>
                <h2 className="text-3xl sm:text-4xl font-black uppercase text-black dark:text-white tracking-tight mt-1">
                  Material Science &amp; Purity
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-xl">
                  Inspect the physical elements that constitute the Cherry monochrome hardware universe.
                </p>
              </div>
            </div>

            {/* Material Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-8 font-mono">
              {materials.map((mat, idx) => (
                <button
                  key={mat.id}
                  onClick={() => setActiveMaterialTab(idx)}
                  className={`p-3.5 rounded-2xl text-left border text-xs font-bold uppercase transition-all cursor-pointer ${
                    activeMaterialTab === idx
                      ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-xs"
                      : "bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400"
                  }`}
                >
                  <div className="text-[9px] opacity-70 mb-1">{mat.tag}</div>
                  <div className="truncate">{mat.title.split(" ")[0]}</div>
                </button>
              ))}
            </div>

            {/* Active Material Deep Dive Card */}
            <div className="p-8 sm:p-12 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-lg">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[10px] font-mono font-bold uppercase tracking-wider border border-zinc-300 dark:border-zinc-700">
                  <Cpu className="w-3 h-3" />
                  <span>{materials[activeMaterialTab].usedIn}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black uppercase text-black dark:text-white tracking-tight">
                  {materials[activeMaterialTab].title}
                </h3>

                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  {materials[activeMaterialTab].subtitle}
                </p>

                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {materials[activeMaterialTab].description}
                </p>

                {/* Specs List */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  {materials[activeMaterialTab].specs.map((spec, i) => (
                    <div key={i} className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
                        {spec.label}
                      </span>
                      <p className="text-xs font-mono font-bold text-black dark:text-white">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Graphic Spec Panel */}
              <div className="lg:col-span-5 flex flex-col justify-center items-center p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-md">
                  <Layers className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase text-black dark:text-white font-mono">
                    Zero Compromise Standards
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-1 max-w-xs">
                    Tested across climate extremes and calibrated for decades of daily operational performance.
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-2 text-xs font-mono font-bold uppercase text-black dark:text-white">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Quality Audited</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Brand Evolution Timeline */}
        <section id="timeline" className="py-20 bg-zinc-50/70 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                CHRONOLOGY &amp; GROWTH
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-black dark:text-white tracking-tight mt-1">
                Evolution of Cherry
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                From an experimental acoustic laboratory in Bengaluru to a celebrated 6-discipline monochrome hardware ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 relative group hover:border-black dark:hover:border-white transition-all shadow-xs"
                >
                  <div className="text-2xl font-black font-mono text-black dark:text-white tracking-tight">
                    {m.year}
                  </div>
                  <h3 className="text-xs font-bold uppercase text-zinc-800 dark:text-zinc-200 tracking-tight">
                    {m.title}
                  </h3>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Press & Acclaim */}
        <section className="py-16 bg-zinc-900 text-white border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                CRITICAL RECOGNITION
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-1">
                In The Words of Curators & Press
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-black border border-zinc-800 space-y-3">
                <div className="text-xs font-mono font-bold uppercase text-zinc-400">
                  MINIMALISSIMO
                </div>
                <p className="text-xs text-zinc-300 italic leading-relaxed">
                  "Cherry strips away every distraction until all that remains is pure, sublime tactile craftsmanship. A masterclass in restrained industrial design."
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black border border-zinc-800 space-y-3">
                <div className="text-xs font-mono font-bold uppercase text-zinc-400">
                  MONOCLE MAGAZINE
                </div>
                <p className="text-xs text-zinc-300 italic leading-relaxed">
                  "The tactile sensation of Cherry titanium audio hardware rivals the finest horological manufacturing in Geneva. Exceptional attention to detail."
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black border border-zinc-800 space-y-3">
                <div className="text-xs font-mono font-bold uppercase text-zinc-400">
                  DESIGN CURATION AWARDS
                </div>
                <p className="text-xs text-zinc-300 italic leading-relaxed">
                  "Selected for excellence in sustainable, single-material engineering and zero-plastic packaging architecture for 2026."
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Section 6: Interactive FAQ */}
        <section id="faq" className="py-20 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 transition-colors">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                KNOWLEDGE BASE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-black dark:text-white tracking-tight mt-1">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Everything you need to know about our products, curation standards, and ordering on ShopNest.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs uppercase tracking-tight text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-black dark:text-white" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed animate-in fade-in duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Help Banner */}
            <div className="mt-12 p-8 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h4 className="text-sm font-bold uppercase text-black dark:text-white tracking-tight">
                  Have a bespoke query about a product?
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Our Bengaluru design concierge team is available around the clock.
                </p>
              </div>
              <a
                href="mailto:concierge@cherry.in"
                className="px-5 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-mono font-bold uppercase text-xs tracking-wider hover:opacity-90 transition-opacity shadow-xs"
              >
                Contact Concierge
              </a>
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
