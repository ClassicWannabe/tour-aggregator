import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
    },
    boxShadow: {},
    colors: {
      current: "currentColor",
      transparent: "transparent",
      back: {
        base: "#f5f5f5",
        layer1: "#fff",
      },
      text: {
        main: "#4a4a4a",
      },
      brand: {
        main: "#00BE8B",
      },
      accent: {},
    },
  },
  plugins: [],
};

export default config;
