/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary-color)',
          dark: 'var(--primary-dark)'
        },
        theme: 'var(--text-color)'
      },
      fontFamily: {
        druk: ['DrukWideBold', 'sans-serif']
      }
    }
  },
  plugins: []
};