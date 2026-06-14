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

    <select
      name="theme"
      v-model="newBgTheme"
      @change="onSelected"
      class="bg-transparent h-[31.5px] border-[0.5px] border-black text-black rounded-3xl px-3 mx-1 w-8 hover:w-28 hover:cursor-pointer transition-all duration-500 ease-in-out focus-visible:outline-none outline-none"
    >
      <option value="" disabled selected class="overflow-hidden bg-transparent">
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
      to="#"
      title="not implemented yet"
      class="h-full px-1 flex items-center justify-center rounded-lg hover:scale-105 transition-all duration-500 ease-in-out"
    >
      <!--       <nuxt-img src="/basketIcon.svg" class="w-7 h-7 text-black" alt="cart" />
 -->

      <svg
        class="w-8 h-8"
        width="37"
        height="44"
        viewBox="0 0 37 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="37" height="44" fill="white" fill-opacity="0.01" />
        <path
          d="M18.5 0.599609C22.3915 0.599609 25.8763 2.82046 28.3721 6.33301C30.8685 9.84654 32.4004 14.68 32.4004 20C32.4004 25.32 30.8685 30.1535 28.3721 33.667C25.8763 37.1795 22.3915 39.4004 18.5 39.4004C14.6085 39.4004 11.1237 37.1795 8.62793 33.667C6.13147 30.1535 4.59961 25.32 4.59961 20C4.59961 14.68 6.13147 9.84654 8.62793 6.33301C11.1237 2.82046 14.6085 0.599609 18.5 0.599609Z"
          stroke="black"
          stroke-width="1.2"
        />
        <path
          d="M18.5 2C22.0795 2 25.2281 4.02052 27.4434 7.10254C29.6598 10.1863 31 14.396 31 19C31 23.604 29.6598 27.8137 27.4434 30.8975C25.2281 33.9795 22.0795 36 18.5 36C14.9205 36 11.7719 33.9795 9.55664 30.8975C7.3402 27.8137 6 23.604 6 19C6 14.396 7.3402 10.1863 9.55664 7.10254C11.7719 4.02052 14.9205 2 18.5 2Z"
          stroke="#E9B759"
          stroke-opacity="0.98"
          stroke-width="2"
        />
        <mask
          id="path-3-outside-1_59_196"
          maskUnits="userSpaceOnUse"
          x="0"
          y="12"
          width="37"
          height="32"
          fill="black"
        >
          <rect fill="white" y="12" width="37" height="32" />
          <path
            d="M1 12H36V33C36 38.5228 31.5228 43 26 43H11C5.47715 43 1 38.5228 1 33V12Z"
          />
        </mask>
        <path
          d="M1 12H36V33C36 38.5228 31.5228 43 26 43H11C5.47715 43 1 38.5228 1 33V12Z"
          fill="#E9B759"
        />
        <path
          d="M1 12H36H1M36.8 33C36.8 38.9647 31.9647 43.8 26 43.8H11C5.03532 43.8 0.2 38.9647 0.2 33H1.8C1.8 38.081 5.91898 42.2 11 42.2H26C31.081 42.2 35.2 38.081 35.2 33H36.8ZM11 43.8C5.03532 43.8 0.2 38.9647 0.2 33V12H1.8V33C1.8 38.081 5.91898 42.2 11 42.2V43.8ZM36.8 12V33C36.8 38.9647 31.9647 43.8 26 43.8V42.2C31.081 42.2 35.2 38.081 35.2 33V12H36.8Z"
          fill="black"
          mask="url(#path-3-outside-1_59_196)"
        />
        <path
          d="M1 12H36H1M36.8 33C36.8 38.9647 31.9647 43.8 26 43.8H11C5.03532 43.8 0.2 38.9647 0.2 33H1.8C1.8 38.081 5.91898 42.2 11 42.2H26C31.081 42.2 35.2 38.081 35.2 33H36.8ZM11 43.8C5.03532 43.8 0.2 38.9647 0.2 33V12H1.8V33C1.8 38.081 5.91898 42.2 11 42.2V43.8ZM36.8 12V33C36.8 38.9647 31.9647 43.8 26 43.8V42.2C31.081 42.2 35.2 38.081 35.2 33V12H36.8Z"
          fill="black"
          fill-opacity="0.2"
          mask="url(#path-3-outside-1_59_196)"
        />
        <path d="M31 11.6001H36.788" stroke="black" stroke-width="1.2" />
        <path
          d="M0.208984 11.6001L6.00003 11.6001"
          stroke="black"
          stroke-width="1.2"
        />
      </svg>
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
