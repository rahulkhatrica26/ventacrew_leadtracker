/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Syne', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        gold: { DEFAULT: '#F5C842', dark: '#C9A020' },
        ink: {
          900: '#0D0D0D', 800: '#111111', 700: '#161616',
          600: '#1E1E1E', 500: '#272727', 400: '#333333',
        },
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0 },               to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
      animation: {
        fadeIn:  'fadeIn 0.15s ease',
        slideUp: 'slideUp 0.20s ease',
      },
    },
  },
  plugins: [],
}
