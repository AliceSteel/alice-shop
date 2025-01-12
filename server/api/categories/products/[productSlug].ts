import { defineEventHandler, type H3Event } from 'h3'
import { getShopifyClient } from '~/utils/getShopifyClient'
import { productQuery } from '~/queries/productQuery'

export default defineEventHandler(async (event: H3Event) => {
  const { productSlug } = event?.context?.params as {
    productSlug: string
  }
  const shopifyClient = getShopifyClient()
  const productQ = productQuery(productSlug)

  try {
    const { data, errors } = await shopifyClient.request(productQ)
    if (errors) {
      console.error('Error fetching product: ', errors)
      throw createError({
        data: errors,
        statusCode: 404,
        statusMessage: 'Failed to fetch product'
      })
    }

    const product = data.product
    if (product) {
      return product
    } else {
      console.log('Product error server-sode:', productSlug)
      throw createError({
        statusCode: 404,
        message: 'Product not found from server-side'
      })
    }
  } catch (error: any) {
    console.error('Error fetching product:', error)
    throw createError({
      ...error,
      statusMessage: 'Unknown error fetching product'
    })
  }
})
