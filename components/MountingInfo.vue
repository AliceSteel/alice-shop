<template>
    <section v-if="productStore.mountingDescription" 
    class="flex flex-wrap sm:flex-nowrap gap-2  border-black rounded-2xl border-2 p-5 mx-8" >
        <p>{{ productStore.mountingDescription }}</p>
        <div class="w-full sm:w-1/3 rounded-2xl">
            <NuxtImg
            class="max-h-96 object-cover"
            :src="productStore.mountingPicture?.url"
            :alt="productStore.mountingPicture?.altText"
           />
        </div>   
    </section>
</template>

<script setup lang="ts">
import { useProductStore } from '~/stores/productStore'

const productStore = useProductStore()
</script>