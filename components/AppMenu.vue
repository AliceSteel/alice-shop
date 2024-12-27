<template>
  <nav
    class="fixed z-20 top-10 left-0 flex flex-col gap-2 items-start px-8 py-4 uppercase"
  >
    <button
      class="relative left-0 top-0 rounded-full p-4 bg-white bg-opacity-30 backdrop-blur-sm"
      @click.prevent.stop="toggleMenu"
    >
      {{ isMenuOpen ? 'X' : 'Menu' }}
    </button>
    <div
      v-for="category in categories"
      :key="category.id"
      class="relative -left-full bg-lime-400 bg-opacity-0 rounded-3xl h-max backdrop-blur-sm p-4 transition-all duration-300 ease-in"
      :class="{ 'left-0 bg-opacity-40': isMenuOpen }"
    >
      <CategoryItem :category="category" />
    </div>
  </nav>
</template>

<script setup lang="ts">
  import type { Category } from '~/types/Category.d'

  const isMenuOpen = ref<boolean>(false)
  const categories = ref<Category[]>([])

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const { data, error } = await useFetch('/api/categoryMeta')
  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: 'Could not fetch categories'
    })
  }
  categories.value = data.value as Category[]
</script>
