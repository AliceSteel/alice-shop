<template>
  <div v-if="status === 'pending'"></div>
  <div class="flex flex-col items-start gap-4 pt-10" v-else-if="product">
    <h1 class="text-center">Product Page</h1>
    <h4>{{ product.name.en }}</h4>
    <p>Brand: {{ product.brand }}</p>
    <div class="w-full grid grid-cols-4 gap-2">
      <div v-for="(image, key) in product.images" :key="key">
        <img :src="image" alt="alt name" />
      </div>
    </div>

    <p>Price: £ {{ product.price }}</p>
  </div>
</template>

<script setup lang="ts">
  import type { Product } from '~/types/Product.d'

  const route = useRoute()
  const productSlug = computed(() => route.params.productSlug as string)
  const { data, error, status } = await useFetch(
    `/api/categories/products/${productSlug.value}`
  )
  if (error.value) {
    console.error('Error fetching product:', error.value)
  }
  const product = data.value as Product

  useHead({
    title: `Alice Shop - ${productSlug.value}`.toLocaleUpperCase()
  })
</script>
