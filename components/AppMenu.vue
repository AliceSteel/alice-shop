<template>
  <div class="uppercase">
    <div
      class="transition-opacity duration-300 ease-in-out fixed z-10 left-0 top-0 w-screen h-screen bg-black pointer-events-none"
      :class="[
        { 'bg-opacity-30 backdrop-blur-sm': isMenuOpen },
        { 'opacity-0': !isMenuOpen }
      ]"
    ></div>
    <nav
      class="fixed z-20 top-11 left-0 flex flex-col gap-2 items-start justify-start pl-9 pr-1 pt-1.5 uppercase bg-white bg-opacity-40 backgrop-blur-sm transition-all duration-300 ease-in drop-shadow-xl"
      :class="[
        { 'w-28 h-10 rounded-r-full': !isMenuOpen },
        { 'w-36 min-h-20 rounded-r-3xl delay-75': isMenuOpen }
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
