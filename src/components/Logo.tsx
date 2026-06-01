import Link from "next/link";

export default function Logo({
  onClick,
  compact = false,
}: {
  onClick?: () => void;
  compact?: boolean;
}) {
  return (
    <Link
      href="#home"
      onClick={onClick}
      className="group inline-flex shrink-0 flex-col leading-none"
      aria-label="Loop Pub"
    >
      <span
        className={`font-display font-bold tracking-[0.18em] text-ink transition-colors duration-500 group-hover:text-gold ${
          compact ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
        }`}
      >
        LOOP
      </span>
      <span
        className={`mt-0.5 flex items-center gap-1.5 font-display font-medium tracking-[0.4em] text-gold ${
          compact ? "text-xs md:text-sm" : "text-sm md:text-base"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
        PUB
      </span>
    </Link>
  );
}
