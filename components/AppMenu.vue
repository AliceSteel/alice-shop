<template>
  <nav
    class="fixed z-20 top-10 -left-40 flex flex-col gap-2 items-start px-8 py-4 transition-all duration-300 ease-in bg-opacity-0 uppercase"
    :class="{ 'left-0 bg-white bg-opacity-40 rounded-3xl h-max backdrop-blur-sm': isMenuOpen }"
    
  >
    <button
      class="relative top-0 rounded-3xl p-4"
      :class="{ 'left-0' : isMenuOpen, 'bg-white bg-opacity-30 backdrop-blur-sm left-[130%]' : !isMenuOpen }"
      @click.prevent.stop="toggleMenu"
    >
      {{ isMenuOpen ? 'X' : 'Menu' }}
    </button>
    <div
      v-for="category in categories"
      :key="category.id"
      
    >
      <CategoryItem :category="category" />
    </div>

    
     
  </nav>
</template>

<script setup lang="ts">
  const isMenuOpen = ref<boolean>(false)
  const categories = ref(useCategory())

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }
</script>


