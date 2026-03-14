"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Destination } from "@/types";

export type CardVariant = "featured" | "row2" | "row3-short" | "row3-tall";

interface DestinationCardProps {
  destination: Destination;
  isSelected?: boolean;
  variant?: CardVariant;
  className?: string;
  imgHeightClass?: string;
  onClick?: (destination: Destination) => void;
}

function formatFlightTime(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

const REGION_LABEL: Record<string, string> = {
  asia: "아시아",
  europe: "유럽",
  americas: "아메리카",
  oceania: "오세아니아",
  all: "",
};

const VARIANT_CONFIG: Record<
  CardVariant,
  {
    imgHeight: string;
    cityFontSize: string;
    cityFontWeight: number;
    rotation: number;
    hover: Record<string, number | string>;
  }
> = {
  featured: {
    imgHeight: "h-[500px]",
    cityFontSize: "64px",
    cityFontWeight: 900,
    rotation: 0,
    hover: { scale: 1.03, y: -6 },
  },
  row2: {
    imgHeight: "h-[280px]",
    cityFontSize: "28px",
    cityFontWeight: 800,
    rotation: -1.5,
    hover: { rotate: 0, scale: 1.05, y: -6 },
  },
  "row3-short": {
    imgHeight: "h-full",
    cityFontSize: "28px",
    cityFontWeight: 800,
    rotation: 1,
    hover: { rotate: 0, scale: 1.04, y: -5 },
  },
  "row3-tall": {
    imgHeight: "h-full",
    cityFontSize: "28px",
    cityFontWeight: 800,
    rotation: -1,
    hover: { rotate: 0, scale: 1.04, y: -5 },
  },
};

export const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function DestinationCard({
  destination,
  isSelected = false,
  variant = "row2",
  className = "",
  imgHeightClass,
  onClick,
}: DestinationCardProps) {
  const cfg = VARIANT_CONFIG[variant];
  const isFeatured = variant === "featured";
  const isFullHeight = variant === "row3-short" || variant === "row3-tall";
  const resolvedImgHeight = imgHeightClass ?? cfg.imgHeight;

  return (
    <motion.div
      variants={cardVariant}
      style={{ rotate: cfg.rotation }}
      whileHover={{
        ...cfg.hover,
        transition: { type: "spring", stiffness: 320, damping: 26 },
      }}
      whileTap={{ scale: 0.97 }}
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(destination)}
      onKeyDown={(e) => e.key === "Enter" && onClick?.(destination)}
      className={`group relative cursor-pointer overflow-hidden rounded-3xl border-l-[3px] border transition-[border-color,box-shadow] duration-300 ${
        isSelected
          ? "border-[#00ff57] border-l-[#00ff57] shadow-[0_0_0_1px_#00ff57,0_20px_60px_rgba(0,255,87,0.25),0_20px_60px_rgba(0,0,0,0.6)]"
          : isFeatured
          ? "border-white/10 border-l-[#00ff57]/50 hover:shadow-[0_32px_80px_rgba(0,0,0,0.75)]"
          : "border-white/8 border-l-white/20 hover:border-l-[#00ff57]/60 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
      } bg-[#111] ${isFullHeight ? "h-full" : ""} ${className}`}
    >
      {/* Image */}
      <div className={`relative ${isFullHeight ? "h-full min-h-[200px]" : resolvedImgHeight} overflow-hidden`}>
        <Image
          src={destination.imageUrl}
          alt={destination.city}
          fill
          sizes={
            isFeatured
              ? "(max-width: 768px) 100vw, 100vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          unoptimized
        />
        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/30 to-transparent" />

        {/* Top-left badges */}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            {REGION_LABEL[destination.region]}
          </span>
          {destination.isNew && (
            <span className="rounded-full bg-[#00ff57] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-black">
              NEW
            </span>
          )}
        </div>

        {/* Flight time — top right */}
        <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
          ✈ {formatFlightTime(destination.flightHoursFromKorea)}
        </span>

        {/* Bottom overlay — city name */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
                {destination.country}
              </p>
              <h3
                className="font-display leading-[0.9] text-white"
                style={{
                  fontSize: cfg.cityFontSize,
                  fontWeight: cfg.cityFontWeight,
                  letterSpacing: isFeatured ? "-0.045em" : "-0.02em",
                  textTransform: "uppercase",
                }}
              >
                {destination.city}
              </h3>
            </div>
            <div className="flex flex-col items-end">
              <span
                className="font-display font-extrabold leading-none tracking-[-0.04em] text-[#00ff57]"
                style={{ fontSize: isFeatured ? "36px" : "28px" }}
              >
                {destination.temperature}°
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/35">
                평균 기온
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card body — only for non-full-height variants */}
      {!isFullHeight && (
        <div className="flex items-center justify-between px-5 py-4">
          <p className="line-clamp-1 flex-1 text-xs leading-relaxed text-white/45">
            {destination.reason}
          </p>
          <div className="ml-4 flex shrink-0 flex-wrap justify-end gap-1.5">
            {destination.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/12 px-2.5 py-[3px] text-[10px] font-medium text-white/40"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
