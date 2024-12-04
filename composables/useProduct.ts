import PRODUCTS from './PRODUCTS'

export type Product = {
  category: string
  title: string
  imageUrl?: string
  id?: number
  path?: string
}

export const useProduct = (): Product[] => {
  return PRODUCTS.map((product:Product) => ({
    ...product,
    path: `/${product.category}/products/${product.title.toLowerCase().replace(/ /g, '-')}`,
  }))
}
