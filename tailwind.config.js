/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        screenUI: "100svh",
      },
    },
    fontFamily: {
      caveat: ["Caveat"],
      roboto: ["Roboto Mono"],
    },
  },
  plugins: [],
};
