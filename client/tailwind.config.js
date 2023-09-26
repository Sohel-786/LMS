/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        formshadow:
          "rgb(0, 162, 255) 0px 10px 20px,rgb(0, 162, 255) 0px 6px 6px",
      },
    },
  },
  plugins: [require('@tailwindcss/forms') , require("daisyui"),],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "synthwave",
      "luxury",
      "night",
      "dracula",
    ],
  },
};
