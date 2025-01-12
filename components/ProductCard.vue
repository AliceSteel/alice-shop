<template>
  <div
    class="flex flex-col items-start gap-4 border-2 rounded-xl border-alice-orange p-4 min-h-72 h-full justify-start bg-white text-black"
  >
    <img
      :src="image.url"
      :alt="image?.altText"
      class="w-full aspect-square object-cover"
    />
    <h3 class="font-semibold">{{ item.title }}</h3>
    <nuxt-link
      :to="`products/${item.handle}`"
      class="underline mt-auto hover:scale-110 transition-transform"
      >View more</nuxt-link
    >
  </div>
</template>

<script setup lang="ts">
  import type { Product, Image } from '~/types/Product'
  const props = withDefaults(defineProps<{ item: Product }>(), {
    item: () => ({
      id: '',
      title: '',
      images: {},
      price: {},
      stock: 0,
      description: 'string',
      handle: 'string'
    })
  })

  const image = computed<Image>(() => props.item.images?.edges[0]?.node || {})
</script>
