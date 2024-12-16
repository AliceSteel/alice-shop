import DATA from '../../../data.json'
import { defineEventHandler, type H3Event } from 'h3'

export default defineEventHandler((event: H3Event) => {
  const { productSlug } = event?.context?.params as {
    productSlug: string | number
  }

  if (productSlug) {
    const product = DATA.products.find(
      (product) => product.id === Number(productSlug)
    )
    if (product) {
      return product
    } else {
      console.log('Product error server-sode:', productSlug)
      throw createError({
        statusCode: 404,
        message: 'Product not found from server-side'
      })
    }
  } else {
    console.error('Invalid product ID:', productSlug)
  }
})
