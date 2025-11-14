<template>
  <div>
    <div class="flex gap-1">
     <button class="underline" type="button" @click="handleClick">
        {{ category.name }}
      </button>
      <div v-if="hasSubcategory" class="cursor-pointer" @click="toggle">
        {{ ' >' }}
      </div>
    </div>
    <div v-if="isOpen" class="ml-4">
      <div v-for="subCategory in category.categories" :key="subCategory.name">
        <CategoryItem :category="subCategory"  @navigate="emit('navigate', $event)"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Category } from '~/types/Category.d'

defineOptions({ name: 'CategoryItem' })
const emit = defineEmits<{ (e: 'navigate', to: string): void }>()

const props = withDefaults(defineProps<{ category: Category }>(), {
  category: () => ({
    name: '',
    categories: []
  })
})

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}
const hasSubcategory = computed(() => props.category.categories?.length)

const handleClick = () => {
  if (!props.category.name) return
  emit('navigate', `/categories/${props.category.name}`)
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
