/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary_500: '#3182F6',
        primary_100: '#D0DFFB',
        white: '#FFFFFF',
        gray_900: '#191F28',
        gray_800: '#333D4B',
        gray_700: '#4E5968',
        gray_600: '#505967',
        gray_500: '#6B7684',
        gray_400: '#8b95a1',
        gray_200: '#ECECEC',
        warning: '#F04452',
        star: '#FFD158',
        border: '#f2f4f6',
        border_top: '#e5e8eb',
        category_item_color: '#FAFAFB',
      },
    },
  },
  plugins: [],
};
