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
        Origin: 'https://alice-shop.vercel.app',
      },
    })

    const contentType = req.headers.get('Content-Type')
    
    if (contentType && (contentType.includes('text/html') || contentType.includes('text/plain'))) {
      const textResponse = await req.text()
      return { data: textResponse }
    } else {
      return { message: 'Unexpected response type', contentType , data: req}
    }
  } catch (error:any) {
    console.error('Error during logout:', error)
    return { error: true, message: error.message}
  }
})