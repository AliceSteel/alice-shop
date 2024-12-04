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
  path?: string
}
/* export const useCategory = (): Category[] => {
  const flattenCategories = (categories: Category[], parentPath = ''): Category[] => {
    return categories.reduce((acc: Category[], category: Category) => {
      const path = `${parentPath}/${category.name.en.toLowerCase().replace(/ /g, '-')}`
      acc.push({ ...category, path })
      if (category.categories) {
        acc.push(...flattenCategories(category.categories, path))
      }
      return acc
    }, [])
  }

  return flattenCategories([DATA.categories])
} */
export const useCategory = (): Category[] => {
  const extractLevel1Categories = (categories: Category[]): Category[] => {
    return categories.map((category: Category) => ({
      ...category,
      path: `/${category.name.en.toLowerCase().replace(/ /g, '-')}`
    }))
  }

  return extractLevel1Categories(DATA.categories.categories)
}