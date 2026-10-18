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
        maple: {
          DEFAULT: "#FCE6C6",
          light: "#FFF3E3",
          dark: "#F8D19A",
        },
        maroon: {
          DEFAULT: "#68140D",
          light: "#8B1F16",
          dark: "#4A0E09",
        },
        gold: {
          DEFAULT: "#F8D19A",
          muted: "#C5A059",
        },
        page: "var(--background)",
        ink: "var(--foreground)",
        subtle: "var(--muted)",
        surface: "var(--surface)",
        card: "var(--card)",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.12em",
        nav: "0.02em",
      },
      boxShadow: {
        card: "0 24px 64px rgba(104, 20, 13, 0.08)",
        hero: "0 32px 80px rgba(0, 0, 0, 0.45)",
      },
      animation: {
        "fade-in": "fadeIn 1.2s ease-out forwards",
        "fade-in-up": "fadeInUp 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionDuration: {
        luxe: "700ms",
      },
    },
  },
  plugins: [],
};

export default config;
