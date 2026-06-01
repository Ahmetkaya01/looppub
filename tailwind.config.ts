import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        night: "#0F0F11",
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E8C96A",
          muted: "#C5A059",
        },
        neon: {
          blue: "#6366f1",
          purple: "#a855f7",
        },
        ivory: "#F5F0E8",
        cream: "#E8E2D6",
        page: "var(--background)",
        ink: "var(--foreground)",
        subtle: "var(--muted)",
        surface: "var(--surface)",
        card: "var(--card)",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 24px rgba(99, 102, 241, 0.35), 0 0 48px rgba(168, 85, 247, 0.15)",
        "neon-gold": "0 0 28px rgba(212, 175, 55, 0.4)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.12)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
