/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        color1: "#f7a52f",
        color2: "#271d4d",
        color3: "#eeecf4",
        color4: "#b354af",
        color5: "#9695a5",
        color6: "#debda2",
        color7: "#ce9793",
        color8: "#b8bcc6",
        color9: "#6985b9",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        catanta: ["Cantata One", "sans-serif"],
        "rubik-mono-one": ["Rubik Mono One", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        asset: ["Asset", "cursive"],
      },
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
  ],
};
