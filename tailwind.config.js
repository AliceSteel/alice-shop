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
        khaki: '#7D750A',
        'baby-blue': '#7FC4C1',
        'neon-green': '#96ff00',
        'alice-orange': '#D35525',
        'alice-red': '#CC3B14',
        'alice-yellow': '#E3D126',
        'alice-green': '#7F8703'
      }
    }
  }
}
