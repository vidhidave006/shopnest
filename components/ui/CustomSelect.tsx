"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface CustomSelectOption {
  value: string | number;
  label: string;
  subLabel?: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

interface CustomSelectProps {
  options: CustomSelectOption[];
  value: string | number;
  onChange: (value: any) => void;
  placeholder?: string;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  menuClassName?: string;
  align?: "left" | "right";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  icon,
  className = "",
  menuClassName = "",
  align = "left",
  size = "md",
  disabled = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle key navigation (Escape to close)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const sizeClasses = {
    sm: "h-8 px-2.5 text-xs",
    md: "h-10 px-3 text-xs",
    lg: "h-12 px-4 text-sm",
  };

  return (
    <div className="relative font-mono" ref={containerRef}>
      {label && (
        <label className="block text-[11px] uppercase font-bold tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full ${sizeClasses[size]} rounded-xl bg-zinc-50 dark:bg-zinc-900 border ${
          isOpen
            ? "border-black dark:border-white ring-1 ring-black dark:ring-white"
            : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
        } text-black dark:text-white font-bold flex items-center justify-between gap-2 transition-all cursor-pointer select-none text-left shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {selectedOption?.icon ? (
            <span className="shrink-0 text-zinc-700 dark:text-zinc-300">
              {selectedOption.icon}
            </span>
          ) : icon ? (
            <span className="shrink-0 text-zinc-400">{icon}</span>
          ) : null}

          <span className="truncate leading-none">
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          {selectedOption?.badge && (
            <span
              className={`shrink-0 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                selectedOption.badgeColor ||
                "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              }`}
            >
              {selectedOption.badge}
            </span>
          )}
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 shrink-0 text-zinc-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-black dark:text-white" : ""
          }`}
        />
      </button>

      {/* Custom Popup Menu */}
      {isOpen && (
        <div
          role="listbox"
          className={`absolute z-50 mt-1.5 w-full min-w-[220px] max-h-72 overflow-y-auto bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-1.5 animate-in fade-in zoom-in-95 duration-150 ${
            align === "right" ? "right-0" : "left-0"
          } ${menuClassName}`}
        >
          <div className="space-y-0.5">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={String(option.value)}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between gap-3 transition-colors group cursor-pointer ${
                    isSelected
                      ? "bg-black text-white dark:bg-white dark:text-black font-bold shadow-xs"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    {option.icon && (
                      <div
                        className={`p-1.5 rounded-lg shrink-0 ${
                          isSelected
                            ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white"
                        }`}
                      >
                        {option.icon}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-xs leading-tight flex items-center gap-1.5">
                        <span className="truncate">{option.label}</span>
                        {option.subLabel && (
                          <span
                            className={`text-[10px] ${
                              isSelected
                                ? "text-zinc-300 dark:text-zinc-600"
                                : "text-zinc-400"
                            }`}
                          >
                            {option.subLabel}
                          </span>
                        )}
                      </div>
                      {option.description && (
                        <div
                          className={`text-[10px] truncate mt-0.5 leading-none ${
                            isSelected
                              ? "text-zinc-300 dark:text-zinc-600"
                              : "text-zinc-400"
                          }`}
                        >
                          {option.description}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {option.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                          isSelected
                            ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black"
                            : option.badgeColor ||
                              "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        {option.badge}
                      </span>
                    )}
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
