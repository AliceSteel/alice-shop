import { StorefrontApiClient } from '@shopify/storefront-api-client'

declare module '#app' {
  interface NuxtApp {
    $shopifyClient: StorefrontApiClient
    $shopifyServerClient: StorefrontApiClient
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $shopifyClient: StorefrontApiClient
    $shopifyServerClient: StorefrontApiClient
  }
}
