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
  const products = ref([])
  const category = computed(() => route.params.categorySlug as string)
  const { data, error } = await useFetch(`/api/categories/${category.value}`)
  if (error.value) {
    throw createError({ ...error.value })
  } else {
    products.value = data.value.products
  }
  useHead({
    title: `Alice Shop - ${category.value}`.toLocaleUpperCase()
  })
</script>
