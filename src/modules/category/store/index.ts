import { defineStore } from 'vuezone'
import { state } from '@modules/category/store/state'
import { actions } from '@modules/category/store/actions'
// import { Maybe } from '@shared/types/utils'

// type State = {
//   categories: Maybe<Array<any>>
// }
//
// defineState<State>('category', state)
// defineActions('category', actions)

export const useCategoryStore = defineStore('category', {
  state,
  actions
})
