/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EEE9FF',
          500: '#5B4CFF',
          600: '#4F42E6',
          700: '#4338CC',
        },
        secondary: {
          50: '#FFE9F1',
          500: '#FF6B9D',
          600: '#E55B89',
        },
        accent: {
          50: '#FFF9E6',
          500: '#FFC75F',
          600: '#E5B355',
        },
        surface: '#FFFFFF',
        background: '#F8F9FE',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'bounce-light': 'bounce 0.5s ease-in-out',
        'pulse-subtle': 'pulse 2s infinite',
      },
      boxShadow: {
        'card': '0 2px 4px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}