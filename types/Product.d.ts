export type Product = {
  id: string
  title: string
  images?: {
    edges:
      | Array<{
          node: Image
        }>
      | Image[]
  }
  priceRange?: { minVariantPrice?: { amount?: string; currencyCode?: string } }
  stock?: number
  description?: string
  handle: string
  variants?: {
    edges:
      | Array<{
          node: Variant
        }>
      | Variant[]
  }
}
export type Image = {
  id?: string
  url: string
  width?: number
  height?: number
  altText?: string
}
export type Variant = {
  id: string
  title: string
  availableForSale: boolean
  price: { amount: string; currencyCode: string }
}
