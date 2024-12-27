import { defineStore } from 'pinia'
import type { User } from '~/types/User.d'

export const useConfigStore = defineStore('configStore', {
  state: () => ({
    productsAvailable: [] as string[],
    categories: [] as string[],
    user: {
      name: '',
      email: ''
    } as User | null | undefined
  }),
  actions: {
    async init() {
      const userCookie = useCookie<User>('user')
      if (userCookie.value) {
        this.user = userCookie.value
      }
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
