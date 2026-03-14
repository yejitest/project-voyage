"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { WeatherData } from "@/types";

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const minT = -10, maxT = 45;
  const pct = Math.max(0, Math.min(1, (weather.temperature - minT) / (maxT - minT)));
  const angle = pct * 180;

  const cx = 60, cy = 60, r = 44;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const arcX = (deg: number) => cx + r * Math.cos(toRad(180 + deg));
  const arcY = (deg: number) => cy + r * Math.sin(toRad(180 + deg));

  const trackPath = `M ${arcX(0)} ${arcY(0)} A ${r} ${r} 0 0 1 ${arcX(180)} ${arcY(180)}`;
  const fillPath = `M ${arcX(0)} ${arcY(0)} A ${r} ${r} 0 0 1 ${arcX(angle)} ${arcY(angle)}`;

  return (
    <div className="rounded-2xl border border-black/8 bg-[#f7f7f7] p-5">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
        현재 날씨
      </p>

      <div className="flex justify-center">
        <svg width="120" height="68" viewBox="0 0 120 68">
          <path d={trackPath} stroke="#e0e0e0" strokeWidth="6" fill="none" strokeLinecap="round" />
          {mounted && (
            <motion.path
              d={fillPath}
              stroke="#39ff14"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            />
          )}
          {mounted && (
            <motion.circle
              cx={arcX(angle)}
              cy={arcY(angle)}
              r="5"
              fill="#000"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.3, type: "spring", stiffness: 500 }}
            />
          )}
          <text x="60" y="58" textAnchor="middle" fontSize="18" fontWeight="800" fill="#000000" fontFamily="sans-serif">
            {weather.temperature}°
          </text>
        </svg>
      </div>

      <p className="mt-1 text-center text-xs text-black/45">
        {weather.description} · 습도 {weather.humidity}%
      </p>
      {weather.isRainySeason && (
        <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-black/10 bg-black/5 px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.06em] text-black/60">
          <span className="h-[5px] w-[5px] rounded-full bg-black/40" />
          우기 주의
        </span>
      )}
    </div>
  );
}
