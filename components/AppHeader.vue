<template>
  <header
    class="w-full px-9 py-1 h-11 fixed top-0 left-0 z-20 flex justify-end items-center text-black gap-4"
  >
    <nuxt-link
      to="/"
      class="mr-auto h-full rounded-lg overflow-hidden drop-shadow-xl hover:drop-shadow-2xl"
      title="Home"
    >
      <img src="~/assets/logo1.png" alt="logo" class="h-full" />
    </nuxt-link>

    <select
      name="theme"
      v-model="newBgTheme"
      @change="onSelected"
      class="bg-transparent backdrop-blur-sm text-black border border-black rounded-3xl py-0.5 px-1 w-7 hover:w-30 hover:cursor-pointer transition-all duration-500 ease-in-out"
    >
      <option
        value=""
        disabled
        selected
        class="overflow-hidden bg-transparent border-black"
      >
        theme
      </option>
      <option
        class="bg-transparent"
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select>
    <user-card />
    <nuxt-link
      to="/basket"
      title="Cart"
      class="gap-4 bg-transparent backdrop-blur-sm"
    >
      <span class="material-symbols-outlined text-4xl transparent"
        >shopping_bag</span
      >
    </nuxt-link>
  </header>
</template>

<script setup lang="ts">
  const appConfig = useAppConfig()
  const options = [
    { name: 'Transparent', value: 'bg-transparent' },
    { name: 'Blue', value: 'bg-blue-200' }
  ]
  const newBgTheme = ref<string>('')

  const onSelected = () => {
    appConfig.theme.bgClass = newBgTheme.value
  }
</script>

<style>
  span {
  font-family: 'Material Symbols Outlined';
  font-weight: 200;
}
  .material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 100,
  'GRAD' 0,
  'opsz' 40
}
</style>
