import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        night: "#0B0B0B",
        surface: "#141414",
        card: "#1A1A1A",
        ink: "#F5F5F5",
        muted: "rgba(245, 245, 245, 0.65)",
        amber: {
          DEFAULT: "#FFBF00",
          soft: "#FFD75E",
        },
        gold: "#D4AF37",
        magenta: "#C026D3",
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        body: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        cta: "0.14em",
        eyebrow: "0.22em",
      },
      boxShadow: {
        "amber-glow": "0 0 24px rgba(255, 191, 0, 0.25)",
        "magenta-glow": "0 0 28px rgba(192, 38, 211, 0.22)",
        card: "0 20px 50px rgba(0, 0, 0, 0.55)",
      },
      animation: {
        "pulse-line": "pulseLine 2.2s ease-in-out infinite",
      },
      keyframes: {
        pulseLine: {
          "0%, 100%": { opacity: "0.25", transform: "scaleY(0.6)" },
          "50%": { opacity: "1", transform: "scaleY(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
