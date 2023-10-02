/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        formshadow:
          "rgb(0, 162, 255) 0px 10px 20px,rgb(0, 162, 255) 0px 6px 6px",
        headershadow: "0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1)"
      },
      fontFamily : {
        roboto : "'Roboto Condensed', sans-serif",
        poppins : "'Poppins', sans-serif",
        slab : "'Roboto Slab', serif",

      }
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
