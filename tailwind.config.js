/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: "#17212B",
        secondary: "#232E39",
        button: "#5288C1",
        buttonHover: "#4A7AAE",
        fontSecondary: "#708499",
      },
    },
  },
  plugins: [],
};
