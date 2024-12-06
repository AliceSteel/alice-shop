<template>
  <div class="p-8 w-full min-h-screen bg-lime-200 text-lg flex gap-8">
    <div class="flex flex-col gap-4">
      <h1 class="font-bold text-left px-8">Shop</h1>
      <div class="flex flex-col items-start w-max p-8 bg-white rounded-xl gap-4">
        <h3 class="font-semibold">Categories</h3>
        <div v-for="category in categories" :key="category.id">
          <CategoryItem :category="category" />
        </div>
      </div>
    </div>
    <NuxtErrorBoundary>
      <NuxtPage />
      <template #error="{ error }">
        <p>
          Oh no, something broke in a category!
          <code>{{ error }}</code>
        </p>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCategory } from './composables/useCategory'
import CategoryItem from './components/CategoryItem.vue'

const categories = ref(useCategory())
</script>

<style scoped>
.router-link-active {
  color: red;
}
</style>
