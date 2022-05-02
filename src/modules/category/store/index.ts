import { createStore } from 'vue-v-store'

import { state } from './state'
import { actions } from './actions'

const categoryStore = createStore({
  state,
  actions
})

export const useCategoryStore = () => categoryStore
