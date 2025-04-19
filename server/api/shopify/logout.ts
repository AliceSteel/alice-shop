//https://shopify.com/authentication/62268506202/logout
import { defineEventHandler} from 'h3'

export default defineEventHandler(async (event) => {
  const logoutUrl = new URL(`https://shopify.com/authentication/62268506202/logout`)
  let idToken = getCookie(event, 'id_token') || '0'
  logoutUrl.searchParams.append('id_token_hint', idToken)

  const req = await fetch(logoutUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      Origin: 'https://alice-shop.vercel.app',
    }
  })
  const response = await req.json()

  return response
})