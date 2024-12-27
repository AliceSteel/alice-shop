<template>
  <div class="flex flex-col items-end gap-1 self-start">
    <nuxt-link
      :to="login"
      @click="clickHandler"
      class="flex items-center pt-0.5"
    >
      <span v-if="user.name">{{ 'PIC' }}</span>
      <span v-else class="material-icons-outlined text-2xl"> face</span>
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
  span {
  font-family: 'Material Icons';
}
</style>
