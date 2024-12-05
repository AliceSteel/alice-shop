import DATA from './data.json'

export const useProduct = (id: number) => DATA.products.find((product) => product.id === id)
export const findProductsByCategory = (category: string) => DATA.products.filter((product) => product.categories.includes(category))

