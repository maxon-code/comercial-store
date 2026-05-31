/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.98)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleDown: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.98)', opacity: '0' },
        },
      },shrinkLine: {
          '0%': { transform: 'scaleX(1)' },
          '100%': { transform: 'scaleX(0)' },
        },
      animation: {
        fadeIn: 'fadeIn 0.15s linear',
        fadeOut: 'fadeOut 0.15s linear forwards',
        scaleUp: 'scaleUp 0.15s ease-out',
        scaleDown: 'scaleDown 0.15s ease-in forwards',shrinkLine: 'shrinkLine 3s linear forwards',
      },
    },
  },
  plugins: [],
}