<template>
  <div
    ref="stageRef"
    class="w-full h-[200vh]"
    :class="domReady ? 'opacity-100' : 'opacity-0'"
  >
    <div class="fixed inset-0">
      <!-- Image + overlay: full screen on mobile, right half on desktop -->
      <div class="absolute inset-0 sm:left-1/2">
        <img
          src="../assets/elizabeth-french-km-UXgVKWZI-unsplash.jpg"
          class="object-cover w-full h-full"
          alt="after"
        />
        <div
          class="absolute inset-0 pointer-events-none opacity-65 backdrop-blur-sm sm:bg-white"
          :class="bgClassTheme"
          :style="dimLayerStyle"
        />
      </div>

      <!-- Text  -->
      <div
        class="w-full sm:w-1/2 h-full flex flex-col justify-center gap-10 p-8 pt-9 text-3xl sm:text-4xl text-bold sm:text-normal"
      >
        <p
          :class="bgClassTheme"
          class="bg-opacity-20 rounded-full p-5 [filter:drop-shadow(0_0_12px_#96ff00)]"
        >
          welcome, art collector, art studio & everyone curious
        </p>
        <div
          :style="lineVars(0)"
          :class="[
            bgClassTheme,
            'text-bolder bg-opacity-20 rounded-full p-5 opacity-[var(--line-op)] translate-y-[var(--line-y)] [filter:drop-shadow(0_0_12px_#96ff00)]'
          ]"
        >
          to a world of unique posters, where creativity meets culture.

          <nuxt-link
            to="/categories/posters"
            :style="lineVars(1)"
            class="underline-offset-1 underline w-fit"
          >
            <span>Discover Original Art</span>
            <FontAwesomeIcon :icon="faArrowRight" class="ml-2" />
          </nuxt-link>
        </div>
        <p
          :style="lineVars(2)"
          :class="[
            bgClassTheme,
            'text-bolder bg-opacity-20 rounded-full p-5 opacity-[var(--line-op)] translate-y-[var(--line-y)] [filter:drop-shadow(0_0_12px_#96ff00)]'
          ]"
        >
          Let our posters bring inspiration, individuality, and a splash of
          global flair.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
  import { ref, computed, onMounted, onUnmounted } from 'vue'

  const stageRef = ref<HTMLElement | null>(null)
  const reveal = ref(0) // 0..100
  const domReady = ref(false)

  const appConfig = useAppConfig()
  const bgClassTheme = computed(
    () => appConfig.theme.bgClass || appConfig.theme.default
  )
  const textProg = ref(0) // 0..1 text reveal progress
  let ticking = false

  const dimLayerStyle = computed(() => ({
    clipPath: `inset(0 ${reveal.value}% 0 0)`
  }))

  function clamp(v: number, min: number, max: number) {
    return Math.min(max, Math.max(min, v))
  }
  /*  function lineStyle(i: number) {
    const start = i * 0.05
    const p = clamp((textProg.value - start) / 0.35, 0, 1)
    const y = 50 * (1 - p)
    return {
      opacity: p,
      transform: `translateY(${y}px)`
    }
  }
 */
  function lineVars(i: number) {
    const start = i * 0.05
    const p = clamp((textProg.value - start) / 0.35, 0, 1)
    return {
      '--line-op': p,
      '--line-y': `${Math.round(50 * (1 - p))}px`
    }
  }
  function updateFromScroll() {
    if (!stageRef.value) return

    const rect = stageRef.value.getBoundingClientRect()
    const total = rect.height - window.innerHeight
    const p = total > 0 ? clamp(-rect.top / total, 0, 1) : 0

    reveal.value = Math.round(p * 100)
    // Start text a bit later so it feels like old timeline timing
    textProg.value = clamp((p - 0.05) / 0.55, 0, 1)
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
