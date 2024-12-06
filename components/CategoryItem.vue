<template>
  <div>
    <div class="flex gap-1">
      <nuxt-link
        :to="`/categories/${category.name.en.toLowerCase().replace(/ /g, '-')}`"
        class="underline"
      >
        {{ category.name.en }}
      </nuxt-link>
      <div v-if="hasSubcategory" class="cursor-pointer" @click="toggle">
        {{ ' >' }}
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

const props = withDefaults(defineProps<{ category: Category }>(), {
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
const hasSubcategory = computed(() => props.category.categories?.length)
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
