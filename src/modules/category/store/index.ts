import { defineState, defineActions } from 'vuezone'
import { state as ctgState } from '@modules/category/store/state'
import { actions as ctgActions } from '@modules/category/store/actions'

interface ICategoryState {
  categories: Maybe<Array<any>>
}

interface ICategoryActions {
  createCategory: (category: ICategory) => Promise<any>
  updateCategory: (updates: any) => Promise<any>
  getAllCategories: () => Promise<any>
}

export const state = defineState<ICategoryState>('category', ctgState)
export const actions = defineActions<ICategoryActions>('category', ctgActions)
