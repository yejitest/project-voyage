"use client";

// 여행지 추천 fetch 훅
// - TripInfo를 POST /api/recommend에 전달
// - 응답(Destination[])을 store에 저장
// - 로딩/에러 상태 관리

import type { TripInfo, Destination } from "@/types";

export async function fetchRecommendations(tripInfo: TripInfo): Promise<Destination[]> {
  const res = await fetch("/api/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tripInfo),
  });

  if (!res.ok) throw new Error("추천을 불러오지 못했습니다.");

  const data = await res.json();
  return data.destinations;
}

// TODO: zustand store 연동 후 실제 hook으로 전환
// export function useRecommendations() {
//   const { tripInfo, setDestinations, setLoadingRecommendations } = useVoyageStore();
//
//   const load = async () => {
//     if (!tripInfo) return;
//     setLoadingRecommendations(true);
//     try {
//       const destinations = await fetchRecommendations(tripInfo);
//       setDestinations(destinations);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoadingRecommendations(false);
//     }
//   };
//
//   return { load };
// }
