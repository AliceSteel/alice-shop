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
const { user } = storeToRefs(userStore)

const clientId = config.public.CLIENT_ID
const token = ref<string | null>(null)

onMounted(async () => {
  // Attempt to get token from local storage or refresh if expired
  token.value = await getAccessToken()

  console.log('Access token obtained on mounted 32:', token.value)
  await fetchCustomerData()
  router.push('/') // Redirect to home page after successful login

})

async function getAccessToken() {
  const expirationTime = parseInt(expirationCookie.value || '0')
  console.log('getAccessToken fn: expiryTime 40: ', expirationTime)

  if (!refreshTokenCookie.value || !accessTokenCookie.value) {
    console.error('Refresh token is missing')
    await fetchAccessToken()
  }
  if (new Date().getTime() > expirationTime) {
    console.log('Access token expired, need to refresh')
    await refreshAccessToken()
  }
  else {
    console.log('Access token is still valid: ', accessTokenCookie.value, 'expirationTime: ', expirationTime)
  }
  return accessTokenCookie.value
}

async function fetchAccessToken() {
  console.log('Fetching access token  started 67...')
  const code = route.query.code as string
  const state = route.query.state as string
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

  if (error.value) {
    console.error('Error obtaining access token:', error.value)
  } else if (!data.value) {
    console.error('No data returned, data: ', data, data.value)
  } else {
    token.value = data.value.access_token
    storeToken(data.value.access_token, data.value.refresh_token, data.value.expires_in)
  }
}
async function refreshAccessToken() {
  console.log('Refreshing access token fn started...')
  const refreshToken = refreshTokenCookie.value


  if (!refreshToken) {
    console.error('Refresh token is missing 88')
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

  if (error.value) {
    console.error('Error refreshing access token:', error.value)
  }
  else if (!data) {
    console.error('No data returned for refresh token.')
  }
  console.log('all data: ', data.value)
  console.log('New Access Token after refresh:', data.value.access_token)
  storeToken(data.value.access_token, data.value.refresh_token, data.value.expires_in)
  token.value = data.value.access_token
}
/**
 * Store tokens and set expiration in cookies
 */
function storeToken(accessToken: string, refreshToken: string, expiresIn: number) {
  const expirationTime = new Date().getTime() + expiresIn * 1000
  console.log('Setting expiration time:', expirationTime)

  accessTokenCookie.value = accessToken
  refreshTokenCookie.value = refreshToken
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
    console.log('Customer data response:', response)
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