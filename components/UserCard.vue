<template>
  <div class="w-fit flex flex-col items-end gap-1 self-start">
    <button
      class="rounded-full bg-orange-300 px-2 py-1 w-fit"
      @click="clickHandler"
    >
      Pic
    </button>
    <div v-if="user && isOpen" class="w-full bg-orange-300 p-2 rounded-lg">
      <h4>{{ user.name }}</h4>
      <p>{{ user.email }}</p>
    </div>
  </div>
</template>

<script setup="ts">
  import { useConfigStore } from '~/stores/configStore'
  import { storeToRefs } from 'pinia'

  const configStore = useConfigStore()
  const { user } = storeToRefs(configStore)

  const isOpen = ref(false)

  const clickHandler = () => {
    isOpen.value = !isOpen.value
  }
</script>
