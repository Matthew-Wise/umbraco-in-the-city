import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        "xl-1320": "1320px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "brand-yellow": "#FFCC33",
        "brand-dark": "#171717",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        anton: ["var(--font-anton)", "sans-serif"],
        bayon: ["var(--font-bayon)", "sans-serif"],
        "share-tech": ["var(--font-share-tech)", "monospace"],
      },
      fontSize: {
        "hero": ["218px", "166px"], // [font-size, line-height] - 1320px+
        "hero-xl": ["180px", "140px"], // 1024px - 1319px  
        "hero-lg": ["140px", "120px"], // 1024px - 1319px  
        "hero-md": ["140px", "120px"], // 768px - 1023px
        "hero-sm": ["120px", "100px"], // 640px - 767px
        "hero-xs": ["80px", "60px"], // below 640px
        "hero-sub": ["81px", "80px"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "wing-flutter": {
          "0%, 100%": { transform: "rotate(-15deg) scaleY(1)" },
          "25%": { transform: "rotate(-25deg) scaleY(0.8)" },
          "50%": { transform: "rotate(-10deg) scaleY(1.1)" },
          "75%": { transform: "rotate(-30deg) scaleY(0.7)" },
        },
        "wing-flutter-opposite": {
          "0%, 100%": { transform: "rotate(15deg) scaleY(1)" },
          "25%": { transform: "rotate(25deg) scaleY(0.8)" },
          "50%": { transform: "rotate(10deg) scaleY(1.1)" },
          "75%": { transform: "rotate(30deg) scaleY(0.7)" },
        },
        "buzz-hover": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-2px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "wing-left": "wing-flutter 0.15s ease-in-out infinite",
        "wing-right": "wing-flutter-opposite 0.15s ease-in-out infinite",
        "wing-left-secondary": "wing-flutter 0.15s ease-in-out infinite 0.05s",
        "wing-right-secondary": "wing-flutter-opposite 0.15s ease-in-out infinite 0.05s",
        "buzz-hover": "buzz-hover 0.3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
