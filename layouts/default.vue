<template>
  <div class="mt-11 w-full min-h-screen text-lg font-roboto" :class="bgClassTheme">
    <AppHeader />
    <AppMenu />

    <slot />
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
const bgClassTheme = computed(
  () => appConfig.theme.bgClass || appConfig.theme.default
)
</script>
