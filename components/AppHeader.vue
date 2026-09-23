<template>
  <header
    class="w-full px-9 py-1 h-11 fixed top-0 left-0 z-20 flex justify-end items-center gap-4 sm:gap-12 text-black transition-all duration-500 ease-in-out uppercase backdrop-blur-sm"
    :class="isScrolled ? 'gap-1 sm:gap-4 bg-transparent' : 'bg-white'"
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
      <div>SHOP</div>
    </nuxt-link>
    <div class="relative h-full cursor-pointer">
      <Palette
        :stroke-width="1"
        class="h-full w-full pointer-events-none absolute left-0 top-0 z-10 text-black"
      />

      <select
        title="Themes"
        v-model="newBgTheme"
        @change="onSelected"
        class="h-full w-[36px] appearance-none bg-transparent px-3 text-transparent outline-none cursor-pointer"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          class="text-black bg-white"
        >
          {{ option.name }}
        </option>
      </select>
    </div>

    <user-card />
  </header>
</template>

<script setup lang="ts">
  import UserCard from '~/components/UserCard.vue'
  import { Palette } from '@lucide/vue'

  const appConfig = useAppConfig()
  const options = [
    {
      name: 'default',
      value: 'bg-khaki text-white border-whitesm:text-black sm:border-black'
    },
    { name: 'transparent', value: 'bg-transparent text-black border-black' },
    {
      name: 'pink-blue',
      value: 'bg-blue-500 text-alice-pink border-alice-pink'
    },
    { name: 'neon-khaki', value: 'bg-khaki text-neon-green border-neon-green' }
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
