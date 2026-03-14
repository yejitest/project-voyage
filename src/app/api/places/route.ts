import { NextRequest, NextResponse } from "next/server";
import type { Place, TravelTip, PlacesResponse } from "@/types";

// Per-city places and travel tips keyed by cityEn (lowercase)
const PLACES_BY_CITY: Record<string, { places: Place[]; tips: TravelTip[] }> = {
  osaka: {
    places: [
      { name: "도톤보리", category: "거리", description: "오사카 최대 번화가, 글리코 간판과 운하 야경", rating: 4.7 },
      { name: "오사카성", category: "성곽", description: "16세기 도요토미 히데요시가 축성한 역사 명소", rating: 4.6 },
      { name: "유니버설 스튜디오 재팬", category: "테마파크", description: "해리포터 등 체험형 어트랙션 밀집", rating: 4.5 },
      { name: "구로몬 시장", category: "시장", description: "오사카의 부엌, 신선한 해산물·과일 노점", rating: 4.4 },
      { name: "신사이바시", category: "쇼핑", description: "300m 아케이드 쇼핑 거리, 브랜드·잡화 밀집", rating: 4.3 },
    ],
    tips: [
      { category: "transport", content: "오사카 주유패스 1~2일권으로 지하철·관광지 자유 이용 추천" },
      { category: "culture", content: "타코야키·오코노미야키·구시카츠 — 길거리 음식 세 개가 오사카의 핵심" },
      { category: "budget", content: "편의점·슈퍼마켓 도시락 300~500엔, 라멘 한 그릇 800엔 수준" },
      { category: "culture", content: "유니버설은 주말 혼잡 — 평일 아침 일찍 방문 권장, 익스프레스 패스 고려" },
      { category: "safety", content: "전반적으로 안전한 도시. 귀중품은 작은 가방에 나눠 보관 권장" },
    ],
  },
  tokyo: {
    places: [
      { name: "시부야 스크램블 교차로", category: "거리", description: "세계에서 가장 바쁜 교차로, 도쿄의 상징", rating: 4.6 },
      { name: "아사쿠사 센소지", category: "사원", description: "도쿄 최고(最古) 사원, 나카미세 쇼핑 거리 인접", rating: 4.7 },
      { name: "메이지 신궁", category: "신사", description: "울창한 숲 속 메이지 천황을 모신 신사", rating: 4.5 },
      { name: "신주쿠 골든가이", category: "거리", description: "전후 시대 분위기의 초소형 바 밀집 골목", rating: 4.4 },
      { name: "아키하바라", category: "쇼핑", description: "전자상가·애니메이션·게임 문화의 성지", rating: 4.3 },
    ],
    tips: [
      { category: "transport", content: "스이카 카드 충전 후 JR·도쿄 메트로 자유롭게 환승 가능" },
      { category: "culture", content: "라멘·스시·야키니쿠 등 전문점이 밀집한 신주쿠·긴자 방문 추천" },
      { category: "clothing", content: "봄(3~4월) 벚꽃 시즌에는 낮 15°C, 저녁은 쌀쌀 — 겉옷 필수" },
      { category: "culture", content: "사원·신사 방문 시 입구 수반에서 손 씻는 미소기 예절 준수" },
      { category: "budget", content: "도쿄 메트로 24시간 패스 600엔 — 하루 관광에 경제적" },
    ],
  },
  "hong kong": {
    places: [
      { name: "빅토리아 피크", category: "전망대", description: "홍콩 최고의 야경 포인트, 트램으로 정상 도달", rating: 4.7 },
      { name: "침사추이 해변산책로", category: "거리", description: "구룡반도 해안가, 홍콩섬 마천루 전망 최적", rating: 4.6 },
      { name: "몽콕 야시장", category: "시장", description: "저렴한 의류·액세서리·길거리 음식 밀집 야시장", rating: 4.3 },
      { name: "딤섬 레스토랑 (딘타이펑)", category: "미식", description: "세계적 딤섬 브랜드, 하가우·샤오마이 필수 메뉴", rating: 4.8 },
      { name: "란콰이펑", category: "나이트라이프", description: "홍콩 최대 바·클럽 밀집 거리, 주말 활기", rating: 4.2 },
    ],
    tips: [
      { category: "transport", content: "옥토퍼스 카드로 MTR·버스·트램 통합 이용 — 공항에서 바로 발급" },
      { category: "culture", content: "아침 얌차(飲茶)는 반드시 경험할 것. 오전 11시 전 방문해야 줄 없이 이용 가능" },
      { category: "clothing", content: "22°C 온화한 날씨지만 실내 냉방이 강하므로 얇은 겉옷 지참 권장" },
      { category: "budget", content: "홍콩 달러 현금 소지 권장 — 소규모 노점·전통 식당은 현금 전용" },
      { category: "safety", content: "소매치기 주의 구역: 침사추이·몽콕 인파 밀집 지역에서 가방 앞으로 착용" },
    ],
  },
  "da nang": {
    places: [
      { name: "미케 비치", category: "해변", description: "20km 백사장, 수온 따뜻하고 파도 잔잔해 수영 적합", rating: 4.7 },
      { name: "호이안 구시가지", category: "문화유산", description: "유네스코 세계문화유산, 야간 등불 축제 유명", rating: 4.8 },
      { name: "바나힐", category: "테마파크", description: "1,487m 고지 리조트, 골든 브리지 (손모양 다리) 유명", rating: 4.4 },
      { name: "대리석 산", category: "명소", description: "다섯 개 대리석 언덕에 사원·동굴 밀집, 시내 인접", rating: 4.3 },
      { name: "한 시장", category: "시장", description: "현지인 생활 시장, 과일·의류·기념품 저렴하게 구매", rating: 4.2 },
    ],
    tips: [
      { category: "transport", content: "그랩(Grab) 앱으로 택시 호출 — 미터 조작 없이 투명한 요금" },
      { category: "culture", content: "미꽝(쌀국수)·반미(바게트 샌드위치)·화이트로즈 만두는 다낭·호이안 대표 먹거리" },
      { category: "clothing", content: "26°C 열대 날씨. 모자·자외선 차단제 필수. 해변 이동 시 샌들 편리" },
      { category: "culture", content: "호이안 사원 방문 시 반바지·민소매 금지 — 입구에서 천 대여 가능" },
      { category: "budget", content: "현지 식당 한 끼 2~3만동(1,200~1,800원) 수준으로 매우 저렴" },
    ],
  },
  bangkok: {
    places: [
      { name: "왓 프라깨우", category: "사원", description: "방콕 왕궁 내 황금 사원, 태국 최고의 성지", rating: 4.8 },
      { name: "왓 포", category: "사원", description: "거대한 와불상으로 유명한 방콕 최고 사원", rating: 4.7 },
      { name: "카오산 로드", category: "거리", description: "배낭여행자의 성지, 야시장과 나이트라이프", rating: 4.3 },
      { name: "차투착 주말시장", category: "시장", description: "세계 최대 규모 야외 시장, 8,000개 매장", rating: 4.6 },
      { name: "아시아티크", category: "쇼핑", description: "짜오프라야 강변 야외 쇼핑몰·야시장 복합", rating: 4.5 },
    ],
    tips: [
      { category: "clothing", content: "28~33°C 열대 기후. 반소매 기준이나 사원 방문 시 어깨·무릎 가리는 옷 필수" },
      { category: "transport", content: "BTS 스카이트레인·MRT 지하철 활용. 택시는 미터기 사용 확인 필수" },
      { category: "safety", content: "귀중품 분산 보관, 툭툭 바가지 주의. 음수는 생수 구매 권장" },
      { category: "culture", content: "사원에서 신발 벗기, 국왕 관련 언급 주의 (불경죄 법률 존재)" },
      { category: "budget", content: "길거리 음식 40~80바트, 편의점 식사 100바트 수준으로 저렴" },
    ],
  },
  singapore: {
    places: [
      { name: "마리나 베이 샌즈", category: "랜드마크", description: "세 개 타워 연결 인피니티 풀, 야경 최고", rating: 4.8 },
      { name: "가든스 바이 더 베이", category: "공원", description: "슈퍼트리 야간 조명쇼 무료 관람 (19:45, 20:45)", rating: 4.7 },
      { name: "차이나타운", category: "거리", description: "저렴한 호커센터 밀집, 하이난 치킨라이스 명가", rating: 4.4 },
      { name: "유니버설 스튜디오 싱가포르", category: "테마파크", description: "동남아 최대 테마파크, 리조트 월드 내 위치", rating: 4.5 },
      { name: "클락키", category: "나이트라이프", description: "싱가포르강변 바·레스토랑 밀집, 주말 활기", rating: 4.3 },
    ],
    tips: [
      { category: "transport", content: "이지링크 카드로 MRT·버스 통합 이용. 공항 MRT로 시내까지 30분" },
      { category: "culture", content: "호커센터에서 치킨라이스·락사·차크웨이테오 등 3~5SGD로 해결 가능" },
      { category: "clothing", content: "30°C 열대. 실내 냉방 매우 강함 — 얇은 긴팔 필수 지참" },
      { category: "safety", content: "공공장소 흡연·껌 소지 금지. 무단횡단 벌금 있음 — 법규 준수 필수" },
      { category: "budget", content: "1 SGD ≈ 1,030원. 외식·교통 비싸지만 호커센터 활용 시 절약 가능" },
    ],
  },
  bali: {
    places: [
      { name: "우붓 왕궁", category: "문화유산", description: "바리 힌두 왕조의 궁전, 야간 케착 댄스 공연", rating: 4.6 },
      { name: "따나 롯 사원", category: "사원", description: "인도양 바위 위 힌두 사원, 일몰 명소", rating: 4.7 },
      { name: "쿠타 비치", category: "해변", description: "서핑 초보자 최적, 서핑 강습 1일 코스 인기", rating: 4.4 },
      { name: "스미냑", category: "거리", description: "고급 빌라·레스토랑·부티크 밀집 트렌디 지역", rating: 4.5 },
      { name: "우붓 계단식 논", category: "자연", description: "유네스코 등재 수박 시스템, 트레킹 코스 다양", rating: 4.6 },
    ],
    tips: [
      { category: "transport", content: "그랩·고젝 앱 필수. 오토바이 렌트는 국제면허 및 경험자에 한해 권장" },
      { category: "clothing", content: "30°C 열대. 사원 방문 시 사롱(천) 착용 의무 — 대부분 입구에서 무료 대여" },
      { category: "safety", content: "원숭이 숲에서 음식·안경·핸드폰 노출 주의 — 원숭이가 낚아챌 수 있음" },
      { category: "culture", content: "나시고렝(볶음밥)·미고렝(볶음면)·사테(꼬치) 현지 식당에서 저렴하게 즐기기" },
      { category: "budget", content: "스미냑·짐바란 레스토랑 단가 높음. 우붓 현지 식당은 30,000~60,000루피아 수준" },
    ],
  },
  sydney: {
    places: [
      { name: "시드니 오페라 하우스", category: "랜드마크", description: "세계적 건축 아이콘, 내부 투어·공연 예약 가능", rating: 4.8 },
      { name: "본다이 비치", category: "해변", description: "시드니 대표 해변, 12~2월 남반구 여름 서핑 성수기", rating: 4.7 },
      { name: "서큘러 키", category: "항구", description: "페리 터미널·레스토랑 밀집, 하버 브리지 전망", rating: 4.6 },
      { name: "로열 보타닉 가든", category: "공원", description: "오페라 하우스 인접 무료 정원, 플라잉 폭스 서식", rating: 4.5 },
      { name: "더 록스", category: "거리", description: "시드니 발상지, 주말 마켓·펍 밀집 구시가지", rating: 4.4 },
    ],
    tips: [
      { category: "transport", content: "오팔 카드로 기차·버스·페리 통합 이용. 공항 트레인으로 시내 13분" },
      { category: "clothing", content: "12~2월 여름(25°C), 6~8월 겨울(12°C). 방문 시기에 따라 옷차림 완전히 다름" },
      { category: "culture", content: "피시앤칩스·아보카도 토스트·플랫화이트 커피 — 시드니 식문화 3대 키워드" },
      { category: "budget", content: "외식 단가 높음. 피트 스트리트 마켓·푸드코트 활용 시 15~20 AUD로 해결" },
      { category: "safety", content: "자외선 강함 — SPF50+ 선크림 필수. 여름 해변 젤리피시 주의 안내 확인" },
    ],
  },
  prague: {
    places: [
      { name: "프라하 성", category: "성곽", description: "세계 최대 규모 성채, 성 비투스 성당 내부 필수", rating: 4.8 },
      { name: "카를교", category: "다리", description: "30개 성인 석상이 늘어선 바로크 다리, 야경 압도적", rating: 4.7 },
      { name: "구시가지 광장", category: "광장", description: "천문시계 매시 정각 퍼포먼스, 중세 건물 밀집", rating: 4.6 },
      { name: "비셰흐라드", category: "성채", description: "블타바강 절벽 위 고성, 현지인 피크닉 명소", rating: 4.4 },
      { name: "바츨라프 광장", category: "거리", description: "체코 역사의 현장, 쇼핑·나이트라이프 중심가", rating: 4.3 },
    ],
    tips: [
      { category: "transport", content: "트램·지하철 24시간 티켓 120코루나로 무제한 이용 가능" },
      { category: "culture", content: "굴라시·돼지 무릎 구이(콜레뇨)·트르들로 — 체코 현지 요리 반드시 체험" },
      { category: "budget", content: "유럽 최저 물가권. 펍 맥주 0.5L 50코루나(약 2,800원), 레스토랑 식사 200~350코루나" },
      { category: "clothing", content: "5°C 쌀쌀한 날씨. 두꺼운 코트·방한 레이어링 필수. 석조 도보 많아 편한 신발 권장" },
      { category: "safety", content: "관광지 주변 소매치기 주의. 카를교·구시가지 광장에서 지갑·핸드폰 노출 주의" },
    ],
  },
  barcelona: {
    places: [
      { name: "사그라다 파밀리아", category: "성당", description: "가우디의 미완성 대작, 2026년 완공 예정 — 사전 예약 필수", rating: 4.9 },
      { name: "구엘 공원", category: "공원", description: "가우디 모자이크 테라스, 도심 전망 최고", rating: 4.7 },
      { name: "람블라스 거리", category: "거리", description: "바르셀로나 중심 보행자 거리, 보케리아 시장 인접", rating: 4.5 },
      { name: "바르셀로네타 해변", category: "해변", description: "도심 바로 옆 지중해 백사장, 5~9월 수영 최적", rating: 4.6 },
      { name: "고딕 지구", category: "거리", description: "로마 시대 유적 위에 세운 중세 골목, 타파스 바 밀집", rating: 4.6 },
    ],
    tips: [
      { category: "transport", content: "T-Casual 10회권으로 지하철·버스·트램 통합 이용. 공항 버스 Aerobus 편리" },
      { category: "culture", content: "타파스·파에야·크로케타·하몽 이베리코 — 고딕 지구 바르에서 현지 식사" },
      { category: "clothing", content: "여름 22~30°C, 봄·가을 15~22°C. 자외선 강해 모자·선글라스 필수" },
      { category: "safety", content: "람블라스·바르셀로네타 소매치기 유럽 최고 수준. 가방 앞으로·지갑 앞주머니 보관" },
      { category: "culture", content: "카탈루냐 정체성 강함 — 스페인어보다 카탈루냐어 인사(Hola/Gràcies) 환영받음" },
    ],
  },
};

const FALLBACK_PLACES: { places: Place[]; tips: TravelTip[] } = {
  places: [],
  tips: [],
};

// GET /api/places?city=Bangkok&countryCode=TH
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");
    const countryCode = searchParams.get("countryCode");

    if (!city || !countryCode) {
      return NextResponse.json({ error: "city, countryCode 파라미터가 필요합니다." }, { status: 400 });
    }

    const cityData = PLACES_BY_CITY[city.toLowerCase()] ?? FALLBACK_PLACES;
    const data: PlacesResponse = { places: cityData.places, tips: cityData.tips };
    return NextResponse.json(data);
  } catch (error) {
    console.error("[places] error:", error);
    return NextResponse.json({ error: "관광지 정보를 불러오지 못했습니다." }, { status: 500 });
  }
}
