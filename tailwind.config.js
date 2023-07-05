/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './screens/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        disabled: {
          100: '#fefdfe',
          200: '#fcfcfd',
          300: '#fbfafc',
          400: '#f9f9fb',
          500: '#f8f7fa',
          600: '#c6c6c8',
          700: '#959496',
          800: '#636364',
          900: '#323132'
        },
        primary: {
          100: '#fff9cc',
          200: '#fff39a',
          300: '#ffee67',
          400: '#ffe835',
          500: '#ffe202',
          600: '#ccb502',
          700: '#998801',
          800: '#665a01',
          900: '#332d00'
        }
      }
    }
  },
  plugins: []
}
