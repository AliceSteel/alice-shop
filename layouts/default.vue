<template>
  <AppHeader />
  <div
    class="mt-11 w-full min-h-screen text-lg flex gap-8"
    :class="bgClassTheme"
  >
    <AppMenu />
    <div class="w-4/5 mx-auto">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  const appConfig = useAppConfig()
  const bgClassTheme = computed(
    () => appConfig.theme.bgClass || appConfig.theme.default
  )
</script>
