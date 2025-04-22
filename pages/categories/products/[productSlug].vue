<template>
  <div v-if="product">
    <section class="flex flex-wrap sm:flex-nowrap">
      <div class="flex flex-col gap-5 w-full sm:w-1/2">
        <NuxtImg
          v-for="(image, key) in images"
          :key="key"
          class="min-h-[80vh] object-cover object-center mx-auto sm:mx-0"
          :src="image.url"
          :alt="image.altText"
        />
      </div>
         
      <div
        class="w-full sm:w-1/2 bg-white text-black uppercase relative"
        >
        <div class="sticky top-0 h-fit  flex flex-col items-start justify-center px-10 py-20 gap-5"> 
          <h1>{{ product.title }}</h1>
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
                class="material-symbols-outlined absolute top-0 left-0 w-10 h-10 flex items-center justify-center text-4xl rounded-full text-white bg-alice-orange"
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
            class="bg-alice-orange text-white p-2 rounded-xl w-inherit text-center cursor-pointer w-full uppercase"
          >
            {{
              isLoading
                ? 'Redirecting...'
                : `${price.amount} ${price.currencyCode} to payment`
            }}
          </button>
        </div>
        
      
      </div>
    </section>
    <mounting-info/>
  </div> 
</template>

<script setup lang="ts">
import type { Product, Image, Variant } from '~/types/Product.d'
import { getShopifyClient } from '~/utils/getShopifyClient'
import { cartCreateMutation } from '~/queries/cartCreateMutation'
import { checkoutUrlQuery } from '~/queries/checkoutUrlQuery'
import MountingInfo from '~/components/MountingInfo.vue'

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

label input:checked~.material-symbols-outlined {
  color: #00fff1;
  box-shadow: inset -2px -2px 10px rgba(255, 255, 255, 0.05),
    inset 2px 2px 10px rgba(0, 0, 0, 1);
  text-shadow: 0 0 5px #00fff1, 0 0 20px #00fff1;
}
</style>
