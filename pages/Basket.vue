<template>
  <div class="p-10">I am basket page</div>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: ['auth']
  })
  console.log('basket page')
</script>
