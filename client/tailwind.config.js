/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // fontSize: {
    //   sm: ["0.75rem","1.15rem"],
    //   base: ["1rem","1.5rem"],
    //   xl: ["1.25rem"],
    //   "2xl": "1.563rem",
    //   "3xl": "1.953rem",
    //   "4xl": "2.441rem",
    //   "5xl": "3.052rem",
    // },
    screens: {
      xs: "300px",
      sm: "600px",
      md: "900px",
      lg: "1200px",
      xl: "1536px",
      "2xl": "1800px",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
