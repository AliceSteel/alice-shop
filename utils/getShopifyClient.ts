import { createStorefrontApiClient } from '@shopify/storefront-api-client'

export function getShopifyClient() {
  const config = useRuntimeConfig()
  const baseDomain = `https://${config.public.SHOPIFY_DOMAIN}`

  if (import.meta.env.SSR) {
    const client = createStorefrontApiClient({
      storeDomain: baseDomain,
      apiVersion: '2025-04',
      privateAccessToken: config.public.SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN
    })
    return client
  }
  const client = createStorefrontApiClient({
    storeDomain: baseDomain,
    apiVersion: '2025-04',
    publicAccessToken: config.public.SHOPIFY_STOREFRONT_ACCESS_TOKEN
  })
  return client
}
