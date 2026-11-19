import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Light paper palette rooted in #F4FAF7
        paper: {
          50: "#F9FCFB",
          100: "#F4FAF7",
          200: "#E6F3EE",
          300: "#D2E7DF",
          400: "#B3D4C7",
          500: "#82AB9B",
        },
        // Dark palette rooted in #0F1B17
        warmblack: {
          50: "#1C322B",
          100: "#172A24",
          200: "#13221D",
          300: "#101E1A",
          DEFAULT: "#0F1B17",
          800: "#0C1613",
          900: "#09110F",
          950: "#060A09",
        },
        // Primary brand emerald #0E9F6E
        emerald: {
          50: "#E8F8F2",
          100: "#D1F1E5",
          200: "#A7E4CD",
          300: "#72D2B0",
          400: "#3BBB8F",
          DEFAULT: "#0E9F6E",
          600: "#0A855B",
          700: "#086948",
          800: "#065239",
          900: "#043D2A",
        },
        // Small accent amber #F5B700
        amber: {
          50: "#FFFDF2",
          100: "#FFF8D6",
          200: "#FEF0AD",
          300: "#FDE47A",
          400: "#FCD747",
          DEFAULT: "#F5B700",
          600: "#D49B00",
          700: "#A87B00",
          800: "#7D5B00",
          900: "#523C00",
        },
        // Saffron alias pointing to Emerald primary for full component compatibility
        saffron: {
          50: "#E8F8F2",
          100: "#D1F1E5",
          200: "#A7E4CD",
          300: "#72D2B0",
          400: "#3BBB8F",
          DEFAULT: "#0E9F6E",
          600: "#0A855B",
          700: "#086948",
          800: "#065239",
          900: "#043D2A",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      borderRadius: {
        "3xl": "1.75rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "Space Mono", "monospace"],
      },
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 20s linear infinite",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
      },
      boxShadow: {
        editorial: "0 20px 40px -15px rgba(15, 27, 23, 0.08)",
        "editorial-dark": "0 20px 40px -15px rgba(0, 0, 0, 0.6)",
        emerald: "0 10px 30px -10px rgba(14, 159, 110, 0.35)",
        "emerald-glow": "0 0 40px rgba(14, 159, 110, 0.25)",
        amber: "0 10px 30px -10px rgba(245, 183, 0, 0.35)",
        "amber-glow": "0 0 40px rgba(245, 183, 0, 0.25)",
        saffron: "0 10px 30px -10px rgba(14, 159, 110, 0.35)",
        "saffron-glow": "0 0 40px rgba(14, 159, 110, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;