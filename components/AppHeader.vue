<template>
  <header
    class="w-full px-9 py-1 h-11 fixed top-0 left-0 z-10 flex justify-end items-center text-black gap-4"
  >
    <nuxt-link
      to="/"
      class="mr-auto h-full flex items-center gap-4 bg-transparent pr-4 backdrop-blur-sm"
      title="Homepage"
    >
      <img src="../public/logo1.png" alt="logo" class="h-full" />
      <h2 class="text-2xl font-semibold">
        {{ random }}
      </h2>
    </nuxt-link>

    <select
      name="theme"
      v-model="newBgTheme"
      @change="onSelected"
      class="bg-transparent backdrop-blur-sm text-black border-2 border-black rounded-3xl p-2 w-10 hover:w-40 hover:cursor-pointer transition-all duration-500 ease-in-out"
    >
      <option
        value=""
        disabled
        class="overflow-hidden bg-transparent border-black"
      >
        Select a theme
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
      class="h-full flex items-center gap-4 bg-transparent backdrop-blur-sm"
    >
      <span class="material-symbols-outlined text-2xl"> local_mall </span>
    </nuxt-link>
  </header>
</template>

<script setup lang="ts">
  const randomNum = useState<number>('randomNum', () => Math.random())

  const random: number = randomNum.value * 100

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
  .material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 40
}
</style>
