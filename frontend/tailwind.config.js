/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#111317", // Usará `bg-primary` o `text-primary`
          light: "#1f2125",   // Usará `bg-primary-light` o `text-primary-light`
          extraLight: "#35373b",
        },
        secondary: {
          DEFAULT: "#f9ac54",
          dark: "#d79447",
        },
        textLight: "#d1d5db", // Ejemplo para `text-textLight`
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
