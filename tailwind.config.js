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
        moveVertical: 'moveVertical 30s ease infinite',
        moveInCircle: 'moveInCircle 20s linear infinite',
        moveInCircleReverse: 'moveInCircle 40s linear reverse infinite',
        moveHorizontal: 'moveHorizontal 40s ease infinite',
        'card-exit-right': 'cardExitRight 0.6s ease-out forwards',
        'card-move-to-top': 'cardMoveToTop 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        moveInCircle: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        moveVertical: {
          '0%': { transform: 'translateY(-50%)' },
          '50%': { transform: 'translateY(50%)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        moveHorizontal: {
          '0%': { transform: 'translateX(-50%) translateY(-10%)' },
          '50%': { transform: 'translateX(50%) translateY(10%)' },
          '100%': { transform: 'translateX(-50%) translateY(-10%)' },
        },
        cardExitRight: {
          '0%': { transform: 'translateX(0) rotate(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateX(120%) rotate(12deg) scale(0.9)', opacity: '0' },
        },
        cardMoveToTop: {
          '0%': { transform: 'translateY(3px) rotate(-2deg) scale(0.96)', opacity: '0.95' },
          '30%': { transform: 'translateY(-5px) rotate(-1deg) scale(0.98)', opacity: '0.97' },
          '100%': { transform: 'translateY(0) rotate(0) scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};