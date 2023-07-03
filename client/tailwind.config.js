/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx, html}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "#043645",
        lightBlue: "#E7EFF1",
        turquoise: "#D7F6F4",
        bistroBlue: "#00A3AD",
      },
    },
  },
  plugins: [],
};
