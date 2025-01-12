import { isAuthenticated } from '~/utils/isAuthenticated'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStatus = isAuthenticated()
  console.log('authStatus from auth_', authStatus)
  if (!authStatus) {
    console.log('started navigating')
    return navigateTo('/login?redirect=' + to.path)
  }
})
