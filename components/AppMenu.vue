<template>
  <div>
    <div
      v-show="isMenuOpen"
      class="transition-opacity ease-in-out fixed z-10 left-0 top-0 w-screen h-screen bg-black bg-opacity-40 backdrop-blur-sm"
    ></div>
    <nav
      class="fixed z-20 top-12 left-0 flex flex-col gap-2 items-start justify-start pl-11 pr-1 py-1 uppercase bg-white bg-opacity-40 backgrop-blur-sm transition-all duration-300 ease-in drop-shadow-xl"
      :class="[
        { 'w-32 h-10 rounded-r-full': !isMenuOpen },
        { 'w-40 min-h-20 rounded-r-3xl': isMenuOpen }
      ]"
    >
      <button class="" @click.prevent.stop="toggleMenu">
        {{ isMenuOpen ? 'X' : 'Menu' }}
      </button>
      <div
        v-for="category in categories"
        :key="category.name"
        class="relative -left-[180%] bg-opacity-0 rounded-3xl h-max transition-all duration-300 ease-in"
        :class="{ 'left-0 bg-opacity-40': isMenuOpen }"
      >
        <CategoryItem :category="category" @click="isMenuOpen = false" />
      </div>
    </nav>
  </div>
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
