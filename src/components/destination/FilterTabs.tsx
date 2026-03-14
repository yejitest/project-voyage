"use client";

import { motion } from "framer-motion";
import type { Region } from "@/types";

interface FilterTabsProps {
  activeRegion: Region;
  onChange: (region: Region) => void;
}

const FILTERS: { label: string; value: Region; emoji: string }[] = [
  { label: "전체", value: "all", emoji: "🌏" },
  { label: "아시아", value: "asia", emoji: "🏝" },
  { label: "유럽", value: "europe", emoji: "🏰" },
  { label: "아메리카", value: "americas", emoji: "🗽" },
  { label: "오세아니아", value: "oceania", emoji: "🦘" },
];

export default function FilterTabs({ activeRegion, onChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => {
        const isActive = activeRegion === filter.value;
        return (
          <motion.button
            key={filter.value}
            onClick={() => onChange(filter.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 420, damping: 24 }}
            className={`relative inline-flex items-center gap-1.5 rounded-full border px-[14px] py-[6px] text-xs font-semibold tracking-[0.04em] transition-colors duration-200 ${
              isActive
                ? "border-[#39ff14] bg-[#39ff14] text-black"
                : "border-white/18 bg-transparent text-white/50 hover:border-[#39ff14] hover:text-[#39ff14]"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="activeTabBg"
                className="absolute inset-0 rounded-full bg-[#39ff14]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                style={{ zIndex: -1 }}
              />
            )}
            <span className="relative z-10">
              {filter.emoji} {filter.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
