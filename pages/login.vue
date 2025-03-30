<template>
  <div>
    <h1>Processing Login...</h1>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import type { AccessTokenResponseType } from '~/types/login.d'
import { useConfigStore } from '~/stores/configStore'
import { onMounted , ref} from 'vue'
import { getShopifyClient } from '~/utils/getShopifyClient'

const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()
const userStore = useConfigStore()


const clientId = config.public.CLIENT_ID
const token = ref<string| null>(null)

onMounted(async () => {
  // Attempt to get token from local storage or refresh if expired
  token.value = await getAccessToken()

  if(!token.value){
    localStorage.setItem('my-oauth-state', route.query.state as string)
  const code = route.query.code as string
  /**
   * Perform OAuth flow if code is present
   */
    const codeVerifier = localStorage.getItem('code-verifier')
    if (!codeVerifier) {
      console.error('Code verifier is missing')
    } else {

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
    }  else if (!data.value) {
      console.error('No data returned.')
    } else {
      token.value = data.value.access_token
      storeToken(data.value.access_token, data.value.refresh_token, data.value.expires_in)
    }
  } 
}
  if(token.value){
    fetchCustomerData()
    router.push('/') // Redirect to home page after successful login
  } else {
    console.error('Failed to obtain access token73')
  }
  
})

/**
 * Retrieve the current access token or refresh it if expired
 */
async function getAccessToken() {
  const expirationTime = parseInt(localStorage.getItem('access_token_expiration') || '0')
  console.log('Gettin with expiry date  token...', expirationTime)
  if(expirationTime === 0) {
    console.log('No access token found')
    return null
  }

  if (new Date().getTime() > expirationTime) {
    console.log('Access token expired, need to refresh')
    await refreshAccessToken()
  } 
  const accessToken = localStorage.getItem('access_token')
  const newExpirationTime = parseInt(localStorage.getItem('access_token_expiration') || '0')
  console.log('Access Token expiration time92:', newExpirationTime)
  return accessToken 
}
/**
 * Refresh the access token when it’s expired
 */
 async function refreshAccessToken() {
  console.log('Refreshing access token strted...')

  const refreshToken = localStorage.getItem('refresh_token')
  if (!refreshToken) {
      console.error('Refresh token is missing')
      refreshingPromise = null
      return
  }
  const response = await useFetch<AccessTokenResponseType>('/api/shopify/callback', {
      method: 'POST',
      body: {
        grant_type: 'refresh_token',
        client_id: clientId,
        refresh_token: refreshToken
      }
  })

  if (response.error) {
    console.error('Error refreshing access token:', response)
  } 
  else if (!response.data) {
    console.error('No data returned for refresh token.')
  } 
  
    console.log('all data: ', response.data.value)
    console.log('New Access Token:', response.data.value.access_token)
    storeToken(response.data.value.access_token, response.data.value.refresh_token, response.data.value.expires_in)
    token.value = response.data.value.access_token
  }
/**
 * Store tokens and set expiration in localStorage
 */
 function storeToken(accessToken: string, refreshToken: string, expiresIn: number) {
  localStorage.setItem('access_token', accessToken)
  localStorage.setItem('refresh_token', refreshToken)
  const expirationTime = new Date().getTime() + expiresIn * 1000
  localStorage.setItem('access_token_expiration', expirationTime.toString())
}

async function fetchCustomerData() {
  console.log('Fetching customer data 2024-10:')

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
          query: 'query { customer { emailAddress { emailAddress } displayName }}',
          variables: {},
        }),
      }
    )

    if (!response) {
      console.error('Failed to fetch customer data, status:', response)
      return
    }
    console.log('Customer data response:', response)
    userStore.user = {
      email: response.data.customer?.emailAddress?.emailAddress || '',
      name: response.data.customer?.displayName || '',
    }
  } catch (error) {
    console.error('Error fetching customer data:', error)
  }
}
</script>