<template>
  <div>
    <AppHeader />
    <div class="p-8 w-full min-h-screen bg-lime-200 text-lg flex gap-8">
      <AppMenu />
      <NuxtErrorBoundary>
        <NuxtPage />
        <template #error="{ error }">
          <p>
            Oh no, something broke in a category!
            <code>{{ error }}</code>
          </p>
        </template>
      </NuxtErrorBoundary>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style>
  .router-link-active {
    color: red;
  }
</style>
