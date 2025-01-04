<template>
  <div>
    <div v-if="status === 'pending'"></div>
    <div class="flex flex-wrap" v-else-if="product">
      <div
        class="flex-1 basis-80 flex flex-col items-center bg-transparent p-20"
      >
        <div v-for="(image, key) in images" :key="key">
          <img :src="image.url" alt="alt name" />
        </div>
      </div>
      <div
        class="flex-1 basis-72 flex flex-col items-start bg-white px-10 py-20 gap-5"
      >
        <h1 class="text-6xl font-semibold">{{ product.title }}</h1>
        <p>{{ product.description }}</p>

        <p v-if="!variants.length">
          Price: {{ price?.currencyCode }} {{ price?.amount }}
        </p>
        <div v-else v-for="(variant, key) in variants" :key="key">
          <label class="flex justify-start items-center gap-4">
            <input type="radio" name="size" />
            <span
              class="material-symbols-outlined flex items-center justify-center text-4xl rounded-full text-neon-green"
              :class="bgRadioColor"
            >
              done_outline </span
            >{{ variant.title }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Product, Image, Variant } from '~/types/Product.d'
  const product = ref<Product | null>(null)
  const route = useRoute()
  const productSlug = computed(() => route.params.productSlug as string)

  const { data, error, status } = await useFetch(
    `/api/categories/products/${productSlug.value}`
  )
  if (error.value) {
    console.error('Error fetching product:', error.value)
  }
  product.value = data.value

  useHead({
    title: `Alice Shop - ${productSlug.value}`.toLocaleUpperCase()
  })
  const images = computed<Image[]>(
    () => product.value?.images?.edges.map((edge: any) => edge.node) || []
  )
  const price = computed(() => {
    return {
      amount: product.value?.priceRange?.minVariantPrice?.amount || 'not ',
      currencyCode:
        product.value?.priceRange?.minVariantPrice?.currencyCode || 'available'
    }
  })
  const variants = computed<Variant[]>(
    () => product.value?.variants?.edges.map((edge: any) => edge.node) || []
  )
  const appConfig = useAppConfig()
  const bgRadioColor = computed(
    () => appConfig.theme.bgClass || appConfig.theme.default
  )
</script>

<style>
  .material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 100,
  'GRAD' 0,
  'opsz' 40
}
  label {
  position: relative;
}
label input {
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}
label .material-symbols-outlined {
  position: relative;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 0 4px;
  box-shadow: -1px -1px 3px rgba(255, 255, 255, 0.1),
    2px 2px 6px rgba(0, 0, 0, 0.8);
}
label .material-symbols-outlined:hover {
  box-shadow: -1px -1px 3px rgba(255, 255, 255, 0.1),
    2px 2px 6px rgba(0, 0, 0, 0.8),
    inset -2px -2px 10px rgba(255, 255, 255, 0.05),
    inset 2px 2px 10px rgba(0, 0, 0, 0.5);
}
label input:checked ~ .material-symbols-outlined {
  color: #00fff1;
  box-shadow: inset -2px -2px 10px rgba(255, 255, 255, 0.05),
    inset 2px 2px 10px rgba(0, 0, 0, 1);
  text-shadow: 0 0 5px #00fff1, 0 0 20px #00fff1;
}
</style>
