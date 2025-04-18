//https://shopify.com/authentication/62268506202/logout
import { defineEventHandler} from 'h3'

export default defineEventHandler(async (event) => {
  const logoutUrl = new URL(`https://shopify.com/authentication/62268506202/logout`)
  let idToken = getCookie(event, 'access_token') || '0'
  logoutUrl.searchParams.append('id_token_hint', idToken)

  

  const req = await fetch(logoutUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Origin: 'https://alice-shop.vercel.app',
    }
  })

  if (!req.ok) {
    console.log('response ids not ok', req)
    return { error: true, status: req.status }
  }

  return await req.json() 
})