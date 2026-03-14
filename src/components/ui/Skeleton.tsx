interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div className={`animate-pulse rounded-lg bg-white/8 ${className}`} />
  );
}

export function DestinationCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/8 bg-white/4">
      <Skeleton className="h-[220px] rounded-none" />
      <div className="p-5">
        <Skeleton className="mb-2 h-5 w-24" />
        <Skeleton className="mb-3 h-3 w-16" />
        <Skeleton className="mb-1 h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}
