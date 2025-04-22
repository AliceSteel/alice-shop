import { defineStore } from 'pinia'

export const useProductStore = defineStore('productStore', {
    state: () => ({
        mountingDescription: '',
        mountingPicture: {
            url: '',
            altText: '',
        }
    }),
})