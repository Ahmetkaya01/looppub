"use client";

import { useId } from "react";

export default function MenuSearchBar({
  value,
  onChange,
  resultCount,
  label,
  placeholder,
  clearLabel,
  noResultsLabel,
  resultsFoundLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  resultCount?: number;
  label: string;
  placeholder: string;
  clearLabel: string;
  noResultsLabel: string;
  resultsFoundLabel: string;
}) {
  const id = useId();

  return (
    <div className="border-b border-white/10 bg-surface/50 px-4 py-4">
      <div className="mx-auto max-w-4xl">
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3-3" strokeLinecap="round" />
          </svg>
          <input
            id={id}
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            autoComplete="off"
            enterKeyHint="search"
            className="w-full rounded-lg border border-white/15 bg-card py-3.5 pl-12 pr-12 font-body text-sm text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] duration-200 focus:border-amber/60 focus:outline-none focus:ring-2 focus:ring-amber/30"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              aria-label={clearLabel}
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted transition-colors hover:bg-white/10 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              ×
            </button>
          )}
        </div>
        {value && resultCount !== undefined && (
          <p className="mt-2 text-xs text-muted" aria-live="polite">
            {resultCount === 0
              ? noResultsLabel
              : `${resultCount} ${resultsFoundLabel}`}
          </p>
        )}
      </div>
    </div>
  );
}
