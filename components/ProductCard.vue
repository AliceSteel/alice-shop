<template>
  <div
    class="flex flex-col items-start gap-4 border-2 rounded-xl border-orange-500 p-4 w-40 min-h-72 h-full justify-start bg-white"
  >
    <img :src="image" alt="product image" class="w-full" />
    <h3 class="font-semibold">{{ item.title }}</h3>
    <nuxt-link :to="`products/${item.handle}`" class="underline mt-auto"
      >View more</nuxt-link
    >
  </div>
</template>

<script setup lang="ts">
  import type { Product } from '~/types/Product'
  const props = withDefaults(defineProps<{ item: Product }>(), {
    item: () => ({
      id: '',
      title: '',
      images: [],

      price: {
        amount: 'string',
        currencyCode: 'string'
      },
      stock: 0,
      description: 'string',
      handle: 'string'
    })
  })

  const image = computed(() => props.item.images?.[0] || '')
</script>
