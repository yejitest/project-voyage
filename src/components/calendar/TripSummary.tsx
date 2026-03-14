"use client";

import { motion } from "framer-motion";
import type { TripInfo } from "@/types";

interface TripSummaryProps {
  tripInfo: TripInfo;
  onRecommend: () => void;
}

const SEASON_LABEL: Record<string, string> = {
  spring: "봄",
  summer: "여름",
  autumn: "가을",
  winter: "겨울",
};

const SEASON_EMOJI: Record<string, string> = {
  spring: "🌸",
  summer: "☀️",
  autumn: "🍂",
  winter: "❄️",
};

export default function TripSummary({ tripInfo, onRecommend }: TripSummaryProps) {
  const { from, to } = tripInfo.dateRange;

  const formatDate = (d: Date) =>
    d.toLocaleDateString("ko-KR", { month: "long", day: "numeric" });

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-black/10 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.05)] sm:flex-row sm:items-center sm:justify-between">
      {/* Trip stats */}
      <div className="flex flex-wrap items-center gap-5">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-black/30">
            여행 기간
          </span>
          <span className="font-display text-[28px] font-extrabold leading-tight tracking-[-0.04em] text-black">
            {tripInfo.nights}박 {tripInfo.nights + 1}일
          </span>
        </div>

        <div className="h-9 w-px bg-black/10" />

        <div className="flex flex-col">
          <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-black/30">
            계절
          </span>
          <span className="font-display text-[28px] font-extrabold leading-tight tracking-[-0.04em] text-black">
            {SEASON_EMOJI[tripInfo.season]} {SEASON_LABEL[tripInfo.season]}
          </span>
        </div>

        <div className="h-9 w-px bg-black/10" />

        <div className="flex flex-col">
          <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-black/30">
            유형
          </span>
          <span className="mt-0.5 text-sm font-semibold text-black/60">
            {tripInfo.durationLabel}
          </span>
        </div>

        {from && to && (
          <>
            <div className="hidden h-9 w-px bg-black/10 sm:block" />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-black/30">
                일정
              </span>
              <span className="mt-0.5 text-sm font-semibold text-black/60">
                {formatDate(from)} — {formatDate(to)}
              </span>
            </div>
          </>
        )}
      </div>

      {/* CTA pill — electric green */}
      <motion.button
        onClick={onRecommend}
        whileHover={{
          scale: 1.04,
          boxShadow: "0 0 32px rgba(57,255,20,0.55)",
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#39ff14] px-9 py-[15px] text-[15px] font-black tracking-[-0.01em] text-black shadow-[0_4px_20px_rgba(57,255,20,0.35)]"
      >
        ✦ 추천 보기
      </motion.button>
    </div>
  );
}
