<template>
  <div>
    <section class="panel">
      <h1 class="header-section">Scroll to see the before/after</h1>
    </section>

    <section class="comparisonSection">
      <div class="comparisonImage beforeImage">
        <img src="https://assets.codepen.io/16327/before.jpg" alt="before" />
      </div>
      <div class="comparisonImage afterImage">
        <img src="https://assets.codepen.io/16327/after.jpg" alt="after" />
      </div>
    </section>
    <section class="w-full flex flex-col items-start gap-4">
      <h2>About Us</h2>
      <p>
        Welcome to our poster shop—a vibrant online marketplace where global
        creativity comes to life. Our passion for art knows no borders, and
        we’ve made it our mission to bring together an eclectic range of artwork
        from around the world, curated to inspire and delight. From emerging
        talents in bustling cities to renowned masters in far-off corners of the
        globe, our collection showcases diverse artistic expressions in a
        variety of styles and themes. Whether you’re drawn to minimalist
        abstracts, bold pop art, or timeless vintage designs, our handpicked
        selection offers something for every taste and space.
      </p>
      <p>
        Above all, we believe that art has the power to bridge cultures and
        spark new perspectives. By celebrating international artists and making
        their work accessible to everyone, we aim to cultivate a community of
        art enthusiasts who appreciate the beauty of global collaboration.
      </p>
      <p>
        Thank you for choosing our shop—we’re thrilled to be part of your
        journey in discovering and displaying exceptional artwork from around
        the world. Let our posters bring inspiration, individuality, and a
        splash of global flair to your everyday surroundings.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
  const { $gsap } = useNuxtApp() as any

  onMounted(() => {
    $gsap.utils.toArray('.comparisonSection').forEach((section: any) => {
      const tl = $gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'center center',
          end: () => '+=' + section.offsetWidth,
          scrub: true,
          pin: true,
          anticipatePin: 1
        },
        defaults: { ease: 'none' }
      })

      // animate the container one way...
      tl.fromTo(
        section.querySelector('.afterImage'),
        { xPercent: 100, x: 0 },
        { xPercent: 0 }
      )
        // ...and the image the opposite way (at the same time)
        .fromTo(
          section.querySelector('.afterImage img'),
          { xPercent: -100, x: 0 },
          { xPercent: 0 },
          0
        )
    })
  })
  /*  const token = '123'

  const tokenCookie = useCookie('token')
  tokenCookie.value = token */
</script>

<style>
  body {
  height: 300vh;
  background-color: #111;
  color: white;
  overflow-x: hidden;
}

h1,
h2 {
  font-weight: 400;
  max-width: none;
}

.comparisonSection {
  position: relative;
  padding-bottom: 56.25%; /* to maintain aspect ratio (responsive!) */
}
.comparisonImage {
  width: 100%;
  height: 100%;
}
.afterImage {
  position: absolute;
  overflow: hidden;
  top: 0;
  transform: translate(100%, 0px);
}
.afterImage img {
  transform: translate(-100%, 0px);
}
.comparisonImage img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}
.panel {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
}
</style>
