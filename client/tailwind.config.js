/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/features/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       colors:{
          primaryColor:"#2C1654",
          textlight:"#f2f2f2",
          textdark:"#000"
       }
    },
  },
  plugins: [],
}

