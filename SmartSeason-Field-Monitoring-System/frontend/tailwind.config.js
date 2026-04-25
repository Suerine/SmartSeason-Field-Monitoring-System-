/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        earth: {
          50: "#f7f4ef",
          100: "#ede6d8",
          200: "#d9ccb4",
          300: "#c2a87e",
          400: "#b08d5b",
          500: "#9a7444",
          600: "#7d5c35",
          700: "#63482b",
          800: "#4a3520",
          900: "#2e2012",
        },
        field: {
          green: "#367A2A",
          lime: "#12C233",
          amber: "#d4a017",
          rust: "#bc4749",
          sky: "#457b9d",
          cream: "#FEFEFE",
          bark: "#3d2b1f",
          white: "#FEFEFE",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
