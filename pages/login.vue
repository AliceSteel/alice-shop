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

const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()

const clientId = config.public.CLIENT_ID
const token = ref<string| null>(null)
let refreshingPromise: Promise<void> | null = null


onMounted(async () => {
  // Attempt to get token from local storage or refresh if expired
  token.value = await getAccessToken()

  if(!token.value){
    console.log('code:', route.query.code)
    console.log('state:', route.query.state)
  const code = route.query.code as string
  /**
   * Perform OAuth flow if code is present
   */
    const codeVerifier = localStorage.getItem('code-verifier')
    if (!codeVerifier) {
      console.error('Code verifier is missing')
    } else {
    const tokenRequestUrl = 'https://shopify.com/authentication/62268506202/oauth/token'
    const tokenRequestBody = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId as string,
      code: code,
      redirect_uri: `${window.location.origin}/login`,
      code_verifier: codeVerifier
    })

    const { data, error } = await useFetch<AccessTokenResponseType>(tokenRequestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: tokenRequestBody.toString()
    })

    if (error.value) {
      console.error('Error obtaining access token:', error.value)
    }  else if (!data.value) {
      console.error('No data returned.')
    } else {
      console.log('Access Token62:', data.value.access_token)
      console.log('Refresh Token63:', data.value.refresh_token)
      storeToken(data.value.access_token, data.value.refresh_token, data.value.expires_in)
    }
  } 
}

  console.log('Access Token70:', token)
  console.log('Refresh Token71:', localStorage.getItem('refresh_token'))
  console.log('Expiration Time72:', localStorage.getItem('access_token_expiration'))
  fetchCustomerData()
  router.push('/') 
})


/**
 * Refresh the access token when it’s expired
 */
async function refreshAccessToken() {
  if (refreshingPromise) {
    // A refresh is already in progress; wait for it
    return refreshingPromise
  }
  
  refreshingPromise = (async () => {
    const refreshToken = localStorage.getItem('refresh_token')
    if (!refreshToken) {
      console.error('Refresh token is missing')
      refreshingPromise = null
      return
    }

    const tokenRequestUrl = 'https://shopify.com/authentication/62268506202/oauth/token'
    const tokenRequestBody = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: clientId,
      refresh_token: refreshToken
    })

    const { data, error } = await useFetch<AccessTokenResponseType>(tokenRequestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: tokenRequestBody.toString()
    })

    if (error.value) {
      console.error('Error refreshing access token:', error.value)
    } else if (!data.value) {
        console.error('No data returned for refresh token.')
      } else {
      console.log('New Access Token:', data.value.access_token)
      console.log('New Refresh Token:', data.value.refresh_token)
      storeToken(data.value.access_token, data.value.refresh_token, data.value.expires_in)
    }
    refreshingPromise = null
  })()
  // Wait for the refresh request to complete
  return refreshingPromise
}
/**
 * Retrieve the current access token or refresh it if expired
 */
async function getAccessToken() {
  const accessToken = localStorage.getItem('access_token')
  const expirationTime = parseInt(localStorage.getItem('access_token_expiration') || '0')

  if (new Date().getTime() > expirationTime) {
    await refreshAccessToken()
    return localStorage.getItem('access_token')
  } 
  return accessToken 
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
  console.log('Fetching customer data started...')
  const response = await useFetch(
    'https://shopify.com/62268506202/account/customer/api/2025-01/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Provide the token in Authorization header:
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        operationName: 'SomeQuery',
        query: `
          query {
            customer {
              emailAddress {
                emailAddress
              }
            }
          }
        `,
        variables: {}
      })
    }
    )

  if (!response.ok) {
    console.error('Failed to fetch customer data, status:', response.status)
    return
  }

  const result = await response.json()
  console.log('Customer data:', result)
  // Example: store the customer email in a Pinia store
  const userStore = useConfigStore()
  if (userStore.user) {
    userStore.user.email = result.data.customer.emailAddress.emailAddress

  }
}
</script>