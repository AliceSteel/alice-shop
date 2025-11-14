<template>
  <div class="w-4/5 mx-auto flex flex-col items-center gap-4">
    <h4>Category {{ category }}</h4>
    <div
      class="w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2 pb-10"
    >
      <product-card
        v-for="(product, key) in products"
        :key="key"
        :item="product.node"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/Product'
import { useProductStore } from '~/stores/productStore'
import { storeToRefs } from 'pinia'

const route = useRoute()
const products = ref<{ node: Product }[]>([])
const category = computed(() => route.params.categorySlug as string)
const productStore = useProductStore()
const { mountingDescription, mountingPicture } = storeToRefs(productStore)

const { data, error } = await useFetch(`/api/categories/${category.value}`)
if (error.value) {
  throw createError({ ...error.value })
}

products.value = data.value.products.edges as { node: Product }[]
mountingDescription.value = data.value.description as string
mountingPicture.value = data.value.image as {
  url: string
  altText: string
}

useHead({
  title: `Alice Shop - ${category.value}`.toLocaleUpperCase()
})
</script>
