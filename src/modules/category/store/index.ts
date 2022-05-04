import { defineStore } from 'vuezone'
import { state } from '@modules/category/store/state'
import { actions } from '@modules/category/store/actions'

export const useCategoryStore = defineStore<ICategoryState, ICategoryActions>(
  'category',
  {
    state,
    actions,
  }
)
