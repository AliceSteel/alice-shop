//https://shopify.com/authentication/62268506202/logout
import { defineEventHandler} from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const logoutUrl = new URL(`https://shopify.com/authentication/62268506202/logout`)
    const idToken = getCookie(event, 'id_token') || '0'
    logoutUrl.searchParams.append('id_token_hint', idToken)

    const req = await fetch(logoutUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        Origin: 'https://alice-shop.vercel.app',
      },
    })

    const contentType = req.headers.get('Content-Type')
    if (contentType && contentType.includes('application/json')) {
      const response = await req.json()
      return response
    } else {
      const textResponse = await req.text()
      console.log('Non-JSON response:', textResponse)
      return { message: 'Non-JSON response received', data: textResponse }
    }
  } catch (error) {
    console.error('Error during logout:', error)
    return { error: true, message: error }
  }
})