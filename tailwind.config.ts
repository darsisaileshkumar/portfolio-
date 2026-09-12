import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-void": "#07080B",
        "bg-panel": "#0F1116",
        "accent-primary": "#6E5BFF",
        "accent-secondary": "#33E0C7",
        "accent-warn": "#FF6A45",
        "text-primary": "#F5F6F8",
        "text-secondary": "#9AA0AC",
        "text-muted": "#565C68",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      spacing: {
        "18": "72px",
        "128": "128px",
      },
      maxWidth: {
        "8xl": "1440px",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
