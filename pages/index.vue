<template>
  <div
    class="w-full h-[200vh] relative"
    ref="stageRef"
    :class="domReady ? 'opacity-100' : 'opacity-0'"
  >
    <!-- TEXT SECTION -->
    <section
      class="sticky h-screen top-0 left-0 z-20 w-full sm:w-1/2 flex flex-col justify-center gap-44 px-8 text-4xl"
    >
      <p>welcome, art collector, art studio & everyone curious</p>
      <div :style="lineStyle(0)">
        <nuxt-link
          to="/categories/posters"
          :style="lineStyle(1)"
          class="underline-offset-1 underline w-fit"
        >
          <span>Discover Original Art</span>
          <FontAwesomeIcon :icon="faArrowRight" class="ml-2" />
        </nuxt-link>
      </div>

      <p class="hidden sm:block" :style="lineStyle(2)">
        Let our posters bring inspiration, individuality, and a splash of global
        flair.
      </p>
    </section>
    <!-- Image with dimmed layer -->

    <section class="fixed w-full sm:w-1/2 h-screen top-11 right-0">
      <img
        src="../assets/elizabeth-french-km-UXgVKWZI-unsplash.jpg"
        alt="after"
        class="object-cover w-full h-full"
      />

      <div
        class="absolute inset-0 opacity-90 bg-white/65 backdrop-blur-md pointer-events-none"
        :style="dimLayerStyle"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
  import { ref, computed, onMounted, onUnmounted } from 'vue'

  const stageRef = ref<HTMLElement | null>(null)
  const reveal = ref(0) // 0..100
  const domReady = ref(false)

  const textProg = ref(0) // 0..1 text reveal progress
  let ticking = false

  const dimLayerStyle = computed(() => ({
    clipPath: `inset(0 ${reveal.value}% 0 0)`
  }))

  function clamp(v: number, min: number, max: number) {
    return Math.min(max, Math.max(min, v))
  }
  function lineStyle(i: number) {
    const start = i * 0.05
    const p = clamp((textProg.value - start) / 0.35, 0, 1)
    const y = 50 * (1 - p)
    return {
      opacity: p,
      transform: `translateY(${y}px)`
    }
  }

  function updateFromScroll() {
    if (!stageRef.value) return

    const rect = stageRef.value.getBoundingClientRect()
    const total = rect.height - window.innerHeight
    const p = total > 0 ? clamp(-rect.top / total, 0, 1) : 0

    reveal.value = Math.round(p * 100)
    // Start text a bit later so it feels like old timeline timing
    textProg.value = clamp((p - 0.12) / 0.55, 0, 1)
  }

  function onScroll() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      updateFromScroll()
      ticking = false
    })
  }

  onMounted(() => {
    updateFromScroll()
    domReady.value = true
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateFromScroll)
  })
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', updateFromScroll)
  })
</script>
