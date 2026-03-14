"use client";

import { motion } from "framer-motion";
import type { Place } from "@/types";

interface PlacesCardProps {
  places: Place[];
}

const PLACE_COLORS = ["#000000", "#39ff14", "#000000", "#39ff14", "#000000"];

export default function PlacesCard({ places }: PlacesCardProps) {
  return (
    <div className="rounded-[20px] border border-black/8 bg-[#f7f7f7] p-6">
      <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
        추천 관광지
      </p>
      {places.length === 0 ? (
        <p className="text-sm text-black/40">관광지 정보를 불러오는 중...</p>
      ) : (
        <div className="relative">
          <div className="absolute left-[10px] top-3 bottom-3 w-px overflow-hidden">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-black via-[#39ff14] to-black"
              initial={{ scaleY: 0, originY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>

          <ul className="flex flex-col gap-5 pl-7">
            {places.map((place, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.12, ease: "easeOut" }}
                className="relative"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.12, type: "spring", stiffness: 500 }}
                  className="absolute -left-7 top-[3px] flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black"
                  style={{
                    backgroundColor: PLACE_COLORS[i % PLACE_COLORS.length],
                    color: PLACE_COLORS[i % PLACE_COLORS.length] === "#39ff14" ? "#000" : "#fff",
                  }}
                >
                  {i + 1}
                </motion.span>
                <div>
                  <p className="text-sm font-bold text-black">{place.name}</p>
                  <p className="mt-0.5 text-xs text-black/45">
                    {place.category} · {place.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
