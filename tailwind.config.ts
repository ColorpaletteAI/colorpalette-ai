const { fontFamily } = require("tailwindcss/defaultTheme");

import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    fontFamily: {
      sans: ["Poppins", ...fontFamily.sans],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {},
  },
  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: true,
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
