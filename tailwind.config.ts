import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        card: "var(--card)",
        "card-elev": "var(--card-elev)",
        beige: {
          DEFAULT: "var(--beige)",
          soft: "var(--beige-soft)",
          hi: "var(--beige-hi)",
        },
        gold: {
          DEFAULT: "var(--gold)",
          deep: "var(--gold-deep)",
          soft: "var(--gold-soft)",
          tint: "var(--gold-tint)",
        },
        ink: "var(--ink)",
        body: "var(--body)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        divider: "var(--divider)",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", '"Playfair Display"', '"Times New Roman"', "serif"],
        sans: [
          "var(--font-inter)",
          "-apple-system",
          '"SF Pro Display"',
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        "2xl": "20px",
        "3xl": "28px",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        cta: "var(--shadow-cta)",
      },
    },
  },
  plugins: [],
};

export default config;
