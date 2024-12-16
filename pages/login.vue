<template>
  I am login page
  <button @click="login">login</button>
</template>

<script setup lang="ts">
  import { useConfigStore } from '~/stores/configStore'
  import { storeToRefs } from 'pinia'

  const { query } = useRoute()
  const configStore = useConfigStore()
  const { user } = storeToRefs(configStore)

  const login = async () => {
    user.value = {
      name: 'Alice',
      email: 'loggedIn'
    }
    const redirectTo = query.redirectTo
    console.log(redirectTo)
    navigateTo(redirectTo as string, { replace: true })
  }
</script>
