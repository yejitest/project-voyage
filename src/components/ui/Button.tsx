import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "accent" | "lime" | "secondary" | "ghost";
type Size = "sm" | "default" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-black text-white hover:bg-[#222] hover:-translate-y-px shadow-[0_2px_12px_rgba(0,0,0,0.2)]",
  accent:
    "bg-[#39ff14] text-black font-black hover:shadow-[0_0_24px_rgba(57,255,20,0.5)] hover:-translate-y-px",
  lime:
    "bg-[#39ff14] text-black font-black hover:shadow-[0_0_20px_rgba(57,255,20,0.45)] hover:-translate-y-px",
  secondary:
    "bg-transparent text-black border-2 border-black hover:bg-black hover:text-white",
  ghost:
    "bg-transparent text-white border-2 border-white/25 hover:border-white hover:text-white",
};

const sizeStyles: Record<Size, string> = {
  sm: "text-xs px-[16px] py-[8px]",
  default: "text-sm px-[22px] py-[11px]",
  lg: "text-[15px] px-9 py-[15px]",
};

export default function Button({
  variant = "primary",
  size = "default",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold transition-all duration-150 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
