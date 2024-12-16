import { defineEventHandler } from 'h3'
import DATA from '../data.json'

export default defineEventHandler(() => {
  const productNames = DATA.products.map(
    (product) => product.name.en || product.name.dk
  )
  return productNames
})
