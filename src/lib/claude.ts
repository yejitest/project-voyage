// Anthropic Claude API 클라이언트
// 설치 필요: pnpm add @anthropic-ai/sdk
// 환경변수: ANTHROPIC_API_KEY

// import Anthropic from "@anthropic-ai/sdk";
// import type { TripInfo, Destination } from "@/types";

// const client = new Anthropic({
//   apiKey: process.env.ANTHROPIC_API_KEY,
// });

// export async function getDestinationRecommendations(
//   tripInfo: TripInfo
// ): Promise<Destination[]> {
//   const prompt = buildRecommendPrompt(tripInfo);
//
//   const message = await client.messages.create({
//     model: "claude-sonnet-4-5",
//     max_tokens: 2048,
//     messages: [{ role: "user", content: prompt }],
//   });
//
//   const content = message.content[0];
//   if (content.type !== "text") throw new Error("Unexpected response type");
//
//   // JSON 파싱 (Claude에게 JSON 포맷 응답 요청)
//   const json = JSON.parse(content.text);
//   return json.destinations;
// }

// function buildRecommendPrompt(tripInfo: TripInfo): string {
//   return `당신은 해외 여행 전문 큐레이터입니다.
// 아래 여행 조건을 분석해 최적의 해외 여행지 6~10개를 추천해주세요.
//
// 여행 조건:
// - 출발일: ${tripInfo.dateRange.from?.toISOString().split("T")[0]}
// - 귀국일: ${tripInfo.dateRange.to?.toISOString().split("T")[0]}
// - 박 수: ${tripInfo.nights}박
// - 계절: ${tripInfo.season}
// - 기간 유형: ${tripInfo.durationLabel}
//
// 응답 형식 (JSON만 출력):
// {
//   "destinations": [
//     {
//       "id": "string",
//       "city": "방콕",
//       "cityEn": "Bangkok",
//       "country": "태국",
//       "countryCode": "TH",
//       "region": "asia",
//       "emoji": "🏯",
//       "temperature": 28,
//       "reason": "겨울에도 따뜻한 28°C, 단기 여행에 최적",
//       "tags": ["겨울 따뜻", "단기 최적"],
//       "isNew": false
//     }
//   ]
// }`;
// }

export {};
