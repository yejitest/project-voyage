import type { TravelTip } from "@/types";

interface TravelTipsCardProps {
  tips: TravelTip[];
}

const CATEGORY_LABEL: Record<TravelTip["category"], string> = {
  clothing: "👗 복장",
  safety: "⚠️ 안전",
  transport: "🚌 교통",
  culture: "🏛 문화",
  budget: "💰 예산",
};

export default function TravelTipsCard({ tips }: TravelTipsCardProps) {
  return (
    <div className="rounded-[20px] border border-black/8 bg-[#f7f7f7] p-6">
      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
        💡 여행 팁
      </p>
      {tips.length === 0 ? (
        <p className="text-sm text-black/40">여행 팁을 불러오는 중...</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {tips.map((tip, i) => (
            <li key={i} className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-black/40">
                {CATEGORY_LABEL[tip.category]}
              </span>
              <p className="text-sm leading-relaxed text-black/65">{tip.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
