/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0A0F",
        void: "#050508",
        ember: "#FF4D1C",
        "ember-dark": "#CC3200",
        "ember-glow": "#FF6B4A",
        slate: "#8892A4",
        "slate-light": "#B8C4D4",
        platinum: "#E8EDF4",
        "card-bg": "#0F0F18",
        "border-dim": "#1A1A2E",
      },
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        heading: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};

