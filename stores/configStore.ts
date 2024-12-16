import { defineStore } from 'pinia'

export const useConfigStore = defineStore('configStore', {
  // arrow function recommended for full type inference
  state: () => ({
    productsAvailable: [] as string[],
    categories: [] as string[],
    user: {
      /* name: 'Alice',
      email: 'test@test.com' */
    }
  }),
  actions: {
    async init() {
      try {
        const { data, error } = await useFetch('/api/names')
        if (error.value) {
          console.error('Error fetching product names:', error.value)
        } else {
          this.productsAvailable = data.value as string[]
        }
      } catch (err) {
        console.error('Error initializing config store:', err)
      }
    }
  }
})
