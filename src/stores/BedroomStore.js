import { defineStore } from 'pinia'
import bedrooms from '@/data/bedrooms.json'

export const useBedroomStore = defineStore('BedroomStore', {
  state: () => {
    return {
      bedrooms,
      search: '',
    }
  },
})
