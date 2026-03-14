"use client";

import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import type { ExchangeData } from "@/types";

interface ExchangeCardProps {
  exchange: ExchangeData;
}

function AnimatedNumber({ value }: { value: number }) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });
  const display = useTransform(spring, (v) => v.toFixed(1));

  useEffect(() => {
    mv.set(value);
  }, [value, mv]);

  return <motion.span>{display}</motion.span>;
}

export default function ExchangeCard({ exchange }: ExchangeCardProps) {
  const krwAmount = 10000;
  const localAmount = krwAmount / exchange.ratePerKRW;

  return (
    <div className="rounded-2xl border border-black/8 bg-[#f7f7f7] p-5">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
        환율
      </p>

      <p className="font-display text-2xl font-extrabold tracking-[-0.025em] text-black">
        {exchange.symbol}1 ≈{" "}
        <AnimatedNumber value={exchange.ratePerKRW} />원
      </p>
      <p className="mt-0.5 mb-4 text-xs text-black/40">
        {exchange.currencyName} ({exchange.currency})
      </p>

      <div>
        <div className="mb-1.5 flex items-center justify-between text-[10px] text-black/40">
          <span>₩10,000</span>
          <span>{exchange.symbol}{localAmount.toFixed(0)}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-black to-[#39ff14]"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}
