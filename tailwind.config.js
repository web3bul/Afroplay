/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './*.{ts,tsx}', './components/**/*.{ts,tsx}', './pages/**/*.{ts,tsx}', './hooks/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}', './data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        heading: ['Russo One', 'sans-serif'],
      },
      colors: {
        afro: {
          bg: '#0F0502',
          orange: '#FF6B00',
          accent: '#A020F0',
          card: '#1A0F0A',
        },
      },
    },
  },
  plugins: [],
};
