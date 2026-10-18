"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { useTheme } from "@/theme/ThemeProvider";

export default function ThemeToggle({ light = false }: { light?: boolean }) {
  const { theme, mounted, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative flex h-10 w-10 items-center justify-center border transition-all duration-300 ${
        light
          ? "border-maple/35 bg-black/10 hover:border-maple"
          : "border-[var(--border)] bg-[var(--surface)] hover:border-maroon/40"
      }`}
      aria-label={isDark ? t.theme.switchToLight : t.theme.switchToDark}
      suppressHydrationWarning
    >
      {!mounted ? (
        <span
          className={`h-4 w-4 rounded-full ${light ? "bg-maple/40" : "bg-maroon/20"}`}
          aria-hidden
        />
      ) : (
        <>
          <svg
            className={`absolute h-4 w-4 transition-all duration-300 ${
              light ? "text-maple" : "text-maroon"
            } ${isDark ? "rotate-0 scale-100 opacity-100" : "scale-0 opacity-0"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
          <svg
            className={`absolute h-4 w-4 transition-all duration-300 ${
              light ? "text-maple" : "text-maroon"
            } ${isDark ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
        </>
      )}
    </button>
  );
}
