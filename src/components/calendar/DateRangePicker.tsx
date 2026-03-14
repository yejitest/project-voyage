"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import type { DateRange, TripInfo } from "@/types";

const SEASON_LABEL: Record<string, string> = {
  spring: "봄",
  summer: "여름",
  autumn: "가을",
  winter: "겨울",
};

interface DateRangePickerProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  tripInfo: TripInfo | null;
}

export default function DateRangePicker({
  dateRange,
  onDateRangeChange,
  tripInfo,
}: DateRangePickerProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_2px_24px_rgba(0,0,0,0.06)]">
      <div className="p-6">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-black/35">
          📅 출발일 — 귀국일 선택
        </p>

        <DayPicker
          mode="range"
          selected={
            dateRange.from
              ? { from: dateRange.from, to: dateRange.to }
              : undefined
          }
          onSelect={(range) =>
            onDateRangeChange({
              from: range?.from,
              to: range?.to,
            })
          }
          numberOfMonths={2}
          disabled={{ before: new Date() }}
          classNames={{
            root: "rdp-voyage",
            months: "flex gap-6 flex-wrap",
            month_caption: "flex items-center mb-3",
            caption_label: "font-display text-sm font-bold text-black tracking-[-0.02em]",
            nav: "flex items-center gap-1",
            button_previous:
              "w-7 h-7 flex items-center justify-center rounded bg-black/5 border border-black/10 text-black/50 hover:bg-black hover:text-white hover:border-black transition-all duration-150 text-xs",
            button_next:
              "w-7 h-7 flex items-center justify-center rounded bg-black/5 border border-black/10 text-black/50 hover:bg-black hover:text-white hover:border-black transition-all duration-150 text-xs",
            weeks: "mt-2",
            weekdays: "flex mb-1",
            weekday:
              "w-9 text-center text-[10px] font-bold uppercase tracking-[0.1em] text-black/30",
            week: "flex",
            day: "w-9 h-9 flex items-center justify-center",
            day_button:
              "w-8 h-8 flex items-center justify-center text-sm text-black/80 rounded transition-all duration-150 hover:bg-black/6 cursor-pointer",
            today: "font-bold text-[#39ff14] underline decoration-[#39ff14]",
            selected: "",
            range_start:
              "bg-black! text-white! rounded! font-medium",
            range_end:
              "bg-black! text-white! rounded! font-medium",
            range_middle:
              "bg-[rgba(57,255,20,0.18)]! text-black! rounded-none!",
            outside: "opacity-25",
            disabled: "opacity-20 cursor-not-allowed",
          }}
        />
      </div>

      {/* AI analysis box */}
      {tripInfo && (
        <div className="border-t border-black/8 px-6 py-4">
          <div className="rounded-xl border border-black/10 bg-[rgba(57,255,20,0.08)] p-3">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-black/60">
              ✦ 분석
            </p>
            <p className="text-xs text-black/70">
              {SEASON_LABEL[tripInfo.season]} · {tripInfo.durationLabel} ·{" "}
              {tripInfo.season === "winter"
                ? "따뜻한 기후 추천"
                : tripInfo.season === "summer"
                ? "시원한 기후 추천"
                : "쾌적한 여행 최적"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
