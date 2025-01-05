// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/fonts',
    'nuxt-graphql-client'
  ],
  css: ['~/assets/tailwind.css'],
  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in'
    }
  },
  plugins: ['~/plugins/gsap.js'],
  runtimeConfig: {
    public: {
      SHOPIFY_DOMAIN: process.env.SHOPIFY_DOMAIN,
      SHOPIFY_STOREFRONT_ACCESS_TOKEN:
        process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN:
        process.env.SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN
    }
  },
  build: {
    transpile: ['gsap']
  }
})
