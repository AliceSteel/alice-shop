/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.js',
    'nuxt.config.js'
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['"Raleway"', 'sans-serif']
    }
  }
}
