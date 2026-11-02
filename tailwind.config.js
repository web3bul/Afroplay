/** @type {import('tailwindcss').Config} */
// Moved verbatim from the inline `tailwind.config` that used to live in
// index.html alongside the Play CDN script.
export default {
  // data/ is included because several data files hold full Tailwind class
  // strings (icon colours, accent bars) that components interpolate.
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './data/**/*.ts',
    './lib/**/*.{ts,tsx}',
    './hooks/**/*.ts',
  ],
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
