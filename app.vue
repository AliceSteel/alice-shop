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
  import { useConfigStore } from '~/stores/configStore'

  const configStore = useConfigStore()
  const { init } = configStore

  init()
  //client-side error handling:
  const reset = async (clearError: () => void) => {
    await navigateTo('/')
    clearError()
  }
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
