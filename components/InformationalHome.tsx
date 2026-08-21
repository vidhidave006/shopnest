"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";
import { useShop } from "@/context/ShopContext";
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
} from "lucide-react";

export function InformationalHome() {
  const { products, formatPrice } = useShop();
  const [activeMaterialTab, setActiveMaterialTab] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const materials = [
    {
      id: "titanium",
      title: "Grade-5 Aerospace Titanium",
      subtitle: "Uncompromising strength-to-weight ratio",
      description:
        "Every enclosure begins as a solid billet of Grade-5 aerospace titanium, CNC-milled with 0.02mm tolerances and finished with micron-level ceramic bead blasting to achieve an indelible matte sheen.",
      specs: [
        { label: "Tensile Strength", value: "895 MPa" },
        { label: "Surface Finish", value: "Matte Ceramic Bead" },
        { label: "Corrosion Resistance", value: "Class 1 Marine" },
      ],
      tag: "Metallurgy",
    },
    {
      id: "obsidian",
      title: "Diamond-Cut Obsidian Glass",
      subtitle: "Chemically fortified touch surfaces",
      description:
        "Engineered with ion-exchange molecular reinforcement, our obsidian glass surfaces provide tactile silkiness with near-zero optical reflection and extreme scratch resistance for daily enduring use.",
      specs: [
        { label: "Hardness", value: "9H Mohs Scale" },
        { label: "Coating", value: "Oleophobic Vapor" },
        { label: "Transparency", value: "99.4% Optical" },
      ],
      tag: "Optics",
    },
    {
      id: "acoustics",
      title: "Bespoke Spatial Transducers",
      subtitle: "Studio-reference acoustic architecture",
      description:
        "Custom 40mm bio-cellulose diaphragms paired with neodymium N52 magnets deliver ultra-low harmonic distortion (<0.1% THD) and expansive soundstage positioning tuned to reference master standards.",
      specs: [
        { label: "Frequency Range", value: "10Hz – 40kHz" },
        { label: "Total Harmonic Distortion", value: "< 0.08%" },
        { label: "Codec Support", value: "Lossless LDAC / aptX" },
      ],
      tag: "Acoustics",
    },
    {
      id: "sustainability",
      title: "Zero-Plastic Packaging & Circular Craft",
      subtitle: "Designed for longevity and closed-loop recycling",
      description:
        "We eliminate single-use plastics across our entire supply chain. Our packaging uses 100% FSC-certified unbleached sugarcane fiber with soy-based monochrome inks and modular, repairable hardware fasteners.",
      specs: [
        { label: "Packaging Recyclability", value: "100% Compostable" },
        { label: "Modular Fasteners", value: "Standard Torx T5" },
        { label: "Carbon Offset", value: "100% Certified" },
      ],
      tag: "Eco-Design",
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: "Genesis & The Monochrome Manifesto",
      description:
        "Founded in Bengaluru with a singular mandate: strip away chromatic distraction to focus purely on tactile materiality, aerospace metallurgy, and functional purity.",
    },
    {
      year: "2024",
      title: "The Titanium Series Debut",
      description:
        "Launched our flagship Spatial Audio & Titanium Chronograph line, earning recognition in international minimalist industrial design exhibitions.",
    },
    {
      year: "2025",
      title: "Pan-India Concierge & Carbon Neutrality",
      description:
        "Expanded domestic priority logistics with Blue Dart Carbon-Neutral courier network and integrated zero-plastic sugarcane packaging across all collections.",
    },
    {
      year: "2026",
      title: "The Unified Minimalist Ecosystem",
      description:
        "Introducing cross-device synchronized audio, precision desktop accessories, and bespoke concierge warranty support for discerning minimalists worldwide.",
    },
  ];

  const faqs = [
    {
      question: "Why does ShopNest focus exclusively on monochrome design?",
      answer:
        "Color often acts as visual noise or fleeting trend decoration. By constraining our palette to pure blacks, titanium grays, and stark whites, we focus entirely on structural integrity, material texture, precision engineering, and enduring timelessness.",
    },
    {
      question: "Where are ShopNest products designed and manufactured?",
      answer:
        "Our industrial design and acoustic engineering teams operate out of Bengaluru, India. Enclosures are CNC-machined from certified aerospace-grade titanium and assembled under cleanroom conditions with strict multi-stage quality calibration.",
    },
    {
      question: "What is the ShopNest Concierge Warranty policy?",
      answer:
        "All hardware essentials include our 2-Year Comprehensive Concierge Warranty with doorstep pickup, genuine modular component servicing, and priority technical support.",
    },
    {
      question: "Can I explore and purchase items directly from the catalog?",
      answer:
        "Yes. You can explore our complete product catalog at any time via the All Products portal, configure your preferred specifications, and complete an order with instant checkout in Indian Rupees (₹).",
    },
  ];

  const spotlightProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-200 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* Navigation Header */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Editorial Section */}
        <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden">
          {/* Subtle Geometric Background Elements */}
          <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-dashed border-zinc-300 dark:border-zinc-700"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] rounded-full border border-zinc-200 dark:border-zinc-800"></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-300 mb-6">
              <Compass className="w-3.5 h-3.5" />
              <span>Design Manifesto & Brand Philosophy</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-black dark:text-white leading-[1.05] max-w-4xl">
              Precision In <span className="underline decoration-zinc-400 dark:decoration-zinc-600 underline-offset-8">Monochrome</span>. Luxury In Simplicity.
            </h1>

            {/* Subtext */}
            <p className="mt-6 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal leading-relaxed">
              ShopNest is an independent design laboratory exploring the convergence of aerospace metallurgy, acoustic fidelity, and radical minimalism. Built for those who find clarity in black and white.
            </p>

            {/* Action CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 font-bold uppercase text-xs font-mono tracking-wider transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>Explore The Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#manifesto"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 font-bold uppercase text-xs font-mono tracking-wider transition-colors"
              >
                <span>Read The Manifesto</span>
                <ChevronDown className="w-4 h-4" />
              </a>
            </div>

            {/* Metrics Bar */}
            <div className="mt-16 sm:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-zinc-200 dark:border-zinc-800">
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-black font-mono text-black dark:text-white tracking-tight">
                  0.02<span className="text-xs text-zinc-400 ml-0.5">mm</span>
                </span>
                <p className="text-[11px] font-mono uppercase text-zinc-500 font-semibold tracking-wider">
                  CNC Milled Tolerance
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-black font-mono text-black dark:text-white tracking-tight">
                  100<span className="text-xs text-zinc-400 ml-0.5">%</span>
                </span>
                <p className="text-[11px] font-mono uppercase text-zinc-500 font-semibold tracking-wider">
                  Grade-5 Recycled Ti
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-black font-mono text-black dark:text-white tracking-tight">
                  45<span className="text-xs text-zinc-400 ml-0.5">hrs</span>
                </span>
                <p className="text-[11px] font-mono uppercase text-zinc-500 font-semibold tracking-wider">
                  Acoustic Stamina
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-black font-mono text-black dark:text-white tracking-tight">
                  2<span className="text-xs text-zinc-400 ml-0.5">Years</span>
                </span>
                <p className="text-[11px] font-mono uppercase text-zinc-500 font-semibold tracking-wider">
                  Concierge Warranty
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: The Three Design Pillars */}
        <section id="manifesto" className="py-20 bg-zinc-50/70 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                CORE PHILOSOPHY
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-black dark:text-white tracking-tight mt-1">
                The Three Pillars of ShopNest
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                Every hardware piece we develop is strictly governed by three non-negotiable design principles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pillar 1 */}
              <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 hover:border-black dark:hover:border-white transition-all shadow-xs group">
                <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-black dark:text-white font-mono font-bold text-sm group-hover:scale-105 transition-transform">
                  01
                </div>
                <h3 className="text-lg font-bold uppercase text-black dark:text-white tracking-tight">
                  Radical Minimalism
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  We eliminate every non-essential seam, extraneous LED, and cosmetic badge. The object is reduced to its purest functional geometry, creating timeless objects that outlive trends.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 hover:border-black dark:hover:border-white transition-all shadow-xs group">
                <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-black dark:text-white font-mono font-bold text-sm group-hover:scale-105 transition-transform">
                  02
                </div>
                <h3 className="text-lg font-bold uppercase text-black dark:text-white tracking-tight">
                  Aerospace Metallurgy
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Engineered using Grade-5 titanium alloys, precision-machined sapphire crystals, and anodized aluminum frames. Unmatched structural rigidity and tactile temperature neutrality.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 hover:border-black dark:hover:border-white transition-all shadow-xs group">
                <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-black dark:text-white font-mono font-bold text-sm group-hover:scale-105 transition-transform">
                  03
                </div>
                <h3 className="text-lg font-bold uppercase text-black dark:text-white tracking-tight">
                  Acoustic & Sensory Fidelity
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Calibrated to studio reference response curves. Every tactile button provides calibrated micro-gram actuation feedback, ensuring an intuitive, highly tactile user experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Materials & Engineering Deep Dive */}
        <section className="py-20 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                  MATERIAL SCIENCE
                </span>
                <h2 className="text-3xl sm:text-4xl font-black uppercase text-black dark:text-white tracking-tight mt-1">
                  Craftsmanship & Architecture
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-xl">
                  Inspect the physical elements that constitute the ShopNest monochrome hardware universe.
                </p>
              </div>
            </div>

            {/* Material Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
              {materials.map((mat, idx) => (
                <button
                  key={mat.id}
                  onClick={() => setActiveMaterialTab(idx)}
                  className={`p-3.5 rounded-xl text-left border text-xs font-mono font-bold uppercase transition-all ${
                    activeMaterialTab === idx
                      ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-xs"
                      : "bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                  }`}
                >
                  <div className="text-[9px] opacity-70 mb-1">{mat.tag}</div>
                  <div className="truncate">{mat.title.split(" ")[0]}</div>
                </button>
              ))}
            </div>

            {/* Active Material Deep Dive Card */}
            <div className="p-8 sm:p-12 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[10px] font-mono font-bold uppercase tracking-wider">
                  <Cpu className="w-3 h-3" />
                  <span>{materials[activeMaterialTab].tag} Focus</span>
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
                    Zero compromises
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-1 max-w-xs">
                    Tested across temperature extremes (-20°C to 65°C) and calibrated for decades of continuous use.
                  </p>
                </div>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-black dark:text-white hover:underline pt-2"
                >
                  <span>View in Catalog</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Curated Catalog Highlights (Engineering focus) */}
        <section className="py-20 bg-zinc-50/70 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                  COLLECTION SPECIFICATIONS
                </span>
                <h2 className="text-3xl sm:text-4xl font-black uppercase text-black dark:text-white tracking-tight mt-1">
                  Engineered Essentials
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-xl">
                  Each hardware item in our catalog is built with precision engineering and high-grade materials.
                </p>
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-white hover:underline self-start sm:self-auto"
              >
                <span>View All ({products.length}) Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {spotlightProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col justify-between hover:border-black dark:hover:border-white transition-all shadow-xs"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold">
                        {prod.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-black dark:text-white">
                        {formatPrice(prod.price)}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-black dark:text-white uppercase tracking-tight">
                      {prod.name}
                    </h3>

                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                      {prod.features.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-[11px] text-zinc-600 dark:text-zinc-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-black dark:text-white shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800">
                    <Link
                      href={`/products/${prod.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-mono font-bold uppercase text-xs hover:opacity-90 transition-opacity shadow-2xs"
                    >
                      <span>Inspect Specs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Brand Evolution Timeline */}
        <section className="py-20 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                CHRONOLOGY
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-black dark:text-white tracking-tight mt-1">
                Evolution of ShopNest
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                From an experimental design concept in Bengaluru to a celebrated monochrome hardware ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 relative group hover:border-black dark:hover:border-white transition-all"
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
                  "ShopNest strips away every distraction until all that remains is pure, sublime tactile craftsmanship. A masterclass in restrained industrial design."
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black border border-zinc-800 space-y-3">
                <div className="text-xs font-mono font-bold uppercase text-zinc-400">
                  MONOCLE MAGAZINE
                </div>
                <p className="text-xs text-zinc-300 italic leading-relaxed">
                  "The tactile sensation of ShopNest titanium audio hardware rivals the finest horological manufacturing in Geneva. Exceptional attention to detail."
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
        <section className="py-20 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 transition-colors">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                KNOWLEDGE BASE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-black dark:text-white tracking-tight mt-1">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Everything you need to know about our design philosophy, materials, and ordering.
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
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs uppercase tracking-tight text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
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
                  Have a bespoke concierge query?
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Our Bengaluru design studio concierge team is available around the clock.
                </p>
              </div>
              <a
                href="mailto:concierge@shopnest.in"
                className="px-5 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-mono font-bold uppercase text-xs tracking-wider hover:opacity-90 transition-opacity shadow-xs"
              >
                Contact Concierge
              </a>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
