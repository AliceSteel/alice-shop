<template>
  <div class="p-8 bg-white flex-grow rounded-xl">
    <h3>Title: {{ product.title }}</h3>
    <h3>Product Slug: {{ $route.params.productSlug }}</h3>
    <img :src="image" alt="Product Image" />
  </div>
</template>

<script setup lang="ts">
import { useProduct } from '~/composables/useProduct'
import { type Product } from '~/composables/useProduct'

const products = useProduct()
const route = useRoute()
console.log('route', route.params.productSlug)
console.log('products', products)
const product = computed(() => {
  return (
    products.find((product: Product) => product.title == route.params.productSlug) || {
      title: 'not found',
      imageUrl: ''
    }
  )
})
console.log('product', product.value)
const image = computed<string>(() => {
  return product.value.imageUrl || ''
})
const pageTitle = computed<string>(() => {
  return `${product.value.title} - ${route.params.productSlug}`
})

useHead({
  title: pageTitle.value
})
</script>
