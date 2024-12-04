<template>
  <div class="p-8 w-full min-h-screen flex flex-col bg-lime-200">
    <h1 class="font-bold text-center p-5">Shop</h1>
    <div class="flex flex-row gap-8">
      <div class="flex flex-col items-start w-max p-8 bg-white rounded-xl">
        <h3 class="font-bold">Categories</h3>
        <!-- <div v-for="(category, index) in categories" :key="index">
          <nuxt-link :to="category" class="underline underline-2 hover:text-red-500">
            {{ category }}
          </nuxt-link>
        </div> -->
        <div v-for="category in categories" :key="category.id">
          <CategoryItem :category="category" />
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
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useCategory } from '../composables/useCategory'
import CategoryItem from '../components/CategoryItem.vue'

const categories = ref(useCategory())
console.log('categories', categories.value)
//const categories = computed(() => Array.from(new Set(products.map((product) => product.category))))
</script>

<style scoped>
.router-link-active {
  color: red;
}
</style>
