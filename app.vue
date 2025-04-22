<template>
  <div>
    <NuxtLayout name="default">
      <NuxtErrorBoundary>
        <NuxtPage />
        <template #error="{ error, clearError }">
          <p>
            Oh no, something broke on client!
            <code>{{ error }}</code>
          </p>
          <button @click="reset(clearError)" class="font-semibold">
            Home Page
          </button>
        </template>
      </NuxtErrorBoundary>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/userStore'
import { onMounted } from 'vue'

const userStore = useUserStore()

//client-side error handling:
const reset = async (clearError: () => void) => {
  await navigateTo('/')
  clearError()
}
onMounted(() => {
  userStore.initUser()
})
</script>

<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>
