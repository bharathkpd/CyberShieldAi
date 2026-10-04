import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F5F0E6",
          2: "#EDE6D6",
        },
        card: "#FFFDF8",
        ink: {
          DEFAULT: "#1B1B1B",
          soft: "#55524B",
        },
        line: "#1B1B1B",
        divider: "#D9D0BC",
        accent: {
          red: "#D62828",
          amber: "#D98E04",
          green: "#2F7D4F",
          olive: "#5B6B4A",
        },
        marker: {
          danger: "rgba(214, 40, 40, 0.25)",
          suspicious: "rgba(217, 142, 4, 0.30)",
          safe: "rgba(47, 125, 79, 0.22)",
        },
      },
      fontFamily: {
        serif: [
          "var(--font-fraunces)",
          "Fraunces",
          "Georgia",
          "serif",
        ],
        sans: [
          "var(--font-dm-sans)",
          "DM Sans",
          "Noto Sans Telugu",
          "Noto Sans Devanagari",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: [
          "var(--font-ibm-plex-mono)",
          "IBM Plex Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Courier New",
          "monospace",
        ],
      },
      fontSize: {
        11: ["11px", { lineHeight: "1.4" }],
        12: ["12px", { lineHeight: "1.5" }],
        13: ["13px", { lineHeight: "1.5" }],
        14: ["14px", { lineHeight: "1.5" }],
        16: ["16px", { lineHeight: "1.5" }],
        18: ["18px", { lineHeight: "1.5" }],
        20: ["20px", { lineHeight: "1.3" }],
        22: ["22px", { lineHeight: "1.25" }],
        24: ["24px", { lineHeight: "1.2" }],
        28: ["28px", { lineHeight: "1.15" }],
        32: ["32px", { lineHeight: "1.15" }],
        36: ["36px", { lineHeight: "1.1" }],
        48: ["48px", { lineHeight: "1.1" }],
        72: ["72px", { lineHeight: "1.05" }],
      },
      boxShadow: {
        hard: "6px 6px 0px #1B1B1B",
        "hard-sm": "3px 3px 0px #1B1B1B",
        "hard-lg": "8px 8px 0px #1B1B1B",
        "hard-red": "6px 6px 0px #D62828",
        "hard-amber": "6px 6px 0px #D98E04",
        "hard-green": "6px 6px 0px #2F7D4F",
        "hard-pressed": "0px 0px 0px #1B1B1B",
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "4px",
        md: "4px",
        lg: "4px",
        xl: "4px",
        "2xl": "4px",
        "3xl": "4px",
      },
      maxWidth: {
        container: "1180px",
        prose: "65ch",
      },
      borderWidth: {
        DEFAULT: "2px",
        2: "2px",
        3: "3px",
        4: "4px",
      },
    },
  },
  plugins: [],
};

export default config;
