import Link from "next/link";

export default function Logo({
  onClick,
  compact = false,
  light = false,
}: {
  onClick?: () => void;
  compact?: boolean;
  light?: boolean;
}) {
  const textClass = light
    ? "text-maple group-hover:text-maple-dark"
    : "text-maroon group-hover:text-maroon-light";

  return (
    <Link
      href="#home"
      onClick={onClick}
      className="group inline-flex shrink-0 flex-col items-center leading-none"
      aria-label="Loop Pub — Tokat"
    >
      <span
        className={`font-display font-normal tracking-[0.08em] transition-colors duration-300 ${textClass} ${
          compact ? "text-2xl" : "text-3xl md:text-4xl"
        }`}
      >
        Loop
      </span>
      <span
        className={`mt-0.5 font-body text-[10px] font-light uppercase tracking-[0.45em] transition-colors duration-300 ${
          light ? "text-maple/80" : "text-maroon/70"
        } ${compact ? "text-[8px]" : ""}`}
      >
        Pub
      </span>
    </Link>
  );
}
