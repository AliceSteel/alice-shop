<template>
  <div>
    <div class="flex gap-1">
      <button class="underline" type="button" @click="handleClick">
        {{ category.name }}
      </button>
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
      id: '',
      name: '',
      title: ''
    })
  })

  const isOpen = ref(false)
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
