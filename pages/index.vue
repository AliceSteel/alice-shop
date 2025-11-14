<template>
  <div class="w-full overflow-x-hidden">
    <section class="min-h-[30vh] flex items-center justify-center px-9">
      <h1>Let's make walls less boring!</h1>
    </section>
    <div class="pinContainer">
      <section
        class="comparisonSection absolute w-full sm:w-1/2 h-[60vh] aspect-square top-[10%] left-0 sm:right-0 sm:left-auto"
      >
        <div class="comparisonImage beforeImage w-full h-full">
          <div
            class="absolute top-0 z-10 w-full h-full flex items-center justify-center"
          >
            <FontAwesomeIcon
              :icon="faImage"
              class="h-12"
            />
          </div>

          <img
            src="../assets/elizabeth-french-km-UXgVKWZI-unsplash.jpg"
            alt="before"
            class="object-cover"
          />
        </div>
        <div class="comparisonImage afterImage z-20 w-full h-full">
          <img
            src="../assets/elizabeth-french-km-UXgVKWZI-unsplash.jpg"
            alt="after"
            class="object-cover w-full h-full absolute top-0"
          />
        </div>
      </section>
      <section
        class="about-us absolute top-3/4 sm:top-[10%] z-20 backdrop-blur-sm w-full sm:w-1/2 mr-auto animated-lines flex flex-col gap-5 px-8"
      >
        <h2 class="line">About Us</h2>
        <p class="line">
          Welcome to our poster shop—a vibrant online marketplace where global
          creativity comes to life. Our passion for art knows no borders, and
          we’ve made it our mission to bring artwork from around the world,
          curated to inspire and delight.
        </p>
        <p class="line">
          Whether you’re drawn to minimalist abstracts, bold pop art, or
          timeless vintage designs, our handpicked selection offers something
          for every taste and space.
        </p>
        <p class="line hidden sm:block">
          Let our posters bring inspiration, individuality, and a splash of
          global flair to your everyday surroundings.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
const appConfig = useAppConfig()
const bgColor = appConfig.theme.bgClass || appConfig.theme.default

const { $gsap } = useNuxtApp() as any
let tl: GSAPTimeline
onMounted(() => {
  tl = $gsap.timeline({
    scrollTrigger: {
      trigger: '.pinContainer',
      start: 'center center',
      end: '+=100%',
      pin: true,
      scrub: true,
      anticipatePin: 1
    }
  })

  tl.fromTo('.afterImage', { xPercent: 100 }, { xPercent: 0 }).fromTo(
    '.afterImage img',
    { xPercent: -100 },
    { xPercent: 0 },
    0
  )

  tl.fromTo('.about-us', { yPercent: 100 }, { yPercent: 10 }, 0.5)

  tl.fromTo(
    '.line',
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, stagger: 0.3 },
    0.5
  )
})
onUnmounted(() => {
  tl.scrollTrigger?.kill()
  tl.kill()
})
/*  const token = '123'

const tokenCookie = useCookie('token')
tokenCookie.value = token */
</script>

<style scoped>
.pinContainer {
  height: 100vh;
  position: relative;
}

.beforeImage img {
  filter: blur(8px);
}

.afterImage {
  position: absolute;
  overflow: hidden;
  top: 0;
}

.afterImage img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}

.comparisonImage img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}

/* .about-us {
  position: absolute;
  top: 13%;
  padding: 2rem;
  box-sizing: border-box;
} */
</style>
