"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { CustomSelect, CustomSelectOption } from "@/components/ui/CustomSelect";
import { Star, CheckCircle2, Trash2, ShieldCheck, MessageSquare, Filter, Award } from "lucide-react";

export function AdminReviews() {
  const { reviews, deleteReview, toggleReviewVerified } = useShop();
  const [filterMode, setFilterMode] = useState<string>("all");

  const filterOptions: CustomSelectOption[] = [
    { value: "all", label: `All Customer Feedback (${reviews.length})`, description: "Full verified & general testimonials", icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { value: "5-star", label: "5-Star Verified Ratings Only", description: "Flawless maximum rating feedback", icon: <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />, badge: "5.0" },
    { value: "4-star", label: "4-Star Positive Testimonials", description: "High rating feedback", icon: <Star className="w-3.5 h-3.5 text-amber-500" /> },
    { value: "verified", label: `Verified Buyers Only (${reviews.filter((r) => r.verified).length})`, description: "Purchases confirmed on store registry", icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />, badge: "Verified" },
    { value: "unverified", label: `Unverified Submissions (${reviews.filter((r) => !r.verified).length})`, description: "Awaiting order match verification" },
  ];

  const filteredReviews = reviews.filter((r) => {
    if (filterMode === "5-star" && r.rating !== 5) return false;
    if (filterMode === "4-star" && r.rating !== 4) return false;
    if (filterMode === "verified" && !r.verified) return false;
    if (filterMode === "unverified" && r.verified) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200 font-sans text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
            SOCIAL PROOF & MODERATION
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-black dark:text-white tracking-tight">
            Customer Reviews Moderation ({reviews.length})
          </h2>
        </div>

        {/* Website-Related Custom Review Filter Dropdown */}
        <div className="w-72">
          <CustomSelect
            options={filterOptions}
            value={filterMode}
            onChange={(val) => setFilterMode(val)}
            menuClassName="w-80"
          />
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-4 hover:border-black dark:hover:border-zinc-600 transition-all shadow-xs"
          >
            <div className="space-y-3">
              {/* Top Row: Stars & Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-800">
                    <Image
                      src={rev.avatar}
                      alt={rev.author}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-black dark:text-white leading-none">
                      {rev.author}
                    </h4>
                    <span className="text-[10px] text-zinc-400">{rev.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-black dark:text-white">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>

              {/* Review Title & Content */}
              <div className="space-y-1">
                <h5 className="font-bold text-black dark:text-white text-xs">{rev.title}</h5>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Associated Product */}
              <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 flex items-center gap-2 text-[10px]">
                <span className="text-zinc-400 uppercase">Product:</span>
                <span className="font-bold text-black dark:text-white line-clamp-1">
                  {rev.productName}
                </span>
              </div>
            </div>

            {/* Actions & Verification */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
              <button
                onClick={() => toggleReviewVerified(rev.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors ${
                  rev.verified
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "bg-zinc-100 dark:bg-zinc-900 text-zinc-500 border border-zinc-200 dark:border-zinc-800"
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>{rev.verified ? "Verified Buyer" : "Unverified"}</span>
              </button>

              <button
                onClick={() => {
                  if (confirm(`Delete review from "${rev.author}"?`)) {
                    deleteReview(rev.id);
                  }
                }}
                className="p-1 text-zinc-400 hover:text-red-500 transition-colors"
                title="Delete Review"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
