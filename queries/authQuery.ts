const clientId = useRuntimeConfig().public.CLIENT_ID

const authorizationRequestUrl = new URL(
  `https://shopify.com/authentication/62268506202/oauth/authorize`
)

authorizationRequestUrl.searchParams.append(
  'scope',
  'openid email customer-account-api:full'
)
authorizationRequestUrl.searchParams.append('client_id', clientId)
authorizationRequestUrl.searchParams.append('response_type', 'code')
authorizationRequestUrl.searchParams.append('redirect_uri', `<redirect_uri>`)
authorizationRequestUrl.searchParams.append('state', '<state>')
authorizationRequestUrl.searchParams.append('nonce', '<nonce>')

// Public client
const verifier = await generateCodeVerifier()
const challenge = await generateCodeChallenge(verifier)
localStorage.setItem('code-verifier', verifier)

authorizationRequestUrl.searchParams.append('code_challenge', challenge)
authorizationRequestUrl.searchParams.append('code_challenge_method', 'S256')

window.location.href = authorizationRequestUrl.toString()

/* HELPER FNs */

async function generateCodeVerifier() {
  const rando = generateRandomCode()
  return base64UrlEncode(rando)
}

async function generateCodeChallenge(codeVerifier: string) {
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

function base64UrlEncode(str: string) {
  const base64 = btoa(str)
  // This is to ensure that the encoding does not have +, /, or = characters in it.
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

function convertBufferToString(hash: ArrayBuffer) {
  const uintArray = new Uint8Array(hash)
  const numberArray = Array.from(uintArray)
  return String.fromCharCode(...numberArray)
}
