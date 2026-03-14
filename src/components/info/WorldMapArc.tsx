"use client";

import { motion } from "framer-motion";

interface WorldMapArcProps {
  destinationId: string;
  cityEn: string;
  flightHours?: number;
}

// Equirectangular projection: 1000×500 viewBox
// x = (lon + 180) / 360 * 1000
// y = (90 - lat)  / 180 * 500
function ll(lon: number, lat: number): [number, number] {
  return [
    parseFloat(((lon + 180) / 360 * 1000).toFixed(1)),
    parseFloat(((90 - lat)  / 180 * 500).toFixed(1)),
  ];
}

function pts(coords: [number, number][]): string {
  return coords.map(([x, y]) => `${x},${y}`).join(" ");
}

// Simplified continent outlines (lon, lat) → pixel polygons
const CONTINENT_POLYGONS: [number, number][][] = [
  // North America
  [
    ll(-168,71), ll(-130,65), ll(-123,49), ll(-117,32), ll(-109,22),
    ll(-83,10),  ll(-80,25),  ll(-80,36),  ll(-74,40),  ll(-66,44),
    ll(-54,47),  ll(-56,60),  ll(-77,72),  ll(-120,73), ll(-140,75),
  ],
  // South America
  [
    ll(-80,10),  ll(-62,12),  ll(-34,-4),  ll(-40,-23), ll(-57,-36),
    ll(-68,-56), ll(-75,-50), ll(-81,-5),
  ],
  // Greenland
  [
    ll(-45,60), ll(-15,72), ll(-15,84), ll(-42,84),
    ll(-60,77), ll(-60,65),
  ],
  // Europe
  [
    ll(-9,36), ll(28,38),  ll(30,60),  ll(25,71),
    ll(15,71), ll(5,58),   ll(-2,51),  ll(-5,36),
  ],
  // Africa
  [
    ll(-5,35),  ll(35,38),  ll(50,12),   ll(45,-10), ll(36,-25),
    ll(30,-35), ll(18,-35), ll(15,-18),  ll(10,5),   ll(-18,14),
  ],
  // Asia (main landmass)
  [
    ll(28,38),   ll(55,38),  ll(60,45),  ll(90,45),  ll(100,30),
    ll(120,32),  ll(130,45), ll(145,45), ll(145,35), ll(132,30),
    ll(120,22),  ll(110,20), ll(100,10), ll(80,10),  ll(60,22),
    ll(50,12),   ll(35,38),
  ],
  // Southeast Asia / Malay Peninsula
  [
    ll(100,20), ll(110,20), ll(106,1),  ll(100,-5),
    ll(115,-8), ll(122,0),  ll(125,5),  ll(112,8),
  ],
  // Australia
  [
    ll(115,-22), ll(130,-17), ll(140,-15), ll(150,-22),
    ll(153,-28), ll(150,-38), ll(138,-38), ll(130,-32),
    ll(115,-34), ll(113,-26),
  ],
  // New Zealand (South Island)
  [ll(168,-46), ll(174,-41), ll(172,-45), ll(167,-46)],
  // Japan (Honshu, simplified)
  [ll(130,31), ll(131,34), ll(136,35), ll(141,40), ll(141,36), ll(137,35), ll(135,34), ll(131,33)],
  // British Isles
  [ll(-5,50), ll(-3,56), ll(-6,58), ll(-5,50)],
  // Iceland
  [ll(-24,64), ll(-13,66), ll(-14,63), ll(-22,63)],
  // Madagascar
  [ll(43,-12), ll(50,-14), ll(49,-25), ll(44,-24)],
  // Sri Lanka
  [ll(80,10), ll(81,8), ll(82,9), ll(80,10)],
];

const CITY_COORDS: Record<string, [number, number]> = {
  osaka:     ll(135.5,  34.7),
  tokyo:     ll(139.7,  35.7),
  hongkong:  ll(114.2,  22.3),
  danang:    ll(108.2,  16.1),
  bangkok:   ll(100.5,  13.75),
  singapore: ll(103.8,   1.35),
  bali:      ll(115.2,  -8.7),
  sydney:    ll(151.2, -33.9),
  prague:    ll( 14.4,  50.1),
  barcelona: ll(  2.2,  41.4),
};

const SEOUL = ll(126.97, 37.56);

function formatFlightTime(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m > 0 ? `${h}시간 ${m}분` : `${h}시간`;
}

