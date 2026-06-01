export default function MenuSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      aria-hidden
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="glass-card flex animate-pulse gap-4 p-5"
        >
          <div className="h-20 w-20 shrink-0 rounded-sm bg-[var(--border)] sm:h-24 sm:w-24" />
          <div className="min-w-0 flex-1 space-y-3 pt-1">
            <div className="h-5 w-3/4 rounded bg-[var(--border)]" />
            <div className="h-3 w-full rounded bg-[var(--border)]/70" />
            <div className="h-3 w-2/3 rounded bg-[var(--border)]/50" />
          </div>
        </div>
      ))}
    </div>
  );
}
