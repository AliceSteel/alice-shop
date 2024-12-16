<template>
  <div class="w-full flex flex-col items-center gap-4">
    <h4>Category {{ category }}</h4>
    <div class="flex flex-wrap gap-2">
      <div v-for="(product, key) in products" :key="key">
        <ProductCard :item="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()

  const category = computed(() => route.params.categorySlug as string)
  console.log('Category:', category.value)
  const products = await useCategoryForProducts(category?.value as string)
  console.log('Products:', products)
  useHead({
    title: `Alice Shop - ${category.value}`.toLocaleUpperCase()
  })
</script>
