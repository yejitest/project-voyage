type BadgeVariant = "ai" | "visa-free" | "rainy" | "region" | "new";

interface BadgeProps {
  variant: BadgeVariant;
  label: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  "ai": "bg-lime text-black",
  "visa-free": "bg-success-bg text-success-tx",
  "rainy": "bg-warn-bg text-warn-tx",
  "region": "bg-white text-black border border-smoke",
  "new": "bg-lime text-black",
};

const dotStyles: Record<BadgeVariant, string> = {
  "ai": "bg-black",
  "visa-free": "bg-success-tx",
  "rainy": "bg-warn-tx",
  "region": "bg-ash",
  "new": "bg-black",
};

export default function Badge({ variant, label }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-[3px] text-[10px] font-semibold uppercase tracking-[0.06em] ${variantStyles[variant]}`}
    >
      <span className={`h-[5px] w-[5px] rounded-full ${dotStyles[variant]}`} />
      {label}
    </span>
  );
}
