import DATA from '../../data.json'

import { defineEventHandler, type H3Event } from 'h3'


export default defineEventHandler((event: H3Event) => {
    
const categorySlug = event.context.params?.categorySlug || 'not found category'
    
const products = DATA.products.filter((product) => product.categories.includes(categorySlug))

return products
})