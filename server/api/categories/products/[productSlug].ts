import { defineEventHandler, type H3Event } from 'h3'
import { getShopifyClient } from '../../../utils/getShopifyClient'

export default defineEventHandler(async (event: H3Event) => {
  const { productSlug } = event?.context?.params as {
    productSlug: string | number
  }
  const shopifyClient = getShopifyClient()
  const productQuery = `
  query {
    product(handle: "${productSlug}") {
        id
        title
        handle
        description
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
    }
  }

`
  try {
    const { data, errors } = await shopifyClient.request(productQuery)
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
  } catch (error) {
    console.error('Error fetching product:', error)
    throw createError({
      statusCode: 404,
      statusMessage: 'Unknown error fetching product'
    })
  }
})
