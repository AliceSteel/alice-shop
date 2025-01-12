<template>
  <div
    class="w-full scroller h-screen overflow-y-auto overflow-x-hidden -mt-11"
    v-if="product"
  >
    <section
      class="white flex h-[10vh] justify-center items-center bg-white text-black"
    >
      <h1>{{ product.title }}</h1>
    </section>

    <section class="gsap-wrap h-full flex w-full">
      <div class="p-wrap flex-1 relative h-[80vh] w-full sm:w-1/2 m-20">
        <div
          v-for="(image, key) in images"
          :key="key"
          class="panel w-full absolute top-0 left-0 bottom-0 bg-cover bg-center bg-no-repeat"
          :style="{ backgroundImage: `url(${image.url})` }"
        ></div>
      </div>

      <div
        class="flex-1 flex flex-col items-start justify-center bg-white px-10 py-20 gap-5 text-black w-full sm:w-1/2"
      >
        <p>{{ product.description }}</p>

        <p v-if="variants.length < 2">
          Price: {{ price?.currencyCode }} {{ price?.amount }}
        </p>
        <div
          v-else
          v-for="(variant, key) in variants"
          :key="key"
          class="flex justify-start items-center gap-4"
        >
          <label class="w-10 h-10 relative">
            <input
              type="radio"
              name="size"
              :value="variant"
              v-model="variantSelected"
            />
            <span
              class="material-symbols-outlined absolute top-0 left-0 w-10 h-10 flex items-center justify-center text-4xl rounded-full text-white !bg-alice-pink"
            >
              done_outline
            </span>
          </label>
          {{ variant.title }} : {{ variant.price?.currencyCode }}
          {{ variant.price?.amount }}
        </div>
        <button
          @click="handlePayment"
          :disabled="isLoading"
          class="bg-alice-pink text-black p-2 rounded-xl w-inherit text-center cursor-pointer"
        >
          {{
            isLoading
              ? 'Redirecting...'
              : `${price.amount} ${price.currencyCode} to payment`
          }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import type { Product, Image, Variant } from '~/types/Product.d'
  import { getShopifyClient } from '~/utils/getShopifyClient'
  import { cartCreateMutation } from '~/queries/cartCreateMutation'
  import { checkoutUrlQuery } from '~/queries/checkoutUrlQuery'

  const route = useRoute()
  const productSlug = computed(() => route.params.productSlug as string)
  const isLoading = ref(false)

  const product = ref<Product | null>(null)
  const { data, error } = await useFetch(
    `/api/categories/products/${productSlug.value}`
  )

  if (error.value) {
    console.error('Error fetching product:', error.value)
  }
  product.value = data.value

  useHead({
    title: `Alice Shop - ${productSlug.value}`.toLocaleUpperCase()
  })
  const images = computed<Image[]>(
    () => product.value?.images?.edges.map((edge: any) => edge.node) || []
  )
  const variants = computed<Variant[]>(
    () => product.value?.variants?.edges.map((edge: any) => edge.node) || []
  )
  const price = computed(() => {
    return variants.value.length < 2
      ? {
          amount: product.value?.priceRange?.minVariantPrice?.amount || 'not ',
          currencyCode:
            product.value?.priceRange?.minVariantPrice?.currencyCode ||
            'available'
        }
      : {
          amount: variantSelected.value?.price.amount,
          currencyCode: variantSelected.value?.price.currencyCode
        }
  })

  const variantSelected = ref<any>({
    price: { amount: 'select', currencyCode: 'a variant' }
  })
  if (variants.value.length < 2) {
    variantSelected.value = variants.value[0]
  }
  const emit = defineEmits(['handle-payment'])

  const paymentLink = ref('')
  const shopifyClient = getShopifyClient()

  const handlePayment = async () => {
    isLoading.value = true
    const cartCreateM = cartCreateMutation(variantSelected.value.id)

    try {
      const { data, errors } = await shopifyClient.request(cartCreateM)
      if (errors) {
        console.error('Error creating cart: ', errors)
        throw createError({
          data: errors,
          statusCode: 404,
          statusMessage: 'Failed to create cart'
        })
      }
      if (!data || !data.cartCreate || !data.cartCreate.cart) {
        throw new Error('Invalid response from Shopify API')
      }

      const cartId = data.cartCreate.cart.id

      const checkoutUrlQ = checkoutUrlQuery(cartId)
      const { data: checkoutData, errors: checkoutErrors } =
        await shopifyClient.request(checkoutUrlQ)
      console.log('checkoutData', checkoutData)
      if (checkoutErrors) {
        console.error('Error fetching checkoutUrl: ', errors)
        throw createError({
          data: errors,
          statusCode: 404,
          statusMessage: 'Failed to fetch checkoutUrl'
        })
      }
      paymentLink.value = checkoutData.cart.checkoutUrl
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
    await navigateTo(paymentLink.value, { external: true, redirectCode: 301 })
  }

  const { $gsap } = useNuxtApp() as any
  $gsap.registerPlugin(ScrollTrigger)

  onMounted(() => {
    $gsap.set('.panel', {
      zIndex: (i: number, target, targets) => targets.length - i
    })

    const panelElements = $gsap.utils.toArray('.panel')
    const panels = panelElements.slice(0, -1)
    panels.forEach((panel, i) => {
      $gsap
        .timeline({
          scrollTrigger: {
            trigger: 'section.gsap-wrap',
            scroller: '.scroller',
            start: () => 'top -' + window.innerHeight * (i + 0.5),
            end: () => '+=' + panels.length * window.innerHeight,
            scrub: true,
            toggleActions: 'play none reverse none',
            invalidateOnRefresh: true
          }
        })
        .fromTo(panel, { height: '100%' }, { height: 0 })
    })

    ScrollTrigger.create({
      trigger: 'section.gsap-wrap',
      scroller: '.scroller',
      scrub: true,
      pin: true,
      start: 'top top',
      end: '+=' + (panels.length + 1) * window.innerHeight,
      invalidateOnRefresh: true
    })
  })

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
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
 
label input {
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}
label .material-symbols-outlined {
  box-shadow: -1px -1px 3px rgba(255, 255, 255, 0.1),
    2px 2px 6px rgba(0, 0, 0, 0.8);
}
label .material-symbols-outlined:hover {
  box-shadow: -1px -1px 3px rgba(255, 255, 255, 0.1),
    2px 2px 6px rgba(0, 0, 0, 0.8),
    inset -2px -2px 10px rgba(255, 255, 255, 0.05),
    inset 2px 2px 10px rgba(0, 0, 0, 0.5);
}
label input:checked ~ .material-symbols-outlined {
  color: #00fff1;
  box-shadow: inset -2px -2px 10px rgba(255, 255, 255, 0.05),
    inset 2px 2px 10px rgba(0, 0, 0, 1);
  text-shadow: 0 0 5px #00fff1, 0 0 20px #00fff1;
}
</style>
