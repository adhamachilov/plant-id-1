/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#0F3D2F',
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
        slideDown: 'slideDown 0.3s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};