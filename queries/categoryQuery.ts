export const categoryQuery = (categorySlug: string) =>  `
query {
  collection(handle: "${categorySlug}") {
    id
    description
     image{
      url
      altText
    }
    products(first: 10) {
      edges {
        node {
          id
          description
          title
          handle
          images(first: 1) {
            edges {
              node {
                id
                url
                width
                height
                altText
              }
            }
          }
        }
      }
    }
  }
}
`
