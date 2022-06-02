import { defineStore } from 'vuezone'
import { actions } from '@/modules/product/store/actions'
import { state } from '@/modules/product/store/state'

export const useProductStore = defineStore('product', {
  state,
  actions,
})
