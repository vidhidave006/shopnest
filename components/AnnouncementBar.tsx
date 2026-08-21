"use client";

import React, { useState, useEffect } from "react";

export function AnnouncementBar() {
  const announcements = [
    "COMPLIMENTARY EXPRESS AIR COURIER ON ORDERS OVER ₹4,999",
    "SPECIAL PRIVILEGE: APPLY 'NEST20' FOR 20% CONCESSION AT CHECKOUT",
    "30-DAY SANCTUARY TRIAL • 2-YEAR COMPREHENSIVE WARRANTY",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4800);
    return () => clearInterval(interval);
  }, [announcements.length]);

  return (
    <div className="bg-black text-zinc-300 border-b border-zinc-900 text-[10.5px] font-mono tracking-[0.16em] py-2.5 px-4 select-none">
      <div className="max-w-6xl mx-auto flex items-center justify-center text-center overflow-hidden">
        <div
          key={currentIndex}
          className="flex items-center justify-center gap-2.5 font-medium text-zinc-200 animate-in fade-in slide-in-from-bottom-1 duration-300"
        >
          <span className="text-zinc-500 text-xs">•</span>
          <span className="truncate uppercase text-[9.5px] sm:text-[10px] text-zinc-200 tracking-wider">
            {announcements[currentIndex]}
          </span>
          <span className="text-zinc-500 text-xs">•</span>
        </div>
      </div>
    </div>
  );
}
