import { defineStore } from 'pinia'
import type { User } from '~/types/User.d'

export const useConfigStore = defineStore('configStore', {
  state: () => ({
    productsAvailable: [] as string[],
    categories: [] as string[],
    user: {
      name: 'Alice',
      email: 'test@test.com'
    } as User | null | undefined
  }),
  actions: {
    async init() {
      const userCookie = useCookie<User>('user')
      if (userCookie.value) {
        this.user = userCookie.value
      }
    }
  }
})
