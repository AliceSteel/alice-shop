import { createStorefrontApiClient } from '@shopify/storefront-api-client'

export function getShopifyClient() {
  const config = useRuntimeConfig()
  const client = createStorefrontApiClient({
    storeDomain: `https://${config.public.SHOPIFY_DOMAIN}/api/2024-10/graphql.json`,
    apiVersion: '2024-10',
    privateAccessToken: config.public.SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN
  })

  return client
}
