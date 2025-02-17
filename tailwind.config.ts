import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        beige: {
          500: "#98908B",
          100: "#F8F4F0",
        },
        grey: {
          900: "#201F24",
          500: "#696868",
          300: "#B3B3B3",
          100: "#F2F2F2",
        },
        secondary: {
          green: "#277C78",
          yellow: "#F2CDAC",
          cyan: "#82C9D7",
          navy: "#626070",
          red: "#C94736",
          purple: "#826CB0",
        },
        other: {
          purple: "#AF81BA",
          turquoise: "#597C7C",
          brown: "#93674F",
          magenta: "#934F6F",
          blue: "#3F82B2",
          navyGrey: "#97A0AC",
          armyGreen: "#7F9161",
          gold: "#CAB361",
          orange: "#BE6C49",
        },
        white: "#FFFFFF",
      },
      fontSize: {
        "preset-1": ["32px", { lineHeight: "120%" }],
        "preset-2": ["20px", { lineHeight: "120%" }],
        "preset-3": ["16px", { lineHeight: "150%" }],
        "preset-4": ["14px", { lineHeight: "150%" }],
        "preset-5": ["12px", { lineHeight: "150%" }],
      },
      spacing: {
        500: "40px",
        400: "32px",
        300: "24px",
        250: "20px",
        200: "16px",
        150: "12px",
        100: "8px",
        50: "4px",
      },
    },
  },
  plugins: [],
} satisfies Config;
