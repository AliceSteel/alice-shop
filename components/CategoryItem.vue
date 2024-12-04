<template>
  <div>
    <div @click="toggle" class="cursor-pointer">
      <div class="underline underline-2 hover:text-red-500">
        {{ category.name.en }}
      </div>
    </div>
    <div v-if="isOpen" class="ml-4">
      <div v-for="subCategory in category.categories" :key="subCategory.id">
        <CategoryItem :category="subCategory" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Category } from '../composables/useCategory'

withDefaults(defineProps<{ category: Category }>(), {
  category: () => ({
    id: '',
    parent_category_id: '',
    level: 0,
    name: {
      en: '',
      dk: ''
    },
    categories: [],
    path: ''
  })
})

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
