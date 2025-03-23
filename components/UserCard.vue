<template>
  <div class="flex flex-col gap-1 backdrop-blur-sm rounded-full">
    <button @click="clickHandler">
      <span v-if="user.name" class="">Hi, {{ user.name }}</span>
      <div v-else class="flex items-center">
        <span class="inline-block sm:hidden material-symbols-outlined text-4xl"
          >account_circle</span
        >
        <p class="hidden sm:block">Login</p>
      </div>
    </button>
    <div v-if="user.name && isOpen" class="w-full bg-orange-300 p-2 rounded-lg">
      <h4>{{ user.name }}</h4>
      <p>{{ user.email }}</p>
    </div>
  </div>
</template>

<script setup="ts">
    import { useConfigStore } from '~/stores/configStore'

    const configStore = useConfigStore()
    const { user } = storeToRefs(configStore)
    const isOpen = ref(false)
    const clientId = useRuntimeConfig().public.CLIENT_ID
    const state = useState('state', () => generateRandomString())
    const nonce = useState('nonce', () => generateRandomString())

    const clickHandler = () => {
    if (!user.value.name) {
      console.log('Clicked, but User not logged in')
      // Not logged in yet, so redirect to Shopify login
      redirectToShopifyLogin()
    } else {
      console.log('Clicked, User logged in')
      isOpen.value = !isOpen.value
    }
  }
  const redirectToShopifyLogin = async () => {
    console.log('Redirecting to Shopify login fn started...')

    const verifier = await generateCodeVerifier()
    const challenge = await generateCodeChallenge(verifier)
    localStorage.setItem('code-verifier', verifier)

    const authorizationRequestUrl = new URL(
      `https://shopify.com/authentication/62268506202/oauth/authorize`
    )

    authorizationRequestUrl.searchParams.append(
      'scope',
      'openid email customer-account-api:full'
    )
    authorizationRequestUrl.searchParams.append('client_id', clientId)
    authorizationRequestUrl.searchParams.append('response_type', 'code')

    const redirectUri = `${window.location.origin}/callback`
    console.log('Redirect URI:', redirectUri)
    authorizationRequestUrl.searchParams.append('redirect_uri', redirectUri)
    authorizationRequestUrl.searchParams.append('state', state.value)
    authorizationRequestUrl.searchParams.append('nonce', nonce.value)
    authorizationRequestUrl.searchParams.append('code_challenge', challenge)
    authorizationRequestUrl.searchParams.append('code_challenge_method', 'S256')

    console.log('Generated URL line65:', authorizationRequestUrl.toString())

    window.location.href = authorizationRequestUrl.toString()
  }

  /* HELPER FNs */

  async function generateCodeVerifier() {
    const rando = generateRandomCode()
    return base64UrlEncode(rando)
  }

    async function generateCodeChallenge(codeVerifier) {
    const digestOp = await crypto.subtle.digest(
      { name: 'SHA-256' },
      new TextEncoder().encode(codeVerifier)
    )
    const hash = convertBufferToString(digestOp)
    return base64UrlEncode(hash)
  }

  function generateRandomCode() {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return String.fromCharCode.apply(null, Array.from(array))
  }

  function base64UrlEncode(str) {
    const base64 = btoa(str)
    // This is to ensure that the encoding does not have +, /, or = characters in it.
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
  }

  function convertBufferToString(hash) {
    const uintArray = new Uint8Array(hash)
    const numberArray = Array.from(uintArray)
    return String.fromCharCode(...numberArray)
  }
  function generateRandomString(length = 16) {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}
</script>

<style>
  .material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 100,
  'GRAD' 0,
  'opsz' 36
}
</style>
