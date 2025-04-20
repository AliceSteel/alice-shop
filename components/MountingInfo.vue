<template>
    <section v-if="productStore.mountingDescription" 
        class=" border-black rounded-2xl border-2 m-9 p-5" >
        <p>{{ productStore.mountingDescription }}</p>
    </section>
</template>

<script setup lang="ts">
import { useProductStore } from '~/stores/productStore'

const productStore = useProductStore()
</script>