<template>
  <header
    class="w-full px-9 py-1 h-11 fixed top-0 left-0 z-20 flex justify-end items-center text-black gap-10 transition-all duration-500 ease-in-out"
    :class="{ 'gap-4': isScrolled }"
  >
    <nuxt-link
      to="/"
      class="text-xl h-full font-semibold tracking-wider flex items-center mr-auto w-96 rounded-lg overflow-hidden transition-all duration-500 ease-in-out backdrop-blur-sm"
      title="Home"
      ><div
        class="overflow-hidden transition-all ease-in duration-500 delay-300"
        :class="[{ 'w-20 delay-0': !isScrolled }, { 'w-4 ': isScrolled }]"
      >
        ALICE
      </div>
      <div
        class="overflow-hidden transition-all ease-in duration-500 delay-300"
        :class="[{ 'w-20 delay-0': !isScrolled }, { 'w-3 ': isScrolled }]"
      >
        SHOP
      </div>
    </nuxt-link>

    <select
      name="theme"
      v-model="newBgTheme"
      @change="onSelected"
      class="bg-transparent backdrop-blur-sm text-black border-[0.2px] border-gray-900 rounded-3xl py-0.5 px-1 mx-1 w-7 hover:w-28 hover:cursor-pointer transition-all duration-500 ease-in-out"
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
    <nuxt-link to="/basket" title="Cart" class="backdrop-blur-sm h-full -mt-2">
      <span class="material-symbols-outlined text-4xl">shopping_bag</span>
    </nuxt-link>
  </header>
</template>

<script setup lang="ts">
  const appConfig = useAppConfig()
  const options = [
    { name: 'Transparent', value: 'bg-transparent' },
    { name: 'Blue', value: 'bg-baby-blue' }
  ]
  const newBgTheme = ref<string>('')

  const onSelected = () => {
    appConfig.theme.bgClass = newBgTheme.value
  }
  const isHovered = ref<boolean>(false)
  const isScrolled = ref<boolean>(false)

  onMounted(() => {
    window.addEventListener('scroll', () => {
      isScrolled.value = window.scrollY > 10
    })
  })
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
