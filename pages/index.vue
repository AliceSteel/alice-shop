<template>
  <div
    ref="stageRef"
    class="w-full h-[200vh] sm:h-[300vh] font-bold"
    :class="domReady ? 'opacity-100' : 'opacity-0'"
  >
    <div class="fixed inset-0">
      <!-- Image + overlay: full screen on mobile, right half on desktop -->
      <div class="absolute inset-0 sm:left-1/2">
        <NuxtImg
          src="/warIsOver.jpg"
          class="object-none object-position-top sm:object-cover sm:object-position-none w-full h-full"
          alt="after"
        />
        <div
          class="absolute inset-0 pointer-events-none opacity-65 backdrop-blur-sm sm:bg-white max-sm:!bg-black"
          :class="bgClassTheme"
          :style="dimLayerStyle"
        />
      </div>

      <!-- Text  -->
      <div
        class="relative w-full sm:w-1/2 h-full max-sm:!bg-transparent"
        :class="bgClassTheme"
      >
        <!-- Step 1 -->
        <div
          class="absolute inset-0 flex flex-col justify-center gap-12 p-9 sm:p-14 md:p-10"
          :class="[{ 'pointer-events-none': stepTransition >= 1 }]"
          :style="step1Style"
        >
          <p
            class="h-16 border-b-[1.5px] border-current w-8 overflow-visible text-nowrap uppercase text-base sm:text-2xl"
          >
            01 / find
          </p>
          <h1>
            <span class="uppercase text-7xl font-200">something <br /></span>
            <span
              class="bg-opacity-30 uppercase text-7xl font-200 opacity-[var(--line-op)] translate-y-[var(--line-y)]"
              :style="lineVarsFor(step1LocalP, 0)"
            >
              worth <br />
              looking at
            </span>
          </h1>

          <p
            :style="lineVarsFor(step1LocalP, 1)"
            class="text-xl opacity-[var(--line-op)] translate-y-[var(--line-y)]"
          >
            Original posters <br />
            for curious spaces
          </p>
          <div :style="lineVarsFor(step1LocalP, 2)" class="relative bottom-1">
            <span>scroll</span>
            <div class="h-20 border-l-[1.5px] border-current"></div>
          </div>
        </div>
        <!-- Step 2 -->
        <div
          class="absolute inset-0 flex flex-col justify-start sm:justify-center gap-8 sm:gap-12 px-9 pt-12 sm:p-14 text-black sm:text-inherit bg-white/20 sm:bg-white/0"
          :class="{ 'pointer-events-none': stepTransition <= 0 }"
          :style="step2Style"
        >
          <p
            class="h-16 border-b-[1.5px] border-current w-8 overflow-visible text-nowrap uppercase font-bold text-base sm:text-2xl"
          >
            02 / live with it
          </p>
          <h1 class="bg-opacity-30 uppercase text-7xl font-200">
            let art <br />
            be part <br />
            of your story
          </h1>

          <p
            :style="lineVarsFor(step2LocalP, 0)"
            class="hidden sm:block text-xl opacity-[var(--line-op)] translate-y-[var(--line-y)]"
          >
            Posters that feel at home <br />
            in real life
          </p>

          <nuxt-link
            to="/categories/posters"
            class="text-base p-3 border border-current w-fit opacity-[var(--line-op)] translate-y-[var(--line-y)] tracking-widest bg-white sm:bg-transparent"
            :style="lineVarsFor(step2LocalP, 1)"
          >
            discover <span class="hidden md:inline-block">the collection</span>
            <MoveRight class="inline-block h-4" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { MoveRight } from '@lucide/vue'

  const STEP_COUNT = 2
  const TRANSITION_WIDTH = 0.4 // portion of a step's scroll range used for the step1<->step2 handoff
  let ticking = false

  const stageRef = ref<HTMLElement | null>(null)
  const reveal = ref(0) // 0..100
  const domReady = ref(false)
  const stepPos = ref(0) // 0..STEP_COUNT overall step position
  const stepTransition = ref(0) // 0..1 transition progress between steps

  const appConfig = useAppConfig()

  const bgClassTheme = computed(
    () => appConfig.theme.bgClass || appConfig.theme.default
  )

  const dimLayerStyle = computed(() => ({
    clipPath: `inset(0 ${reveal.value}% 0 0)`
  }))

  // Mirrors the line-reveal motion: step1 exits the way it entered, step2 enters the same way
  const step1Style = computed(() => ({
    opacity: 1 - stepTransition.value,
    transform: `translateY(${-60 * stepTransition.value}px)`
  }))
  const step2Style = computed(() => ({
    opacity: stepTransition.value,
    transform: `translateY(${60 * (1 - stepTransition.value)}px)`
  }))

  function clamp(v: number, min: number, max: number) {
    return Math.min(max, Math.max(min, v))
  }

  const step1LocalP = computed(() => clamp(stepPos.value, 0, 1))
  const step2LocalP = computed(() => clamp(stepPos.value - 1, 0, 1))

  function lineVarsFor(localP: number, i: number) {
    const start = i * 0.05
    const p = clamp((localP - start) / 0.35, 0, 1)
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
    stepPos.value = clamp(p * STEP_COUNT, 0, STEP_COUNT)

    stepTransition.value = clamp(
      (stepPos.value - (1 - TRANSITION_WIDTH / 2)) / TRANSITION_WIDTH,
      0,
      1
    )
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
