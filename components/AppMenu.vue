<template>
  <div class="uppercase">
    <div
      @click="toggleMenu"
      class="transition-opacity duration-300 ease-in-out fixed z-10 left-0 top-0 w-screen h-screen bg-black"
      :class="[
        { 'bg-opacity-30 backdrop-blur-sm': isMenuOpen },
        { 'opacity-0 pointer-events-none': !isMenuOpen }
      ]"
    ></div>
    <nav
      class="fixed z-20 top-11 left-0 flex flex-col items-start justify-start pl-9 p-1.5 capitalize bg-white bg-opacity-40 backdrop-blur-sm transition-all duration-300 ease-in drop-shadow-xl"
      :class="[
        { 'w-28 h-10 rounded-r-full': !isMenuOpen },
        { 'w-36 min-h-20 rounded-r-3xl delay-75': isMenuOpen }
      ]"
    >
      <button @click.prevent.stop="toggleMenu" class="pt-1 flex items-center">
        <span v-if="isMenuOpen">X</span>
        <FontAwesomeIcon :icon="faBars" class="w-auto" v-else />
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
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
