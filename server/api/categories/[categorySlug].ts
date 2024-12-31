import { defineEventHandler, type H3Event } from 'h3'
import { getShopifyClient } from '../../utils/getShopifyClient'

export default defineEventHandler(async (event: H3Event) => {
  const shopifyClient = getShopifyClient()
  const categorySlug =
    event.context.params?.categorySlug || 'not found category'

  const collectionQuery = `
    query {
      collection(handle: "${categorySlug}") {
        id
        products(first: 10) {
          edges {
            node {
              id
              description
            }
          }
        }
      }
    }
  `

  try {
    const { data, errors } = await shopifyClient.request(collectionQuery)

    if (errors) {
      console.error('Error fetching collection: ', errors)
      throw createError({
        data: errors,
        statusCode: 404,
        statusMessage: 'Failed to fetch collection'
      })
    }

    const collections = data.collection.products.edges
    console.log('collections:', collections)
    if (!collections) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Collection not found'
      })
    }
    return collections
  } catch (error) {
    console.error('Error fetching collection:', error)

    throw createError({
      statusCode: 404,
      statusMessage: 'Unknown error fetching collection'
    })
  }
})
