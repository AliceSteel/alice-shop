<template>
  <NuxtLayout name="default">
    <div class="w-full flex flex-col items-center justify-center">
      <h1>{{ error?.statusCode }}</h1>
      <h2>Oh no, something broke!</h2>
      <p>
        Sorry, we couldn't find the page you were looking for.
      </p>
      <p v-if="error?.message">{{ error.message }}</p>
      <button @click="handleError" class="font-semibold">Home Page</button>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">

const error = useError()
const handleError = () => {
  clearError({ redirect: '/' })
}
</script>