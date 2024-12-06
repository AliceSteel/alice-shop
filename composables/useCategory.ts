import DATA from './data.json'

export type Category = {
  id: string
  parent_category_id: string
  level: number
  name: {
    en: string
    dk: string
  }
  categories?: Category[],
  path?: string,
  hasSubcategory?: boolean
}

export const useCategory = (): Category[] => {
  
  const extractLevel1Categories = (categories: Category[]): Category[] => {
    return categories.map((category: Category) => ({
      ...category,
      path: `/${category.name.en.toLowerCase().replace(/ /g, '-')}`,
      hasSubcategory: !!category?.categories?.length,
    }))
  }

  return extractLevel1Categories(DATA.categories.categories)
}

export const findCategory = (category: string) =>
  DATA.categories.categories.find((cat:Category) => cat.name.en.toLowerCase().replace(/ /g, '-') === category)
