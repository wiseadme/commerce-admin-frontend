import { defineState, defineActions, defineStore } from 'vuezone'
import { state as ctgState } from '@modules/category/store/state'
import { actions as ctgActions } from '@modules/category/store/actions'

// type CategoryState = {
//   categories: Maybe<Array<any>>
// }
//
// type CategoryActions = {
//   createCategory: (ctg: any) => Promise<any>
//   updateCategory: (upd: any) => Promise<any>
//   getAllCategories: () => Promise<any>
// }

export const state = defineState('category', ctgState)
export const actions = defineActions('category', ctgActions)

export const useCategoryStore = defineStore('category')
