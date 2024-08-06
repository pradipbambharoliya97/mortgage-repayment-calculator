/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-darken': '#091820',
        'main-dark': '#122f3f',
        'main-light': 'hsl(202, 86%, 94%)',
        lime: '#dadb31',
        'lime-light': '#d5de26',
        'light-text': '#96a0a3',
      },
    },
  },
  plugins: [],
};
