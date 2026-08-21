"use client";

import React, { useState } from "react";
import Image from "next/image";
<<<<<<< HEAD
import { useShop } from "@/context/ShopContext";
import { Star, CheckCircle2, ThumbsUp, Sparkles } from "lucide-react";
=======
import { REVIEWS } from "@/data/products";
import { Star, CheckCircle2, ThumbsUp, MessageSquare } from "lucide-react";
>>>>>>> 113c4554795eef8ca5397910adfb72efd4561b0a

export function CustomerReviews() {
  const { reviews } = useShop();
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});

  const handleHelpfulClick = (id: string, initialCount: number) => {
    setHelpfulVotes((prev) => {
      const current = prev[id] !== undefined ? prev[id] : initialCount;
      return { ...prev, [id]: current + 1 };
    });
  };

  const pressLogos = [
    { name: "WIRED", quote: "ShopNest represents the modern pinnacle of restrained industrial elegance." },
    { name: "VOGUE", quote: "Impeccable acoustic purity combined with sustainable architectural packaging." },
    { name: "GQ", quote: "The Studio Pro headphones are the finest acoustic design this decade." },
    { name: "TECHCRUNCH", quote: "A frictionless, state-of-the-art digital flagship experience." },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Press Badges Header */}
        <div className="mb-16 border-b border-zinc-200 dark:border-zinc-900 pb-12">
          <p className="text-center text-[10.5px] uppercase font-mono font-bold tracking-[0.24em] text-zinc-400 mb-8">
            • ACCLAIMED &amp; FEATURED IN GLOBAL ARCHITECTURAL PRESS •
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-center">
            {pressLogos.map((p, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-center items-center transition-all duration-300 shadow-xs"
              >
                <span className="text-base sm:text-lg font-black tracking-[0.16em] text-black dark:text-white">
                  {p.name}
                </span>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-2 italic leading-snug">
                  &ldquo;{p.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-[10.5px] font-mono font-bold uppercase tracking-[0.2em] mb-3 border border-zinc-200 dark:border-zinc-800">
              <MessageSquare className="w-3 h-3" /> Authentic Evidence
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-black dark:text-white tracking-tight uppercase">
              Patron Impressions
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xl">
              Reflections and acoustic evaluations from verified patrons worldwide.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl self-start md:self-auto font-mono shadow-sm">
            <div className="text-3xl font-black text-black dark:text-white">4.92</div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-black dark:text-white">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-black dark:fill-white" />
                ))}
              </div>
              <span className="text-[10px] text-zinc-400 font-normal mt-0.5 tracking-wider">
                3,840+ VERIFIED RATINGS
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
<<<<<<< HEAD
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((rev) => {
=======
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((rev) => {
>>>>>>> 113c4554795eef8ca5397910adfb72efd4561b0a
            const count =
              helpfulVotes[rev.id] !== undefined
                ? helpfulVotes[rev.id]
                : rev.helpfulCount;

            return (
              <div
                key={rev.id}
                className="bg-zinc-50 dark:bg-zinc-950 rounded-3xl p-5 border border-zinc-200/90 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-lg"
              >
                <div className="space-y-3">
                  {/* Rating Stars & Date */}
                  <div className="flex items-center justify-between font-mono">
                    <div className="flex items-center gap-0.5 text-black dark:text-white">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-black dark:fill-white"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono">{rev.date}</span>
                  </div>

                  {/* Title & Comment */}
                  <h4 className="font-bold text-black dark:text-white text-xs leading-snug tracking-tight">
                    {rev.title}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                {/* Reviewer & Product Info */}
                <div className="pt-3.5 mt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                  {/* Product Mini Tag */}
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800">
                    <div className="relative w-7 h-7 rounded-lg overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-900">
                      <Image
                        src={rev.productImage}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="28px"
                      />
                    </div>
                    <span className="text-[10.5px] font-mono text-zinc-500 dark:text-zinc-400 truncate">
                      {rev.productName}
                    </span>
                  </div>

                  {/* Author Avatar & Helpful button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-zinc-700">
                        <Image
                          src={rev.avatar}
                          alt={rev.author}
                          fill
                          className="object-cover"
                          sizes="28px"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-black dark:text-white leading-none">
                          {rev.author}
                        </span>
                        <span className="text-[9px] text-zinc-400 font-mono flex items-center gap-1 mt-0.5 font-bold">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Verified Patron
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleHelpfulClick(rev.id, rev.helpfulCount)}
                      className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 hover:text-black dark:hover:text-white px-2 py-1 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                      title="Mark as helpful"
                    >
                      <ThumbsUp className="w-2.5 h-2.5" />
                      <span>{count}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
