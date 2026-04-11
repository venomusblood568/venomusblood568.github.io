import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // toggled by adding/removing 'dark' class on <html>
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightPurple: "#a78bfa",
      },
      fontFamily: {
        mono: ["'Courier New'", "Courier", "monospace"],
      },
      keyframes: {
        fadeup: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { borderColor: "currentColor" },
          "50%": { borderColor: "transparent" },
        },
        "ping-slow": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(2)", opacity: "0" },
        },
      },
      animation: {
        fadeup: "fadeup 0.5s ease forwards",
        blink: "blink 0.9s step-end infinite",
        "ping-slow": "ping-slow 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
