import { NextRequest, NextResponse } from "next/server";
import type { WeatherData, WeatherResponse } from "@/types";

// Per-city mock weather data keyed by cityEn (lowercase)
const WEATHER_BY_CITY: Record<string, WeatherData> = {
  osaka: {
    temperature: 14,
    feelsLike: 12,
    description: "맑음",
    humidity: 55,
    icon: "01d",
    isRainySeason: false,
  },
  tokyo: {
    temperature: 8,
    feelsLike: 5,
    description: "맑음",
    humidity: 50,
    icon: "01d",
    isRainySeason: false,
  },
  "hong kong": {
    temperature: 22,
    feelsLike: 24,
    description: "구름 조금",
    humidity: 72,
    icon: "02d",
    isRainySeason: false,
  },
  "da nang": {
    temperature: 26,
    feelsLike: 28,
    description: "맑음",
    humidity: 70,
    icon: "01d",
    isRainySeason: false,
  },
  bangkok: {
    temperature: 28,
    feelsLike: 32,
    description: "맑음",
    humidity: 65,
    icon: "01d",
    isRainySeason: false,
  },
  singapore: {
    temperature: 30,
    feelsLike: 34,
    description: "소나기",
    humidity: 82,
    icon: "09d",
    isRainySeason: true,
  },
  bali: {
    temperature: 30,
    feelsLike: 33,
    description: "구름 많음",
    humidity: 78,
    icon: "03d",
    isRainySeason: false,
  },
  sydney: {
    temperature: 24,
    feelsLike: 22,
    description: "맑음",
    humidity: 58,
    icon: "01d",
    isRainySeason: false,
  },
  prague: {
    temperature: 5,
    feelsLike: 2,
    description: "흐림",
    humidity: 75,
    icon: "04d",
    isRainySeason: false,
  },
  barcelona: {
    temperature: 22,
    feelsLike: 20,
    description: "맑음",
    humidity: 60,
    icon: "01d",
    isRainySeason: false,
  },
};

const FALLBACK_WEATHER: WeatherData = {
  temperature: 20,
  feelsLike: 18,
  description: "맑음",
  humidity: 60,
  icon: "01d",
  isRainySeason: false,
};

// GET /api/weather?city=Bangkok&countryCode=TH
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");
    const countryCode = searchParams.get("countryCode");

    if (!city || !countryCode) {
      return NextResponse.json({ error: "city, countryCode 파라미터가 필요합니다." }, { status: 400 });
    }

    const weatherData = WEATHER_BY_CITY[city.toLowerCase()] ?? FALLBACK_WEATHER;
    const data: WeatherResponse = { data: weatherData };
    return NextResponse.json(data);
  } catch (error) {
    console.error("[weather] error:", error);
    return NextResponse.json({ error: "날씨 정보를 불러오지 못했습니다." }, { status: 500 });
  }
}
