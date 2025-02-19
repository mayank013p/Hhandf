import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "20px",
          lg: "80px",
        },
      },
      colors: {
        gradient: {
          quality: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
          environment: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
          security: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
        },
      },
      animation: {
        "card-hover": "cardHover 0.3s ease-in-out",
        "fade-in": "fadeIn 0.2s ease-in",
      },
      keyframes: {
        cardHover: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.02)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
