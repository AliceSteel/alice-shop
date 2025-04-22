import { defineStore } from 'pinia'
import type { User } from '~/types/User.d'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: {
      name: '',
      email: ''
    } as User | null | undefined,
    isLoggedIn: false
  }),
  actions: {
    async initUser() {
      const userCookie = useCookie<User>('user')
      if (userCookie.value) {
        this.user = userCookie.value
        this.isLoggedIn = true
      }
    },
    
    saveUserCookie(user: User) {
      const userCookie = useCookie<User>('user', { maxAge: 60 * 60 * 24 * 7 }) // 7 days
      userCookie.value = user
      this.user = user
    },

    clearUserCookie() {
      const userCookie = useCookie<User>('user')
      userCookie.value = null
      this.user = null

      const accessTokenCookie = useCookie('access_token')
      const refreshTokenCookie = useCookie('refresh_token')
      const expirationCookie = useCookie('access_token_expiration')
      const idTokenCookie = useCookie('id_token')

      accessTokenCookie.value = null
      refreshTokenCookie.value = null
      expirationCookie.value = null
      idTokenCookie.value = null
    }
  }
})
