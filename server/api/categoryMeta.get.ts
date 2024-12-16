import DATA from '../data.json'
import type { Category } from '~/types/Category.d'

export default defineEventHandler(() => {
  const mapCategories = (categories: Category[]): Category[] => {
    return categories.map((category: Category) => {
      const path = `/categories/${category.name.en.toLowerCase().replace(/ /g, '-')}`
      const hasSubcategory = !!category.categories?.length

      return {
        ...category,
        path,
        hasSubcategory,
        categories: category.categories
          ? mapCategories(category.categories)
          : []
      }
    })
  }

  return mapCategories(DATA.categories)
})
