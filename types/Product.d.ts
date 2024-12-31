export type Product = {
  id: string
  title: string
  images: string[]
  price: { amount: string; currencyCode: string }
  stock?: number
  description?: string
  handle: string
}
