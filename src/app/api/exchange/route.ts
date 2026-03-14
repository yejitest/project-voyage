import { NextRequest, NextResponse } from "next/server";
import type { ExchangeData, ExchangeResponse } from "@/types";

// Per-currency mock exchange data (KRW → foreign currency rate: how many units of foreign per 1 KRW)
const EXCHANGE_BY_CURRENCY: Record<string, ExchangeData> = {
  JPY: {
    currency: "JPY",
    currencyName: "일본 엔",
    ratePerKRW: 0.109,
    symbol: "¥",
  },
  THB: {
    currency: "THB",
    currencyName: "태국 바트",
    ratePerKRW: 0.026,
    symbol: "฿",
  },
  VND: {
    currency: "VND",
    currencyName: "베트남 동",
    ratePerKRW: 17.4,
    symbol: "₫",
  },
  IDR: {
    currency: "IDR",
    currencyName: "인도네시아 루피아",
    ratePerKRW: 5.8,
    symbol: "Rp",
  },
  SGD: {
    currency: "SGD",
    currencyName: "싱가포르 달러",
    ratePerKRW: 0.00097,
    symbol: "S$",
  },
  MYR: {
    currency: "MYR",
    currencyName: "말레이시아 링깃",
    ratePerKRW: 0.003,
    symbol: "RM",
  },
  PHP: {
    currency: "PHP",
    currencyName: "필리핀 페소",
    ratePerKRW: 0.041,
    symbol: "₱",
  },
  HKD: {
    currency: "HKD",
    currencyName: "홍콩 달러",
    ratePerKRW: 0.0057,
    symbol: "HK$",
  },
  EUR: {
    currency: "EUR",
    currencyName: "유로",
    ratePerKRW: 0.00067,
    symbol: "€",
  },
  CZK: {
    currency: "CZK",
    currencyName: "체코 코루나",
    ratePerKRW: 0.0164,
    symbol: "Kč",
  },
  GBP: {
    currency: "GBP",
    currencyName: "영국 파운드",
    ratePerKRW: 0.00057,
    symbol: "£",
  },
  AUD: {
    currency: "AUD",
    currencyName: "호주 달러",
    ratePerKRW: 0.0011,
    symbol: "A$",
  },
  NZD: {
    currency: "NZD",
    currencyName: "뉴질랜드 달러",
    ratePerKRW: 0.0012,
    symbol: "NZ$",
  },
  USD: {
    currency: "USD",
    currencyName: "미국 달러",
    ratePerKRW: 0.00073,
    symbol: "$",
  },
  MXN: {
    currency: "MXN",
    currencyName: "멕시코 페소",
    ratePerKRW: 0.0147,
    symbol: "MX$",
  },
};

const FALLBACK_EXCHANGE: ExchangeData = {
  currency: "USD",
  currencyName: "미국 달러",
  ratePerKRW: 0.00073,
  symbol: "$",
};

// GET /api/exchange?currency=THB
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const currency = searchParams.get("currency");

    if (!currency) {
      return NextResponse.json({ error: "currency 파라미터가 필요합니다." }, { status: 400 });
    }

    const exchangeData = EXCHANGE_BY_CURRENCY[currency.toUpperCase()] ?? FALLBACK_EXCHANGE;
    const data: ExchangeResponse = { data: exchangeData };
    return NextResponse.json(data);
  } catch (error) {
    console.error("[exchange] error:", error);
    return NextResponse.json({ error: "환율 정보를 불러오지 못했습니다." }, { status: 500 });
  }
}
