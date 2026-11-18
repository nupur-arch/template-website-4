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
        paper: {
          50: "#FCFBF8",
          100: "#F7F4EE",
          200: "#EFE9DF",
          300: "#E2DACB",
          400: "#C9C0AF",
          500: "#9A907E",
        },
        warmblack: {
          50: "#2B241E",
          100: "#231D18",
          200: "#1D1814",
          300: "#18130F",
          DEFAULT: "#15110D",
          800: "#110D0A",
          900: "#0D0A08",
          950: "#070504",
        },
        saffron: {
          50: "#FFF9E6",
          100: "#FFF2CC",
          200: "#FFE499",
          300: "#FFD466",
          400: "#FFC233",
          DEFAULT: "#FFB000",
          600: "#E69C00",
          700: "#B87D00",
          800: "#8A5E00",
          900: "#5C3E00",
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
        editorial: "0 20px 40px -15px rgba(21, 17, 13, 0.08)",
        "editorial-dark": "0 20px 40px -15px rgba(0, 0, 0, 0.5)",
        saffron: "0 10px 30px -10px rgba(255, 176, 0, 0.35)",
        "saffron-glow": "0 0 40px rgba(255, 176, 0, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
