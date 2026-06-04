import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury color palette
        gold: {
          50: "#fffbf0",
          100: "#fef3e2",
          200: "#fde6c4",
          300: "#fcd4a1",
          400: "#fabb6d",
          500: "#f9a83a",
          600: "#f89c2b",
          700: "#d97706",
          800: "#b45309",
          900: "#92400e",
        },
        navy: {
          50: "#f7f9ff",
          100: "#eef4ff",
          200: "#dfe8ff",
          300: "#c7d7ff",
          400: "#a8beff",
          500: "#7c9bff",
          600: "#5676f0",
          700: "#3553d4",
          800: "#1e3cb5",
          900: "#1a2a7f",
          950: "#0f1a50",
        },
        dark: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
      },
      fontFamily: {
        serif: ["Crimson Text", "Georgia", "serif"],
        sans: ["Poppins", "Segoe UI", "sans-serif"],
      },
      fontSize: {
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["18px", "28px"],
        xl: ["20px", "28px"],
        "2xl": ["24px", "32px"],
        "3xl": ["30px", "36px"],
        "4xl": ["36px", "40px"],
        "5xl": ["48px", "52px"],
        "6xl": ["60px", "66px"],
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "12px",
        lg: "16px",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        fadeIn: "fadeIn 0.6s ease-in-out",
        slideUp: "slideUp 0.6s ease-out",
        slideDown: "slideDown 0.6s ease-out",
        slideLeft: "slideLeft 0.6s ease-out",
        slideRight: "slideRight 0.6s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        scaleIn: "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideLeft: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideRight: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "100% 0%" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(249, 168, 58, 0.3)",
        "glow-lg": "0 0 40px rgba(249, 168, 58, 0.4)",
        luxury: "0 10px 40px rgba(16, 26, 80, 0.15)",
        "luxury-lg": "0 20px 60px rgba(16, 26, 80, 0.2)",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".glass": {
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          "-webkit-backdrop-filter": "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        },
        ".glass-dark": {
          background: "rgba(15, 26, 80, 0.1)",
          backdropFilter: "blur(10px)",
          "-webkit-backdrop-filter": "blur(10px)",
          border: "1px solid rgba(249, 168, 58, 0.1)",
        },
        ".text-gradient": {
          backgroundImage:
            "linear-gradient(135deg, #f9a83a 0%, #1e3cb5 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          backgroundClip: "text",
        },
        ".text-gradient-light": {
          backgroundImage:
            "linear-gradient(135deg, #ffffff 0%, #f9a83a 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          backgroundClip: "text",
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
export default config;
