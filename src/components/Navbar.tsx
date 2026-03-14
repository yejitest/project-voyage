"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 flex h-14 items-center justify-between bg-black px-6 sm:px-8">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <span className="font-display text-[18px] font-extrabold tracking-[-0.04em] text-white">
          Voyagé
        </span>
        <span className="hidden rounded-full border border-white/20 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-white/40 sm:block">
          여행 큐레이터
        </span>
      </div>

      {/* Theme toggle — ghost pill */}
      {mounted && (
        <motion.button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 420, damping: 22 }}
          className="flex items-center gap-2 rounded-full border border-white/25 px-4 py-1.5 text-[11px] font-semibold text-white/60 transition-colors duration-200 hover:border-[#39ff14] hover:text-[#39ff14]"
          aria-label="테마 전환"
        >
          {theme === "dark" ? "☀ 라이트" : "☾ 다크"}
        </motion.button>
      )}
    </nav>
  );
}
