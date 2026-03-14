"use client";

// 날짜 범위 상태 및 TripInfo 계산 훅
// - dateRange 변경 시 nights, season, durationLabel 자동 계산
// - store의 setDateRange, setTripInfo 호출

import type { DateRange, Season, TripInfo } from "@/types";

function getSeason(date: Date): Season {
  const month = date.getMonth() + 1;
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

function getDurationLabel(nights: number): string {
  if (nights <= 3) return "단기 (1~3박)";
  if (nights <= 7) return "중기 (4~7박)";
  return "장기 (8박 이상)";
}

export function computeTripInfo(dateRange: DateRange): TripInfo | null {
  const { from, to } = dateRange;
  if (!from || !to) return null;

  const nights = Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
  if (nights < 1) return null;

  return {
    dateRange,
    nights,
    season: getSeason(from),
    durationLabel: getDurationLabel(nights),
  };
}

// TODO: zustand store 연동 후 실제 hook으로 전환
// export function useDateRange() {
//   const { dateRange, setDateRange } = useVoyageStore();
//
//   const handleDateRangeChange = (range: DateRange) => {
//     setDateRange(range);
//     const tripInfo = computeTripInfo(range);
//     // store에 tripInfo 저장
//   };
//
//   return { dateRange, handleDateRangeChange };
// }
