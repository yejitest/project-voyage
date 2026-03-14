// OpenWeatherMap API 클라이언트
// 환경변수: OPENWEATHER_API_KEY

// import type { WeatherData } from "@/types";

// const BASE_URL = "https://api.openweathermap.org/data/2.5";

// export async function getWeather(city: string, countryCode: string): Promise<WeatherData> {
//   const apiKey = process.env.OPENWEATHER_API_KEY;
//   if (!apiKey) throw new Error("OPENWEATHER_API_KEY가 설정되지 않았습니다.");
//
//   const res = await fetch(
//     `${BASE_URL}/weather?q=${city},${countryCode}&appid=${apiKey}&units=metric&lang=kr`,
//     { next: { revalidate: 1800 } } // 30분 캐시
//   );
//
//   if (!res.ok) throw new Error("날씨 API 호출 실패");
//
//   const data = await res.json();
//
//   return {
//     temperature: Math.round(data.main.temp),
//     feelsLike: Math.round(data.main.feels_like),
//     description: data.weather[0].description,
//     humidity: data.main.humidity,
//     icon: data.weather[0].icon,
//     isRainySeason: checkRainySeason(countryCode, new Date()),
//   };
// }

// function checkRainySeason(countryCode: string, date: Date): boolean {
//   const month = date.getMonth() + 1;
//   const rainySeason: Record<string, number[]> = {
//     TH: [5, 6, 7, 8, 9, 10],
//     VN: [5, 6, 7, 8, 9, 10],
//     ID: [10, 11, 12, 1, 2, 3],
//     PH: [6, 7, 8, 9, 10, 11],
//     MY: [10, 11, 12],
//   };
//   return rainySeason[countryCode]?.includes(month) ?? false;
// }

export {};
