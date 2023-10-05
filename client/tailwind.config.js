import { useSelector } from "react-redux";

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        formshadow:
          "rgb(0, 162, 255) 0px 1px 2px 0px, rgb(0, 162, 255) 0px 2px 6px 2px",
        headershadow:
          "0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1)",
        marquee: "0px 0px 13px #B6BEFC",
        course: "rgba(215, 216, 222, 0.41) 0px 6px 34px 0px",
        menu: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        profile : "rgb(81, 180, 255) 0px 0.0625em 0.0625em, rgb(81, 180, 255) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset"
      },
      fontFamily: {
        roboto: "'Roboto Condensed', sans-serif",
        poppins: "'Poppins', sans-serif",
        slab: "'Roboto Slab', serif",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
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