function getArcPath(from: [number, number], to: [number, number]): string {
  const mx = (from[0] + to[0]) / 2;
  const my = (from[1] + to[1]) / 2;
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const dist = Math.sqrt(dx * dx + dy * dy);
  const arcH = Math.min(dist * 0.42, 160);
  return `M ${from[0]} ${from[1]} Q ${mx} ${my - arcH} ${to[0]} ${to[1]}`;
}

export default function WorldMapArc({ destinationId, cityEn, flightHours }: WorldMapArcProps) {
  const destCoord = CITY_COORDS[destinationId] ?? CITY_COORDS["tokyo"];
  const arcPath = getArcPath(SEOUL, destCoord);

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-border bg-[#0D0D0D]">
      {/* Header row */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#888886]">
          서울 ICN → {cityEn}
        </p>
        {flightHours !== undefined && (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-[0.14em] text-[#555553]">비행시간</span>
            <span className="rounded-full bg-[#6840FF]/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#6840FF]">
              ✈ {formatFlightTime(flightHours)}
            </span>
          </div>
        )}
      </div>

      {/* SVG world map */}
      <svg
        viewBox="0 0 1000 500"
        className="w-full"
        style={{ height: "auto", maxHeight: 360, display: "block" }}
      >
        {/* Ocean */}
        <rect width="1000" height="500" fill="#101010" />

        {/* Subtle grid */}
        {[0, 125, 250, 375, 500, 625, 750, 875, 1000].map((x) => (
          <line key={`v${x}`} x1={x} y1={0} x2={x} y2={500} stroke="#191919" strokeWidth="0.5" />
        ))}
        {[0, 125, 250, 375, 500].map((y) => (
          <line key={`h${y}`} x1={0} y1={y} x2={1000} y2={y} stroke="#191919" strokeWidth="0.5" />
        ))}
        {/* Equator */}
        <line x1={0} y1={250} x2={1000} y2={250} stroke="#1E1E1E" strokeWidth="1" />
        {/* Prime meridian */}
        <line x1={500} y1={0} x2={500} y2={500} stroke="#1E1E1E" strokeWidth="1" />

        {/* Continent fills */}
        {CONTINENT_POLYGONS.map((coords, i) => (
          <polygon
            key={i}
            points={pts(coords)}
            fill="#1D1D1D"
            stroke="#2C2C2C"
            strokeWidth="0.7"
            strokeLinejoin="round"
          />
        ))}

        {/* Arc shadow */}
        <path
          d={arcPath}
          stroke="#2E2B2B"
          strokeWidth="2"
          strokeDasharray="6 5"
          fill="none"
        />

        {/* Arc animated line */}
        <motion.path
          d={arcPath}
          stroke="#6840FF"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
        />

        {/* Animated plane along arc */}
        <motion.g
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          initial={{ offsetDistance: "0%" } as any}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          animate={{ offsetDistance: "100%" } as any}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number], delay: 0.3 }}
          style={
            {
              offsetPath: `path('${arcPath}')`,
              offsetRotate: "auto",
            } as React.CSSProperties
          }
        >
          <text x="-10" y="6" fontSize="18" textAnchor="middle" dominantBaseline="middle">
            ✈
          </text>
        </motion.g>

        {/* Seoul origin */}
        <motion.circle
          cx={SEOUL[0]} cy={SEOUL[1]} r="5" fill="#6840FF"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400 }}
        />
        <motion.circle
          cx={SEOUL[0]} cy={SEOUL[1]} r="12" fill="transparent"
          stroke="#6840FF" strokeWidth="1.2"
          initial={{ scale: 0, opacity: 0.7 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 0.6 }}
        />
        <text
          x={SEOUL[0] + 9} y={SEOUL[1] - 9}
          fontSize="10" fill="#888886" fontFamily="sans-serif" fontWeight="600"
        >
          ICN
        </text>

        {/* Destination */}
        <motion.circle
          cx={destCoord[0]} cy={destCoord[1]} r="5" fill="#A1FF62"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 1.6, type: "spring", stiffness: 400 }}
        />
        <motion.circle
          cx={destCoord[0]} cy={destCoord[1]} r="12" fill="transparent"
          stroke="#A1FF62" strokeWidth="1.2"
          initial={{ scale: 0, opacity: 0.7 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 2.1 }}
        />
        <motion.text
          x={destCoord[0] + 9} y={destCoord[1] - 9}
          fontSize="10" fill="#A1FF62" fontFamily="sans-serif" fontWeight="600"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
        >
          {cityEn}
        </motion.text>
      </svg>
    </div>
  );
}
