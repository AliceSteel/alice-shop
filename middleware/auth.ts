export default defineNuxtRouteMiddleware((to, from) => {
  const user = useConfigStore().user
  if (!user?.name && to.path == '/basket') {
    return navigateTo('/login?redirectTo=${to.path}')
  }
  return
})
