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
    extend: {
      fontFamily: {
        /*  sans: ['"Raleway"', 'sans-serif'] */
        sans: ['Raleway']
      },
      colors: {
        khaki: '#878145',
        'baby-blue': '#7FC4C1',
        'neon-green': '#96ff00'
      }
    }
  }
}
