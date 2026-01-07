import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: "hsl(var(--bg-dark))",
          surface: "hsl(var(--bg-surface))",
          elevated: "hsl(var(--bg-elevated))",
        },
        border: {
          DEFAULT: "hsl(var(--border))",
        },
        text: {
          primary: "hsl(var(--text-primary))",
          muted: "hsl(var(--text-muted))",
        },
        primary: {
          dark: "hsl(var(--primary-dark))",
          light: "hsl(var(--primary-light))",
        },
      },
    },
  },
};

export default config;
