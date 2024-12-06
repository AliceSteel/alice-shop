import DATA from '../../../data.json'

import { defineEventHandler, type H3Event } from 'h3'


export default defineEventHandler((event: H3Event) => {
    
const productSlug = event?.context?.params?.productSlug
    
const product = DATA.products.find((product) => product.id === Number(productSlug)) || 'product not found'

return product
})