export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-base-300 bg-base-100 p-5 h-[152px] animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="h-4 w-28 rounded bg-base-300" />
        <div className="h-5 w-16 rounded-full bg-base-300" />
      </div>
      <div className="h-3 w-full rounded bg-base-300 mb-2" />
      <div className="h-3 w-4/5 rounded bg-base-300 mb-5" />
      <div className="flex gap-2">
        <div className="h-5 w-14 rounded-full bg-base-300" />
        <div className="h-5 w-18 rounded-full bg-base-300" />
        <div className="h-5 w-12 rounded-full bg-base-300" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
