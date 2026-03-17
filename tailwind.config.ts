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
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-lg': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        'display': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'display-sm': ['1.875rem', { lineHeight: '1.2', fontWeight: '600' }],
        'heading': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],
        'code': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
      },
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        'surface-elevated': 'var(--surface-elevated)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        border: 'var(--border)',
        sidebar: 'var(--sidebar)',
        'sidebar-text': 'var(--sidebar-text)',
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
        },
        comfort: {
          DEFAULT: 'var(--comfort)',
          text: 'var(--comfort-text)',
        },
        electric: {
          DEFAULT: 'var(--electric)',
          muted: 'var(--electric-muted)',
        },
        warning: 'var(--warning)',
        destructive: 'var(--destructive)',
        agent: 'var(--agent)',
        input: 'var(--border)',
        ring: 'var(--primary)',
        foreground: 'var(--text-primary)',
        muted: {
          DEFAULT: 'var(--surface-elevated)',
          foreground: 'var(--text-secondary)',
        },
        accent: {
          DEFAULT: 'var(--surface-elevated)',
          foreground: 'var(--text-primary)',
        },
        popover: {
          DEFAULT: 'var(--surface)',
          foreground: 'var(--text-primary)',
        },
        card: {
          DEFAULT: 'var(--surface)',
          foreground: 'var(--text-primary)',
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
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
        "slide-left": {
          from: { transform: "translateX(20px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-left": "slide-left 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
