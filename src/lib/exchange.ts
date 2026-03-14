// ExchangeRate-API 클라이언트
// 환경변수: EXCHANGE_RATE_API_KEY
// 무료 플랜: 월 1,500회 요청

// import type { ExchangeData } from "@/types";

// const CURRENCY_META: Record<string, { name: string; symbol: string }> = {
//   THB: { name: "태국 바트", symbol: "฿" },
//   JPY: { name: "일본 엔", symbol: "¥" },
//   VND: { name: "베트남 동", symbol: "₫" },
//   IDR: { name: "인도네시아 루피아", symbol: "Rp" },
//   SGD: { name: "싱가포르 달러", symbol: "S$" },
//   EUR: { name: "유로", symbol: "€" },
//   GBP: { name: "영국 파운드", symbol: "£" },
//   AUD: { name: "호주 달러", symbol: "A$" },
//   USD: { name: "미국 달러", symbol: "$" },
// };

// export async function getExchangeRate(currency: string): Promise<ExchangeData> {
//   const apiKey = process.env.EXCHANGE_RATE_API_KEY;
//   if (!apiKey) throw new Error("EXCHANGE_RATE_API_KEY가 설정되지 않았습니다.");
//
//   const res = await fetch(
//     `https://v6.exchangerate-api.com/v6/${apiKey}/pair/KRW/${currency}`,
//     { next: { revalidate: 3600 } } // 1시간 캐시
//   );
//
//   if (!res.ok) throw new Error("환율 API 호출 실패");
//
//   const data = await res.json();
//   // 1 KRW = X currency → 1 currency = 1/X KRW
//   const ratePerKRW = Math.round((1 / data.conversion_rate) * 10) / 10;
//
//   const meta = CURRENCY_META[currency] ?? { name: currency, symbol: currency };
//
//   return {
//     currency,
//     currencyName: meta.name,
//     ratePerKRW,
//     symbol: meta.symbol,
//   };
// }

export {};
