<template>
  <div class="flex flex-col gap-1 backdrop-blur-sm rounded-full">
    <nuxt-link :to="login" @click="clickHandler">
      <span v-if="user.name">{{ 'PIC' }}</span>
      <span v-else class="material-symbols-outlined text-4xl flex items-center"
        >account_circle</span
      >
    </nuxt-link>
    <div v-if="user.name && isOpen" class="w-full bg-orange-300 p-2 rounded-lg">
      <h4>{{ user.name }}</h4>
      <p>{{ user.email }}</p>
    </div>
  </div>
</template>

<script setup="ts">
  import { useConfigStore } from '~/stores/configStore'

  const configStore = useConfigStore()
  const { user } = storeToRefs(configStore)

  const isOpen = ref(false)
  const login = computed(() => (user.name ? '#' : '/login'))
  const clickHandler = () => {
    isOpen.value = !isOpen.value
  }
</script>

<style>
  .material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 100,
  'GRAD' 0,
  'opsz' 36
}
</style>
