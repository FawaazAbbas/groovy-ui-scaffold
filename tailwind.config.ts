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
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-lg': ['3rem', { lineHeight: '1.06', fontWeight: '700', letterSpacing: '-0.03em' }],
        'display': ['2.25rem', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.025em' }],
        'display-sm': ['1.875rem', { lineHeight: '1.15', fontWeight: '600', letterSpacing: '-0.02em' }],
        'heading': ['1.5rem', { lineHeight: '1.25', fontWeight: '600', letterSpacing: '-0.017em' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '-0.014em' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.5', fontWeight: '400', letterSpacing: '-0.011em' }],
        'body': ['0.9375rem', { lineHeight: '1.5', fontWeight: '400', letterSpacing: '-0.009em' }],
        'body-sm': ['0.8125rem', { lineHeight: '1.45', fontWeight: '400', letterSpacing: '-0.006em' }],
        'caption': ['0.6875rem', { lineHeight: '1.4', fontWeight: '400', letterSpacing: '0em' }],
        'code': ['0.8125rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      colors: {
        background: 'var(--background)',
        surface: {
          DEFAULT: 'var(--surface)',
          solid: 'var(--surface-solid)',
        },
        'surface-elevated': 'var(--surface-elevated)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        border: {
          DEFAULT: 'var(--border)',
          solid: 'var(--border-solid)',
        },
        sidebar: {
          DEFAULT: 'var(--sidebar)',
          solid: 'var(--sidebar-solid)',
        },
        'sidebar-text': 'var(--sidebar-text)',
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          dark: 'var(--primary-dark)',
        },
        comfort: {
          DEFAULT: 'var(--comfort)',
          text: 'var(--comfort-text)',
        },
        electric: {
          DEFAULT: 'var(--electric)',
          muted: 'var(--electric-muted)',
          dark: 'var(--electric-dark)',
          bright: 'var(--electric-bright)',
        },
        cyan: {
          DEFAULT: 'var(--cyan)',
          muted: 'var(--cyan-muted)',
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
        '2xl': '1rem',
        xl: '0.875rem',
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.375rem',
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
        "retro-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "scan-line": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-left": "slide-left 0.3s ease-out",
        "retro-pulse": "retro-pulse 2s ease-in-out infinite",
        "scan-line": "scan-line 8s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
