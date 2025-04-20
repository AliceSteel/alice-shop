<template>
  <div>
    <h1>Processing Login...</h1>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import type { AccessTokenResponseType } from '~/types/login.d'
import { useUserStore } from '~/stores/userStore'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { getShopifyClient } from '~/utils/getShopifyClient'

const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()
const userStore = useUserStore()

const accessTokenCookie = useCookie('access_token')
const refreshTokenCookie = useCookie('refresh_token')
const expirationCookie = useCookie('access_token_expiration')
const idTokenCookie = useCookie('id_token')

const { user } = storeToRefs(userStore)

const clientId = config.public.CLIENT_ID
const token = ref<string | null>(null)

onMounted(async () => {
  // Attempt to get token from cookies or refresh if expired
  token.value = await getAccessToken()

  await fetchCustomerData()

  const redirectBackToPage = localStorage.getItem('redirect-from-page')
  console.log('Redirecting back to page: ', redirectBackToPage)
  if (redirectBackToPage) {
    localStorage.removeItem('redirect-from-page')
    router.push(redirectBackToPage)
  }
  else router.push('/')
})

async function getAccessToken() {
  const expirationTime = parseInt(expirationCookie.value || '0')

  if (!refreshTokenCookie.value || !accessTokenCookie.value) {
    await fetchAccessToken()
  }
  if (new Date().getTime() > expirationTime) {
    await refreshAccessToken()
  }
  return accessTokenCookie.value
}

async function fetchAccessToken() {
  const code = route.query.code as string
  const codeVerifier = localStorage.getItem('code-verifier') as string

  const { data, error } = await useFetch<AccessTokenResponseType>('/api/shopify/callback', {
    method: 'POST',
    body: {
      grant_type: 'authorization_code',
      client_id: clientId,
      code,
      redirect_uri: `${window.location.origin}/login`,
      code_verifier: codeVerifier
    }
  })

  if (error.value || !data.value) {
    console.log('Error obtaining access token, login 66:', error?.value)

  } else {
    token.value = data.value.access_token
    storeTokens(data.value.access_token, data.value.refresh_token, data.value.expires_in, data.value.id_token)
  }
}
async function refreshAccessToken() {
  const refreshToken = refreshTokenCookie.value


  if (!refreshToken) {
    await fetchAccessToken()
    return
  }
  const { data, error } = await useFetch<AccessTokenResponseType>('/api/shopify/callback', {
    method: 'POST',
    body: {
      grant_type: 'refresh_token',
      client_id: clientId,
      refresh_token: refreshToken
    }
  })

  if (error.value || !data.value) {
    console.error('Error refreshing access token 91:', error?.value)
  }

  storeTokens(data.value.access_token, data.value.refresh_token, data.value.expires_in, data.value.id_token)
  token.value = data.value.access_token
}
/**
 * Store tokens and set expiration in cookies
 */
function storeTokens(accessToken: string, refreshToken: string, expiresIn: number, idToken: string) {
  const expirationTime = new Date().getTime() + expiresIn * 1000

  accessTokenCookie.value = accessToken
  refreshTokenCookie.value = refreshToken
  idTokenCookie.value = idToken
  expirationCookie.value = expirationTime.toString()
}

async function fetchCustomerData() {

  try {
    const response = await $fetch(
      `https://shopify.com/62268506202/account/customer/api/2024-10/graphql`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token.value,
          Origin: 'https://alice-shop.vercel.app',
        },
        body: JSON.stringify({
          operationName: 'GetCustomerData',
          query: 'query { customer { emailAddress { emailAddress } firstName }}',
          variables: {},
        }),
      }
    )

    if (!response) {
      console.error('Failed to fetch customer data, status:', response)
      return
    }
    user.value = {
      email: response.data.customer?.emailAddress?.emailAddress || '',
      name: response.data.customer?.firstName || '',
    }
    userStore.saveUserCookie(user.value)
  } catch (error) {
    console.error('Error fetching customer data:', error)
  }
}
</script>