<template>
  <div>
    I am login page
    <button class="p-10 bg-red-600" @click="login">login</button>
  </div>
</template>

<script setup lang="ts">
  import { useConfigStore } from '~/stores/configStore'
  import { isAuthenticated } from '~/utils/isAuthenticated'
  import type { User } from '~/types/User.d'

  const route = useRoute()
  // const configStore = useConfigStore()
  //const { user } = storeToRefs(configStore)
  const user = useCookie<User>('user')
  const token = useCookie('token')

  const login = async () => {
    if (!token.value) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    const { data, error } = await useFetch('/api/user', {
      query: { userToken: token.value }
    })
    if (error.value) {
      throw createError(error.value)
    }
    user.value = data.value
    if (route.query.redirect && isAuthenticated()) {
      navigateTo(route.query.redirect as string, { replace: true })
    }
  }
</script>
