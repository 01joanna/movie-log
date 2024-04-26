/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      nohemi: ["Nohemi", "sans-serif"],
      nohemiThin: ["Nohemi-Bold", "sans-serif"],
      nohemiExtralight: ["Nohemi-ExtraLight", "sans-serif"],
      nohemiExtraBold: ["Nohemi-ExtraBold", "sans-serif"],
      nohemiBlack: ["Nohemi-Black", "sans-serif"],
      nohemiSemiBold: ["Nohemi-SemiBold", "sans-serif"],
    },
    screens: {
      sm: "300px",
      md: "500px",
      lg: "800px",
      xl: "1280px",
    },
    extend: {},
  },
  plugins: [],
}

