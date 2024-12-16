export type Category = {
  id: string
  level: number
  name: {
    en: string
    dk: string
  }
  categories?: Category[]
  path?: string
  hasSubcategory?: boolean
}
