"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DateRange, Destination, DestinationDetail, TripInfo } from "@/types";
import { computeTripInfo } from "@/hooks/useDateRange";
import { fetchRecommendations } from "@/hooks/useRecommendations";
import { fetchDestinationDetail } from "@/hooks/useDestinationDetail";
import Navbar from "@/components/Navbar";
import DateRangePicker from "@/components/calendar/DateRangePicker";
import TripSummary from "@/components/calendar/TripSummary";
import DestinationGrid from "@/components/destination/DestinationGrid";
import DetailPanel from "@/components/destination/DetailPanel";
import FlightLoader from "@/components/FlightLoader";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function HomeClient() {
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [tripInfo, setTripInfo] = useState<TripInfo | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [detail, setDetail] = useState<DestinationDetail | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    setTripInfo(computeTripInfo(range));
    setShowRecommendations(false);
    setIsLoadingRecs(false);
    setSelectedDestination(null);
    setDetail(null);
    setFilteredDestinations([]);
  };

  const handleRecommend = async () => {
    if (!tripInfo) return;
    setIsLoadingRecs(true);
    setShowRecommendations(false);
    setSelectedDestination(null);
    setDetail(null);
    setTimeout(() => {
      document.getElementById("recommendations")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
    try {
      const destinations = await fetchRecommendations(tripInfo);
      setFilteredDestinations(destinations);
    } catch (e) {
      console.error(e);
      setFilteredDestinations([]);
    } finally {
      setIsLoadingRecs(false);
      setShowRecommendations(true);
      setTimeout(() => {
        document.getElementById("recommendations")?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  };

  const handleSelectDestination = async (destination: Destination) => {
    setSelectedDestination(destination);
    setDetail(null);
    setIsLoadingDetail(true);
    setTimeout(() => {
      document.getElementById("detail-panel")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
    try {
      const detailData = await fetchDestinationDetail(destination);
      setDetail(detailData);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const handleCloseDetail = () => {
    setSelectedDestination(null);
    setDetail(null);
  };


  return (
    <main className="min-h-screen bg-white">

      <Navbar />

      {/* ── Hero Section — pure white ─────────────────── */}
      <section className="relative overflow-hidden bg-white px-6 pt-[120px] pb-[120px] sm:px-10">

        {/* Ghost background text — VOYAGE */}
        <span
          className="ghost-text pointer-events-none absolute left-[-1%] top-[-6%] select-none"
          style={{ fontSize: "20vw", color: "rgba(0,0,0,0.05)" }}
          aria-hidden="true"
        >
          VOYAGE
        </span>

        <div className="relative mx-auto max-w-4xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* Overline — English label */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ fontSize: "11px", letterSpacing: "0.2em", opacity: 0.5 }}
              className="mb-6 font-bold uppercase text-black"
            >
              TRAVEL CURATION · AI-POWERED
            </motion.p>

            {/* Hero heading — "Just" light, "Go." heavy green */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-10"
            >
              <h1
                className="font-display"
                style={{
                  fontSize: "min(18vw, 160px)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                }}
              >
                <span style={{ fontWeight: 300, color: "#000" }}>Just</span>
                <br />
                <span style={{ fontWeight: 900, color: "#00ff57" }}>Go.</span>
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-12 flex flex-col gap-10"
            >
              <p className="font-body text-[15px] leading-[1.8] text-black/50">
                일정만 고르면 됩니다.<br />
                비행 시간 고려해서 진짜 갈 수 있는 여행지만 추려드립니다.
              </p>

              {/* Big 3-stat row */}
              <div className="flex items-start gap-10 sm:gap-16">
                <div>
                  <p className="font-display font-bold leading-none tracking-[-0.04em] text-black" style={{ fontSize: "48px" }}>
                    2,400<span className="text-[#00ff57]">+</span>
                  </p>
                  <p className="mt-1.5 text-[12px] text-black/50">여행지</p>
                </div>
                <div className="h-16 w-px bg-black/10 self-center" />
                <div>
                  <p className="font-display font-bold leading-none tracking-[-0.04em] text-black" style={{ fontSize: "48px" }}>
                    98<span className="text-[#00ff57]">%</span>
                  </p>
                  <p className="mt-1.5 text-[12px] text-black/50">만족도</p>
                </div>
                <div className="h-16 w-px bg-black/10 self-center" />
                <div>
                  <p className="font-display font-bold leading-none tracking-[-0.04em] text-black" style={{ fontSize: "48px" }}>
                    AI
                  </p>
                  <p className="mt-1.5 text-[12px] text-black/50">큐레이션</p>
                </div>
              </div>
            </motion.div>

            {/* DateRangePicker */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <DateRangePicker
                dateRange={dateRange}
                onDateRangeChange={handleDateRangeChange}
                tripInfo={tripInfo}
              />
            </motion.div>

            {/* TripSummary */}
            {tripInfo && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="mt-4"
              >
                <TripSummary tripInfo={tripInfo} onRecommend={handleRecommend} />
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Marquee ticker — always visible divider ───── */}
      <div className="overflow-hidden bg-black py-[12px]" aria-hidden="true">
        <div className="animate-marquee flex whitespace-nowrap">
          {[0, 1].map((i) => (
            <span key={i} className="flex shrink-0 items-center gap-0">
              {["JUST GO", "VOYAGE", "어디든", "EXPLORE", "떠나자", "DISCOVER", "여행", "GO NOW"].map((word) => (
                <span key={word} className="mx-8 font-display text-[13px] font-bold uppercase tracking-[0.18em] text-white">
                  {word}
                  <span className="mx-8 text-[#00ff57]">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── Loading / Recommendation Section — pure black ── */}
      <AnimatePresence mode="wait">
        {isLoadingRecs && (
          <motion.section
            key="loader"
            id="recommendations"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="dark bg-black px-6 py-16 sm:px-10"
          >
            <div className="mx-auto max-w-2xl">
              <FlightLoader destinationName={tripInfo ? `${tripInfo.nights}박 최적지` : undefined} />
            </div>
          </motion.section>
        )}

        {showRecommendations && (
          <motion.section
            key="grid"
            id="recommendations"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="dark bg-black px-6 py-[120px] sm:px-10"
          >
            <div className="mx-auto max-w-4xl">
              <DestinationGrid
                destinations={filteredDestinations}
                nights={tripInfo?.nights ?? 0}
                selectedId={selectedDestination?.id ?? null}
                onSelect={handleSelectDestination}
                isLoading={isLoadingRecs}
              />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Detail Panel ────────────────────────────── */}
      <div id="detail-panel">
        <DetailPanel
          detail={detail}
          isLoading={isLoadingDetail}
          onClose={handleCloseDetail}
        />
      </div>
    </main>
  );
}
