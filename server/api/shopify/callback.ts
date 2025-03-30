import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const tokenRequestUrl = 'https://shopify.com/authentication/62268506202/oauth/token'
  let params = new URLSearchParams({
    grant_type: body.grant_type,
    client_id: body.client_id,
  })

  if (body.grant_type === 'authorization_code') {
    params.append('code', body.code)
    params.append('redirect_uri', body.redirect_uri)
    params.append('code_verifier', body.code_verifier)
  } else if (body.grant_type === 'refresh_token') {
    params.append('refresh_token', body.refresh_token)
  }

  const req = await fetch(tokenRequestUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  })

  if (!req.ok) {
    console.log('response ids not ok', req)
    return { error: true, status: req.status }
  }

  return await req.json()
})