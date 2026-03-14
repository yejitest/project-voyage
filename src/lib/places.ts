// Google Places API 클라이언트
// 환경변수: GOOGLE_PLACES_API_KEY

// import type { Place, TravelTip } from "@/types";

// export async function getTopPlaces(city: string, countryCode: string): Promise<Place[]> {
//   const apiKey = process.env.GOOGLE_PLACES_API_KEY;
//   if (!apiKey) throw new Error("GOOGLE_PLACES_API_KEY가 설정되지 않았습니다.");
//
//   // Text Search API로 관광지 검색
//   const query = `top tourist attractions in ${city}`;
//   const res = await fetch(
//     `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`,
//     { next: { revalidate: 86400 } } // 24시간 캐시
//   );
//
//   if (!res.ok) throw new Error("Places API 호출 실패");
//
//   const data = await res.json();
//
//   return data.results.slice(0, 5).map((place: any) => ({
//     name: place.name,
//     category: place.types?.[0] ?? "명소",
//     description: place.formatted_address ?? "",
//     rating: place.rating,
//   }));
// }

export {};
