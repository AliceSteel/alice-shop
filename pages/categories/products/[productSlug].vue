<template>
  <div class="w-4/5 mx-auto flex flex-col items-start gap-4">
    <h1 class="text-center">Product Page</h1>
    <h4>{{ name }}</h4>
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

  const route = useRoute()

  const pageTitle = computed(() => route.params.productSlug as string)
  useHead({
    title: pageTitle.value
  })

  const product = await useProduct(route?.params?.productSlug as string)

  const name = computed(() =>
    product ? product.name?.en || product.name?.dk : 'Product Name'
  )
</script>
