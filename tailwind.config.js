/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4FD1C5",
        secondary: "#232423",
      },
      screens: {
        custom: "480px",
      },
    },
  },
  plugins: [],
};
