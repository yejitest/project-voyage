"use client";

// 여행지 상세 정보 fetch 훅
// - 선택된 Destination 기준으로 weather, exchange, places API를 병렬 호출
// - DestinationDetail 조합 후 store에 저장

import type { Destination, DestinationDetail } from "@/types";

export async function fetchDestinationDetail(destination: Destination): Promise<DestinationDetail> {
  const { city, cityEn, countryCode, country } = destination;

  const [weatherRes, exchangeRes, placesRes] = await Promise.allSettled([
    fetch(`/api/weather?city=${cityEn}&countryCode=${countryCode}`).then((r) => r.json()),
    fetch(`/api/exchange?currency=${getCurrencyByCountry(countryCode)}`).then((r) => r.json()),
    fetch(`/api/places?city=${cityEn}&countryCode=${countryCode}`).then((r) => r.json()),
  ]);

  return {
    destination,
    weather: weatherRes.status === "fulfilled" ? weatherRes.value.data : null,
    exchange: exchangeRes.status === "fulfilled" ? exchangeRes.value.data : null,
    places: placesRes.status === "fulfilled" ? placesRes.value.places : [],
    tips: placesRes.status === "fulfilled" ? placesRes.value.tips : [],
  };
}

// 국가 코드 → 통화 코드 매핑 (주요 여행지 기준)
function getCurrencyByCountry(countryCode: string): string {
  const map: Record<string, string> = {
    TH: "THB", JP: "JPY", VN: "VND", ID: "IDR",
    SG: "SGD", MY: "MYR", PH: "PHP", HK: "HKD",
    FR: "EUR", DE: "EUR", ES: "EUR", IT: "EUR",
    PT: "EUR", CZ: "CZK", GB: "GBP",
    AU: "AUD", NZ: "NZD",
    US: "USD", MX: "MXN",
  };
  return map[countryCode] ?? "USD";
}

// TODO: zustand store 연동 후 실제 hook으로 전환
// export function useDestinationDetail() {
//   const { selectedDestination, setDestinationDetail, setLoadingDetail } = useVoyageStore();
//
//   const load = async () => {
//     if (!selectedDestination) return;
//     setLoadingDetail(true);
//     try {
//       const detail = await fetchDestinationDetail(selectedDestination);
//       setDestinationDetail(detail);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoadingDetail(false);
//     }
//   };
//
//   return { load };
// }
