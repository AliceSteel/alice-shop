// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/fonts'
  ],
  css: ['~/assets/tailwind.css'],
  runtimeConfig: {
    /* database keys, env keys etc */
  },
  app: {
    pageTransition: {
      name: 'fade', // or 'fade'
      mode: 'out-in' // or 'in-out'
    }
  }
})
