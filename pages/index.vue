<template>
  <div class="w-full overflow-x-hidden">
    <section class="min-h-[50vh] flex items-center justify-center">
      <h1>Let's make walls less boring!</h1>
    </section>
    <div class="pinContainer">
      <section class="comparisonSection">
        <div class="comparisonImage beforeImage">
          <div
            class="absolute top-0 z-10 w-full h-full flex items-center justify-center"
          >
            <span class="material-icons-outlined text-9xl">
              add_photo_alternate
            </span>
          </div>

          <img
            src="../assets/elizabeth-french-km-UXgVKWZI-unsplash.jpg"
            alt="before"
          />
        </div>
        <div class="comparisonImage afterImage z-20">
          <img
            src="../assets/elizabeth-french-km-UXgVKWZI-unsplash.jpg"
            alt="after"
          />
        </div>
      </section>
      <section
        class="about-us w-[50vw] mr-auto animated-lines flex flex-col gap-5"
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
        <p class="line">
          Let our posters bring inspiration, individuality, and a splash of
          global flair to your everyday surroundings.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { $gsap } = useNuxtApp() as any
  let tl: GSAPTimeline
  onMounted(() => {
    tl = $gsap.timeline({
      scrollTrigger: {
        trigger: '.pinContainer',
        start: 'top top',
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

    tl.fromTo('.about-us', { yPercent: 100 }, { yPercent: 50 }, 0.5)

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

.comparisonSection {
  width: 50%;
  position: absolute;
  right:0;
  top:0;
  padding-bottom: 56.25%;
}
.comparisonImage {
  width: 100%;
  height: 100%;
}
.beforeImage img {
  filter: blur(8px);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
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

.about-us {
  position: absolute;
  top: 13%;
  padding: 2rem;
  box-sizing: border-box;
}
</style>
