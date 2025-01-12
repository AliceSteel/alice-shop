export const checkoutUrlQuery = (cartId: string) => `
  query {
    cart(id: "${cartId}") {
      checkoutUrl
    }
  }
`
