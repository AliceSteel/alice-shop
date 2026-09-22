export const cartCreateMutation = (variantId: string, email?: string) => `
  mutation {
    cartCreate(
      input: {
        lines: [
          {
            quantity: 1
            merchandiseId: "${variantId}"
          }
        ]
        ${email ? `buyerIdentity: { email: "${email}" }` : ''}
        attributes: [{
          key: "cart_attribute",
          value: "This is a cart attribute"
}]
      }
    ) {
      cart {
        id
        createdAt
        updatedAt
        lines(first: 10) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
        buyerIdentity {
          email
        }
        attributes {
          key
          value
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
          totalDutyAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`
