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
        blue: "var(--blue)",
        "purple-50": "var(--purple-50)",
        "purple-400": "var(--purple-400)",
        "gray-5": "var(--gray-5)",
        "gray-600": "var(--gray-600)",
        "gray-200": "var(--gray-200)",
        "white--": "var(--white--)",
        white: "var(--white)",
        red: "var(--red)",
      },
      fontSize: {
        'header-M': '32px',
        'header-S-M': '16px',
        'body-S': '12px',
      },
      fontFamily: {
        sans: ["Instrument Sans", "sans-serif"],
      },
      boxShadow: {
        'faint-blue': '0 0 10px 2px rgba(99, 60, 255, 0.5)',
      },
    },
  },
  plugins: [],
};

export default config;
