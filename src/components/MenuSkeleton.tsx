export default function MenuSkeleton({
  count = 6,
  variant = "maroon",
}: {
  count?: number;
  variant?: "maroon" | "light";
}) {
  const cardClass =
    variant === "maroon" ? "menu-card-maroon flex animate-pulse gap-4" : "glass-card flex animate-pulse gap-4 p-5";
  const blockClass =
    variant === "maroon" ? "bg-maple/15" : "bg-[var(--border)]";

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`${cardClass} p-5`}>
          <div className={`h-20 w-20 shrink-0 sm:h-24 sm:w-24 ${blockClass}`} />
          <div className="min-w-0 flex-1 space-y-3 pt-1">
            <div className={`h-5 w-3/4 ${blockClass}`} />
            <div className={`h-3 w-full ${blockClass} opacity-70`} />
            <div className={`h-3 w-2/3 ${blockClass} opacity-50`} />
          </div>
        </div>
      ))}
    </div>
  );
}
