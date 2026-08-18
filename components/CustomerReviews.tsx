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
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Press Badges Header */}
        <div className="mb-16 border-b border-slate-200 pb-12">
          <p className="text-center text-xs uppercase font-bold tracking-widest text-slate-400 mb-6">
            Recognized & Featured In Global Media
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {pressLogos.map((p, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors flex flex-col justify-center items-center"
              >
                <span className="text-xl sm:text-2xl font-black tracking-widest text-slate-900 font-serif">
                  {p.name}
                </span>
                <p className="text-xs text-slate-500 mt-2 italic line-clamp-2">
                  &ldquo;{p.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Authentic Social Proof
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Loved by 50,000+ Customers
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Read real, unedited reviews from verified purchasers worldwide.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 p-4 rounded-2xl self-start md:self-auto">
            <div className="text-3xl font-black text-slate-900">4.92</div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-500 font-medium mt-0.5">
                Based on 3,840+ verified buyer ratings
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => {
            const count =
              helpfulVotes[rev.id] !== undefined
                ? helpfulVotes[rev.id]
                : rev.helpfulCount;

            return (
              <div
                key={rev.id}
                className="bg-slate-50 rounded-3xl p-5 border border-slate-200/90 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-3">
                  {/* Rating Stars & Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400">{rev.date}</span>
                  </div>

                  {/* Title & Comment */}
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">
                    {rev.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                {/* Reviewer & Product Info */}
                <div className="pt-4 mt-4 border-t border-slate-200/70 space-y-3">
                  {/* Product Mini Tag */}
                  <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white border border-slate-200/60">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                      <Image
                        src={rev.productImage}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 truncate">
                      {rev.productName}
                    </span>
                  </div>

                  {/* Author Avatar & Helpful button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-200">
                        <Image
                          src={rev.avatar}
                          alt={rev.author}
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900 leading-none">
                          {rev.author}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleHelpfulClick(rev.id, rev.helpfulCount)}
                      className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-900 font-medium px-2 py-1 rounded-lg hover:bg-slate-200/70 transition-colors"
                      title="Mark as helpful"
                    >
                      <ThumbsUp className="w-3 h-3" />
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
