export const collectionsQuery = (first: number) =>`
 query {
  collections(first: ${first}) {
    edges {
      node {
        id
        handle
        title
      }
    }
  }
}
`
