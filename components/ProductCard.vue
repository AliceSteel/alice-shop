<template>
  <div
    class="flex flex-col items-start gap-4 border-2 rounded-xl border-orange-500 p-4 w-40 min-h-72 h-full justify-start bg-white"
  >
    <img :src="image" alt="product image" class="w-full" />
    <h3 class="font-semibold">{{ name }}</h3>
    <nuxt-link :to="`products/${item.id}`" class="underline mt-auto">View more</nuxt-link>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ item: any }>(), {
  item: () => ({
    id: 0,
    name: ''
  })
})

const name = props.item.name.en || props.item.name.dk

const image = computed(() => props.item.images?.[0] || '')
</script>
