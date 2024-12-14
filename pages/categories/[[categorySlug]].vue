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

  const products = await useCategoryForProducts(category?.value as string)

  useHead({
    title: `Alice Shop - ${category.value}`.toLocaleUpperCase()
  })
</script>
