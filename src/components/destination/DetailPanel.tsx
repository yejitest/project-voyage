"use client";

import { motion } from "framer-motion";
import type { DestinationDetail } from "@/types";
import WeatherCard from "@/components/info/WeatherCard";
import ExchangeCard from "@/components/info/ExchangeCard";
import PlacesCard from "@/components/info/PlacesCard";
import TravelTipsCard from "@/components/info/TravelTipsCard";
import WorldMapArc from "@/components/info/WorldMapArc";

interface DetailPanelProps {
  detail?: DestinationDetail | null;
  isLoading?: boolean;
  onClose?: () => void;
}

const REGION_LABEL: Record<string, string> = {
  asia: "아시아",
  europe: "유럽",
  americas: "아메리카",
  oceania: "오세아니아",
  all: "",
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

export default function DetailPanel({
  detail = null,
  isLoading = false,
  onClose,
}: DetailPanelProps) {
  if (!detail && !isLoading) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="bg-white px-6 py-20 sm:px-10"
    >
      <div className="mx-auto max-w-4xl">

        {/* ── Header ─────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mb-12 flex items-start justify-between"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.45 }}>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-black/35">
              {detail?.destination.country} · {REGION_LABEL[detail?.destination.region ?? "asia"]}
            </p>
            <h2
              className="font-display font-extrabold leading-[0.86] tracking-[-0.055em] text-black"
              style={{ fontSize: "clamp(40px, 8vw, 72px)" }}
            >
              {detail?.destination.city}
            </h2>
            <p className="mt-2 text-sm text-black/45">
              {detail?.destination.cityEn} · {detail?.destination.country}
            </p>

            {/* Tags */}
            {detail?.destination.tags && (
              <div className="mt-5 flex flex-wrap gap-2">
                {detail.destination.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.85, y: 4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.3 }}
                    className="rounded-full border border-black/10 bg-black/4 px-3 py-1.5 text-xs font-semibold text-black/55"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>

          {onClose && (
            <motion.button
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-black/40 transition-colors duration-150 hover:border-black hover:text-black"
              aria-label="닫기"
            >
              ✕
            </motion.button>
          )}
        </motion.div>

        {/* ── World Map — full width ─────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.45 }}
          className="mb-6"
        >
          <WorldMapArc
            destinationId={detail?.destination.id ?? "tokyo"}
            cityEn={detail?.destination.cityEn ?? ""}
            flightHours={detail?.destination.flightHoursFromKorea}
          />
        </motion.div>

        {/* ── Info Cards ─────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mb-8"
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {detail?.weather && (
              <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
                <WeatherCard weather={detail.weather} />
              </motion.div>
            )}
            {detail?.exchange && (
              <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
                <ExchangeCard exchange={detail.exchange} />
              </motion.div>
            )}

            {/* Visa card */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-black/8 bg-[#f7f7f7] p-5"
            >
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                비자
              </p>
              <p className="font-display text-2xl font-extrabold tracking-[-0.03em] text-black">
                무비자
              </p>
              <p className="mt-0.5 text-xs text-black/40">한국 여권 기준</p>
            </motion.div>

            {/* Temperature card */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-black/8 bg-[#f7f7f7] p-5"
            >
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                평균 기온
              </p>
              <p className="font-display text-2xl font-extrabold tracking-[-0.03em] text-[#39ff14]"
                 style={{ WebkitTextStroke: "1px #000", textShadow: "none" }}>
                <span className="text-black">{detail?.destination.temperature}</span>
                <span className="text-[#39ff14]">°C</span>
              </p>
              <p className="mt-0.5 text-xs text-black/40">해당 월 기준</p>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Places & Tips ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <PlacesCard places={detail?.places ?? []} />
          <TravelTipsCard tips={detail?.tips ?? []} />
        </motion.div>

        {/* ── Reason banner ───────────────────────────── */}
        {detail?.destination.reason && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.4 }}
            className="mt-6 rounded-2xl border border-[#39ff14]/30 bg-[rgba(57,255,20,0.06)] p-6"
          >
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black/50">
              ✦ 추천 이유
            </p>
            <p className="text-sm leading-relaxed text-black/70">
              {detail.destination.reason}
            </p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
