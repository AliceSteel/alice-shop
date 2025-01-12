import { createStorefrontApiClient } from '@shopify/storefront-api-client'

export function getShopifyClient() {
  const config = useRuntimeConfig()
  if (import.meta.env.SSR) {
    const client = createStorefrontApiClient({
      storeDomain: `https://${config.public.SHOPIFY_DOMAIN}/api/2024-10/graphql.json`,
      apiVersion: '2024-10',
      privateAccessToken: config.public.SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN
    })
    return client
  }
  const client = createStorefrontApiClient({
    storeDomain: `https://${config.public.SHOPIFY_DOMAIN}/api/2024-10/graphql.json`,
    apiVersion: '2024-10',
    publicAccessToken: config.public.SHOPIFY_STOREFRONT_ACCESS_TOKEN
  })
  return client
}
