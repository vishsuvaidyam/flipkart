/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        flipkart: {
          blue: '#2874f0',
          orange: '#ff9f1a',
          dark: '#212121',
          light: '#f5f5f5',
        },
      },
    },
  },
  plugins: [],
}
