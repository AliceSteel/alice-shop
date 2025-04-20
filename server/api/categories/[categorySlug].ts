import { defineEventHandler, type H3Event } from 'h3'
import { getShopifyClient } from '~/utils/getShopifyClient'
import { categoryQuery } from '~/queries/categoryQuery'


export default defineEventHandler(async (event: H3Event) => {
  const shopifyClient = getShopifyClient()
  const categorySlug =
    event.context.params?.categorySlug || 'not found category'

  const collectionQuery = categoryQuery(categorySlug)

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

    const collection = data.collection
   
    if (!collection) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Collection not found'
      })
    }
    return collection
  } catch (error) {
    console.error('Error fetching collection:', error)

    throw createError({
      statusCode: 404,
      statusMessage: 'Unknown error fetching collection'
    })
  }
})
