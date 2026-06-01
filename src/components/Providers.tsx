"use client";

import { LanguageProvider } from "@/i18n/LanguageProvider";
import { ThemeProvider } from "@/theme/ThemeProvider";
import LocaleSync from "./LocaleSync";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <LocaleSync />
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}
