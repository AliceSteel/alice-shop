import type { H3Event } from 'h3'
import { getShopifyClient } from '~/utils/getShopifyClient'
import { collectionsQuery }  from '~/queries/collectionsQuery'

export default defineEventHandler(async (_event: H3Event) => {
  const shopifyClient = getShopifyClient()

  const { data, errors } = await shopifyClient.request(collectionsQuery(20))

  if (errors) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch categories',
      data: errors
    })
  }

  const collections = data?.collections?.edges ?? []

  return collections.map(({ node }: any) => ({
    id: node.id,
    name: node.handle,
    title: node.title
  }))
})