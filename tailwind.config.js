import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
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
        antonio: ['Antonio', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif']
      },
      fontWeight: {
        normal: '300',
        semibold: '500'
      },
      colors: {
        khaki: '#878145',
        'baby-blue': '#7FC4C1',
        'neon-green': '#96ff00',
        'alice-orange': '#D35525',
        'alice-red': '#CC3B14',
        'alice-yellow': '#E3D126',
        'alice-green': '#7F8703',
        'alice-pink': '#FFAB91'
      }
    }
  },
  safelist: [
  { pattern: /bg-.+\/50/ }
]
}
