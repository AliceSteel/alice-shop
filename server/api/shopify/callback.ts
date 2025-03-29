import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const tokenRequestUrl = 'https://shopify.com/authentication/62268506202/oauth/token'

  const req = await fetch(tokenRequestUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: body.grant_type,
      client_id: body.client_id,
      code: body.code,
      redirect_uri: body.redirect_uri,
      code_verifier: body.code_verifier,
      refresh_token: body.refresh_token // for refresh case
    })
  })

  if (!req.ok) {
    return { error: true, status: req.status }
  }

  return await req.json()
})