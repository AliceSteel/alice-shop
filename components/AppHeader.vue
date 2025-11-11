<template>
  <header
    class="w-full px-9 py-1 h-11 fixed top-0 left-0 z-20 flex justify-end items-center gap-4 sm:gap-12 text-black transition-all duration-500 ease-in-out uppercase"
    :class="{ 'gap-1 sm:gap-4': isScrolled }"
  >
    <nuxt-link
      to="/"
      class="font-antonio mr-auto text-xl h-full tracking-wider flex items-center rounded-lg overflow-hidden transition-all duration-500 ease-in-out backdrop-blur-sm"
      title="Home"
      ><div
        class="overflow-hidden transition-all ease-in duration-500 delay-300"
        :class="[
          { 'w-16 delay-0': !isScrolled },
          { 'w-[0.6rem] font-bold': isScrolled }
        ]"
      >
        ALICE
      </div>
      <span v-if="isScrolled">.</span>
      <div
      >
        SHOP
      </div>
    </nuxt-link>

    <select
      name="theme"
      v-model="newBgTheme"
      @change="onSelected"
      class="bg-transparent backdrop-blur-sm text-black border-[0.2px] border-gray-900 rounded-3xl max-h-8 px-3 mx-1 w-8 hover:w-28 hover:cursor-pointer transition-all duration-500 ease-in-out"
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
    <nuxt-link to="#" title="not implemented yet" class="h-full backdrop-blur-sm">
      <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="currentColor"><path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/></svg>
    </nuxt-link>
  </header>
</template>

<script setup lang="ts">
import UserCard from '~/components/UserCard.vue'

const appConfig = useAppConfig()
const options = [
  { name: 'transparent', value: 'bg-transparent' },
  { name: 'Blue', value: 'bg-blue-500 text-alice-pink' },
  { name: 'Khaki', value: 'bg-khaki text-neon-green' }
]
const newBgTheme = ref<string>('')

const onSelected = () => {
  appConfig.theme.bgClass = newBgTheme.value
}
const isScrolled = ref<boolean>(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 10
  })
})
</script>

<style>
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 100,
    'GRAD' 0,
    'opsz' 40
}
</style>
