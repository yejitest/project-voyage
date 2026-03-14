// ── Date & Trip ──────────────────────────────────────

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export type Season = "spring" | "summer" | "autumn" | "winter";

export interface TripInfo {
  dateRange: DateRange;
  nights: number;
  season: Season;
  durationLabel: string; // "단기 (1~3박)" | "중기 (4~7박)" | "장기 (8박 이상)"
}

// ── Region & Destination ─────────────────────────────

export type Region = "all" | "asia" | "europe" | "americas" | "oceania";

export interface Destination {
  id: string;
  city: string;                    // "방콕"
  cityEn: string;                  // "Bangkok"
  country: string;                 // "태국"
  countryCode: string;             // "TH"
  region: Region;
  emoji: string;                   // "🏯"
  imageUrl: string;                // Unsplash photo URL
  temperature: number;             // 현지 평균 기온 (°C)
  reason: string;                  // "겨울에도 따뜻한 28°C, 단기 여행에 최적인 도시"
  tags: string[];                  // ["겨울 따뜻", "단기 최적"]
  flightHoursFromKorea: number;    // 인천 출발 비행 시간 (시간 단위)
  minRecommendedNights: number;    // 비행 시간을 고려한 최소 추천 박 수
  isNew?: boolean;
}

// ── Weather ──────────────────────────────────────────

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  description: string;    // "맑음"
  humidity: number;
  icon: string;
  isRainySeason: boolean;
}

// ── Exchange Rate ─────────────────────────────────────

export interface ExchangeData {
  currency: string;       // "THB"
  currencyName: string;   // "태국 바트"
  ratePerKRW: number;     // 1 THB = 38 KRW 일 때 → 38
  symbol: string;         // "฿"
}

// ── Place ─────────────────────────────────────────────

export interface Place {
  name: string;
  category: string;       // "사원" | "해변" | "쇼핑"
  description: string;
  rating?: number;
}

// ── Travel Tips ───────────────────────────────────────

export interface TravelTip {
  category: "clothing" | "safety" | "transport" | "culture" | "budget";
  content: string;
}

// ── Detail Info (aggregated) ──────────────────────────

export interface DestinationDetail {
  destination: Destination;
  weather: WeatherData | null;
  exchange: ExchangeData | null;
  places: Place[];
  tips: TravelTip[];
}

// ── API Response Types ────────────────────────────────

export interface RecommendResponse {
  destinations: Destination[];
}

export interface WeatherResponse {
  data: WeatherData;
}

export interface ExchangeResponse {
  data: ExchangeData;
}

export interface PlacesResponse {
  places: Place[];
  tips: TravelTip[];
}
