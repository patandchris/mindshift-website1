import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
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
        /* Premium gold color extensions */
        gold: {
          50: "hsl(48 96% 95%)",
          100: "hsl(48 96% 88%)",
          200: "hsl(48 96% 78%)",
          300: "hsl(48 96% 65%)",
          400: "hsl(45 100% 70%)",
          500: "hsl(48 96% 65%)",
          600: "hsl(50 90% 60%)",
          700: "hsl(45 80% 50%)",
          800: "hsl(42 70% 40%)",
          900: "hsl(40 60% 30%)",
        },
      },
      backgroundImage: {
        'gradient-gold': 'var(--gradient-gold)',
      },
      boxShadow: {
        'gold': 'var(--shadow-gold)',
        'elegant': 'var(--shadow-elegant)',
      },
      fontWeight: {
        'light': 'var(--font-light)',
        'normal': 'var(--font-normal)', 
        'medium': 'var(--font-medium)',
        'semibold': 'var(--font-semibold)',
        'bold': 'var(--font-bold)',
        'black': 'var(--font-black)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
