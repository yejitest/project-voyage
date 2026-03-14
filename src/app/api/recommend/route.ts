import { NextRequest, NextResponse } from "next/server";
import type { TripInfo, RecommendResponse } from "@/types";
import { getFilteredByNights } from "@/lib/mockData";

// POST /api/recommend
// Body: TripInfo
// Returns: RecommendResponse (Destination[])
export async function POST(req: NextRequest) {
  try {
    const tripInfo: TripInfo = await req.json();
    const destinations = getFilteredByNights(tripInfo.nights);
    const data: RecommendResponse = { destinations };
    return NextResponse.json(data);
  } catch (error) {
    console.error("[recommend] error:", error);
    return NextResponse.json({ error: "추천을 불러오지 못했습니다." }, { status: 500 });
  }
}
