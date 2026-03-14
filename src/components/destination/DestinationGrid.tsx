"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Destination, Region } from "@/types";
import DestinationCard, { cardVariant } from "./DestinationCard";
import FilterTabs from "./FilterTabs";
import { DestinationCardSkeleton } from "@/components/ui/Skeleton";

interface DestinationGridProps {
  destinations: Destination[];
  nights: number;
  selectedId: string | null;
  onSelect: (destination: Destination) => void;
  isLoading?: boolean;
}

const gridStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export default function DestinationGrid({
  destinations,
  nights,
  selectedId,
  onSelect,
  isLoading = false,
}: DestinationGridProps) {
  const [activeRegion, setActiveRegion] = useState<Region>("all");

  const filtered =
    activeRegion === "all"
      ? destinations
      : destinations.filter((d) => d.region === activeRegion);

  return (
    <div>
      {/* Section header — even section → RIGHT-aligned, 80px/900 + ghost echo */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative mb-14 overflow-hidden pb-4 text-right"
      >
        {/* Ghost background text — oversized, right-anchored, opacity 0.04 */}
        <span
          className="ghost-text pointer-events-none absolute right-[-1%] top-[-15%] select-none text-white"
          style={{ fontSize: "clamp(140px, 22vw, 200px)", opacity: 0.04 }}
          aria-hidden="true"
        >
          추천 여행지
        </span>

        {/* English label above Korean title */}
        <p
          className="relative mb-3 font-bold uppercase text-white"
          style={{ fontSize: "11px", letterSpacing: "0.2em", opacity: 0.5 }}
        >
          RECOMMENDED DESTINATIONS
        </p>

        <div className="relative flex items-end justify-end gap-5">
          <div className="mb-2 flex flex-col items-end gap-1.5">
            <span className="rounded-full bg-[#00ff57] px-4 py-1.5 text-[11px] font-black tracking-[0.04em] text-black">
              {filtered.length}곳
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/25">
              {nights}박 가능
            </span>
          </div>
          <h2
            className="font-display text-white"
            style={{ fontSize: "clamp(56px, 8vw, 80px)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.04em" }}
          >
            추천<br className="hidden sm:block" /> 여행지
          </h2>
        </div>
        <p className="relative mt-4 text-[10px] font-bold uppercase tracking-[0.34em] text-white/30">
          추천 결과 · {nights}박 {nights + 1}일 기준
        </p>
      </motion.div>

      {/* Flight time context banners */}
      <AnimatePresence mode="wait">
        {nights > 0 && nights <= 2 && (
          <motion.div
            key="short"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-7 overflow-hidden"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-5 py-4">
              <span className="text-base">✈️</span>
              <p className="text-sm font-medium text-white/65">
                {nights}박 — 비행 3.5시간 이내 근거리만 표시됩니다. 유럽·호주는 6박 이상 필요.
              </p>
            </div>
          </motion.div>
        )}
        {nights >= 3 && nights <= 4 && (
          <motion.div
            key="mid"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-7 overflow-hidden"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-5 py-4">
              <span className="text-base">✈️</span>
              <p className="text-sm font-medium text-white/65">
                {nights}박 — 동남아(방콕·싱가포르) 포함, 비행 7시간 이내 추천.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter tabs */}
      <div className="mb-10">
        <FilterTabs activeRegion={activeRegion} onChange={setActiveRegion} />
      </div>

      {/* Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <DestinationCardSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="flex w-full flex-col rounded-3xl border border-white/8 bg-white/4 py-20"
        >
          <p className="mb-3 text-4xl">✈️</p>
          <p className="text-base font-bold text-white">
            {activeRegion === "all"
              ? `${nights}박으로 갈 수 있는 여행지가 없습니다.`
              : "해당 지역 추천 결과가 없습니다."}
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/40">
            {activeRegion === "all"
              ? "유럽·호주는 장거리 비행으로 최소 5~6박 이상 권장합니다."
              : "다른 필터를 선택하거나 여행 기간을 늘려보세요."}
          </p>
        </motion.div>
      ) : (
        <motion.div
          key={activeRegion}
          variants={gridStagger}
          initial="hidden"
          animate="show"
        >
          {/* ── Row 1: Featured — full width ── */}
          <DestinationCard
            destination={filtered[0]}
            isSelected={filtered[0].id === selectedId}
            variant="featured"
            onClick={onSelect}
          />

          {/* ── Row 2: 4-col grid — first 2 normal, 3rd spans 2 cols (every 4th = col-span-2) ── */}
          {filtered.length > 1 && (
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
              {/* Card 2 */}
              {filtered[1] && (
                <DestinationCard
                  key={filtered[1].id}
                  destination={filtered[1]}
                  isSelected={filtered[1].id === selectedId}
                  variant="row2"
                  className="sm:col-span-1"
                  onClick={onSelect}
                />
              )}
              {/* Card 3 */}
              {filtered[2] && (
                <DestinationCard
                  key={filtered[2].id}
                  destination={filtered[2]}
                  isSelected={filtered[2].id === selectedId}
                  variant="row2"
                  className="sm:col-span-1"
                  onClick={onSelect}
                />
              )}
              {/* Card 4 — every 4th → col-span-2, taller */}
              {filtered[3] && (
                <DestinationCard
                  key={filtered[3].id}
                  destination={filtered[3]}
                  isSelected={filtered[3].id === selectedId}
                  variant="row2"
                  imgHeightClass="h-[360px]"
                  className="sm:col-span-2"
                  onClick={onSelect}
                />
              )}
            </div>
          )}

          {/* ── Row 3: Asymmetric — 2 short left + 1 tall right ── */}
          {filtered.length > 4 && (
            <div className="mt-5 grid grid-cols-3 gap-5" style={{ minHeight: "500px" }}>
              {/* Left: 2 stacked short cards */}
              <div className="col-span-2 grid grid-rows-2 gap-5">
                {filtered[4] && (
                  <DestinationCard
                    destination={filtered[4]}
                    isSelected={filtered[4].id === selectedId}
                    variant="row3-short"
                    onClick={onSelect}
                  />
                )}
                {filtered[5] && (
                  <DestinationCard
                    destination={filtered[5]}
                    isSelected={filtered[5].id === selectedId}
                    variant="row3-short"
                    onClick={onSelect}
                  />
                )}
              </div>
              {/* Right: 1 tall card */}
              {filtered[6] && (
                <div className="col-span-1">
                  <DestinationCard
                    destination={filtered[6]}
                    isSelected={filtered[6].id === selectedId}
                    variant="row3-tall"
                    className="h-full"
                    onClick={onSelect}
                  />
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
