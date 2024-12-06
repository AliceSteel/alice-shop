<template>
  <div class="w-full flex flex-col items-center gap-4">
    <h4>Category {{ category }}</h4>
    <div class="w-full flex flex-wrap gap-2">
      <div v-for="(product, key) in products" :key="key">
        <ProductCard :item="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from '~/components/ProductCard.vue'
import { useCategoryForProducts } from '~/composables/useCategoryForProducts'

const route = useRoute()

const category = computed(() => route.params.categorySlug)

const products = await useCategoryForProducts(category?.value as string)
</script>
