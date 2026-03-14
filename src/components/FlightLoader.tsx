"use client";

import { motion } from "framer-motion";

interface FlightLoaderProps {
  destinationName?: string;
}

export default function FlightLoader({ destinationName }: FlightLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      {/* SVG arc path with animated plane */}
      <div className="relative w-full max-w-sm">
        <svg
          viewBox="0 0 360 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          {/* Dashed arc path */}
          <motion.path
            d="M 20 95 Q 180 -20 340 95"
            stroke="#6840FF"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Origin dot — Seoul */}
          <motion.circle
            cx="20"
            cy="95"
            r="4"
            fill="#6840FF"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
          />
          <motion.text
            x="24"
            y="112"
            fontSize="8"
            fill="#888886"
            fontFamily="sans-serif"
            letterSpacing="0.05em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            ICN · 서울
          </motion.text>

          {/* Destination dot */}
          <motion.circle
            cx="340"
            cy="95"
            r="4"
            fill="#A1FF62"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.4, type: "spring", stiffness: 400 }}
          />
          <motion.text
            x="304"
            y="112"
            fontSize="8"
            fill="#888886"
            fontFamily="sans-serif"
            letterSpacing="0.05em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {destinationName ?? "목적지"}
          </motion.text>

          {/* Animated airplane along the arc */}
          <motion.g
            initial={{ offsetDistance: "0%" } as Record<string, unknown>}
            animate={{ offsetDistance: "100%" } as Record<string, unknown>}
            transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
            style={
              {
                offsetPath: "path('M 20 95 Q 180 -20 340 95')",
                offsetRotate: "auto",
              } as React.CSSProperties
            }
          >
            {/* Plane icon */}
            <text
              x="-10"
              y="5"
              fontSize="18"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              ✈
            </text>
          </motion.g>
        </svg>
      </div>

      {/* Loading text with pulsing dots */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 flex items-center gap-1.5"
      >
        <span className="font-display text-sm font-semibold tracking-[-0.01em] text-[#888886]">
          여행지 탐색 중
        </span>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1 w-1 rounded-full bg-[#6840FF]"
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.18,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
