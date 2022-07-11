const defaultTheme = require('tailwindcss/defaultTheme');


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        mono: ['Space Grotesk', ...defaultTheme.fontFamily.sans],
        alpha: ["AlphaLyrae", 'Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: { 
        blueContrast: '#0500FF'
      }
    },
  },
  plugins: [],
}