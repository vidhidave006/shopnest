"use client";

import React, { useState } from "react";
import Image from "next/image";
import { REVIEWS } from "@/data/products";
import { Star, CheckCircle2, ThumbsUp, Sparkles } from "lucide-react";

export function CustomerReviews() {
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});

  const handleHelpfulClick = (id: string, initialCount: number) => {
    setHelpfulVotes((prev) => {
      const current = prev[id] !== undefined ? prev[id] : initialCount;
      return { ...prev, [id]: current + 1 };
    });
  };

  const pressLogos = [
    { name: "WIRED", quote: "ShopNest represents the new pinnacle of curated design." },
    { name: "VOGUE", quote: "Impeccable aesthetics and thoughtful sustainable packaging." },
    { name: "GQ", quote: "The Studio Pro headphones are the finest acoustic design this year." },
    { name: "TECHCRUNCH", quote: "A frictionless, state-of-the-art digital storefront." },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Press Badges Header */}
        <div className="mb-14 border-b border-zinc-200 dark:border-zinc-800 pb-10">
          <p className="text-center text-[10px] uppercase font-mono font-bold tracking-widest text-zinc-400 mb-6">
            RECOGNIZED & FEATURED IN GLOBAL PRESS
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {pressLogos.map((p, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-center items-center"
              >
                <span className="text-lg sm:text-xl font-black tracking-widest text-black dark:text-white font-mono">
                  {p.name}
                </span>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 italic line-clamp-2">
                  &ldquo;{p.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[10px] font-mono font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-3 h-3" /> Authentic Proof
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-black dark:text-white tracking-tight uppercase">
              Client Testimonials
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Read real feedback from verified purchasers worldwide.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl self-start md:self-auto font-mono">
            <div className="text-2xl sm:text-3xl font-black text-black dark:text-white">4.92</div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-black dark:text-white">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-[10px] text-zinc-400 font-normal mt-0.5">
                3,840+ verified ratings
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {REVIEWS.map((rev) => {
            const count =
              helpfulVotes[rev.id] !== undefined
                ? helpfulVotes[rev.id]
                : rev.helpfulCount;

            return (
              <div
                key={rev.id}
                className="bg-zinc-50 dark:bg-zinc-900/90 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between hover:border-black dark:hover:border-zinc-600 transition-all duration-300"
              >
                <div className="space-y-2.5">
                  {/* Rating Stars & Date */}
                  <div className="flex items-center justify-between font-mono">
                    <div className="flex items-center gap-0.5 text-black dark:text-white">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-current"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-zinc-400">{rev.date}</span>
                  </div>

                  {/* Title & Comment */}
                  <h4 className="font-bold text-black dark:text-white text-xs leading-snug">
                    {rev.title}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                {/* Reviewer & Product Info */}
                <div className="pt-3 mt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-2.5">
                  {/* Product Mini Tag */}
                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800">
                    <div className="relative w-6 h-6 rounded overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-900">
                      <Image
                        src={rev.productImage}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="24px"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400 truncate">
                      {rev.productName}
                    </span>
                  </div>

                  {/* Author Avatar & Helpful button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700">
                        <Image
                          src={rev.avatar}
                          alt={rev.author}
                          fill
                          className="object-cover"
                          sizes="28px"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-black dark:text-white leading-none">
                          {rev.author}
                        </span>
                        <span className="text-[9px] text-zinc-500 font-mono flex items-center gap-0.5 mt-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5 text-zinc-400" /> Verified
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleHelpfulClick(rev.id, rev.helpfulCount)}
                      className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 hover:text-black dark:hover:text-white px-2 py-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
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

