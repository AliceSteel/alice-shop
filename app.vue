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

  //client-side error handling:
  const reset = async (clearError: () => void) => {
    await navigateTo('/')
    clearError()
  }
  const configStore = useConfigStore()

  onMounted(() => {
    configStore.init()
  })
</script>

<style>
  .router-link-active {
  color: red;
}
</style>
