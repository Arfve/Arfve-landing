import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: {
          50: "var(--gray-50)",
          900: "var(--gray-900)",
          950: "var(--gray-950)",
        },
        button: {
          primary: "var(--button-primary)",
        },
        section: {
          light: "var(--section-light)",
          dark: "var(--section-dark)",
        },
        footer: {
          text: "var(--footer-text)",
          link: "var(--footer-link)",
          border: "var(--footer-border)",
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'footer-base': ['14px', '20px'],
        'footer-heading': ['16px', '24px'],
      },
      spacing: {
        'footer-padding': '32px',
      },
    },
  },
  plugins: [],
} satisfies Config;
