/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        "noun": '#FF6384', 
        "verb": '#36A2EB', 
        "adjective": "#FFCE56", 
        "adverb": "#4BC0C0", 
        "pronoun": "#9966FF", 
        "preposition": "#FF9F40", 
        "conjunction": "#F08080", 
        "interjection": "#9ACD32"
      }
    },
  },
  plugins: [require("daisyui")],
}

