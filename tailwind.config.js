/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "lg": "1450px",
        "xl": "1900px",
        "2xl": "2000px",
        "3xl": "2800px",
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        14: '14',
      },
      colors: {
        "primary": '#202F3B',
      },
      keyframes: {
        dropdown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        }
      },
      animation: {
        dropdown: 'dropdown 0.5s ease-in-out',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/line-clamp')
  ],
}