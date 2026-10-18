import Link from "next/link";

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ArrowButton({
  href,
  children,
  variant = "light",
  className = "",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "light" | "maroon";
  className?: string;
  onClick?: () => void;
}) {
  const innerClass =
    variant === "maroon" ? "btn-1806-inner-maroon" : "btn-1806-inner";
  const offsetClass =
    variant === "maroon" ? "btn-1806-offset-maroon" : "btn-1806-offset";
  const isExternal = href.startsWith("http");

  const content = (
    <>
      <span className={offsetClass} aria-hidden />
      <span className={innerClass}>
        {children}
        <ArrowIcon />
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn-1806 ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={`btn-1806 ${className}`}>
      {content}
    </Link>
  );
}
