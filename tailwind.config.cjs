/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
     'myblack': '#040306',
     'mainBG':'#181818',
     'textgray': '#6b6a6b',
     'textwhite': '#ffffff',
     'textgreen': '#1db954'
    },
    extend: {},
    fontFamily: {
      nav: ['Mochiy Pop P One', 'sans-serif'],
      hero: ['Source Serif Pro', 'serif'],
      header: ['Roboto Condensed', 'sans-serif'],
    },
  },
  plugins: [],
};
