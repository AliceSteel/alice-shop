<template>
  <div>
    <div v-if="status === 'pending'"></div>
    <div class="flex flex-col items-start gap-4 pt-10" v-else-if="product">
      <h1 class="text-center">Product Page</h1>
      <h4>{{ product.title }}</h4>
      <p>{{ product.description }}</p>
      <div class="w-full grid grid-cols-4 gap-2">
        <div v-for="(image, key) in product.images" :key="key">
          <img :src="image" alt="alt name" />
        </div>
      </div>

      <p>Price: {{ product.price.currencyCode }} {{ product.price.amount }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Product } from '~/types/Product.d'
  const product = ref<Product | null>(null)
  const route = useRoute()
  const productSlug = computed(() => route.params.productSlug as string)

  const { data, error, status } = await useFetch(
    `/api/categories/products/${productSlug.value}`
  )
  if (error.value) {
    console.error('Error fetching product:', error.value)
  }
  product.value = data.value ? normalizeShopifyProduct(data.value) : null

  useHead({
    title: `Alice Shop - ${productSlug.value}`.toLocaleUpperCase()
  })
  function normalizeShopifyProduct(shopifyProduct: any): Product {
    const imageUrls =
      shopifyProduct.images?.edges?.map((edge: any) => edge.node.url) || []
    return {
      id: shopifyProduct.id,
      title: shopifyProduct.title,
      handle: shopifyProduct.handle,
      description: shopifyProduct.description || '',
      images: imageUrls,
      price: {
        amount:
          shopifyProduct.priceRange.minVariantPrice.amount ||
          shopifyProduct.priceRange.maxVariantPrice.amount,
        currencyCode: shopifyProduct.priceRange.minVariantPrice.currencyCode
      },
      stock: shopifyProduct.totalInventory
    }
  }
</script>
