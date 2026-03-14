interface SpinnerProps {
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-[3px]",
};

export default function Spinner({ size = "md" }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="로딩 중"
      className={`animate-spin rounded-full border-smoke border-t-black ${sizeStyles[size]}`}
    />
  );
}
