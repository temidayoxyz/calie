import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAF8",
        foreground: "#235347",
        neutral: "#111111",
        surface: "#FFFFFF",
        border: "#E8E8E5",
        muted: "#666666",
        accent: {
          DEFAULT: "#235347",
          foreground: "#FFFFFF",
        },
        success: "#2E7D32",
        danger: "#C0392B",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-geist)", "system-ui", "sans-serif"],
      },
      spacing: {
        section: "7.5rem",
        "section-sm": "5rem",
      },
      maxWidth: {
        content: "72rem",
        narrow: "40rem",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(17, 17, 17, 0.04), 0 4px 12px rgba(17, 17, 17, 0.06)",
        "card-hover":
          "0 2px 8px rgba(17, 17, 17, 0.06), 0 8px 24px rgba(17, 17, 17, 0.08)",
        lift: "0 4px 16px rgba(17, 17, 17, 0.08), 0 12px 32px rgba(17, 17, 17, 0.06)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      transitionDuration: {
        fast: "120ms",
        DEFAULT: "220ms",
        slow: "350ms",
      },
      animation: {
        "fade-up": "fadeUp 0.35s cubic-bezier(0.25, 1, 0.5, 1) forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
