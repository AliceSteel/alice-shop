import type { User } from '~/types/User.d'
import { useCookie } from 'nuxt/app'

export function isAuthenticated(): boolean {
  const userFromCookie = useCookie<User>('user')
  console.log('userFromCookie', userFromCookie)
  return !!userFromCookie.value
}
